# Local
Follow these steps to set up the project locally.
## Dependencies
You will need the following things properly installed on your computer.

* **[Git](https://git-scm.com/)**
* **[Node.js 8.x LTS](https://nodejs.org/)**
* **[Yarn](https://yarnpkg.com/en/docs/install)**
* **[Ember CLI](https://ember-cli.com/)** - `yarn global add ember-cli`

It is also recommended to have [watchman](https://facebook.github.io/watchman/docs/install.html) installed to speed up the `file-watcher/auto-build` service of the ember build server.

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

**Note:**  Open Event Frontend supports [FastBoot](https://github.com/ember-fastboot/ember-cli-fastboot) which is disabled for the development environment and is controlled by the flag `FASTBOOT_DISABLED` in the `.env` file.  
## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

