import Component from '@glimmer/component';
import { action } from '@ember/object';
import $ from 'jquery';
import moment from 'moment';
import { debounce } from '@ember/runloop';
import { FORM_DATE_FORMAT } from 'open-event-frontend/utils/dictionary/date-time';
import { merge } from 'lodash-es';


export interface Rules {
  inline: boolean;
  delay: boolean;
  on: string;
  fields: {
    [key:string]: Field
  }
}

export interface Field {
  optional?: boolean;
  rules: Rule[]
}

export interface Rule {
  type: string;
  prompt: string;
  value?: string | RegExp;
}

interface Args {
  rules: Rules,
  onValid?: (() => void),
  onSubmit?: (() => void)
}

declare global {
  interface Window {
    $: typeof $ | any
  }
}

export default class FormComponent extends Component<Args> {
  autoScrollToErrors = true;
  autoScrollSpeed = 200;

  form: any = null;

  @action setupForm(form: HTMLFormElement): void {
    window.$.fn.form.settings.rules.date = (value: string, format = FORM_DATE_FORMAT) => {
      if (value && value.length > 0 && format) {
        return moment(value, format).isValid();
      }
      return true;
    };

    debounce(this, () => {
      const defaultFormRules = {
        onFailure: (formErrors: any[]) => {
          if (this.autoScrollToErrors) {
            // Scroll to the first error message
            if (formErrors.length > 0) {
              $('html,body').animate({
                scrollTop: $(`div:contains('${formErrors[0]}')`, form)?.offset()?.top
              }, this.autoScrollSpeed);
            }
          }
        }
      };

      const $popUps: any = $('.has.popup', form);
      if ($popUps) {
        $popUps.popup({
          hoverable: true
        });
      }

      const $checkBoxes: any = $('.ui.checkbox:not(.ember-view)', form);
      if ($checkBoxes) {
        $checkBoxes.checkbox();
      }

      if (form) {
        const $form: any = $(form).first();
        if ($form) {
          $form.form(merge(defaultFormRules, this.args.rules ?? {}));
          this.form = $form;
        }
      }
    }, 400);
  }

  @action submit(): void {
    this.args.onSubmit?.();
    this.form.form('validate form');
    if (this.form.form('is valid')) {
      this.args.onValid?.();
    }
  }
}
