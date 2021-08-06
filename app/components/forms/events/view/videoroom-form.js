import Component from '@ember/component';
import { action, computed, getProperties } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import FormMixin from 'open-event-frontend/mixins/form';
import { protocolLessValidUrlPattern } from 'open-event-frontend/utils/validators';
import { all, allSettled } from 'rsvp';
import { inject as service } from '@ember/service';
import _ from 'lodash-es';

const bbb_options = { 'record': false, 'autoStartRecording': false, 'muteOnStart': true, 'endCurrentMeeting': false };

@classic
export default class VideoroomForm extends Component.extend(FormMixin) {
  @service confirm;

  @tracked integrationLoading = false;
  @tracked loading = false;
  @tracked moderatorEmail = '';
  @tracked deletedModerators = [];
  @tracked videoRecordings = [];
  @tracked actualBBBExtra = null;
  @tracked selectedVideo = '';
  @tracked previousVideo = '';
  @tracked showUpdateOptions = false;
  @tracked endCurrentMeeting = false;

  get recordingColumns() {
    return [
      {
        name      : this.l10n.t('Number of Participants'),
        valuePath : 'participants'
      },
      {
        name          : this.l10n.t('Start time'),
        valuePath     : 'startTime',
        cellComponent : 'ui-table/cell/cell-date',
        options       : {
          timezone   : 'UTC',
          dateFormat : 'dddd, D MMMM, YYYY h:mm A'
        }
      },
      {
        name          : this.l10n.t('End time'),
        valuePath     : 'endTime',
        cellComponent : 'ui-table/cell/cell-date',
        options       : {
          timezone   : 'UTC',
          dateFormat : 'dddd, D MMMM, YYYY h:mm A'
        }
      },
      {
        name            : this.l10n.t('Duration'),
        valuePath       : 'endTime',
        extraValuePaths : ['startTime'],
        cellComponent   : 'ui-table/cell/cell-duration'
      },
      {
        name          : this.l10n.t('View'),
        valuePath     : 'url',
        cellComponent : 'ui-table/cell/events/view/videoroom/cell-video-recording'
      }
    ];
  }

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
        email: {
          optional : true,
          rules    : [
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid email')
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
    const { event } = this.data;
    const { id } = this.data.stream;
    return [event.identifier, 'stream', id ?? this.randomIdentifier].filter(Boolean).join('-');
  }

  @action
  async addJitsi(channel) {
    const identifier = this.streamIdentifier;

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

  addBigBlueButton(channel) {
    this.data.stream.set('url', channel.get('url') + '/b/' + this.streamIdentifier);
    this.data.stream.set('extra', { bbb_options });
  }

  add3cx() {
    this.data.stream.set('url', '');
  }

  @action
  async addYoutube() {
    this.data.stream.set('extra', { 'autoplay': true, 'loop': false });
    this.data.stream.set('url', 'watch?v=');
  }

  @action
  async addVimeo() {
    this.data.stream.set('extra', { 'autoplay': true, 'loop': false });
    this.data.stream.set('url', '');
  }

  @action
  async addIntegration(channel) {
    switch (channel.get('provider')) {
      case 'jitsi':
        await this.addJitsi(channel);
        break;
      case '3cx':
        await this.add3cx();
        break;
      case 'bbb':
        this.addBigBlueButton(channel);
        break;
      case 'youtube':
        this.addYoutube();
        break;
      case 'vimeo':
        this.addVimeo();
        break;
    }
  }

  @action
  async setChannel(channel) {
    const { url, additionalInformation } = getProperties(this.data.stream, ['url', 'additionalInformation']);
    if (url || additionalInformation) {
      try {
        await this.confirm.prompt(this.l10n.t('Selecting another video integration will reset the data in the form. Do you want to proceed?'));
      } catch {
        this.previousVideo = this.selectedVideo;
        return;
      }
    }

    this.data.stream.set('videoChannel', channel);
    this.data.stream.set('url', null);
    this.data.stream.set('additionalInformation', null);

    if (channel) {await this.addIntegration(channel)}
  }

  @action
  async toggleRecord() {
    this.data.stream.extra.bbb_options.record = !this.data.stream.extra.bbb_options.record;
    if (!(_.isEqual(this.actualBBBExtra, this.data.stream.extra?.bbb_options))) {
      this.set('showUpdateOptions', true);
    } else {
      this.set('showUpdateOptions', false);
    }
  }

  @action
  async toggleMuteOnStart() {
    this.data.stream.extra.bbb_options.muteOnStart = !this.data.stream.extra.bbb_options.muteOnStart;
    if (!(_.isEqual(this.actualBBBExtra, this.data.stream.extra?.bbb_options))) {
      this.set('showUpdateOptions', true);
    } else {
      this.set('showUpdateOptions', false);
    }
  }

  @action
  async toggleAutoStartRecording() {
    this.data.stream.extra.bbb_options.autoStartRecording = !this.data.stream.extra.bbb_options.autoStartRecording;
    if (!(_.isEqual(this.actualBBBExtra, this.data.stream.extra?.bbb_options))) {
      this.set('showUpdateOptions', true);
    } else {
      this.set('showUpdateOptions', false);
    }
  }

  @action
  async submit(event) {
    event.preventDefault();
    this.onValid(async() => {
      try {
        this.set('isLoading', true);
        this.data.stream.extra.bbb_options.endCurrentMeeting = this.showUpdateOptions ? this.endCurrentMeeting :  false;
        await this.data.stream.save();
        const saveModerators = this.data.stream.moderators.toArray().map(moderator => {
          if (moderator.id) {
            return moderator;
          }
          return moderator.save();
        });
        const deleteModerators = this.deletedModerators.map(moderator => {
          return moderator.destroyRecord();
        });
        await all([...saveModerators, ...deleteModerators]);
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
        this.set('isLoading', false);
      }
    });
  }

  @action
  addModerator() {
    if (this.moderatorEmail === '') {
      return;
    }
    this.onValid(() => {
      const existingEmails = this.data.stream.moderators.map(moderator => moderator.email);
      if (!existingEmails.includes(this.moderatorEmail)) {
        const existingModerator = this.deletedModerators.filter(moderator => moderator.email === this.moderatorEmail);
        if (existingModerator.length === 0) {
          const newModerator = this.store.createRecord('video-stream-moderator', {
            email       : this.moderatorEmail,
            videoStream : this.data.stream
          });
          this.data.stream.moderators.pushObject(newModerator);
        } else {
          const moderator = this.store.peekRecord('video-stream-moderator', existingModerator[0].id);
          this.data.stream.moderators.pushObject(moderator);
        }
      }
      this.deletedModerators = this.deletedModerators.filter(moderator => moderator.email !== this.moderatorEmail);
      this.moderatorEmail = '';
    });
  }

  @action
  deleteModerator(moderator) {
    this.data.stream.moderators.removeObject(moderator);
    if (moderator.id) {
      this.deletedModerators.push(moderator);
    }
  }

  async loadRecordings() {
    try {
      const recordings = await this.data.stream.query('videoRecordings', {
        'page[size]': 0
      });
      this.videoRecordings = recordings.toArray();
    } catch (e) {
      console.error('Error while getting recordings', e);
    }
  }

  didInsertElement() {
    if (this.data.stream.videoChannel.get('provider') === 'bbb') {
      if (this.data.stream.extra?.bbb_options) {
        this.set('actualBBBExtra', { ...this.data.stream.extra.bbb_options });
      }
      this.loadRecordings();
    }
    if (this.data.stream.extra === null && ['vimeo', 'youtube'].includes(this.data.stream.videoChannel.get('provider'))) {
      this.data.stream.set('extra', { 'autoplay': true, 'loop': false });
    }
    if (!this.data.stream.extra?.bbb_options && this.data.stream.videoChannel.get('provider') === 'bbb') {
      this.data.stream.set('extra', { bbb_options });
    }
    this.selectedVideo = this.previousVideo = this.data.stream.videoChannel;
  }
}
