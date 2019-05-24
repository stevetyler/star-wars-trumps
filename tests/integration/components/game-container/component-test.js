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
        name: 'X Wing Fighter',
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

    assert.expect(14);
    assert.equal(this.element.querySelector('.row .col:nth-child(1) h3').textContent.trim(), 'Millenium Falcon');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(1)').textContent.trim(), 'Crew : 5');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(2)').textContent.trim(), 'Length : 300');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(3)').textContent.trim(), 'Passengers : 2');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(4)').textContent.trim(), 'Hyperdrive Rating : 3');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(5)').textContent.trim(), 'Cost in Credits : 10000');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(6)').textContent.trim(), 'Cargo Capacity : 2000');

    assert.equal(this.element.querySelector('.row .col:nth-child(1) h3').textContent.trim(), 'X Wing Fighter');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(1)').textContent.trim(), 'Crew : 1');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(2)').textContent.trim(), 'Length : 100');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(3)').textContent.trim(), 'Passengers : 1');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(4)').textContent.trim(), 'Hyperdrive Rating : 1');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(5)').textContent.trim(), 'Cost in Credits : 2000');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(6)').textContent.trim(), 'Cargo Capacity : 10');
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
