import Component from '@ember/component';
import { computed } from '@ember/object';
import { orderBy, groupBy } from 'lodash-es';

export default Component.extend({
  sponsorsGrouped: computed('sponsors.[]', function() {
    return groupBy(
      orderBy(
        this.sponsors.toArray(),
        sponsor => sponsor.get('level')
      ),
      sponsor => sponsor.get('type')
    );
  })
});
