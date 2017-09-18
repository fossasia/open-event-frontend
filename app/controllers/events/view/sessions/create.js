import Ember from 'ember';

const { Controller } = Ember;
export default Controller.extend({
  actions: {
    save() {
      this.set('isLoading', true);
      this.get('model.session').save()
        .then(session => {
          let speaker = this.get('model.speaker');
          speaker.set('session', session);
          speaker.save()
            .then(() => {
              this.get('notify').success(this.l10n.t('Your session has been saved'));
              this.transitionToRoute('events.view.sessions', this.get('model.event.id'));
            });
        })
        .catch(() => {
          this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
