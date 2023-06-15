import { computed } from '@ember/object';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import moment from 'moment';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default ModelBase.extend({

  /**
   * Attributes
   */
  formID                 : attr('string'),
    

  /**
   * Relationships
   */
  event             : belongsTo('event'),
  ticket            : hasMany('ticket'),


 
});
