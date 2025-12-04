// Classe Tour (PC reconditionnés, serveurs, etc.)

import Phaser from 'phaser';

export class Tower extends Phaser.GameObjects.Container {
  constructor(scene, x, y, towerData) {
    super(scene, x, y);

    this.scene = scene;
    this.towerData = towerData;
    this.level = 1;
    this.currentHP = towerData.stats.hp;
    this.maxHP = towerData.stats.hp;

    // État
    this.isActive = true;
    this.lastFireTime = 0;
    this.target = null;

    // Pour les tours de production
    this.lastProductionTime = 0;

    // Pour les tours de support
    this.boostedTowers = [];

    // Créer le visuel
    this.createVisual();

    // Ajouter à la scène
    scene.add.existing(this);

    // Rendre interactif
    this.setInteractive(
      new Phaser.Geom.Circle(0, 0, 30),
      Phaser.Geom.Circle.Contains
    );

    // Événements
    this.on('pointerdown', this.onClicked, this);
    this.on('pointerover', this.onHover, this);
    this.on('pointerout', this.onOut, this);
  }

  createVisual() {
    // Corps principal (cercle avec couleur de la tour)
    this.body = this.scene.add.circle(0, 0, 30, this.towerData.color);
    this.body.setStrokeStyle(3, 0xffffff);
    this.add(this.body);

    // Icône (texte emoji)
    this.icon = this.scene.add.text(0, 0, this.towerData.icon, {
      fontSize: '32px',
      align: 'center'
    });
    this.icon.setOrigin(0.5);
    this.add(this.icon);

    // Cercle de portée (caché par défaut)
    this.rangeCircle = this.scene.add.circle(0, 0, this.getRange(), 0x00ff00, 0);
    this.rangeCircle.setStrokeStyle(2, 0x00ff00, 0.5);
    this.add(this.rangeCircle);

    // Barre de vie
    this.createHealthBar();
  }

  createHealthBar() {
    const width = 50;
    const height = 5;
    const y = -40;

    this.healthBarBg = this.scene.add.rectangle(0, y, width, height, 0x000000);
    this.healthBar = this.scene.add.rectangle(-width / 2, y, width, height, 0x00ff00);
    this.healthBar.setOrigin(0, 0.5);

    this.add(this.healthBarBg);
    this.add(this.healthBar);
  }

  update(time, delta) {
    if (!this.isActive) return;

    const stats = this.towerData.stats;

    // Tours d'attaque
    if (this.towerData.category === 'attack') {
      // Chercher une cible
      if (!this.target || !this.target.active || !this.isInRange(this.target)) {
        this.target = this.findTarget();
      }

      // Tirer si on a une cible
      if (this.target && time - this.lastFireTime >= stats.fireRate) {
        this.fire();
        this.lastFireTime = time;
      }
    }

    // Tours de production
    if (this.towerData.category === 'production') {
      if (time - this.lastProductionTime >= stats.productionRate) {
        this.produce();
        this.lastProductionTime = time;
      }
    }

    // Tours de support (appliquer les effets en continu)
    if (this.towerData.category === 'support') {
      this.applySupport();
    }
  }

  findTarget() {
    const enemies = this.scene.enemies.getChildren();
    const range = this.getRange();

    let closestEnemy = null;
    let closestDistance = Infinity;

    enemies.forEach(enemy => {
      if (!enemy.active) return;

      const distance = Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y);
      if (distance <= range && distance < closestDistance) {
        closestDistance = distance;
        closestEnemy = enemy;
      }
    });

    return closestEnemy;
  }

  fire() {
    if (!this.target) return;

    // Créer un projectile
    this.scene.createProjectile(this, this.target);

    // Animation de tir (agrandir légèrement)
    this.scene.tweens.add({
      targets: this.body,
      scale: 1.2,
      duration: 100,
      yoyo: true
    });
  }

  produce() {
    // Générer des ressources
    const amount = this.towerData.stats.sunProduction;
    this.scene.resourceManager.addSun(amount);

    // Animation de production
    const text = this.scene.add.text(this.x, this.y - 50, `+${amount}☀️`, {
      fontSize: '20px',
      color: '#ffff00'
    });
    text.setOrigin(0.5);

    this.scene.tweens.add({
      targets: text,
      y: text.y - 30,
      alpha: 0,
      duration: 1000,
      onComplete: () => text.destroy()
    });
  }

  applySupport() {
    // Les effets de support sont gérés par le GameScene
    // pour éviter les recalculs constants
  }

  takeDamage(amount) {
    this.currentHP -= amount;
    this.updateHealthBar();

    if (this.currentHP <= 0) {
      this.destroy();
    } else {
      // Animation de dégâts
      this.scene.tweens.add({
        targets: this.body,
        tint: 0xff0000,
        duration: 200,
        yoyo: true
      });
    }
  }

  heal(amount) {
    this.currentHP = Math.min(this.currentHP + amount, this.maxHP);
    this.updateHealthBar();
  }

  updateHealthBar() {
    const ratio = this.currentHP / this.maxHP;
    this.healthBar.scaleX = ratio;

    // Changer la couleur selon la vie
    if (ratio > 0.6) {
      this.healthBar.setFillStyle(0x00ff00);
    } else if (ratio > 0.3) {
      this.healthBar.setFillStyle(0xffaa00);
    } else {
      this.healthBar.setFillStyle(0xff0000);
    }
  }

  upgrade() {
    // TODO: Implémenter l'upgrade
    this.level++;
    // Mettre à jour les stats, le visuel, etc.
  }

  getRange() {
    return this.towerData.stats.range || 0;
  }

  isInRange(target) {
    const range = this.getRange();
    const distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
    return distance <= range;
  }

  onClicked() {
    this.scene.onTowerClicked(this);
  }

  onHover() {
    this.rangeCircle.setAlpha(0.2);
    this.body.setScale(1.1);
  }

  onOut() {
    this.rangeCircle.setAlpha(0);
    this.body.setScale(1);
  }

  destroy() {
    // Retirer de la grille
    const gridPos = this.getData('gridPos');
    if (gridPos) {
      this.scene.gridManager.removeTower(gridPos.col, gridPos.row);
    }

    super.destroy();
  }
}
