// Données des ennemis (Vagues d'Obsolescence et Big Tech)

export const ENEMIES = {
  // Vague 1 : Les Obsolètes
  FLOPPY_DISK: {
    id: 'floppy_disk',
    name: 'Floppy Disk Horde',
    icon: '💾',
    category: 'obsolete',
    stats: {
      hp: 50,
      speed: 30, // pixels/seconde
      damage: 10, // dégâts à la mairie
      reward: { sun: 5, recycle: 2 }
    },
    description: 'Disquettes obsolètes en masse',
    color: 0x808080,
    size: 30,
    educationalInfo: {
      title: 'Obsolescence Matérielle',
      content: 'Les disquettes (1.44 MB) sont obsolètes depuis les années 2000. Symbole de l\'évolution technologique rapide.',
      problem: 'Déchets électroniques en masse'
    }
  },

  CDROM_SWARM: {
    id: 'cdrom_swarm',
    name: 'CD-ROM Swarm',
    icon: '📀',
    category: 'obsolete',
    stats: {
      hp: 80,
      speed: 50,
      damage: 15,
      reward: { sun: 8, recycle: 3 },
      splitOnDeath: true, // se divise en 2 si non tué rapidement
      splitThreshold: 40 // HP en dessous duquel il se divise
    },
    description: 'CD-ROMs qui se multiplient',
    color: 0xc0c0c0,
    size: 35,
    educationalInfo: {
      title: 'Supports Physiques Obsolètes',
      content: 'Les CD/DVD (700 MB) sont remplacés par le cloud et les clés USB. Mais le cloud a un coût environnemental élevé.',
      problem: 'Dépendance aux services cloud propriétaires'
    }
  },

  VHS_ZOMBIE: {
    id: 'vhs_zombie',
    name: 'VHS Zombie',
    icon: '📼',
    category: 'obsolete',
    stats: {
      hp: 150,
      speed: 20,
      damage: 25,
      reward: { sun: 12, recycle: 5 },
      armor: 0.3 // réduit 30% des dégâts
    },
    description: 'Cassette VHS ultra résistante',
    color: 0x654321,
    size: 40,
    educationalInfo: {
      title: 'Obsolescence Programmée',
      content: 'Les VHS étaient robustes mais rendues obsolètes par de nouveaux formats. L\'industrie force le renouvellement.',
      problem: 'Stratégie commerciale anti-écologique'
    }
  },

  // Vague 2 : Les Licences Expirées
  WINDOWS_XP_GHOST: {
    id: 'windows_xp_ghost',
    name: 'Windows XP Ghost',
    icon: '🪟',
    category: 'expired_license',
    stats: {
      hp: 150,
      speed: 60,
      damage: 20,
      reward: { sun: 15, recycle: 8 },
      stealSun: 25 // vole du soleil s'il atteint la mairie
    },
    description: 'Fantôme de Windows XP, vole des ressources',
    color: 0x0078d7,
    size: 45,
    educationalInfo: {
      title: 'Licences Propriétaires',
      content: 'Windows XP n\'est plus supporté depuis 2014. Les établissements doivent payer pour migrer ou rester vulnérables.',
      problem: 'Coût : 15 000€/an pour un établissement moyen',
      solution: 'Linux = 0€ + support communautaire gratuit'
    }
  },

  IPHONE_3G_PHANTOM: {
    id: 'iphone_3g',
    name: 'iPhone 3G Phantom',
    icon: '📱',
    category: 'expired_license',
    stats: {
      hp: 120,
      speed: 90,
      damage: 15,
      reward: { sun: 10, recycle: 6 },
      phaseThrough: 0.3 // 30% de chance de passer à travers une tour
    },
    description: 'Téléphone obsolète, rapide et furtif',
    color: 0x000000,
    size: 30,
    educationalInfo: {
      title: 'Obsolescence Mobile',
      content: 'Les smartphones deviennent inutilisables après 3-4 ans (batterie, OS non supporté). Modèle économique basé sur le remplacement.',
      problem: 'Déchets électroniques massifs',
      solution: 'Fairphone, LineageOS, réparation'
    }
  },

  CONSOLE_BRICKED: {
    id: 'console_bricked',
    name: 'Console Bricked',
    icon: '🎮',
    category: 'expired_license',
    stats: {
      hp: 200,
      speed: 40,
      damage: 30,
      reward: { sun: 18, recycle: 10 },
      explodeOnDeath: true,
      explosionDamage: 50,
      explosionRadius: 80
    },
    description: 'Console qui explose en mourant',
    color: 0x8b0000,
    size: 50,
    educationalInfo: {
      title: 'DRM et Serveurs Fermés',
      content: 'Quand les serveurs ferment, les jeux deviennent inutilisables. Les consoles deviennent des "briques".',
      problem: 'Perte d\'accès aux contenus achetés',
      solution: 'Jeux open-source, émulation, préservation'
    }
  },

  // Vague 3 : Les Big Tech Raiders
  CLOUD_RAIDER: {
    id: 'cloud_raider',
    name: 'Cloud Raider',
    icon: '☁️',
    category: 'big_tech',
    stats: {
      hp: 250,
      speed: 80,
      damage: 35,
      reward: { sun: 25, recycle: 15 },
      disableTowers: true,
      disableDuration: 3000, // désactive les tours 3s
      disableRadius: 100
    },
    description: 'Pirate du cloud, désactive temporairement les tours',
    color: 0x87ceeb,
    size: 55,
    educationalInfo: {
      title: 'Dépendance au Cloud',
      content: 'Le cloud = serveurs d\'autres entreprises. Perte de contrôle, coûts récurrents, empreinte carbone énorme.',
      problem: '1 email stocké = 10g CO2/an\nDatacenters = 2% émissions mondiales',
      solution: 'Hébergement local, souveraineté numérique'
    }
  },

  SUBSCRIPTION_LEECH: {
    id: 'subscription_leech',
    name: 'Subscription Leech',
    icon: '💰',
    category: 'big_tech',
    stats: {
      hp: 300,
      speed: 50,
      damage: 40,
      reward: { sun: 30, recycle: 20 },
      drainSun: 5, // draine 5 soleil/seconde tant qu'il est vivant
      drainInterval: 1000
    },
    description: 'Sangsue d\'abonnements, draine les ressources',
    color: 0xffd700,
    size: 50,
    educationalInfo: {
      title: 'Modèle par Abonnement',
      content: 'Les logiciels passent du modèle d\'achat unique à l\'abonnement perpétuel. Coûts exponentiels.',
      problem: 'Office 365 : 70€/an/utilisateur\nAdobe CC : 60€/mois',
      solution: 'LibreOffice, GIMP, Inkscape = 0€ à vie'
    }
  },

  DATA_HARVESTER: {
    id: 'data_harvester',
    name: 'Data Harvester',
    icon: '📊',
    category: 'big_tech',
    stats: {
      hp: 350,
      speed: 45,
      damage: 50,
      reward: { sun: 35, recycle: 25 },
      growStronger: true,
      growthRate: 2, // +2 HP et dégâts par seconde
      growthInterval: 1000
    },
    description: 'Moissonneur de données, devient plus fort',
    color: 0xff4500,
    size: 60,
    educationalInfo: {
      title: 'Collecte de Données',
      content: 'Les GAFAM collectent massivement les données personnelles pour les monétiser. Vie privée menacée.',
      problem: 'Profilage, revente, manipulation',
      solution: 'RGPD, logiciels respectueux, hébergement local'
    }
  },

  // Boss
  PLANNED_OBSOLESCENCE_TITAN: {
    id: 'obsolescence_titan',
    name: 'Planned Obsolescence Titan',
    icon: '🏭',
    category: 'boss',
    stats: {
      hp: 2000,
      speed: 30,
      damage: 100,
      reward: { sun: 200, recycle: 100 },
      disableTowers: true,
      disableRadius: 150,
      disableDuration: 5000,
      spawnMinions: true,
      minionType: 'FLOPPY_DISK',
      spawnInterval: 8000,
      spawnCount: 3
    },
    description: 'BOSS - Titan de l\'obsolescence programmée',
    color: 0x8b0000,
    size: 100,
    educationalInfo: {
      title: 'Obsolescence Programmée',
      content: 'Stratégie industrielle pour limiter la durée de vie des produits. Coût environnemental et financier énorme.',
      problem: 'Déchets, surconsommation, dépendance',
      solution: 'Droit à la réparation, logiciel libre, matériel durable'
    }
  },

  GAFAM_MOTHERSHIP: {
    id: 'gafam_mothership',
    name: 'GAFAM Mothership',
    icon: '🌐',
    category: 'boss',
    stats: {
      hp: 3000,
      speed: 40,
      damage: 150,
      reward: { sun: 300, recycle: 150 },
      shield: 500, // bouclier qui se régénère
      shieldRegen: 50,
      shieldRegenInterval: 5000,
      multiAttack: 3, // attaque 3 tours à la fois
      drainSun: 10,
      drainInterval: 2000
    },
    description: 'BOSS FINAL - Vaisseau mère des GAFAM',
    color: 0x000080,
    size: 120,
    educationalInfo: {
      title: 'Domination des GAFAM',
      content: 'Google, Apple, Facebook, Amazon, Microsoft contrôlent l\'écosystème numérique mondial.',
      problem: 'Monopole, dépendance, surveillance, fiscalité',
      solution: 'Alternatives libres, souveraineté numérique, NIRD !'
    }
  }
};

