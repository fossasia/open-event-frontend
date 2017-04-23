import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';

const { attr } = DS;

export default Fragment.extend({
  eventVer          : attr('string'),
  sessionsVer       : attr('string'),
  microlocationsVer : attr('string'),
  tracksVer         : attr('string'),
  speakersVer       : attr('string'),
  sponsorsVer       : attr('string')
});
