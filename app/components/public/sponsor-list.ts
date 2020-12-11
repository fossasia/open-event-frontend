import { computed } from '@ember/object';
import Component from '@glimmer/component';
import { orderBy, groupBy } from 'lodash-es';

interface Sponsor { level: number, type: string }

interface Args {
  sponsors: Sponsor[]
}

interface GroupedSponsors { [key: string]: { sponsors: Sponsor[], columns: string } }

export default class SponsorList extends Component<Args> {

  getDistinctLevels(sponsors: Sponsor[]): number[] {
    const levels = new Set(sponsors.toArray().map(sponsor => sponsor.level).filter(level => level != null));
    return [...levels].sort((a, b) => a - b);
  }

  @computed('sponsors.[]')
  get distinctLevels(): number[] {
    return this.getDistinctLevels(this.args.sponsors);
  }

  inferColumns(sponsors: Sponsor[]): string {
    const levels = this.distinctLevels;
    const groupLevels = this.getDistinctLevels(sponsors);

    const groupLevel = groupLevels.pop();
    if (groupLevel !== null && groupLevel !== undefined) {
      const index = levels.indexOf(groupLevel);
      const columns = ['three', 'four', 'five', 'six', 'seven'];
      return columns[Math.min(index, columns.length - 1)];
    }

    return 'three';
  }

  @computed('sponsors.[]')
  get sponsorsGrouped(): GroupedSponsors {
    const grouped = groupBy(
      orderBy(
        this.args.sponsors.toArray(),
        sponsor => sponsor.level
      ),
      sponsor => sponsor.type
    );

    const finalGrouped: GroupedSponsors = {};
    for (const [key, sponsors] of Object.entries(grouped)) {
      finalGrouped[key] = {
        sponsors,
        columns: this.inferColumns(sponsors)
      };
    }
    return finalGrouped;
  }
}
