import Controller from '@ember/controller';
import RSVP from 'rsvp';

export default Controller.extend({
  actions: {
    save() {
      this.set('isLoading', true);
      this.get('model.event').save()
        .then(data => {
          let promises = [];
          if (this.get('model.event.isSessionsSpeakersEnabled')) {
            promises.push(this.get('model.event.tracks').toArray().map(track => track.save()));
            promises.push(this.get('model.event.sessionTypes').toArray().map(type => type.save()));
            promises.push(this.get('model.event.microlocations').toArray().map(location => location.save()));
            promises.push(this.get('model.event.customForms').toArray().map(form => form.save()));
            promises.push(this.get('model.speakersCall').save());
          } else {
            promises.push(this.get('model.event.tracks').toArray().map(track => track.destroyRecord()));
            promises.push(this.get('model.event.sessionTypes').toArray().map(type => type.destroyRecord()));
            promises.push(this.get('model.event.microlocations').toArray().map(location => location.destroyRecord()));
            promises.push(this.get('model.customForms').toArray().map(form => form.destroyRecord()));
            promises.push(this.get('model.speakersCall').destroyRecord());
          }
          RSVP.Promise.all(promises)
            .then(() => {
              this.set('isLoading', false);
              this.get('notify').success(this.get('l10n').t('Your event has been saved'));
              this.transitionToRoute('events.view.index', data.id);
            }, function() {
              this.get('notify').error(this.get('l10n').t('Event data did not save. Please try again'));
            });
        })
        .catch(() => {
          this.set('isLoading', false);
          this.get('notify').error(this.get('l10n').t('Event data did not save. Please try again'));
        });
    },
    move(direction) {
      this.set('isLoading', true);
      this.get('model.event').save()
        .then(data => {
          let promises = [];
          if (this.get('model.event.isSessionsSpeakersEnabled')) {
            promises.push(this.get('model.event.tracks').toArray().map(track => track.save()));
            promises.push(this.get('model.event.sessionTypes').toArray().map(type => type.save()));
            promises.push(this.get('model.event.microlocations').toArray().map(location => location.save()));
            promises.push(this.get('model.event.customForms').toArray().map(form => form.save()));
            promises.push(this.get('model.speakersCall').save());
          } else {
            promises.push(this.get('model.event.tracks').toArray().map(track => track.destroyRecord()));
            promises.push(this.get('model.event.sessionTypes').toArray().map(type => type.destroyRecord()));
            promises.push(this.get('model.event.microlocations').toArray().map(location => location.destroyRecord()));
            promises.push(this.get('model.customForms').toArray().map(form => form.destroyRecord()));
            promises.push(this.get('model.speakersCall').destroyRecord());
          }
          RSVP.Promise.all(promises)
            .then(() => {
              this.get('notify').success(this.get('l10n').t('Your event has been saved'));
              this.set('isLoading', false);
              if (direction === 'forwards') {
                this.transitionToRoute('events.view.index', data.id);
              } else if (direction === 'backwards') {
                this.transitionToRoute('events.view.edit.sponsors', data.id);
              }
            }, function() {
              this.get('notify').error(this.get('l10n').t('Event data did not save. Please try again'));
            });
        })
        .catch(() => {
          this.set('isLoading', false);
          this.get('notify').error(this.get('l10n').t('Event data did not save. Please try again'));
        });
    }
  }
});
