
import Component from '@ember/component';
import { action } from '@ember/object';
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
  addSocialLink(type) {
    const { group } = this;
    if (!group.socialLinks) {
      group.socialLinks = [];
    }
    if (type === 'customLink') {
      group.socialLinks = [...group.socialLinks, { name: '', link: '', is_custom: true }];
    } else {
      group.socialLinks = [...group.socialLinks, { name: '', link: '', is_custom: false }];
    }
  }

  @action
  removeSocialLink(link) {
    const { group } = this;
    group.socialLinks = group.socialLinks.filter(sl => sl !== link);
  }

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
        this.notify.success(this.l10n.t('Your group settings have been saved'),
          {
            id: 'group_save'
          });
        this.router.transitionTo('groups.edit.events', this.group.id);
      } catch (e) {
        console.error('Error while saving group', e);
        this.errorHandler.handle(e);
      } finally {
        this.loading = false;
      }
    });
  }
}
