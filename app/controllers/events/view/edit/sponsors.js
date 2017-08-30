import Ember from 'ember';

const { Controller, RSVP } = Ember;

export default Controller.extend({
  actions: {
    save() {
      this.set('isLoading', true);
      this.get('model.event').save()
        .then(data => {
          let savedSponsorsPromises = [];
          if (this.get('model.event.isSponsorsEnabled')) {
            savedSponsorsPromises = this.get('model.sponsors').toArray().map(sponsor => sponsor.save());
          } else {
            savedSponsorsPromises = this.get('model.sponsors').toArray().map(sponsor => sponsor.destroyRecord());
          }
          RSVP.Promise.all(savedSponsorsPromises)
            .then(() => {
              this.set('isLoading', false);
              this.get('notify').success(this.l10n.t('Your event has been saved'));
              this.transitionToRoute('events.view.index', data.id);
            }, function() {
              this.get('notify').error(this.l10n.t('Sponsors data did not save. Please try again'));
            });
        })
        .catch(() => {
          this.set('isLoading', false);
          this.get('notify').error(this.l10n.t('Sponsors data did not save. Please try again'));
        });
    },
    move() {
      this.set('isLoading', true);
      this.get('model.event').save()
        .then(data => {
          let savedSponsorsPromises = [];
          if (this.get('model.event.isSponsorsEnabled')) {
            savedSponsorsPromises = this.get('model.sponsors').toArray().map(sponsor => sponsor.save());
          } else {
            savedSponsorsPromises = this.get('model.sponsors').toArray().map(sponsor => sponsor.destroyRecord());
          }
          RSVP.Promise.all(savedSponsorsPromises)
            .then(() => {
              this.set('isLoading', false);
              this.get('notify').success(this.l10n.t('Your event has been saved'));
              this.transitionToRoute('events.view.edit.sessions-speakers', data.id);
            }, function() {
              this.get('notify').error(this.l10n.t('Sponsors data did not save. Please try again'));
            });
        })
        .catch(() => {
          this.set('isLoading', false);
          this.get('notify').error(this.l10n.t('Sponsors data did not save. Please try again'));
        });
    }
  }
});
