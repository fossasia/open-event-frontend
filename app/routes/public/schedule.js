import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { patchFullCalendar } from 'open-event-frontend/utils/patches/fullcalendar';
import { hash } from 'rsvp';

@classic
export default class ScheduleRoute extends Route {
  titleToken() {
    return this.l10n.t('Schedule');
  }

  async model() {
    patchFullCalendar();
    const event = this.modelFor('public');

    return hash({
      sessions       : this.getSessions(event),
      microlocations : event.query('microlocations', {}),
      event
    });
  }

  async getSessions(event) {
    const scheduledFilterOptions = [
      {
        and: [
          {
            name : 'starts-at',
            op   : 'ne',
            val  : null
          },
          {
            name : 'ends-at',
            op   : 'ne',
            val  : null
          },
          {
            or: [
              {
                name : 'state',
                op   : 'eq',
                val  : 'accepted'
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'confirmed'
              }
            ]
          }
        ]
      }
    ];

    const sessions = await event.query('sessions', {
      include      : 'speakers,microlocation,track,microlocation.video-stream',
      filter       : scheduledFilterOptions,
      'page[size]' : 0
    });

    sessions.forEach(session => {
      session.speakers.forEach(() => {
        // Nothing to see here, just avoiding a stupid ember bug
        // https://github.com/emberjs/ember.js/issues/18613#issuecomment-674454524
      });
    });

    return sessions;
  }
}
