import Component from '@ember/component';
import { computed } from '@ember/object';

export default class extends Component {
  @computed('sorts.@each.isAscending', 'sortDir')
  get sortIcon() {
    if (this.sorts && this.sorts[0] && this.sorts[0].valuePath === this.column.valuePath) {
      this.set('sortDirection', this.sorts[0].isAscending ? 'ASC' : 'DES');
      if (this.sorts[0].isAscending) {
        // support got sort up, sort down to come with next release of semantic-ui-ember
        return 'caret up';
      } else {
        return 'caret down';
      }
    }
    return 'sort';
  }


  didInsertElement() {
    super.didInsertElement(...arguments);
    if (this.sorts && this.sorts[0] && this.sorts[0].valuePath === this.column.valuePath) {
      this.setProperties({
        sortBy  : this.sorts[0].valuePath,
        sortDir : this.sorts[0].isAscending ? 'ASC' : 'DSC'
      });

    } else {
      this.setProperties({
        sortBy  : null,
        sortDir : null
      });
    }
  }
}
