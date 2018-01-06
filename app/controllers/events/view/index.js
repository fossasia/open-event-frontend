import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  sponsorsColumns: [
    {
      propertyName   : 'logo-url',
      template       : 'components/ui-table/cell/cell-image',
      title          : 'Logo',
      disableSorting : true
    },
    {
      propertyName : 'name',
      title        : 'Name'
    },
    {
      propertyName   : 'type',
      title          : 'Type',
      disableSorting : true
    },
    {
      propertyName : 'level',
      title        : 'Level'
    },
    {
      title          : 'Options',
      template       : 'components/ui-table/cell/cell-sponsor-options',
      disableSorting : true
    }
  ],
  actions: {
    deleteSponsor(sponsor) {
      this.set('isLoading', true);
      sponsor.destroyRecord()
        .then(() => {
          this.notify.success(this.l10n.t('Sponsor has been deleted successfully.'));
        })
        .catch(()=> {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(()=>{
          this.set('isLoading', false);
        });
    },
    editSponsor() {
      this.transitionToRoute('events.view.edit.sponsors');
    }
  }
});
