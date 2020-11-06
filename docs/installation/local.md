# Local
Follow these steps to set up the project locally.
## Dependencies
You will need the following things properly installed on your computer.

* **[Git](https://git-scm.com/)**
* **[Node.js 12.x LTS](https://nodejs.org/)**
* **[Yarn](https://yarnpkg.com/en/docs/install)**

It is also recommended to have [watchman](https://facebook.github.io/watchman/docs/install) installed to speed up the `file-watcher/auto-build` service of the ember build server.

## Steps
* `git clone <repository-url>` this repository
* `cd open-event-frontend`

**Note :** If you want to contribute, first fork the original repository and clone the forked repository into your local machine followed by ```cd``` into the directory
```sh
git clone https://github.com/USERNAME/open-event-frontend.git
cd open-event-frontend
```

* `yarn`
* `cp .env.example .env`
* `yarn l10n:generate`

#### Important Notes
 - Open Event Frontend supports [FastBoot](https://github.com/ember-fastboot/ember-cli-fastboot) which is disabled for the development environment and is controlled by the flag `FASTBOOT_DISABLED` in the `.env` file.  

- **Only for Mac users** :- If while running `yarn l10n:generate` you encounter `Get-Text Finding Error` or `Ember-l10n Missing Dependencies`. 
Please use this before running `yarn l10n:generate` again :
```sh
brew reinstall gettext
brew link --force gettext 
```

- By default, the `.env.example` file specifies the `API_HOST` as `https://open-event-api-dev.herokuapp.com` which is a test deployment of the open-event-server. If you intend to work on just the frontend, this is sufficient. **If however, you intend to work on issues which involve both the frontend and the backend, you must have the [open-event-server](https://github.com/fossasia/open-event-server) already up and running. Please install and set it up first before changing the URL for `API_HOST` to `http://localhost:5000` and proceeding to run the frontend.**
## Running / Development

* `yarn start`
* Visit your app at [http://localhost:4200](http://localhost:4200).

