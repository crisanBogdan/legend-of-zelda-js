class Tile {
  /**
   * x :: Number
   * y :: Number
   * width :: Number
   * height :: Number
   * sprite :: Image
   * and other specific data
   */
  _tileConfig;
  constructor(tileConfig) {
    tileConfig.width = tileConfig.width || Game.TILE_WIDTH;
    tileConfig.height= tileConfig.height|| Game.TILE_HEIGHT;
    this._tileConfig = tileConfig;
  }
  getData = () => this._tileConfig;
  setData = (config) => new Tile({ ...this._tileConfig, ...config });
}

class AlternatingTile {
  _primary;
  _secondary;
  _frame = 0;
  _cycleDuration; // frames
  constructor(primaryTile, secondaryTile, cycleDuration = 20) {
    this._primary = primaryTile;
    this._secondary = secondaryTile;
    this._cycleDuration = cycleDuration;
  }

  getData() {
    this._frame = (this._frame + 1) % this._cycleDuration;
    const tile = this._frame < this._cycleDuration / 2 ? this._primary : this._secondary;
    return tile.getData();
  }
  setData(config) {
    this._primary = this._primary.setData(config);
    this._secondary = this._secondary.setData(config);
    return this;
  }
}
