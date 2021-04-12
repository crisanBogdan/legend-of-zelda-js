class Player {
  position = new PlayerPosition(this);
  tile = new PlayerTile(this);
  _state = new WalkingPlayerState(this);
  _canAttack = true;
  invulnerable = false;

  game;
  input;
  renderer;
  inventory;


  setGame = game => { 
    this.game = game;
    this.position.game = game;
    return this;
  }
  setInput = input => {
    this.input = input;
    this.position.input = input;
    this.tile.input = input;
    return this;
  }
  setRenderer = renderer => { this.renderer = renderer; return this; }
  setInventory = inventory => {
    this.inventory = inventory;
    return this;
  }
  setPositionFromIndexes = (xIndex, yIndex) => this.position.set(
    xIndex * Game.TILE_WIDTH,
    yIndex * Game.TILE_HEIGHT
  )
  setTile = this.tile.setTile;
  resetTile = this.tile.resetTile;
  setHoldingItem = () => this.tile.setTile(LinkTiles.Holding1);
  setState = state => { this._state = state; };
  setCanAttack = (bool = true) => this._canAttack = bool;

  getInventory = () => this.inventory;
  getTile = () => this.tile.getTile();
  getSize = () => this.getTile().getData();
  getDirection = this.tile.getDirection;
  getTopLeftCoords = () => {
    const { dx = 0, dy = 0 } = this.getTile().getData();
    return { x: this.position.x + dx, y: this.position.y + dy };
  }
  getCenterCoords = () => ({ x: this.position.x + Game.TILE_WIDTH / 2, y: this.position.y + Game.TILE_HEIGHT / 2 });
  _getRect = () => {
    const { width, height } = this.getTile().getData();
    return {
      width,
      height,
      ...this.getTopLeftCoords()
    };
  }
  getRect = () => {
    return this.getDamageRect();
  } 
  getDamageRect = () => {
    const { x, y, width, height } = this._getRect();
    return {
      x: x + 4,
      y: y + 4,
      width: width - 8,
      height: height - 8
    };
  }
  getAttackRect = () => this._getRect();
  getDamage = () => this.inventory.primaryItemDamage();

  getPosition = () => {
    const { width, height } = this.getTile().getData();
    switch (this.tile._direction) {
      case Direction.Down: {
        return {
          x: this.position.x + Math.floor(width / 2),
          y: this.position.y + 1,
        };
      }
      case Direction.Up: {
        return {
          x: this.position.x + Math.floor(width / 2),
          y: this.position.y + height - 1,
        };
      }
      case Direction.Left: {
        return {
          x: this.position.x + Math.floor(width / 2),
          y: this.position.y + Math.floor(height / 2),
        };
      }
      case Direction.Right: {
        return {
          x: this.position.x + Math.floor(width / 2),
          y: this.position.y + Math.floor(height / 2),
        };
      }
    }
  } 

  attack = () => {
    if (!this._canAttack) {
      return;
    }
    if (!this.inventory.canAttack()) {
      return;
    }
    if (this._state.attacking) {
      return;
    }
    if (this.inventory.canShootPrimaryProjectile() && !this.game.primaryWeaponProjectileExists()) {
      this.setState(new AttackingStates[this.inventory.primaryItemName()]['ranged'](this));
      return;
    }
    this.setState(new AttackingStates[this.inventory.primaryItemName()]['melee'](this));
  }

  init() {    
    this.position.init();
    this.tile.init();
  }

  tick = frame => this._state.tick(frame);

  draw(frame) {
    this.renderer.drawGameTile(this.tile.getTile(), this.position.x, this.position.y);
    // this.renderer.drawGameRectOutline(this.getDamageRect());
  }

  damage = (amount, direction) => {
    if (this._state.attacking || this.invulnerable) {
      return;
    }
    this.inventory.damage(amount);
    if (this.inventory.hearts <= 0) {
      this.game.playerDeath();
      return;
    }
    this.invulnerable = true;
    LinkTiles.setToAlternatingGreenGrey();
    this.setState(new PlayerDamagedState(this, direction));
    setTimeout(() => {
      this.invulnerable = false;
      LinkTiles.setToGreenTiles();
    }, 1500);
  }

  hitEnemies = () => {
    const playerRect = this.getAttackRect();
    const enemyHit = this.game.getNpcs().find(npc => npc.intersects(playerRect).valid);
    enemyHit && enemyHit.damage(this.getDamage());
  }
}

