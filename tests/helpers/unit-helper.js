import { moduleFor, test } from 'ember-qunit';
import fragmentTransformInitializer from 'open-event-frontend/initializers/model-fragments';
import Ember from 'ember';

const { getOwner, run } = Ember;

export default function(what, name, needs = [], testCase = null) {
  const defaultNeeds = ['service:metrics', 'ember-metrics@metrics-adapter:google-analytics', 'service:session', 'service:notify', 'service:router-scroll'];
  moduleFor(what, name, {
    needs: defaultNeeds.concat(needs),
    beforeEach() {
      run(() => fragmentTransformInitializer.initialize(getOwner(this)));
    },
    afterEach() {
    }
  });

  if (testCase) {
    test('it exists', testCase);
  }
}
