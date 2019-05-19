import Controller from '@ember/controller';

export default Controller.extend({
  columns: [
    {
      propertyName   : 'thumbnailImageUrl',
      title          : ' ',
      template       : 'components/ui-table/cell/events/view/speakers/speaker-logo',
      disableSorting : true
    },
    {
      propertyName : 'name',
      title        : 'Name'
    },
    {
      propertyName : 'email',
      title        : 'Email'
    },
    {
      propertyName : 'mobile',
      template     : 'components/ui-table/cell/events/view/speakers/speaker-mobile',
      title        : 'Phone'
    },
    {
      propertyName   : 'sessions',
      title          : 'Submitted Sessions',
      template       : 'components/ui-table/cell/events/view/speakers/cell-simple-sessions',
      disableSorting : true
    },
    {
      propertyName   : 'is-featured',
      title          : 'Featured speaker',
      template       : 'components/ui-table/cell/events/view/speakers/cell-is-featured',
      disableSorting : true
    },
    {
      propertyName : '',
      title        : 'Actions',
      template     : 'components/ui-table/cell/events/view/speakers/cell-buttons'
    }
  ],
  actions: {
    deleteSpeaker(speaker) {
      this.set('isLoading', true);
      speaker.destroyRecord()
        .then(() => {
          this.notify.success(this.l10n.t('Speaker has been deleted successfully.'));
        })
        .catch(e => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
          console.warn(e);
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    editSpeaker(id) {
      this.transitionToRoute('events.view.speakers.edit', id);
    },
    viewSpeaker(id) {
      this.transitionToRoute('events.view.speakers.edit', id);
    },
    toggleFeatured(speaker) {
      speaker.toggleProperty('isFeatured');
      speaker.save()
        .then(() => {
          this.notify.success(this.l10n.t('Speaker details modified successfully'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        });
    }
  }
});
