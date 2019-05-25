import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

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

  const peopleModel = ArrayProxy.create({
    content: A(people)
  });

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
    assert.equal(this.element.querySelector('.row .col:nth-child(1) h3').textContent.trim(), 'Obi Wan', 'Correct name is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(1)').textContent.trim(), 'Mass : 80', 'Correct mass is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(2)').textContent.trim(), 'Gender : male', 'Correct gender is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(3)').textContent.trim(), 'Height : 160', 'Correct height is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(4)').textContent.trim(), 'Eye Colour : blue', 'Correct eye colour is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) li:nth-child(5)').textContent.trim(), 'Birth Year : BBY60', 'Correct bith year is shown');

    assert.equal(this.element.querySelector('.row .col:nth-child(2) h3').textContent.trim(), 'Luke Skywalker', 'Correct name is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(1)').textContent.trim(), 'Mass : 60', 'Correct mass is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(2)').textContent.trim(), 'Gender : male', 'Correct gender is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(3)').textContent.trim(), 'Height : 170', 'Correct height is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(4)').textContent.trim(), 'Eye Colour : blue', 'Correct eye colour is shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) li:nth-child(5)').textContent.trim(), 'Birth Year : BBY40', 'Correct birth year is shown');

    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'No a11y errors found!');
    });
  });

  test('it displays the correct winner', async function(assert) {
    this.set('collection', peopleModel);

    await render(hbs`
      <GameContainer
        @game="people"
        @selectedAttr="height"
        @model={{collection}}
        @keepModelOrder=true
      />
    `);
    assert.equal(this.element.querySelector('.row .col:nth-child(1) h2 span:nth-child(1)').textContent.trim(), 'Player :', 'Player heading shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(1) h2 span:nth-child(2)').textContent.trim(), '0', 'Correct score shown');

    assert.equal(this.element.querySelector('.row .col:nth-child(2) h2 span:nth-child(1)').textContent.trim(), 'Computer :', 'Computer heading shown');
    assert.equal(this.element.querySelector('.row .col:nth-child(2) h2 span:nth-child(2)').textContent.trim(), '1', 'Correct score shown');

    assert.equal(this.element.querySelector('p').textContent.trim(), 'Computer Wins', 'Correct winner shown');

    await click('.btn');

    assert.equal(this.element.querySelector('p').textContent.trim(), 'Computer Wins', 'Correct winner still shows');
  });
});
