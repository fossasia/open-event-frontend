import { computed } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

const locales = {
  'de'      : 'de-DE',
  'zh_Hans' : 'zh-CN',
  'zh_Hant' : 'zh-TW'
};

export default class CurrencyAmount extends Component {

    @service l10n;

    @computed('amount', 'currency')
    get modifiedAmount() {
      const resolvedLocale = new Intl.NumberFormat().resolvedOptions().locale;
      let currentLocale = 'en';
      if (resolvedLocale === 'en-US') {
        currentLocale = this.l10n.getLocale();
      }
      return (this.amount)?.toLocaleString(locales[currentLocale] ?? resolvedLocale, { style: 'currency', currency: this.currency, minimumFractionDigits: 2 });
    }
}
