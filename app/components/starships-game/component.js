import Component from '@ember/component';

export default Component.extend({
  leftPlayerScore: 0,
  rightPlayerScore: 0,

  selectedAttr: 'crew',

  gameCollection: null,

  _shuffleModel() {
    const array = this.starships.toArray();

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  },

  _compareAttrs() {
    const attr = this.selectedAttr;
    const collection = this.gameCollection;

    if (collection[0].get(attr) > collection[1].get(attr)) {
      this.leftPlayerScore.increment();
    } else {
      this.rightPlayerScore.increment();
    }
  },

  actions: {
    pickRandom() {
      const shuffledModel = this._shuffledModel();

      this.set('gameCollection', [shuffledModel.get('firstObject'), shuffledModel.get('lastObject')]);
      this._compareAttrs();
    },
  }
});
