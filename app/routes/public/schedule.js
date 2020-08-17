import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { patchFullCalendar } from 'open-event-frontend/utils/patches/fullcalendar';

@classic
export default class ScheduleRoute extends Route {
  titleToken() {
    return this.l10n.t('Schedule');
  }

  async model() {
    patchFullCalendar();
    const event = this.modelFor('public');

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
      include : 'speakers,microlocation,track',
      filter  : scheduledFilterOptions
    });

    sessions.forEach(session => {
      session.speakers.forEach(() => {
        // Nothing to see here, just avoiding a stupid ember bug
        // https://github.com/emberjs/ember.js/issues/18613#issuecomment-674454524
      });
    });

    const microlocations = await event.query('microlocations', {});

    /*
    The start hour of the start day is considered the start hour for remaining days as well.
    The end hour of the last day is considered the end hour for remaining days as well.
    */

    return {
      sessions,
      microlocations,
      event
    };

  }
}
