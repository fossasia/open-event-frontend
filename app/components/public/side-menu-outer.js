import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
export default class SideMenuOuter extends Component {

  activeSection = null;

  activeMenuSection = this.activeSection;

  @computed('session.currentRouteName')
  get activeMenu() {
    const { currentRouteName } = this.session;
    if (currentRouteName === 'public.index' || currentRouteName === 'index') {
      return this.l10n.t('Info');
    } else if (currentRouteName === 'public.sessions') {
      return this.l10n.t('Schedule');
    } else if (currentRouteName === 'public.schedule') {
      return this.l10n.t('Calendar');
    } else if (currentRouteName === 'public.speakers') {
      return this.l10n.t('Speakers');
    } else if (currentRouteName === 'public.cfs.index') {
      return this.l10n.t('Call for Speakers');
    } else if (currentRouteName === 'public.coc') {
      return this.l10n.t('Code of Conduct');
    } else {
      return this.l10n.t('Select section');
    }
  }
}
