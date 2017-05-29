import uiSelect from './models-select';

export default uiSelect.extend({
  tagName: 'div',

  classNameBindings: ['cssPropertyName'],

  cssPropertyName: '',

  change() {
    this.set('value', this.$('#table_select').val());
  }

});
