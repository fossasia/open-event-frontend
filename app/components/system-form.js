import Component from '@glimmer/component';
/*import { tracked } from '@glimmer/tracking';*/
import { action } from '@ember/object';

export default class SystemFormComponent extends Component {


    @action
  dropDown() {
    const mylist = document.querySelector('myList');
    document.getElementById('favourite').value = mylist.options[mylist.selectedIndex].text;
  }
}
