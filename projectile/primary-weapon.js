
const woodenSwordExplosionCreator = ({ x, y, game, onExplosionFinish }) => {
  const dx = 1, dy = 1;
  return new TimedEntity(
    new CompoundMovingEntities([
      new MovingEntity({
        tile: new AlternatingTile(ItemTiles.WSProjectileExplosionTopLeft, ItemTiles.AltProjectileExplosionTopLeft, 5),
        game,
        x,
        y,
        dx: -dx,
        dy: -dy
      }),
      new MovingEntity({
        tile: new AlternatingTile(ItemTiles.WSProjectileExplosionBottomLeft, ItemTiles.AltProjectileExplosionBottomLeft, 5),
        game,
        x,
        y,
        dx: -dx,
        dy
      }),
      new MovingEntity({
        tile: new AlternatingTile(ItemTiles.WSProjectileExplosionTopRight, ItemTiles.AltProjectileExplosionTopRight, 5),
        game,
        x,
        y,
        dx,
        dy: -dy
      }),
      new MovingEntity({
        tile: new AlternatingTile(ItemTiles.WSProjectileExplosionBottomRight, ItemTiles.AltProjectileExplosionBottomRight, 5),
        game,
        x,
        y,
        dx,
        dy
      }),
    ]),
    20,
    onExplosionFinish
  );
} 

const ProjectileTiles = {
  [ItemName.WoodenSword]: {
    [Direction.Up]: () => new AlternatingTile(ItemTiles.WSUp, ItemTiles.AltProjectileSwordUp, 10),
    [Direction.Down]: () => new AlternatingTile(ItemTiles.WSDown, ItemTiles.AltProjectileSwordDown, 10),
    [Direction.Left]: () => new AlternatingTile(ItemTiles.WSLeft, ItemTiles.AltProjectileSwordLeft, 10),
    [Direction.Right]: () => new AlternatingTile(ItemTiles.WSRight, ItemTiles.AltProjectileSwordRight, 10),
  }
};

const ProjectileExplosions = {
  [ItemName.WoodenSword]: woodenSwordExplosionCreator,
};

class PrimaryWeaponProjectile extends Projectile {
  static Id = 2;

  constructor(args) {
    args.dx = 3;
    args.dy = 3;
    super(args);
    this.id = PrimaryWeaponProjectile.Id;
  }

  _collidesWithActors = () => {
    const thisRect = this._entity.getRect();
    const found = this._game.getNpcs().find(a => Utils.intersects(thisRect, a.getRect()).valid);
    if (found) {
      found.damage(this._damage);
    }
  }
}

class PrimaryWeaponProjectileFactory {
  static getProjectile(game, x, y) {
    const direction = game.player.getDirection();

    return new PrimaryWeaponProjectile({
      game,
      tile: ProjectileTiles[game.inventory.primaryItemName()][direction](),
      x,
      y,
      direction,
      explosionCreator: ProjectileExplosions[game.inventory.primaryItemName()]
    });
  }
}
