import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

const { Route, RSVP } = Ember;

export default Route.extend(AuthenticatedRouteMixin, EventWizardMixin, {
  titleToken() {
    return this.l10n.t('Create an Event');
  },
  model() {
    return {
      data: {
        event: this.store.createRecord('event', {
          socialLinks : [],
          tax         : this.store.createRecord('tax'),
          copyright   : this.store.createRecord('event-copyright')
        }),
        types: this.store.query('event-type', {
          sort: 'name'
        }),
        topics: this.store.query('event-topic', {
          sort    : 'name',
          include : 'event-sub-topics'
        })
      },
      steps: this.getSteps()
    };
  },
  actions: {
    save() {
      this.get('currentModel.data.event').save()
        .then(data => {
          let savedTicketsPromises = this.get('currentModel.data.event.tickets').toArray().map(ticket => ticket.save());
          let savedSocialPromises = this.get('currentModel.data.event.socialLinks').toArray().map(link => link.save());
          let allPromises = [savedTicketsPromises, savedSocialPromises];
          RSVP.Promise.all(allPromises)
            .then(() => {
              this.transitionTo('events.view.edit.sponsors', data.id);
            }, function() {
              this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
            });
        })
        .catch(() => {
          this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
        });
    },
    move() {
      this.get('currentModel.data.event').save()
        .then(data => {
          let savedTicketsPromises = this.get('currentModel.data.event.tickets').toArray().map(ticket => ticket.save());
          let savedSocialPromises = this.get('currentModel.data.event.socialLinks').toArray().map(link => link.save());
          let allPromises = [savedTicketsPromises, savedSocialPromises];
          RSVP.Promise.all(allPromises)
            .then(() => {
              this.transitionTo('events.view.edit.sponsors', data.id);
            }, function() {
              this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
            });
        })
        .catch(() => {
          this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
        });
    }
  }
});
