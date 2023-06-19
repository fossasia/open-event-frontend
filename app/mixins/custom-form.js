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
        fieldIdentifier : 'slides',
        form            : 'session',
        type            : 'file',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : true,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'videoUrl',
        form            : 'session',
        type            : 'text',
        isRequired      : false,
        isPublic        : true,
        isIncluded      : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        fieldIdentifier : 'audioUrl',
        form            : 'session',
        type            : 'text',
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
  getCustomAttendeeForm(parent, _formID) {
    return [
      this.store.createRecord('custom-form', {
        name            : 'jobTitle',
        fieldIdentifier : _formID + '_jobTitle',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'phone',
        fieldIdentifier : _formID + 'phone',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'workPhone',
        fieldIdentifier : _formID + 'workPhone',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'ageGroup',
        fieldIdentifier : _formID + 'ageGroup',
        formID          : _formID,
        form            : 'attendee',
        type            : 'select',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'gender',
        fieldIdentifier : _formID + 'gender',
        formID          : _formID,
        form            : 'attendee',
        type            : 'select',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'company',
        fieldIdentifier : _formID + 'company',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'taxBusinessInfo',
        fieldIdentifier : _formID + 'taxBusinessInfo',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'address',
        fieldIdentifier : _formID + 'address',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'city',
        fieldIdentifier : _formID + 'city',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'state',
        fieldIdentifier : _formID + 'state',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'country',
        fieldIdentifier : _formID + 'country',
        formID          : _formID,
        form            : 'attendee',
        type            : 'select',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'website',
        fieldIdentifier : _formID + 'website',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'blog',
        fieldIdentifier : _formID + 'blog',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'linkedin',
        fieldIdentifier : _formID + 'linkedin',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'twitter',
        fieldIdentifier : _formID + 'twitter',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'github',
        fieldIdentifier : _formID + 'github',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'facebook',
        fieldIdentifier : _formID + 'facebook',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'instagram',
        fieldIdentifier : _formID + 'instagram',
        formID          : _formID,
        form            : 'attendee',
        type            : 'text',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'acceptReceiveEmails',
        fieldIdentifier : _formID + 'acceptReceiveEmails',
        formID          : _formID,
        form            : 'attendee',
        type            : 'checkbox',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'acceptShareDetails',
        fieldIdentifier : _formID + 'acceptShareDetails',
        formID          : _formID,
        form            : 'attendee',
        type            : 'checkbox',
        isRequired      : false,
        isIncluded      : false,
        isPublic        : false,
        event           : parent
      }),
      this.store.createRecord('custom-form', {
        name            : 'acceptVideoRecording',
        fieldIdentifier : _formID + 'acceptVideoRecording',
        formID          : _formID,
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
