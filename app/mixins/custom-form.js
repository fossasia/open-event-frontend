import Ember from 'ember';

const { Mixin, MutableArray } = Ember;

export default Mixin.create(MutableArray, {

  getSessionFormFields() {
    return [
      this.store.createRecord('custom-field', {
        'identifier' : 'title',
        'name'       : 'Title',
        'type'       : 'text',
        'isRequired' : true,
        'isIncluded' : true,
        'isFixed'    : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'subtitle',
        'name'       : 'Subtitle',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'short_abstract',
        'name'       : 'Short abstract',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'long_abstract',
        'name'       : 'Long abstract',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'comments',
        'name'       : 'Comments',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'track',
        'name'       : 'Track',
        'type'       : 'text',
        'isRequired' : true,
        'isIncluded' : true,
        'isFixed'    : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'session_type',
        'name'       : 'Session type',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'level',
        'name'       : 'Level',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'language',
        'name'       : 'Language',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'slides',
        'name'       : 'Slides',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'video',
        'name'       : 'Video',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'audio',
        'name'       : 'Audio',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      })
    ];
  },

  getSpeakerFormFields() {
    return [
      this.store.createRecord('custom-field', {
        'identifier' : 'name',
        'name'       : 'Name',
        'type'       : 'text',
        'isRequired' : true,
        'isIncluded' : true,
        'isFixed'    : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'email',
        'name'       : 'Email',
        'type'       : 'email',
        'isRequired' : true,
        'isIncluded' : true,
        'isFixed'    : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'photo',
        'name'       : 'Photo',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'organisation',
        'name'       : 'Organisation',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'position',
        'name'       : 'Position',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'country',
        'name'       : 'Country',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'city',
        'name'       : 'City',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'short_biography',
        'name'       : 'Short biography',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'long_biography',
        'name'       : 'Long biography',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'speaking_experience',
        'name'       : 'Speaking experience',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'sponsorship_required',
        'name'       : 'Sponsorship required',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'gender',
        'name'       : 'Gender',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'heard_from',
        'name'       : 'Heard from',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'mobile',
        'name'       : 'Mobile',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'website',
        'name'       : 'Website',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'facebook',
        'name'       : 'Facebook',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'twitter',
        'name'       : 'Twitter',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : true
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'github',
        'name'       : 'Github',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      }),
      this.store.createRecord('custom-field', {
        'identifier' : 'linkedin',
        'name'       : 'Linkedin',
        'type'       : 'text',
        'isRequired' : false,
        'isIncluded' : false
      })
    ];
  }
});
