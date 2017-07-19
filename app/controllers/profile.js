import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    updateUser() {
      let user = this.get('model');
      user.save()
        .then(userData => {
          this.set('isLoading', false);
          let data = userData.serialize(false).data.attributes;
          data.id = userData.get('id');
          this.get('session').set('data.currentUserFallback', data);
          this.get('notify').success('Your profile has been updated');
        })
        .catch(() => {
          this.set('isLoading', false);
          this.get('authManager.currentUser').rollbackAttributes();
          this.get('notify').error('An unexpected error occurred');
        });
    }
  }
});
