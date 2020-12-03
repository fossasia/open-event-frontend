import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({

  speakers          : attr('number'),
  sessions          : attr('number'),
  sessionsPending   : attr('number'),
  sponsors          : attr('number'),
  sessionsSubmitted : attr('number'),
  sessionsRejected  : attr('number'),
  sessionsConfirmed : attr('number'),
  sessionsWithdrawn : attr('number'),
  sessionsCanceled  : attr('number'),
  identifier        : attr('string'),
  sessionsAccepted  : attr('number'),
  sessionsDraft     : attr('number'),
  speakersAccepted  : attr('number'),
  speakersConfirmed : attr('number'),
  speakersPending   : attr('number'),
  speakersRejected  : attr('number'),
  speakersWithdrawn : attr('number'),
  speakersCanceled  : attr('number'),
  event             : belongsTo('event')
});
