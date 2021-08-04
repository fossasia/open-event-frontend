import Mixin from '@ember/object/mixin';
import { kebabCase } from 'open-event-frontend/utils/text';

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

  applySearchFilters(options, params, searchFields) {
    if (!Array.isArray(searchFields)) {
      searchFields = [searchFields];
    }
    let filters = options;
    if (searchFields.length > 1) {
      filters = [];
      options.pushObject({ or: filters });
    }
    for (let searchField of searchFields) {
      searchField = kebabCase(searchField);
      if (params.search) {
        filters.pushObject({
          name : searchField,
          op   : 'ilike',
          val  : `%${params.search}%`
        });
      } else {
        filters.removeObject({
          name : searchField,
          op   : 'ilike',
          val  : `%${params.search}%`
        });
      }
    }
    return options;
  },

  applySortFilters(query, params) {
    if (params.sort_by) {
      query.sort = (params.sort_dir === 'DSC' ? '-' : '') + params.sort_by;
    } else {
      delete query.sort;
    }
    return query;
  },

  /**
   * Convert the given ArrayProxy or Promise<ArrayProxy> to a native Array.
   *
   * @param promise
   * @return {Promise<Array>}
   */
  async asArray(promise) {
    const resolved = await promise;
    if (resolved.toArray) {
      return {
        data : resolved.toArray(),
        meta : resolved.meta
      };
    }
    return resolved;
  }


});
