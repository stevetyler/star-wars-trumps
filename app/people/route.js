import Route from '@ember/routing/route';
import {getRandomInt} from 'star-wars-trumps/utils/helpers';

export default Route.extend({
  model() {
    // 87 people
    const pageNum = getRandomInt(1, 8);

    return this.store.query('person', {page: pageNum});
  }
});
