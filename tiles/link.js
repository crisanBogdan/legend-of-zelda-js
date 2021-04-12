class LinkTiles {
  static getConfig = (xIndex, yIndex, width = 18, height = 17, dx, dy) => {
    return {
      x: xIndex * (Game.TILE_WIDTH + 14),
      y: yIndex * (Game.TILE_HEIGHT + 14),
      sprite: Sprites.LinkAndItems,
      width,
      height,
      dx,
      dy,
    };
  }
  // Green Armor
  static GreenDown1 = new Tile(LinkTiles.getConfig(0, 0));
  static GreenDown2 = new Tile(LinkTiles.getConfig(0, 1));
  static GreenUp1 = new Tile(LinkTiles.getConfig(2, 0));
  static GreenUp2 = new Tile(LinkTiles.getConfig(2, 1));
  static GreenLeft1 = new Tile(LinkTiles.getConfig(1, 0));
  static GreenLeft2 = new Tile(LinkTiles.getConfig(1, 1));
  static GreenRight1 = new Tile(LinkTiles.getConfig(3, 0));
  static GreenRight2 = new Tile(LinkTiles.getConfig(3, 1));
  static GreenHolding1 = new Tile(LinkTiles.getConfig(0, 5, undefined, 30, undefined, -5));
  static GreenAttackDown = new Tile(LinkTiles.getConfig(0, 2));
  static GreenAttackUp = new Tile(LinkTiles.getConfig(2, 2));
  static GreenAttackLeft = new Tile(LinkTiles.getConfig(1, 2));
  static GreenAttackRight = new Tile(LinkTiles.getConfig(3, 2));
  static GreenSwordAttackDown = new Tile({ x: 0, y: 83, sprite: Sprites.LinkAndItems, height: 30 });
  static GreenSwordAttackUp = new Tile({ x: 59, y: 83, sprite: Sprites.LinkAndItems, height: 30, dy: -12 });
  static GreenSwordAttackLeft = new Tile({ x: 23, y: 90, sprite: Sprites.LinkAndItems, width: 30, dx: -12 });
  static GreenSwordAttackRight = new Tile({ x: 84, y: 90, sprite: Sprites.LinkAndItems, width: 30 });

  // Grey armor
  static GreyDown1 = new Tile({ x: 120, y: 0, sprite: Sprites.LinkAndItems, width: 17, height: 18 });
  static GreyDown2 = new Tile({ x: 120, y: 29, sprite: Sprites.LinkAndItems, width: 17, height: 18 });
  static GreyUp1 = new Tile({ x: 181, y: 0, sprite: Sprites.LinkAndItems, width: 17, height: 18 });
  static GreyUp2 = new Tile({ x: 181, y: 29, sprite: Sprites.LinkAndItems, width: 17, height: 18 });
  static GreyLeft1 = new Tile({ x: 149, y: 0, sprite: Sprites.LinkAndItems, width: 17, height: 18 });
  static GreyLeft2 = new Tile({ x: 149, y: 29, sprite: Sprites.LinkAndItems, width: 17, height: 18 });
  static GreyRight1 = new Tile({ x: 209, y: 0, sprite: Sprites.LinkAndItems, width: 17, height: 18 });
  static GreyRight2 = new Tile({ x: 209, y: 29, sprite: Sprites.LinkAndItems, width: 17, height: 18 });
  static GreyHolding1 = new Tile({ x: 120, y: 149, sprite: Sprites.LinkAndItems, width: 17, height: 18 });
  static GreyAttackDown = new Tile({ x: 120, y: 59, sprite: Sprites.LinkAndItems, width: 17, height: 18 });
  static GreyAttackUp = new Tile({ x: 179, y: 59, sprite: Sprites.LinkAndItems, width: 17, height: 18 });
  static GreyAttackLeft = new Tile({ x: 149, y: 59, sprite: Sprites.LinkAndItems, width: 17, height: 18 });
  static GreyAttackRight = new Tile({ x: 209, y: 59, sprite: Sprites.LinkAndItems, width: 17, height: 18 });
  static GreySwordAttackDown = new Tile({ x: 119, y: 83, sprite: Sprites.LinkAndItems, height: 30 });
  static GreySwordAttackUp = new Tile({ x: 179, y: 83, sprite: Sprites.LinkAndItems, height: 30, dy: -12 });
  static GreySwordAttackLeft = new Tile({ x: 146, y: 90, sprite: Sprites.LinkAndItems, width: 30, dx: -12 });
  static GreySwordAttackRight = new Tile({ x: 203, y: 90, sprite: Sprites.LinkAndItems, width: 30 });


  // current tiles
  static Down1 = LinkTiles.GreenDown1;
  static Down2 = LinkTiles.GreenDown2;
  static Up1 = LinkTiles.GreenUp1;
  static Up2 = LinkTiles.GreenUp2;
  static Left1 = LinkTiles.GreenLeft1;
  static Left2 = LinkTiles.GreenLeft2;
  static Right1 = LinkTiles.GreenRight1;
  static Right2 = LinkTiles.GreenRight2;
  static Holding1 = LinkTiles.GreenHolding1;
  static AttackDown = LinkTiles.GreenAttackDown;
  static AttackUp = LinkTiles.GreenAttackUp;
  static AttackLeft = LinkTiles.GreenAttackLeft;
  static AttackRight = LinkTiles.GreenAttackRight;
  static SwordAttackDown = LinkTiles.GreenSwordAttackDown;
  static SwordAttackUp = LinkTiles.GreenSwordAttackUp;
  static SwordAttackLeft = LinkTiles.GreenSwordAttackLeft;
  static SwordAttackRight = LinkTiles.GreenSwordAttackRight;

  static direction(tile) {
    switch(tile) {
      case LinkTiles.Down1: return Direction.Down;
      case LinkTiles.Down2: return Direction.Down;
      case LinkTiles.Up1: return Direction.Up;
      case LinkTiles.Up2: return Direction.Up;
      case LinkTiles.Left1: return Direction.Left;
      case LinkTiles.Left2: return Direction.Left;
      case LinkTiles.Right1: return Direction.Right;
      case LinkTiles.Right2: return Direction.Right;
      default: throw Error('Not a Link tile.', tile);
    }
  }

  static setToGreenTiles() {
    LinkTiles.Down1 = LinkTiles.GreenDown1;
    LinkTiles.Down2 = LinkTiles.GreenDown2;
    LinkTiles.Up1 = LinkTiles.GreenUp1;
    LinkTiles.Up2 = LinkTiles.GreenUp2;
    LinkTiles.Left1 = LinkTiles.GreenLeft1;
    LinkTiles.Left2 = LinkTiles.GreenLeft2;
    LinkTiles.Right1 = LinkTiles.GreenRight1;
    LinkTiles.Right2 = LinkTiles.GreenRight2;
    LinkTiles.Holding1 = LinkTiles.GreenHolding1;
    LinkTiles.AttackDown = LinkTiles.GreenAttackDown;
    LinkTiles.AttackUp = LinkTiles.GreenAttackUp;
    LinkTiles.AttackLeft = LinkTiles.GreenAttackLeft;
    LinkTiles.AttackRight = LinkTiles.GreenAttackRight;
    LinkTiles.SwordAttackDown = LinkTiles.GreenSwordAttackDown;
    LinkTiles.SwordAttackUp = LinkTiles.GreenSwordAttackUp;
    LinkTiles.SwordAttackLeft = LinkTiles.GreenSwordAttackLeft;
    LinkTiles.SwordAttackRight = LinkTiles.GreenSwordAttackRight;
  }

  static setToGreyTiles() {
    LinkTiles.Down1 = LinkTiles.GreyDown1;
    LinkTiles.Down2 = LinkTiles.GreyDown2;
    LinkTiles.Up1 = LinkTiles.GreyUp1;
    LinkTiles.Up2 = LinkTiles.GreyUp2;
    LinkTiles.Left1 = LinkTiles.GreyLeft1;
    LinkTiles.Left2 = LinkTiles.GreyLeft2;
    LinkTiles.Right1 = LinkTiles.GreyRight1;
    LinkTiles.Right2 = LinkTiles.GreyRight2;
    LinkTiles.Holding1 = LinkTiles.GreyHolding1;
    LinkTiles.AttackDown = LinkTiles.GreyAttackDown;
    LinkTiles.AttackUp = LinkTiles.GreyAttackUp;
    LinkTiles.AttackLeft = LinkTiles.GreyAttackLeft;
    LinkTiles.AttackRight = LinkTiles.GreyAttackRight;
    LinkTiles.SwordAttackDown = LinkTiles.GreySwordAttackDown;
    LinkTiles.SwordAttackUp = LinkTiles.GreySwordAttackUp;
    LinkTiles.SwordAttackLeft = LinkTiles.GreySwordAttackLeft;
    LinkTiles.SwordAttackRight = LinkTiles.GreySwordAttackRight;
  }

  static setToAlternatingGreenGrey() {
    const p = 20;
    LinkTiles.Down1 = new AlternatingTile(LinkTiles.GreenDown1, LinkTiles.GreyDown1, p);
    LinkTiles.Down2 = new AlternatingTile(LinkTiles.GreenDown2, LinkTiles.GreyDown2, p);
    LinkTiles.Up1 = new AlternatingTile(LinkTiles.GreenUp1, LinkTiles.GreyUp1, p);
    LinkTiles.Up2 = new AlternatingTile(LinkTiles.GreenUp2, LinkTiles.GreyUp2, p);
    LinkTiles.Left1 = new AlternatingTile(LinkTiles.GreenLeft1, LinkTiles.GreyLeft1, p);
    LinkTiles.Left2 = new AlternatingTile(LinkTiles.GreenLeft2, LinkTiles.GreyLeft2, p);
    LinkTiles.Right1 = new AlternatingTile(LinkTiles.GreenRight1, LinkTiles.GreyRight1, p);
    LinkTiles.Right2 = new AlternatingTile(LinkTiles.GreenRight2, LinkTiles.GreyRight2, p);
    LinkTiles.Holding1 = new AlternatingTile(LinkTiles.GreenHolding1, LinkTiles.GreyHolding1, p);
    LinkTiles.AttackDown = new AlternatingTile(LinkTiles.GreenAttackDown, LinkTiles.GreyAttackDown, p);
    LinkTiles.AttackUp = new AlternatingTile(LinkTiles.GreenAttackUp, LinkTiles.GreyAttackUp, p);
    LinkTiles.AttackLeft = new AlternatingTile(LinkTiles.GreenAttackLeft, LinkTiles.GreyAttackLeft, p);
    LinkTiles.AttackRight = new AlternatingTile(LinkTiles.GreenAttackRight, LinkTiles.GreyAttackRight, p);
    LinkTiles.SwordAttackDown = new AlternatingTile(LinkTiles.GreenSwordAttackDown, LinkTiles.GreySwordAttackDown, p);
    LinkTiles.SwordAttackUp = new AlternatingTile(LinkTiles.GreenSwordAttackUp, LinkTiles.GreySwordAttackUp, p);
    LinkTiles.SwordAttackLeft = new AlternatingTile(LinkTiles.GreenSwordAttackLeft, LinkTiles.GreySwordAttackLeft, p);
    LinkTiles.SwordAttackRight = new AlternatingTile(LinkTiles.GreenSwordAttackRight, LinkTiles.GreySwordAttackRight, p);
  }
  
}
