import Component from '@glimmer/component';
import moment, { Moment } from 'moment';
import Event from 'open-event-frontend/models/event';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { hasSessions } from 'open-event-frontend/utils/event';
import AuthManagerService from 'open-event-frontend/services/auth-manager';


interface Args {
  event: Event,
  location: string
}

export default class AddToCalender extends Component<Args> {

  @service loader: any;

  @service
  authManager!: AuthManagerService;

  @tracked showSessions : any;

  @tracked isAddToCalendarModalOpen = false;

  @tracked modalUrls : { name: string; url: string; }[] = [];

  get description(): string {
    const { event } = this.args;
    let desc = `Join the event at <a href = "${event.url}">${event.url}</a> \n `;
    if (event.description) {
      desc = desc + `<section>
                        <h3>Event Description </h3>\n
                        ${event.description}\n
                    </section>`;
    }
    if (event.ownerDescription) {
      desc = desc +  `<section>
                          <h3>Organizer Message</h3>\n
                           ${event.ownerDescription}\n
                      </section>`;
    }
    return desc;
  }

  constructor(owner: null, args: Args) {
    super(owner, args);
    this.checkSessions();
  }

  openAddToCalendarModal(calendarUrls: { name: string; url: string; }[]): void {
    this.isAddToCalendarModalOpen = true;
    this.modalUrls = calendarUrls;
  }

  async checkSessions(): Promise<void> {
    const { event } = this.args;
    this.showSessions = this.showSessions ?? await hasSessions(this.loader, event);
  }

  get startsAt(): Moment {
    const { event } = this.args;
    return moment(event.startsAt).tz(event.timezone);
  }

  get endsAt(): Moment {
    const { event } = this.args;
    return moment(event.endsAt).tz(event.timezone);
  }

  get calendarLocation(): string {
    return this.args.event.online ? this.args.event.url : this.args.location;
  }

  get googleUrl(): string {
    const { event } = this.args;
    const startTime = this.startsAt.utc().format('YYYYMMDD[T]HHmmSS[Z]');
    const endTime = this.endsAt.utc().format('YYYYMMDD[T]HHmmSS[Z]');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startTime}/${endTime}&text=${event.name}&location=${this.calendarLocation}&ctz=${event.timezone}&details=${this.description}`;
  }

  get yahooUrl(): string {
    const { event } = this.args;
    const startTime = this.startsAt.format('YYYYMMDD[T]HHmmSS');
    const endTime = this.endsAt.format('YYYYMMDD[T]HHmmSS');
    return `https://calendar.yahoo.com/?v=60&title=${event.name}&st=${startTime}&et=${endTime}&desc=${this.description}&in_loc=${this.calendarLocation}`;
  }

  get outlookUrl(): string {
    const { event } = this.args;
    const startTime = this.startsAt.utc().format('YYYY[-]MM[-]DDTHH[:]mm[:]SS[Z]');
    const endTime = this.endsAt.utc().format('YYYY[-]MM[-]DDTHH[:]mm[:]SS[Z]');
    return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${event.name}&startdt=${startTime}&enddt=${endTime}&body=${(this.description).substring(0, 1000)}&location=${this.calendarLocation}`;
  }

  get iCalUrl(): string {
    const host = this.loader.host();
    return host + '/v1/events/' + this.args.event.identifier + '.ics?download';
  }

  get calendarUrls(): { name: string; url: string; }[] {
    return [{ name: 'Google Calendar', url: this.googleUrl }, { name: 'iCal', url: this.iCalUrl }, { name: 'Yahoo', url: this.yahooUrl }, { name: 'Outlook', url: this.outlookUrl }];
  }

  get sessionGoogleUrl(): string {
    const { event } = this.args;
    return 'https://calendar.google.com/calendar/render?cid=webcal://api.eventyay.com/v1/events/' + event.identifier + '.ics?include_sessions';
  }

  get mySessionGoogleUrl(): string {
    const { event } = this.args;
    return 'https://calendar.google.com/calendar/render?cid=webcal://api.eventyay.com/v1/events/' + event.identifier + encodeURIComponent('.ics?include_sessions&my_schedule&user_id=') + this.authManager.currentUser.id;
  }

  get mySessioniCalUrl(): string {
    const host = this.loader.host();
    return host + '/v1/events/' + this.args.event.identifier + '.ics?include_sessions&my_schedule&user_id=' + this.authManager.currentUser.id;
  }

  get sessioniCalUrl(): string {
    const host = this.loader.host();
    return host + '/v1/events/' + this.args.event.identifier + '.ics?include_sessions';
  }

  get sessionCalendarUrls(): { name: string; url: string; }[] {
    return [{ name: 'Google Calendar', url: this.sessionGoogleUrl }, { name: 'iCal', url: this.sessioniCalUrl }];
  }

  get mySessionCalendarUrls(): { name: string; url: string; }[] {
    return [{ name: 'Google Calendar', url: this.mySessionGoogleUrl }, { name: 'iCal', url: this.mySessioniCalUrl }];
  }
}
