// src/components/Defense/GameCanvas.jsx
import { useEffect, useRef, forwardRef } from 'react';

const GameCanvas = forwardRef(({
  gameState,
  currentWave
}, ref) => {
  const internalRef = useRef(null);
  const canvasRef = ref || internalRef;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 200; // Account for header and footer

    // Simple placeholder rendering
    const render = () => {
      // Clear canvas
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;

      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw path
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 80;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width / 3, canvas.height / 2);
      ctx.lineTo(canvas.width / 3, canvas.height / 3);
      ctx.lineTo(2 * canvas.width / 3, canvas.height / 3);
      ctx.lineTo(2 * canvas.width / 3, 2 * canvas.height / 3);
      ctx.lineTo(canvas.width, 2 * canvas.height / 3);
      ctx.stroke();

      // Draw placeholder text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        gameState === 'ready' ? 'Cliquez sur Play pour commencer' : `Vague ${currentWave}`,
        canvas.width / 2,
        50
      );
    };

    render();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 200;
      render();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gameState, currentWave, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      className="block"
      style={{ cursor: 'crosshair' }}
    />
  );
});

GameCanvas.displayName = 'GameCanvas';

export default GameCanvas;
