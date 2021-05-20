import { helper } from '@ember/component/helper';

export function preventBubbling([action]) {
  return function(event) {
    event.stopPropagation();
    return action(event);
  };
}
export default helper(preventBubbling);
