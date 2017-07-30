import Ember from 'ember';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

const { Route, RSVP } = Ember;

export default Route.extend(EventWizardMixin, {
  titleToken() {
    return this.l10n.t('Sponsors');
  },
  model() {
    return this.modelFor('events.view.edit');
  },
  actions: {
    save() {
      this.get('currentModel.event').save()
        .then(data => {
          let savedSponsorsPromises = [];
          if (this.get('currentModel.event.isSponsorsEnabled')) {
            savedSponsorsPromises = this.get('currentModel.event.sponsors').toArray().map(sponsor => sponsor.save());
          } else {
            savedSponsorsPromises = this.get('currentModel.event.sponsors').toArray().map(sponsor => sponsor.destroyRecord());
          }
          RSVP.Promise.all(savedSponsorsPromises)
            .then(() => {
              this.transitionTo('events.view.edit.sessions-speakers', data.id);
            }, function() {
              this.get('notify').error(this.l10n.t('Sponsors data did not save. Please try again'));
            });
        })
        .catch(() => {
          this.get('notify').error(this.l10n.t('Sponsors data did not save. Please try again'));
        });
    },
    move() {
      this.get('currentModel.event').save()
        .then(data => {
          let savedSponsorsPromises = [];
          if (this.get('currentModel.event.isSponsorsEnabled')) {
            savedSponsorsPromises = this.get('currentModel.event.sponsors').toArray().map(sponsor => sponsor.save());
          } else {
            savedSponsorsPromises = this.get('currentModel.event.sponsors').toArray().map(sponsor => sponsor.destroyRecord());
          }
          RSVP.Promise.all(savedSponsorsPromises)
            .then(() => {
              this.transitionTo('events.view.edit.sessions-speakers', data.id);
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
