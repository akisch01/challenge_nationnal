// Données des tours défensives (NIRD Village)

export const TOWERS = {
  // Catégorie 1 : Tours d'Attaque (PC Reconditionnés)
  PENTIUM_TOWER: {
    id: 'pentium_tower',
    name: 'PC Pentium II',
    icon: '🖥️',
    category: 'attack',
    cost: { sun: 50, recycle: 0 },
    stats: {
      hp: 100,
      damage: 20,
      fireRate: 2000, // ms
      range: 150,
      projectileSpeed: 200
    },
    upgrades: [
      {
        level: 2,
        name: 'PC + Linux Mint',
        cost: { sun: 75, recycle: 10 },
        stats: { damage: 30, fireRate: 1600 }
      },
      {
        level: 3,
        name: 'PC + Debian Server',
        cost: { sun: 150, recycle: 25 },
        stats: { damage: 50, fireRate: 1600, multiTarget: 2 }
      }
    ],
    description: 'Vieux PC reconditionné, basique mais efficace',
    color: 0x808080,
    educationalInfo: {
      title: 'PC Reconditionné',
      content: 'Donner une seconde vie aux ordinateurs permet d\'économiser des ressources et de réduire les déchets électroniques. Un PC peut fonctionner 10+ ans avec Linux.',
      impact: '- 80% moins cher qu\'un PC neuf\n- 75% de réduction d\'émissions CO2\n- Accessible à tous les établissements'
    }
  },

  LINUX_DESKTOP: {
    id: 'linux_desktop',
    name: 'Linux Desktop',
    icon: '💻',
    category: 'attack',
    cost: { sun: 150, recycle: 5 },
    stats: {
      hp: 150,
      damage: 35,
      fireRate: 1500,
      range: 200,
      projectileSpeed: 250
    },
    upgrades: [
      {
        level: 2,
        name: 'Ubuntu Tower',
        cost: { sun: 100, recycle: 15 },
        stats: { damage: 50, fireRate: 1200, range: 250 }
      },
      {
        level: 3,
        name: 'Arch Linux Fortress',
        cost: { sun: 200, recycle: 30 },
        stats: { damage: 80, fireRate: 1000, range: 300, pierce: true }
      }
    ],
    description: 'PC sous Linux, rapide et efficace',
    color: 0x00ff00,
    educationalInfo: {
      title: 'Linux Desktop',
      content: 'Linux est un système d\'exploitation libre utilisé dans 96% des serveurs web. Gratuit, sécurisé et performant.',
      impact: '- 0€ de licence\n- Fonctionne sur vieux matériel\n- Mise à jour continue gratuite'
    }
  },

  GAMING_RIG: {
    id: 'gaming_rig',
    name: 'Gaming Rig Reconditionné',
    icon: '⚡',
    category: 'attack',
    cost: { sun: 300, recycle: 20 },
    stats: {
      hp: 200,
      damage: 60,
      fireRate: 1000,
      range: 250,
      projectileSpeed: 300,
      multiTarget: 3
    },
    upgrades: [
      {
        level: 2,
        name: 'Overclocked Beast',
        cost: { sun: 200, recycle: 40 },
        stats: { damage: 90, fireRate: 800, multiTarget: 4 }
      },
      {
        level: 3,
        name: 'Open Source Monster',
        cost: { sun: 350, recycle: 60 },
        stats: { damage: 130, fireRate: 600, multiTarget: 5, splash: 50 }
      }
    ],
    description: 'PC gamer récupéré, très puissant',
    color: 0xff0000,
    educationalInfo: {
      title: 'Reconditionnement High-End',
      content: 'Les PC gamers ont une longue durée de vie. Reconditionnés, ils rivalisent avec du matériel neuf à prix réduit.',
      impact: '- 60% moins cher que du neuf\n- Performances équivalentes\n- Excellent pour le rendu 3D et calcul'
    }
  },

  SERVER_RACK: {
    id: 'server_rack',
    name: 'Server Rack',
    icon: '🖨️',
    category: 'attack',
    cost: { sun: 500, recycle: 30 },
    stats: {
      hp: 300,
      damage: 100,
      fireRate: 2500,
      range: 180,
      aoe: 80,
      projectileSpeed: 150
    },
    upgrades: [
      {
        level: 2,
        name: 'Cluster Computing',
        cost: { sun: 300, recycle: 50 },
        stats: { damage: 150, aoe: 120, fireRate: 2000 }
      }
    ],
    description: 'Rack de serveurs, attaque en zone',
    color: 0x0066ff,
    educationalInfo: {
      title: 'Serveur Local',
      content: 'Héberger localement = contrôle des données, respect du RGPD, réduction de l\'empreinte carbone.',
      impact: '- Autonomie numérique\n- Pas de dépendance cloud\n- Données en France'
    }
  },

  // Catégorie 2 : Infrastructures de Support
  LOCAL_SERVER: {
    id: 'local_server',
    name: 'Local Server',
    icon: '🏢',
    category: 'production',
    cost: { sun: 200, recycle: 0 },
    stats: {
      hp: 200,
      sunProduction: 25,
      productionRate: 20000 // génère toutes les 20s
    },
    upgrades: [
      {
        level: 2,
        name: 'Optimized Server',
        cost: { sun: 150, recycle: 20 },
        stats: { sunProduction: 40, productionRate: 18000 }
      },
      {
        level: 3,
        name: 'Server Farm',
        cost: { sun: 250, recycle: 40 },
        stats: { sunProduction: 60, productionRate: 15000 }
      }
    ],
    description: 'Génère de l\'énergie solaire',
    color: 0xffaa00,
    educationalInfo: {
      title: 'Infrastructure Locale',
      content: 'Les serveurs locaux permettent l\'autonomie numérique des établissements.',
      impact: '- Contrôle total des données\n- Pas de frais cloud\n- Rapidité d\'accès'
    }
  },

  RASPBERRY_CLUSTER: {
    id: 'raspberry_cluster',
    name: 'Raspberry Pi Cluster',
    icon: '📡',
    category: 'support',
    cost: { sun: 250, recycle: 10 },
    stats: {
      hp: 120,
      boostRadius: 150,
      damageBoost: 0.3 // +30%
    },
    upgrades: [
      {
        level: 2,
        name: 'Super Cluster',
        cost: { sun: 200, recycle: 25 },
        stats: { boostRadius: 200, damageBoost: 0.5 }
      }
    ],
    description: 'Booste les tours adjacentes (+30% dégâts)',
    color: 0xff1493,
    educationalInfo: {
      title: 'Raspberry Pi',
      content: 'Mini-ordinateur économique (35€) et écologique. Parfait pour l\'éducation et les projets DIY.',
      impact: '- Consommation : 5W\n- Idéal pour apprendre\n- Communauté énorme'
    }
  },

  SOLAR_PANEL: {
    id: 'solar_panel',
    name: 'Solar Panel Array',
    icon: '🔋',
    category: 'production',
    cost: { sun: 300, recycle: 15 },
    stats: {
      hp: 250,
      sunProduction: 50,
      productionRate: 15000
    },
    upgrades: [
      {
        level: 2,
        name: 'Mega Solar Farm',
        cost: { sun: 300, recycle: 40 },
        stats: { sunProduction: 75, productionRate: 12000 }
      }
    ],
    description: 'Production massive d\'énergie solaire',
    color: 0xffd700,
    educationalInfo: {
      title: 'Énergie Solaire',
      content: 'Source d\'énergie renouvelable et propre. Réduit drastiquement l\'empreinte carbone.',
      impact: '- 0 émission CO2\n- Énergie gratuite\n- Autonomie énergétique'
    }
  },

  FIREWALL: {
    id: 'firewall',
    name: 'Firewall Station',
    icon: '🛡️',
    category: 'support',
    cost: { sun: 100, recycle: 5 },
    stats: {
      hp: 400,
      slowRadius: 120,
      slowAmount: 0.5 // ralentit de 50%
    },
    upgrades: [
      {
        level: 2,
        name: 'Advanced Firewall',
        cost: { sun: 100, recycle: 15 },
        stats: { hp: 600, slowRadius: 160, slowAmount: 0.65 }
      }
    ],
    description: 'Ralentit les ennemis dans un rayon',
    color: 0x4169e1,
    educationalInfo: {
      title: 'Pare-feu (Firewall)',
      content: 'Protection essentielle contre les intrusions. Filtre le trafic réseau et bloque les menaces.',
      impact: '- Sécurité renforcée\n- Protection contre les virus\n- Filtrage du trafic'
    }
  },

  TRAINING_CENTER: {
    id: 'training_center',
    name: 'Training Center',
    icon: '👨‍🏫',
    category: 'support',
    cost: { sun: 350, recycle: 25 },
    stats: {
      hp: 150,
      boostRadius: 180,
      fireRateBoost: 0.25, // -25% temps entre tirs
      damageBoost: 0.2 // +20% dégâts
    },
    upgrades: [
      {
        level: 2,
        name: 'Academy',
        cost: { sun: 300, recycle: 50 },
        stats: { boostRadius: 250, fireRateBoost: 0.4, damageBoost: 0.35 }
      }
    ],
    description: 'Améliore les tours proches',
    color: 0x9370db,
    educationalInfo: {
      title: 'Formation des Enseignants',
      content: 'La formation est essentielle pour adopter le numérique libre. Accompagnement des équipes éducatives.',
      impact: '- Montée en compétences\n- Autonomie technique\n- Adoption progressive'
    }
  },

  REPAIR_WORKSHOP: {
    id: 'repair_workshop',
    name: 'Repair Workshop',
    icon: '🔧',
    category: 'support',
    cost: { sun: 150, recycle: 10 },
    stats: {
      hp: 180,
      repairRadius: 150,
      repairRate: 5000, // répare toutes les 5s
      repairAmount: 20 // HP réparés
    },
    upgrades: [
      {
        level: 2,
        name: 'Advanced Workshop',
        cost: { sun: 200, recycle: 30 },
        stats: { repairRadius: 200, repairRate: 3000, repairAmount: 40 }
      }
    ],
    description: 'Répare automatiquement les tours',
    color: 0xff8c00,
    educationalInfo: {
      title: 'Atelier de Réparation',
      content: 'Réparer plutôt que jeter. Un geste écologique et économique.',
      impact: '- Durée de vie prolongée\n- Réduction des déchets\n- Économies substantielles'
    }
  },

  RECYCLING_CENTER: {
    id: 'recycling_center',
    name: 'Recycling Center',
    icon: '♻️',
    category: 'special',
    cost: { sun: 400, recycle: 20 },
    stats: {
      hp: 200,
      recycleBonus: 2 // x2 composants recyclés
    },
    description: 'Double les composants recyclés',
    color: 0x32cd32,
    educationalInfo: {
      title: 'Centre de Recyclage',
      content: 'Le recyclage des composants électroniques est crucial pour réduire les déchets.',
      impact: '- Récupération de matériaux\n- Réduction déchets électroniques\n- Économie circulaire'
    }
  }
};

// Configuration des ressources
export const RESOURCE_CONFIG = {
  STARTING_SUN: 250,
  STARTING_RECYCLE: 0,
  SUN_FROM_SKY: 25,
  SUN_FALL_INTERVAL: 12000 // soleil tombe toutes les 12s
};

// Calcule les stats finales d'une tour avec son niveau
export function getTowerStats(towerId, level = 1) {
  const tower = TOWERS[towerId];
  if (!tower) return null;

  let stats = { ...tower.stats };

  // Appliquer les upgrades jusqu'au niveau demandé
  if (level > 1 && tower.upgrades) {
    for (let i = 0; i < level - 1 && i < tower.upgrades.length; i++) {
      const upgrade = tower.upgrades[i];
      stats = { ...stats, ...upgrade.stats };
    }
  }

  return {
    ...tower,
    level,
    stats
  };
}

// Calcule le coût d'upgrade
export function getUpgradeCost(towerId, currentLevel) {
  const tower = TOWERS[towerId];
  if (!tower || !tower.upgrades || currentLevel >= tower.upgrades.length + 1) {
    return null;
  }

  return tower.upgrades[currentLevel - 1].cost;
}
