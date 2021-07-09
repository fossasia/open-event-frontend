import Mixin from '@ember/object/mixin';
import MutableArray from '@ember/array/mutable';

export default Mixin.create(MutableArray, {

  getCustomForm(parent) {
    return [
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'title',
        form            : 'session',
        type            : 'text',
        isRequired      : true,
        isPublic        : true,
        isIncluded      : true,
        isFixed         : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'subtitle',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'shortAbstract',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'longAbstract',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'website',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'facebook',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'twitter',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'github',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'gitlab',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'linkedin',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'instagram',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'mastodon',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'comments',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'track',
        form            : 'session',
        type            : 'select',
        isRequired      : true,
        isIncluded      : true,
        isPublic        : true,
        isFixed         : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'sessionType',
        form            : 'session',
        type            : 'select',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'level',
        form            : 'session',
        type            : 'select',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'language',
        form            : 'session',
        type            : 'select',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'slidesUrl',
        form            : 'session',
        type            : 'file',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'videoUrl',
        form            : 'session',
        type            : 'file',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'audioUrl',
        form            : 'session',
        type            : 'file',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'name',
        form            : 'speaker',
        type            : 'text',
        isRequired      : true,
        isIncluded      : true,
        isPublic        : true,
        isFixed         : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'email',
        form            : 'speaker',
        type            : 'email',
        isRequired      : true,
        isIncluded      : true,
        isPublic        : false,
        isFixed         : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'photoUrl',
        form            : 'speaker',
        type            : 'image',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'organisation',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'position',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'address',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'country',
        form            : 'speaker',
        type            : 'select',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'city',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isPublic        : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'shortBiography',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'longBiography',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'speakingExperience',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'sponsorshipRequired',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isPublic        : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'gender',
        form            : 'speaker',
        type            : 'select',
        isRequired      : false,
        isPublic        : false,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'heardFrom',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'mobile',
        form            : 'speaker',
        type            : 'number',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'website',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'facebook',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'twitter',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'github',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'linkedin',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'instagram',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'mastodon',
        form            : 'speaker',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      })
    ];
  },

  /**
   * Custom forms for attendee details in order form.
   * @param parent - event associated with the forms.
   * @returns {*[]}
   */
  getCustomAttendeeForm(parent) {
    return [
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'jobTitle',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'phone',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'workPhone',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'ageGroup',
        form            : 'attendee',
        type            : 'select',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'gender',
        form            : 'attendee',
        type            : 'select',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'company',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'taxBusinessInfo',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'address',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'city',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'state',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'country',
        form            : 'attendee',
        type            : 'select',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'website',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'blog',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'linkedin',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'twitter',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'github',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'facebook',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'instagram',
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'acceptReceiveEmails',
        form            : 'attendee',
        type            : 'checkbox',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'acceptShareDetails',
        form            : 'attendee',
        type            : 'checkbox',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'acceptVideoRecording',
        form            : 'attendee',
        type            : 'checkbox',
        isRequired      : true,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      })
    ];
  }
});
