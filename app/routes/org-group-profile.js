import Route from '@ember/routing/route';

export default class OrgGroupProfile extends Route.extend() {
  titleToken() {
    return this.l10n.t('OrgGroupProfile');
  }
  // normal class body definition here
}

