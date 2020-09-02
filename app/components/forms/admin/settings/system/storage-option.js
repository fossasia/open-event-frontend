import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { amazonS3Regions } from 'open-event-frontend/utils/dictionary/amazon-s3-regions';
import { orderBy } from 'lodash-es';

@classic
export default class StorageOption extends Component {
  @computed
  get regions() {
    return orderBy(amazonS3Regions);
  }
}
