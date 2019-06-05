import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr('string'),
  height: DS.attr('string'),
  mass: DS.attr('string'),
  eye_color: DS.attr('string'),
  birth_year: DS.attr('string'),
  gender: DS.attr('string'),
});
