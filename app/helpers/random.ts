import Helper from '@ember/component/helper';

export default Helper.helper(function(items: string[]): string {
  if (Array.isArray(items[0])) {
    items = items[0];
  }
  return items[items.length * Math.random() | 0];
});
