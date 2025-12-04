// Classe Ennemi (Obsolescence, Big Tech, etc.)

import Phaser from 'phaser';

export class Enemy extends Phaser.GameObjects.Container {
  constructor(scene, x, y, enemyData, path) {
    super(scene, x, y);

    this.scene = scene;
    this.enemyData = enemyData;
    this.path = path;

    this.currentHP = enemyData.stats.hp;
    this.maxHP = enemyData.stats.hp;
    this.speed = enemyData.stats.speed;
    this.damage = enemyData.stats.damage;

    // État
    this.isActive = true;
    this.currentPathIndex = 0;
    this.isSlowed = false;
    this.slowFactor = 1;

    // Créer le visuel
    this.createVisual();

    // Ajouter à la scène
    scene.add.existing(this);

    // Démarrer le mouvement
    this.moveToNextWaypoint();
  }

  createVisual() {
    // Corps principal (cercle avec couleur de l'ennemi)
    this.body = this.scene.add.circle(0, 0, this.enemyData.size / 2, this.enemyData.color);
    this.body.setStrokeStyle(2, 0x000000);
    this.add(this.body);

    // Icône (texte emoji)
    this.icon = this.scene.add.text(0, 0, this.enemyData.icon, {
      fontSize: '24px',
      align: 'center'
    });
    this.icon.setOrigin(0.5);
    this.add(this.icon);

    // Barre de vie
    this.createHealthBar();
  }

  createHealthBar() {
    const width = this.enemyData.size;
    const height = 4;
    const y = -this.enemyData.size / 2 - 10;

    this.healthBarBg = this.scene.add.rectangle(0, y, width, height, 0x000000);
    this.healthBar = this.scene.add.rectangle(-width / 2, y, width, height, 0xff0000);
    this.healthBar.setOrigin(0, 0.5);

    this.add(this.healthBarBg);
    this.add(this.healthBar);
  }

  moveToNextWaypoint() {
    if (this.currentPathIndex >= this.path.waypoints.length) {
      // Arrivé à la fin, attaquer la mairie
      this.reachEnd();
      return;
    }

    const waypoint = this.path.waypoints[this.currentPathIndex];
    const distance = Phaser.Math.Distance.Between(this.x, this.y, waypoint.x, waypoint.y);
    const duration = (distance / this.speed) * 1000 / this.slowFactor;

    this.moveTween = this.scene.tweens.add({
      targets: this,
      x: waypoint.x,
      y: waypoint.y,
      duration: duration,
      onComplete: () => {
        this.currentPathIndex++;
        this.moveToNextWaypoint();
      }
    });
  }

  reachEnd() {
    // Infliger des dégâts à la mairie
    this.scene.damageBase(this.damage);

    // Appliquer les effets spéciaux
    if (this.enemyData.stats.stealSun) {
      this.scene.resourceManager.removeSun(this.enemyData.stats.stealSun);
    }

    // Détruire l'ennemi
    this.destroy();
  }

  takeDamage(amount) {
    // Appliquer l'armure si présente
    if (this.enemyData.stats.armor) {
      amount *= (1 - this.enemyData.stats.armor);
    }

    this.currentHP -= amount;
    this.updateHealthBar();

    // Animation de dégâts
    this.scene.tweens.add({
      targets: this.body,
      tint: 0xffffff,
      duration: 100,
      yoyo: true
    });

    if (this.currentHP <= 0) {
      this.die();
    } else {
      // Vérifier les effets spéciaux
      if (this.enemyData.stats.splitOnDeath && this.currentHP <= this.enemyData.stats.splitThreshold) {
        this.split();
      }
    }
  }

  die() {
    // Donner les récompenses
    const reward = this.enemyData.stats.reward;
    if (reward) {
      if (reward.sun) this.scene.resourceManager.addSun(reward.sun);
      if (reward.recycle) this.scene.resourceManager.addRecycle(reward.recycle);
    }

    // Effet d'explosion si nécessaire
    if (this.enemyData.stats.explodeOnDeath) {
      this.explode();
    }

    // Animation de mort
    this.scene.tweens.add({
      targets: this,
      scale: 0,
      alpha: 0,
      duration: 300,
      onComplete: () => {
        this.destroy();
      }
    });
  }

  explode() {
    const radius = this.enemyData.stats.explosionRadius || 80;
    const damage = this.enemyData.stats.explosionDamage || 50;

    // Effet visuel
    const explosion = this.scene.add.circle(this.x, this.y, 10, 0xff0000);
    this.scene.tweens.add({
      targets: explosion,
      radius: radius,
      alpha: 0,
      duration: 500,
      onComplete: () => explosion.destroy()
    });

    // Dégâts aux tours proches
    const towers = this.scene.gridManager.getTowersInRadius(this.x, this.y, radius);
    towers.forEach(tower => {
      tower.takeDamage(damage);
    });
  }

  split() {
    // Créer 2 ennemis plus petits
    // Pour simplifier, on va juste spawn 2 nouveaux ennemis du même type
    for (let i = 0; i < 2; i++) {
      const offset = i === 0 ? -20 : 20;
      const newEnemyData = {
        ...this.enemyData,
        stats: {
          ...this.enemyData.stats,
          hp: this.currentHP / 2,
          splitOnDeath: false // Ne pas re-splitter
        }
      };

      // On ne peut pas facilement créer un nouvel ennemi ici
      // Ce serait mieux géré par le GameScene
      // Pour le MVP, on ignore cette fonctionnalité pour l'instant
    }
  }

  updateHealthBar() {
    const ratio = this.currentHP / this.maxHP;
    this.healthBar.scaleX = ratio;
  }

  applySlow(factor, duration) {
    this.isSlowed = true;
    this.slowFactor = factor;

    // Ralentir le tween actuel
    if (this.moveTween) {
      this.moveTween.timeScale = factor;
    }

    // Retirer le ralentissement après la durée
    this.scene.time.delayedCall(duration, () => {
      this.isSlowed = false;
      this.slowFactor = 1;
      if (this.moveTween) {
        this.moveTween.timeScale = 1;
      }
    });
  }

  update(time, delta) {
    // Effets spéciaux continus
    if (this.enemyData.stats.growStronger) {
      // Grandir en puissance
      const growthInterval = this.enemyData.stats.growthInterval || 1000;
      if (!this.lastGrowthTime) this.lastGrowthTime = time;

      if (time - this.lastGrowthTime >= growthInterval) {
        this.maxHP += this.enemyData.stats.growthRate;
        this.currentHP += this.enemyData.stats.growthRate;
        this.damage += this.enemyData.stats.growthRate;
        this.lastGrowthTime = time;

        // Effet visuel
        this.scene.tweens.add({
          targets: this.body,
          scale: 1.2,
          duration: 200,
          yoyo: true
        });
      }
    }

    if (this.enemyData.stats.drainSun) {
      // Drainer les ressources
      const drainInterval = this.enemyData.stats.drainInterval || 1000;
      if (!this.lastDrainTime) this.lastDrainTime = time;

      if (time - this.lastDrainTime >= drainInterval) {
        this.scene.resourceManager.removeSun(this.enemyData.stats.drainSun);
        this.lastDrainTime = time;
      }
    }
  }

  destroy() {
    if (this.moveTween) {
      this.moveTween.remove();
    }
    super.destroy();
  }
}
