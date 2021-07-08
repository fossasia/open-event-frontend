
import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import classic from 'ember-classic-decorator';
import FormMixin from 'open-event-frontend/mixins/form';

@classic
export default class GroupEventsForm extends Component.extend(FormMixin) {

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
    return this.events.toArray().filter(event => !this.group.events.toArray().includes(event));
  }

  @action
  shareEvent() {}

  @action
  submit(event) {
    event.preventDefault();
    this.onValid(async() => {
      try {
        this.loading = true;
        /* For the first save throws an error -> field may not be null, as social links are added in group-settings-form
        Hence, passing an empty array. */
        if (!this.group.socialLinks) {
          this.group.socialLinks = [];
        }
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
