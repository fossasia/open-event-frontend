import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
export default class SideMenu extends Component {

  activeSection = null;

  activeMenuSection = this.activeSection;

  @computed('session.currentRouteName')
  get activeMenu() {
    const { currentRouteName } = this.session;
    if (currentRouteName === 'public.index' || currentRouteName === 'index') {
      return 'Info';
    } else if (currentRouteName === 'public.sessions') {
      return 'Schedule';
    } else if (currentRouteName === 'public.schedule') {
      return 'Calendar';
    } else if (currentRouteName === 'public.speakers') {
      return 'Speakers';
    } else if (currentRouteName === 'public.cfs.index') {
      return 'Call for Speakers';
    } else if (currentRouteName === 'public.coc') {
      return 'Code of Conduct';
    } else {
      return 'Select section';
    }
  }
}

