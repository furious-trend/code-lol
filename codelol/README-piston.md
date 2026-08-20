# Self-Hosted Piston Execution Engine

This project uses [Piston](https://github.com/engineer-man/piston), a high-performance code execution engine, to safely run user-submitted code in isolated environments. We self-host it to avoid public API rate limits and restrictions.

## Local Development Setup

To run Piston locally, you need Docker installed on your machine.

1. **Start the Piston Container**
   Navigate to the `piston-server` directory and start the container in detached mode:
   ```bash
   cd piston-server
   docker-compose up -d
   ```
   *Note: Piston requires `--privileged` mode to properly construct its secure sandboxing environments. A volume is mounted to persist installed languages.*

2. **Install Runtimes**
   Once the container is running and warmed up, execute the setup script to dynamically fetch the latest available versions and install all 15 supported languages:
   ```bash
   ./setup-piston.sh
   ```
   This will install: `javascript (node)`, `python`, `typescript`, `java`, `c (gcc)`, `c++ (gcc)`, `csharp (dotnet)`, `go`, `rust`, `ruby`, `php`, `kotlin`, `swift`, `bash`, and `sqlite3`.

3. **Verify Installation**
   You can check the installed runtimes by navigating your browser or making a GET request to:
   ```
   http://localhost:2000/api/v2/runtimes
   ```

## Production Deployment

When deploying your CodeLOL app to production, you will also need to host this Piston instance on a cloud provider.

### Deploying to a VPS (Oracle Cloud - Recommended)
Since Piston requires `--privileged` mode to securely sandbox code execution, we recommend hosting it on a self-managed VPS. Oracle Cloud offers an Always Free tier that works perfectly for this.

#### 1. Create an Oracle Cloud VM
- Go to the Oracle Cloud Console.
- Launch an Always Free instance: **Ampere (ARM) or VM.Standard.E2.1.Micro (x86)**.
- Choose **Ubuntu 22.04** as the image.
- Ensure you download and save your SSH keys.

#### 2. Open Port 3000 in Oracle Cloud
Oracle Cloud aggressively blocks all ports by default. You must open the reverse-proxy port (3000) in the VCN:
- Go to your instance details -> Attached VNICs -> Click the Subnet -> Default Security List.
- Add an Ingress Rule:
  - Source CIDR: `0.0.0.0/0`
  - Destination Port Range: `3000`

#### 3. Connect and Deploy
1. SSH into your new VM:
   ```bash
   ssh -i /path/to/your/key.pem ubuntu@<YOUR_VM_PUBLIC_IP>
   ```
2. Download and run the automated deployment script with a secret token:
   *(You can simply copy the `deploy-to-vps.sh` script from this repo to your server, make it executable, and run it).*
   ```bash
   nano deploy-to-vps.sh
   # (Paste the contents of deploy-to-vps.sh)
   chmod +x deploy-to-vps.sh
   
   # Run it with a strong random secret!
   ./deploy-to-vps.sh "your_super_secret_string"
   ```
   This script will install Docker, configure Piston behind an Nginx reverse-proxy, set up a persistent `systemd` service, and download all language runtimes.

> **🔒 SECURITY & AUTH:**
> - **Nginx Reverse Proxy:** Port 2000 (Piston) is isolated to the Docker network. Only port 3000 (Nginx) is exposed to the internet.
> - **Shared Secret Auth:** Nginx requires the `X-Piston-Secret` header on every request matching your secret.
> - **Rate Limiting:** The Next.js backend (`app/api/run/route.ts`) applies in-memory rate-limiting (max 10 runs per minute per IP) to prevent abuse before requests even reach the VM.

### Deploying to Render (Archived/Reference)
*A `render.yaml` and `Dockerfile` are provided in the `piston-server` directory for reference, but Render's platform (including the free tier) does not support running Docker containers in privileged mode (`--privileged`). Piston will crash internally when attempting to execute code on Render.*

### Update CodeLOL Environment Variables
Once your Piston server is live, grab its public IP and update your frontend:
1. In your local `.env.local`, set:
   ```env
   PISTON_API_URL=http://<YOUR_VM_PUBLIC_IP>:3000
   PISTON_SECRET=your_super_secret_string
   ```
2. **In Vercel:** Go to your Project -> Settings -> Environment Variables and add/update `PISTON_API_URL` and `PISTON_SECRET` to match.
