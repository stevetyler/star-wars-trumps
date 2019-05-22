import Component from '@ember/component';

export default Component.extend({
  leftPlayerScore: 0,
  rightPlayerScore: 0,
  result: '',
  selectedAttr: '',

  gameCollection: null,

  _compareAttrs() {
    const attr = this.selectedAttr;
    const collection = this.gameCollection;

    const leftScore = parseFloat(collection[0].get(attr));
    const rightScore = parseFloat(collection[1].get(attr));

    if (leftScore > rightScore) {
      this.incrementProperty('leftPlayerScore');
      this.set('result', 'Player 0 Wins!');
    }
    else if (leftScore < rightScore){
      this.incrementProperty('rightPlayerScore');
      this.set('result', 'Player 1 Wins!');
    } else {
      this.set('result', 'Draw');
    }
  },

  _shuffleModel() {
    const array = this.model.toArray();

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  },

  actions: {
    pickRandom() {
      const shuffledModel = this._shuffleModel();

      this.set('gameCollection', [shuffledModel.get('firstObject'), shuffledModel.get('lastObject')]);
      this._compareAttrs();
    },
  }
});
