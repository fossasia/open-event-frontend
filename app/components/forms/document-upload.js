import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { inject as service } from '@ember/service';

@classic
export default class DocumentUpload extends Component.extend(FormMixin) {

  @service errorHandler;

  @action
  removeDocument(document) {
    this.event.documentLinks = this.event.documentLinks.filter(dl => dl !== document);
  }

  @action
  addEventDocument() {
    this.event.documentLinks = [...this.event.documentLinks, { name: '', link: '' }];
  }

  @action
  submit(event) {
    event.preventDefault();
    this.onValid(async() => {
      try {
        await this.event.save();
        this.notify.success(this.l10n.t('Document updated successfully'),
          {
            id: 'doc_upd_succ'
          });
      } catch (error) {
        console.error('error while saving document', error);
        this.errorHandler.handle(error);
      }
    });
  }

}
