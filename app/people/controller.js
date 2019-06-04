import Controller from '@ember/controller';
import {computed} from '@ember/object';

export default Controller.extend({
  leftPlayerScore: 0,
  rightPlayerScore: 0,

  shuffledModel: computed('model', function () {
    const array = this.model.toArray();

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  })
});
