class Sprites {
  static LinkAndItems = new Image();
  static Overworld = new Image();
  static Character = new Image();
  static Enemies = new Image();
  static Topbar = new Image();

  static load(onLoad) {
    Sprites.LinkAndItems.src = './assets/link-and-items.png';
    Sprites.Overworld.src = './assets/tiles-overworld.png';
    Sprites.Character.src = './assets/characters.png';
    Sprites.Enemies.src = './assets/enemies.png';
    Sprites.Topbar.src = './assets/topbar.jpg';
    
    const images = [
      Sprites.Overworld,
      Sprites.LinkAndItems,
      Sprites.Character,
      Sprites.Enemies,
      Sprites.Topbar,
    ];
    const loaded = images.map(_ => false);

    images.forEach((image, index) => {
      image.onload = () => {
        loaded[index] = true;
        if (Utils.all(loaded)) {
          onLoad();
        }
      };
    });
  }

  static IsPrimarySpriteFrame = frame => {
    // return frame % 10 < 5;
    return frame > 0 && frame < 10 || 
      frame > 20 && frame < 30 ||
      frame > 40 && frame < 50;
  };
}