import Ember from 'ember';

const { Mixin, MutableArray } = Ember;

export default Mixin.create(MutableArray, {

  getCustomForm(parent) {
    return [
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Title',
        form            : 'session',
        type            : 'text',
        isRequired      : true,
        isIncluded      : true,
        isFixed         : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Subtitle',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Short abstract',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Long abstract',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Comments',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Track',
        form            : 'session',
        type            : 'text',
        isRequired      : true,
        isIncluded      : true,
        isFixed         : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Session type',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Level',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Language',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Slides',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Video',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Audio',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Form',
        form            : 'speaker',
        type            : 'text',
        isRequired      : true,
        isIncluded      : true,
        isFixed         : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Email',
        form            : 'speaker',
        type            : 'email',
        isRequired      : true,
        isIncluded      : true,
        isFixed         : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Photo',
        form            : 'speaker',
        type            : 'image',
        isRequired      : false,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Organisation',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Position',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Country',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'City',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Short biography',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Long biography',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Speaking experience',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Sponsorship required',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Gender',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Heard from',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Mobile',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Website',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Facebook',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Twitter',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Github',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'Linkedin',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        event           : parent
      })
    ];
  }
});
