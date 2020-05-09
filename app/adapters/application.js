import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  init() {
    this._super(...arguments);

    this.set('headers', {
      'Accept': 'application/json',
      'Content-Type' : 'application/json'
    });
  },
  namespace: 'api',
  host: 'https://swapi.dev'
});
