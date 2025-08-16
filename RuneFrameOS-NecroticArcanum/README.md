# Necrotic Arcanum - RuneFrameOS

## Overview

Necrotic Arcanum is a comprehensive undead management system for all gaming genres and systems. Build, destroy, manipulate, and research undead creatures, manage necromantic powers, and control death magic across all gaming systems.

## Features

### 🧟 Undead Creation & Control
- **Zombie Hordes**: Create massive undead armies with customizable abilities
- **Lich Lords**: Build powerful undead spellcasters with unique personalities
- **Mind Control**: Direct control over undead minds and actions
- **Personality Imprinting**: Imprint specific behaviors and traits

### 💀 Necromancy & Research
- **Death Magic**: Research and develop new necromantic spells
- **Soul Manipulation**: Study soul binding, trapping, and transfer techniques
- **Ritual Development**: Create complex necromantic rituals
- **Spell Research**: Develop new magical techniques

### ⚰️ Undead Types & Categories
- **Mindless Undead**: Zombies, skeletons, and simple creatures
- **Intelligent Undead**: Vampires, liches, and sentient beings
- **Spirit Undead**: Ghosts, wraiths, and ethereal entities

### 🔗 Cross-Genre Support
- Works across all gaming genres and systems
- From medieval fantasy to cyberpunk reanimators
- From space horror to post-apocalyptic wastelands
- Universal undead engine for all systems

## Technical Details

- **Port**: 3009
- **NodePort**: 30009
- **Ingress**: necrotic-arcanum.pedantictheory.com
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
   sudo docker build -f Dockerfile.clean -t necrotic-arcanum:latest .
   ```

3. **Load Image to All Nodes**
   ```bash
   # On sherlock (control plane)
   sudo docker save necrotic-arcanum:latest | sudo ctr -n=k8s.io images import -
   
   # On watson
   sudo docker save necrotic-arcanum:latest | ssh wee@watson sudo ctr -n=k8s.io images import -
   
   # On adler
   sudo docker save necrotic-arcanum:latest | ssh wee@adler sudo ctr -n=k8s.io images import -
   ```

4. **Deploy to Kubernetes**
   ```bash
   sudo kubectl apply -f necrotic-arcanum-deployment.yaml --kubeconfig /etc/kubernetes/admin.conf
   ```

5. **Verify Deployment**
   ```bash
   sudo kubectl get pods -n runeframeos --kubeconfig /etc/kubernetes/admin.conf
   sudo kubectl get service necrotic-arcanum -n runeframeos --kubeconfig /etc/kubernetes/admin.conf
   ```

## Access

- **Direct Access**: NodePort 30009 on any cluster node
- **Ingress**: http://necrotic-arcanum.pedantictheory.com
- **Local Test**: `curl http://localhost:30009`

## Architecture

The application follows the exact PersonaVault layout structure:
- **Header**: App logo, title, and navigation controls
- **Left Sidebar**: Undead management navigation and quick actions
- **Right Sidebar**: Active undead info, dice roller, and status
- **Center Console**: Main content area with undead management features
- **Footer**: Brand information and social links

## Integration

Necrotic Arcanum integrates with other RuneFrameOS applications:
- **Hoardwell**: Track undead equipment and gear
- **LoreForge**: Integrate undead into world-building
- **Mercatrix**: Manage undead economic impact
- **All Apps**: Share necromantic data seamlessly

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
