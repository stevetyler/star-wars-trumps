import Controller from '@ember/controller';
import {computed} from '@ember/object';
import {shuffle} from 'star-wars-trumps/utils/helpers';

export default Controller.extend({
  leftPlayerScore: 0,
  rightPlayerScore: 0,

  shuffledModel: computed('model', function () {
    const array = this.model.toArray();

    return shuffle(array);
  })
});
