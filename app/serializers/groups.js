import ApplicationSerializer from 'open-event-frontend/serializers/application';

export default ApplicationSerializer.extend({

  attrs: {
    followers : 'user-follow-group',
    follower  : 'user-follow-group'
  }

});