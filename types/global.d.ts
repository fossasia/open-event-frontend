// Types for compiled templates
declare module 'open-event-frontend/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}

interface JQuery {
  fullCalendar(op: string, key: string, value: unknown): void,
  fullCalendar(key: string): unknown[]
}

declare module 'google-material-color';
