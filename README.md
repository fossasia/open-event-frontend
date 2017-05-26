![Open Event Frontend](https://storage.googleapis.com/eventyay.com/assets/branding/frontend_branding.png)

[![Travis](https://img.shields.io/travis/fossasia/open-event-frontend/development.svg?style=flat-square)](https://travis.org/fossasia/open-event-frontend)
[![Gitter](https://img.shields.io/badge/chat-on%20gitter-ff006f.svg?style=flat-square)](https://gitter.im/fossasia/open-event-frontend)
[![Codacy grade](https://img.shields.io/codacy/grade/0d51cf60fc734d3699fd6eff6054e483.svg?style=flat-square)](https://www.codacy.com/app/niranjan94/open-event-frontend)
[![codecov](https://img.shields.io/codecov/c/github/fossasia/open-event-frontend/development.svg?style=flat-square)](https://codecov.io/gh/fossasia/open-event-frontend)

[![Greenkeeper badge](https://badges.greenkeeper.io/fossasia/open-event-frontend.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/fossasia/open-event-frontend/badge.svg)](https://snyk.io/test/github/fossasia/open-event-frontend)

> The front end for the Open Event API Server

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/) - `npm install -g bower`
* [Ember CLI](https://ember-cli.com/) - `npm install -g ember-cli`
* [PhantomJS](http://phantomjs.org/) - `npm install -g phantomjs-prebuilt`

It is also recommended to have [watchman](https://facebook.github.io/watchman/docs/install.html) installed to speedup the file-watcher/auto-build service of the ember build server. 

## Installation

* `git clone <repository-url>` this repository
* `cd open-event-frontend`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

This project has acceptance, integration and unit tests located inside the `tests/` folder.

* `ember test` - CLI output
* `ember test --server` - Live browser preview and console access

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Deployments

#### eventyay staging deployment (`development` branch via Kubernetes)
- Frontend: https://nextgen.eventyay.com
- API server: https://eventyay.com

#### Development deployment (`development` branch)
- Frontend: https://open-event-frontend.herokuapp.com
- API server: https://open-event-dev.herokuapp.com

## Further Reading / Useful Links
* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* [Semantic UI](https://semantic-ui.com/)
* [Semantic-UI-Ember](https://semantic-org.github.io/Semantic-UI-Ember/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Contributions Best Practices

**Commits**

* Write clear meaningful git commit messages (Do read http://chris.beams.io/posts/git-commit/)
* Make sure your PR's description contains GitHub's special keyword references that automatically close the related issue when the PR is merged. (More info at https://github.com/blog/1506-closing-issues-via-pull-requests )
* When you make very very minor changes to a PR of yours (like for example fixing a failing travis build or some small style corrections or minor changes requested by reviewers) make sure you squash your commits afterwards so that you don't have an absurd number of commits for a very small fix. (Learn how to squash at https://davidwalsh.name/squash-commits-git )
* When you're submitting a PR for a UI-related issue, it would be really awesome if you add a screenshot of your change or a link to a deployment where it can be tested out along with your PR. It makes it very easy for the reviewers and you'll also get reviews quicker.

**Feature Requests and Bug Reports**

* When you file a feature request or when you are submitting a bug report to the [issue tracker](https://github.com/fossasia/open-event-frontend/issues), make sure you add steps to reproduce it. Especially if that bug is some weird/rare one.

**Join the development**

* Before you join development, please set up the project on your local machine, run it and go through the application completely. Press on any button you can find and see where it leads to. Explore. (Don't worry ... Nothing will happen to the app or to you due to the exploring :wink: Only thing that will happen is, you'll be more familiar with what is where and might even get some cool ideas on how to improve various aspects of the app.)
* If you would like to work on an issue, drop in a comment at the issue. If it is already assigned to someone, but there is no sign of any work being done, please free to drop in a comment so that the issue can be assigned to you if the previous assignee has dropped it entirely.

## License

This project is currently licensed under the Apache License version 2.0. A copy of `LICENSE` should be present along with the source code. To obtain the software under a different license, please contact [FOSSASIA](http://blog.fossasia.org/contact/).
