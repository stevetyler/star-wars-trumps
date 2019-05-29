import Controller from '@ember/controller';
import {sort} from '@ember/object/computed';

export default Controller.extend({
  shuffleModel(model) {
    const array = this.model.toArray();

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return model
  },
  shuffledModel: sort('model', 'shuffleModel'),
});
