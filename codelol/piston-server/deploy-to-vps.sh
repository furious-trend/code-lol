#!/bin/bash
set -e

if [ -z "$1" ]; then
    echo "Error: Missing Piston Secret."
    echo "Usage: ./deploy-to-vps.sh <YOUR_PISTON_SECRET>"
    exit 1
fi

PISTON_SECRET="$1"

echo "Starting Piston VPS Deployment with Secret Auth..."

# 1. Install Docker and Docker Compose if not present
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
else
    echo "Docker is already installed."
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo "Docker Compose is already installed."
fi

# Ensure piston-server directory exists
mkdir -p ~/piston-server
cd ~/piston-server

# 2. Create nginx.conf
echo "Creating nginx.conf for reverse proxy..."
cat << EOF > nginx.conf
events {}
http {
    server {
        listen 3000;
        
        location / {
            if (\$http_x_piston_secret != "$PISTON_SECRET") {
                return 401 "Unauthorized";
            }
            proxy_pass http://piston:2000;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
        }
    }
}
EOF

# 3. Create docker-compose.yml
echo "Creating docker-compose.yml..."
cat << 'EOF' > docker-compose.yml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    container_name: piston-nginx
    ports:
      - "3000:3000"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    restart: unless-stopped
    depends_on:
      - piston

  piston:
    image: ghcr.io/engineer-man/piston
    container_name: piston-execution-engine
    # Port 2000 is intentionally NOT mapped to the host, 
    # it is only accessible internally by the nginx container.
    privileged: true
    restart: unless-stopped
    volumes:
      - piston-packages:/piston/packages

volumes:
  piston-packages:
EOF

# 4. Create setup-piston.sh if not present
if [ ! -f "setup-piston.sh" ]; then
    echo "Fetching setup-piston.sh from original source..."
    cat << 'EOF' > setup-piston.sh
#!/bin/bash
echo "Installing runtimes..."
docker exec -it piston-execution-engine npm run cli -- pkg install node
docker exec -it piston-execution-engine npm run cli -- pkg install python
docker exec -it piston-execution-engine npm run cli -- pkg install typescript
docker exec -it piston-execution-engine npm run cli -- pkg install java
docker exec -it piston-execution-engine npm run cli -- pkg install gcc
docker exec -it piston-execution-engine npm run cli -- pkg install dotnet
docker exec -it piston-execution-engine npm run cli -- pkg install go
docker exec -it piston-execution-engine npm run cli -- pkg install rust
docker exec -it piston-execution-engine npm run cli -- pkg install ruby
docker exec -it piston-execution-engine npm run cli -- pkg install php
docker exec -it piston-execution-engine npm run cli -- pkg install kotlin
docker exec -it piston-execution-engine npm run cli -- pkg install swift
docker exec -it piston-execution-engine npm run cli -- pkg install bash
docker exec -it piston-execution-engine npm run cli -- pkg install sqlite3
echo "Done!"
EOF
    chmod +x setup-piston.sh
fi

# 5. Oracle-specific firewall rules (Iptables)
echo "Opening port 3000 on iptables (Oracle Cloud default firewall)..."
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 3000 -j ACCEPT
sudo netfilter-persistent save || echo "netfilter-persistent not found, skipping save"

# 6. Register Systemd Service
echo "Registering piston.service with systemd..."
sudo cp piston.service /etc/systemd/system/piston.service
sudo systemctl daemon-reload
sudo systemctl enable piston.service

# 7. Start the Service
echo "Starting containers..."
sudo systemctl restart piston.service

# Wait for containers to start
sleep 5

# 8. Run setup script
echo "Running setup-piston.sh..."
./setup-piston.sh

# 9. Test locally with curl
echo "Testing endpoint (should fail with 401)..."
curl -I http://localhost:3000/api/v2/runtimes || true

echo "Testing endpoint with secret (should pass with 200)..."
curl -I -H "X-Piston-Secret: $PISTON_SECRET" http://localhost:3000/api/v2/runtimes || true

echo -e "\n\nPiston is deployed successfully! Remember to open port 3000 in your Oracle Cloud VCN Security List!"
