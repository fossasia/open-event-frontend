import Ember from 'ember';
const { Helper, inject: { service }, String } = Ember;

/**
 * Helper to sanitize a HTML string
 */
export default Helper.extend({
  sanitizer: service(),

  compute(params) {
    return String.htmlSafe(this.get('sanitizer').purify(params[0]));
  }
});
