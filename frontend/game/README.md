# 🏰 NIRD Village : Digital Fortress

## 🎮 Description

**NIRD Village : Digital Fortress** est un jeu Tower Defense créatif développé pour la **Nuit de l'Info 2025**. Le jeu sensibilise aux enjeux de la souveraineté numérique, du reconditionnement informatique et de la résistance face aux géants de la Big Tech.

Défendez votre village numérique en installant des **PC reconditionnés** et des **serveurs Linux** pour repousser les vagues d'**obsolescence programmée** et de **dépendance aux GAFAM** !

---

## 🎯 Objectif du Jeu

Protégez la **Mairie NIRD** (🏛️) contre les attaques en plaçant stratégiquement des tours défensives sur la grille. Chaque tour représente une solution numérique libre et durable :

- **🖥️ PC Pentium II** - Vieux PC reconditionné
- **💻 Linux Desktop** - Station sous Linux
- **⚡ Gaming Rig** - PC gamer reconditionné haute performance
- **🏢 Local Server** - Serveur local générateur de ressources
- **📡 Raspberry Pi Cluster** - Booste les tours adjacentes
- **🔋 Solar Panel** - Production d'énergie solaire
- **🛡️ Firewall** - Ralentit les ennemis
- **👨‍🏫 Training Center** - Améliore les compétences des tours

---

## 👾 Les Ennemis

### Vague 1 : Les Obsolètes
- **💾 Floppy Disk Horde** - Disquettes en masse
- **📀 CD-ROM Swarm** - Se multiplient
- **📼 VHS Zombie** - Tank résistant

### Vague 2 : Les Licences Expirées
- **🪟 Windows XP Ghost** - Vole des ressources
- **📱 iPhone 3G Phantom** - Rapide et furtif
- **🎮 Console Bricked** - Explose en mourant

### Vague 3 : Les Big Tech Raiders
- **☁️ Cloud Raider** - Désactive les tours
- **💰 Subscription Leech** - Draine les ressources
- **📊 Data Harvester** - Devient plus fort

### Boss Finaux
- **🏭 Planned Obsolescence Titan** - Boss de l'obsolescence
- **🌐 GAFAM Mothership** - Boss final ultime

---

## 🕹️ Comment Jouer

1. **Sélectionnez un niveau** dans le menu principal
2. **Choisissez une tour** dans le menu du bas (vérifiez le coût en ☀️)
3. **Cliquez sur la grille** pour placer la tour
4. **Survivez aux vagues** d'ennemis
5. **Protégez la Mairie NIRD** jusqu'à la fin

### Ressources
- **☀️ Soleil** - Monnaie principale, générée automatiquement et par certaines tours
- **♻️ Composants Recyclés** - Obtenus en détruisant les ennemis, nécessaires pour les upgrades

---

## 📚 Aspect Éducatif

Chaque tour et ennemi possède une **fiche pédagogique** expliquant :
- Les enjeux réels (coûts, impact environnemental, souveraineté)
- Les solutions proposées par la démarche NIRD
- Les alternatives libres disponibles

**Exemples d'informations :**
- Un PC reconditionné = **80% moins cher** et **75% moins d'émissions CO2**
- Linux = **0€ de licence** vs **15 000€/an** pour un établissement avec Windows
- Hébergement local = **Contrôle des données** + **Respect du RGPD**

---

## 🛠️ Technologies Utilisées

- **React** - Framework UI
- **Phaser 3** - Moteur de jeu 2D
- **Vite** - Build tool ultra-rapide
- **JavaScript ES6+** - Langage de programmation

---

## 🚀 Installation & Lancement

### Prérequis
- Node.js 18+ installé
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Le jeu sera accessible sur http://localhost:5173/
```

### Build de production

```bash
npm run build
npm run preview
```

---

## 📁 Structure du Projet

```
src/
├── game/
│   ├── data/
│   │   ├── towers.js       # Données des tours
│   │   ├── enemies.js      # Données des ennemis
│   │   └── levels.js       # Configuration des niveaux
│   ├── managers/
│   │   ├── ResourceManager.js  # Gestion des ressources
│   │   ├── WaveManager.js      # Gestion des vagues
│   │   └── GridManager.js      # Gestion de la grille
│   ├── entities/
│   │   ├── Tower.js        # Classe Tour
│   │   ├── Enemy.js        # Classe Ennemi
│   │   └── Projectile.js   # Classe Projectile
│   ├── scenes/
│   │   ├── MenuScene.js    # Scène de menu
│   │   └── GameScene.js    # Scène de jeu principale
│   └── PhaserGame.jsx      # Composant React Phaser
├── App.jsx
└── main.jsx
```

---

## 🎨 Crédits

- **Concept & Design** : Challenge Nuit de l'Info 2025
- **Développement** : Généré avec Claude Code
- **Inspiration** : Démarche NIRD - Pour un Numérique Inclusif, Responsable et Durable
- **Licence** : GPL v3 (Logiciel Libre)

---

## 🔗 Liens Utiles

- 🌐 [Démarche NIRD](https://nird.forge.apps.education.fr/)
- 🎓 [La Forge des Communs Numériques Éducatifs](https://forge.apps.education.fr/)
- 🐧 [Linux pour l'Éducation](https://linux.org/)
- ♻️ [Guide du Reconditionnement](https://www.ademe.fr/)

---

## 🏆 Fonctionnalités Implémentées

### MVP (Minimum Viable Product)
- ✅ 3 niveaux jouables
- ✅ 10 types de tours différentes
- ✅ 12 types d'ennemis (dont 2 boss)
- ✅ Système de ressources (Soleil + Recyclage)
- ✅ Système de vagues
- ✅ Interface utilisateur complète
- ✅ Menu principal avec sélection de niveaux
- ✅ Fiches pédagogiques intégrées
- ✅ Pathfinding des ennemis
- ✅ Système de combat

### Améliorations Futures
- ⏳ Système d'upgrade des tours (niveau 2 et 3)
- ⏳ Effets sonores et musique
- ⏳ Animations avancées
- ⏳ Mode survie infini
- ⏳ Leaderboard en ligne
- ⏳ Almanach détaillé accessible depuis le menu
- ⏳ Sauvegarde de progression
- ⏳ Accomplissements et badges

---

## 🤝 Contribution

Ce projet a été créé pour la **Nuit de l'Info 2025**. Vous êtes libre de le fork, de l'améliorer et de le partager sous licence GPL v3.

**Idées de contributions :**
- Ajouter de nouveaux niveaux
- Créer de nouvelles tours thématiques
- Améliorer les graphismes (assets, animations)
- Ajouter des sons et de la musique
- Traduire en plusieurs langues
- Optimiser les performances

---

## 📝 Licence

Ce projet est sous licence **GPL v3** conformément aux exigences de la Nuit de l'Info.

Tous les établissements scolaires sont libres d'utiliser, modifier et distribuer ce jeu dans un cadre éducatif.

---

**🎮 Amusez-vous bien et vive la résistance numérique ! 🚀**

*Généré avec ❤️ et Claude Code pour la Nuit de l'Info 2025*
