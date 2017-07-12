import { moduleFor, test } from 'ember-qunit';

export default function(what, name, needs = [], testCase = null) {
  const defaultNeeds = ['service:metrics', 'ember-metrics@metrics-adapter:google-analytics', 'service:session', 'service:notify', 'service:router-scroll'];
  moduleFor(what, name, {
    needs: defaultNeeds.concat(needs)
  });

  if (testCase) {
    test('it exists', testCase);
  }
}
