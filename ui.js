class TopBar {
  _renderer;
  _inventory;

  constructor(renderer, inventory) {
    this._renderer = renderer;
    this._inventory = inventory;
  }

  draw() {
    const r = this._renderer;
    // xpath
    let xp = 0;
    r.drawRect({
      x: xp,
      y: 0,
      width: 256,
      height: 48,
      color: '#000'
    });
    xp += 16;
    r.drawRect({
      x: xp,
      y: 8,
      width: 64,
      height: 32,
      color: '#777'
    });

    xp += 64 + 8;
    r.drawTile(UiTiles.Rupee, xp, 8);
    r.drawText(`X${this._inventory.rupees}`, xp + 10, 13, '#fff');
    r.drawTile(UiTiles.Key, xp, 24);
    r.drawText(`X${this._inventory.keys}`, xp + 10, 29, '#fff');
    r.drawTile(UiTiles.Bomb, xp, 32);
    r.drawText(`X${this._inventory.bombs}`, xp + 10, 37, '#fff');

    xp += 45;
    r.drawTile(UiTiles.SecondarySlot, xp, 8);
    xp += 22;
    r.drawTile(UiTiles.PrimarySlot, xp, 8);
    if (this._inventory.primary) {
      r.drawTile(this._inventory.primary.tile, xp + 4, 16);
    }

    xp += 25;
    r.drawText('-LIFE-', xp + 8, 13, '#f00');
    let count = 1,
        fh = this._inventory.fullHearts(),
        hh = this._inventory.halfHearts(),
        eh = this._inventory.emptyHearts();
    while (count <= fh) {
      r.drawTile(UiTiles.FullHeart, xp, 30);
      xp += 8;
      count++;
    }
    if (hh) {
      r.drawTile(UiTiles.HalfHeart, xp, 30);
      xp += 8;
    }
    count = 1;
    while (count <= eh) {
      r.drawTile(UiTiles.EmptyHeart, xp, 30);
      xp += 8;
      count++;
    }
  }
}