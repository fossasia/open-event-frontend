import Ember from 'ember';

const { Controller } = Ember;
export default Controller.extend({
  columns: [
    {
      propertyName: 'id',
      title: 'ID'
    },
    {
      propertyName: 'firstName',
      title: 'First Name'
    },
    {
      propertyName: 'lastName',
      title: 'Last Name'
    },
    {
      propertyName: 'city',
      title: 'City'
    }
  ],
  data: [
    {
      id: '1',
      firstName: 'Dilpreet',
      lastName: 'Singh',
      city: 'Chandigarh'
    },
    {
      id: '2',
      firstName: 'Manpreet',
      lastName: 'Singh',
      city: 'Chandigarh'
    }
  ]
});
