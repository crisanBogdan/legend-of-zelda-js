class EnemyTiles {
  static RedSpider1 = new Tile({ x: 0, y: 60, width: 18, height: 14, sprite: Sprites.Enemies });
  static RedSpider2 = new Tile({ x: 18, y: 57, width: 18, height: 18, sprite: Sprites.Enemies });
  static BlueSpider1 = new Tile({ x: 269, y: 181, width: 18, height: 18, sprite: Sprites.Enemies });
  static BlueSpider2 = new Tile({ x: 269, y: 209, width: 18, height: 18, sprite: Sprites.Enemies });
  static RedSpitterRight1 = new Tile({ x: 90, y: 0, width: 16, height: 18, sprite: Sprites.Enemies });
  static RedSpitterRight2 = new Tile({ x: 90, y: 30, width: 16, height: 18, sprite: Sprites.Enemies });
  static RedSpitterDown1 = new Tile({ x: 0, y: 18, width: 16, height: 18, sprite: Sprites.Enemies });
  static RedSpitterDown2 = new Tile({ x: 0, y: 30, width: 16, height: 18, sprite: Sprites.Enemies });
  static RedSpitterLeft1 = new Tile({ x: 30, y: 0, width: 16, height: 18, sprite: Sprites.Enemies });
  static RedSpitterLeft2 = new Tile({ x: 30, y: 30, width: 16, height: 18, sprite: Sprites.Enemies });
  static RedSpitterUp1 = new Tile({ x: 60, y: 0, width: 16, height: 18, sprite: Sprites.Enemies });
  static RedSpitterUp2 = new Tile({ x: 60, y: 30, width: 16, height: 18, sprite: Sprites.Enemies });
  static SmallExplosion1 = new Tile({ x: 60, y: 329, width: 12, height: 12, sprite: Sprites.Enemies });
  static SmallExplosion2 = new Tile({ x: 89, y: 329, width: 12, height: 12, sprite: Sprites.Enemies });
  static SmallExplosion = new AlternatingTile(EnemyTiles.SmallExplosion1, EnemyTiles.SmallExplosion2, 20);
}
