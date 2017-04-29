import Ember from 'ember';
import { forOwn } from 'lodash';
const { Helper, inject: { service }, String } = Ember;

export default Helper.extend({
  sanitizer: service(),

  compute(params, hash) {
    let style = '';
    forOwn(hash, (value, key) => {
      style += `${key}: ${value};`;
    });
    return String.htmlSafe(this.get('sanitizer').strip(style));
  }
});
