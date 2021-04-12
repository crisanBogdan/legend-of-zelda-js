'use strict'

const input = new Input();
const player = new Player();
const renderer = new Renderer();
const game = new Game();


player.setGame(game)
.setInput(input)
.setRenderer(renderer)
.init();

renderer.init();

game.setPlayer(player)
.setRenderer(renderer)
.setInput(input)
.init();

// Scripts[ItemName.WoodenSword](game, Items[ItemName.WoodenSword]);
// game.setLevel(Levels.NineNine());

Sprites.load(game.start);