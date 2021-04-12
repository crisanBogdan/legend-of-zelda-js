class LevelTransition {
  // length of the transition in frames
  static Duration = 30;

  _from; _to; _direction; _duration; _frame = 0;

  constructor(from, to, direction, duration = LevelTransition.Duration) {
    this._from = from;
    this._to = to;
    this._direction = direction;
    this._duration = duration;
  }

  _downTransition() {
    let tiles = [], i = 0, j = 0, x;

    for (i = Game.LEVEL_HEIGHT - 1; i >= Game.LEVEL_HEIGHT - Math.floor(this._frame / this._duration * Game.LEVEL_HEIGHT); i--) {
      for (j = 0; j < Game.LEVEL_WIDTH; j++) {
        x = i * Game.LEVEL_WIDTH + j;
        tiles[x] = this._to.tiles[x];
      }
    }
    for (; i >= 0; i--) {
      for (j = 0; j < Game.LEVEL_WIDTH; j++) {
        x = i * Game.LEVEL_WIDTH + j;
        tiles[x] = this._from.tiles[x];
      }
    }   
    return tiles;
  }

  _upTransition() {
    let tiles = [], i = 0, j = 0;

    for (i = 0; i < Math.floor(this._frame / this._duration * Game.LEVEL_HEIGHT); i++) {
      for (j = 0; j < Game.LEVEL_WIDTH; j++) {
        tiles.push(this._to.tiles[i * Game.LEVEL_WIDTH + j]);
      }
    }
    for (;i < Game.LEVEL_HEIGHT; i++) {
      for (j = 0; j < Game.LEVEL_WIDTH; j++) {
        tiles.push(this._from.tiles[i * Game.LEVEL_WIDTH + j]);
      }
    }   
    return tiles;
  }

  _leftTransition() {
    return this._defaultTransition();
  }

  _rightTransition() {
    return this._defaultTransition();
  }
  
  _defaultTransition() {
    return new Array(Game.LEVEL_WIDTH * Game.LEVEL_HEIGHT).fill(OverworldTiles.B);
  }

  getTiles() {
    this._frame++;
    switch(this._direction) {
      case Direction.Up: return this._defaultTransition();
      case Direction.Down: return this._defaultTransition();
      case Direction.Left: return this._defaultTransition();
      case Direction.Right: return this._defaultTransition();
      default: return this._defaultTransition();
    }
  }

  getFromLevel = () => this._from;
  getToLevel = () => this._to;

  isDone() {
    return this._frame >= this._duration;
  }
}