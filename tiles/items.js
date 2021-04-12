class ItemTiles {
  static getConfig = (x, y, itemName, width = Game.TILE_WIDTH, height = Game.TILE_HEIGHT, dx = 0) => {
    return {
      x,
      y,
      width,
      height,
      sprite: Sprites.LinkAndItems,
      item: true,
      itemName,
      order: DrawOrder.Last,
      dx,
    };
  }

  // Wooden Sword
  static WSUp = new Tile(ItemTiles.getConfig(62, 194, ItemName.WoodenSword, 10, 18));
  static WSLeft = new Tile(ItemTiles.getConfig(29, 198, ItemName.WoodenSword, 18, 9));
  static WSDown = new Tile(ItemTiles.getConfig(3, 194, ItemName.WoodenSword, 10, 18));
  static WSRight = new Tile(ItemTiles.getConfig(89, 198, ItemName.WoodenSword, 18, 9));
  static WSProjectileExplosionTopLeft = new Tile(ItemTiles.getConfig(178, 281, undefined, 10, 10));
  static WSProjectileExplosionBottomLeft = new Tile(ItemTiles.getConfig(178, 292, undefined, 10, 10));
  static WSProjectileExplosionTopRight = new Tile(ItemTiles.getConfig(188, 281, undefined, 10, 10));
  static WSProjectileExplosionBottomRight = new Tile(ItemTiles.getConfig(188, 292, undefined, 10, 10));

  // Consumables
  static OneRupee = new Tile(ItemTiles.getConfig(243, 224, ItemName.OneRupee, 10, 18));
  static FiveRupees = new Tile(ItemTiles.getConfig(273, 224, ItemName.FiveRupees, 10, 18));
  static Heart = new Tile(ItemTiles.getConfig(243, 198, ItemName.Heart, 10, 10));
  static Bomb = new Tile(ItemTiles.getConfig(363, 228, ItemName.Bomb, 10, 12));
  static Clock = new Tile(ItemTiles.getConfig(391, 164, ItemName.Clock, 13, 18));

  // Alternative Tiles
  static AltProjectileSwordUp = new Tile(ItemTiles.getConfig(62, 284, undefined, 10, 18));
  static AltProjectileSwordLeft = new Tile(ItemTiles.getConfig(29, 288, undefined, 18, 9));
  static AltProjectileSwordDown = new Tile(ItemTiles.getConfig(2, 284, undefined, 10, 18));
  static AltProjectileSwordRight = new Tile(ItemTiles.getConfig(89, 288, undefined, 10, 18));
  static AltProjectileExplosionTopLeft = new Tile(ItemTiles.getConfig(118, 281, undefined, 10, 10));
  static AltProjectileExplosionBottomLeft = new Tile(ItemTiles.getConfig(118, 292, undefined, 10, 10));
  static AltProjectileExplosionTopRight = new Tile(ItemTiles.getConfig(128, 281, undefined, 10, 10));
  static AltProjectileExplosionBottomRight = new Tile(ItemTiles.getConfig(128, 292, undefined, 10, 10));
}
