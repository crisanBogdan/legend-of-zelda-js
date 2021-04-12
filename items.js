const Items = {
  [ItemName.WoodenSword]: {
    name: ItemName.WoodenSword,
    tile: ItemTiles.WSUp,
    level: Levels.woodenSwordCave,
    damage: 1,
  },
  [ItemName.OneRupee]: {
    name: ItemName.OneRupee,
    tile: ItemTiles.OneRupee,
  },
  [ItemName.FiveRupees]: {
    name: ItemName.FiveRupees,
    tile: ItemTiles.FiveRupees,
  },
  [ItemName.Bomb]: {
    name: ItemName.Bomb,
    tile: ItemTiles.Bomb,
  },
  [ItemName.Heart]: {
    name: ItemName.Heart,
    tile: ItemTiles.Heart,
  },
  [ItemName.Clock]: {
    name: ItemName.Clock,
    tile: ItemTiles.Clock,
  },
};

class ItemDrop extends Entity {
  item;
  constructor(game, item, x, y) {
    super();
    this.game = game;
    this.x = x;
    this.y = y;
    this.item = item;
    this.tile = this.item.tile;
  }
}