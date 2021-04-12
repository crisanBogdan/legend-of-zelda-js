class DrawOrder {
  static First = 0;
  static Last = 1;
}

/**
 * game tile meaning: below the ui bar
 */
class Renderer {
  _canvas;
  _ctx;

  init() {
    this._canvas = document.querySelector('canvas');
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;

    this._ctx = this._canvas.getContext('2d');

    this._ctx.fillStyle = '#000';
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

    this._ctx.textBaseline = 'middle';
    this._ctx.font = `8px 'Press Start 2P'`;
    // this._ctx.scale(2, 2);
  }

  drawGameTileFromIndexes = (tile, xIndex, yIndex) => {
    tile = tile.getData();
    this._ctx.drawImage(
      tile.sprite,
      tile.x,
      tile.y,
      tile.width || Game.TILE_WIDTH,
      tile.height || Game.TILE_HEIGHT,
      Game.BASEX + (xIndex * Game.TILE_WIDTH) + (tile.dx || 0),
      Game.BASEY + (yIndex * Game.TILE_HEIGHT) + (tile.dy || 0),
      tile.width || Game.TILE_WIDTH,
      tile.height || Game.TILE_HEIGHT,
    );
  }

  drawGameTile = (tile, x, y) => {
    tile = tile.getData();
    this._ctx.drawImage(
      tile.sprite,
      tile.x,
      tile.y,
      tile.width || Game.TILE_WIDTH - 1,
      tile.height || Game.TILE_HEIGHT - 1,
      Game.BASEX + x + (tile.dx || 0),
      Game.BASEY + y + (tile.dy || 0),
      tile.width || Game.TILE_WIDTH,
      tile.height || Game.TILE_HEIGHT
    );
  }

  drawTile = (tile, x, y) => {
    tile = tile.getData();
    this._ctx.drawImage(
      tile.sprite,
      tile.x,
      tile.y,
      tile.width,
      tile.height,
      x,
      y,
      tile.width,
      tile.height
    );
  }

  drawGamePoint = (x, y) => {
    this._ctx.fillStyle = 'rgb(255,0,0)';
    this._ctx.fillRect(Game.BASEX + x, Game.BASEY + y, 10, 10);
  }

  drawText(text, x, y, color, size = 8) {
    if (size) {
      this._ctx.font = `${size}px 'Press Start 2P'`;
    }
    this._ctx.fillStyle = color;
    this._ctx.fillText(text, x, y);
    if (size) {
      this._ctx.font = `8px 'Press Start 2P'`;
    }
  }

  drawRect = (rect) => {
    this._ctx.fillStyle = rect.color || '#000';
    this._ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  }

  drawGameRectOutline = (rect) => {
    this._ctx.fillStyle = rect.color || '#000';
    this._ctx.strokeRect(Game.BASEX + rect.x, Game.BASEY + rect.y, rect.width, rect.height);
  }
  
  drawLevel = (level) => {
    let tile;

    this._ctx.fillStyle = '#000';
    this._ctx.fillRect(Game.BASEX, Game.BASEY, Game.GAME_WIDTH + Game.TILE_WIDTH, Game.GAME_HEIGHT + Game.TILE_HEIGHT);

    for (let order = DrawOrder.First; order <= DrawOrder.Last; order++) {
      for (let i = 0; i < Game.LEVEL_HEIGHT; i++) {
        for (let j = 0; j < Game.LEVEL_WIDTH; j++) {
          tile = level.tiles[i * Game.LEVEL_WIDTH + j].getData();
          tile.order = tile.order || DrawOrder.First;
          if (tile.order === order) {
            this.drawGameTileFromIndexes(level.tiles[i * Game.LEVEL_WIDTH + j], j, i);
          }
        }
      }
    }

    if (level.text) {
      this._ctx.fillStyle = '#fff';
      level.text.getText().forEach(line => {
        this._ctx.fillText(line.text, Game.BASEX + line.x, Game.BASEY + line.y);
      });
    }
  }
}