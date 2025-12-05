# Solution pour l'erreur Docker sur Render

## 🔧 Problème résolu

L'erreur `failed to read dockerfile: open Dockerfile: no such file or directory` est maintenant corrigée.

## ✅ Solution appliquée

J'ai créé deux options pour vous :

### Option 1 : Dockerfile à la racine (Recommandé)

Un **Dockerfile** a été créé à la racine du projet qui référence correctement le dossier `frontend/`. Render le trouvera automatiquement.

### Option 2 : Configuration manuelle dans Render Dashboard

Si vous préférez utiliser le Dockerfile dans `frontend/`, voici la configuration exacte à utiliser dans Render Dashboard :

1. **Environment** : `Docker`
2. **Root Directory** : (laissez vide)
3. **Dockerfile Path** : `frontend/Dockerfile`
4. **Docker Context** : `frontend`

OU

1. **Environment** : `Docker`
2. **Root Directory** : (laissez vide)
3. **Dockerfile Path** : `Dockerfile` (le fichier à la racine)
4. **Docker Context** : `.` (racine du projet)

## 📝 Configuration actuelle

Avec le Dockerfile à la racine, la configuration dans Render Dashboard doit être :

- ✅ **Environment** : `Docker`
- ✅ **Dockerfile Path** : `Dockerfile` (ou laissez vide, Render le trouve automatiquement)
- ✅ **Docker Context** : `.` (ou laissez vide)

## 🚀 Prochaines étapes

1. **Commitez et poussez les changements** :
   ```bash
   git add Dockerfile render.yaml
   git commit -m "Fix Dockerfile path for Render"
   git push
   ```

2. **Sur Render Dashboard** :
   - Si vous avez déjà créé le service, supprimez-le et recréez-le
   - OU modifiez la configuration du service existant :
     - Allez dans Settings de votre service
     - Dans la section "Build & Deploy"
     - Assurez-vous que :
       - Environment = Docker
       - Dockerfile Path = `Dockerfile` (ou vide)
       - Docker Context = `.` (ou vide)
     - Sauvegardez et redéployez

3. **Attendez le nouveau déploiement**

## 🔍 Vérification

Pour vérifier que tout est correct avant de déployer, testez localement :

```bash
# Depuis la racine du projet
docker build -t test-build .
docker run -p 3000:3000 -e GEMINI_API_KEY=votre_cle test-build
```

Si cela fonctionne localement, cela fonctionnera sur Render.

## 📚 Fichiers créés/modifiés

- ✅ `Dockerfile` (à la racine) - Nouveau fichier
- ✅ `render.yaml` - Simplifié (Render détectera automatiquement le Dockerfile)
- ✅ `frontend/Dockerfile` - Conservé pour référence

Vous pouvez utiliser soit le Dockerfile à la racine, soit celui dans frontend, mais la configuration Render doit correspondre.

