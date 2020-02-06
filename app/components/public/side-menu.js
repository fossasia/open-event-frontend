import $ from 'jquery';
import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  async didInsertElement() {
    this._super(...arguments);
    let speakersCall = await this.get('event.speakersCall');
    this.set('shouldShowCallforSpeakers',
      speakersCall && speakersCall.announcement && (speakersCall.privacy === 'public'));
  },
  actions: {
    scrollToTarget() {
      document.querySelectorAll('.scroll').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
          $('.scroll').each(function() {
            $(this).removeClass('active');
          });
          $(this).addClass('active');
        });
      });
    }
  },
  isSchedulePublished: computed('event.schedulePublishedOn', function() {
    return this.get('event.schedulePublishedOn') && this.get('event.schedulePublishedOn').toISOString() !== moment(0).toISOString();
  })
});
