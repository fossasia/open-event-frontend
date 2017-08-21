import UiTable from 'open-event-frontend/components/ui-table-server';

export default UiTable.extend({
  classNames : ['ui', 'main-container'],
  actions    : {
    moveToDetails(id) {
      this.sendAction('moveToDetails', id);
    },
    editEvent(id) {
      this.sendAction('editEvent', id);
    },
    openDeleteEventModal(id, name) {
      this.sendAction('openDeleteEventModal', id, name);
    }
  }
});
