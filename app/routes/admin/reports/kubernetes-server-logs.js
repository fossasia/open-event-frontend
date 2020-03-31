import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class KubernetesServerLogsRoute extends Route {
  titleToken() {
    return this.l10n.t('Kubernetes Server Logs');
  }
}
