class Input {
  _lastKeyEvent;
  up = 'KeyW';
  down = 'KeyS';
  left = 'KeyA';
  right = 'KeyD';
  pause = 'Space';
  primary = 'Numpad1';
  secondary = 'Numpad2';
  movementActions = [this.up, this.down, this.left, this.right];
  _keydownEventHandlers = {
    'KeyW': () => {},
    'KeyA': () => {},
    'KeyS': () => {},
    'KeyD': () => {},
    'Space': () => {},
    'Numpad1': () => {},
    'Numpad2': () => {},
  };
  _keyupEventHandlers = {
    'KeyW': () => {},
    'KeyA': () => {},
    'KeyS': () => {},
    'KeyD': () => {},
    'Space': () => {},
    'Numpad1': () => {},
    'Numpad2': () => {},
  };
  _keys = [
    'KeyW',
    'KeyS',
    'KeyA',
    'KeyD',
    'Space',
    'Numpad1',
    'Numpad2',
  ];
  _movementKeysPressed = [];

  registerEventListeners = () => {
    document.onkeydown = e => {
      const { code } = e;
      if (!this._keys.includes(code)) {
        return;
      }
      if (code !== (this._lastKeyEvent || {}).code) {
        this._keydownEventHandlers[code]();
      }
      this._lastKeyEvent = e;
      if (this.movementActions.includes(code)) {
        this._movementKeysPressed = this._movementKeysPressed.filter(k => k.code !== code);
        this._movementKeysPressed.unshift(e);
      }
    }
  
    document.onkeyup = (e) => {
      const { code } = e;

      if (!this._keys.includes(code)) {
        return;
      }
      
      this._movementKeysPressed = this._movementKeysPressed.filter(k => k.code !== code);

      if (this._lastKeyEvent && code === this._lastKeyEvent.code) {
        this._lastKeyEvent = undefined;
        this._keyupEventHandlers[code]();
        this._lastKeyEvent = this._movementKeysPressed[0];
      }
    }
  }

  unregisterEventListeners = () => {
    document.onkeydown = undefined;
    document.onkeyup = undefined;
  }

  /**
   * key - can be 'up', 'down', 'pause' etc.
   */
  registerKeyDownListener = (action, callback) => {
    this._keydownEventHandlers[this[action]] = callback;
  }
  registerKeyUpListener = (action, callback) => {
    this._keyupEventHandlers[this[action]] = callback;
  }

  onInput = ({
    onLeft, onRight, onUp, onDown, onPrimary, onSecondary
  }) => (...args) => {
    if (!this._lastKeyEvent) {
      return;
    }
    const { code } = this._lastKeyEvent;

    if (code === this.up && onUp) {
      onUp(...args);
    }
    else if (code === this.down && onDown) {
      onDown(...args);
    }
    else if (code === this.left && onLeft) {
      onLeft(...args);
    }
    else if (code === this.right && onRight) {
      onRight(...args);
    }
    else if (code === this.primary && onPrimary) {
      onPrimary(...args);
    }
    else if (code === this.secondary && onSecondary) {
      onSecondary(...args);
    }
  }

  primaryPressed = () => {
    const { code } = this._lastKeyEvent || {};
    return code === this.primary;
  }
}