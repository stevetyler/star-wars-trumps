import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  init() {
    this._super(...arguments);
    this.set('properties', {
      'Passengers': this.get('passengers'),
      'Length': this.get('length'),
      'Hyperdrive Rating': this.get('hyperdrive_rating'),
      'Cost in Credits': this.get('cost_in_credits'),
      'Cargo Capacity': this.get('cargo_capacity'),
    })
  },
  name: DS.attr('string'),
  cargo_capacity: DS.attr('string'),
  cost_in_credits: DS.attr('string'),
  crew: DS.attr('string'),
  length: DS.attr('string'),
  passengers: DS.attr('string'),
  hyperdrive_rating: DS.attr('string')
});
