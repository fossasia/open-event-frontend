import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { v4 } from 'ember-uuid';
import { A } from '@ember/array';

export default Component.extend(FormMixin, EventWizardMixin, {
  tickets         : [],
  excludeTickets  : A(),
  isOldFormMode   : false,
  isInit          : false,

  init() {
    this._super(...arguments);
    this.prepareCustomFormsForShow();
  },

  prepareCustomFormsForShow() {
    const { tickets, badgeForms, badges } = this.data;
    if (this.isInit || badges.length) {return}
    this.isInit = true;
    const noForm = tickets.filter(_ticket => _ticket.badgeID).length === 0;
    if (noForm) {
      const _badgeID = v4();
      const _fields = badgeForms?.filter(field => {
        if (!field.isDeleted) {
          field.badgeID = _badgeID;
          return true;
        }
        return false;
      });
      if (_fields.length > 0) {
        tickets.forEach(_ticket => {
          _ticket.badgeID = _badgeID;
          this.excludeTickets.pushObject(_ticket);
        });
        badges.pushObject(this.store.createRecord('badge', {
          badgeID        : _badgeID,
          badgeForms     : _fields,
          ticketsDetails : tickets
        }));
      }
    } else {
      const _badges = {};
      tickets.forEach(ticket => {
        const { badgeID } = ticket;
        if (badgeID) {
          if (_badges[badgeID]) {
            _badges[badgeID].ticketsDetails.pushObject(ticket);
          } else {
            _badges[badgeID] = {
              ticketsDetails: [ticket]
            };
          }
          this.excludeTickets.pushObject(ticket);
        }
      });

      Object.keys(_badges).forEach(_id => {
        const selectedTicket = _badges[_id].ticketsDetails;
        badges.pushObject({
          badgeID        : _id,
          ticketsDetails : selectedTicket,
          badgeForms     : badgeForms.find(_field => _field.badgeID === _id)
        });
      });
    }
  },

  prepareCustomFormsForSave() {
    this.data.badges.forEach(_badge => {
      const { badgeID, badgeForms, ticketsDetails } = _badge;
      if (!badgeForms.isDeleted) {
        badgeForms.badgeID = badgeID;
      }
      if (!badgeForms.id) {
        this.data.badgeForms.pushObject(badgeForms);
      }
      ticketsDetails.forEach(ticket => {
        ticket.badgeID = badgeID;
      });
    });
  },

  selectableTickets: computed('excludeTickets.@each', 'badge.@each', function() {
    return this.data.tickets.filter(ticket => !this.excludeTickets.includes(ticket));
  }),

  revertChanges: observer('data.event.isBadgesEnabled', function() {
    if (!this.data.event.isBadgesEnabled) {
      this.editableFields.forEach(field => field.set('isRequired', false));
    }
  }),

  showEditColumn: computed('editableFields.@each', function() {
    return this.editableFields?.some(field => field.isComplex);
  }),

  getBadgeForm(parent, _badgeID, ticketsDetails, badgeForms = [], badgeFields = []) {
    return this.store.createRecord('badge-form', {
      badgeID : _badgeID,
      event   : parent,
      ticketsDetails,
      badgeForms,
      badgeFields
    });
  },

  actions: {
    removeField(field) {
      field.deleteRecord();
    },
    addBadge(ticketsDetails = []) {
      const _badgeID =  v4();
      this.data.badges.pushObject(this.store.createRecord('badge', {
        badgeID    : _badgeID,
        ticketsDetails,
        badgeForms : this.getBadgeForm(this.data.event, _badgeID, ticketsDetails)
      }));
    },

    toggleBadges() {
      if (!this.data.isBadgesEnabled) {
        this.set('data.isBadgesEnabled', true);
      } else {
        this.set('data.isBadgesEnabled', false);
        this.data.badges.clear();
      }
    },

    onFormUpdateTicket(changedData) {
      const { added, changed, formID } = changedData;
      changed.forEach(ticket => {
        ticket.badgeID = added ? formID : '';
      });
      if (added) {
        this.excludeTickets.pushObjects(changed);
      } else {
        this.excludeTickets.removeObjects(changed);
      }
    },
    saveDraft() {
      this.prepareCustomFormsForSave();
      this._super();
    },
    saveForm() {
      this.prepareCustomFormsForSave();
      this._super();
    },
    move(direction) {
      this.prepareCustomFormsForSave();
      this._super(direction);
    },
    onRemoveForm(_id) {
      const deleteBadge = this.data.badges.find(_badge => _badge.badgeID === _id);
      if (deleteBadge) {
        const { ticketsDetails } = deleteBadge;
        ticketsDetails.forEach(ticket => {
          ticket.badgeID = '';
        });
        this.excludeTickets.removeObjects(deleteBadge.ticketsDetails);
        this.data.badges.removeObject(deleteBadge);
      }
    }
  }
});
