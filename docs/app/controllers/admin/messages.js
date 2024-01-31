import Controller from '@ember/controller';
import { action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import { allSettled } from 'rsvp';

export default class extends Controller.extend(EmberTableControllerMixin) {
per_page = 100;

sort_dir = 'ASC';

get columns() {
  return [
    {
      name      : this.l10n.t('Recipients'),
      valuePath : 'recipient',
      width     : 40
    },
    {
      name      : this.l10n.t('Trigger'),
      valuePath : 'action',
      width     : 40
    },
    {
      name      : this.l10n.t('Email Message'),
      valuePath : 'emailMessage',

      cellComponent   : 'ui-table/cell/cell-title-message',
      extraValuePaths : ['emailSubject'],
      options         : {
        subject : 'emailSubject',
        message : 'emailMessage'
      }
    },
    {
      name          : this.l10n.t('Enabled'),
      valuePath     : 'enabled',
      cellComponent : 'ui-table/cell/admin/messages/cell-options',
      width         : 20
    }

  ];
}

@action
async save() {
  try {
    const messages = this.model.data;
    const toSave = messages.filter(model => Object.keys(model.changedAttributes()).length).map(model => model.save());
    await allSettled(toSave);
    this.notify.success(this.l10n.t('Changes have been saved successfully'),
      {
        id: 'message_success'
      });
  } catch (e) {
    console.error('Error while saving system messages', e);
    this.notify.error(e.errors[0].detail,
      {
        id: 'change_error_message'
      });
  }
}
}
