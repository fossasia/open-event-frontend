import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    switch (this.get('params.speakers_status')) {
      case 'pending':
        return this.get('l10n').t('Pending');
      case 'accepted':
        return this.get('l10n').t('Accepted');
      case 'rejected':
        return this.get('l10n').t('Rejected');
    }
  },
  model(params) {
    this.set('params', params);
    return [{
      image             : '/images/placeholders/avatar.png',
      name              : 'Test Name1',
      email             : 'testname1@gmail.com',
      phone             : '123456789',
      submitted_session : ['session1', 'session2'],
      state             : 'confirmed'
    },
    {
      image             : '/images/placeholders/avatar.png',
      name              : 'Test Name2',
      email             : 'testname2@gmail.com',
      phone             : '123456789',
      submitted_session : ['session2'],
      state             : 'canceled'
    },
    {
      image             : '/images/placeholders/avatar.png',
      name              : 'Test Name3',
      email             : 'testname3@gmail.com',
      phone             : '123456789',
      submitted_session : ['session3'],
      state             : 'confirmed'
    },
    {
      image             : '/images/placeholders/avatar.png',
      name              : 'Test Name4',
      email             : 'testname4@gmail.com',
      phone             : '123456789',
      submitted_session : ['session4'],
      state             : 'canceled'
    },
    {
      image             : '/images/placeholders/avatar.png',
      name              : 'Test Name5',
      email             : 'testname5@gmail.com',
      phone             : '123456789',
      submitted_session : ['session5', 'session6'],
      state             : 'confirmed'
    }];
  }
});
