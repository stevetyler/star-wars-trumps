import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  init() {
    this._super(...arguments);
    this.set('properties', {
      'Gender': this.gender,
      'Eye Colour': this.eye_color,
      'Height': this.height,
      'Mass': this.mass,
      'Birth Year': this.birth_year,
    })
  },
  name: DS.attr('string'),
  height: DS.attr('string'),
  mass: DS.attr('string'),
  eye_color: DS.attr('string'),
  birth_year: DS.attr('string'),
  gender: DS.attr('string')
});
