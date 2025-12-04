// Gestionnaire des vagues d'ennemis

import { getLevelWaves } from '../data/enemies.js';
import { getEnemyData } from '../data/enemies.js';

export class WaveManager {
  constructor(scene, levelId) {
    this.scene = scene;
    this.levelId = levelId;
    this.waves = getLevelWaves(levelId);

    this.currentWaveIndex = 0;
    this.isWaveActive = false;
    this.enemiesSpawnedInWave = 0;
    this.enemiesToSpawnInWave = 0;

    this.waveTimer = null;
    this.spawnTimers = [];

    this.listeners = [];
  }

  // Démarrer la première vague
  start() {
    if (this.waves.length > 0) {
      this.scheduleNextWave();
    }
  }

  // Programmer la prochaine vague
  scheduleNextWave() {
    if (this.currentWaveIndex >= this.waves.length) {
      // Toutes les vagues sont terminées
      this.notifyWaveComplete();
      return;
    }

    const wave = this.waves[this.currentWaveIndex];

    this.waveTimer = this.scene.time.delayedCall(wave.delay, () => {
      this.startWave(wave);
    });

    this.notifyWaveScheduled(this.currentWaveIndex + 1, wave.delay);
  }

  // Démarrer une vague
  startWave(wave) {
    this.isWaveActive = true;
    this.enemiesSpawnedInWave = 0;

    // Calculer le nombre total d'ennemis dans cette vague
    this.enemiesToSpawnInWave = 0;
    wave.enemies.forEach(enemyGroup => {
      this.enemiesToSpawnInWave += enemyGroup.count;
    });

    this.notifyWaveStart(wave.wave);

    // Programmer le spawn de chaque groupe d'ennemis
    wave.enemies.forEach(enemyGroup => {
      this.spawnEnemyGroup(enemyGroup);
    });
  }

  // Spawner un groupe d'ennemis
  spawnEnemyGroup(enemyGroup) {
    const enemyData = getEnemyData(enemyGroup.type);
    if (!enemyData) {
      console.error(`Enemy type ${enemyGroup.type} not found`);
      return;
    }

    let spawnedCount = 0;

    const spawnInterval = this.scene.time.addEvent({
      delay: enemyGroup.interval || 1000,
      callback: () => {
        // Spawn l'ennemi
        this.scene.spawnEnemy(enemyGroup.type, enemyData);

        spawnedCount++;
        this.enemiesSpawnedInWave++;

        // Si tous les ennemis de ce groupe sont spawnés
        if (spawnedCount >= enemyGroup.count) {
          spawnInterval.remove();
          this.spawnTimers = this.spawnTimers.filter(t => t !== spawnInterval);

          // Si tous les ennemis de la vague sont spawnés
          if (this.enemiesSpawnedInWave >= this.enemiesToSpawnInWave) {
            this.onWaveSpawnComplete();
          }
        }
      },
      repeat: enemyGroup.count - 1
    });

    this.spawnTimers.push(spawnInterval);
  }

  // Quand tous les ennemis de la vague sont spawnés
  onWaveSpawnComplete() {
    this.isWaveActive = false;
    this.currentWaveIndex++;

    // Programmer la prochaine vague
    if (this.currentWaveIndex < this.waves.length) {
      this.scheduleNextWave();
    }
  }

  // Notifier les listeners
  subscribe(callback) {
    this.listeners.push(callback);
  }

  unsubscribe(callback) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  notifyWaveScheduled(waveNumber, delay) {
    this.listeners.forEach(cb => cb({
      type: 'wave_scheduled',
      waveNumber,
      delay,
      totalWaves: this.waves.length
    }));
  }

  notifyWaveStart(waveNumber) {
    this.listeners.forEach(cb => cb({
      type: 'wave_start',
      waveNumber,
      totalWaves: this.waves.length
    }));
  }

  notifyWaveComplete() {
    this.listeners.forEach(cb => cb({
      type: 'all_waves_complete',
      totalWaves: this.waves.length
    }));
  }

  // Obtenir l'état actuel
  getState() {
    return {
      currentWave: this.currentWaveIndex + 1,
      totalWaves: this.waves.length,
      isActive: this.isWaveActive
    };
  }

  // Nettoyer
  destroy() {
    if (this.waveTimer) {
      this.waveTimer.remove();
    }
    this.spawnTimers.forEach(timer => timer.remove());
    this.spawnTimers = [];
    this.listeners = [];
  }
}
