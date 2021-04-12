class Utils {
  static all = arr => arr.reduce((acc, x) => !x ? false : acc, true);

  static setInRange = (min, max, x) => {
    if (x < min) return min;
    else if (x > max) return max;
    return x;
  }

  static randomRange = (min, max) => min + Math.round(Math.random() * (max - min));

  static approxEqual = (a, b, margin) => Math.abs(a - b) <= margin;

  static inGameRange = (x, y) => ({
    x: Utils.setInRange(0, Game.GAME_WIDTH, x),
    y: Utils.setInRange(0, Game.GAME_HEIGHT, y),
  });

  static intersects = (rect1, rect2) => {
    const { x: x1, y: y1, width: width1, height: height1 } = rect1;
    const { x: x2, y: y2, width: width2, height: height2 } = rect2;
    const width = x1 < x2 ? width1 : width2;
    const height = y1 < y2 ? height1 : height2;
    const valid = Math.abs(x1 - x2) <= width && Math.abs(y1 - y2) <= height;
    if (!valid) {
      return {
        valid,
      };
    }
    // the direction of rect1 as it intersects rect2
    let direction;
    if (y2 > y1) direction = Direction.Down;
    else if (y1 > y2) direction = Direction.Up;
    else if (x2 > x1) direction = Direction.Left;
    else if (x2 < x1) direction = Direction.Right;
    return { valid, direction };
  }
};
