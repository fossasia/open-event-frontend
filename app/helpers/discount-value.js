import Helper from '@ember/component/helper';

export async function discountValue(params) {
  let [attendee] = params;
  let ticket = await attendee.ticket;
  let order = await attendee.order;
  if (ticket && order) {
    let discountCode = await order.discountCode;
    if (discountCode) {
      let discountCodeTickets = await discountCode.tickets;
      if (discountCodeTickets && discountCodeTickets.includes(ticket)) {
        let { value } = discountCode;
        if (discountCode.type === 'amount') {
          return value;
        } else {
          return (ticket.price * value) / 100;
        }
      }
    }
  }
  return 0;
}

export default Helper.helper(discountValue);
