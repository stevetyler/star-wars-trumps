import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | starship', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:starship');
    assert.ok(route);
  });
});
