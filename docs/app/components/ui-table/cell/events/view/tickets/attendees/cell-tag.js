import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { htmlSafe } from '@ember/string';

@classic
export default class CellTag extends Component {
  didInsertElement() {
    this._super(...arguments);
  }

  @action
  removeTag() {
    const attendee = this.props.row;
    if (attendee) {
      attendee.set('tagId', '');
      attendee.save();
    }
  }

  @computed('record')
  get attendeeTagName() {
    const tag = this.props?.options?.tags?.find(tag => parseInt(tag.id) === this.record);
    if (tag) {
      return tag.name;
    }
    return '';
  }

  @computed('record')
  get attendeeTagColor() {
    const tag = this.props?.options?.tags?.find(tag => parseInt(tag.id) === this.record);
    if (tag) {
      return htmlSafe('background-color:' + tag.color + '; display: inline-flex');
    }
    return '';
  }
}
