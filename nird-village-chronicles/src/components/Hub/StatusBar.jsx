// src/components/Hub/StatusBar.jsx
import { User, Coins, Award, TrendingDown } from 'lucide-react';

const StatusBar = ({ player, village }) => {
  return (
    <div className="bg-gradient-to-r from-amber-800 to-amber-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          {/* Nom du joueur */}
          <div className="flex items-center gap-2">
            <User size={20} />
            <span className="font-semibold">{player.name || 'Directeur·rice'}</span>
            <span className="bg-amber-900 px-2 py-1 rounded text-xs">Niv. {player.level}</span>
          </div>

          {/* XP Bar */}
          <div className="w-32">
            <div className="bg-amber-900 rounded-full h-2 overflow-hidden">
              <div
                className="bg-yellow-400 h-full transition-all duration-300"
                style={{ width: `${(player.xp % 100)}%` }}
              />
            </div>
            <span className="text-xs">{player.xp % 100}/100 XP</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Budget */}
          <div className="flex items-center gap-2">
            <Coins size={20} />
            <span className="font-mono">{player.coins}€</span>
          </div>

          {/* Autonomie */}
          <div className="flex items-center gap-2">
            <TrendingDown size={20} />
            <span>Dépendance: {village.dependencyScore.toFixed(0)}%</span>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2">
            <Award size={20} />
            <span>{player.badges.length} badges</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;