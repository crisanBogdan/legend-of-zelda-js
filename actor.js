class Actor extends Entity {
  state;
  health = 1;
  attackDamage = 1;
  invulnerable = false;

  tick = () => {
    this.state.tick();
    if (this.state.dying) {
      return;
    }
    this.checkForPlayerCollision();
  }
  
  checkForPlayerCollision = () => {
    const player = this.game.getPlayer();
    const intersection = this.intersects(player.getDamageRect());
    if (intersection.valid) {
      player.damage(this.attackDamage, intersection.direction);
    }
  }

  damage = (amount) => {
    if (this.invulnerable) {
      return;
    }
    this.health -= amount;
    if (this.health <= 0) {
      this.kill();
      return;
    }
    this.invulnerable = true;
    setTimeout(() => this.invulnerable = false, 1000);
  }

  kill = () => {
    this.state = new ActorDyingState(this);
  }
  
  getItemDrop = () => {
    const roll = Math.random();
    if (roll < 0.01) {
      return Items[ItemName.Clock];
    }
    if (roll < 0.05) {
      return Items[ItemName.Bomb];
    }
    if (roll < 0.1) {
      return Items[ItemName.FiveRupees];
    }
    if (roll < 0.3) {
      return Items[ItemName.Heart];
    }
    if (roll < 0.4) {
      return Items[ItemName.OneRupee];
    }
  }
}

class ActorDyingState {
  _actor;
  _duration;
  _frame = 0;
  dying = true;
  constructor(actor, duration = 15) {
    this._actor = actor;
    this._duration = duration;
    this._actor.tile = EnemyTiles.SmallExplosion;
  }
  tick() {
    if (this._frame++ === this._duration) {
      this._actor.game.killActor(this._actor);
      return;
    }
  }
}