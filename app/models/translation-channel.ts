// import { attr, hasMany, belongsTo } from '@ember-data/model';
// import ModelBase from 'open-event-frontend/models/base';
// import { slugify, stringHashCode } from 'open-event-frontend/utils/text';


// export default class TranslationChannel extends ModelBase.extend() {
//   @attr() name!: string;
//   @attr() url!: string;


//   get slugName(): string {
//     return slugify(this.name);
//   }

//   get hash(): number {
//     return stringHashCode(this.name + this.id)
//   }
// }

// // DO NOT DELETE: this is how TypeScript knows how to look up your models.
// declare module 'ember-data/types/registries/model' {
//   export default interface ModelRegistry {
//     'translation-channel': TranslationChannel
//   }
// }
