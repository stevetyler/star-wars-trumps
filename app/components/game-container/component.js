import Component from '@ember/component';

export default Component.extend({
  leftPlayerScore: 0,
  rightPlayerScore: 0,
  result: '',
  gameCollection: null,
  keepModelOrder: false, // needed for tests

  init() {
    this._super(...arguments);

    this.send('play', this.model, this.selectedAttr);
  },

  _compareAttrs(collection, attr) {
    const leftScore = parseFloat(collection[0].get(attr));
    const rightScore = parseFloat(collection[1].get(attr));

    if (leftScore > rightScore) {
      this.incrementProperty('leftPlayerScore');
      this.set('result', 'Player Wins');
    }
    else if (leftScore < rightScore){
      this.incrementProperty('rightPlayerScore');
      this.set('result', 'Computer Wins');
    } else {
      this.set('result', 'Draw');
    }
  },

  actions: {
    deal(shuffledModel) {
      const dealtCards = shuffledModel.reduce((arr, model, i) => {
        if (i % 2 === 0) {
          return arr.push(new Array(shuffledModel[i], shuffledModel[i+1]));
        }
      }, []);
      this.set('dealtCards', dealtCards);
    },
    play(model, attr) {
      let collection;

      if (this.keepModelOrder) {
        collection = model.toArray();
      }
      else {
        const shuffledModel = this._shuffleModel(model);
        collection = [shuffledModel.get('firstObject'), shuffledModel.get('lastObject')];
      }
      this.set('gameCollection', collection);

      this._compareAttrs(collection, attr);
    },
  }
});