class PlayerPosition {
  _dx = 1.2;
  _dy = 1.2;

  x = 0;
  y = 0;

  // temp positions
  _x = 0;
  _y = 0;

  _parent;

  tick;

  constructor(parent) {
    this._parent = parent;
  }
  
  _saveTempPos = () => { this.x = this._x; this.y = this._y; };
  _undoTempPos = () => { this._x = this.x; this._y = this.y; };

  moveUp = () => {
    const { width, height } = this._parent.getSize();
    this._y -= this._dy;
    this._parent.game.collidesWithTerrain(this._x + width / 2, this._y + height / 2) ? this._undoTempPos() : this._saveTempPos();
  };
  moveDown = () => {
    const { width, height } = this._parent.getSize();
    this._y += this._dy;
    this._parent.game.collidesWithTerrain(this._x + width / 2, this._y + height - 2) ? this._undoTempPos() : this._saveTempPos();
  };
  moveLeft = () => {
    const { width, height } = this._parent.getSize();
    this._x -= this._dx;
    this._parent.game.collidesWithTerrain(this._x + 1, this._y + height * 3 / 4) ? this._undoTempPos() : this._saveTempPos();
  };
  moveRight = () => {
    const { width, height } = this._parent.getSize();
    this._x += this._dx;
    this._parent.game.collidesWithTerrain(this._x + width, this._y + height * 3 / 4) ? this._undoTempPos() : this._saveTempPos();
  };

  init() {
    this._x = this.x;
    this._y = this.y;

    this.tick = this._parent.input.onInput({
      onUp: this.moveUp,
      onDown: this.moveDown,
      onLeft: this.moveLeft,
      onRight: this.moveRight,
    });
  }

  set = (x, y) => {
    this.x = x; this._x = x;
    this.y = y; this._y = y;
  }
}

class PlayerTile {
  // _previousTile;
  _tile = LinkTiles.Down2;
  _parent;
  _direction = Direction.Down;

  tick;

  constructor(parent) {
    this._parent = parent;
  }

  _onUp = (_frame) => { this._tile = Sprites.IsPrimarySpriteFrame(_frame) ? LinkTiles.Up2 : LinkTiles.Up1; this._direction = Direction.Up; }
  _onDown = (_frame) => { this._tile = Sprites.IsPrimarySpriteFrame(_frame) ? LinkTiles.Down2 : LinkTiles.Down1; this._direction = Direction.Down; }
  _onLeft = (_frame) => { this._tile = Sprites.IsPrimarySpriteFrame(_frame) ? LinkTiles.Left2 : LinkTiles.Left1; this._direction = Direction.Left; }
  _onRight = (_frame) => { this._tile = Sprites.IsPrimarySpriteFrame(_frame) ? LinkTiles.Right2 : LinkTiles.Right1; this._direction = Direction.Right; }
  

  init = () => {
    this.tick = this._parent.input.onInput({
      onUp: this._onUp,
      onDown: this._onDown,
      onLeft: this._onLeft,
      onRight: this._onRight,
    });
  }

  getTile = () => this._tile;
  getDirection = () => this._direction;
  setTile = tile => {
    this._tile = tile;
  }
  resetTile = () => { this._tile = LinkTiles.Down2; this._direction = Direction.Down; }
  setToStanding = () => {
    switch (this._direction) {
      case Direction.Down: { this._tile = LinkTiles.Down2; break; };
      case Direction.Up: { this._tile = LinkTiles.Up2; break; };
      case Direction.Left: { this._tile = LinkTiles.Left2; break; };
      case Direction.Right: { this._tile = LinkTiles.Right2; break; };
      default: throw Error('This shouldn\'t happen.');
    }
  }
  /**
   * @param primaryTile boolean
   */
  swordAttack = (primaryTile) => {
    switch (this._direction) {
      case Direction.Down: return this._tile = primaryTile ? LinkTiles.SwordAttackDown : LinkTiles.AttackDown;
      case Direction.Up: return this._tile = primaryTile ? LinkTiles.SwordAttackUp : LinkTiles.AttackUp;
      case Direction.Left: return this._tile = primaryTile ? LinkTiles.SwordAttackLeft : LinkTiles.AttackLeft;
      case Direction.Right: return this._tile = primaryTile ? LinkTiles.SwordAttackRight : LinkTiles.AttackRight;
      default: throw Error('This shouldn\'t happen.');
    }
  }
}
