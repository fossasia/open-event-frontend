import Service from '@ember/service';
import createDOMPurify from 'dompurify';

export default Service.extend({

  sanitize: null,

  _purify: null,

  async init() {
    this._super(...arguments);
    if (typeof window !== 'undefined') {
      this._purify = createDOMPurify(self);
    } else {
      const { JSDOM } = await import('jsdom');

      this._purify = createDOMPurify(new JSDOM('').window);
    }
    this._purify.addHook('beforeSanitizeElements', function(node) {
      if ('href' in node) {
        node.setAttribute('target', '_blank');
        node.setAttribute('rel', 'nofollow noopener');
      }
    });
  },

  // Ensure any changes to the sanitizer rules are set in the rich text editor @ components/widgets/forms/rich-text-editor.js
  options: {
    allowedTags       : ['b', 'strong', 'i', 'em', 'u', 'ol', 'ul', 'li', 'a', 'p', 'br'],
    allowedAttributes : ['href', 'rel', 'target']
  },

  purify(string) {
    return this._purify.sanitize(string, {
      ALLOWED_TAGS : this.options.allowedTags,
      ALLOWED_ATTR : this.options.allowedAttributes
    });
  },

  strip(string) {
    return this._purify.sanitize(string, {
      ALLOWED_TAGS : [],
      ALLOWED_ATTR : []
    });
  }
});
