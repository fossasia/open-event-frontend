import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class SessionDocuments extends Component {

@service session;

@tracked currDoc = this.args.session?.slides[0].link;

  @action
refreshSlide() {
  if (document.getElementById('googleFrame')) {
    document.getElementById('googleFrame').src += '';
  }
}

  @action
  selectedDocument(doc) {
    this.currDoc = doc;
    this.refreshSlide();
  }
}
