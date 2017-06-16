import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.session_status')) {
      case 'pending':
        return this.i18n.t('Pending');
      case 'accepted':
        return this.i18n.t('Accepted');
      case 'confirmed':
        return this.i18n.t('Confirmed');
      case 'rejected':
        return this.i18n.t('Rejected');
    }
  },
  model(params) {
    this.set('params', params);
    return [{
      title          : 'Test Session 1',
      speakers       : [{ name: 'speaker 1', id: 1, organization: 'fossasia' }, { name: 'speaker 2', id: 1, organization: 'fossasia' }],
      track          : 'sample track',
      shortAbstract  : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      submissionDate : new Date(),
      lastModified   : new Date(),
      emailSent      : 'No',
      state          : 'confirmed'
    },
    {
      title          : 'Test Session 2',
      speakers       : [{ name: 'speaker 3', id: 1, organization: 'fossasia' }, { name: 'speaker 4', id: 1, organization: 'fossasia' }],
      track          : 'sample track',
      shortAbstract  : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      submissionDate : new Date(),
      lastModified   : new Date(),
      emailSent      : 'Yes',
      state          : 'confirmed'
    }];
  }
});
