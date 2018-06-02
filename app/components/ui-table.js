import TableComponent from 'ember-models-table/components/models-table';
import layout from 'open-event-frontend/templates/components/ui-table';
import Semantic from 'open-event-frontend/themes/semantic';

export default TableComponent.extend({
  layout,

  themeInstance: Semantic.create(),

  useFilteringByColumns: false
});