// Configuration des vagues
export const WAVE_CONFIG = {
  // Niveau 1 - Introduction
  LEVEL_1: [
    { wave: 1, enemies: [{ type: 'FLOPPY_DISK', count: 5, interval: 2000 }], delay: 3000 },
    { wave: 2, enemies: [{ type: 'FLOPPY_DISK', count: 8, interval: 1500 }], delay: 8000 },
    { wave: 3, enemies: [
      { type: 'FLOPPY_DISK', count: 5, interval: 1500 },
      { type: 'CDROM_SWARM', count: 3, interval: 2000 }
    ], delay: 10000 },
    { wave: 4, enemies: [{ type: 'VHS_ZOMBIE', count: 2, interval: 3000 }], delay: 12000 },
    { wave: 5, enemies: [
      { type: 'FLOPPY_DISK', count: 10, interval: 1000 },
      { type: 'VHS_ZOMBIE', count: 3, interval: 2500 }
    ], delay: 15000 }
  ],

  // Niveau 2 - Montée en difficulté
  LEVEL_2: [
    { wave: 1, enemies: [
      { type: 'CDROM_SWARM', count: 8, interval: 1500 },
      { type: 'VHS_ZOMBIE', count: 2, interval: 3000 }
    ], delay: 3000 },
    { wave: 2, enemies: [
      { type: 'WINDOWS_XP_GHOST', count: 4, interval: 2000 }
    ], delay: 10000 },
    { wave: 3, enemies: [
      { type: 'FLOPPY_DISK', count: 15, interval: 800 },
      { type: 'WINDOWS_XP_GHOST', count: 3, interval: 2500 }
    ], delay: 12000 },
    { wave: 4, enemies: [
      { type: 'IPHONE_3G', count: 6, interval: 1500 },
      { type: 'CONSOLE_BRICKED', count: 2, interval: 4000 }
    ], delay: 14000 },
    { wave: 5, enemies: [
      { type: 'VHS_ZOMBIE', count: 5, interval: 2000 },
      { type: 'WINDOWS_XP_GHOST', count: 4, interval: 2000 },
      { type: 'CONSOLE_BRICKED', count: 3, interval: 3000 }
    ], delay: 16000 }
  ],

  // Niveau 3 - Boss
  LEVEL_3: [
    { wave: 1, enemies: [
      { type: 'CLOUD_RAIDER', count: 5, interval: 2000 }
    ], delay: 3000 },
    { wave: 2, enemies: [
      { type: 'SUBSCRIPTION_LEECH', count: 3, interval: 3000 },
      { type: 'DATA_HARVESTER', count: 2, interval: 4000 }
    ], delay: 12000 },
    { wave: 3, enemies: [
      { type: 'CLOUD_RAIDER', count: 6, interval: 1500 },
      { type: 'WINDOWS_XP_GHOST', count: 8, interval: 1200 }
    ], delay: 18000 },
    { wave: 4, enemies: [
      { type: 'DATA_HARVESTER', count: 4, interval: 2500 },
      { type: 'SUBSCRIPTION_LEECH', count: 4, interval: 2500 }
    ], delay: 20000 },
    { wave: 5, enemies: [
      { type: 'PLANNED_OBSOLESCENCE_TITAN', count: 1, interval: 0 }
    ], delay: 25000 }
  ]
};

// Obtenir les données complètes d'un ennemi
export function getEnemyData(enemyId) {
  return ENEMIES[enemyId] || null;
}

// Obtenir la configuration des vagues pour un niveau
export function getLevelWaves(levelId) {
  return WAVE_CONFIG[levelId] || WAVE_CONFIG.LEVEL_1;
}
