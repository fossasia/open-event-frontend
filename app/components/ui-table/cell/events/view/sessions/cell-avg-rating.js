import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class CellAvgRating extends Component {

  get feedbackRating() {
    const arr = [{ star: 1, count: 0 }, { star: 2, count: 0 }, { star: 3, count: 0 }, { star: 4, count: 0 }, { star: 5, count: 0 }];
    this.get('record').forEach(item => {
      arr[item.rating - 1].count = arr[item.rating - 1].count + 1;
    });
    return arr;
  }
}
