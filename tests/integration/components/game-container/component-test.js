import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | game-container', function(hooks) {
  setupRenderingTest(hooks);

  // STARSHIPS
  test('it displays starship cards correctly', async function(assert) {
    const collection = [
      EmberObject.create({
        name: 'Millenium Falcon',
        crew: '5',
        length: '300',
        passengers: '2',
        hyperdrive_rating: '3',
        cost_in_credits: '10000',
        cargo_capacity: '2000'
      }),
      EmberObject.create({
        name: 'X Wing',
        crew: '1',
        length: '100',
        passengers: '1',
        hyperdrive_rating: '1',
        cost_in_credits: '2000',
        cargo_capacity: '10'
      })
    ];

    this.set('collection', collection);

    await render(hbs`
      <GameContainer
        @game="starships"
        @selectedAttr="crew"
        @gameCollection={{collection}}
      />
    `);

    assert.equal(this.element.querySelector('h2').textContent.trim(), 'Player :');

    // assert left player attributes
    // assert right player attributes
  });

  // test('it displays the correct winner', async function(assert) {
  //
  // });


  // PEOPLE
  // test('it displays cards correctly', async function(assert) {
  //   this.set('game', 'people');
  //   const collection = [
  //     EmberObject.create({
  //       name: '',
  //       height: '',
  //       mass: '',
  //       eye_color: '',
  //       birth_year: '',
  //       gender: ''
  //     }),
  //     EmberObject.create({
  //       name: '',
  //       height: '',
  //       mass: '',
  //       eye_color: '',
  //       birth_year: '',
  //       gender: ''
  //     })
  //   ]
  //   this.set('gameCollection', collection);
  //   await render(hbs`
  //     <GameContainer
  //       @game="people"
  //       @selectedAttr="crew"/>
  //   `);
  // });
  //
  // test('it displays the correct winner', async function(assert) {
  //
  // });
});
