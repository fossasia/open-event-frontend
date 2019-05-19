import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';

/**
 * Helper to sanitize a HTML string
 */
export default Helper.extend({
  sanitizer: service(),

  compute(params) {
    return htmlSafe(this.sanitizer.purify(params[0]));
  }
});
