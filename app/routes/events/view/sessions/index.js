import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  templateName: 'events/view/sessions/list',
  model() {
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
