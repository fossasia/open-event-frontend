import Mixin from '@ember/object/mixin';

export default Mixin.create({
  queryParams: {
    page: {
      refreshModel: true
    },
    per_page: {
      refreshModel: true
    },
    search: {
      refreshModel: true
    },
    sort_dir: {
      refreshModel: true
    },
    sort_by: {
      refreshModel: true
    }
  },

  applySearchFilters(options, params, searchField) {
    if (params.search) {
      options.pushObject({
        name : searchField,
        op   : 'ilike',
        val  : `%${params.search}%`
      });
    } else {
      options.removeObject({
        name : searchField,
        op   : 'ilike',
        val  : `%${params.search}%`
      });
    }
    return options;
  },

  applySortFilters(query, params) {
    if (params.sort_by && params.sort_dir) {
      query.sort = `${params.sort_dir === 'ASC' ? '-' : ''}${params.sort_by}`;
    } else {
      delete query.sort;
    }
    return query;
  }


});
