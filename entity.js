class Entity {
  game;
  x;
  y;
  tile;

  tick = () => {}
  draw() {
    this.game.renderer.drawGameTile(this.tile, this.x, this.y);
    // this.game.renderer.drawGameRectOutline(this.getRect());
  }
  getPosition = () => ({ x: this.x, y: this.y });
  getTile = () => this.tile;
  getTileData = () => this.tile.getData();
  getRect = () => {
    const { width, height } = this.tile.getData();
    return {
      width,
      height,
      x: this.x,
      y: this.y
    };
  }
  intersects = rect => Utils.intersects(rect, this.getRect());
  setGame = game => this.game = game;
}

class MovingEntity extends Entity {
  dx; dy;
  constructor({ tile, game, x, y, dx, dy }) {
    super();
    this.tile = tile;
    this.game = game;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  tick = () => {
    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    // don't draw out of bounds
    if (this.x + this.tile.getData().width > Game.GAME_WIDTH || this.y + this.tile.getData().height > Game.GAME_HEIGHT) {
      return;
    }
    this.game.renderer.drawGameTile(this.tile, this.x, this.y);
  }

  setData = (config) => {
    Object.keys(config).forEach(key => this[key] = config[key]);
  };
}

class CompoundMovingEntities {
  _entities;
  constructor(entities) {
    this._entities = entities;
  }
  tick() {
    this._entities.forEach(t => t.tick());
  }
  draw() {
    this._entities.forEach(t => t.draw());
  }
}

class TimedEntity {
  _frame = 0;
  _duration;
  _entity;
  _listeners = [];
  
  constructor(entity, duration = 60, onExpire) {
    this._entity = entity;
    this._duration = duration;
    onExpire && this._listeners.push(onExpire);
  }

  _notifyListeners() {
    this._listeners.forEach(l => l());
  }
  
  onExpire(callback) {
    this._listeners.push(callback);
  }

  tick() {
    if (this._frame === this._duration) {
      this._notifyListeners();
      return;
    }
    this._frame++;
    this._entity.tick();
  }

  draw = () => this._entity.draw();
}