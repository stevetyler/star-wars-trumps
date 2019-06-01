import Component from '@ember/component';
import {A} from '@ember/array';

export default Component.extend({
  gameCount: 0,
  result: '',
  gamePair: null,
  keepModelOrder: false, // needed for tests
  hideComputerCard: true,

  init() {
    this._super(...arguments);

    this._deal(this.model);

    const collection = this.get('dealtCards');

    this.set('gamePair', collection[0]);
  },

  _compareAttrs(collection, attr) {
    const leftScore = parseFloat(collection[0].get(attr));
    const rightScore = parseFloat(collection[1].get(attr));

    if (leftScore > rightScore) {
      this.incrementProperty('leftPlayerScore');
      this.set('result', 'Player Wins!');
    }
    else if (leftScore < rightScore){
      this.incrementProperty('rightPlayerScore');
      this.set('result', 'Computer Wins!');
    } else {
      this.set('result', 'Draw');
    }
  },

  _deal(shuffledModel) {
    const nativeArr = [];

    for (let i = 0; i < shuffledModel.length; i++) {
      nativeArr.push(shuffledModel.get(i));
    }

    const dealtCards = nativeArr.reduce(function(acc, model, i) {
      if (i % 2 === 0) {
        acc.push(A([nativeArr[i], nativeArr[i+1]]));
      }
      return acc;
    }, []);

    this.set('dealtCards', dealtCards);
  },

  actions: {
    play(shuffledModel, attr) {
      const collection = this.get('dealtCards');

      this.set('hideComputerCard', false);

      this._compareAttrs(collection[this.gameCount], attr);

      setTimeout(() => {
        this.set('hideComputerCard', true);
        this.set('result', '');

        if (this.gameCount < collection.length) {
          this.incrementProperty('gameCount');
          if (this.gameCount === collection.length) {
            this.refreshRoute();
          } else {
            this.set('gamePair', collection[this.gameCount]);
          }
        }
      }, 3000);
    }
  }
});
