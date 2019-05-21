import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({
  leftPlayerScore: 0,
  rightPlayerScore: 0,

  shuffledModel: computed('starships', function() {
    const array = this.starships.toArray();

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }),

  gameCollection: null,

  actions: {
    pickRandom() {
      const shuffledModel = this.shuffledModel;

      this.set('gameCollection', [shuffledModel.get('firstObject'), shuffledModel.get('lastObject')]);
    },
  }
});
