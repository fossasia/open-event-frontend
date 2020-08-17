import Route from '@ember/routing/route';
import { patchFullCalendar } from 'open-event-frontend/utils/patches/fullcalendar';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Scheduler');
  },
  actions: {
    refresh() {
      this.refresh();
    }
  },
  async model() {
    patchFullCalendar();
    const filterOptions = [
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
    ];

    const eventDetails = this.modelFor('events.view');
    const { timezone } = eventDetails;

    const sessions = await eventDetails.query('sessions', {
      include      : 'speakers,microlocation,track',
      filter       : filterOptions,
      'page[size]' : 0
    });
    const scheduled = sessions.toArray().filter(session => session.startsAt && session.endsAt);
    const unscheduled = sessions.toArray().filter(session => !session.startsAt || !session.endsAt);

    sessions.forEach(session => {
      session.speakers.forEach(() => {
        // Nothing to see here, just avoiding a stupid ember bug
        // https://github.com/emberjs/ember.js/issues/18613#issuecomment-674454524
      });
    });

    const microlocations = await eventDetails.query('microlocations', {});

    /*
    The start hour of the start day is considered the start hour for remaining days as well.
    The end hour of the last day is considered the end hour for remaining days as well.
    */

    return {
      event           : eventDetails,
      sessions,
      scheduled,
      unscheduled,
      microlocations,
      timezone,
      defaultDuration : '01:00'
    };
  }
});
