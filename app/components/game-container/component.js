import Component from '@ember/component';
import {A} from '@ember/array';

export default Component.extend({
  leftPlayerScore: 0,
  rightPlayerScore: 0,
  result: '',
  gameCollection: null,
  keepModelOrder: false, // needed for tests

  init() {
    this._super(...arguments);

    this.send('deal', this.model);
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
      const nativeArr = [];

      for (let i = 0; i < shuffledModel.length; i++) {
        nativeArr.push(shuffledModel.get(i));
      }

      const dealtCards = nativeArr.reduce(function(acc, model, i) {
        if (i % 2 === 0) {
          acc.push(A([nativeArr[i], nativeArr[i+1]]));
          return acc;
        }
      }, []);

      this.set('dealtCards', dealtCards);
    },

    play(model, attr) {
      const collection = this.get('dealtCards');
      debugger;
      this._compareAttrs(collection[0], attr);
    },
  }
});
