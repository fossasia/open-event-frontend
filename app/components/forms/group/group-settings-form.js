
import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import classic from 'ember-classic-decorator';
import FormMixin from 'open-event-frontend/mixins/form';

@classic
export default class GroupEventsForm extends Component.extend(FormMixin) {

  @service errorHandler;

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
        await this.group.save();
        this.notify.success(this.l10n.t('Your group settings have been saved'),
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
