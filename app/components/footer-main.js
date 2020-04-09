import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('footer')
@classNames('ui', 'inverted', 'vertical', 'footer', 'segment')
export default class FooterMain extends Component {
  @computed
  get currentLocale() {
    return this.l10n.getLocale();
  }

  @action
  switchLanguage(locale) {
    this.l10n.switchLanguage(locale);
  }

  didInsertElement() {
    this.set('eventLocations', this.eventLocations.sortBy('name'));

    let eventTypes = this.eventTypes.sortBy('name').toArray();
    eventTypes.forEach(eventType => {
      if (eventType.name === 'Other') {
        let other = eventType;
        eventTypes.splice(eventTypes.indexOf(eventType), 1);
        eventTypes.push(other);
      }
    });
    this.set('eventTypes', eventTypes);
  }
}
