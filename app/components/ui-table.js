import TableComponent from 'ember-models-table/components/models-table-server-paginated';
import layout from 'open-event-frontend/templates/components/ui-table';
import Semantic from 'open-event-frontend/themes/semantic';

export default TableComponent.extend({
  'pageSize': 10,
  layout,

  themeInstance: Semantic.create(),

  useFilteringByColumns: false
});
