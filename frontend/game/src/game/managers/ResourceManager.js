// Gestionnaire des ressources (Soleil et Composants Recyclés)

export class ResourceManager {
  constructor(scene, startingSun = 250, startingRecycle = 0) {
    this.scene = scene;
    this.sun = startingSun;
    this.recycle = startingRecycle;

    this.listeners = [];

    // Configuration du soleil qui tombe du ciel
    this.sunFallInterval = 12000; // 12 secondes
    this.sunAmount = 25;
    this.sunTimer = null;

    this.startSunProduction();
  }

  // Démarre la production automatique de soleil
  startSunProduction() {
    this.sunTimer = this.scene.time.addEvent({
      delay: this.sunFallInterval,
      callback: this.generateSunFromSky,
      callbackScope: this,
      loop: true
    });
  }

  // Génère du soleil qui tombe du ciel
  generateSunFromSky() {
    const x = Phaser.Math.Between(100, this.scene.game.config.width - 100);
    const y = 50;

    // Créer un objet soleil visuel
    const sun = this.scene.add.circle(x, y, 20, 0xffff00);
    sun.setStrokeStyle(2, 0xffaa00);
    sun.setInteractive({ useHandCursor: true });
    sun.setData('value', this.sunAmount);

    // Animation de chute
    this.scene.tweens.add({
      targets: sun,
      y: y + 200,
      duration: 3000,
      ease: 'Bounce.easeOut',
      onComplete: () => {
        // Le soleil disparaît après 5 secondes s'il n'est pas collecté
        this.scene.time.delayedCall(5000, () => {
          if (sun.active) {
            sun.destroy();
          }
        });
      }
    });

    // Collecter au clic
    sun.on('pointerdown', () => {
      this.addSun(sun.getData('value'));

      // Animation de collection
      this.scene.tweens.add({
        targets: sun,
        scale: 1.5,
        alpha: 0,
        duration: 300,
        onComplete: () => sun.destroy()
      });

      // Effet sonore (à ajouter plus tard)
      // this.scene.sound.play('collect_sun');
    });
  }

  // Ajouter du soleil
  addSun(amount) {
    this.sun += amount;
    this.notifyListeners();
  }

  // Retirer du soleil
  removeSun(amount) {
    if (this.sun >= amount) {
      this.sun -= amount;
      this.notifyListeners();
      return true;
    }
    return false;
  }

  // Ajouter des composants recyclés
  addRecycle(amount) {
    this.recycle += amount;
    this.notifyListeners();
  }

  // Retirer des composants recyclés
  removeRecycle(amount) {
    if (this.recycle >= amount) {
      this.recycle -= amount;
      this.notifyListeners();
      return true;
    }
    return false;
  }

  // Vérifier si on peut payer un coût
  canAfford(cost) {
    return this.sun >= (cost.sun || 0) && this.recycle >= (cost.recycle || 0);
  }

  // Payer un coût
  pay(cost) {
    if (this.canAfford(cost)) {
      if (cost.sun) this.removeSun(cost.sun);
      if (cost.recycle) this.removeRecycle(cost.recycle);
      return true;
    }
    return false;
  }

  // S'abonner aux changements de ressources
  subscribe(callback) {
    this.listeners.push(callback);
    // Appeler immédiatement avec les valeurs actuelles
    callback(this.sun, this.recycle);
  }

  // Désabonner
  unsubscribe(callback) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  // Notifier tous les listeners
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.sun, this.recycle));
  }

  // Obtenir les ressources actuelles
  getResources() {
    return {
      sun: this.sun,
      recycle: this.recycle
    };
  }

  // Arrêter la production (quand le niveau est terminé)
  stop() {
    if (this.sunTimer) {
      this.sunTimer.remove();
      this.sunTimer = null;
    }
  }

  // Nettoyer
  destroy() {
    this.stop();
    this.listeners = [];
  }
}
