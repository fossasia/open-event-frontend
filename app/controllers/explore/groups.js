import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class ExploreController extends Controller {
  queryParams = ['category', 'sub_category', 'event_type', 'start_date', 'end_date', 'location', 'ticket_type', 'cfs', 'name', 'is_online', 'is_location', 'is_mixed', 'has_logo', 'has_image', 'is_past'];
  name = null;
  is_online = null;
  is_location = null;
  is_mixed = null;
  is_past = null;
  has_logo = null;
  has_image = null;
  category = null;
  sub_category = null;
  event_type = null;
  start_date = null;
  end_date = null;
  location = null;
  ticket_type = null;
  cfs = null;

  @action
  shareEvent(event) {
    this.set('eventToShare', event);
    this.set('isShareModalOpen', true);
  }

  @action
  clearFilter(filterType) {
    if (filterType === 'name') {
      this.set('name', null);
    }
    if (filterType === 'is_online') {
      this.set('is_online', null);
    }
    if (filterType === 'is_location') {
      this.set('is_location', null);
    }
    if (filterType === 'is_mixed') {
      this.set('is_mixed', null);
    }
    if (filterType === 'has_logo') {
      this.set('has_logo', null);
    }
    if (filterType === 'has_image') {
      this.set('has_image', null);
    }
    if (filterType === 'is_past') {
      this.set('is_past', null);
    }
    if (filterType === 'start_date') {
      this.set('startDate', null);
    }
    if (filterType === 'end_date') {
      this.set('endDate', null);
    }
    if (filterType === 'category') {
      this.set('category', null);
    }
    if (filterType === 'sub_category') {
      this.set('sub_category', null);
    }
    if (filterType === 'event_type') {
      this.set('event_type', null);
    }
    if (filterType === 'location') {
      this.set('location', null);
    }
    if (filterType === 'ticket_type') {
      this.set('ticket_type', null);
    }
    if (filterType === 'cfs') {
      this.set('cfs', null);
    }
  }

  @action
  clearAllFilters() {
    this.setProperties({
      name         : null,
      category     : null,
      sub_category : null,
      event_type   : null,
      start_date   : null,
      end_date     : null,
      location     : null,
      ticket_type  : null,
      cfs          : null,
      is_online    : null,
      is_location  : null,
      is_mixed     : null,
      has_image    : null,
      has_logo     : null,
      is_past      : null
    });
  }
}
