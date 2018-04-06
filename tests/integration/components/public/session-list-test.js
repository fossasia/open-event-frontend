import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | public/session list', function(hooks) {
  setupRenderingTest(hooks);

  const sessions = { 'Track 1': [{ session_type: { length: '11:00', id: 12, name: 'Talk' }, shortAbstract: 'An introduction to the event', id: '1', title: 'Welcome to FOSSASIA', startAt: '10:35 AM / 17-03-2017', track: { color: 'green', fontColor: 'green', id: 1, name: 'Track 1' }, microlocation: { id: 0, name: 'Room 1' }, speakers: [{ shortBiography: 'Works for ORG 1', id: 0, city: 'Delhi', name: 'Arnold Singh', speakingExperience: 'GSOC 2015', organisation: 'ORG 1', longBiography: '', photo: { 'iconImageUrl': '' } }] }] };

  test('it renders', function(assert) {
    this.set('sessions', sessions);
    this.render(hbs `{{public/session-list sessions=sessions}}`);
    assert.ok(find('*').innerHTML.trim().includes('Track'));
  });
});
