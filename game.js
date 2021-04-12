class Game {
  static TILE_WIDTH = 15;
  static TILE_HEIGHT = 15;
  // number of tiles
  static LEVEL_WIDTH = 16;
  static LEVEL_HEIGHT = 11;
  // base x, y from where to start drawing the tiles
  static BASEX = 0;
  static BASEY = 48;
  static GAME_WIDTH = Game.TILE_WIDTH * Game.LEVEL_WIDTH;
  static GAME_HEIGHT = Game.TILE_HEIGHT * Game.LEVEL_HEIGHT;
  static pixelsToIndex = (x, y) => {
    return [
      Utils.setInRange(0, Game.LEVEL_WIDTH, Math.floor(x / Game.TILE_WIDTH)),
      Utils.setInRange(0, Game.LEVEL_HEIGHT, Math.floor(y / Game.TILE_HEIGHT)),
    ];
  }

  frame = 0;
  player;
  renderer;
  input;
  currentLevel;
  inventory;
  state;
  topbar;
  actors = [];
  projectiles = [];
  itemDrops = [];
  
  setPlayer = (player) => { this.player = player; return this; }
  setRenderer = (renderer) => { this.renderer = renderer; return this; }
  setInput = (input) => { this.input = input; return this; }
  setState = (state) => { this.state = state; }
  setFrame = (frame) => this.frame = frame;
  setLevel = (level, setPlayerPosition = true) => {
    this.currentLevel = level;
    if (setPlayerPosition) {
      this.player.setPositionFromIndexes(level.playerStartPosition.x, level.playerStartPosition.y);
    }
    this.setActors(level.actors);
    this.projectiles = [];
    this.itemDrops = [];
    LinkTiles.setToGreenTiles();
  }
  setActors = (actors = []) => {
    this.actors = [this.player, ...actors];
    this.actors.forEach(a => a.setGame(this));
  } 
  
  getTileAt = (x, y) => {
    let tempPosIndex = Game.pixelsToIndex(x, y);
    return this.currentLevel.tiles[tempPosIndex[0] + tempPosIndex[1] * Game.LEVEL_WIDTH];
  } 
  getFrame = () => this.frame;
  getActors = () => this.actors;
  getNpcs = () => this.actors.filter(a => a !== this.player);
  getProjectiles = () => this.projectiles;
  getItemDrops = () => this.itemDrops;
  getPlayer = () => this.player;
  
  init() {
    this.setLevel(Levels.startLevel());
    this.player.setPositionFromIndexes(this.currentLevel.playerStartPosition.x, this.currentLevel.playerStartPosition.y);
    this.state = new PlayableGameState(this);
    this.input.registerKeyDownListener('pause', this.pause);
    this.inventory = new Inventory();
    this.topbar = new TopBar(this.renderer, this.inventory);
    this.player.setInventory(this.inventory);
  }
  tick = () => this.state.tick();
  level = () => this.currentLevel;
  start = () => {
    this.input.registerEventListeners();
    window.requestAnimationFrame(this.tick);
  }
  pause = () => {
    this.setState(new PausedGameState(this));
  }
  gotItem = item => this.inventory.add(item);
  gotItemDrop = itemDrop => {
    this.itemDrops = this.itemDrops.filter(i => i !== itemDrop);
    if (itemDrop.item.name === ItemName.Clock) {
      this.setState(new InvulnerabilityGameState(this));
      return;
    }
    this.gotItem(itemDrop.item);
  }
  addProjectile = projectile => this.projectiles.push(projectile);
  removeProjectile = projectile => this.projectiles = this.projectiles.filter(p => p !== projectile);
  primaryWeaponProjectileExists = () => this.projectiles.find(p => p.id === PrimaryWeaponProjectile.Id);

  collidesWithTerrain = (x, y) => {
    const tile = this.getTileAt(x, y);
    return !tile || tile.getData().collide;
  }
  killActor = actor => {
    this.actors = this.actors.filter(a => a !== actor);
    const item = actor.getItemDrop();
    item && this.itemDrops.push(new ItemDrop(this, item, actor.x, actor.y));
  }
  checkPlayerCollectsItem = () => {
    const playerRect = this.player.getRect();
    const walkedOnItemDrop = this.getItemDrops().find(i => i.intersects(playerRect).valid);
    walkedOnItemDrop && this.gotItemDrop(walkedOnItemDrop);
  }
  checkPlayerTileInteraction = () => {
    const playerPos = this.player.getPosition();
    const tileUnderPlayer = this.getTileAt(playerPos.x, playerPos.y);
    // if entered a 'gateway'
    const tileData = tileUnderPlayer.getData();
    if (tileData.gate && this.player.getDirection() === tileData.to.direction) {
      this.setState(
        new LevelTransitionGameState(
          this,
          new LevelTransition(this.currentLevel, tileData.to.level(), tileData.to.direction)
        )
      );
      return;
    }

    if (tileData.item) {
      const item = Items[tileData.itemName];
      Progress[tileData.itemName] = true;
      // reset the level without the item
      item.level && this.setLevel(item.level(), false);
      this.gotItem(item);
      this.setState(new ItemPickedUpGameState(this, item));
      return;
    }
  }
  playerDeath = () => {
    this.setState(
      new LevelTransitionGameState(
        this,
        new LevelTransition(this.currentLevel, Levels.startLevel(), undefined, 80)
      )
    );
    this.inventory.setInitialHearts();
  }
}