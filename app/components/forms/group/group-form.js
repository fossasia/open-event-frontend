import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import classic from 'ember-classic-decorator';
import FormMixin from 'open-event-frontend/mixins/form';
import moment from 'moment';
import { sortBy } from 'lodash-es';

@classic
export default class GroupForm extends Component.extend(FormMixin) {

  @service errorHandler;

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',

      fields: {
        name: {
          rules: [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a name')
            }
          ]
        }
      }
    };
  }

  @action
  addEvent(event) {
    this.group.events.pushObject(event);
  }

  @action
  removeEvent(event) {
    this.group.events.removeObject(event);
  }

  @computed('events.[]', 'group.events.[]')
  get remainingEvents() {
    return sortBy(this.events.toArray().filter(event => !this.group.events.toArray().includes(event)), ['startsAt']);
  }

  @computed('events.[]', 'group.events.[]')
  get pastEvents() {
    return sortBy(this.events.toArray().filter(event => { return moment(event.endsAt) < moment()}), ['startsAt']);
  }

  @computed('events.[]', 'group.events.[]')
  get upcomingEvents() {
    return sortBy(this.events.toArray().filter(event => { return moment(event.endsAt) > moment()}), ['startsAt']);
  }

  @action
  shareEvent() {}

  @action
  submit(event) {
    event.preventDefault();
    this.onValid(async() => {
      try {
        this.loading = true;
        await this.group.save();
        this.notify.success(this.l10n.t('Your group has been saved'),
          {
            id: 'group_save'
          });
        this.router.transitionTo('groups.list');
      } catch (e) {
        console.error('Error while saving group', e);
        this.errorHandler.handle(e);
      } finally {
        this.loading = false;
      }
    });
  }
}
