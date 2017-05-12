#### Style Guide

This will document all the code-style requirements that will **not** cause an eslint or a template-lint warning but required to pass a PR review.


##### Templates (`*.hbs`)

- All HTML class attributes should use double-quotes (`"`)
- There should be no space around the equal symbol (`=`)
- HTML Closing markup
  - `</div>` - :white_check_mark:
  - `</ div>` - :x:
  - `</ div >` - :x:
- Handlebars brackets
  - `{{variableName}}` - :white_check_mark:
  - `{{ variableName }}` - :x:
  - `{{variableName }}` - :x:
  - `{{ variableName}}` - :x:
- If you're passing in a string as a handlebar attribute, single-quotes (`'`) must be used.

##### SASS Styles (`*.scss`)

- Use single-quotes (`'`) for any string representation.
- Use Hex or `rgb` or `rgba` values. Do not use named colors.
  - `color: #FFFFFF;` - :white_check_mark:
  - `color: rgb(255, 255, 255)` - :white_check_mark:
  - `color: rgba(255, 255, 255, 1)` - :white_check_mark:
  - `color: white` - :x:
