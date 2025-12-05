# Challenge National - Déploiement sur Render

Ce projet est une application Next.js déployée sur Render avec Docker.

## Structure du projet

- `frontend/` - Application Next.js principale
- `backend/` - Backend (vide pour l'instant)

## Déploiement sur Render

### Prérequis

1. Un compte Render (gratuit ou payant)
2. Un repository Git (GitHub, GitLab, ou Bitbucket)
3. Une clé API Google Gemini pour le chatbot

### Étapes de déploiement

1. **Pousser le code sur votre repository Git**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push
   ```

2. **Créer un nouveau service sur Render**
   - Connectez-vous à [Render Dashboard](https://dashboard.render.com)
   - Cliquez sur "New +" puis "Web Service"
   - Connectez votre repository Git

3. **Configurer le service**
   - **Name**: `challenge-nationnal` (ou le nom de votre choix)
   - **Environment**: `Docker`
   - **Region**: Choisissez la région la plus proche (Frankfurt par exemple)
   - **Branch**: `main` (ou votre branche principale)
   - **Root Directory**: Laissez vide (le Dockerfile est dans `frontend/`)
   - **Dockerfile Path**: `frontend/Dockerfile`
   - **Docker Context**: `frontend`

4. **Configurer les variables d'environnement**
   - `GEMINI_API_KEY`: Votre clé API Google Gemini (sécurisée, non synchronisée)
   - `NODE_ENV`: `production`

5. **Plan et déploiement**
   - Choisissez le plan Free (ou un plan payant selon vos besoins)
   - Cliquez sur "Create Web Service"
   - Render construira et déploiera automatiquement votre application

### Configuration alternative sans render.yaml

Si vous préférez configurer manuellement sur Render Dashboard :

- **Build Command**: Laisser vide (géré par Docker)
- **Start Command**: Laisser vide (géré par Dockerfile)
- **Health Check Path**: `/`

## Développement local

### Avec Docker

```bash
cd frontend
docker build -t challenge-nationnal .
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key_here challenge-nationnal
```

### Sans Docker

```bash
cd frontend
npm install
cp .env.example .env
# Éditez .env et ajoutez votre GEMINI_API_KEY
npm run dev
```

## Variables d'environnement

| Variable | Description | Requis |
|----------|-------------|--------|
| `GEMINI_API_KEY` | Clé API Google Gemini pour le chatbot | Oui |
| `NODE_ENV` | Environnement (production/development) | Non (défaut: production) |
| `PORT` | Port du serveur | Non (défaut: 3000) |

## Notes importantes

- L'application utilise Next.js 16 avec le mode standalone pour une taille d'image Docker optimale
- Le Dockerfile utilise un build multi-stage pour réduire la taille de l'image finale
- Le port est configuré pour accepter les connexions depuis 0.0.0.0 (nécessaire pour Render)
- Les images sont désoptimisées pour réduire les dépendances

## Support

Pour toute question ou problème, consultez la [documentation Render](https://render.com/docs) ou créez une issue sur le repository.



