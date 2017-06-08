import Ember from 'ember';
import { amazonS3Regions } from 'open-event-frontend/utils/dictionary/amazon-s3-regions';
import { orderBy } from 'lodash';

const { Component, computed } = Ember;

export default Component.extend({
  regions: computed(function() {
    return orderBy(amazonS3Regions);
  })
});
