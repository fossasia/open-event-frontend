import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({

  speakers              : attr(''),
  sessions              : attr('number'),
  sessionsPending       : attr('number'),
  sponsors              : attr('number'),
  sessionsSubmitted     : attr('number'),
  sessionsRejected      : attr('number'),
  sessionsConfirmed     : attr('number'),
  sessionsWithdrawn     : attr('number'),
  sessionsCanceled      : attr('number'),
  identifier            : attr('string'),
  sessionsAccepted      : attr('number'),
  sessionsDraft         : attr('number'),
  speakerWithoutSession : attr('number'),
  event                 : belongsTo('event')
});
