// Données des plantes (défenseurs NIRD)

export const PLANTS = {
  TUX_SHOOTER: {
    id: 'tux_shooter',
    name: 'Tux Shooter',
    icon: '🐧',
    cost: 100,
    rechargeTime: 5000, // ms
    hp: 100,
    damage: 20,
    fireRate: 1500, // ms entre chaque tir
    range: 'lane', // tire sur toute la ligne
    description: 'Tire des manchots Linux sur les menaces numériques',
    educationalInfo: {
      title: 'Linux (Tux)',
      content: 'Système d\'exploitation libre et gratuit. Utilisé dans 96% des serveurs web. Sécurisé, personnalisable et éco-responsable.',
      link: 'https://nird.forge.apps.education.fr/'
    },
    projectileSpeed: 300,
    projectileColor: 0x00ff00
  },

  LIBREOFFICE_CANNON: {
    id: 'libreoffice_cannon',
    name: 'LibreOffice Cannon',
    icon: '📚',
    cost: 150,
    rechargeTime: 7000,
    hp: 120,
    damage: 30,
    fireRate: 2000,
    range: 'lane',
    description: 'Lance des documents lourds qui ralentissent les ennemis',
    specialEffect: 'slow',
    slowDuration: 2000,
    slowAmount: 0.5,
    educationalInfo: {
      title: 'LibreOffice',
      content: 'Suite bureautique libre et gratuite, alternative à Microsoft Office. Compatible avec tous les formats de documents.',
      link: 'https://nird.forge.apps.education.fr/'
    },
    projectileSpeed: 250,
    projectileColor: 0x0066ff
  },

  RECONDITIONER: {
    id: 'reconditioner',
    name: 'Reconditioner',
    icon: '🔧',
    cost: 175,
    rechargeTime: 6000,
    hp: 100,
    damage: 25,
    fireRate: 1800,
    range: 'lane',
    description: 'Répare et tire des composants recyclés',
    specialEffect: 'recycle',
    recycleBonus: 25, // bonus en ☀️ quand il tue un zombie
    educationalInfo: {
      title: 'Reconditionnement',
      content: 'Donner une seconde vie au matériel informatique. Économique et écologique, réduit les déchets électroniques.',
      link: 'https://nird.forge.apps.education.fr/'
    },
    projectileSpeed: 280,
    projectileColor: 0xffa500
  },

  FIREWALL_NUT: {
    id: 'firewall_nut',
    name: 'Firewall Nut',
    icon: '🛡️',
    cost: 50,
    rechargeTime: 4000,
    hp: 400,
    damage: 0,
    fireRate: 0,
    range: 'none',
    type: 'defensive',
    description: 'Mur de protection avec haute résistance',
    educationalInfo: {
      title: 'Pare-feu (Firewall)',
      content: 'Protection essentielle contre les intrusions. Filtre le trafic réseau et bloque les menaces.',
      link: 'https://nird.forge.apps.education.fr/'
    }
  },

  LOCAL_SERVER: {
    id: 'local_server',
    name: 'Local Server',
    icon: '📡',
    cost: 200,
    rechargeTime: 10000,
    hp: 150,
    damage: 0,
    fireRate: 0,
    range: 'zone',
    type: 'production',
    description: 'Génère de l\'énergie solaire et booste les plantes adjacentes',
    sunProduction: 25,
    sunProductionRate: 20000, // génère du soleil toutes les 20s
    boostRadius: 2,
    boostAmount: 1.25, // +25% de dégâts
    educationalInfo: {
      title: 'Serveur Local',
      content: 'Hébergement local des données. Autonomie, contrôle des données, respect du RGPD et réduction de l\'empreinte carbone.',
      link: 'https://nird.forge.apps.education.fr/'
    }
  },

  TEACHER_TRAINER: {
    id: 'teacher_trainer',
    name: 'Teacher Trainer',
    icon: '👨‍🏫',
    cost: 125,
    rechargeTime: 8000,
    hp: 100,
    damage: 0,
    fireRate: 0,
    range: 'zone',
    type: 'support',
    description: 'Augmente la cadence de tir des plantes proches',
    boostRadius: 2,
    fireRateBoost: 0.75, // -25% de temps entre les tirs
    educationalInfo: {
      title: 'Formation des Enseignants',
      content: 'La formation est essentielle pour adopter le numérique libre. Accompagnement et montée en compétences des équipes éducatives.',
      link: 'https://nird.forge.apps.education.fr/'
    }
  },

  OBSOLESCENCE_BOMB: {
    id: 'obsolescence_bomb',
    name: 'Obsolescence Bomb',
    icon: '💣',
    cost: 300,
    rechargeTime: 15000,
    hp: 50,
    damage: 200,
    fireRate: 0,
    range: 'explosion',
    type: 'explosive',
    description: 'Explose au contact et détruit tous les zombies dans une zone',
    explosionRadius: 2,
    educationalInfo: {
      title: 'Obsolescence Programmée',
      content: 'Stratégie des fabricants pour limiter la durée de vie des produits. Le libre et le reconditionné permettent de lutter contre ce fléau.',
      link: 'https://nird.forge.apps.education.fr/'
    }
  },

  RASPBERRY_PI: {
    id: 'raspberry_pi',
    name: 'Raspberry Pi',
    icon: '⚡',
    cost: 350,
    rechargeTime: 12000,
    hp: 80,
    damage: 10,
    fireRate: 500, // tire très rapidement
    range: 'lane',
    description: 'Tire très rapidement avec une faible consommation',
    educationalInfo: {
      title: 'Raspberry Pi',
      content: 'Mini-ordinateur économique et écologique. Parfait pour l\'apprentissage de l\'informatique et les projets DIY.',
      link: 'https://nird.forge.apps.education.fr/'
    },
    projectileSpeed: 400,
    projectileColor: 0xff0000
  },

  ECO_SOLAR_PANEL: {
    id: 'eco_solar_panel',
    name: 'Eco Solar Panel',
    icon: '🌍',
    cost: 400,
    rechargeTime: 15000,
    hp: 200,
    damage: 0,
    fireRate: 0,
    range: 'none',
    type: 'production',
    description: 'Génère beaucoup d\'énergie solaire de manière écologique',
    sunProduction: 50,
    sunProductionRate: 15000, // génère du soleil toutes les 15s
    educationalInfo: {
      title: 'Énergie Solaire',
      content: 'Source d\'énergie renouvelable et propre. Réduit drastiquement l\'empreinte carbone des infrastructures numériques.',
      link: 'https://nird.forge.apps.education.fr/'
    }
  }
};

// Configuration du coût en soleil
export const SUN_CONFIG = {
  STARTING_SUN: 150,
  SUN_FROM_SKY: 25,
  SUN_FALL_INTERVAL: 10000, // un soleil tombe toutes les 10s
  SUN_COLLECTION_RANGE: 50
};
