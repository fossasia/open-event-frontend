import $ from 'jquery';

export const resetFormElement = e => {
  e = $(e);
  e.wrap('<form>').closest('form').get(0).reset();
  e.unwrap();
};
