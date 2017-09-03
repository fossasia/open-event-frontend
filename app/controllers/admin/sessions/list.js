import Ember from 'ember';

const { Controller } = Ember;
export default Controller.extend({
  columns: [
    {
      propertyName   : 'event.name',
      title          : 'Event Name',
      disableSorting : true
    },
    {
      propertyName : 'title',
      title        : 'Title'
    },
    {
      propertyName   : 'speakers',
      template       : 'components/ui-table/cell/cell-speakers',
      title          : 'Speakers',
      disableSorting : true
    },
    {
      propertyName : 'submitted-at',
      template     : 'components/ui-table/cell/cell-simple-date',
      title        : 'Submitted At'
    },
    {
      propertyName : 'starts-at',
      template     : 'components/ui-table/cell/cell-date',
      title        : 'Starts At'
    },
    {
      propertyName : 'ends-at',
      template     : 'components/ui-table/cell/cell-date',
      title        : 'Ends At'
    },
    {
      template         : 'components/ui-table/cell/cell-simple-buttons',
      title            : 'Action',
      disableSorting   : true,
      disableFiltering : true
    }
  ],
  actions: {
    deleteSession(session) {
      this.set('isLoading', true);
      session.destroyRecord()
        .then(() => {
          this.notify.success(this.l10n.t('Session has been deleted successfully.'));
        })
        .catch(()=> {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(()=>{
          this.set('isLoading', false);
        });
    }
  }
});
