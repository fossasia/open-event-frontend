import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

@classic
export default class CellTag extends Component {

  @computed('record')
  get attendeeTagName() {
    const tag = this.props?.options?.tags?.find(tag => parseInt(tag.id) === this.record);
    if (tag) {
      return htmlSafe(`<div class="ui inverted segment link" style="background-color: ${tag.color}; ">${tag.name}</div>`);
    }
    return '';
  }
}
