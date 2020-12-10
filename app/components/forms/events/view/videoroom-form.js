import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import FormMixin from 'open-event-frontend/mixins/form';
import { protocolLessValidUrlPattern } from 'open-event-frontend/utils/validators';
import { allSettled } from 'rsvp';


@classic
export default class VideoroomForm extends Component.extend(FormMixin) {
  @tracked integrationLoading = false;
  @tracked loading = false;

  @computed('data.stream.rooms.[]')
  get room() {
    return this.data.stream.rooms.toArray()[0];
  }

  @action
  setRoom(room) {
    this.data.stream.rooms = [room];
    this.data.stream.name = room.name;
  }

  getValidationRules() {
    window.$.fn.form.settings.rules.checkVideoRoomsLength = () => {
      return this.data.stream.rooms.length > 0;
    };
    const validationRules = {
      inline : true,
      delay  : false,
      on     : 'blur',

      fields: {
        name: {
          rules: [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a name')
            }
          ]
        },
        url: {
          rules: [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a url')
            },
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        rooms: {
          rules: [
            {
              type   : 'checkVideoRoomsLength',
              prompt : this.l10n.t('Please select a room')
            }
          ]
        }
      }
    };

    return validationRules;
  }

  get randomIdentifier() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '');
  }

  generateMeetingInformation(phoneNumbers, pin) {
    return `To join your meeting, dial one of these numbers and then enter the pin.\n\nPIN: ${pin}\n\n`
    + Object.entries(phoneNumbers).map(([country, numbers]) => `${country}: ${numbers.join(', ')}\n`).join('');
  }

  @action
  async addJitsi(channel) {
    const { event } = this.data;
    const { id, name } = this.data.stream;
    const identifier = [event.identifier, 'stream', name?.replace(/[^a-z0-9\.]/gi, '')?.toLowerCase(), id ?? this.randomIdentifier].filter(Boolean).join('-');

    this.data.stream.set('url', channel.get('url') + '/eventyay/' + identifier);

    this.integrationLoading = true;

    const api = channel.get('apiUrl');
    try {
      const [phoneNumbers, pin] = (await allSettled([
        this.loader.load(`${api}/phoneNumberList?conference=${identifier}@conference.eventyay.meet.jit.si`, { isExternal: true }),
        this.loader.load(`${api}/conferenceMapper?conference=${identifier}@conference.eventyay.meet.jit.si`, { isExternal: true })
      ])).map(promise => promise.value);

      this.data.stream.additionalInformation = this.generateMeetingInformation(phoneNumbers.numbers, pin.id);
    } catch (e) {
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
    }

    this.integrationLoading = false;
  }

  @action
  async addIntegration(channel) {
    switch (channel.get('provider')) {
      case 'jitsi':
        await this.addJitsi(channel);
        break;
    }
  }

  @action
  submit(event) {
    event.preventDefault();
    this.onValid(async() => {
      try {
        this.loading = true;
        await this.data.stream.save();
        this.notify.success(this.l10n.t('Your stream has been saved'),
          {
            id: 'stream_save'
          });
        this.router.transitionTo('events.view.videoroom', this.data.event.id);
      } catch (e) {
        console.error('Error while saving session', e);
        const message = e.errors?.[0]?.detail ?? this.l10n.t('Oops something went wrong. Please try again');
        this.notify.error(message,
          {
            id: 'stream_save_error'
          });
      } finally {
        this.loading = false;
      }
    });
  }
}
