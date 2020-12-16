import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class CellStreamUrl extends Component {
  @service router;

  get link() {
    const { record, extraRecords } = this.args;
    return this.router.urlFor('public.stream.view', extraRecords.identifier || extraRecords.event.get('identifier'), record.get('slugName'), record.get('id'));
  }

  get streamUrl() {
    return window.location.host + this.link;
  }
}
