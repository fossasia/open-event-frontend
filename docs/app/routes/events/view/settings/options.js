import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class OptionsRoute extends Route {
  titleToken() {
    return this.l10n.t('Options');
  }

  beforeModel() {
    const { currentUser } = this.authManager;
    if (!(currentUser.isAnAdmin || this.modelFor('events.view').owner.get('email') === currentUser.email)) {
      this.transitionTo('events.view');
    }
  }

  async model() {
    const filterOptions = [
      {
        and: [
          {
            name : 'role-name',
            op   : 'eq',
            val  : 'owner'
          },
          {
            name : 'status',
            op   : 'eq',
            val  : 'pending'
          }
        ]
      }
    ];
    const eventDetails = this.modelFor('events.view');
    return hash({
      event       : eventDetails,
      roleInvites : eventDetails.query('roleInvites', {
        filter: filterOptions
      }),
      roles: this.store.findAll('role')
    });
  }
}
