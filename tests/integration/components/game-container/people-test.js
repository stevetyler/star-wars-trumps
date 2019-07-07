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
      properties: {
        Name: 'Obi Wan',
        Height: '160',
        Mass: '80',
        'Eye Colour': 'blue',
        'Birth Year': 'BBY60',
        Gender: 'male'
      }
    }),
    EmberObject.create({
      name: 'Luke Skywalker',
      properties: {
        Name: 'Luke Skywalker',
        Height: '170',
        Mass: '60',
        'Eye Colour': 'blue',
        'Birth Year': 'BBY40',
        Gender: 'male'
      }
    })
  ];

  const peopleModel = A(people);

  test('it displays player card correctly', async function(assert) {
    this.set('model', peopleModel);

    await render(hbs`
      <GameContainer
        @selectedProperty="Height"
        @model={{model}}
      />
    `);

    assert.equal(this.element.querySelector('[data-test-card-name="0"]').textContent.trim(), 'Obi Wan', 'Correct name is shown');

    assert.equal(this.element.querySelector('[data-test-property-name="Gender-0"]').textContent.trim(), 'Gender', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Gender-0"]').textContent.trim(), 'male', 'Correct gender is shown');

    assert.equal(this.element.querySelector('[data-test-property-name="Eye Colour-0"]').textContent.trim(), 'Eye Colour', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Eye Colour-0"]').textContent.trim(), 'blue', 'Correct eye colour is shown')

    assert.equal(this.element.querySelector('[data-test-property-name="Mass-0"]').textContent.trim(), 'Mass', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Mass-0"]').textContent.trim(), '80', 'Correct mass is shown')

    assert.equal(this.element.querySelector('[data-test-property-name="Height-0"]').textContent.trim(), 'Height', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Height-0"]').textContent.trim(), '160', 'Correct height is shown');

    assert.equal(this.element.querySelector('[data-test-property-name="Birth Year-0"]').textContent.trim(), 'Birth Year', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Birth Year-0"]').textContent.trim(), 'BBY60', 'Correct birth year is shown');

    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'No a11y errors found!');
    });
  });

  test('it displays the computer card and correct winner', async function(assert) {
    this.set('model', peopleModel);
    this.set('leftPlayerScore', 0);
    this.set('rightPlayerScore', 0);

    await render(hbs`
      <GameContainer
        @selectedProperty="Height"
        @model={{model}}
      />
    `);

    await click('.btn');

    assert.equal(this.element.querySelector('.row .col-sm-8:nth-child(2) h3').textContent.trim(), 'Luke Skywalker', 'Correct name is shown');

    assert.equal(this.element.querySelector(`${columnRight}(1) th`).textContent.trim(), 'Gender', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnRight}(1) td`).textContent.trim(), 'male', 'Correct gender is shown');

    assert.equal(this.element.querySelector(`${columnRight}(2) th`).textContent.trim(), 'Eye Colour', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnRight}(2) td`).textContent.trim(), 'blue', 'Correct eye colour is shown')

    assert.equal(this.element.querySelector(`${columnRight}(3) th`).textContent.trim(), 'Mass', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnRight}(3) td`).textContent.trim(), '60', 'Correct mass is shown')

    assert.equal(this.element.querySelector(`${columnRight}(4) th`).textContent.trim(), 'Height', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnRight}(4) td`).textContent.trim(), '170', 'Correct height is shown');

    assert.equal(this.element.querySelector(`${columnRight}(5) th`).textContent.trim(), 'Birth Year', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnRight}(5) td`).textContent.trim(), 'BBY40', 'Correct birth year is shown');

    assert.equal(this.element.querySelector('.row .col-sm-8:nth-child(1) h2 span:nth-child(1)').textContent.trim(), 'Player :', 'Player heading shown');
    assert.equal(this.element.querySelector('.row .col-sm-8:nth-child(1) h2 span:nth-child(2)').textContent.trim(), '0', 'Correct score shown');

    assert.equal(this.element.querySelector('.row .col-sm-8:nth-child(2) h2 span:nth-child(1)').textContent.trim(), 'Computer :', 'Computer heading shown');
    assert.equal(this.element.querySelector('.row .col-sm-8:nth-child(2) h2 span:nth-child(2)').textContent.trim(), '1', 'Correct score shown');

    assert.equal(this.element.querySelector('p').textContent.trim(), 'Computer Wins!', 'Correct winner shown');
  });
});
