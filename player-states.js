class WalkingPlayerState {
  _player;
  constructor(player) {
    this._player = player;
  }

  tick = frame => {
    this._player.position.tick();
    this._player.tile.tick(frame);
    this._player.input.primaryPressed() && this._player.attack();
  }
}

class PlayerDamagedState {
  _player;
  _pushbackDuration;
  _frame = 0;
  _moveCallback;
  constructor(player, direction, duration = 15) {
    this._player = player;
    this._pushbackDuration = duration;
    switch (direction || player.getDirection()) {
      case Direction.Up: { this._moveCallback = player.position.moveDown; break; }
      case Direction.Down: { this._moveCallback = player.position.moveUp; break; }
      case Direction.Left: { this._moveCallback = player.position.moveRight; break; }
      case Direction.Right: { this._moveCallback = player.position.moveLeft; break; }
    }
    this._player.tile.setToStanding();
  }

  tick = () => {
    if (this._frame++ === this._pushbackDuration) {
      this._player.setState(new WalkingPlayerState(this._player));
      return;
    }
    this._moveCallback();
  }
}

class SwordAttackingPlayerState {
  _player;
  _duration;
  _frame = 0;
  attacking = true;
  constructor(player, duration = 20) {
    this._player = player;
    this._duration = duration;
  }

  tick = () => {
    if (this._frame === this._duration) {
      this._player.tile.setToStanding();
      this._player.setState(new WalkingPlayerState(this._player));
      return;
    }
    this._player.tile.swordAttack(this._frame > this._duration / 4 && this._frame < 3 / 4 * this._duration);
    this._player.hitEnemies();
    this._frame++;
  }
}

class SwordThrowingPlayerState {
  _player;
  _throwingDuration;
  _frame = 0;
  attacking = true;
  constructor(player, duration = 20) {
    this._player = player;
    this._throwingDuration = duration;
  }

  tick = () => {
    if (this._frame === this._throwingDuration) {
      this._player.tile.setToStanding();
      this._player.setState(new WalkingPlayerState(this._player));
      let { x, y } = this._player.getCenterCoords();
      const direction = this._player.getDirection();
      // adjust coords so the tile looks like its coming from the hand
      switch (direction) {
        case Direction.Down: { x -= 4; y += 2; break; };
        case Direction.Up: { x -= 5; y -= 10; break; };
        case Direction.Left: { x -= 12; y -= 3; break; };
        case Direction.Right: { y -= 4; break; };
        default: throw Error('This shouldn\'t happen.');
      }
      this._player.game.addProjectile(PrimaryWeaponProjectileFactory.getProjectile(this._player.game, x, y));
      return;
    }
    this._player.tile.swordAttack(this._frame > this._throwingDuration / 2);
    this._player.hitEnemies();
    this._frame++;
  }
}

const AttackingStates = {
  [ItemName.WoodenSword]: {
    'melee': SwordAttackingPlayerState,
    'ranged': SwordThrowingPlayerState,
  },
};
