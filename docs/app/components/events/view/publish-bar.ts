import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import DS from 'ember-data';

interface Event extends DS.Model { // eslint-disable-line ember-suave/no-direct-property-access
  identifier: string | null,
  state: string,
  name: string | null,
  tickets: any[],
  isStripeConnectionValid: boolean
}

interface EventsViewPublishBarArgs {
  event: Event,
  showOnInvalid: boolean,
  paidTickets: boolean,
  paymentMode: boolean,
  onSaved: (() => void) | null,
  onValidate: ((cb: (proceed: boolean) => void) => void) | null
}

export default class EventsViewPublishBar extends Component<EventsViewPublishBarArgs> {
  @service notify: any;
  @service l10n: any;
  @service errorHandler: any;

  @tracked isModalOpen = false;
  @tracked isLoading = false;

  get isEventPublishable(): boolean {
    const { event } = this.args;
    return !(event.state === 'draft' && (isEmpty(event.tickets) || isEmpty(event.name)));
  }

  get isEventUnsaved(): boolean {
    return !this.args.event.identifier;
  }

  @action
  openModal(): void {
    if (!this.args.onValidate) {
      this.isModalOpen = true;
    } else {
      this.args.onValidate(proceed => {
        this.isModalOpen = proceed;
      });
    }
  }

  @action
  async togglePublishState(): Promise<void> {
    this.isModalOpen = false;
    const { event } = this.args;
    const { paidTickets, paymentMode } = this.args;
    const { state } = event;
    if (state === 'draft') {
      if (isEmpty(event.tickets)) {
        this.notify.error(this.l10n.t('Your event must have tickets before it can be published.'),
          {
            id: 'event_tickets'
          });
        return;
      } else if (paidTickets) {
        if (!paymentMode) {
          this.notify.error(this.l10n.t('Event with paid tickets must have a payment method before publishing/saving.'),
            {
              id: 'event_tickets'
            });
          return;
        }
      } else if (!event.isStripeConnectionValid) {
        this.notify.error(this.l10n.t('You need to connect to your Stripe account, if you choose Stripe as a payment gateway.'),
          {
            id: 'event_stripe'
          });
        return;
      }
    }
    this.isLoading = true;
    event.state = state === 'draft' ? 'published' : 'draft';
    try {
      await event.save();
      this.args.onSaved && this.args.onSaved();
      if (state === 'draft') {
        this.notify.success(this.l10n.t('Your event has been published successfully.'),
          {
            id: 'event_publish'
          });
      } else {
        this.notify.success(this.l10n.t('Your event has been unpublished.'),
          {
            id: 'event_unpublish'
          });
      }
    } catch (e) {
      console.error('Error while publishing/unpublishing event', e);
      event.state = state;
      this.errorHandler.handle(e);
    } finally {
      this.isLoading = false;
    }
  }
}
