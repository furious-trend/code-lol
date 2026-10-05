#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: ./deploy.sh <SECRET_TOKEN>"
  echo "Please provide a strong secret token for the X-Piston-Secret header."
  exit 1
fi

SECRET=$1
echo "Deploying Piston with secret: $SECRET"

# 1. Update and install dependencies
sudo apt-get update
sudo apt-get install -y docker.io nginx curl jq

# 2. Start Piston container
echo "Starting Piston container..."
# Stop existing if any
sudo docker rm -f piston || true

sudo docker run -d \
  --name piston \
  -p 2000:2000 \
  -v piston_data:/piston \
  --privileged \
  ghcr.io/engineer-man/piston

# Wait for Piston to boot
echo "Waiting for Piston to initialize (15 seconds)..."
sleep 15

# 3. Install the 5 requested languages
echo "Installing languages: javascript (node), python, java, c (gcc), c++ (gcc)..."
# Piston API for installation dynamically fetches packages
sudo docker exec piston cli install node
sudo docker exec piston cli install python
sudo docker exec piston cli install java
sudo docker exec piston cli install gcc # installs both c and c++

# 4. Configure Nginx Reverse Proxy
echo "Configuring Nginx..."
cat <<EOF | sudo tee /etc/nginx/sites-available/piston
server {
    listen 3000;
    server_name _;

    # Require X-Piston-Secret header
    if (\$http_x_piston_secret != "$SECRET") {
        return 401;
    }

    location / {
        proxy_pass http://127.0.0.1:2000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/piston /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

# 5. Verify Runtimes
echo "========================================="
echo "Deployment Complete!"
echo "Installed Runtimes:"
curl -s http://127.0.0.1:2000/api/v2/runtimes | jq '.[] | "\(.language) \(.version)"'
echo "========================================="
echo "Your API is available on port 3000."
echo "Remember to set in your Next.js app:"
echo "PISTON_API_URL=http://<YOUR_IP>:3000"
echo "PISTON_SECRET=$SECRET"
