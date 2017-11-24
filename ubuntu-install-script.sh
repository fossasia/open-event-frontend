#!/usr/bin/env bash
# Well this is a script to install the project easily on ubuntu you would use it like so
#wget -qO- https://raw.githubusercontent.com/fossasia/open-event-frontend/ubuntu-install-script.sh | bash
sudo apt-get -y update
sudo apt-get -t install nodejs
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
source ~/.bashrc
nvm install 6
npm -g install npm
npm -g install bower
npm -g install ember-cli
npm install -g phantomjs-prebuilt
npm install -g check-node-version
git clone https://github.com/fossasia/open-event-frontend.git
cd open-event-frontend/
npm install
bower install
