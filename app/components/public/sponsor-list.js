import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { orderBy, groupBy } from 'lodash-es';

@classic
export default class SponsorList extends Component {
  @computed('sponsors.[]')
  get sponsorsGrouped() {
    return groupBy(
      orderBy(
        this.sponsors.toArray(),
        sponsor => sponsor.get('level')
      ),
      sponsor => sponsor.get('type')
    );
  }
}
