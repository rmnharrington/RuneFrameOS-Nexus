# PersonaVault - RuneFrameOS

## Overview

PersonaVault is a comprehensive character sheet management system for all gaming genres and systems. Create, edit, and view character sheets with access to various templates supplied by RuneFrameOS, working seamlessly across all gaming systems.

## Features

### 📋 Character Creation & Management
- **Character Builder**: Create characters with step-by-step guidance and validation
- **Sheet Editor**: Edit and modify existing character sheets with real-time updates
- **Interactive Sheets**: Dynamic character sheets that update in real-time
- **Validation**: Automatic calculations, validation, and error checking

### 🎭 Templates & Systems
- **System Templates**: Pre-built templates for all major gaming systems
- **Genre Support**: Fantasy, sci-fi, modern, horror, and more
- **Template Library**: Access to hundreds of pre-built character sheet templates
- **Custom Systems**: Build your own templates and systems

### 🎲 Gaming Systems Support
- **D&D 5e**: Complete character sheets
- **Pathfinder**: 1e & 2e support
- **Starfinder**: Sci-fi adventures
- **Custom Systems**: Build your own

### 🔗 Cross-Genre Support
- Works across all gaming genres and systems
- From medieval fantasy to cyberpunk
- From space opera to post-apocalyptic
- Universal character engine for all systems

## Technical Details

- **Port**: 3010
- **NodePort**: 30010
- **Ingress**: personavault.pedantictheory.com
- **Framework**: Next.js 14.0.4
- **Styling**: Tailwind CSS with custom color scheme

## Deployment

### Prerequisites
- Kubernetes cluster with nginx ingress controller
- Docker installed on all nodes
- Access to the runeframeos namespace

### Build & Deploy

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build Docker Image**
   ```bash
   sudo docker build -f Dockerfile.clean -t personavault:latest .
   ```

3. **Load Image to All Nodes**
   ```bash
   # On sherlock (control plane)
   sudo docker save personavault:latest | sudo ctr -n=k8s.io images import -
   
   # On watson
   sudo docker save personavault:latest | ssh wee@watson sudo ctr -n=k8s.io images import -
   
   # On adler
   sudo docker save personavault:latest | ssh wee@adler sudo ctr -n=k8s.io images import -
   ```

4. **Deploy to Kubernetes**
   ```bash
   sudo kubectl apply -f personavault-deployment.yaml --kubeconfig /etc/kubernetes/admin.conf
   ```

5. **Verify Deployment**
   ```bash
   sudo kubectl get pods -n runeframeos --kubeconfig /etc/kubernetes/admin.conf
   sudo kubectl get service personavault -n runeframeos --kubeconfig /etc/kubernetes/admin.conf
   ```

## Access

- **Direct Access**: NodePort 30010 on any cluster node
- **Ingress**: http://personavault.pedantictheory.com
- **Local Test**: `curl http://localhost:30010`

## Architecture

The application follows the exact PersonaVault layout structure:
- **Header**: App logo, title, and navigation controls
- **Left Sidebar**: Character management navigation and quick actions
- **Right Sidebar**: Active character info, dice roller, and status
- **Center Console**: Main content area with character management features
- **Footer**: Brand information and social links

## Integration

PersonaVault integrates with other RuneFrameOS applications:
- **Hoardwell**: Track character equipment and gear
- **LoreForge**: Integrate character backstories
- **Mercatrix**: Manage character economic impact
- **All Apps**: Share character data seamlessly

## Development

### Local Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## License

© 2024 Bad Guy Gas LLC. All rights reserved.
Trademarked by Bad Guy Gas LLC.
