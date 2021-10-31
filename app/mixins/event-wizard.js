import Mixin from '@ember/object/mixin';
import MutableArray from '@ember/array/mutable';
import RSVP, { allSettled } from 'rsvp';
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
        title       : this.l10n.t('Additional Info'),
        description : this.l10n.t('Extra details about your event'),
        icon        : 'setting icon',
        route       : 'events.view.edit.other-details'
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

  allTicketsDeleted(tickets, deleted) {
    if (!deleted) {return false}
    const deletedTickets = new Set(deleted);
    const eventTickets = new Set(tickets.toArray());

    // eventTickets - deletedTickets
    return new Set([...eventTickets].filter(ticket => !deletedTickets.has(ticket))).size === 0;
  },

  /**
   * Save event & related data
   *
   * @return {Promise<*>}
   */
  async saveEventData(propsToSave = []) {
    const { event } = this.model;
    const data = {};
    const results = await RSVP.allSettled(propsToSave.map(property => {
      try {
        return event.get(property);
      } catch (e) {
        if (!(e.errors && e.errors.length && e.errors.length > 0 && e.errors[0].status === 404)) {
          // Lets just ignore any 404s that might occur. And throw the rest for the caller fn to catch
          throw e;
        }
      }
    }));
    for (const [index, result] of results.entries()) {
      if (result.state === 'fulfilled') {
        const key = propsToSave[index];
        data[key] = result.value;
      }
    }
    const numberOfTickets = data.tickets ? data.tickets.length : 0;
    const areAllTicketsDeleted = this.allTicketsDeleted(data.tickets, event.deletedTickets);
    if (event.name && event.startsAtDate && event.endsAtDate && (event.state === 'draft' || (numberOfTickets > 0 && !areAllTicketsDeleted))) {
      await destroyDeletedTickets(event.deletedTickets);
      await event.save();

      await Promise.all((data.tickets ? data.tickets.toArray() : []).map(ticket => {
        ticket.set('maxOrder', Math.min(ticket.get('maxOrder'), ticket.get('quantity')));
        return ticket.save();
      }));

      await Promise.all((data.socialLinks ? data.socialLinks.toArray() : []).map(socialLink => socialLink.save()));

      if (data.copyright && data.copyright.get('licence')) {
        await data.copyright.save();
      }

      // model.tax is set in basic-detail step to workaround issue #4385
      let tax = this.model.tax || data.tax;
      if (tax && tax.name) {
        tax = this.setRelationship(tax, event);
        if (event.isTaxEnabled) {
          await tax.save();
        } else {
          await tax.destroyRecord();
        }
      }

      if (data.stripeAuthorization && data.stripeAuthorization.get('stripeAuthCode')) {
        const stripeAuthorization = this.setRelationship(data.stripeAuthorization, event);
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
          bulkPromises.push(item.save());
        }
      }

      for (const property of ['sponsors']) {
        const items = data[property];
        for (const item of items ? items.toArray() : []) {
          bulkPromises.push(item.save());
        }
      }

      await Promise.all(bulkPromises);

      return event;
    } else {
      const errorObject = { 'errors': [] };
      if (event.name === undefined || event.name === '') {
        errorObject.errors.push({ 'detail': 'Event name has not been provided' });
      }
      if (event.startsAtDate === undefined || event.endsAtDate === undefined) {
        errorObject.errors.push({ 'detail': 'Dates have not been provided' });
      }
      if (numberOfTickets === 0 || areAllTicketsDeleted) {
        errorObject.errors.push({ 'detail': 'Tickets are required for publishing/published event' });
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
        console.error('Error while saving event', e);
        if (e.errors) {
          e.errors.forEach(error => {
            this.notify.error(this.l10n.tVar(error.detail));
          });
        } else {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        }
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
          const record = this.store.createRecord(modelName);
          record.set('event', event);
          event.set(relationship, record);
          resolve(record);
        });
    });
  },

  actions: {
    saveDraft() {
      this.onValid(() => {
        const valid = preSaveActions.call(this);
        if (valid) {
          this.set('data.event.state', 'draft');
          this.sendAction('save');
        }
      });
    },
    saveForm() {
      this.onValid(() => {
        const valid = preSaveActions.call(this);
        if (valid) {
          this.sendAction('save', this.data);
        }
      });
    },
    move(direction) {
      this.onValid(() => {
        preSaveActions.call(this);
        this.sendAction('move', direction, this.data);
      });
    },
    onValidate(callback) {
      this.onValid(() => {
        const allTicketsDeleted = this.allTicketsDeleted(this.data.event.tickets, this.deletedTickets);
        if (allTicketsDeleted) {
          this.notify.error(this.l10n.t('Tickets are required for publishing/published event'));
        }
        callback(!allTicketsDeleted);
      });
    },

    addItem(type, model) {
      if (type === 'socialLinks') {
        this.get(`data.event.${type}`).pushObject(this.store.createRecord(model, {
          identifier : v1(),
          isCustom   : false,
          name       : 'Website'
        }));
      } else if (type === 'customLink') {
        this.get('data.event.socialLinks').pushObject(this.store.createRecord(model, {
          identifier : v1(),
          isCustom   : true
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

async function destroyDeletedTickets(deletedTickets) {
  if (!deletedTickets) {return} // This mixin may be used in other steps not containing tickets
  await allSettled(deletedTickets.map(ticket => {
    try {
      return ticket.destroyRecord();
    } catch (e) {
      console.error('Error while deleting tickets', e);
    }
  }));
}

function preSaveActions() {
  this.data.event.deletedTickets = this.deletedTickets;

  if (this.selectedLocationType) {
    this.set('data.event.online', ['Online', 'Hybrid'].includes(this.selectedLocationType));
    if (['Online', 'To be announced'].includes(this.selectedLocationType)) {
      this.set('data.event.locationName', null);
    }
  }

  if (!this.data.event.isStripeConnectionValid) {
    this.notify.error(this.l10n.t('You need to connect to your Stripe account, if you choose Stripe as a payment gateway.'));
  }

  return this.data.event.isStripeConnectionValid;
}
