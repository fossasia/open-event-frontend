import Component from '@ember/component';
import { action, computed, getProperties } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import FormMixin from 'open-event-frontend/mixins/form';
import { protocolLessValidUrlPattern } from 'open-event-frontend/utils/validators';
import { allSettled } from 'rsvp';
import { inject as service } from '@ember/service';


@classic
export default class VideoroomForm extends Component.extend(FormMixin) {
  @service confirm;

  @tracked integrationLoading = false;
  @tracked loading = false;

  @computed('stream.rooms.[]')
  get room() {
    if (!this.stream?.rooms) {return null}
    return this.stream.rooms.toArray()[0];
  }

  @action
  setRoom(room) {
    this.stream.rooms = [room];
    this.stream.name = room.name;
  }

  getValidationRules() {
    window.$.fn.form.settings.rules.checkVideoRoomsLength = () => {
      return this.stream.rooms.length > 0;
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
    return `To join your meeting, dial one of these numbers and then enter the pin.\n\nTelephone PIN: ${pin}\n\n`
    + Object.entries(phoneNumbers).map(([country, numbers]) => `${country}: ${numbers.join(', ')}\n`).join('');
  }

  get streamIdentifier() {
    const { event } = this;
    const { id } = this.stream;
    return [event.get('identifier'), 'stream', id ?? this.randomIdentifier].filter(Boolean).join('-');
  }

  @action
  async addJitsi(channel) {
    const identifier = this.streamIdentifier;

    this.stream.set('url', channel.get('url') + '/eventyay/' + identifier);

    this.integrationLoading = true;

    const api = channel.get('apiUrl');
    try {
      const [phoneNumbers, pin] = (await allSettled([
        this.loader.load(`${api}/phoneNumberList?conference=${identifier}@conference.eventyay.meet.jit.si`, { isExternal: true }),
        this.loader.load(`${api}/conferenceMapper?conference=${identifier}@conference.eventyay.meet.jit.si`, { isExternal: true })
      ])).map(promise => promise.value);

      this.stream.additionalInformation = this.generateMeetingInformation(phoneNumbers.numbers, pin.id);
    } catch (e) {
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
    }

    this.integrationLoading = false;
  }

  addBigBlueButton(channel) {
    this.stream.set('url', channel.get('url') + '/b/' + this.streamIdentifier);
  }

  @action
  async addIntegration(channel) {
    switch (channel.get('provider')) {
      case 'jitsi':
        await this.addJitsi(channel);
        break;
      case 'bbb':
        this.addBigBlueButton(channel);
        break;
    }
  }

  @action
  async setChannel(channel) {
    const { url, additionalInformation } = getProperties(this.stream, ['url', 'additionalInformation']);
    if (url || additionalInformation) {
      try {
        await this.confirm.prompt(this.l10n.t('Selecting another video integration will reset the data in the form. Do you want to proceed?'));
      } catch {
        return;
      }
    }

    this.stream.set('videoChannel', channel);
    this.stream.set('url', null);
    this.stream.set('additionalInformation', null);

    if (channel) {await this.addIntegration(channel)}
  }

  @action
  submit(event) {
    event.preventDefault();
    this.onValid(async() => {
      try {
        this.loading = true;
        await this.stream.save();
        this.notify.success(this.l10n.t('Your stream has been saved'),
          {
            id: 'stream_save'
          });
        this.router.transitionTo('events.view.videoroom', this.event.id);
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
