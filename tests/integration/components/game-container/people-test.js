import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { A } from '@ember/array';

module('Integration | Component | Game Container | People', function(hooks) {
  setupRenderingTest(hooks);

  const people = [
    EmberObject.create({
      name: 'Obi Wan',
      height: '160',
      mass: '80',
      eye_color: 'blue',
      birth_year: 'BBY60',
      gender: 'male'
    }),
    EmberObject.create({
      name: 'Luke Skywalker',
      height: '170',
      mass: '60',
      eye_color: 'blue',
      birth_year: 'BBY40',
      gender: 'male'
    })
  ];

  const peopleModel = A(people);

  test('it displays people correctly', async function(assert) {
    this.set('model', peopleModel);

    await render(hbs`
      <GameContainer
        @game="people"
        @selectedAttr="height"
        @model={{model}}
      />
    `);

    const selector = '.row .col:nth-child(1) tbody tr:nth-child';

    assert.equal(this.element.querySelector('.row .col:nth-child(1) h3').textContent.trim(), 'Obi Wan', 'Correct name is shown');

    assert.equal(this.element.querySelector(`${selector}(1) th`).textContent.trim(), 'Gender', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${selector}(1) td`).textContent.trim(), 'male', 'Correct gender is shown');

    assert.equal(this.element.querySelector(`${selector}(2) th`).textContent.trim(), 'Eye Colour', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${selector}(2) td`).textContent.trim(), 'blue', 'Correct eye colour is shown')

    assert.equal(this.element.querySelector(`${selector}(3) th`).textContent.trim(), 'Mass', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${selector}(3) td`).textContent.trim(), '80', 'Correct mass is shown')

    assert.equal(this.element.querySelector(`${selector}(4) th`).textContent.trim(), 'Height', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${selector}(4) td`).textContent.trim(), '160', 'Correct height is shown');

    assert.equal(this.element.querySelector(`${selector}(5) th`).textContent.trim(), 'Birth Year', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${selector}(5) td`).textContent.trim(), 'BBY60', 'Correct birth year is shown');

    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'No a11y errors found!');
    });
  });

  test('it displays the correct winner', async function(assert) {
    this.set('model', peopleModel);
    this.set('leftPlayerScore', 0);
    this.set('rightPlayerScore', 0);

    await render(hbs`
      <GameContainer
        @game="people"
        @selectedAttr="height"
        @model={{model}}
        @leftPlayerScore={{leftPlayerScore}}
        @rightPlayerScore={{rightPlayerScore}}
      />
    `);

    await click('.btn');

    assert.equal(this.element.querySelector('.row .col:nth-child(1) h2 span:nth-child(1)').textContent.trim(), 'Player :', 'Player heading shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) h2 span:nth-child(2)').textContent.trim(), '0', 'Correct score shown');

    assert.equal(this.element.querySelector('.row .col:nth-child(2) h2 span:nth-child(1)').textContent.trim(), 'Computer :', 'Computer heading shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) h2 span:nth-child(2)').textContent.trim(), '1', 'Correct score shown');

    assert.equal(this.element.querySelector('p').textContent.trim(), 'Computer Wins!', 'Correct winner shown');
  });
});
