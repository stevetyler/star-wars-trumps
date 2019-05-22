import Component from '@ember/component';

export default Component.extend({
  leftPlayerScore: 0,
  rightPlayerScore: 0,
  result: '',
  gameCollection: null,

  _compareAttrs(collection, attr) {
    const leftScore = parseFloat(collection[0].get(attr));
    const rightScore = parseFloat(collection[1].get(attr));

    if (leftScore > rightScore) {
      this.incrementProperty('leftPlayerScore');
      this.set('result', 'Player 1 Wins');
    }
    else if (leftScore < rightScore){
      this.incrementProperty('rightPlayerScore');
      this.set('result', 'Computer Wins');
    } else {
      this.set('result', 'Draw');
    }
  },

  _shuffleModel(model) {
    const array = model.toArray();

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  },

  actions: {
    pickRandom(model, attr) {
      const shuffledModel = this._shuffleModel(model);
      const collection = [shuffledModel.get('firstObject'), shuffledModel.get('lastObject')];
      this.set('gameCollection', collection);

      this._compareAttrs(collection, attr);
    },
  }
});
