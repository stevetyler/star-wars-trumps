import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | game-container', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<GameContainer />`);

    assert.equal(this.element.textContent.trim(), '');

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  // STARSHIPS
  test('it displays cards correctly', async function(assert) {
    this.set('game', 'starships');
    const collection = [
      EmberObject.create({
        name: 'Millenium Falcon',
        crew: '5',
        length: '',
        passengers: '',
        hyperdrive_rating: '',
        cost_in_credits: '',
        cargo_capacity: ''
      }),
      EmberObject.create({
        name: '',
        crew: '1',
        length: '',
        passengers: '',
        hyperdrive_rating: '',
        cost_in_credits: '',
        cargo_capacity: ''
      })
    ]
    this.set('gameCollection', collection);

    await render(hbs`
      <GameContainer
        @game="starships"
        @selectedAttr="crew"/>
    `);

    // assert left player attributes
    // assert right player attributes
  });

  test('it displays the correct winner', async function(assert) {

  });


  // PEOPLE
  test('it displays cards correctly', async function(assert) {
    this.set('game', 'people');
    const collection = [
      EmberObject.create({
        name: '',
        height: '',
        mass: '',
        eye_color: '',
        birth_year: '',
        gender: ''
      }),
      EmberObject.create({
        name: '',
        height: '',
        mass: '',
        eye_color: '',
        birth_year: '',
        gender: ''
      })
    ]
    this.set('gameCollection', collection);
    await render(hbs`
      <GameContainer
        @game="people"
        @selectedAttr="crew"/>
    `);
  });

  test('it displays the correct winner', async function(assert) {

  });
});
