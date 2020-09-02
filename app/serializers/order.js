import ApplicationSerializer from 'open-event-frontend/serializers/application';
import CustomPrimaryKeyMixin from 'open-event-frontend/mixins/custom-primary-key';

export default ApplicationSerializer.extend(CustomPrimaryKeyMixin, {

  primaryKey: 'attributes.identifier',

  normalize() {
    const payload = this._super(...arguments);
    payload.data = this.addLinks(payload.data);
    return payload;
  },

  addLinks(order) {
    order.relationships.attendees = {
      links: {
        related : `/v1/orders/${order.id}/attendees`,
        self    : `/v1/orders/${order.id}/attendees`
      }
    };
    order.relationships.tickets = {
      links: {
        related : `/v1/orders/${order.id}/tickets`,
        self    : `/v1/orders/${order.id}/tickets`
      }
    };
    order.relationships.event = {
      links: {
        related : `/v1/orders/${order.id}/event`,
        self    : `/v1/orders/${order.id}/event`
      }
    };
    return order;
  },

  serialize(snapshot) {
    const json = this._super(...arguments);
    const attendeeSnapshots = snapshot._hasManyRelationships.attendees;
    const attendees = { data: [] };
    if (attendeeSnapshots) {
      attendeeSnapshots.forEach(function(snapshot) {
        attendees.data.push({
          type : 'attendee',
          id   : snapshot.id
        });
      });
    }
    json.data.relationships.attendees = attendees;
    return json;
  }
});
