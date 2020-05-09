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

    assert.dom(this.element.querySelector('[data-test-card-name="0"]')).hasText('Obi Wan', 'Correct name is shown');

    assert.dom(this.element.querySelector('[data-test-property-name="Gender Player 0"]')).hasText('Gender', 'Correct table heading is shown');
    assert.dom(this.element.querySelector('[data-test-property-value="Gender Player 0"]')).hasText('male', 'Correct gender is shown');

    assert.dom(
      this.element.querySelector('[data-test-property-name="Eye Colour Player 0"]')
    ).hasText('Eye Colour', 'Correct table heading is shown');
    assert.dom(
      this.element.querySelector('[data-test-property-value="Eye Colour Player 0"]')
    ).hasText('blue', 'Correct eye colour is shown')

    assert.dom(this.element.querySelector('[data-test-property-name="Mass Player 0"]')).hasText('Mass', 'Correct table heading is shown');
    assert.dom(this.element.querySelector('[data-test-property-value="Mass Player 0"]')).hasText('80', 'Correct mass is shown')

    assert.dom(this.element.querySelector('[data-test-property-name="Height Player 0"]')).hasText('Height', 'Correct table heading is shown');
    assert.dom(this.element.querySelector('[data-test-property-value="Height Player 0"]')).hasText('160', 'Correct height is shown');

    assert.dom(
      this.element.querySelector('[data-test-property-name="Birth Year Player 0"]')
    ).hasText('Birth Year', 'Correct table heading is shown');
    assert.dom(
      this.element.querySelector('[data-test-property-value="Birth Year Player 0"]')
    ).hasText('BBY60', 'Correct birth year is shown');

    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'No a11y errors found!');
    });
  });

  test('it displays the computer card and correct winner', async function(assert) {
    this.set('model', peopleModel);

    await render(hbs`
      <GameContainer
        @selectedProperty="Height"
        @model={{model}}
      />
    `);

    await click('.btn');

    assert.dom(this.element.querySelector('[data-test-card-name="1"]')).hasText('Luke Skywalker', 'Correct name is shown');

    assert.dom(this.element.querySelector('[data-test-property-name="Gender Player 1"]')).hasText('Gender', 'Correct table heading is shown');
    assert.dom(this.element.querySelector('[data-test-property-value="Gender Player 1"]')).hasText('male', 'Correct gender is shown');

    assert.dom(
      this.element.querySelector('[data-test-property-name="Eye Colour Player 1"]')
    ).hasText('Eye Colour', 'Correct table heading is shown');
    assert.dom(
      this.element.querySelector('[data-test-property-value="Eye Colour Player 1"]')
    ).hasText('blue', 'Correct eye colour is shown')

    assert.dom(this.element.querySelector('[data-test-property-name="Mass Player 1"]')).hasText('Mass', 'Correct table heading is shown');
    assert.dom(this.element.querySelector('[data-test-property-value="Mass Player 1"]')).hasText('60', 'Correct mass is shown')

    assert.dom(this.element.querySelector('[data-test-property-name="Height Player 1"]')).hasText('Height', 'Correct table heading is shown');
    assert.dom(this.element.querySelector('[data-test-property-value="Height Player 1"]')).hasText('170', 'Correct height is shown');

    assert.dom(
      this.element.querySelector('[data-test-property-name="Birth Year Player 1"]')
    ).hasText('Birth Year', 'Correct table heading is shown');
    assert.dom(
      this.element.querySelector('[data-test-property-value="Birth Year Player 1"]')
    ).hasText('BBY40', 'Correct birth year is shown');

    assert.dom(
      this.element.querySelector('.row .col-sm-8:nth-child(1) h2 span:nth-child(1)')
    ).hasText('Player :', 'Player heading shown');
    assert.dom(
      this.element.querySelector('.row .col-sm-8:nth-child(1) h2 span:nth-child(2)')
    ).hasText('0', 'Correct score shown');

    assert.dom(
      this.element.querySelector('.row .col-sm-8:nth-child(2) h2 span:nth-child(1)')
    ).hasText('Computer :', 'Computer heading shown');
    assert.dom(
      this.element.querySelector('.row .col-sm-8:nth-child(2) h2 span:nth-child(2)')
    ).hasText('1', 'Correct score shown');

    assert.dom(this.element.querySelector('p')).hasText('Computer Wins!', 'Correct winner shown');
  });
});
