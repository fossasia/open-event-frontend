#!/usr/bin/env bash

export DEPLOY_BRANCH=${DEPLOY_BRANCH:-master}

if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_REPO_SLUG" != "fossasia/open-event-frontend" -o  "$TRAVIS_BRANCH" != "$DEPLOY_BRANCH" ]; then
    echo "Skip production deployment for a very good reason."
    exit 0
fi

##
## Build frontend
##
export API_HOST=${DEPLOY_API_HOST}
export APP_NAME=${DEPLOY_APP_NAME}
export SENTRY_DSN=${DEPLOY_SENTRY_DSN}
node scripts/l10n.js generate
ember deploy production
cp -Rf tmp/deploy-dist kubernetes/images/frontend

##
## Build docker image and deploy
##
cd kubernetes/images/frontend
docker build --no-cache -t eventyay/frontend:$TRAVIS_COMMIT .
docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
docker tag eventyay/frontend:$TRAVIS_COMMIT eventyay/frontend:latest
docker push eventyay/frontend
