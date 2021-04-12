const tiles = {
  [Spitter.Red]: {
    [Direction.Up]: new AlternatingTile(EnemyTiles.RedSpitterUp1, EnemyTiles.RedSpitterUp2, 60),
    [Direction.Down]: new AlternatingTile(EnemyTiles.RedSpitterDown1, EnemyTiles.RedSpitterDown2, 60),
    [Direction.Left]: new AlternatingTile(EnemyTiles.RedSpitterLeft1, EnemyTiles.RedSpitterLeft2, 60),
    [Direction.Right]: new AlternatingTile(EnemyTiles.RedSpitterRight1, EnemyTiles.RedSpitterRight2, 60),
  },
};

class Spitter extends Actor {
  static Red = 0;
  static Blue = 1;
  type;
  direction;

  constructor(
    x,
    y,
    type,
    direction
  ) {
    super();
    this.x = x;
    this.y = y;
    this.type = type;
    this.direction = direction;
    this.state = new SpitterWalkingState(this);
    this.attackDamage = 0.5;
  }
}

class SpitterWalkingState {
  _entity;
  constructor(entity) {
    this._entity = entity;
    this._entity.tile = tiles[entity.type][entity.direction];
  }

  alignedWithPlayer() {
    const playerRect = this._entity.game.getPlayer().getRect();
    let dx = 10, dy = 10;
    switch(this._entity.direction) {
      case Direction.Up: { dy *= -1; dx = 0; break; }
      case Direction.Down: { dx = 0; break; }
      case Direction.Left: { dx *= -1; dx = 0; break; }
      case Direction.Right: { dy = 0; break; }
    }
    const thisRect = this.getRect();
  }

  tick() {
    if (Math.random() > 0.01) {
      return;
    }
  }
}
