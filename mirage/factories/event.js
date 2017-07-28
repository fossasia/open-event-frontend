import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  name(i) {
    return `Event ${i}`;
  },
  id(i) {
    return i;
  },
  identifier(i) {
    return i;
  },
  startsAt() {
    return moment(faker.date.past());
  },
  endsAt() {
    return moment(faker.date.future());
  },
  locationName() {
    return faker.address.streetAddress();
  },
  originalImageUrl() {
    return faker.image.imageUrl();
  }
});
