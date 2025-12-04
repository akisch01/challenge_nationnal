// src/components/Hub/VillageHub.jsx
import { useGameStore } from '../../stores/gameStore';
import { Shield, Book, Calculator } from 'lucide-react';
import StatusBar from './StatusBar';
import BuildingCard from './BuildingCard';

const VillageHub = ({ onNavigate }) => {
  const { village, player } = useGameStore();

  const modes = [
    {
      id: 'adventure',
      title: 'Mode Aventure',
      icon: Book,
      color: 'from-blue-500 to-blue-700',
      description: 'Suivez l\'histoire de la transition numérique',
      locked: false,
    },
    {
      id: 'defense',
      title: 'Tower Defense',
      icon: Shield,
      color: 'from-red-500 to-red-700',
      description: 'Défendez votre école contre les dépendances',
      locked: false,
    },
    {
      id: 'simulator',
      title: 'Simulateur',
      icon: Calculator,
      color: 'from-green-500 to-green-700',
      description: 'Calculez les coûts de votre transition',
      locked: false,
    },
    {
      id: 'library',
      title: 'Bibliothèque NIRD',
      icon: Book,
      color: 'from-purple-500 to-purple-700',
      description: 'Explorez les ressources et solutions',
      locked: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header avec stats */}
      <StatusBar player={player} village={village} />

      {/* Village central style Astérix */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-amber-800 mb-4 font-serif">
            🏰 Village Numérique Résistant
          </h1>
          <p className="text-xl text-amber-700">
            Niveau de dépendance : {village.dependencyScore.toFixed(0)}%
            {village.dependencyScore < 30 && ' 🌟 Excellent !'}
          </p>
        </div>

        {/* Bâtiments du village */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {Object.entries(village.buildings).map(([type, data]) => (
            <BuildingCard key={type} type={type} data={data} />
          ))}
        </div>

        {/* Modes de jeu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modes.map((mode) => (
            <div
              key={mode.id}
              onClick={() => !mode.locked && onNavigate(mode.id)}
              className={`relative cursor-pointer bg-gradient-to-br ${mode.color} rounded-2xl p-6 text-white shadow-2xl overflow-hidden transition-transform hover:scale-105 active:scale-95 ${
                mode.locked ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="relative z-10">
                <mode.icon size={48} className="mb-4" />
                <h3 className="text-2xl font-bold mb-2">{mode.title}</h3>
                <p className="text-sm opacity-90">{mode.description}</p>
              </div>
              {mode.locked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <span className="text-2xl">🔒</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VillageHub;