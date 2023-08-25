import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

@classic
export default class CellTag extends Component {
  didInsertElement() {
    this._super(...arguments);
    this.$('.removeTag').on('click', () => { this.removeTag() });
  }

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
      return htmlSafe(
        `<div class="ui inverted segment link" style="background-color: ${tag.color}; display: inline-flex">
          <div>${tag.name}</div>
          <i class="close icon removeTag"}}></i>
        </div>`
      );
    }
    return '';
  }
}
