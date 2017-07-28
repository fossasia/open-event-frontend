import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  id(i) {
    return i;
  },
  firstName() {
    return faker.name.firstName();
  },
  lastName() {
    return faker.name.lastName();
  },
  email() {
    return faker.internet.email();
  },
  isVerified() {
    return faker.random.boolean();
  },
  avatarUrl() {
    return faker.image.avatar();
  }

});
