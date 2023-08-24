import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action, computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

@classic
export default class AddTagForm extends Component.extend(FormMixin) {
  @service errorHandler;
  @tracked tagsDeleted = [];

  @computed('data.tags.@each.isDeleted', 'tagsDeleted.@each')
  get tagList() {
    return this.data.tags.filter(tag => !this.tagsDeleted.includes(tag));
  }

  willDestroyElement() {
    const tagsNeedRemove = [];
    this.data.tags.forEach(tag => {
      if (!tag.id) {
        tagsNeedRemove.pushObject(tag);
      } else {
        if (tag?.changedAttributes()) {
          tag.rollbackAttributes();
        }
      }
    });
    if (tagsNeedRemove.length > 0) {
      this.data.tags.removeObjects(tagsNeedRemove);
    }
    this._super(...arguments);
  }

  @action
  addItem() {
    this.data.tags.pushObject(this.store.createRecord('tag'));
  }

  @action
  removeItem(tag) {
    if (tag.id) {
      this.tagsDeleted.pushObject(tag);
    } else {
      this.data.tags.removeObject(tag);
    }
  }

  @action
  async submit() {
    try {
      this.data.tags.forEach(tag => {
        if (this.tagsDeleted.includes(tag)) {
          tag.deleteRecord();
        }
        tag.save();
      });
      this.notify.success(
        this.l10n.t('Your tag has been saved.'),
        { id: 'tag_save' }
      );
    } catch (error) {
      this.notify.error(
        this.l10n.t('Tag failed.'),
        { id: 'tag_save' }
      );
    }
  }
}
