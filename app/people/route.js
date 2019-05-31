import Route from '@ember/routing/route';
import getRandomInt from 'star-wars-trumps/utils/random-integer';

export default Route.extend({
  model() {
    // 87 people
    const pageNum = getRandomInt(1, 8);

    return this.store.query('person', {page: pageNum});
  },
  actions: {
    refreshRoute() {
      this.refresh();
    }
  }
});
