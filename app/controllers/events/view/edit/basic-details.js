import Ember from 'ember';

const { Controller, RSVP } = Ember;

export default Controller.extend({
  actions: {
    save() {
      this.set('isLoading', true);
      this.get('model.event').save()
        .then(data => {
          let promises = [];
          promises.push(this.get('model.event.tickets').toArray().map(ticket => ticket.save()));
          promises.push(this.get('model.event.socialLinks').toArray().map(link => link.save()));
          if (this.get('model.event.copyright.licence')) {
            promises.push(this.get('model.event.copyright').then(copyright => copyright.save()));
          }
          if (this.get('model.event.tax.name')) {
            if (this.get('model.event.isTaxEnabled')) {
              promises.push(this.get('model.event.tax').then(tax => tax.save()));
            } else {
              promises.push(this.get('model.event.tax').then(tax => tax.destroyRecord()));
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
      this.get('model.event').save()
        .then(data => {
          let promises = [];
          promises.push(this.get('model.event.tickets').toArray().map(ticket => ticket.save()));
          promises.push(this.get('model.event.socialLinks').toArray().map(link => link.save()));
          if (this.get('model.event.copyright.licence')) {
            promises.push(this.get('model.event.copyright').then(copyright => copyright.save()));
          }
          if (this.get('model.event.tax.name')) {
            if (this.get('model.event.isTaxEnabled')) {
              promises.push(this.get('model.event.tax').then(tax => tax.save()));
            } else {
              promises.push(this.get('model.event.tax').then(tax => tax.destroyRecord()));
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
