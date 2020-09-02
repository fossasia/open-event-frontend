import Helper from '@ember/component/helper';

export function canModifyOrder(params) {
  const [order] = params;
  if ((order.amount !== null && order.amount > 0) || (order.discountCodeId !== null)) {
    // returns false if order is paid or discounted and completed
    return order.status !== 'completed';
  }
  // returns true for free ticket
  return true;
}

export default Helper.helper(canModifyOrder);
