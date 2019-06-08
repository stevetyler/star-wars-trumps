import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr('string'),
  cargo_capacity: DS.attr('string'),
  cost_in_credits: DS.attr('string'),
  crew: DS.attr('string'),
  length: DS.attr('string'),
  passengers: DS.attr('string'),
  hyperdrive_rating: DS.attr('string')
});
