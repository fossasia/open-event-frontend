import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

const locales = {
  'en'      : 'en',
  'hi'      : 'hi',
  'bn'      : 'bn',
  'de'      : 'de-DE',
  'es'      : 'es',
  'id'      : 'id',
  'pl'      : 'pl',
  'ja'      : 'ja',
  'ru'      : 'ru',
  'th'      : 'th',
  'vi'      : 'vi',
  'zh_Hans' : 'zh-CN',
  'zh_Hant' : 'zh-TW',
  'ko'      : 'ko'
};

export default Helper.extend({
  l10n: service(),

  compute(params) {
    const x = new Intl.NumberFormat().resolvedOptions().locale;
    let currentLocale = 'en';
    if (x === 'en-US') {
      currentLocale = this.l10n.getLocale();
    }

    return (params[0])?.toLocaleString(locales[currentLocale]);
  }
});
