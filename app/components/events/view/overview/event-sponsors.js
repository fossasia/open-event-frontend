import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames : ['ui', 'fluid', 'card'],
  actions    : {
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
    }
  }
});
