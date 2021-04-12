// all states must request animation frame to game.tick
class PlayableGameState {
  _game;
  
  constructor(game) {
    this._game = game;
  }

  tick = () => {
    const frame = (this._game.getFrame() + 1) % 60;
    this._game.setFrame(frame);
  
    this._game.getProjectiles().forEach(p => p.tick(frame));
    this._game.getActors().forEach(a => a.tick(frame));
    
    this._game.topbar.draw();
    this._game.renderer.drawLevel(this._game.level());
    this._game.getItemDrops().forEach(i => i.draw(frame));
    this._game.getProjectiles().forEach(p => p.draw(frame));
    this._game.getActors().forEach(a => a.draw(frame));
    
    this._game.checkPlayerCollectsItem();
    this._game.checkPlayerTileInteraction();

    window.requestAnimationFrame(this._game.tick);
  }
}

class LevelTransitionGameState {
  _game;
  _transition;

  constructor(game, transition) {
    this._game = game;
    this._transition = transition;
  }

  tick = () => {
    if (!this._transition.isDone()) {
      this._game.renderer.drawLevel({ tiles: this._transition.getTiles() });
      window.requestAnimationFrame(this._game.tick);
      return;
    }
    const toLevel = this._transition.getToLevel();
    this._game.setLevel(toLevel);
    this._game.player.setCanAttack(toLevel.playerCanAttack !== undefined ? toLevel.playerCanAttack : true);
    if (toLevel.animation) {
      this._game.setState(new LevelAnimationGameState(this._game, toLevel.animation));
    } else {
      this._game.setState(new PlayableGameState(this._game));
    }
    window.requestAnimationFrame(this._game.tick);
  }
}

class LevelAnimationGameState {
  _game;
  _frame = 0;
  _duration;

  constructor(game, duration = 200) {
    this._game = game;
    this._duration = duration;
  }

  tick = () => {
    if (this._frame === this._duration) {
      this._game.setState(new PlayableGameState(this._game));
      window.requestAnimationFrame(this._game.tick);
      return;
    }
    this._frame++;

    const gameFrame = (this._game.getFrame() + 1) % 60;
    this._game.setFrame(gameFrame);
    this._game.renderer.drawLevel(this._game.level());
    this._game.getActors().forEach(a => a.draw(gameFrame));
    window.requestAnimationFrame(this._game.tick);
  }
}

class PausedGameState {
  _game;
  
  constructor(game) {
    this._game = game;
    game.input.registerKeyDownListener('pause', this.unpause);
  }

  tick = () => {
    window.requestAnimationFrame(this._game.tick);
  }

  unpause = () => {
    this._game.input.registerKeyDownListener('pause', this._game.pause);
    this._game.setState(new PlayableGameState(this._game));
  }
}

class ItemPickedUpGameState {
  _game;
  _duration;
  _frame = 0;
  _item;

  constructor(game, item, duration = 60) {
    this._game = game;
    this._item = item;
    this._duration = duration;
    game.player.setHoldingItem();
  }

  tick = () => {
    if (this._frame == this._duration) {
      this._game.setState(new PlayableGameState(this._game));
      this._game.player.resetTile();
      window.requestAnimationFrame(this._game.tick);
      return;
    }
    this._game.renderer.drawLevel(this._game.level());
    this._game.player.draw();
    const { x, y } = this._game.player.getTopLeftCoords();
    const { width, height } = this._item.tile.getData();
    // draw item above link's right hand
    this._game.renderer.drawGameTile(this._item.tile, x - width * 1 / 4, y - height / 2);

    this._frame++;
    window.requestAnimationFrame(this._game.tick);
  }
}

class InvulnerabilityGameState {
  _game;
  _duration;
  _frame = 0;
  _item;

  constructor(game, item, duration = 60) {
    this._game = game;
    this._item = item;
    this._duration = duration;
    LinkTiles.setToAlternatingGreenGrey();
  }

  tick = () => {
    const frame = (this._game.getFrame() + 1) % 60;
    this._game.setFrame(frame);
  
    this._game.topbar.draw();
    this._game.renderer.drawLevel(this._game.level());
    this._game.getItemDrops().forEach(i => i.draw(frame));
    this._game.getPlayer().draw(frame);
    
    this._game.checkPlayerCollectsItem();
    this._game.checkPlayerTileInteraction();

    window.requestAnimationFrame(this._game.tick);
  }
}