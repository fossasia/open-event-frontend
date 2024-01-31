import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import Component from '@ember/component';
import { orderBy } from 'lodash-es';

@classic
export default class BillingInfo extends Component {
  @computed
  get countries() {
    return orderBy(countries, 'name');
  }
}
