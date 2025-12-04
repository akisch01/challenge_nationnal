// src/stores/gameStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGameStore = create(
  persist(
    (set, get) => ({
      // État du joueur
      player: {
        name: '',
        level: 1,
        xp: 0,
        coins: 1000,
        badges: [],
      },

      // État du village
      village: {
        dependencyScore: 100, // 0 = autonome, 100 = totalement dépendant
        budget: 50000,
        satisfaction: 50,
        autonomy: 0,
        buildings: {
          os: { level: 0, unlocked: false }, // Windows -> Linux
          office: { level: 0, unlocked: false }, // Office -> LibreOffice
          cloud: { level: 0, unlocked: false }, // GDrive -> Nextcloud
          communication: { level: 0, unlocked: false }, // Teams -> Mattermost
          video: { level: 0, unlocked: false }, // YouTube -> PeerTube
        },
      },

      // Progression aventure
      adventure: {
        currentChapter: 1,
        completedChapters: [],
        choices: [],
      },

      // État tower defense
      defense: {
        highestWave: 0,
        towersUnlocked: ['linux-basic'],
        bestScore: 0,
      },

      // Actions
      updatePlayer: (updates) =>
        set((state) => ({
          player: { ...state.player, ...updates },
        })),

      updateVillage: (updates) =>
        set((state) => ({
          village: { ...state.village, ...updates },
        })),

      unlockBuilding: (buildingType) =>
        set((state) => ({
          village: {
            ...state.village,
            buildings: {
              ...state.village.buildings,
              [buildingType]: { level: 1, unlocked: true },
            },
          },
        })),

      upgradeBuilding: (buildingType) =>
        set((state) => {
          const currentLevel = state.village.buildings[buildingType].level;
          return {
            village: {
              ...state.village,
              buildings: {
                ...state.village.buildings,
                [buildingType]: { 
                  level: currentLevel + 1, 
                  unlocked: true 
                },
              },
            },
          };
        }),

      addBadge: (badge) =>
        set((state) => ({
          player: {
            ...state.player,
            badges: [...state.player.badges, badge],
          },
        })),

      calculateDependency: () => {
        const { buildings } = get().village;
        const totalBuildings = Object.keys(buildings).length;
        const unlockedCount = Object.values(buildings).filter(b => b.unlocked).length;
        const avgLevel = Object.values(buildings)
          .filter(b => b.unlocked)
          .reduce((sum, b) => sum + b.level, 0) / (unlockedCount || 1);
        
        const dependency = 100 - (unlockedCount / totalBuildings * 50) - (avgLevel * 10);
        set((state) => ({
          village: { ...state.village, dependencyScore: Math.max(0, dependency) }
        }));
      },
    }),
    {
      name: 'nird-game-storage',
    }
  )
);