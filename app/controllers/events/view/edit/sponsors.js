import Ember from 'ember';

const { Controller, RSVP } = Ember;

export default Controller.extend({
  actions: {
    save() {
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
              this.transitionToRoute('events.view.edit.sessions-speakers', data.id);
            }, function() {
              this.get('notify').error(this.l10n.t('Sponsors data did not save. Please try again'));
            });
        })
        .catch(() => {
          this.get('notify').error(this.l10n.t('Sponsors data did not save. Please try again'));
        });
    },
    move() {
      this.get('model.event').save()
        .then(data => {
          let savedSponsorsPromises = [];
          if (this.get('model.isSponsorsEnabled')) {
            savedSponsorsPromises = this.get('model.sponsors').toArray().map(sponsor => sponsor.save());
          } else {
            savedSponsorsPromises = this.get('model.sponsors').toArray().map(sponsor => sponsor.destroyRecord());
          }
          RSVP.Promise.all(savedSponsorsPromises)
            .then(() => {
              this.transitionToRoute('events.view.edit.sessions-speakers', data.id);
            }, function() {
              this.get('notify').error(this.l10n.t('Sponsors data did not save. Please try again'));
            });
        })
        .catch(() => {
          this.get('notify').error(this.l10n.t('Sponsors data did not save. Please try again'));
        });
    }
  }
});
