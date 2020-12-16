import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

const locales = {
  'de'      : 'de-DE',
  'zh_Hans' : 'zh-CN',
  'zh_Hant' : 'zh-TW'
};

export default Helper.extend({
  l10n: service(),

  compute(params) {
    const x = new Intl.NumberFormat().resolvedOptions().locale;
    let currentLocale = 'en';
    if (x === 'en-US') {
      currentLocale = this.l10n.getLocale();
    }
    return (params[0])?.toLocaleString(locales[currentLocale] ? locales[currentLocale] : x);
  }
});
