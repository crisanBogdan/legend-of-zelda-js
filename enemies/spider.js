class Spider extends Actor {
  static MinJumpDistance = 30;
  static MaxJumpDistance = 50;
  static Red = 0;
  static Blue = 1;
  type;
  constructor(
    x,
    y,
    type
  ) {
    super();
    this.x = x;
    this.y = y;
    this.type = type;
    this.state = new SpiderStandingState(this);
    this.attackDamage = 0.5;
  }

  checkForPlayerCollision = () => {
    const player = this.game.getPlayer();
    const intersection = this.intersects(player.getDamageRect());
    if (intersection.valid) {
      player.damage(this.attackDamage, intersection.direction);
      this.state = new SpiderStandingState(this);
    }
  }
}

class SpiderStandingState {
  _entity;
  constructor(entity) {
    this._entity = entity;
    if (entity.type == Spider.Red) {
      entity.tile = new AlternatingTile(EnemyTiles.RedSpider1, EnemyTiles.RedSpider2, 60);
    } else {
      entity.tile = new AlternatingTile(EnemyTiles.BlueSpider1, EnemyTiles.BlueSpider2, 60);
    }
  }

  tick() {
    if (Math.random() > 0.01) {
      return;
    }
    const { x, y } = this._entity;
    const { width, height } = this._entity.tile.getData();
    const _distX = Utils.randomRange(Spider.MinJumpDistance, Spider.MaxJumpDistance);
    const _distY = Utils.setInRange(_distX - 10, _distX + 10, Utils.randomRange(Spider.MinJumpDistance, Spider.MaxJumpDistance));
    // if at the edge of the screen jump the other way
    const distX = Utils.approxEqual(x, 0, 10) ? _distX : (Utils.approxEqual(x, Game.GAME_WIDTH - width, 10) ? -_distX : (Math.random() < 0.5 ? _distX : -_distX));
    const distY = Utils.approxEqual(y, 0, 10) ? _distY : (Utils.approxEqual(y, Game.GAME_HEIGHT - height, 10) ? -_distY : (Math.random() < 0.5 ? _distY : -_distY));
    const newX = Utils.setInRange(0, Game.GAME_WIDTH - width, x + distX);
    const newY = Utils.setInRange(0, Game.GAME_HEIGHT - height, y + distY);

    this._entity.state = new SpiderPreparingToJumpState(
      this._entity,
      newX,
      newY,
    );
    return;
  }

}

class SpiderPreparingToJumpState {
  _entity;
  _targetX;
  _targetY;
  _frame = 0;
  _duration = 30;
  constructor(entity, targetX, targetY) {
    this._entity = entity;
    this._targetX = targetX;
    this._targetY = targetY;
    if (entity.type == Spider.Red) {
      entity.tile = EnemyTiles.RedSpider2;
    } else {
      entity.tile = EnemyTiles.BlueSpider2;
    }
  }

  tick() {
    if (this._frame++ === this._duration) {
      this._entity.state = new SpiderJumpingState(this._entity, this._targetX, this._targetY);
    }
  }

}

class SpiderJumpingState {
  _entity;
  _targetX;
  _targetY;
  _dx = 1.2;
  _dy = 1.5;
  _frame = 0;
  constructor(entity, targetX, targetY) {
    this._entity = entity;
    this._targetX = targetX;
    this._targetY = targetY;
    if (targetX < entity.x) {
      this._dx *= -1;
    }
    if (targetY < entity.y) {
      this._dy *= -1;
    }
    if (entity.type == Spider.Red) {
      this._entity.tile = EnemyTiles.RedSpider1;
    } else {
      this._entity.tile = EnemyTiles.BlueSpider1;
    }
  }

  tick() {
    const { x, y } = this._entity;
    const isXEqual = Utils.approxEqual(x, this._targetX, Math.abs(this._dx));
    const isYEqual = Utils.approxEqual(y, this._targetY, Math.abs(this._dy));
    if (isXEqual && isYEqual) {
      this._entity.state = new SpiderStandingState(this._entity);
      return;
    }
    if (!isXEqual) this._entity.x += this._dx;
    if (!isYEqual) {
      // jumping effect
      if (this._frame++ < 8) this._entity.y -= Math.abs(this._dy);
      else this._entity.y += this._dy;
    } 
  }
}