class Inventory {
  rupees = 0;
  bombs = 0;
  keys = 0;
  primary;
  secondary;
  hearts = 3;
  maxHearts = 3;
  armor = 0;
  items = [];
  
  _listeners = [];

  add = item => {
    switch(item.name) {
      case ItemName.WoodenSword: {
        this.primary = item;
        break;
      }
      case ItemName.OneRupee: {
        this.rupees = Math.min(255, this.rupees + 1);
        break;
      }
      case ItemName.FiveRupees: {
        this.rupees = Math.min(255, this.rupees + 5);
        break;
      }
      case ItemName.Bomb: {
        this.bombs = Math.min(255, this.bombs + 1);
        break;
      }
      case ItemName.Heart: {
        this.hearts = Math.min(this.maxHearts, this.hearts + 1);
        break;
      }
      default: throw Error('Unknown item.');
    }
    this._listeners.forEach(cb => cb(item));
  }
  registerListener = cb => this._listeners.push(cb);

  fullHearts = () => Math.floor(this.hearts);
  halfHearts = () => {
    const string = this.hearts.toString();
    return string.length > 1 && string.endsWith('5');
  }
  emptyHearts = () => Math.floor(this.maxHearts - this.hearts);
  setInitialHearts = () => this.hearts = 3;
  isAtMaxHealth = () => this.hearts === this.maxHearts;
  canAttack = () => !!this.primary;
  canShootPrimaryProjectile = () => {
    if ((this.primary || {}).name === ItemName.WoodenSword) {
      return this.isAtMaxHealth();
    }
    return false;
  }

  primaryItemName = () => (this.primary || {}).name;
  primaryItemDamage = () => {
    const damage = (this.primary || {}).damage;
    if (this.primary && damage === undefined) {
      throw Error('Item has no damage set.')
    }
    return damage;
  }

  damage = amount => {
    this.hearts -= Math.max(0.25, amount - this.armor);
  }
}