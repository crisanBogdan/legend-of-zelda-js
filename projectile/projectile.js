class Projectile {
  id = Math.random();
  _game;
  _entity;
  _direction;
  _state = new ProjectileFlyingState(this);
  _explosionCreator;
  _damage = 1;


  constructor({
    game, tile, x, y, direction, explosionCreator,
    dx = 2,
    dy = 2
  }) {
    this._game = game;
    this._explosionCreator = explosionCreator;
    this._entity = new MovingEntity({
      tile,
      x,
      y,
      game,
    });
    this._direction = direction;
    switch (direction) {
      case Direction.Up: {
        this._entity.setData({ dx: 0, dy: -dy });
        break;
      }
      case Direction.Down: {
        this._entity.setData({ dx: 0, dy: dy });
        break;
      }
      case Direction.Left: {
        this._entity.setData({ dx: -dx, dy: 0 });
        break;
      }
      case Direction.Right: {
        this._entity.setData({ dx: dx, dy: 0 });
        break;
      }
    }

  }

  _collidesWithLevelBounds = () => {
    const { GAME_WIDTH, GAME_HEIGHT } = Game;
    const { width, height } = this._entity.getTileData();
    const { x, y } = this._entity.getPosition();
    const buffer = 1;
    switch (this._direction) {
      case Direction.Up: {
        return y - buffer < 0;
      }
      case Direction.Down: {
        return y + height + buffer > GAME_HEIGHT;
      }
      case Direction.Left: {
        return x - buffer < 0;
      }
      case Direction.Right: {
        return x + width + buffer > GAME_WIDTH;
      }
    }
  }
  _collidesWithActors = () => {
    const thisRect = this._entity.getRect();
    const found = this._game.getActors().find(a => Utils.intersects(thisRect, a.getRect()).valid);
    if (found) {
      found.damage(this._damage);
    }
  }
  tick = () => this._state.tick();
  draw = () => this._state.draw();
  setState = state => this._state = state;

  collides = () => {
    return this._collidesWithActors() || this._collidesWithLevelBounds();
  }
  onCollision = () => {
    if (this._explosionCreator) {
      const { x, y } = this._entity.getPosition();
      this._entity = this._explosionCreator({ 
        x, y,
        game: this._game,
        onExplosionFinish: () => this._game.removeProjectile(this)
      });
      this.setState(new ProjectileExplodingState(this));
    } else {
      this._game.removeProjectile(this);
    }
  }
}

class ProjectileFlyingState {
  _projectile;
  constructor(projectile) {
    this._projectile = projectile;
  }
  tick() {
    if (this._projectile.collides()) {
      this._projectile.onCollision();
      return;
    }
    this._projectile._entity.tick();
  }
  draw() {
    this._projectile._entity.draw();
  }
}

class ProjectileExplodingState {
  _projectile;
  constructor(projectile) {
    this._projectile = projectile;
  }
  tick() {
    this._projectile._entity.tick();
  }
  draw() {
    this._projectile._entity.draw();
  }
}
