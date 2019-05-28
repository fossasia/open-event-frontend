import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

/**
 * Helper to execute an action after a confirmation dialog
 */
export default Helper.extend({
  confirm: service(),

  compute(params) {
    return () => {
      if (params.length >= 2) {
        this.confirm.prompt(params[0])
          .then(() => {
            params[1]();
          });
      } else {
        this.confirm.prompt()
          .then(() => {
            params[0]();
          });
      }
    };
  }
});
