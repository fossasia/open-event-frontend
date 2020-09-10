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
          title  : 'Manage Events Page',
          header : true
        },
        {
          title     : 'Show event on manage events page',
          owner     : true,
          organizer : true
        },
        {
          title  : 'Overview',
          header : true
        },
        {
          title     : 'Update/Edit event',
          owner     : true,
          organizer : true
        },
        {
          title     : 'View event dashboard',
          owner     : true,
          organizer : true
        },
        {
          title  : 'Team',
          header : true
        },
        {
          title     : 'View team members',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Invite team members',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Cancel invitations',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Delete team members',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Manage roles',
          owner     : true,
          organizer : true
        },
        {
          title  : 'Tickets',
          header : true
        },
        {
          title     : 'View orders and attendees',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Create discount codes',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Edit discount codes',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Create view codes',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Edit view codes',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Check-in attendees',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Change attendee check-in status',
          owner     : true,
          organizer : true
        },
        {
          title  : 'Scheduler',
          header : true
        },
        {
          title     : 'View scheduler',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Edit schedule',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Publish schedule',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Unpublish schedule',
          owner     : true,
          organizer : true
        },
        {
          title  : 'Sessions and Speakers',
          header : true
        },
        {
          title     : 'View speaker profiles',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Edit speaker profiles',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Create speaker profiles',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Feature speakers',
          owner     : true,
          organizer : true
        },
        {
          title     : 'View session submissions',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Edit session submissions',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Create sessions',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Change session status',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Notify speakers of status change',
          owner     : true,
          organizer : true
        },
        {
          title     : 'View ratings',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Rate session submissions',
          owner     : true,
          organizer : true
        },
        {
          title     : 'Lock/Unlock session submissions',
          owner     : true,
          organizer : true
        },
        {
          title  : 'Export',
          header : true
        },
        {
          title     : 'View Export Info',
          owner     : true,
          organizer : true
        },
        {
          title  : 'Settings',
          header : true
        },
        {
          title     : 'View settings',
          owner     : true,
          organizer : false
        },
        {
          title     : 'Delete event',
          owner     : true,
          organizer : false
        },
        {
          title     : 'Transfer ownership',
          owner     : true,
          organizer : false
        }
      ]
    };
  }
}
