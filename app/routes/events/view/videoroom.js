import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class SpeakersRoute extends Route {
  titleToken() {
    return this.l10n.t('Microlocation');
  }

  model() {
    return this.modelFor('events.view');
  }
}
