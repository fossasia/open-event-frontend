import Ember from 'ember';
import CustomFormMixin from 'open-event-frontend/mixins/custom-form';

const { Mixin, MutableArray, RSVP } = Ember;

export default Mixin.create(MutableArray, CustomFormMixin, {

  getSteps() {
    return [
      {
        title       : this.l10n.t('Basic Details'),
        description : this.l10n.t('Tell about your event'),
        icon        : 'info icon',
        route       : 'events.view.edit.basic-details'
      },
      {
        title       : this.l10n.t('Sponsors'),
        description : this.l10n.t('Advertise your sponsors'),
        icon        : 'dollar icon',
        route       : 'events.view.edit.sponsors'
      },
      {
        title       : this.l10n.t('Sessions & Speakers'),
        description : this.l10n.t('Expand your event'),
        icon        : 'list icon',
        route       : 'events.view.edit.sessions-speakers'
      }
    ];
  },

  setRelationship(record, event) {
    record.set('event', event);
    return record;
  },

  getOrCreate(event, relationship, modelName) {
    return new RSVP.Promise(resolve => {
      event
        .get(relationship)
        .then(relationshipRecord => {
          resolve(relationshipRecord);
        })
        .catch(() => {
          let record = this.store.createRecord(modelName);
          record.set('event', event);
          resolve(record);
        });
    });
  }
});
