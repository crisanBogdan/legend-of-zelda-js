// first number x coordinate, second y coordinate of the level in overworld

class Levels {
  static startLevel(playerStartPosition = { x: 6, y: 6 }) {
    const {
      F,
      B,
      GW1,
      GW2,
      GW3,
      GW5,
      GW6,
    } = OverworldTiles;

    const b = B.setData({
      stairway: true,
      gate: true,
      to: {
        level: Levels.woodenSwordCave,
        direction: Direction.Up,
      },
    });
    const RG = F.setData({
      ...F,
      gate: true,
      to: {
        level: Levels.NineEight.bind(undefined, { x: 0, y: 5 }),
        direction: Direction.Right,
      },
    });

    return {
      tiles: [
        GW2, GW2, GW2, GW2, GW2, GW2, GW2, F,   F,   GW2, GW2, GW2, GW2, GW2, GW2, GW2,
        GW2, GW2, GW2, GW2, b,   GW2, GW3, F,   F,   GW2, GW2, GW2, GW2, GW2, GW2, GW2,
        GW2, GW2, GW2, GW3, F,   F,   F,   F,   F,   GW2, GW2, GW2, GW2, GW2, GW2, GW2,
        GW2, GW2, GW3, F,   F,   F,   F,   F,   F,   GW2, GW2, GW2, GW2, GW2, GW2, GW2,
        GW2, GW3, F,   F,   F,   F,   F,   F,   F,   GW1, GW2, GW2, GW2, GW2, GW2, GW2,
        F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   RG,
        GW5, GW6, F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   GW5, GW5,
        GW2, GW2, F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   GW2, GW2,
        GW2, GW2, F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   GW2, GW2,
        GW2, GW2, GW5, GW5, GW5, GW5, GW5, GW5, GW5, GW5, GW5, GW5, GW5, GW5, GW2, GW2,
        GW2, GW2, GW2, GW2, GW2, GW2, GW2, GW2, GW2, GW2, GW2, GW2, GW2, GW2, GW2, GW2,
      ],
      playerStartPosition,
    };
  } 
  
  static woodenSwordCave(playerStartPosition = { x: 7, y: 9 }) {
    const {
      BW2,
      BW5,
      B,
    } = OverworldTiles;
    const { OM1 } = NPCTiles;
    const { F } = MiscTiles;
    const { WSUp } = ItemTiles;
    const visited = Progress.VisitedWoodenSwordCave;
    const gotSword = Progress[ItemName.WoodenSword];

    Progress.VisitedWoodenSwordCave = true;

    const g = B.setData({
      gate: true,
      to: {
        level: Levels.startLevel.bind(undefined, { x: 4, y: 2 }),
        direction: Direction.Down
      }
    });
    const S = WSUp.setData({
      dx: -WSUp.getData().width / 2
    })
    const b = B.setData({ collide: true });
    const f = () => F().setData({ collide: true });
    const I = !gotSword ? S : B;
    const NPC = !gotSword ? OM1 : b;

    return {
      tiles: [
        BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2,
        BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2, BW2,
        BW2, BW2, B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   BW2, BW2,
        BW2, BW2, B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   BW2, BW2,
        BW2, BW2, b,   b,   b,   f(), b,   b,   NPC, b,   f(), b,   b,   b,   BW2, BW2,
        BW2, BW2, B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   BW2, BW2,
        BW2, BW2, B,   B,   B,   B,   B,   B,   I,   B,   B,   B,   B,   B,   BW2, BW2,
        BW2, BW2, B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   BW2, BW2,
        BW2, BW2, B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   B,   BW2, BW2,
        BW2, BW2, BW5, BW5, BW5, BW5, BW5, B,   B,   BW5, BW5, BW5, BW5, BW5, BW2, BW2,
        BW2, BW2, BW2, BW2, BW2, BW2, BW2, g,   g,   BW2, BW2, BW2, BW2, BW2, BW2, BW2,
      ],
      playerStartPosition,
      text: !gotSword && new TextAnimation([
          { x: 40, y: 40, text: 'IT\'S DANGEROUS TO GO' },
          { x: 56, y: 50, text: 'ALONE! TAKE THIS.' },
        ], !gotSword && !visited),
      animation: !visited && 200,
      playerCanAttack: false
    };
  }

