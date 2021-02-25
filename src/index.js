const nanoid = require('nanoid');

class Roulette {
  constructor(options) {
    this.setMinimumBet = this.setMinimumBet.bind(this);
    this.setMaximumBet = this.setMaximumBet.bind(this);

    this.id = generateID();
    this.minimumBet = options.minimumBet || 1; // The smallest amount a player can bet
    this.maximumBet = options.minimumBet || 10000; // The larges amount any player can bet
    this.numberOfBets = options.numberOfBets || 3; // The number of bets a single player can place per spin
    this.lastSpin = null; // The result of the last spin
    this.logging = boolCheck(options.logging) || false; // If they want logs from this module to display in the console (Includes warnings and errors)
  }

  setMinimumBet(bet) {
    // Return if not valid, not a string / number or less then 1
    if (!bet || !['string', 'number'].includes(typeof bet) || bet < 1) return this;
    this.minimumBet = typeof bet === 'string' ? Number(bet) : bet;
    return this;
  }

  setMaximumBet(bet) {
    // Return if not valid, not a string / number or more then 100,000,000
    if (!bet || !['string', 'number'].includes(typeof bet) || bet > 100000000) return this;
    this.maximumBet = typeof bet === 'string' ? Number(bet) : bet;
    return this;
  }

}


module.exports = Roulette;

function generateID(length = 10) {
  return nanoid.customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', length)();

  // const _id = nanoid.customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', length)();
  // if (db.get(_id)) return generateID(length); // TODO - Add this to check if the table id already exists
  // db.set(_id, 'inactive') // TODO - Add this to a DB of some sort
  // return _id;
}

function boolCheck(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string' && value.toLowerCase().match(/^(true|false)$/g)) return Boolean(value);
}
