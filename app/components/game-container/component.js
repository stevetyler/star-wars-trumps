import Component from '@ember/component';
import {A} from '@ember/array';

export default Component.extend({
  gameCount: 0,
  gamePair: null,
  result: '',
  hideComputerCard: true,
  isLeftWinner: false,
  isRightWinner: false,

  init() {
    this._super(...arguments);

    this._deal(this.model);
  },

  _parseAttr(str) {
    if (str === 'unknown') {
      return 0;
    }
    if (str.indexOf(',')) {
      return Number(str.replace(/,/g, ''));
    }
    return Number(str);
  },

  _compareAttrs(collection, attr) {
    const leftAttr = this._parseAttr(collection[0].get(attr));
    const rightAttr = this._parseAttr(collection[1].get(attr));

    if (leftAttr > rightAttr) {
      this.incrementProperty('leftPlayerScore');
      this.set('isLeftWinner', true);
      this.set('result', 'You Win!');
    }
    else if (leftAttr < rightAttr){
      this.incrementProperty('rightPlayerScore');
      this.set('isRightWinner', true);
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

    const collection = nativeArr.reduce((acc, model, i) => {
      if (i % 2 === 0) {
        acc.push(A([nativeArr[i], nativeArr[i+1]]));
      }
      return acc;
    }, []);

    this.set('collection', collection);
    this.set('gamePair', collection[0]);
  },

  _nextGame(collection) {
    this.set('hideComputerCard', true);
    this.set('result', '');

    if (this.gameCount < collection.length) {
      this.incrementProperty('gameCount');
      if (this.gameCount === collection.length) {
        this.refreshRoute();
      } else {
        this.set('gamePair', collection[this.gameCount]);
        this.set('isLeftWinner', false);
        this.set('isRightWinner', false);
      }
    }
  },

  actions: {
    play(shuffledModel, attr) {
      const collection = this.get('collection');

      this._compareAttrs(collection[this.gameCount], attr);

      this.set('hideComputerCard', false);

      setTimeout(() => {
        this._nextGame(collection);
      }, 3000);
    }
  }
});
