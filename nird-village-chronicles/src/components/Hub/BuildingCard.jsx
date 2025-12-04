// src/components/Hub/BuildingCard.jsx
import { Lock, TrendingUp } from 'lucide-react';
import { useGameStore } from '../../stores/gameStore';

const BuildingCard = ({ type, data }) => {
  const { upgradeBuilding, player } = useGameStore();

  const buildingInfo = {
    os: {
      name: 'Système d\'exploitation',
      icon: '🖥️',
      levels: ['Windows', 'Ubuntu', 'Linux Avancé'],
      color: 'from-blue-500 to-blue-700',
    },
    office: {
      name: 'Suite Bureautique',
      icon: '📄',
      levels: ['MS Office', 'LibreOffice', 'Suite Optimisée'],
      color: 'from-green-500 to-green-700',
    },
    cloud: {
      name: 'Cloud & Stockage',
      icon: '☁️',
      levels: ['Google Drive', 'Nextcloud Basic', 'Nextcloud Pro'],
      color: 'from-cyan-500 to-cyan-700',
    },
    communication: {
      name: 'Communication',
      icon: '💬',
      levels: ['Teams', 'Mattermost', 'Solution Complète'],
      color: 'from-purple-500 to-purple-700',
    },
    video: {
      name: 'Vidéo & Média',
      icon: '🎥',
      levels: ['YouTube', 'PeerTube', 'Média Center'],
      color: 'from-red-500 to-red-700',
    },
  };

  const info = buildingInfo[type];
  const isUnlocked = data.unlocked;
  const currentLevel = data.level;
  const upgradeCost = (currentLevel + 1) * 1000;
  const canAfford = player.coins >= upgradeCost;

  const handleUpgrade = () => {
    if (!isUnlocked || !canAfford) return;
    upgradeBuilding(type);
  };

  return (
    <div
      className={`relative bg-gradient-to-br ${info.color} rounded-xl p-4 text-white shadow-lg transition-transform hover:${isUnlocked ? '-translate-y-1' : ''} ${
        !isUnlocked ? 'opacity-50' : ''
      }`}
    >
      {/* Lock overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
          <Lock size={32} />
        </div>
      )}

      {/* Content */}
      <div className="text-center">
        <div className="text-5xl mb-2">{info.icon}</div>
        <h3 className="font-bold text-sm mb-2">{info.name}</h3>

        {isUnlocked && (
          <>
            <div className="text-xs mb-2 opacity-90">
              Niveau {currentLevel}: {info.levels[currentLevel - 1]}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white bg-opacity-30 rounded-full h-1.5 mb-2">
              <div
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${(currentLevel / 3) * 100}%` }}
              />
            </div>

            {/* Upgrade button */}
            {currentLevel < 3 && (
              <button
                onClick={handleUpgrade}
                disabled={!canAfford}
                className={`w-full px-3 py-1.5 rounded text-xs font-semibold transition ${
                  canAfford
                    ? 'bg-white text-gray-800 hover:bg-opacity-90'
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
              >
                <TrendingUp size={12} className="inline mr-1" />
                Améliorer ({upgradeCost}€)
              </button>
            )}

            {currentLevel === 3 && (
              <div className="text-xs font-semibold bg-yellow-400 text-yellow-900 rounded px-2 py-1">
                ⭐ Niveau Max
              </div>
            )}
          </>
        )}

        {!isUnlocked && (
          <div className="text-xs opacity-75">
            Débloquer en jouant
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingCard;
