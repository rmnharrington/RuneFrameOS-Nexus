# Docker Build Guide for RuneFrameOS Applications

## Overview
This guide explains how to successfully build and deploy RuneFrameOS applications to Docker Desktop, using **Mercatrix** as the proven working example.

## Why Mercatrix Works
Mercatrix successfully loads CSS and runs properly because it uses:
- **Development mode** (`NODE_ENV=development`)
- **Development server** (`npm run dev`)
- **CommonJS PostCSS config** (`postcss.config.js`)
- **Simple Tailwind config** (no custom plugins)
- **Proper user permissions** (non-root user)

## Required File Structure
```
RuneFrameOS-ApplicationName/
├── Dockerfile                    # Container definition
├── package.json                  # Dependencies and scripts
├── postcss.config.js            # PostCSS configuration (CommonJS)
├── tailwind.config.js           # Tailwind CSS configuration
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles with Tailwind imports
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Main page
│   └── components/              # Application components
└── public/                      # Static assets
```

## Step-by-Step Build Process

### 1. Prepare the Application
Ensure your application has the correct configuration files:

#### PostCSS Config (`postcss.config.js`)
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```
**⚠️ IMPORTANT**: Use `.js` extension, NOT `.mjs`

#### Tailwind Config (`tailwind.config.js`)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Your custom color palette
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [], // Keep empty for now
}
```

#### Global CSS (`src/app/globals.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: system-ui, sans-serif;
  }
  body {
    @apply bg-neutral-50 text-neutral-900;
  }
}

@layer components {
  /* Your custom component styles */
}

@layer utilities {
  /* Your custom utility styles */
}
```

### 2. Create the Dockerfile
Use this exact Dockerfile template (replace `3005` with your app's port):

```dockerfile
FROM node:18-alpine

# Create app directory and user
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Set proper ownership and permissions
RUN chown -R nextjs:nodejs /app && \
    chmod -R 755 /app

# Create .next directory with proper permissions
RUN mkdir -p /app/.next && \
    chown -R nextjs:nodejs /app/.next && \
    chmod -R 755 /app/.next

# Switch to non-root user
USER nextjs

# Expose port (CHANGE THIS TO YOUR APP'S PORT)
EXPOSE 3005

# Set environment variables
ENV PORT=3005
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=development

# Start development server
CMD ["npm", "run", "dev"]
```

### 3. Build Commands
Run these commands in your application directory:

```bash
# Navigate to your app directory
cd RuneFrameOS-ApplicationName

# Build the Docker image
docker build -t your-app-name .

# Run the container
docker run -d -p 3005:3005 --name your-app-name your-app-name
```

### 4. Verify the Build
Check that your container is running:
```bash
docker ps
```

Test the application:
```bash
# Health check
curl http://localhost:3005/api/health

# Main page (should show CSS properly)
curl http://localhost:3005
```

## Common Issues and Solutions

### Issue: CSS Not Loading (HTML Only)
**Cause**: PostCSS config using `.mjs` extension or production mode
**Solution**: 
1. Use `postcss.config.js` (CommonJS)
2. Use `NODE_ENV=development` in Dockerfile
3. Use `npm run dev` command

### Issue: Permission Denied
**Cause**: File ownership issues in container
**Solution**: Use the user creation and permission setup from the Dockerfile template

### Issue: Build Fails on npm ci
**Cause**: Missing or corrupted package-lock.json
**Solution**: 
1. Delete `package-lock.json`
2. Run `npm install` locally
3. Rebuild Docker image

### Issue: Port Already in Use
**Cause**: Another container using the same port
**Solution**: 
```bash
# Stop and remove existing container
docker stop container-name
docker rm container-name

# Or use a different port
docker run -d -p 3006:3005 --name container-name image-name
```

## Testing Checklist
Before considering the build successful:

- [ ] Container starts without errors
- [ ] Application responds on the correct port
- [ ] CSS loads properly (not just HTML)
- [ ] API endpoints work (`/api/health`, `/api/module-info`, `/api/status`)
- [ ] No console errors in browser
- [ ] Responsive design works
- [ ] Custom colors and themes display correctly

## Port Assignments
Use these ports for consistency:
- **Nexus**: 3000
- **Core**: 3002
- **Hoardwell**: 3004
- **Broke Unicorn Tavern**: 3005
- **Scriptoria**: 3006
- **Necrotic Arcanum**: 3007
- **Mercatrix**: 3008
- **PersonaVault**: 3009
- **TravelersTable**: 3010

## Troubleshooting Commands

```bash
# View container logs
docker logs container-name

# Check container status
docker ps -a

# Inspect container
docker inspect container-name

# Access container shell
docker exec -it container-name sh

# View container resources
docker stats container-name
```

## Success Pattern
The working pattern used by Mercatrix:
1. **Development mode** for CSS processing
2. **CommonJS configs** for compatibility
3. **Simple Tailwind setup** without custom plugins
4. **Proper user permissions** in container
5. **Development server** for real-time CSS compilation

## Next Steps
After successful build:
1. Test all application features
2. Verify responsive design
3. Check API integration
4. Update Nexus dashboard with new app link
5. Document any custom configurations

---

**Remember**: If CSS isn't loading, always check the PostCSS config format and ensure you're using development mode with `npm run dev`.
