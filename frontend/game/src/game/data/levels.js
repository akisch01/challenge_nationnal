// Configuration des niveaux

export const LEVELS = {
  LEVEL_1: {
    id: 'LEVEL_1',
    name: 'L\'École Primaire',
    description: 'Votre premier village numérique. Défendez-le contre l\'obsolescence !',
    difficulty: 'easy',
    background: 'school',
    gridSize: { cols: 10, rows: 6 },
    startingResources: {
      sun: 300,
      recycle: 0
    },
    maisonHP: 1000,
    wavesConfig: 'LEVEL_1',
    availableTowers: [
      'PENTIUM_TOWER',
      'LINUX_DESKTOP',
      'FIREWALL',
      'LOCAL_SERVER'
    ],
    objectives: [
      'Survivre à 5 vagues',
      'Ne perdez pas plus de 200 HP de la Mairie',
      'Construire au moins 3 tours'
    ],
    rewards: {
      sun: 500,
      recycle: 50,
      unlockTowers: ['GAMING_RIG', 'RASPBERRY_CLUSTER']
    }
  },

  LEVEL_2: {
    id: 'LEVEL_2',
    name: 'Le Collège Connecté',
    description: 'Les licences expirées attaquent ! Renforcez vos défenses.',
    difficulty: 'medium',
    background: 'college',
    gridSize: { cols: 12, rows: 7 },
    startingResources: {
      sun: 400,
      recycle: 20
    },
    maisonHP: 1200,
    wavesConfig: 'LEVEL_2',
    availableTowers: [
      'PENTIUM_TOWER',
      'LINUX_DESKTOP',
      'GAMING_RIG',
      'FIREWALL',
      'LOCAL_SERVER',
      'RASPBERRY_CLUSTER',
      'TRAINING_CENTER'
    ],
    objectives: [
      'Survivre à 5 vagues',
      'Construire au moins 5 tours',
      'Améliorer au moins 2 tours au niveau 2'
    ],
    rewards: {
      sun: 750,
      recycle: 100,
      unlockTowers: ['SERVER_RACK', 'SOLAR_PANEL', 'REPAIR_WORKSHOP']
    }
  },

  LEVEL_3: {
    id: 'LEVEL_3',
    name: 'Le Village NIRD - Boss Final',
    description: 'Les Big Tech attaquent ! C\'est l\'heure de la résistance finale !',
    difficulty: 'hard',
    background: 'village',
    gridSize: { cols: 14, rows: 8 },
    startingResources: {
      sun: 500,
      recycle: 50
    },
    maisonHP: 1500,
    wavesConfig: 'LEVEL_3',
    availableTowers: 'all', // toutes les tours disponibles
    objectives: [
      'Vaincre le Titan de l\'Obsolescence',
      'Survivre à toutes les vagues',
      'Ne perdez pas plus de 500 HP'
    ],
    rewards: {
      sun: 1500,
      recycle: 300,
      unlockMode: 'INFINITE'
    }
  }
};

// Chemins des ennemis pour chaque niveau
export const PATHS = {
  LEVEL_1: {
    // Les ennemis viennent de la gauche vers la droite
    start: { x: -50, y: 300 },
    waypoints: [
      { x: 200, y: 300 },
      { x: 400, y: 250 },
      { x: 600, y: 300 },
      { x: 800, y: 300 }
    ],
    end: { x: 1050, y: 300 } // Position de la mairie
  },

  LEVEL_2: {
    // Chemin en S
    start: { x: -50, y: 100 },
    waypoints: [
      { x: 200, y: 100 },
      { x: 400, y: 200 },
      { x: 600, y: 300 },
      { x: 800, y: 400 },
      { x: 1000, y: 350 }
    ],
    end: { x: 1150, y: 350 }
  },

  LEVEL_3: {
    // Chemin complexe
    start: { x: -50, y: 250 },
    waypoints: [
      { x: 150, y: 250 },
      { x: 300, y: 150 },
      { x: 500, y: 150 },
      { x: 650, y: 300 },
      { x: 800, y: 350 },
      { x: 1000, y: 300 },
      { x: 1150, y: 400 }
    ],
    end: { x: 1300, y: 400 }
  }
};

// Obtenir les données d'un niveau
export function getLevelData(levelId) {
  return LEVELS[levelId] || LEVELS.LEVEL_1;
}

// Obtenir le chemin des ennemis pour un niveau
export function getLevelPath(levelId) {
  return PATHS[levelId] || PATHS.LEVEL_1;
}

// Obtenir les tours disponibles pour un niveau
export function getAvailableTowers(levelId) {
  const level = getLevelData(levelId);
  return level.availableTowers;
}
