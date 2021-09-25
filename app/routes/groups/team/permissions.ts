import Route from '@ember/routing/route';

export default class GroupsTeamPermissions extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  // normal class body definition here
  titleToken(): string {
    return this.l10n.t('Permissions');
  }

  model() { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
    return {
      permissions: [
        {
          title  : this.l10n.t('Events Page'),
          header : true
        },
        {
          title     : this.l10n.t('Add event to group events page'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Remove event from group events page'),
          owner     : true,
          organizer : true
        },
        {
          title  : this.l10n.t('Followers'),
          header : true
        },
        {
          title     : this.l10n.t('View Followers List'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Export list as CSV'),
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
          organizer : false
        },
        {
          title     : this.l10n.t('Manage roles'),
          owner     : true,
          organizer : false
        },
        {
          title  : this.l10n.t('Settings'),
          header : true
        },
        {
          title     : this.l10n.t('View/Change Group Settings'),
          owner     : true,
          organizer : true
        },
        {
          title     : this.l10n.t('Delete Group'),
          owner     : true,
          organizer : false
        },
        {
          title     : this.l10n.t('Restore Group'),
          owner     : true,
          organizer : false
        }
      ]
    };
  }
}
