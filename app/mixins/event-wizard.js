import Ember from 'ember';
import CustomFormMixin from 'open-event-frontend/mixins/custom-form';

const { Mixin, MutableArray } = Ember;

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

  getSessionSpeakers() {
    return {
      enabled         : true,
      tracks          : [this.store.createRecord('track', { name: 'Main Track' })],
      sessionTypes    : [this.store.createRecord('session-type', { name: 'Talk' })],
      microlocations  : [this.store.createRecord('microlocation', { name: 'Room 1' })],
      callForSpeakers : this.store.createRecord('speakers-call'),
      customForm      : {
        session : this.getSessionFormFields(),
        speaker : this.getSpeakerFormFields()
      }
    };
  }
});
