export const getDateRanges = function() {
  return [
    {
      name : this.get('l10n').t('All Dates'),
      key  : 'all_dates'
    },
    {
      name : this.get('l10n').t('Today'),
      key  : 'today'
    },
    {
      name : this.get('l10n').t('Tomorrow'),
      key  : 'tomorrow'
    },
    {
      name : this.get('l10n').t('This week'),
      key  : 'this_week'
    },
    {
      name : this.get('l10n').t('This Weekend'),
      key  : 'this_weekend'
    },
    {
      name : this.get('l10n').t('Next week'),
      key  : 'next_week'
    },
    {
      name : this.get('l10n').t('This Month'),
      key  : 'this_month'
    },
    {
      name : this.get('l10n').t('Custom dates'),
      key  : 'custom_dates'
    }
  ];
};
