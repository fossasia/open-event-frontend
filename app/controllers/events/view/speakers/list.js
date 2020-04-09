import Controller from '@ember/controller';
import { action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';


export default class extends Controller.extend(EmberTableControllerMixin) {
  get columns() {
    return [
      {
        name            : ' ',
        valuePath       : 'thumbnailImageUrl',
        extraValuePaths : ['photoUrl'],
        cellComponent   : 'ui-table/cell/events/view/speakers/speaker-logo'
      },
      {
        name            : 'Name',
        valuePath       : 'name',
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        width           : 150
      },
      {
        name            : 'Email',
        valuePath       : 'email',
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        width           : 250
      },
      {
        name          : 'Phone',
        valuePath     : 'mobile',
        cellComponent : 'ui-table/cell/events/view/speakers/speaker-mobile'
      },
      {
        name          : 'Submitted Sessions',
        valuePath     : 'sessions',
        cellComponent : 'ui-table/cell/events/view/speakers/cell-simple-sessions'
      },
      {
        name            : 'Featured speaker',
        valuePath       : 'id',
        extraValuePaths : ['isFeatured'],
        cellComponent   : 'ui-table/cell/events/view/speakers/cell-is-featured',
        actions         : {
          toggleFeatured: this.toggleFeatured.bind(this)
        }
      },
      {
        name          : 'Actions',
        valuePath     : 'id',
        cellComponent : 'ui-table/cell/events/view/speakers/cell-buttons',
        width         : 160,
        actions       : {
          deleteSpeaker : this.deleteSpeaker.bind(this),
          editSpeaker   : this.editSpeaker.bind(this),
          viewSpeaker   : this.viewSpeaker.bind(this)
        }
      }
    ];
  }

  @action
  async deleteSpeaker(speaker_id) {
    this.set('isLoading', true);
    let speaker =  this.store.peekRecord('speaker', speaker_id, { backgroundReload: true });
    try {
      await speaker.destroyRecord();
      this.notify.success(this.l10n.t('Speaker has been deleted successfully.'));
    } catch (e) {
      console.warn(e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
    }
    this.set('isLoading', false);
  }

  @action
  editSpeaker(id) {
    this.transitionToRoute('events.view.speakers.edit', id);
  }

  @action
  viewSpeaker(id) {
    this.transitionToRoute('events.view.speakers.edit', id);
  }

  @action
  async toggleFeatured(speaker_id) {
    let speaker =  this.store.peekRecord('speaker', speaker_id, { backgroundReload: false });
    speaker.toggleProperty('isFeatured');
    try {
      await speaker.save();
      this.notify.success(this.l10n.t('Speaker details modified successfully'));
    } catch (e) {
      console.warn(e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
    }
  }
}
