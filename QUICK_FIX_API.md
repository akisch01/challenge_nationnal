# 🚨 Correction rapide : Clé API Gemini

## Le problème

Votre application est déployée mais la clé API Gemini n'est pas configurée correctement sur Render.

## ✅ Solution rapide (5 minutes)

### Étape 1 : Obtenir votre clé API Gemini

1. Allez sur : https://aistudio.google.com/app/apikey
2. Connectez-vous avec votre compte Google
3. Cliquez sur **"Create API Key"**
4. Sélectionnez un projet (ou créez-en un)
5. **Copiez la clé** (elle commence par `AIzaSy...`)

### Étape 2 : Ajouter la clé sur Render

1. Allez sur : https://dashboard.render.com
2. Cliquez sur votre service **"nuit-info-wimak"**
3. Dans le menu latéral, cliquez sur **"Environment"**
4. Cliquez sur **"Add Environment Variable"**
5. Remplissez :
   - **Key** : `GEMINI_API_KEY`
   - **Value** : Collez votre clé API (celle qui commence par `AIzaSy`)
   - ✅ **Cochez "Secret"** (pour la masquer dans les logs)
6. Cliquez sur **"Save Changes"**

### Étape 3 : Redéployer

1. Allez dans l'onglet **"Manual Deploy"** (ou "Events")
2. Cliquez sur **"Clear build cache & deploy"**
3. OU allez dans **"Settings"** → **"Restart"**

### Étape 4 : Attendre et tester

- Attendez 2-3 minutes que le service redémarre
- Allez sur votre URL : https://nuit-info-wimak.onrender.com
- Testez le chatbot Chat'bruti

## ⚠️ Vérifications importantes

- ✅ La variable s'appelle exactement : `GEMINI_API_KEY` (pas d'espaces, respecter la casse)
- ✅ La clé commence par `AIzaSy`
- ✅ Pas d'espaces avant ou après la clé
- ✅ Option "Secret" cochée
- ✅ Service redéployé après l'ajout

## 🆘 Si ça ne fonctionne toujours pas

1. **Vérifiez les logs** dans Render Dashboard → Logs
2. **Vérifiez que la clé est correcte** : testez-la sur [Google AI Studio](https://aistudio.google.com)
3. **Créez une nouvelle clé API** si nécessaire

## 📝 Résumé en une ligne

Allez sur Render Dashboard → Votre service → Environment → Ajoutez `GEMINI_API_KEY` avec votre clé → Redéployez

Voilà ! 🎉

