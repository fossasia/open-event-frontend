import Component from '@glimmer/component';

export default class Schedule extends Component {
  header = {
    left   : 'today,prev,next',
    center : 'title',
    right  : 'timelineDay,agendaDay,timelineThreeDays,agendaWeek'
  }

  get validRange() {
    const { event } = this.args;
    return {
      start : event.startsAt.format('YYYY-MM-DD'),
      end   : event.endsAt.clone().add(1, 'day').format('YYYY-MM-DD')
    };
  }

  get views() {
    const { event } = this.args;
    const durationDays = event.endsAt.diff(event.startsAt, 'days') + 1;
    return {
      timelineThreeDays: {
        type       : 'agenda',
        duration   : { days: durationDays },
        buttonText : `${durationDays} day`
      }
    };
  }

  get timezone() {
    return this.args.event.timezone;
  }

  get minTime() {
    return this.args.event.startsAt.tz(this.timezone).format('HH:mm:ss');
  }

  get resources() {
    return this.args.rooms.map(room => ({ id: room.id, title: room.name }));
  }

  get events() {
    return this.args.sessions.map(session => {
      const speakerNames = session.speakers.map(speaker => speaker.name).join(', ');
      return {
        title      : `${session.title} | ${speakerNames}`,
        start      : session.startsAt.tz(this.timezone).format(),
        end        : session.endsAt.tz(this.timezone).format(),
        resourceId : session.microlocation.get('id'),
        color      : session.track.get('color'),
        serverId   : session.get('id') // id of the session on BE
      };
    });
  }
}
