import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { inject as service } from '@ember/service';

@classic
export default class AddTagForm extends Component.extend(FormMixin) {
  @service errorHandler;

  @action
  addItem() {
    this.data.tags.addObject(this.store.createRecord('tag'));
  }

  @action
  removeItem(tag) {
    tag.deleteRecord();
  }

  @action
  async submit() {
    this.data.tags.forEach(tag => {
      tag.save();
    });
    this.notify.success(
      this.l10n.t('Your tag has been saved.'),
      { id: 'tag_save' }
    );
  }
}
