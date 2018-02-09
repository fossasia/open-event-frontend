import Ember from 'ember';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

const { Controller, RSVP } = Ember;

export default Controller.extend(EventWizardMixin, {
  actions: {
    save() {
      this.set('isLoading', true);
      this.get('model.data.event').save()
        .then(data => {
          let promises = [];
          promises.push(this.get('model.data.event.tickets').toArray().map(ticket => ticket.save()));
          promises.push(this.get('model.data.event.socialLinks').toArray().map(link => link.save()));
          if (this.get('model.data.event.copyright.licence')) {
            let copyright = this.setRelationship(this.get('model.data.event.copyright.content'), data);
            promises.push(copyright.save());
          }
          if (this.get('model.data.event.tax.name')) {
            let tax = this.setRelationship(this.get('model.data.event.tax.content'), data);
            if (this.get('model.event.isTaxEnabled')) {
              promises.push(tax.save());
            } else {
              promises.push(tax.destroyRecord());
            }
          }
          RSVP.Promise.all(promises)
            .then(() => {
              this.set('isLoading', false);
              this.get('notify').success(this.l10n.t('Your event has been saved'));
              this.transitionToRoute('events.view.index', data.id);
            }, function() {
              this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
            });
        })
        .catch(() => {
          this.set('isLoading', false);
          this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
        });
    },
    move() {
      this.set('isLoading', true);
      this.get('model.data.event').save()
        .then(data => {
          let promises = [];
          promises.push(this.get('model.data.event.tickets').toArray().map(ticket => ticket.save()));
          promises.push(this.get('model.data.event.socialLinks').toArray().map(link => link.save()));
          if (this.get('model.data.event.copyright.licence')) {
            let copyright = this.setRelationship(this.get('model.data.event.copyright.content'), data);
            promises.push(copyright.save());
          }
          if (this.get('model.data.event.tax.name')) {
            let tax = this.setRelationship(this.get('model.data.event.tax.content'), data);
            if (this.get('model.event.isTaxEnabled')) {
              promises.push(tax.save());
            } else {
              promises.push(tax.destroyRecord());
            }
          }
          RSVP.Promise.all(promises)
            .then(() => {
              this.set('isLoading', false);
              this.get('notify').success(this.l10n.t('Your event has been saved'));
              this.transitionToRoute('events.view.edit.sponsors', data.id);
            }, function() {
              this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
            });
        })
        .catch(() => {
          this.set('isLoading', false);
          this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
        });
    }
  }
});
