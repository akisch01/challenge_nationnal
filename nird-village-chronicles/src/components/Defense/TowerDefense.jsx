// src/components/Defense/TowerDefense.jsx
import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import GameCanvas from './GameCanvas';
import { Play, Pause, RotateCcw } from 'lucide-react';

const TowerDefense = ({ onBack }) => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('ready'); // ready, playing, paused, won, lost
  const [currentWave, setCurrentWave] = useState(1);
  const [lives, setLives] = useState(10);
  const [coins, setCoins] = useState(500);

  const { defense: _defense, updatePlayer: _updatePlayer } = useGameStore();

  useEffect(() => {
    // Game loop sera implémenté ici
  }, [gameState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header du jeu */}
      <div className="bg-slate-800 p-4 flex justify-between items-center">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded"
        >
          ← Retour au village
        </button>

        <div className="flex gap-6 text-white">
          <div>Vague: {currentWave}/10</div>
          <div>❤️ Vies: {lives}</div>
          <div>💰 {coins}</div>
        </div>

        <div className="flex gap-2">
          {gameState === 'playing' ? (
            <button
              onClick={() => setGameState('paused')}
              className="p-2 bg-yellow-600 hover:bg-yellow-500 rounded"
            >
              <Pause size={20} />
            </button>
          ) : (
            <button
              onClick={() => setGameState('playing')}
              className="p-2 bg-green-600 hover:bg-green-500 rounded"
            >
              <Play size={20} />
            </button>
          )}
          <button
            onClick={() => window.location.reload()}
            className="p-2 bg-red-600 hover:bg-red-500 rounded"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* Canvas de jeu */}
      <GameCanvas
        ref={canvasRef}
        gameState={gameState}
        currentWave={currentWave}
        onWaveComplete={() => setCurrentWave(w => w + 1)}
        onLifeLost={() => setLives(l => l - 1)}
        onCoinsEarned={(amount) => setCoins(c => c + amount)}
      />

      {/* Panel des tours disponibles */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 p-4">
        <div className="container mx-auto grid grid-cols-5 gap-4">
          {/* Tours seront mappées ici */}
          <TowerButton name="Linux Basic" cost={100} icon="🐧" />
          <TowerButton name="LibreOffice" cost={150} icon="📄" />
          <TowerButton name="Nextcloud" cost={200} icon="☁️" />
          <TowerButton name="Mattermost" cost={250} icon="💬" />
          <TowerButton name="PeerTube" cost={300} icon="🎥" locked />
        </div>
      </div>
    </div>
  );
};

const TowerButton = ({ name, cost, icon, locked }) => (
  <div className={`bg-slate-700 p-4 rounded text-center ${locked ? 'opacity-50' : 'hover:bg-slate-600 cursor-pointer'}`}>
    <div className="text-4xl mb-2">{icon}</div>
    <div className="text-white text-sm">{name}</div>
    <div className="text-yellow-400 text-xs">💰 {cost}</div>
  </div>
);

export default TowerDefense;