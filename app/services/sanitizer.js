import Service from '@ember/service';
import sanitizeHtml from 'sanitize-html';

export default Service.extend({

  sanitize: null,

  // Ensure any changes to the sanitizer rules are set in the rich text editor @ components/widgets/forms/rich-text-editor.js
  options: {
    allowedTags       : ['b', 'strong', 'i', 'em', 'u', 'ol', 'ul', 'li', 'a', 'p'],
    allowedAttributes : {
      'a': ['href', 'rel', 'target']
    },
    selfClosing           : ['br'],
    allowedSchemes        : ['http', 'https', 'ftp', 'mailto'],
    allowedSchemesByTag   : {},
    allowProtocolRelative : false,
    transformTags         : {
      'i' : 'em',
      'b' : 'strong',
      'a' : sanitizeHtml.simpleTransform('a', { rel: 'nofollow', target: '_blank' })
    }
  },

  purify(string) {
    return sanitizeHtml(string, this.options);
  },

  strip(string) {
    return sanitizeHtml(string, {
      allowedTags       : [],
      allowedAttributes : []
    });
  }
});
