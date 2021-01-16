import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

const locales = {
  'de'      : 'de-DE',
  'zh_Hans' : 'zh-CN',
  'zh_Hant' : 'zh-TW'
};

export default class CurrencyAmount extends Component {

    @service l10n;

    get modifiedAmount() {
      const resolvedLocale = new Intl.NumberFormat().resolvedOptions().locale;
      let currentLocale = 'en';
      if (resolvedLocale === 'en-US') {
        currentLocale = this.l10n.getLocale();
      }
      if (!this.args.amount || !this.args.currency || this.args.amount <= 0) {
        return '0.00';
      }
      return (this.args.amount)?.toLocaleString(locales[currentLocale] ?? resolvedLocale, { style: 'currency', currency: this.args.currency, minimumFractionDigits: 2 });
    }
}
