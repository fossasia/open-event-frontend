import Ember from 'ember';
import moment from 'moment';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.event_state')) {
      case 'live':
        return this.l10n.t('Live');
      case 'draft':
        return this.l10n.t('Draft');
      case 'past':
        return this.l10n.t('Past');
    }
  },
  beforeModel(transition) {
    this._super(...arguments);
    const eventState = transition.params[transition.targetName].event_state;
    if (!['live', 'draft', 'past'].includes(eventState)) {
      this.replaceWith('events.view', eventState);
    }
  },
  model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.event_state === 'live') {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'published'
        },
        {
          or: [
            {
              name : 'starts-at',
              op   : 'ge',
              val  : moment().toISOString()
            },
            {
              and: [
                {
                  name : 'starts-at',
                  op   : 'le',
                  val  : moment().toISOString()
                },
                {
                  name : 'ends-at',
                  op   : 'gt',
                  val  : moment().toISOString()
                }
              ]
            }
          ]
        }
      ];
    } else if (params.event_state === 'past') {
      filterOptions = [
        {
          name : 'ends-at',
          op   : 'lt',
          val  : moment().toISOString()
        },
        {
          name : 'state',
          op   : 'eq',
          val  : 'published'
        }
      ];
    } else {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'draft'
        }
      ];
    }

    return this.store.query('event', {
      include      : 'event-topic,event-sub-topic,event-type,tickets,sessions,speakers',
      filter       : filterOptions,
      'page[size]' : 10
    });
  }
});
