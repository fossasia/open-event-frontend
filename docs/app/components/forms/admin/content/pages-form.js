import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        name: {
          identifier : 'name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a name')
            }
          ]
        },
        title: {
          identifier : 'title',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a title')
            }
          ]
        },
        url: {
          identifier : 'url',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the path')
            },
            {
              type   : 'regExp',
              value  : '/[^/](.*)/',
              prompt : this.l10n.t('Path should not contain leading slash.')
            },
            {
              type   : 'doesntContain[ ]',
              prompt : this.l10n.t('Path should not contain whitespaces.')
            }
          ]
        },
        place: {
          identifier : 'place',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please select a place')
            }
          ]
        },
        position: {
          identifier : 'position',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a position')
            }
          ]
        },
        language: {
          identifier : 'language',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a language')
            }
          ]
        }
      }
    };
  },

  actions: {
    submit(data) {
      this.onValid(() => {
        this.sendAction('save', data);
      });
    },
    deletePage(data) {
      if (!this.isCreate) {
        data.destroyRecord();
        this.set('isFormOpen', false);
      }
    },
    close() {
      if (this.isCreate) {
        this.set('isFormOpen', false);
      }
    }
  }
});
