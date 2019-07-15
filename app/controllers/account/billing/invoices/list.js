import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {


upcomingInvoiceColumns = [
  {
    name      : 'Invoice ID',
    valuePath : 'invoiceId'
  },
  {
    name      : 'Event Name',
    valuePath : 'eventName'
  },
  {
    name      : 'Date Issued',
    valuePath : 'dateIssued'
  },
  {
    name      : 'Outstanding Amount',
    valuePath : 'amount'
  },
  {
    name      : 'View Invoice',
    valuePath : 'invoiceLink'
  }
];

paidInvoiceColumns = [
  {
    name      : 'Invoice ID',
    valuePath : 'invoiceId'
  },
  {
    name      : 'Event Name',
    valuePath : 'eventName'
  },
  {
    name      : 'Date Issued',
    valuePath : 'dateIssued'
  },
  {
    name      : 'Amount',
    valuePath : 'amount'
  },
  {
    name      : 'Date Paid',
    valuePath : 'datePaid'
  },
  {
    name      : 'View Invoice',
    valuePath : 'invoiceLink'
  }

];

dueInvoiceColumns = [
  {
    name      : 'Invoice ID',
    valuePath : 'invoiceId'
  },
  {
    name      : 'Event Name',
    valuePath : 'eventName'
  },
  {
    name      : 'Date Issued',
    valuePath : 'dateIssued'
  },
  {
    name      : 'Amount Due',
    valuePath : 'amount'
  },
  {
    name      : 'View Invoice',
    valuePath : 'invoiceLink'
  },
  {
    name      : 'Pay',
    valuePath : 'paymentLink'
  }

];
allInvoiceColumns =  [
  {
    name      : 'Invoice ID',
    valuePath : 'invoiceId'
  },
  {
    name      : 'Event Name',
    valuePath : 'eventName'
  },
  {
    name      : 'Amount',
    valuePath : 'amount'
  },
  {
    name      : 'Status',
    valuePath : 'status'
  }

];

get dueInvoiceRows() {
  const rows = [];
  this.model.data.map(row => {
    rows.pushObject({
      invoiceId   : row.identifier,
      eventName   : row.event.name,
      dateIssued  : row.createdAt,
      amount      : row.amount,
      invoiceLink : row.invoicePdfUrl,
      paymentLink : components/ui-table/cell/cell-simple-date
    });
  });
  return rows;
}

get paidInvoiceRows() {
  const rows = [];
  this.model.data.map(row => {
    rows.pushObject({
      invoiceId   : row.identifier,
      eventName   : row.event.name,
      dateIssued  : row.createdAt,
      amount      : row.amount,
      datePaid    : row.completedAt,
      invoiceLink : row.invoicePdfUrl
    });
  });
  return rows;
}

get upcomingInvoiceRows() {
  const rows = [];
  this.model.data.map(row => {
    rows.pushObject({
      invoiceId   : row.identifier,
      eventName   : row.event.name,
      dateIssued  : row.createdAt,
      amount      : row.amount,
      invoiceLink : row.invoicePdfUrl
    });
  });
  return rows;
}

get allInvoiceRows() {
  const rows = [];
  this.model.data.map(row => {
    rows.pushObject({
      invoiceId : row.identifier,
      eventName : row.event.name,
      amount    : row.amount,
      status    : row.status
    });
  });
  return rows;
}
}
