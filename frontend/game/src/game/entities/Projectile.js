// Classe Projectile (attaques des tours)

import Phaser from 'phaser';

export class Projectile extends Phaser.GameObjects.Arc {
  constructor(scene, x, y, tower, target) {
    const color = tower.towerData.color || 0xffff00;
    super(scene, x, y, 8, 0, 360, false, color);

    this.scene = scene;
    this.tower = tower;
    this.target = target;
    this.damage = tower.towerData.stats.damage;
    this.speed = tower.towerData.stats.projectileSpeed || 200;

    this.setStrokeStyle(2, 0xffffff);

    // Ajouter à la scène
    scene.add.existing(this);

    // Démarrer le mouvement
    this.moveToTarget();
  }

  moveToTarget() {
    if (!this.target || !this.target.active) {
      this.destroy();
      return;
    }

    const distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );

    const duration = (distance / this.speed) * 1000;

    this.tween = this.scene.tweens.add({
      targets: this,
      x: this.target.x,
      y: this.target.y,
      duration: duration,
      onUpdate: () => {
        // Suivre la cible si elle bouge
        if (this.target && this.target.active) {
          this.tween.updateTo('x', this.target.x, true);
          this.tween.updateTo('y', this.target.y, true);
        }
      },
      onComplete: () => {
        this.hit();
      }
    });
  }

  hit() {
    if (this.target && this.target.active) {
      // Infliger des dégâts
      this.target.takeDamage(this.damage);

      // Effets spéciaux
      if (this.tower.towerData.specialEffect === 'slow') {
        this.target.applySlow(
          this.tower.towerData.slowAmount,
          this.tower.towerData.slowDuration
        );
      }

      // Effet visuel d'impact
      const impact = this.scene.add.circle(this.x, this.y, 15, 0xffffff, 0.8);
      this.scene.tweens.add({
        targets: impact,
        scale: 2,
        alpha: 0,
        duration: 200,
        onComplete: () => impact.destroy()
      });
    }

    this.destroy();
  }

  destroy() {
    if (this.tween) {
      this.tween.remove();
    }
    super.destroy();
  }
}
