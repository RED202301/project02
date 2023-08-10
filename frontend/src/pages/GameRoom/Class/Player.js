/** @typedef {Map<string, Player>} playerMap*/

export class Player {
  /** @type {number} */ userId;
  /** @type {string} */ nickname;
  /** @type {boolean} */ bot;

  /** @type {number} */ score = 0;
  /** @type {Card[]} */ cardsOnHand = [];
  /** @type {Card[]} */ cardsEnrolled = [];

  constructor(
    /** @type {{userId:Number, nickname:string, bot:boolean?}}*/ { userId, nickname, bot }
  ) {
    this.userId = userId;
    this.nickname = nickname;
    this.bot = bot || false;
  }

  draw(/** @type {Card} */ card) {
    this.cardsOnHand.push(card);
  }

  enroll(/** @type {number} */ cardId) {
    let { cardsOnHand, cardsEnrolled } = this;
    cardsOnHand = cardsOnHand.reduce((acc, card) => {
      card.cardId === cardId ? (cardsEnrolled = [...cardsEnrolled, card]) : acc.push(card);
      return acc;
    }, []);
    this.cardsEnrolled = cardsEnrolled;
    this.cardsOnHand = cardsOnHand;
  }

  lost(/** @type {number} */ cardId) {
    this.cardsOnHand = this.cardsOnHand.filter(card => card.cardId !== cardId);
  }
}
