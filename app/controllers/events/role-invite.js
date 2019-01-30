import Controller from '@ember/controller';

export default Controller.extend({
  success : false,
  error   : null,

  accept(id) {
    let payload = {
      data: {
        type       : 'role-invite',
        attributes : {
          status: 'accepted'
        },
        id
      }
    };
    return this.get('loader')
      .patch(`/role-invites/${id}`, JSON.stringify(payload), { skipDataTransform: true })
      .then(() => {
        this.set('success', true);
      })
      .catch(reason => {
        this.set('error', reason);
        this.set('success', false);
      });
  }
});
