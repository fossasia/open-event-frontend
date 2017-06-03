import UiSelect from 'ember-models-table/components/models-select';

export default UiSelect.extend({
  tagName: 'div',

  classNameBindings: ['cssPropertyName'],

  cssPropertyName: '',

  change() {
    this.set('value', this.$('#table_select').val());
  }

});
