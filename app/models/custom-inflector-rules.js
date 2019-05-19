import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;

inflector.irregular('person', 'people');

// Meet Ember Inspector's expectation of an export
export default {};
