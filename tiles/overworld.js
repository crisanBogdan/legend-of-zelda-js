class OverworldTiles {
  static getConfig = (
    x,
    y,
    meta,
  ) => {
    const {
      collide = false,
      gate = false,
      stairway = false,
    } = meta || {};
    return {
      x,
      y,
      collide,
      gate,
      stairway,
      sprite: Sprites.Overworld,
      width: 15,
      height: 15
    };
  }

  // G = green, O = orange, F = floor, B = black, W = wall, T = tree, R = rock, S = stairs
  // numbers - numpad equivalent of the order in tiles-overworld.jpg
  static F   = new Tile(OverworldTiles.getConfig(35, 1));
  static OS  = new Tile(OverworldTiles.getConfig(1, 1, { collide: true }));
  static OR  = new Tile(OverworldTiles.getConfig(18, 1, { collide: true }));
  static OW1 = new Tile(OverworldTiles.getConfig(1, 52, { collide: true }));
  static OW2 = new Tile(OverworldTiles.getConfig(18, 52, { collide: true }));
  static OW3 = new Tile(OverworldTiles.getConfig(35, 52, { collide: true }));
  static OW4 = new Tile(OverworldTiles.getConfig(1, 35, { collide: true }));
  static OW5 = new Tile(OverworldTiles.getConfig(18, 35, { collide: true }));
  static OW6 = new Tile(OverworldTiles.getConfig(34, 35, { collide: true }));
  static BW2 = new Tile(OverworldTiles.getConfig(35, 137, { collide: true }));
  static BW5 = new Tile(OverworldTiles.getConfig(18, 137, { collide: true }));
  static B   = new Tile(OverworldTiles.getConfig(87, 139));
  static GW1 = new Tile(OverworldTiles.getConfig(103, 52, { collide: true }));
  static GW2 = new Tile(OverworldTiles.getConfig(120, 52, { collide: true }));
  static GW3 = new Tile(OverworldTiles.getConfig(137, 52, { collide: true }));
  static GW4 = new Tile(OverworldTiles.getConfig(103, 35, { collide: true }));
  static GW5 = new Tile(OverworldTiles.getConfig(120, 35, { collide: true }));
  static GW6 = new Tile(OverworldTiles.getConfig(137, 35, { collide: true }));
  static GT  = new Tile(OverworldTiles.getConfig(120, 19, { collide: true }));
}
