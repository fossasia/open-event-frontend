import ApplicationSerializer from 'open-event-frontend/serializers/application';
import CustomPrimaryKeyMixin from 'open-event-frontend/mixins/custom-primary-key';

export default ApplicationSerializer.extend(CustomPrimaryKeyMixin, {

  primaryKey : 'attributes.identifier',
  attrs      : {
    type      : 'event-type',
    topic     : 'event-topic',
    subTopic  : 'event-sub-topic',
    copyright : 'event-copyright'
  },

  serialize() {
    const json = this._super(...arguments);
    try {
    delete json.data.relationships['general-statistics'];		
     delete json.data.relationships['order-statistics'];
 } catch(e){
 	console.error(e);
 	this.notify.error(this.l10n.t(e), {
        id: 'err_down'
      });
 }
    return json;
  }

});
