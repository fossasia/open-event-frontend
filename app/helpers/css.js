import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { forOwn } from 'lodash-es';
import { htmlSafe } from '@ember/string';

export default Helper.extend({
  sanitizer: service(),

  compute(params, hash) {
    let style = '';
    forOwn(hash, (value, key) => {
      style += `${key}: ${value};`;
    });
    return htmlSafe(this.sanitizer.strip(style));
  }
});
