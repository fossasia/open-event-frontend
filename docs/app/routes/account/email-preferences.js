import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class EmailPreferencesRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken() {
    return this.l10n.t('Email Preferences');
  }

  model() {
    return this.authManager.currentUser.query('emailNotifications', { include: 'event' });
  }
}
