import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { kebabCase } from 'lodash-es';

@classic
export default class Sort extends Component {
  @computed('sorts.@each.isAscending', 'sortDir')
  get sortIcon() {
    if (this.sorts && this.sorts[0] && this.sorts[0].valuePath === this.column.valuePath) {
      if (this.sorts[0].isAscending) {
        // support for sort up, sort down to come with next release of semantic-ui-ember
        return 'caret up';
      } else {
        return 'caret down';
      }
    }
    else {
      //default sorting for starts-at column
      if(kebabCase(this.column.valuePath)=='starts-at'){
        return 'caret down';
      }
    }
    return 'sort';
  }


  didInsertElement() {
    super.didInsertElement(...arguments);
    if (this.sorts && this.sorts[0] && this.sorts[0].valuePath === this.column.valuePath) {
      this.setProperties({
        sortBy  : kebabCase(this.sorts[0].valuePath), // Ensures field names are server compatible with sort
        sortDir : this.sorts[0].isAscending ? 'ASC' : 'DSC'
      });

    } else {
      // avoid resetting the query params, when sorts is  uninitialised
      if (this.sorts && !this.sorts[0]) {
        this.setProperties({
          sortBy  : null,
          sortDir : null
        });
      }
      else {
        //default sorting for starts-at
        this.setProperties({
          sortBy  : 'starts-at',
          sortDir : 'DSC'
        });
      }
    }
  }
}
