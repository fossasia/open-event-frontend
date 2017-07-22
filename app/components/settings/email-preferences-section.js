import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    savePreference(setting) {
      setting.save()
        .then(() => {
          this.get('notify').success(this.l10n.t('Email notifications updated successfully'));
        });
    }
  }
});
