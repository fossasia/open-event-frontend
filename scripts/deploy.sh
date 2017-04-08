#!/bin/bash

git config --global user.name "Travis CI"
git config --global user.email "noreply+travis@fossasia.org"

export DEPLOY_BRANCH=${DEPLOY_BRANCH:-master}

if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_REPO_SLUG" != "fossasia/open-event-frontend" -o  "$TRAVIS_BRANCH" != "$DEPLOY_BRANCH" ]; then
    echo "We update gh-pages branch only for changes in master. So, let's skip this shall we ? :)"
    exit 0
fi

export API_HOST=${DEPLOY_API_HOST};
export APP_NAME=${DEPLOY_APP_NAME};
ember deploy gh-pages-with-domain
