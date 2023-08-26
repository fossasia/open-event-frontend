import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action } from '@ember/object';
import $ from 'jquery';

@classic
export default class AddTag extends Component {

  @action
  onSelectTag(tag_id) {
    $(this.element).find('input').trigger('blur');
    this.selectTag(tag_id);
  }
}
