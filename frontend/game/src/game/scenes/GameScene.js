// Scène principale du jeu

import Phaser from 'phaser';
import { ResourceManager } from '../managers/ResourceManager.js';
import { WaveManager } from '../managers/WaveManager.js';
import { GridManager } from '../managers/GridManager.js';
import { Tower } from '../entities/Tower.js';
import { Enemy } from '../entities/Enemy.js';
import { Projectile } from '../entities/Projectile.js';
import { getLevelData, getLevelPath } from '../data/levels.js';
import { TOWERS, getTowerStats } from '../data/towers.js';
import { getEnemyData } from '../data/enemies.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {
    // Recevoir le niveau sélectionné
    this.levelId = data.levelId || 'LEVEL_1';
    this.levelData = getLevelData(this.levelId);
    this.path = getLevelPath(this.levelId);
  }

  create() {
    // Initialiser les managers
    this.initManagers();

    // Créer l'interface de jeu
    this.createBackground();
    this.createBase();
    this.createUI();

    // Groupes d'entités
    this.towers = this.add.group();
    this.enemies = this.add.group();
    this.projectiles = this.add.group();

    // État du jeu
    this.selectedTowerType = null;
    this.gameOver = false;
    this.victory = false;

    // Input
    this.input.on('pointermove', this.onPointerMove, this);
    this.input.on('pointerdown', this.onPointerDown, this);

    // Démarrer les vagues
    this.waveManager.start();
  }

  initManagers() {
    // Resource Manager
    this.resourceManager = new ResourceManager(
      this,
      this.levelData.startingResources.sun,
      this.levelData.startingResources.recycle
    );

    // Grid Manager
    this.gridManager = new GridManager(
      this,
      this.levelData.gridSize.cols,
      this.levelData.gridSize.rows,
      70,  // cellSize
      100, // offsetX
      150  // offsetY
    );

    // Wave Manager
    this.waveManager = new WaveManager(this, this.levelData.wavesConfig);
    this.waveManager.subscribe(this.onWaveEvent.bind(this));

    // Base HP
    this.baseHP = this.levelData.maisonHP;
    this.baseMaxHP = this.levelData.maisonHP;
  }

  createBackground() {
    // Fond simple (à améliorer avec de vraies images)
    this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      0x87CEEB
    );

    // Dessiner le chemin
    const graphics = this.add.graphics();
    graphics.lineStyle(60, 0x8B4513, 0.5);
    graphics.beginPath();
    graphics.moveTo(this.path.start.x, this.path.start.y);

    this.path.waypoints.forEach(waypoint => {
      graphics.lineTo(waypoint.x, waypoint.y);
    });

    graphics.lineTo(this.path.end.x, this.path.end.y);
    graphics.strokePath();
  }

  createBase() {
    // La Mairie NIRD (à défendre)
    this.base = this.add.container(this.path.end.x, this.path.end.y);

    const building = this.add.rectangle(0, 0, 80, 80, 0x8B4513);
    building.setStrokeStyle(3, 0x000000);
    this.base.add(building);

    const icon = this.add.text(0, 0, '🏛️', { fontSize: '48px' });
    icon.setOrigin(0.5);
    this.base.add(icon);

    // Barre de vie de la base
    this.createBaseHealthBar();
  }

  createBaseHealthBar() {
    const width = 100;
    const height = 10;
    const y = 60;

    this.baseHealthBarBg = this.add.rectangle(
      this.path.end.x,
      this.path.end.y + y,
      width,
      height,
      0x000000
    );

    this.baseHealthBar = this.add.rectangle(
      this.path.end.x - width / 2,
      this.path.end.y + y,
      width,
      height,
      0x00ff00
    );
    this.baseHealthBar.setOrigin(0, 0.5);
  }

  createUI() {
    // Texte des ressources (en haut à gauche)
    this.sunText = this.add.text(20, 20, '☀️ 0', {
      fontSize: '28px',
      color: '#ffff00',
      stroke: '#000000',
      strokeThickness: 4
    });

    this.recycleText = this.add.text(20, 60, '♻️ 0', {
      fontSize: '28px',
      color: '#00ff00',
      stroke: '#000000',
      strokeThickness: 4
    });

    // S'abonner aux changements de ressources
    this.resourceManager.subscribe((sun, recycle) => {
      this.sunText.setText(`☀️ ${sun}`);
      this.recycleText.setText(`♻️ ${recycle}`);
    });

    // Info de vague (en haut au centre)
    this.waveText = this.add.text(
      this.cameras.main.width / 2,
      20,
      'Vague 1 / 5',
      {
        fontSize: '32px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4
      }
    );
    this.waveText.setOrigin(0.5, 0);

    // Vie de la base (en haut à droite)
    this.baseHPText = this.add.text(
      this.cameras.main.width - 20,
      20,
      `🏛️ ${this.baseHP}/${this.baseMaxHP}`,
      {
        fontSize: '28px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4
      }
    );
    this.baseHPText.setOrigin(1, 0);

    // Sélecteur de tours (en bas)
    this.createTowerSelector();
  }

  createTowerSelector() {
    const y = this.cameras.main.height - 100;
    const spacing = 90;
    let x = 100;

    // Obtenir les tours disponibles pour ce niveau
    const availableTowerIds = this.levelData.availableTowers === 'all'
      ? Object.keys(TOWERS)
      : this.levelData.availableTowers;

    availableTowerIds.forEach(towerId => {
      const towerData = TOWERS[towerId];
      if (!towerData) return;

      // Bouton de tour
      const button = this.add.container(x, y);

      // Fond
      const bg = this.add.rectangle(0, 0, 70, 70, towerData.color);
      bg.setStrokeStyle(3, 0xffffff);
      button.add(bg);

      // Icône
      const icon = this.add.text(0, -10, towerData.icon, { fontSize: '32px' });
      icon.setOrigin(0.5);
      button.add(icon);

      // Coût
      const cost = this.add.text(0, 25, `${towerData.cost.sun}☀️`, {
        fontSize: '14px',
        color: '#ffff00',
        stroke: '#000000',
        strokeThickness: 2
      });
      cost.setOrigin(0.5);
      button.add(cost);

      // Rendre interactif
      bg.setInteractive({ useHandCursor: true });
      bg.on('pointerdown', () => this.selectTower(towerId, button, bg));

      button.setData('towerId', towerId);
      button.setData('bg', bg);

      x += spacing;
    });
  }

  selectTower(towerId, button, bg) {
    // Désélectionner l'ancienne tour
    if (this.selectedTowerButton) {
      this.selectedTowerButton.setScale(1);
    }

    // Sélectionner la nouvelle tour
    this.selectedTowerType = towerId;
    this.selectedTowerButton = bg;
    bg.setScale(1.2);

    console.log(`Tour sélectionnée: ${towerId}`);
  }

  onPointerMove(pointer) {
    if (!this.selectedTowerType) {
      this.gridManager.clearHighlight();
      return;
    }

    // Convertir la position en coordonnées de grille
    const gridPos = this.gridManager.screenToGrid(pointer.x, pointer.y);

    if (gridPos) {
      const canPlace = this.gridManager.isCellEmpty(gridPos.col, gridPos.row);
      const towerData = TOWERS[this.selectedTowerType];
      const canAfford = this.resourceManager.canAfford(towerData.cost);

      this.gridManager.highlightCell(gridPos.col, gridPos.row, canPlace && canAfford);
    } else {
      this.gridManager.clearHighlight();
    }
  }

  onPointerDown(pointer) {
    if (!this.selectedTowerType) return;

    const gridPos = this.gridManager.screenToGrid(pointer.x, pointer.y);

    if (gridPos && this.gridManager.isCellEmpty(gridPos.col, gridPos.row)) {
      this.placeTower(this.selectedTowerType, gridPos.col, gridPos.row);
    }
  }

  placeTower(towerId, col, row) {
    const towerData = getTowerStats(towerId, 1);

    // Vérifier si on peut payer
    if (!this.resourceManager.pay(towerData.cost)) {
      console.log('Pas assez de ressources !');
      return;
    }

    // Créer la tour
    const screenPos = this.gridManager.gridToScreen(col, row);
    const tower = new Tower(this, screenPos.x, screenPos.y, towerData);

    // Placer dans la grille
    this.gridManager.placeTower(col, row, tower);

    // Ajouter au groupe
    this.towers.add(tower);

    console.log(`Tour placée: ${towerId} à (${col}, ${row})`);
  }

  spawnEnemy(enemyType, enemyData) {
    const enemy = new Enemy(
      this,
      this.path.start.x,
      this.path.start.y,
      enemyData,
      this.path
    );

    this.enemies.add(enemy);
  }

  createProjectile(tower, target) {
    const projectile = new Projectile(this, tower.x, tower.y, tower, target);
    this.projectiles.add(projectile);
  }

  damageBase(amount) {
    this.baseHP -= amount;
    this.updateBaseHP();

    if (this.baseHP <= 0) {
      this.gameOver = true;
      this.onGameOver();
    }

    // Animation
    this.cameras.main.shake(200, 0.01);
  }

  updateBaseHP() {
    this.baseHPText.setText(`🏛️ ${Math.max(0, this.baseHP)}/${this.baseMaxHP}`);

    const ratio = this.baseHP / this.baseMaxHP;
    this.baseHealthBar.scaleX = ratio;

    if (ratio > 0.6) {
      this.baseHealthBar.setFillStyle(0x00ff00);
    } else if (ratio > 0.3) {
      this.baseHealthBar.setFillStyle(0xffaa00);
    } else {
      this.baseHealthBar.setFillStyle(0xff0000);
    }
  }

  onWaveEvent(event) {
    console.log('Wave event:', event);

    if (event.type === 'wave_start') {
      this.waveText.setText(`Vague ${event.waveNumber} / ${event.totalWaves}`);
    }

    if (event.type === 'all_waves_complete') {
      // Vérifier s'il reste des ennemis
      this.checkVictory();
    }
  }

  checkVictory() {
    // Attendre un peu pour voir si tous les ennemis sont morts
    this.time.delayedCall(2000, () => {
      if (this.enemies.getLength() === 0 && !this.gameOver) {
        this.victory = true;
        this.onVictory();
      }
    });
  }

  onGameOver() {
    console.log('GAME OVER !');

    const text = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'GAME OVER\n\nLe village a été envahi...\n\nCliquez pour recommencer',
      {
        fontSize: '48px',
        color: '#ff0000',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'center'
      }
    );
    text.setOrigin(0.5);

    this.input.once('pointerdown', () => {
      this.scene.restart();
    });
  }

  onVictory() {
    console.log('VICTOIRE !');

    const text = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'VICTOIRE !\n\nLe village NIRD résiste !\n\nCliquez pour continuer',
      {
        fontSize: '48px',
        color: '#00ff00',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'center'
      }
    );
    text.setOrigin(0.5);

    this.input.once('pointerdown', () => {
      // TODO: Aller au niveau suivant
      this.scene.restart();
    });
  }

  onTowerClicked(tower) {
    console.log('Tour cliquée:', tower.towerData.name);
    // TODO: Afficher un menu d'upgrade
  }

  update(time, delta) {
    if (this.gameOver || this.victory) return;

    // Update des tours
    this.towers.getChildren().forEach(tower => {
      tower.update(time, delta);
    });

    // Update des ennemis
    this.enemies.getChildren().forEach(enemy => {
      if (enemy.update) {
        enemy.update(time, delta);
      }
    });
  }
}
