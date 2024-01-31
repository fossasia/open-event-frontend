import Service from '@ember/service';

export default class Tn extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  t(str: string): string {
    return str;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'tn': Tn;
  }
}
