import { helper } from '@ember/component/helper';
import { intersection } from 'lodash-es';

export  function ticketAttendees(params/* , hash*/) {

  const allTicketAttendees =  params[1].toArray();
  const orderAttendees = params[0].toArray();
  const commonAttendees =  intersection(orderAttendees, allTicketAttendees);
  return commonAttendees.length;

}

export default helper(ticketAttendees);
