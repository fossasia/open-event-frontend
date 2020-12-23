import Helper from '@ember/component/helper';

export default Helper.helper(function(items: string[]): string {
  return items[items.length * Math.random() | 0];
});
