import Route from '@ember/routing/route';

export default class extends Route {
  titleToken() {
    return this.l10n.t('Tag');
  }

  addDefaultValue(tags) {
    tags.addObject(this.store.createRecord('tag', {
      name       : 'Speakers',
      color      : '#FF0000',
      isReadOnly : true
    }));
    tags.addObject(this.store.createRecord('tag', {
      name       : 'Attendees',
      color      : '#0000FF',
      isReadOnly : true
    }));
    tags.addObject(this.store.createRecord('tag', {
      name       : 'VIPs',
      color      : '#0000FF',
      isReadOnly : true
    }));
    tags.save();
  }

  async model() {
    const event = this.modelFor('events.view');
    const tags = await event.query('tags', {});
    if (!tags || tags.length === 0) {
      this.addDefaultValue(tags);
    }
    return {
      event,
      tags
    };
  }
}
