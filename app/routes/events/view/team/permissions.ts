import Route from '@ember/routing/route';

export default class EventsViewTeamPermissions extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  titleToken(): string {
    return this.l10n.t('Permissions');
  }

  model() { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
    return {
      permissions: [
        {
          title  : this.l10n.t('Manage Events Page'),
          header : true
        },
        {
          title     : this.l10n.t('Show event on manage events page'),
          owner     : true,
          organizer : true
        },
        {
          title  : this.l10n.t('Overview'),
          header : true
        },
        {
          title     : this.l10n.t('Update/Edit event'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('View event dashboard'),
          owner     : true,
          organizer : true
        },
        {
          title  : this.l10n.t('Team'),
          header : true
        },
        {
          title     : this.l10n.t('View team members'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Invite team members'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Cancel invitations'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Delete team members'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Manage roles'),
          owner     : true,
          organizer : true
        },
        {
          title  : this.l10n.t('Tickets'),
          header : true
        },
        {
          title     : this.l10n.t('View orders and attendees'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Create discount codes'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Edit discount codes'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Create view codes'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Edit view codes'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Check-in attendees'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Change attendee check-in status'),
          owner     : true,
          organizer : true
        },
        {
          title  : this.l10n.t('Scheduler'),
          header : true
        },
        {
          title     : this.l10n.t('View scheduler'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Edit schedule'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Publish schedule'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Unpublish schedule'),
          owner     : true,
          organizer : true
        },
        {
          title  : this.l10n.t('Sessions and Speakers'),
          header : true
        },
        {
          title     : this.l10n.t('View speaker profiles'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Edit speaker profiles'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Create speaker profiles'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Feature speakers'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('View session submissions'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Edit session submissions'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Create sessions'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Change session status'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Notify speakers of status change'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('View ratings'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Rate session submissions'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Lock/Unlock session submissions'),
          owner     : true,
          organizer : true
        },
        {
          title  : this.l10n.t('Export'),
          header : true
        },
        {
          title     : this.l10n.t('View Export Info'),
          owner     : true,
          organizer : true
        },
        {
          title  : this.l10n.t('Settings'),
          header : true
        },
        {
          title     : this.l10n.t('View settings'),
          owner     : true,
          organizer : false
        },
        {
          title     : this.l10n.t('Delete event'),
          owner     : true,
          organizer : false
        },
        {
          title     : this.l10n.t('Transfer ownership'),
          owner     : true,
          organizer : false
        }
      ]
    };
  }
}
