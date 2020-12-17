import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

/**
 * Helper to execute an action after a confirmation dialog
 */
export default Helper.extend({
  confirm: service(),

  compute(params) {
    const { confirm } = this;
    return function() {
      if (params.length >= 6) {
        confirm.prompt('Are You Sure?', { 'denyText': params[2], 'approveText': params[3], 'denyColor': params[4], 'approveColor': params[5], 'extra': params[0] })
          .then(() => {
            params[1](...arguments);
          });
      } else if (params.length >= 2) {
        confirm.prompt(params[0])
          .then(() => {
            params[1](...arguments);
          });
      } else {
        confirm.prompt()
          .then(() => {
            params[0](...arguments);
          });
      }
    };
  }
});
