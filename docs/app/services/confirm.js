import Service from '@ember/service';
import { Promise as RSVPPromise } from 'rsvp';

export default Service.extend({
  isOpen         : false,
  pendingPromise : {
    resolve : null,
    reject  : null
  },

  prompt(promptText = 'Are you sure ?', options = {}) {
    return new RSVPPromise((resolve, reject) => {
      this.set('options', options);
      this.set('promptText', promptText);
      this.set('pendingPromise.resolve', resolve);
      this.set('pendingPromise.reject', reject);
      this.set('isOpen', true);
    });
  }
});
