import Controller from '@ember/controller';

export default class extends Controller {

  @computed('speaker.isAuthenticated', 'authManager.currentUser.email', 'authManager.currentUser.isAdmin', 'model.speakers')
  get showEditSection() {
    return this.session.isAuthenticated && (this.authManager.currentUser.isAdmin || this.model.email === this.authManager.currentUser.email);
  }
}
