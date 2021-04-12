class NPCTiles {
  static getConfig = (index, dx = 0) => {
    return {
      x: index * (Game.TILE_WIDTH + 14),
      y: 5,
      sprite: Sprites.Character,
      height: 20,
      width: 20,
      order: DrawOrder.Last,
      dx,
      collide: true
    };
  }

  // O = old, M = man
  static OM1 = new Tile(NPCTiles.getConfig(0, -Game.TILE_WIDTH / 2));
}

class MiscTiles {
  static getConfig = (x, y, order = DrawOrder.Last) => {
    return {
      x,
      y,
      height: 18,
      width: 18,
      sprite: Sprites.Overworld,
      order,
    };
  }
  
  // F = fire
  static F1 = new Tile(MiscTiles.getConfig(51, 137));
  static F2 = new Tile(MiscTiles.getConfig(70, 137));
  static F = () => new AlternatingTile(MiscTiles.F1, MiscTiles.F2, 50);
}
