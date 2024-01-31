import { sortCustomFormFields } from 'open-event-frontend/utils/sort';
import { module, test } from 'qunit';

module('Unit | Sort | Custom Form Fields', function() {
  test('test custom form fields sort', function(assert) {
    const items = [{ fieldIdentifier: 'age', isComplex: false }, { fieldIdentifier: 'job', isComplex: false }, { fieldIdentifier: 'majama', isComplex: true }, { fieldIdentifier: 'name', isComplex: false }, { fieldIdentifier: 'hay', isComplex: true }, { fieldIdentifier: 'trust', isComplex: false }, { fieldIdentifier: 'company', isComplex: false }];
    const order = ['name', 'age', 'company'];
    assert.equal(JSON.stringify(sortCustomFormFields(items, order)), JSON.stringify([{ fieldIdentifier: 'name', isComplex: false }, { fieldIdentifier: 'age', isComplex: false }, { fieldIdentifier: 'company', isComplex: false }, { fieldIdentifier: 'job', isComplex: false }, { fieldIdentifier: 'trust', isComplex: false }, { fieldIdentifier: 'majama', isComplex: true }, { fieldIdentifier: 'hay', isComplex: true }]));
  });
});
