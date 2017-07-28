import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  id(i) {
    return i;
  },
  name(i) {
    faker.seed(i);
    return faker.random.word();
  },
  slug(i) {
    faker.seed(i);
    return faker.helpers.slugify(faker.random.word());
  }
});
