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

  const starshipsModel = A(starships);

  test('it displays card correctly for player', async function(assert) {
    const columnLeft = '.row .col:nth-child(1) tbody tr:nth-child';

    this.set('model', starshipsModel);
    this.set('leftPlayerScore', 0);
    this.set('rightPlayerScore', 0);

    await render(hbs`
      <GameContainer
        @game="starships"
        @selectedAttr="crew"
        @model={{model}}
        @leftPlayerScore={{leftPlayerScore}}
        @rightPlayerScore={{rightPlayerScore}}
      />
    `);

    assert.expect(15);
    assert.equal(
      this.element.querySelector('.row .col:nth-child(1) h3').textContent.trim(),
      'Millenium Falcon',
      'Correct name is shown');

    assert.equal(this.element.querySelector('.row .col:nth-child(1) h3').textContent.trim(), 'Millenium Falcon', 'Correct name is shown');

    assert.equal(this.element.querySelector(`${columnLeft}(1) th`).textContent.trim(), 'Crew', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnLeft}(1) td`).textContent.trim(), '5', 'Correct crew is shown');

    assert.equal(this.element.querySelector(`${columnLeft}(2) th`).textContent.trim(), 'Length', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnLeft}(2) td`).textContent.trim(), '300', 'Correct length is shown')

    assert.equal(this.element.querySelector(`${columnLeft}(3) th`).textContent.trim(), 'Hyperdrive Rating', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnLeft}(3) td`).textContent.trim(), '3', 'Correct hyperdrive rating is shown');

    assert.equal(this.element.querySelector(`${columnLeft}(4) th`).textContent.trim(), 'Passengers', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnLeft}(4) td`).textContent.trim(), '2', 'Correct passengers is shown')

    assert.equal(this.element.querySelector(`${columnLeft}(5) th`).textContent.trim(), 'Cost in Credits', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnLeft}(5) td`).textContent.trim(), '10000', 'Correct cost is shown');

    assert.equal(this.element.querySelector(`${columnLeft}(6) th`).textContent.trim(), 'Cargo Capacity', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnLeft}(6) td`).textContent.trim(), '2000', 'Correct capacity is shown');

    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'No a11y errors found!');
    });
  });

  test('it displays the computer card and correct winner', async function(assert) {
    const columnRight = '.row .col:nth-child(2) tbody tr:nth-child';

    this.set('model', starshipsModel);
    this.set('leftPlayerScore', 0);
    this.set('rightPlayerScore', 0);

    await render(hbs`
      <GameContainer
        @game="starships"
        @selectedAttr="crew"
        @model={{model}}
        @leftPlayerScore={{leftPlayerScore}}
        @rightPlayerScore={{rightPlayerScore}}
      />
    `);

    await click('.btn');

    assert.equal(this.element.querySelector('.row .col:nth-child(2) h3').textContent.trim(), 'X Wing Fighter', 'Correct name is shown');

    assert.equal(this.element.querySelector(`${columnRight}(1) th`).textContent.trim(), 'Crew', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnRight}(1) td`).textContent.trim(), '1', 'Correct crew is shown');

    assert.equal(this.element.querySelector(`${columnRight}(2) th`).textContent.trim(), 'Length', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnRight}(2) td`).textContent.trim(), '100', 'Correct length is shown')

    assert.equal(this.element.querySelector(`${columnRight}(3) th`).textContent.trim(), 'Hyperdrive Rating', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnRight}(3) td`).textContent.trim(), '1', 'Correct hyperdrive rating is shown');

    assert.equal(this.element.querySelector(`${columnRight}(4) th`).textContent.trim(), 'Passengers', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnRight}(4) td`).textContent.trim(), '1', 'Correct passengers is shown')

    assert.equal(this.element.querySelector(`${columnRight}(5) th`).textContent.trim(), 'Cost in Credits', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnRight}(5) td`).textContent.trim(), '2000', 'Correct cost is shown');

    assert.equal(this.element.querySelector(`${columnRight}(6) th`).textContent.trim(), 'Cargo Capacity', 'Correct table heading is shown');
    assert.equal(this.element.querySelector(`${columnRight}(6) td`).textContent.trim(), '10', 'Correct capacity is shown');

    assert.equal(this.element.querySelector('.row .col:nth-child(1) h2 span:nth-child(1)').textContent.trim(), 'Player :', 'Player heading shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) h2 span:nth-child(2)').textContent.trim(), '1', 'Correct score shown');

    assert.equal(this.element.querySelector('.row .col:nth-child(2) h2 span:nth-child(1)').textContent.trim(), 'Computer :', 'Computer heading shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) h2 span:nth-child(2)').textContent.trim(), '0', 'Correct score shown');

    assert.equal(this.element.querySelector('p').textContent.trim(), 'Player Wins!', 'Correct winner shown');
  });
});
