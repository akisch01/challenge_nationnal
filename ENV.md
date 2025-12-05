# Variables d'environnement

Ce document liste toutes les variables d'environnement nécessaires pour faire fonctionner l'application.

## Variables requises

### `GEMINI_API_KEY`
- **Description** : Clé API Google Gemini pour le chatbot Chat'bruti
- **Type** : String
- **Obligatoire** : Oui
- **Comment l'obtenir** : 
  1. Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)
  2. Connectez-vous avec votre compte Google
  3. Créez une nouvelle clé API
  4. Copiez la clé générée

## Variables optionnelles

### `NODE_ENV`
- **Description** : Environnement d'exécution
- **Type** : String
- **Valeurs possibles** : `development`, `production`
- **Défaut** : `production`
- **Obligatoire** : Non

### `PORT`
- **Description** : Port sur lequel l'application écoute
- **Type** : Number
- **Défaut** : `3000`
- **Obligatoire** : Non (Render assigne automatiquement un port)

### `HOSTNAME`
- **Description** : Hostname sur lequel l'application écoute
- **Type** : String
- **Défaut** : `0.0.0.0` (écoute sur toutes les interfaces)
- **Obligatoire** : Non

## Configuration locale

Pour le développement local, créez un fichier `.env.local` dans le dossier `frontend/` :

```bash
cd frontend
touch .env.local
```

Ajoutez vos variables :

```env
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
PORT=3000
```

**⚠️ Important** : Ne committez jamais votre fichier `.env.local` ou `.env` avec votre vraie clé API dans Git !

## Configuration sur Render

Sur Render, ajoutez les variables d'environnement dans l'onglet "Environment" de votre service :

1. Allez sur votre service dans Render Dashboard
2. Cliquez sur l'onglet "Environment"
3. Ajoutez chaque variable :
   - Nom : `GEMINI_API_KEY`
   - Valeur : Votre clé API
   - **Cochez "Secret"** pour masquer la valeur dans les logs
4. Cliquez sur "Save Changes"

## Vérification

Pour vérifier que vos variables d'environnement sont bien chargées :

```bash
# En développement local
cd frontend
npm run dev

# Vérifiez dans les logs que GEMINI_API_KEY est bien chargée
# (Attention : ne la loguez pas directement pour des raisons de sécurité)
```

## Sécurité

- 🔒 Ne partagez jamais vos clés API publiquement
- 🔒 Ne committez jamais vos fichiers `.env` dans Git
- 🔒 Utilisez toujours l'option "Secret" sur Render pour les clés API
- 🔒 Régénérez votre clé si elle a été compromise



