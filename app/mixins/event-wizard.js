import Mixin from '@ember/object/mixin';
import MutableArray from '@ember/array/mutable';
import RSVP from 'rsvp';
import { v1 } from 'ember-uuid';
import CustomFormMixin from 'open-event-frontend/mixins/custom-form';

export default Mixin.create(MutableArray, CustomFormMixin, {

  /**
   * Get the steps of the wizard
   *
   * @return {*[]}
   */
  getSteps() {
    return [
      {
        title       : this.l10n.t('Basic Details'),
        description : this.l10n.t('Tell about your event'),
        icon        : 'info icon',
        route       : 'events.view.edit.basic-details'
      },
      {
        title       : this.l10n.t('Attendee Form'),
        description : this.l10n.t('Know your audience'),
        icon        : 'list icon',
        route       : 'events.view.edit.attendee'
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

  /**
   * Save event & related data
   *
   * @return {Promise<*>}
   */
  async saveEventData(propsToSave = []) {
    const event = this.get('model.event');
    const data = {};
    for (const property of propsToSave) {
      try {
        data[property] = await event.get(property);
      } catch (e) {
        if (!(e.errors && e.errors.length && e.errors.length > 0 && e.errors[0].status === 404)) {
          // Lets just ignore any 404s that might occur. And throw the rest for the caller fn to catch
          throw e;
        }
      }
    }
    const numberOfTickets = data.tickets ? data.tickets.length : 0;
    if (event.name && event.locationName && event.startsAtDate && event.endsAtDate && numberOfTickets > 0) {
      await event.save();

      for (const ticket of data.tickets ? data.tickets.toArray() : []) {
        ticket.set('maxOrder', Math.min(ticket.get('maxOrder'), ticket.get('quantity')));
        await ticket.save();
      }

      for (const socialLink of data.socialLinks ? data.socialLinks.toArray() : []) {
        await socialLink.save();
      }

      if (data.copyright && data.copyright.get('licence')) {
        await data.copyright.save();
      }

      if (data.tax && data.tax.get('name')) {
        let tax = this.setRelationship(data.tax, event);
        if (event.get('isTaxEnabled')) {
          await tax.save();
        } else {
          await tax.destroyRecord();
        }
      }

      if (data.stripeAuthorization && data.stripeAuthorization.get('stripeAuthCode')) {
        let stripeAuthorization = this.setRelationship(data.stripeAuthorization, event);
        if (event.get('canPayByStripe')) {
          await stripeAuthorization.save();
        } else {
          await stripeAuthorization.destroyRecord();
        }
      }

      const bulkPromises = [];

      for (const property of ['tracks', 'sessionTypes', 'microlocations', 'customForms']) {
        const items = data[property];
        for (const item of items ? items.toArray() : []) {
          bulkPromises.push(event.get('isSessionsSpeakersEnabled') ? item.save() : item.destroyRecord());
        }
      }

      for (const property of ['sponsors']) {
        const items = data[property];
        for (const item of items ? items.toArray() : []) {
          bulkPromises.push(event.get('isSponsorsEnabled') ? item.save() : item.destroyRecord());
        }
      }

      await Promise.all(bulkPromises);

      return event;
    } else {
      let errorObject = { 'errors': [] };
      if (event.name === undefined || event.name === '') {
        errorObject.errors.push({ 'detail': 'Event name has not been provided' });
      }
      if (event.locationName === undefined || event.locationName === '') {
        errorObject.errors.push({ 'detail': 'Location has not been provided' });
      }
      if (event.startsAtDate === undefined || event.endsAtDate === undefined) {
        errorObject.errors.push({ 'detail': 'Dates have not been provided' });
      }
      if (numberOfTickets === 0) {
        errorObject.errors.push({ 'detail': 'Tickets are required for publishing event' });
      }
      throw (errorObject);
    }
  },

  /**
   * Redirect user to the specified route once the event is saved
   *
   * @param propsToSave
   * @param route
   */
  saveEventDataAndRedirectTo(route, propsToSave = []) {
    this.set('isLoading', true);
    this.saveEventData(propsToSave)
      .then(data => {
        this.notify.success(this.l10n.t('Your event has been saved'));
        this.transitionToRoute(route, data.id);
      })
      .catch(e => {
        e.errors.forEach(error => {
          this.notify.error(this.l10n.tVar(error.detail));
        });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  },

  /**
   * Set a the event relationship on a related model
   *
   * @param record
   * @param event
   * @return {*}
   */
  setRelationship(record, event) {
    record.set('event', event);
    return record;
  },

  /**
   * Get or create a relationship
   *
   * @param event
   * @param relationship
   * @param modelName
   */
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
          event.set(relationship, record);
          resolve(record);
        });
    });
  },

  actions: {
    saveDraft(event) {
      event.preventDefault();
      this.onValid(() => {
        this.set('data.event.state', 'draft');
        this.sendAction('save');
      });
    },
    moveForward(event) {
      event.preventDefault();
      this.onValid(() => {
        this.sendAction('move');
      });
    },
    publish(event) {
      event.preventDefault();
      this.onValid(() => {
        this.set('data.event.state', 'published');
        this.sendAction('save');
      });
    },
    addItem(type, model) {
      if (type === 'socialLinks') {
        this.get(`data.event.${type}`).pushObject(this.store.createRecord(model, {
          identifier: v1()
        }));
      } else {
        this.get(`data.event.${type}`).pushObject(this.store.createRecord(model));
      }
    },
    removeItem(item) {
      item.deleteRecord();
    }
  }
});
