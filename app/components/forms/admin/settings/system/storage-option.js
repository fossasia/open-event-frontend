import Component from '@ember/component';
import { computed } from '@ember/object';
import { amazonS3Regions } from 'open-event-frontend/utils/dictionary/amazon-s3-regions';
import { orderBy } from 'lodash-es';

export default Component.extend({
  regions: computed(function() {
    return orderBy(amazonS3Regions);
  })
});
