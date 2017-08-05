import Ember from 'ember';

const { Controller, RSVP } = Ember;

export default Controller.extend({
  actions: {
    save() {
      this.get('model.event').save()
        .then(() => {
          let promises = [];
          if (this.get('model.event.isSessionsSpeakersEnabled')) {
            promises.push(this.get('model.event.tracks').toArray().map(track => track.save()));
            promises.push(this.get('model.event.sessionTypes').toArray().map(type => type.save()));
            promises.push(this.get('model.event.microlocations').toArray().map(location => location.save()));
            promises.push(this.get('model.speakersCall').save());
          } else {
            promises.push(this.get('model.event.tracks').toArray().map(track => track.destroyRecord()));
            promises.push(this.get('model.event.sessionTypes').toArray().map(type => type.destroyRecord()));
            promises.push(this.get('model.event.microlocations').toArray().map(location => location.destroyRecord()));
            promises.push(this.get('model.speakersCall').destroyRecord());
          }
          RSVP.Promise.all(promises)
            .then(() => {
              this.transitionToRoute('index');
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
        .then(() => {
          let promises = [];
          if (this.get('model.event.isSessionsSpeakersEnabled')) {
            promises.push(this.get('model.event.tracks').toArray().map(track => track.save()));
            promises.push(this.get('model.event.sessionTypes').toArray().map(type => type.save()));
            promises.push(this.get('model.event.microlocations').toArray().map(location => location.save()));
            promises.push(this.get('model.speakersCall').save());
          } else {
            promises.push(this.get('model.event.tracks').toArray().map(track => track.destroyRecord()));
            promises.push(this.get('model.event.sessionTypes').toArray().map(type => type.destroyRecord()));
            promises.push(this.get('model.event.microlocations').toArray().map(location => location.destroyRecord()));
            promises.push(this.get('model.speakersCall').destroyRecord());
          }
          RSVP.Promise.all(promises)
            .then(() => {
              this.transitionToRoute('index');
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
