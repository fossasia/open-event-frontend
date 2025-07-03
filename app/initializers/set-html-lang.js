export function initialize(appInstance) {
  try {
    const intl = appInstance.lookup('service:intl');

    if (intl && typeof document !== 'undefined') {
      const lang = intl?.locale?.[0] || 'en';
      document.documentElement.lang = lang;
    }
  } catch (e) {
    console.error('Failed to set lang attribute:', e);
  }
}

export default {
  initialize
};
