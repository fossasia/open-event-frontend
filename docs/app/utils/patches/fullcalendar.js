import $ from 'jquery';

// Workaround for https://github.com/fossasia/open-event-frontend/issues/4778
export function patchFullCalendar() {
  const rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;
  $.htmlPrefilter = function(html) {
    return html.replace(rxhtmlTag, '<$1></$2>');
  };
}
