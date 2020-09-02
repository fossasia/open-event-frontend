// Used by the store to normalize IDs entering the store.  Despite the fact
// that developers may provide IDs as numbers (e.g., `store.findRecord('person', 1)`),
// it is important that internally we use strings, since IDs may be serialized
// and lose type information.  For example, Ember's router may put a record's
// ID into the URL, and if we later try to deserialize that URL and find the
// corresponding record, we will not know if it is a string or a number.
//
// From: ember-data/addon/-private/system/coerce-id.js
//
export const coerceId = id => {
  if (id === null || id === undefined || id === '') { return null }
  if (typeof id === 'string') { return id }
  return `${id}`;
};
