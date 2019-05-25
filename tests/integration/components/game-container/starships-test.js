import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

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

  const starshipsModel = ArrayProxy.create({
    content: A(starships)
  });

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
      assert.ok(true, 'No a11y errors found!');
    });
  });

  test('it displays the correct winner', async function(assert) {
    this.set('collection', starshipsModel);

    await render(hbs`
      <GameContainer
        @game="starships"
        @selectedAttr="crew"
        @model={{collection}}
        @keepModelOrder=true
      />
    `);
    assert.equal(this.element.querySelector('.row .col:nth-child(1) h2 span:nth-child(1)').textContent.trim(), 'Player :', 'Player heading shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) h2 span:nth-child(2)').textContent.trim(), '1', 'Correct score shown');

    assert.equal(this.element.querySelector('.row .col:nth-child(2) h2 span:nth-child(1)').textContent.trim(), 'Computer :', 'Computer heading shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) h2 span:nth-child(2)').textContent.trim(), '0', 'Correct score shown');

    assert.equal(this.element.querySelector('p').textContent.trim(), 'Player Wins', 'Correct winner shown');
  });
});
