# Guide de déploiement sur Render avec Docker

Ce guide vous explique comment déployer l'application sur Render en utilisant Docker.

## 📋 Prérequis

1. **Compte Render** : Créez un compte gratuit sur [render.com](https://render.com)
2. **Repository Git** : Votre code doit être sur GitHub, GitLab ou Bitbucket
3. **Clé API Gemini** : Obtenez votre clé sur [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🚀 Déploiement étape par étape

### Étape 1 : Préparer votre code

Assurez-vous que votre code est bien poussé sur votre repository Git :

```bash
git add .
git commit -m "Add Docker configuration for Render"
git push origin main
```

### Étape 2 : Créer un nouveau service sur Render

1. Connectez-vous à [Render Dashboard](https://dashboard.render.com)
2. Cliquez sur **"New +"** dans le menu de gauche
3. Sélectionnez **"Web Service"**

### Étape 3 : Connecter votre repository

1. Cliquez sur **"Connect account"** si vous n'avez pas encore connecté votre compte Git
2. Sélectionnez votre repository
3. Cliquez sur **"Connect"**

### Étape 4 : Configurer le service

Remplissez le formulaire avec les informations suivantes :

- **Name** : `challenge-nationnal` (ou le nom de votre choix)
- **Environment** : `Docker`
- **Region** : Choisissez la région la plus proche (ex: `Frankfurt` pour l'Europe)
- **Branch** : `main` (ou votre branche principale)

**Configuration Docker importante** :
- Si vous utilisez le fichier `render.yaml`, Render le détectera automatiquement
- Sinon, configurez manuellement :
  - **Root Directory** : Laissez vide
  - **Dockerfile Path** : `frontend/Dockerfile`
  - **Docker Context** : `frontend`

### Étape 5 : Variables d'environnement

Ajoutez les variables d'environnement suivantes dans l'onglet **"Environment"** :

| Variable | Valeur | Notes |
|----------|--------|-------|
| `GEMINI_API_KEY` | Votre clé API Gemini | ⚠️ Marquez comme **Secret** |
| `NODE_ENV` | `production` | Défaut : production |

**Comment ajouter une variable** :
1. Cliquez sur **"Add Environment Variable"**
2. Entrez le nom de la variable
3. Entrez la valeur
4. Cochez **"Secret"** pour `GEMINI_API_KEY`
5. Cliquez sur **"Save Changes"**

### Étape 6 : Plan et déploiement

1. Choisissez le **plan Free** (ou un plan payant selon vos besoins)
2. Cliquez sur **"Create Web Service"**
3. Render va automatiquement :
   - Cloner votre repository
   - Construire l'image Docker
   - Déployer votre application

### Étape 7 : Attendre le déploiement

Le premier déploiement peut prendre 5-10 minutes. Vous pouvez suivre la progression dans les logs.

Une fois terminé, vous recevrez une URL comme : `https://challenge-nationnal.onrender.com`

## 🔧 Configuration avancée

### Utiliser render.yaml (Recommandé)

Le fichier `render.yaml` à la racine du projet permet de configurer automatiquement le service. Render le détectera automatiquement lors de la connexion du repository.

### Health Check

L'application utilise le path `/` comme health check. Si votre application a un problème, Render le détectera automatiquement.

### Variables d'environnement disponibles

| Variable | Description | Défaut |
|----------|-------------|--------|
| `GEMINI_API_KEY` | Clé API Google Gemini (requis) | - |
| `NODE_ENV` | Environnement d'exécution | `production` |
| `PORT` | Port du serveur | `3000` (géré par Render) |

## 🐛 Dépannage

### Le build échoue

1. Vérifiez les logs dans Render Dashboard
2. Assurez-vous que le Dockerfile est dans le bon chemin (`frontend/Dockerfile`)
3. Vérifiez que toutes les dépendances sont bien dans `package.json`

### L'application ne démarre pas

1. Vérifiez que `GEMINI_API_KEY` est bien configurée
2. Consultez les logs pour voir les erreurs
3. Assurez-vous que le port est bien exposé (3000)

### L'application fonctionne localement mais pas sur Render

1. Vérifiez les variables d'environnement
2. Assurez-vous que `NODE_ENV=production`
3. Vérifiez que toutes les dépendances sont installées

## 📝 Notes importantes

- **Plan Free** : L'application s'endort après 15 minutes d'inactivité et met quelques secondes à redémarrer
- **Limites** : Le plan gratuit a des limites de CPU et RAM
- **Logs** : Les logs sont disponibles dans Render Dashboard pour 1000 lignes (gratuit)
- **Déploiements automatiques** : Chaque push sur la branche configurée déclenche un nouveau déploiement

## 🔄 Mises à jour

Pour mettre à jour l'application :

1. Faites vos modifications localement
2. Committez et pushez sur votre repository
3. Render déploiera automatiquement la nouvelle version

```bash
git add .
git commit -m "Update application"
git push origin main
```

## 📚 Ressources

- [Documentation Render](https://render.com/docs)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [Render Docker Guide](https://render.com/docs/docker)



