import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {
    sort_dir = 'name';
    per_page = 10;

    @tracked isloading = false;

    get recordingColumns() {
      return [
        {
          name            : this.l10n.t('Event Name'),
          valuePath       : 'videoStream.event.name',
        },
        {
          name          : this.l10n.t('Public URL'),
          valuePath     : 'videoStream.event.url',
          cellComponent : 'ui-table/cell/cell-link'
        },
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
          name      : this.l10n.t('Channel'),
          valuePath : 'videoStream.videoChannel.name'
        },
        {
          name          : this.l10n.t('View'),
          valuePath     : 'url',
          cellComponent : 'ui-table/cell/events/view/videoroom/cell-video-recording'
        }
      ];
    }

}
