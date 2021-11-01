import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

@classic
export default class IndexController extends Controller {

@tracked
frontendVersion = '';

@tracked
serverVersion = '';

@action
async setup() {
const fVersion = await this.loader.load('https://api.github.com/repos/fossasia/open-event-frontend/git/refs/heads/development', { isExternal: true });
this.frontendVersion = fVersion.object?.sha;
const bVersion = await this.loader.load('https://api.github.com/repos/fossasia/open-event-server/git/refs/heads/development', { isExternal: true });
this.serverVersion = bVersion.object?.sha;
}
}

