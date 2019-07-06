import Mixin from '@ember/object/mixin';

export default Mixin.create({
  queryParams : ['page', 'per_page', 'search', 'sort_dir', 'sort_by'],
  page        : 1,
  per_page    : 10,
  search      : null,
  sort_dir    : null,
  sort_by     : null,
  sorts       : []
});
