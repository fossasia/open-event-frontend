import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Controller.extend(EmberTableControllerMixin) {
  @service settings;

  @action
  async toggleVideoRoom() {
    this.set('model.event.isVideoroomEnabled', !this.model.event.isVideoroomEnabled);
    try {
      await this.model.event.save();
    } catch (e) {
      console.error('Error while Enabling TheRoom', e);
    }
  }

  per_page = 25;
  count = 0;

  get columns() {
    return [
      {
        name            : this.l10n.t('Microlocation'),
        valuePath       : 'name',
        helperInfo      : 'You need to add rooms into the wizard first before they show up here.',
        extraValuePaths : ['id', 'videoStream', 'constructor'],
        cellComponent   : 'ui-table/cell/events/view/videoroom/cell-stream-title',
        width           : 70,
        actions         : {
          delete: this.delete.bind(this)
        }
      },
      {
        name       : this.l10n.t('Video Room Name'),
        valuePath  : 'videoStream.name',
        helperInfo : 'This column shows the video room name that will be visible to the users on the event page.',
        width      : 70
      },
      {
        name          : this.l10n.t('Video Source URL'),
        valuePath     : 'videoStream',
        helperInfo    : 'This column shows the original link of the video. We do not recommend to share this link as users can access it without loggin into' + this.settings.appName + '.com.',
        cellComponent : 'ui-table/cell/events/view/videoroom/cell-video-url',
        width         : 60
      },
      {
        name            : this.l10n.t('Join Video'),
        valuePath       : 'videoStream',
        helperInfo      : 'You can share the links in this columns with attendees of an event. On event or schedule schedule pages attendees of your event will see a Join Video button. These buttons will direct to the links shown here. Only organizers and registered ticket holders will be able to access these links.',
        extraValuePaths : ['identifier', 'event'],
        cellComponent   : 'ui-table/cell/events/view/videoroom/cell-stream-url',
        width           : 70
      },
      {
        name       : this.l10n.t('Room Password'),
        width      : 70,
        helperInfo : 'The room password field can be used to communicate a password which is necessary to access online video rooms for example for external video services such a Zoom, Teams and Webex. The need for a password entry depends on the configuration of your video channel. The integrated Big Blue Button video solution in eventyay.com does not need a password as only ticket holders are able to access it. The difference between the password and PIN is that the password option is used for online access while PINs are used to access video rooms through the telephone.',
        valuePath  : 'videoStream.password'
      },
      {
        name          : this.l10n.t('Moderators'),
        valuePath     : 'videoStream.moderators',
        cellComponent : 'ui-table/cell/events/view/videoroom/cell-email'
      },
      {
        name       : this.l10n.t('Additional information'),
        helperInfo : 'Additional Information fields can be used to share information such as phone access, PINs and other video room specific information.',
        valuePath  : 'videoStream.additionalInformation'
      }
    ];
  }

  @computed('model.event')
  get events() {
    if (this.count === 1 && !this.model.event?.videoStream?.get('name')) {
      location = location.href;
    }
    this.count = this.count + 1;
    return [this.model.event];
  }

  get eventColumns() {
    const { columns } = this;
    columns[0].name = this.l10n.t('Event');
    columns[0].helperInfo = null;

    return columns;
  }

  @action
  async delete(id) {
    this.set('isLoading', true);
    const stream = await this.store.peekRecord('video-stream', id, { backgroundReload: false });
    try {
      await stream.destroyRecord();
      this.notify.success(this.l10n.t('{{item}} has been deleted successfully.', { item: this.l10n.t('Video Stream') }),
        {
          id: 'stream_del'
        });
      this.refreshModel();
    } catch (e) {
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'stream_err'
        });
    }
    this.set('isLoading', false);
  }
}
