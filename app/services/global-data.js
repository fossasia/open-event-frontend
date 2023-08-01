// app/services/global-data.js

import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class GlobalDataService extends Service {
  @tracked logoUrl = null;

  setLogoUrl(url) {
    this.logoUrl = url;
  }
}
