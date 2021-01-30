import Component from '@glimmer/component';
import Exhibitor from 'open-event-frontend/models/exhibitor';
import { protocolLessValidUrlPattern } from 'open-event-frontend/utils/validators';
import { inject as service } from '@ember/service';

interface Args {
  exhibitor: Exhibitor
}

export default class ExhibitorForm extends Component<Args> {
  @service l10n: any;


  get rules(): any {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',

      fields: {
        name: {
          rules: [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a name')
            }
          ]
        },
        url: {
          rules: [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a url')
            },
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        }
      }
    };
  }

}
