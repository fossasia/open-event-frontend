import { filterBy } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Controller.extend({

  featuredSpeakers: filterBy('model.speakers', 'isFeatured', true),

  nonFeaturedSpeakers: filterBy('model.speakers', 'isFeatured', false),

  htmlSafeDescription: computed('model.event.description', function() {
    return htmlSafe(this.get('model.event.description'));
  }),

  actions: {
    async save() {
      try {
        this.set('isLoading', true);
        let order = this.get('model.order');
        let attendees = this.get('model.attendees');
        for (const attendee of attendees ? attendees.toArray() : []) {
          await attendee.save();
        }
        order.set('attendees', attendees);
        await order.save()
          .then(order => {
            this.get('notify').success(this.get('l10n').t('Order details saved. Please fill further details within 10 minutes.'));
            this.transitionToRoute('orders.new', order.identifier);
          })
          .catch(async e => {
            for (const attendee of attendees ? attendees.toArray() : []) {
              await attendee.destroyRecord();
            }
            this.get('notify').error(this.get('l10n').t(e.errors[0].detail));
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      } catch (e) {
        this.get('notify').error(this.get('l10n').t(e));
      }
    }
  }

});
