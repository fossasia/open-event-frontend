import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
@classic
export default class CellVideoUrl extends Component {
@tracked taxModalIsOpen = false;
@action
openTaxModal() {
  this.set('taxModalIsOpen', true);
}
}
