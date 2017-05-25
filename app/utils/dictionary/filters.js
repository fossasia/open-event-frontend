export const getDateRanges = function() {
  return [
    {
      name : this.i18n.t('All Dates'),
      key  : 'all_dates'
    },
    {
      name : this.i18n.t('Today'),
      key  : 'today'
    },
    {
      name : this.i18n.t('Tomorrow'),
      key  : 'tomorrow'
    },
    {
      name : this.i18n.t('This week'),
      key  : 'this_week'
    },
    {
      name : this.i18n.t('This Weekend'),
      key  : 'this_weekend'
    },
    {
      name : this.i18n.t('Next week'),
      key  : 'next_week'
    },
    {
      name : this.i18n.t('This Month'),
      key  : 'this_month'
    },
    {
      name : this.i18n.t('Custom dates'),
      key  : 'custom_dates'
    }
  ];
};
