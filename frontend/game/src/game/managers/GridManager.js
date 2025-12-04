// Gestionnaire de la grille de placement des tours

export class GridManager {
  constructor(scene, cols, rows, cellSize = 80, offsetX = 50, offsetY = 100) {
    this.scene = scene;
    this.cols = cols;
    this.rows = rows;
    this.cellSize = cellSize;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    // Grille 2D pour stocker les tours
    this.grid = [];
    for (let row = 0; row < rows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < cols; col++) {
        this.grid[row][col] = null;
      }
    }

    // Graphiques pour afficher la grille
    this.gridGraphics = null;
    this.highlightGraphics = null;

    // Cellule survolée
    this.hoveredCell = null;

    this.drawGrid();
  }

  // Dessiner la grille
  drawGrid() {
    if (this.gridGraphics) {
      this.gridGraphics.clear();
    } else {
      this.gridGraphics = this.scene.add.graphics();
      this.gridGraphics.setDepth(0);
    }

    this.gridGraphics.lineStyle(1, 0x00ff00, 0.3);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const x = this.offsetX + col * this.cellSize;
        const y = this.offsetY + row * this.cellSize;

        // Dessiner le rectangle de la cellule
        this.gridGraphics.strokeRect(x, y, this.cellSize, this.cellSize);
      }
    }
  }

  // Convertir une position écran en coordonnées de grille
  screenToGrid(x, y) {
    const col = Math.floor((x - this.offsetX) / this.cellSize);
    const row = Math.floor((y - this.offsetY) / this.cellSize);

    if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
      return { col, row };
    }

    return null;
  }

  // Convertir des coordonnées de grille en position écran (centre de la cellule)
  gridToScreen(col, row) {
    return {
      x: this.offsetX + col * this.cellSize + this.cellSize / 2,
      y: this.offsetY + row * this.cellSize + this.cellSize / 2
    };
  }

  // Vérifier si une cellule est vide
  isCellEmpty(col, row) {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      return false;
    }
    return this.grid[row][col] === null;
  }

  // Placer une tour dans une cellule
  placeTower(col, row, tower) {
    if (this.isCellEmpty(col, row)) {
      this.grid[row][col] = tower;
      tower.setData('gridPos', { col, row });
      return true;
    }
    return false;
  }

  // Retirer une tour d'une cellule
  removeTower(col, row) {
    if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
      const tower = this.grid[row][col];
      this.grid[row][col] = null;
      return tower;
    }
    return null;
  }

  // Obtenir la tour dans une cellule
  getTowerAt(col, row) {
    if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
      return this.grid[row][col];
    }
    return null;
  }

  // Obtenir toutes les tours
  getAllTowers() {
    const towers = [];
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col]) {
          towers.push(this.grid[row][col]);
        }
      }
    }
    return towers;
  }

  // Afficher le survol de cellule
  highlightCell(col, row, canPlace = true) {
    if (!this.highlightGraphics) {
      this.highlightGraphics = this.scene.add.graphics();
      this.highlightGraphics.setDepth(1);
    }

    this.highlightGraphics.clear();

    if (col !== null && row !== null) {
      const x = this.offsetX + col * this.cellSize;
      const y = this.offsetY + row * this.cellSize;

      const color = canPlace ? 0x00ff00 : 0xff0000;
      const alpha = canPlace ? 0.3 : 0.5;

      this.highlightGraphics.fillStyle(color, alpha);
      this.highlightGraphics.fillRect(x, y, this.cellSize, this.cellSize);

      this.highlightGraphics.lineStyle(2, color, 1);
      this.highlightGraphics.strokeRect(x, y, this.cellSize, this.cellSize);
    }

    this.hoveredCell = { col, row };
  }

  // Cacher le survol
  clearHighlight() {
    if (this.highlightGraphics) {
      this.highlightGraphics.clear();
    }
    this.hoveredCell = null;
  }

  // Obtenir les tours dans un rayon
  getTowersInRadius(x, y, radius) {
    const towers = [];
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const tower = this.grid[row][col];
        if (tower) {
          const distance = Phaser.Math.Distance.Between(x, y, tower.x, tower.y);
          if (distance <= radius) {
            towers.push(tower);
          }
        }
      }
    }
    return towers;
  }

  // Nettoyer
  destroy() {
    if (this.gridGraphics) {
      this.gridGraphics.destroy();
    }
    if (this.highlightGraphics) {
      this.highlightGraphics.destroy();
    }
  }
}
