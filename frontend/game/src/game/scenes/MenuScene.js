// Scène de menu principal

import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Fond
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e);

    // Titre
    const title = this.add.text(width / 2, 100, 'NIRD VILLAGE', {
      fontSize: '64px',
      color: '#00ff00',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6
    });
    title.setOrigin(0.5);

    const subtitle = this.add.text(width / 2, 180, 'Digital Fortress', {
      fontSize: '32px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    });
    subtitle.setOrigin(0.5);

    // Description
    const desc = this.add.text(
      width / 2,
      250,
      'Défendez votre village numérique contre\nl\'obsolescence et les Big Tech !',
      {
        fontSize: '20px',
        color: '#cccccc',
        align: 'center'
      }
    );
    desc.setOrigin(0.5);

    // Sélection de niveau
    this.createLevelButtons();

    // Crédits
    const credits = this.add.text(
      width / 2,
      height - 30,
      '🤖 Généré avec Claude Code | Nuit de l\'Info 2025',
      {
        fontSize: '16px',
        color: '#666666'
      }
    );
    credits.setOrigin(0.5);
  }

  createLevelButtons() {
    const width = this.cameras.main.width;
    const levels = [
      {
        id: 'LEVEL_1',
        name: 'L\'École Primaire',
        desc: 'Introduction - 5 vagues',
        difficulty: 'FACILE'
      },
      {
        id: 'LEVEL_2',
        name: 'Le Collège Connecté',
        desc: 'Intermédiaire - 5 vagues',
        difficulty: 'MOYEN'
      },
      {
        id: 'LEVEL_3',
        name: 'Le Village NIRD',
        desc: 'Boss Final - 5 vagues',
        difficulty: 'DIFFICILE'
      }
    ];

    let y = 350;

    levels.forEach((level, index) => {
      const button = this.add.container(width / 2, y);

      // Fond du bouton
      const bg = this.add.rectangle(0, 0, 500, 80, 0x0f3460);
      bg.setStrokeStyle(3, 0x00ff00);
      button.add(bg);

      // Nom du niveau
      const name = this.add.text(-230, -20, level.name, {
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold'
      });
      button.add(name);

      // Description
      const desc = this.add.text(-230, 10, level.desc, {
        fontSize: '16px',
        color: '#cccccc'
      });
      button.add(desc);

      // Difficulté
      const difficultyColors = {
        'FACILE': '#00ff00',
        'MOYEN': '#ffaa00',
        'DIFFICILE': '#ff0000'
      };

      const difficulty = this.add.text(230, 0, level.difficulty, {
        fontSize: '20px',
        color: difficultyColors[level.difficulty],
        fontStyle: 'bold'
      });
      difficulty.setOrigin(1, 0.5);
      button.add(difficulty);

      // Interactivité
      bg.setInteractive({ useHandCursor: true });

      bg.on('pointerover', () => {
        bg.setFillStyle(0x164863);
        this.tweens.add({
          targets: button,
          scale: 1.05,
          duration: 100
        });
      });

      bg.on('pointerout', () => {
        bg.setFillStyle(0x0f3460);
        this.tweens.add({
          targets: button,
          scale: 1,
          duration: 100
        });
      });

      bg.on('pointerdown', () => {
        this.startLevel(level.id);
      });

      y += 100;
    });
  }

  startLevel(levelId) {
    console.log(`Démarrage du niveau: ${levelId}`);
    this.scene.start('GameScene', { levelId });
  }
}
