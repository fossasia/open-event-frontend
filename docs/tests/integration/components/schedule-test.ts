import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Object from '@ember/object';
import moment from 'moment-timezone';
import { patchFullCalendar } from 'open-event-frontend/utils/patches/fullcalendar';
import 'qunit-dom';

module('Integration | Component | schedule', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    patchFullCalendar();
    this.set('sessions', [Object.create({
      startsAt      : moment(),
      endsAt        : moment(),
      title         : 'Test Session',
      speakers      : [{ name: 'Areeb Jamal' }],
      microlocation : Object.create({ id: 123 }),
      track         : Object.create({ color: '#334422' })
    })]);
    this.set('rooms', [{ id: 123, name: 'Main Hall' }, { id: 234, name: 'Conference Room' }]);
    this.set('event', Object.create({ timezone: 'Asia/Kolkata', startsAt: moment(), endsAt: moment() }));
    await render(hbs`{{schedule event=event sessions=sessions rooms=rooms}}`);

    assert.dom(this.element).includesText('Test Session | Areeb Jamal');
    assert.dom(this.element).includesText('Main Hall');
    assert.dom(this.element).includesText('Conference Room');
  });
});
