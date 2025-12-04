// Composant React pour intégrer Phaser

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';

export default function PhaserGame() {
  const gameRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return; // Déjà initialisé

    const config = {
      type: Phaser.AUTO,
      width: 1400,
      height: 800,
      parent: containerRef.current,
      backgroundColor: '#1a1a2e',
      scene: [MenuScene, GameScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    };

    gameRef.current = new Phaser.Game(config);

    // Cleanup à la destruction du composant
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900">
      <div ref={containerRef} className="w-full max-w-7xl" />

      <div className="mt-4 text-center text-gray-400 text-sm">
        <p>🎮 Utilisez la souris pour placer les tours et défendre votre village NIRD !</p>
        <p className="mt-2">
          <a
            href="https://nird.forge.apps.education.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 underline"
          >
            En savoir plus sur la démarche NIRD →
          </a>
        </p>
      </div>
    </div>
  );
}
