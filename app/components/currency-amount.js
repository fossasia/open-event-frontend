import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

const locales = {
  'de'      : 'de-DE',
  'zh_Hans' : 'zh-CN',
  'zh_Hant' : 'zh-TW'
};

const currencyCode = {
  'bn'      : 'INR',
  'de'      : 'DEM',
  'en'      : 'USD',
  'es'      : 'EUR',
  'fr'      : 'EUR',
  'hi'      : 'INR',
  'id'      : 'IDR',
  'ja'      : 'JPY',
  'pl'      : 'PLN',
  'ru'      : 'RUB',
  'th'      : 'THB',
  'vi'      : 'VND',
  'zh_Hans' : 'CNY',
  'zh_Hant' : 'CNY',
  'ko'      : 'KPW'
};

@classic
export default class CurrencyAmount extends Component {

    @service l10n;

    @computed('amount')
    get modifiedAmount() {
      const resolvedLocale = new Intl.NumberFormat().resolvedOptions().locale;
      let currentLocale = 'en';
      if (resolvedLocale === 'en-US') {
        currentLocale = this.l10n.getLocale();
      }
      return (this.amount)?.toLocaleString(locales[currentLocale] ?? resolvedLocale, { style: 'currency', currency: currencyCode[currentLocale], minimumFractionDigits: 2 });
    }
}
