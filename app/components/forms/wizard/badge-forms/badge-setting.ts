import Component from '@glimmer/component';
import { orderBy } from 'lodash-es';
import { badgeSize, badgeOrientation } from 'open-event-frontend/utils/dictionary/badge-image-size';

export default class BadgeSetting extends Component {

  get badgeSize() {
    return orderBy(badgeSize, 'position');
  }

  get badgeOrientation() {
    return orderBy(badgeOrientation, 'position');
  }
}
