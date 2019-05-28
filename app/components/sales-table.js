import UiTable from 'open-event-frontend/components/ui-table-server';
import Semantic from 'open-event-frontend/themes/semantic';

export default UiTable.extend({
  'pageSize'    : 10,
  themeInstance : Semantic.create(),

  useFilteringByColumns: false
});
