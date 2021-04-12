const Scripts = {
  [ItemName.WoodenSword]: (game, item) => {
    Progress[item.name] = true;
    Progress.VisitedWoodenSwordCave = true;
    game.gotItem(item);
    // game.setState(new ItemPickedUpGameState(game, item));
  }
}