import Controller from '@ember/controller';
import { computed } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {
	@computed()
	get columns() {
		return [
		{
			name : 'Recipients',
			valuePath : 'recipient'
		},
		{
			name : 'Trigger',
			valuePath : 'action'
		},
		{
			name : 'Email Message',
			valuePath : 'emailMessage',
		
			cellComponent : 'ui-table/cell/cell-title-message',
			options : {
				subject : 'emailSubject',
				message : 'emailMessage'
			}
		},
		{
			name : 'Notification Message',
			valuePath : 'notificationMessage',
      cellComponent : 'ui-table/cell/cell-title-message',
      options : {
      	subject  : 'notificationSubject',
      	message  : 'notificationMessage'
      }
		},
		{
			name : 'Options',
			valuePath : 'option',
			cellComponent : 'ui-table/cell/admin/messages/cell-options'
		},
		{
			name : 'Time/Date Sent Out',
			valuePath : 'sentAt',
			cellComponent : 'ui-table/cell/cell-simple-date',
			options  :  {
				dateFormat: 'MMMM DD, YYYY - HH:mm A'
			}
		}

		];
	}
}
  
  