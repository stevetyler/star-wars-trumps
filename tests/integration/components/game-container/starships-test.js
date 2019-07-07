import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { A } from '@ember/array';

module('Integration | Component | Game Container | Starships', function(hooks) {
  setupRenderingTest(hooks);

  const starships = [
    EmberObject.create({
      name: 'Millenium Falcon',
      properties: {
        Name: 'Millenium Falcon',
        Crew: '5',
        Length: '300',
        Passengers: '2',
        'Hyperdrive Rating': '3',
        'Cost in Credits': '10000',
        'Cargo Capacity': '2000'
      }
    }),
    EmberObject.create({
      name: 'X Wing Fighter',
      properties: {
        Name: 'X Wing Fighter',
        Crew: '1',
        Length: '100',
        Passengers: '1',
        'Hyperdrive Rating': '1',
        'Cost in Credits': '2000',
        'Cargo Capacity': '10'
      }
    })
  ];

  const starshipsModel = A(starships);

  test('it displays card correctly for player', async function(assert) {
    this.set('model', starshipsModel);

    await render(hbs`
      <GameContainer
        @selectedProperty="Crew"
        @model={{model}}
      />
    `);

    assert.expect(14);
    assert.equal(
      this.element.querySelector('[data-test-card-name="0"]').textContent.trim(),
      'Millenium Falcon',
      'Correct name is shown');

    assert.equal(this.element.querySelector('[data-test-property-name="Crew Player 0"]').textContent.trim(), 'Crew', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Crew Player 0"]').textContent.trim(), '5', 'Correct crew is shown');

    assert.equal(this.element.querySelector('[data-test-property-name="Length Player 0"]').textContent.trim(), 'Length', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Length Player 0"]').textContent.trim(), '300', 'Correct length is shown')

    assert.equal(this.element.querySelector('[data-test-property-name="Hyperdrive Rating Player 0"]').textContent.trim(), 'Hyperdrive Rating', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Hyperdrive Rating Player 0"]').textContent.trim(), '3', 'Correct hyperdrive rating is shown');

    assert.equal(this.element.querySelector('[data-test-property-name="Passengers Player 0"]').textContent.trim(), 'Passengers', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Passengers Player 0"]').textContent.trim(), '2', 'Correct passengers is shown')

    assert.equal(this.element.querySelector('[data-test-property-name="Cost in Credits Player 0"]').textContent.trim(), 'Cost in Credits', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Cost in Credits Player 0"]').textContent.trim(), '10000', 'Correct cost is shown');

    assert.equal(this.element.querySelector('[data-test-property-name="Cargo Capacity Player 0"]').textContent.trim(), 'Cargo Capacity', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Cargo Capacity Player 0"]').textContent.trim(), '2000', 'Correct capacity is shown');

    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'No a11y errors found!');
    });
  });

  test('it displays the computer card and correct winner', async function(assert) {
    this.set('model', starshipsModel);

    await render(hbs`
      <GameContainer
        @selectedProperty="Crew"
        @model={{model}}
      />
    `);

    await click('.btn');

    assert.async();
    assert.equal(this.element.querySelector('[data-test-card-name="1"]').textContent.trim(), 'X Wing Fighter', 'Correct name is shown');

    assert.equal(this.element.querySelector('[data-test-property-name="Crew Player 1"]').textContent.trim(), 'Crew', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Crew Player 1"]').textContent.trim(), '1', 'Correct crew is shown');

    assert.equal(this.element.querySelector('[data-test-property-name="Length Player 1"]').textContent.trim(), 'Length', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Length Player 1"]').textContent.trim(), '100', 'Correct length is shown')

    assert.equal(this.element.querySelector('[data-test-property-name="Hyperdrive Rating Player 1"]').textContent.trim(), 'Hyperdrive Rating', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Hyperdrive Rating Player 1"]').textContent.trim(), '1', 'Correct hyperdrive rating is shown');

    assert.equal(this.element.querySelector('[data-test-property-name="Passengers Player 1"]').textContent.trim(), 'Passengers', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Passengers Player 1"]').textContent.trim(), '1', 'Correct passengers is shown')

    assert.equal(this.element.querySelector('[data-test-property-name="Cost in Credits Player 1"]').textContent.trim(), 'Cost in Credits', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Cost in Credits Player 1"]').textContent.trim(), '2000', 'Correct cost is shown');

    assert.equal(this.element.querySelector('[data-test-property-name="Cargo Capacity Player 1"]').textContent.trim(), 'Cargo Capacity', 'Correct table heading is shown');
    assert.equal(this.element.querySelector('[data-test-property-value="Cargo Capacity Player 1"]').textContent.trim(), '10', 'Correct capacity is shown');

    assert.equal(this.element.querySelector('.row .col-sm-10:nth-child(1) h2 span:nth-child(1)').textContent.trim(), 'Player :', 'Player heading shown');
    assert.equal(this.element.querySelector('.row .col-sm-10:nth-child(1) h2 span:nth-child(2)').textContent.trim(), '1', 'Correct score shown');

    assert.equal(this.element.querySelector('.row .col-sm-10:nth-child(2) h2 span:nth-child(1)').textContent.trim(), 'Computer :', 'Computer heading shown');
    assert.equal(this.element.querySelector('.row .col-sm-10:nth-child(2) h2 span:nth-child(2)').textContent.trim(), '0', 'Correct score shown');

    assert.equal(this.element.querySelector('p').textContent.trim(), 'You Win!', 'Correct winner shown');
  });
});
