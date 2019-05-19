import { helper } from '@ember/component/helper';
import { intersection } from 'lodash-es';

export  function ticketAttendees(params/* , hash*/) {

  let allTicketAttendees =  params[1].toArray();
  let orderAttendees = params[0].toArray();
  let commonAttendees =  intersection(orderAttendees, allTicketAttendees);
  return commonAttendees.length;

}

export default helper(ticketAttendees);
