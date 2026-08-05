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

### Deploying to Render or Railway
Both Render and Railway support deploying from Dockerfiles or `docker-compose.yml`.

1. **Create a New Service**
   - On your hosting platform, create a new Docker-based web service.
   - Point it to the `piston-server` directory.
   - Ensure you mount a persistent volume (if supported by your provider) to `/piston/packages` to avoid reinstalling languages on every deploy.

2. **Privileged Mode Warning**
   - Many free-tier serverless or container platforms (like Heroku or standard Render Web Services) **do not allow `--privileged` mode** due to security concerns in shared environments.
   - You may need to run this on a standard VPS (like DigitalOcean, AWS EC2, or Hetzner) where you have full root access to run Docker with privileged flags.
   - If using a VPS, simply SSH in, clone the repo, and run the same `docker-compose up -d` and `./setup-piston.sh` commands.

3. **Update Environment Variables**
   Once your Piston server is live, grab its public URL (e.g., `https://my-piston.up.railway.app`) and add it to your CodeLOL frontend environment variables:
   ```env
   PISTON_API_URL=https://my-piston.up.railway.app
   ```
