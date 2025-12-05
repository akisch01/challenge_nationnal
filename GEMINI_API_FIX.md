# 🔧 Résolution du problème de clé API Gemini

## ❌ Erreur actuelle

```
API key not valid. Please pass a valid API key.
```

Cette erreur signifie que la clé API Gemini n'est pas correctement configurée sur Render.

## ✅ Solutions

### Solution 1 : Vérifier et configurer la variable d'environnement sur Render

1. **Connectez-vous à Render Dashboard**
   - Allez sur [dashboard.render.com](https://dashboard.render.com)
   - Connectez-vous à votre compte

2. **Accédez à votre service**
   - Cliquez sur votre service `nuit-info-wimak`
   - Dans le menu latéral, cliquez sur **"Environment"**

3. **Vérifiez ou ajoutez la variable `GEMINI_API_KEY`**
   
   Si la variable existe déjà :
   - Vérifiez que la valeur est correcte (sans espaces avant/après)
   - Cliquez sur "Save Changes"
   - Redéployez le service

   Si la variable n'existe pas :
   - Cliquez sur **"Add Environment Variable"**
   - **Key** : `GEMINI_API_KEY`
   - **Value** : Collez votre clé API Gemini (voir ci-dessous pour l'obtenir)
   - **⚠️ IMPORTANT** : Cochez la case **"Secret"** pour masquer la valeur
   - Cliquez sur **"Save Changes"**

4. **Redéployer le service**
   - Allez dans l'onglet **"Manual Deploy"**
   - Cliquez sur **"Clear build cache & deploy"** pour forcer un nouveau déploiement
   - OU attendez le prochain déploiement automatique

### Solution 2 : Obtenir une nouvelle clé API Gemini

Si vous n'avez pas de clé API ou si elle ne fonctionne pas :

1. **Allez sur Google AI Studio**
   - Rendez-vous sur [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - OU [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

2. **Connectez-vous**
   - Utilisez votre compte Google

3. **Créez une clé API**
   - Cliquez sur **"Create API Key"**
   - Sélectionnez un projet Google Cloud (ou créez-en un)
   - Copiez la clé générée

4. **Copiez la clé complète**
   - La clé ressemble à : `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
   - Assurez-vous de copier toute la clé sans espaces

5. **Ajoutez-la sur Render**
   - Suivez la Solution 1 ci-dessus

### Solution 3 : Vérifier que la clé est valide

Pour tester votre clé API localement :

```bash
# Test rapide avec curl
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=VOTRE_CLE_ICI" \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Bonjour"}]}]}'
```

Si vous obtenez une erreur 400 avec "API key not valid", votre clé est invalide et vous devez en créer une nouvelle.

## 🔍 Vérification étape par étape

### Étape 1 : Vérifier sur Render Dashboard

1. Service → Environment
2. Cherchez `GEMINI_API_KEY`
3. Vérifiez que :
   - ✅ La variable existe
   - ✅ La valeur commence par `AIzaSy`
   - ✅ Il n'y a pas d'espaces avant/après
   - ✅ La case "Secret" est cochée

### Étape 2 : Vérifier dans les logs

1. Allez dans l'onglet **"Logs"** de votre service
2. Cherchez des messages d'erreur au démarrage
3. Si vous voyez "GEMINI_API_KEY is not set", la variable n'est pas accessible

### Étape 3 : Forcer un redéploiement

Parfois, les variables d'environnement ne sont pas rechargées :

1. Allez dans **"Manual Deploy"**
2. Cliquez sur **"Clear build cache & deploy"**
3. Attendez la fin du déploiement
4. Testez à nouveau

## ⚠️ Points importants

1. **Ne partagez jamais votre clé API publiquement**
   - Ne la commitez pas dans Git
   - Utilisez toujours l'option "Secret" sur Render

2. **Format de la clé**
   - Doit commencer par `AIzaSy`
   - Doit faire environ 39 caractères
   - Ne doit pas contenir d'espaces

3. **Limites de la clé gratuite**
   - Google Gemini a des limites de requêtes par minute
   - Si vous dépassez, vous obtiendrez d'autres erreurs

## 🐛 Dépannage avancé

### Le problème persiste après avoir ajouté la variable

1. **Vérifiez les logs de build**
   - Les variables d'environnement sont disponibles au runtime, pas au build
   - C'est normal de ne pas les voir dans les logs de build

2. **Vérifiez le nom de la variable**
   - Doit être exactement : `GEMINI_API_KEY`
   - Sensible à la casse
   - Pas d'espaces

3. **Redémarrez le service**
   - Allez dans "Settings"
   - Cliquez sur "Restart"

### Test de connexion à l'API

Vous pouvez tester directement dans les logs Render en ajoutant temporairement :

```javascript
console.log("API Key configured:", API_KEY ? "Yes (length: " + API_KEY.length + ")" : "No");
```

(Ne faites pas cela en production avec une vraie clé, juste pour debug)

## 📞 Support

Si le problème persiste :

1. Vérifiez les [logs Render](https://dashboard.render.com) pour plus d'erreurs
2. Consultez la [documentation Google Gemini API](https://ai.google.dev/docs)
3. Vérifiez que votre compte Google a bien accès à Gemini API

## ✅ Checklist de vérification

- [ ] Clé API créée sur Google AI Studio
- [ ] Variable `GEMINI_API_KEY` ajoutée dans Render Dashboard
- [ ] Valeur correcte (commence par `AIzaSy`)
- [ ] Option "Secret" cochée
- [ ] Service redéployé après l'ajout de la variable
- [ ] Logs vérifiés pour d'autres erreurs

Une fois tous ces points vérifiés, votre application devrait fonctionner ! 🎉

