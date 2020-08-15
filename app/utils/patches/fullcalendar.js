import $ from 'jquery';

// TODO(Areeb): Remove once upgraded
// Workaround for https://github.com/fossasia/open-event-frontend/issues/4729
export function patchFullCalendar() {
  if (!window?.FullCalendar) {return}
  window.FullCalendar.EventRenderer.prototype.renderFgSegEls = function(segs, disableResizing) {
    const _this = this;
    if (disableResizing === void 0) { disableResizing = false }
    const hasEventRenderHandlers = this.view.hasPublicHandlers('eventRender');
    let html = '';
    const renderedSegs = [];
    let i;
    if (segs.length) {
      // build a large concatenation of event segment HTML
      for (i = 0; i < segs.length; i++) {
        this.beforeFgSegHtml(segs[i]);
        html += this.fgSegHtml(segs[i], disableResizing);
      }
      // Grab individual elements from the combined HTML string. Use each as the default rendering.
      // Then, compute the 'el' for each segment. An el might be null if the eventRender callback returned false.
      $(html).each(function(i, node) {
        const seg = segs[i];
        let el = $(node);
        // Areeb: seg is undefined for single day events as i > seg.length due to some logical error
        if (seg && hasEventRenderHandlers) { // Areeb: Added `seg && `
          el = _this.filterEventRenderEl(seg.footprint, el);
        }
        if (seg && el) { // Areeb: Added `seg && `
          el.data('fc-seg', seg); // used by handlers
          seg.el = el;
          renderedSegs.push(seg);
        }
      });
    }
    return renderedSegs;
  };
}
