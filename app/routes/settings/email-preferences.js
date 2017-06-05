import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('Email Preferences');
  },
  model() {
    return [{
      name             : 'Techtoma',
      role             : 'Organiser',
      isNewPaper       : true,
      isChangeSchedule : true,
      isNewEvent       : true
    },
    {
      name             : 'Open Summit 2017',
      role             : 'Organiser',
      isNewPaper       : false,
      isChangeSchedule : false,
      isNewEvent       : false
    }];
  }
});
