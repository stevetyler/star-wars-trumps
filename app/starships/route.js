import Route from '@ember/routing/route';
import {getRandomInt} from 'star-wars-trumps/utils/helpers';

export default Route.extend({
  model() {
    // 37 starships
    const pageNum = getRandomInt(1, 3);

    return this.store.query('starship', {page: pageNum});
  }
});
