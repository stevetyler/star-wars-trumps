import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

module('Integration | Component | game-container', function(hooks) {
  setupRenderingTest(hooks);

  const people = [
    EmberObject.create({
      name: 'Obi Wan',
      height: '200',
      mass: '80',
      eye_color: 'blue',
      birth_year: 'BBY60',
      gender: 'male'
    }),
    EmberObject.create({
      name: 'Luke Skywalker',
      height: '140',
      mass: '60',
      eye_color: 'blue',
      birth_year: 'BBY40',
      gender: 'male'
    })
  ];

  const starships = [
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

  const peopleModel = ArrayProxy.create({
    content: A(people)
  });

  const starshipsModel = ArrayProxy.create({
    content: A(starships)
  });

  // PEOPLE
  test('it displays people correctly', async function(assert) {
    this.set('collection', peopleModel);

    // keep model order so that collection is not shuffled in tests
    await render(hbs`
      <GameContainer
        @game="people"
        @selectedAttr="height"
        @model={{collection}}
        @keepModelOrder=true
      />
    `);

    assert.expect(13);
    //assert.equal(this.element.querySelector('h1').textContent.trim(), 'Star Wars Top Trumps', 'Correct Heading is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) h3').textContent.trim(), 'Obi Wan', 'Correct name is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(1)').textContent.trim(), 'Mass : 80', 'Correct mass is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(2)').textContent.trim(), 'Gender : male', 'Correct gender is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(3)').textContent.trim(), 'Height : 200', 'Correct height is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(4)').textContent.trim(), 'Eye Colour : blue', 'Correct eye colour is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(5)').textContent.trim(), 'Birth Year : BBY60', 'Correct bith year is shown');

    assert.equal(this.element.querySelector('.row .col:nth-child(2) h3').textContent.trim(), 'Luke Skywalker', 'Correct name is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(1)').textContent.trim(), 'Mass : 60', 'Correct mass is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(2)').textContent.trim(), 'Gender : male', 'Correct gender is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(3)').textContent.trim(), 'Height : 140', 'Correct height is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(4)').textContent.trim(), 'Eye Colour : blue', 'Correct eye colour is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(5)').textContent.trim(), 'Birth Year : BBY40', 'Correct birth year is shown');

    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });

  // test('it displays the correct winner', async function(assert) {
  //   this.set('collection', people);
  //
  //   await render(hbs`
  //     {{game-container gameCollection=collection game="people"}}
  //   `);
  //   assert.async();
  //   assert.equal(this.element.querySelector('p').textContent.trim(), 'Player Wins');
  // });


  // STARSHIPS
  test('it displays starships correctly', async function(assert) {
    this.set('collection', starshipsModel);

    await render(hbs`
      <GameContainer
        @game="starships"
        @selectedAttr="crew"
        @model={{collection}}
        @keepModelOrder=true
      />
    `);

    assert.expect(15);
    assert.equal(
      this.element.querySelector('.row .col:nth-child(1) h3').textContent.trim(),
      'Millenium Falcon',
      'Correct name is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(1)').textContent.trim(), 'Crew : 5', 'Correct crew is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(2)').textContent.trim(), 'Length : 300', 'Correct length is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(3)').textContent.trim(), 'Passengers : 2', 'Correct passengers are shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(4)').textContent.trim(), 'Hyperdrive Rating : 3', 'Correct rating is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(5)').textContent.trim(), 'Cost in Credits : 10000', 'Correct cost is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(6)').textContent.trim(), 'Cargo Capacity : 2000', 'Correct capacity is shown');

    assert.equal(this.element.querySelector('.row .col:nth-child(2) h3').textContent.trim(), 'X Wing Fighter', 'Correct name is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(1)').textContent.trim(), 'Crew : 1', 'Correct crew is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(2)').textContent.trim(), 'Length : 100', 'Correct length is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(3)').textContent.trim(), 'Passengers : 1', 'Correct passengers are shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(4)').textContent.trim(), 'Hyperdrive Rating : 1', 'Correct rating is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(5)').textContent.trim(), 'Cost in Credits : 2000', 'Correct cost is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(6)').textContent.trim(), 'Cargo Capacity : 10', 'Correct capacity is shown');

    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });

  // test('it displays the correct winner', async function(assert) {
  //
  // });
});
