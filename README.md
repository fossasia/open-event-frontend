# Open Event Frontend
![Open Event Frontend](docs/images/Frontend_Branding.png)

[![Build Status](https://travis-ci.org/fossasia/open-event-frontend.svg?branch=development)](https://travis-ci.org/fossasia/open-event-frontend)
[![Netlify Status](https://api.netlify.com/api/v1/badges/89d57fdc-826c-400b-af13-c542e9513f62/deploy-status)](https://app.netlify.com/sites/open-event-fe/deploys)
[![Gitter](https://img.shields.io/badge/chat-on%20gitter-ff006f.svg?style=flat-square)](https://gitter.im/fossasia/open-event-frontend)
[![Mailing](https://img.shields.io/badge/Mailing-List-red.svg)](https://groups.google.com/forum/#!forum/open-event)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0d51cf60fc734d3699fd6eff6054e483)](https://www.codacy.com/app/fossasia/open-event-frontend?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=fossasia/open-event-frontend&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/fossasia/open-event-frontend/branch/development/graph/badge.svg)](https://codecov.io/gh/fossasia/open-event-frontend)
[![Greenkeeper badge](https://badges.greenkeeper.io/fossasia/open-event-frontend.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/fossasia/open-event-frontend/badge.svg)](https://snyk.io/test/github/fossasia/open-event-frontend)
[![Crowdin](https://d322cqt584bo4o.cloudfront.net/open-event-frontend/localized.svg)](http://translate.eventyay.com/project/open-event-frontend)

The front end for the **Open Event Server**

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

**API Documentation:**
- Every installation of the **Open Event Server** project includes API docs, (e.g. here on the test install [https://open-event-api.herokuapp.com](https://open-event-api.herokuapp.com)).
- A hosted version of the API docs is available in the `gh-pages` branch of the **Open Event Server** repository at [http://dev.eventyay.com/api/v1](http://dev.eventyay.com/api/v1)

## Communication

Please join our [Mailing list](https://groups.google.com/forum/#!forum/open-event) or [chat channel](https://gitter.im/fossasia/open-event-frontend) to get in touch with the developers.

## Installation

The Open Event Frontend can be easily deployed on a variety of platforms. Detailed platform specific instructions have been provided below.

1. [Local Installation](/docs/installation/local.md)
1. [Publish to GitHub Pages](/docs/installation/Publish-to-GitHub-Pages.md)
1. [Running in Docker](/docs/installation/docker.md)

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details.

### Running Tests

This project has acceptance, integration and unit tests located inside the `tests/` folder.

* `ember test` - CLI output
* `ember test --server` - Live browser preview and console access

### Building

* `ember build` (development)
* `ember build --environment production` (production)


## Deployments, Docker images and Releases

### Deployments
**Master branch** 

The master branch of open-event-frontend gets deployed in a production environment at [https://eventyay.com](https://eventyay.com)
It consumes the API exposed by master branch deployment of open event server, hosted at [https://api.eventyay.com](https://api.eventyay.com)

**Development branch**

The **development** branch of open-event-frontend gets deployed at [https://opev-fe.netlify.com](https://opev-fe.netlify.com)
It consumes the API exposed by development branch of open event server, hosted at [https://open-event-api-dev.herokuapp.com](https://open-event-api-dev.herokuapp.com)


### Release Cycle

Stable versions will released periodically, starting from version 1.0.0 when open-event-frontend went into production. Version names will follow [semantic versioning](https://semver.org/)

### Docker Hub Images
Docker images hosted on [open-event-frontend repository](https://cloud.docker.com/u/eventyay/repository/docker/eventyay/open-event-frontend) under eventyay organisation on docker hub are updated for each push on master and developement branch. Separate tags for each version release are also maintained. They are as follows:

|Branch/Release | Image|
|---|---|
|Master| eventyay/open-event-frontend:latest|
|Development | eventyay/open-event-frontend:development | 
|Version(vx.y.z) | eventyay/open-event-frontend:vx.y.z|

## Further Reading / Useful Links
* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* [Semantic UI](https://semantic-ui.com/)
* [Semantic-UI-Ember](https://semantic-org.github.io/Semantic-UI-Ember/)
* Development Browser Extensions
    * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
    * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Contributions Best Practices

**Commits**

* Write clear meaningful git commit messages (Do read https://chris.beams.io/posts/git-commit/)
* Make sure your PR's description contains GitHub's special keyword references that automatically close the related issue when the PR is merged. (More info at https://github.com/blog/1506-closing-issues-via-pull-requests )
* When you make very minor changes to a PR of yours (like for example fixing a failing Travis build or some small style corrections or minor changes requested by reviewers) make sure you squash your commits afterward so that you don't have an absurd number of commits for a very small fix. (Learn how to squash at https://davidwalsh.name/squash-commits-git )
* When you're submitting a PR for a UI-related issue, it would be really awesome if you add a screenshot of your change or a link to a deployment where it can be tested out along with your PR. It makes it very easy for the reviewers and you'll also get reviews quicker.

**Feature Requests and Bug Reports**

When you file a feature request or when you are submitting a bug report to the [issue tracker](https://github.com/fossasia/open-event-frontend/issues), make sure you add steps to reproduce it. Especially if that bug is some weird/rare one.

**Join the development**

* Before you join development, please set up the project on your local machine, run it and go through the application completely. Press on any button you can find and see where it leads to. Explore. (Don't worry ... Nothing will happen to the app or to you due to the exploring :wink: Only thing that will happen is, you'll be more familiar with what is where and might even get some cool ideas on how to improve various aspects of the app.)
* If you would like to work on an issue, drop in a comment at the issue. If it is already assigned to someone, but there is no sign of any work being done, please feel free to drop in a comment so that the issue can be assigned to you if the previous assignee has dropped it entirely.

## License

This project is currently licensed under the [Apache License version 2.0](LICENSE).

To obtain the software under a different license, Please contact **[FOSSASIA](https://blog.fossasia.org/contact/)**.
