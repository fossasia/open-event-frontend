import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

@classic
export default class IndexController extends Controller {

  @tracked
  frontendProductionVersion = '';

  @tracked
  serverProductionVersion = '';

  @tracked
  frontendTestingVersion = '';

  @tracked
  serverTestingVersion = '';

  @action
  async setup() {
    const fPVersion = await this.loader.load('https://api.github.com/repos/fossasia/open-event-frontend/git/refs/heads/master', { isExternal: true });
    this.frontendProductionVersion = fPVersion.object?.sha;
    const bPVersion = await this.loader.load('https://api.github.com/repos/fossasia/open-event-server/git/refs/heads/master', { isExternal: true });
    this.serverProductionVersion = bPVersion.object?.sha;
    const fTVersion = await this.loader.load('https://api.github.com/repos/fossasia/open-event-frontend/git/refs/heads/development', { isExternal: true });
    this.frontendTestingVersion = fTVersion.object?.sha;
    const bTVersion = await this.loader.load('https://api.github.com/repos/fossasia/open-event-server/git/refs/heads/development', { isExternal: true });
    this.serverTestingVersion = bTVersion.object?.sha;
  }
}

