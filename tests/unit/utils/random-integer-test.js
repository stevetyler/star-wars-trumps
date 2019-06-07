import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import {getRandomInt} from 'star-wars-trumps/utils/helpers';

module('Unit | Utils | Random Integer', function(hooks) {
  setupTest(hooks);

  test('it returns a random number greater than or equal to the minimum argument', function(assert) {
    for (let i = 0; i < 20; i++) {
      assert.ok(getRandomInt(1,10) >= 1, 'value is greater than or equal to minimum');
    }
  });

  test('it returns a random number less than or equal to the maximum argument', function(assert) {
    for (let i = 0; i < 20; i++) {
      assert.ok(getRandomInt(1,10) <= 10, 'value is less than or equal to maximum');
    }
  });
});
