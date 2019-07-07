import Component from '@ember/component';
import {A} from '@ember/array';
import {shuffle} from 'star-wars-trumps/utils/helpers';
import {computed} from '@ember/object';
import config from 'star-wars-trumps/config/environment';

export default Component.extend({
  init() {
    const shuffledModel = this.get('shuffledModel');
    this._super(...arguments);
    this._deal(shuffledModel);
  },

  leftPlayerScore: 0,
  rightPlayerScore: 0,
  gameCount: 0,
  gamePair: null,
  result: '',
  hideComputerCard: true,
  isLeftWinner: false,
  isRightWinner: false,

  shuffledModel: computed('model', function () {
    const array = this.model.toArray();

    console.log('environment', config.environment);
    return config.environment !== 'test' ? shuffle(array) : array;
  }),

  _parseAttr(str) {
    if (str === 'unknown') {
      return 0;
    }
    if (str.indexOf(',')) {
      return Number(str.replace(/,/g, ''));
    }
    return Number(str);
  },

  _compareAttrs(collection, Property) {
    const leftProperty = this._parseAttr(collection[0].get(`properties.${Property}`));
    const rightProperty = this._parseAttr(collection[1].get(`properties.${Property}`));

    if (leftProperty > rightProperty) {
      this.incrementProperty('leftPlayerScore');
      this.set('isLeftWinner', true);
      this.set('result', 'You Win!');
    }
    else if (leftProperty < rightProperty){
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
    play(shuffledModel, property) {
      const collection = this.get('collection');

      this._compareAttrs(collection[this.gameCount], property);

      this.set('hideComputerCard', false);

      setTimeout(() => {
        this._nextGame(collection);
      }, 3000);
    }
  }
});
