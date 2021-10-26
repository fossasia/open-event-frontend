import ApplicationSerializer from 'open-event-frontend/serializers/application';
import CustomPrimaryKeyMixin from 'open-event-frontend/mixins/custom-primary-key';

export default ApplicationSerializer.extend(CustomPrimaryKeyMixin, {

  primaryKey : 'attributes.identifier',
  attrs      : {
    followers   : 'user-follow-group',
    follower    : 'user-follow-group',
    socialLinks : 'social-links'
  },

  serialize() {
    const json = this._super(...arguments);

    const { relationships } = json.data;

    try {
      delete relationships.follower;
    } catch {} // eslint-disable-line no-empty

    try {
      delete relationships.followers;
    } catch {} // eslint-disable-line no-empty

    try {
      delete relationships['social-links'];
    } catch {} // eslint-disable-line no-empty


    return json;

  }
});
