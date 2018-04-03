import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  queryParams  : ['category', 'sub_category', 'event_type', 'date_range'],
  category     : null,
  sub_category : null,
  event_type   : null,
  date_range   : null,

  categoryFilter: computed('category', function() {
    return EmberObject.create(
      {
        name : 'event-topic',
        op   : 'has',
        val  : {
          name : 'name',
          op   : 'eq',
          val  : this.get('category')
        }
      }
    );
  }),

  subCategoryFilter: computed('sub_category', function() {
    return EmberObject.create(
      {
        name : 'event-sub-topic',
        op   : 'has',
        val  : {
          name : 'slug',
          op   : 'eq',
          val  : this.get('sub_category')
        }
      }
    );
  }),

  typeFilter: computed('event_type', function() {
    return EmberObject.create(
      {
        name : 'event-type',
        op   : 'has',
        val  : {
          name : 'name',
          op   : 'eq',
          val  : this.get('event_type')
        }
      }
    );
  }),

  filterOptions: [
    {
      name : 'starts-at',
      op   : 'ge',
      val  : moment().toISOString()
    },
    {
      name : 'state',
      op   : 'eq',
      val  : 'published'
    }
  ],

  filteredEvents: computed('category', 'sub_category', 'event_type', 'date_range',  function() {
    let category = this.get('category');
    let subCategory = this.get('sub_category');
    let eventType = this.get('event_type');
    let filterOptions = this.get('filterOptions').slice(0, 2);

    if (category) {
      filterOptions.pushObject(this.get('categoryFilter'));

      if (subCategory) {
        this.get('filterOptions').pushObject(this.get('subCategoryFilter'));
      }
    }

    if (eventType) {
      this.get('filterOptions').pushObject(this.get('typeFilter'));
    }

    return this.get('store').query('event', {
      sort   : 'starts-at',
      filter : filterOptions
    });

  }),
  actions: {
    shareEvent(event) {
      this.set('eventToShare', event);
      this.set('isShareModalOpen', true);
    }
  }
});
