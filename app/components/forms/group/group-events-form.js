
import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import classic from 'ember-classic-decorator';
import FormMixin from 'open-event-frontend/mixins/form';
import { all } from 'rsvp';

@classic
export default class GroupEventsForm extends Component.extend(FormMixin) {

  @service errorHandler;

  @tracked eventToBeUpdate = [];
  @tracked unsavedEvents = [];
  @tracked savedEvents = [];

  @action
  addEvent(event) {
    const eventIds = this.eventToBeUpdate.map(evnt => evnt.identifier);
    if (this.savedEvents.includes(event.id) && eventIds.includes(event.id)) {
      event.isAnnounced = true;
      this.eventToBeUpdate = this.eventToBeUpdate.filter(event => event.identifier === event.id);
    } else {
      event.isAnnounced = false;
      this.eventToBeUpdate.push(event);
    }
    this.group.events.pushObject(event);
  }

  @action
  removeEvent(event) {
    if (event.isAnnounced) {
      event.isAnnounced = false;
      this.eventToBeUpdate.push(event);
    }
    this.group.events.removeObject(event);
  }

  @action
  async announceEvent(event) {
    this.set('isLoading', true);
    try {
      const heading = this.l10n.t('Do you want to announce the event "{{eventName}}" to all group members now?', { eventName: event.name });
      const options = {
        denyText     : 'Cancel',
        denyColor    : 'red',
        approveText  : 'Yes',
        approveColor : 'green'
      };
      await this.confirm.prompt(heading, options);
    } catch {
      this.set('isLoading', false);
      return;
    }
    this.loader.load(`/groups/${this.group.id}/events/${event.identifier}/announce`)
      .then(() => {
        event.isAnnounced = true;
        this.notify.success(this.l10n.t('Event has been announced.'), {
          id: 'event_announce'
        });
      })
      .catch(() => {
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again.'), {
          id: 'event_announce'
        });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  shareEvent(event) {
    this.set('eventToShare', event);
    this.set('isShareModalOpen', true);
  }

  @action
  submit(event) {
    event.preventDefault();
    this.onValid(async() => {
      try {
        this.set('isLoading', true);
        /* For the first save throws an error -> field may not be null, as social links are added in group-settings-form
        Hence, passing an empty array. */
        if (!this.group.socialLinks) {
          this.group.socialLinks = [];
        }
        await this.group.save();
        const updatedEvents = this.eventToBeUpdate.map(event => {
          return event.save();
        });
        await all([...updatedEvents]);
        this.notify.success(this.l10n.t('Your group has been saved.'),
          {
            id: 'group_save'
          });
        this.router.transitionTo('my-groups.list');
      } catch (e) {
        console.error('Error while saving group', e);
        this.errorHandler.handle(e);
      } finally {
        this.set('isLoading', false);
      }
    });
  }

  didInsertElement() {
    this.set('savedEvents', [...this.groupEvents.toArray().map(event => event.identifier)]);
  }
}
