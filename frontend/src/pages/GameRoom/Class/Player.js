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
    // console.log(this.userId, 'draw', card);
    // console.log(this.userId, this.cardsOnHand);
  }

  enroll(/** @type {number} */ cardId) {
    const { cardsOnHand, cardsEnrolled } = this;
    const enrolledCard = cardsOnHand.filter(Card => Card.cardId === cardId)[0];
    this.cardsOnHand = cardsOnHand.filter(Card => Card.cardId !== cardId);
    this.cardsEnrolled = [...cardsEnrolled, enrolledCard];
    // console.log(this.userId, 'enroll', cardId);
    // console.log(this.userId, this.cardsOnHand);
  }

  lost(/** @type {number} */ cardId) {
    const { cardsOnHand } = this;
    this.cardsOnHand = cardsOnHand.filter(card => card.cardId !== cardId);
    // console.log(this.userId, 'lost', cardId);
    // console.log(this.userId, this.cardsOnHand);
  }
}
