import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr('string'),
  cargo_capacity: DS.attr('number'),
  cost_in_credits: DS.attr('number'),
  crew: DS.attr('number'),
  length: DS.attr('number'),
  passengers: DS.attr('number'),
  hyperdrive_rating: DS.attr('string')
});
