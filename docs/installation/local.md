# Local

Follow these steps to set up the project locally.

## Dependencies

You will need the following things properly installed on your computer.

- **[Git](https://git-scm.com/)**
- **[Node.js 14.x LTS](https://nodejs.org/)**
- **[Yarn](https://yarnpkg.com/en/docs/install)**

## Steps

- `git clone <repository-url>` this repository
- `cd open-event-frontend`

**Note :** If you want to contribute, first fork the original repository and clone the forked repository into your local machine followed by `cd` into the directory

```sh
git clone https://github.com/USERNAME/open-event-frontend.git
cd open-event-frontend
```

- `yarn`
## Important Note:
- **Only for Debian-based users (like Ubuntu)** : If you encounter an error when trying to run `yarn`, it's due to a conflict with the cmdtest package. You can resolve this by removing cmdtest and installing yarn using apt. Additionally, if you encounter an error due to Node.js version incompatibility, you can use nvm (Node Version Manager) to install and switch to the compatible Node.js version. Here are the steps:
1. Install nvm by running the following command: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`
2. Source nvm to use it in the current session: `source ~/.nvm/nvm.sh`
3. Install and use a compatible version of Node.js (for example, 14.18.1): `nvm install 14.18.1`
                                                                           `nvm use 14.18.1`
Also, If you encounter an error indicating that your `.npmrc` file has a globalconfig and/or a prefix setting, which are incompatible with nvm,
1. run the following command: `nvm use --delete-prefix v14.18.1`
2. Remove cmdtest: `sudo apt remove cmdtest`
3. Install yarn: `sudo apt install yarn`

You're good to go. Now, continue with the normal installation.

- `cp .env.example .env`
- `yarn l10n:generate`

#### Important Notes

- Open Event Frontend supports [FastBoot](https://github.com/ember-fastboot/ember-cli-fastboot) which is disabled for the development environment and is controlled by the flag `FASTBOOT_DISABLED` in the `.env` file.

- **Only for Mac users** :- If while running `yarn l10n:generate` you encounter `Get-Text Finding Error` or `Ember-l10n Missing Dependencies`.
  Please use this before running `yarn l10n:generate` again :

```sh
brew reinstall gettext
brew link --force gettext
```

- By default, the `.env.example` file specifies the `API_HOST` as `https://test-api.eventyay.com` which is a test deployment of the open-event-server. If you intend to work on just the frontend, this is sufficient. **If however, you intend to work on issues which involve both the frontend and the backend, you must have the [open-event-server](https://github.com/fossasia/open-event-server) already up and running. Please install and set it up first before changing the URL for `API_HOST` to `http://localhost:5000` and proceeding to run the frontend.**

- By default, the `environment.js` file specifies the `webAppGenerator` as `https://open-event-wsgen-dev.herokuapp.com` which is a test deployment of the open-event-wsgen. If you intend to work on just the frontend, this is sufficient. **If however, you intend to work on issues which involve both the frontend and the website generator, you must have the [open-event-wsgen](https://github.com/fossasia/open-event-wsgen) already up and running. Please install and set it up first before creating a constant URL for `WEB_APP_GENERATOR_HOST` to `http://localhost:3000` in .env and proceeding to run the frontend.**

## Running / Development

- `yarn start`
- Visit your app at [http://localhost:4200](http://localhost:4200).

## Using [**gitpod**](https://gitpod.io)

- Fork the repo and clone it on your system.
- Create a new branch & push it to your remote repository.
- Prefix the new branch remote url with _`gitpod.io/#`_  Like this: **`https://gitpod.io/#github.com/progmatic-99/open-event-frontend`**

    **`OR`**

- Install the [**browser extension**](https://www.gitpod.io/docs/quickstart#installing-the-gitpod-browser-extension).
