import Helper from '@ember/component/helper';

export function canModifyOrder(params) {
  let [order] = params;
  if (order.amount !== null && order.amount >= 0) {
    // returns false if order is paid and completed
    return order.status !== 'completed';
  }
  // returns true for free ticket
  return true;
}

export default Helper.helper(canModifyOrder);
