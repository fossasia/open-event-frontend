import classic from 'ember-classic-decorator';
import { classNames, classNameBindings, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import $ from 'jquery';
import UiSelect from 'ember-models-table/components/models-table/select';

@classic
@tagName('div')
@classNameBindings('cssPropertyName', 'aligned')
@classNames('ui', 'search', 'column', 'eight', 'wide')
export default class UiTableSelect extends UiSelect {
  cssPropertyName = '';

  @computed('device.isMobile')
  get aligned() {
    return this.device.isMobile ? 'center aligned' : 'left aligned';
  }

  change() {
    this.set('value', $('#table_select', this.element).val());
  }
}