  static NineEight(playerStartPosition) {
    const {
      F,
      GT,
      GW2,
      GW6,
      GW3,
    } = OverworldTiles;
    const LG = F.setData({
      gate: true,
      to: {
        level: Levels.startLevel.bind(undefined, { x: 15, y: 5 }),
        direction: Direction.Left,
      },
    });
    const RG = (index) => F.setData({
      gate: true,
      to: {
        level: Levels.NineNine.bind(undefined, { x: 0, y: index + 2 }),
        direction: Direction.Right,
      },
    });
    return {
      tiles: [
        GW2, GW2, GT, F,  GT, F,  GT, F,  F,  GT, F,  GT, F,  GT, F,  GT,
        GW2, GW2, GT, F,  GT, F,  GT, F,  F,  GT, F,  GT, F,  GT, F,  GT,
        GW2, GW2, F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  RG(0),
        GW2, GW3, F,  F,  F,  F,  GT, F,  F,  GT, F,  GT, F,  GT, F,  RG(1),
        GW3, F,   GT,  F, GT, F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  RG(2),
        LG,  F,   F,  F,  F,  F,  GT, F,  F,  GT, F,  GT, F,  GT, F,  RG(3),
        GW6, F,   GT, F,  GT, F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  RG(4),
        GW2, GW6, F,  F,  F,  F,  GT, F,  F,  GT, F,  GT, F,  GT, F,  RG(5),
        GW2, GW2, F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  RG(6),
        GW2, GW2, GT, GT, GT, GT, GT, GT, GT, GT, GT, GT, GT, GT, GT, GT, 
        GW2, GW2, GT, GT, GT, GT, GT, GT, GT, GT, GT, GT, GT, GT, GT, GT,
      ],
      playerStartPosition,
    }
  }

  static NineNine(playerStartPosition = { x: 0, y: 4 }) {
    const {
      F,
      OW1,
      OW2,
      OW3,
      OW4,
      OW5,
      OW6,
      OS,
      OR
    } = OverworldTiles;
    const LG = (index) => F.setData({
      gate: true,
      to: {
        level: Levels.NineEight.bind(undefined, { x: 15, y: index + 2 }),
        direction: Direction.Left,
      },
    });
    return {
      tiles: [
        OW2,   OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2,
        OW1,   OW2, OW2, OW2, OW2, OW2, OW3, OW1, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2,
        LG(0), OW1, OW2, OW2, OW2, OW2, F,   F,   F,   F,   F,   F,   OW1, OW2, OW2, OW2,
        LG(1), F,   OW1, OW2, OW2, OW2, F,   F,   F,   F,   F,   F,   F,   OW2, OW2, OW2,
        LG(2), F,   F,   OW1, OW2, OW2, F,   F,   F,   OR,  F,   F,   F,   OW1, OW2, OW2,
        LG(3), F,   F,   F,   OW1, OW3, F,   F,   OR,  F,   OR,  F,   F,   F,   F,   F,
        LG(4), F,   F,   F,   F,   F,   F,   F,   F,   OR,  F,   F,   F,   OW4, OW2, OW2,
        LG(5), F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   F,   OW2, OW2, OW2,
        LG(6), F,   F,   F,   OW4, OW6, F,   F,   F,   F,   F,   F,   OW4, OW2, OW2, OW2,
        OW4,   OW5, OW5, OW5, OW2, OW2, OW6, OW4, OW5, OW5, OW5, OW5, OW2, OW2, OW2, OW2,
        OW2,   OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2, OW2,
      ],
      playerStartPosition,
      actors: [
        new Spider(Utils.randomRange(100, Game.GAME_WIDTH - 100), Utils.randomRange(0, Game.GAME_HEIGHT), Spider.Blue),
        new Spider(Utils.randomRange(100, Game.GAME_WIDTH - 100), Utils.randomRange(0, Game.GAME_HEIGHT), Spider.Blue),
        new Spider(Utils.randomRange(100, Game.GAME_WIDTH - 100), Utils.randomRange(0, Game.GAME_HEIGHT), Spider.Blue),
        new Spider(Utils.randomRange(100, Game.GAME_WIDTH - 100), Utils.randomRange(0, Game.GAME_HEIGHT), Spider.Blue),
        new Spider(Utils.randomRange(100, Game.GAME_WIDTH - 100), Utils.randomRange(0, Game.GAME_HEIGHT), Spider.Blue),
      ]
    }
  }
}
