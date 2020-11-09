import { computed } from '@ember/object';
import Component from '@glimmer/component';
import { orderBy, groupBy } from 'lodash-es';

export default class SponsorList extends Component {

  getDistinctLevels(sponsors) {
    const levels = new Set(sponsors.toArray().map(sponsor => sponsor.level).filter(level => level != null));
    return [...levels].sort((a, b) => a - b);
  }

  @computed('sponsors.[]')
  get distinctLevels() {
    return this.getDistinctLevels(this.args.sponsors);
  }

  inferColumns(key, sponsors) {
    const levels = this.distinctLevels;
    const groupLevels = this.getDistinctLevels(sponsors);

    const groupLevel = groupLevels.pop();
    if (groupLevel !== null || groupLevel !== undefined) {
      const index = levels.indexOf(groupLevel);
      const columns = ['three', 'four', 'five', 'six', 'seven'];
      return columns[Math.min(index, columns.length - 1)];
    }

    return 'three';
  }

  @computed('sponsors.[]')
  get sponsorsGrouped() {
    const grouped = groupBy(
      orderBy(
        this.args.sponsors.toArray(),
        sponsor => sponsor.get('level')
      ),
      sponsor => sponsor.get('type')
    );

    const finalGrouped = {};
    for (const [key, sponsors] of Object.entries(grouped)) {
      finalGrouped[key] = {
        sponsors,
        columns: this.inferColumns(key, sponsors)
      };
    }
    return finalGrouped;
  }
}
