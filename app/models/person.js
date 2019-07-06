import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  init() {
    this._super(...arguments);
    this.set('properties', {
      'Gender': this.get('gender'),
      'Eye Colour': this.get('eye_color'),
      'Height': this.get('height'),
      'Mass': this.get('mass'),
      'Birth Year': this.get('birth_year'),
    })
  },
  name: DS.attr('string'),
  height: DS.attr('string'),
  mass: DS.attr('string'),
  eye_color: DS.attr('string'),
  birth_year: DS.attr('string'),
  gender: DS.attr('string')
});
