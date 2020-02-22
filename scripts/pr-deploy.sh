#!/usr/bin/env bash
if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    echo "Not a PR. Skipping surge deployment"
    exit 0
fi

export REPO_SLUG_ARRAY=(${TRAVIS_REPO_SLUG//\// })
export REPO_OWNER=${REPO_SLUG_ARRAY[0]}
export REPO_NAME=${REPO_SLUG_ARRAY[1]}

npm i -g surge

export SURGE_LOGIN=test@example.co.in
# Token of a dummy account. So can be added to vcs
export SURGE_TOKEN=d1c28a7a75967cc2b4c852cca0d12206

export DEPLOY_DOMAIN=https://pr-${TRAVIS_PULL_REQUEST}-${REPO_NAME}-${REPO_OWNER}.surge.sh
surge --project ./dist --domain $DEPLOY_DOMAIN;
curl https://opev-frontend-commenter.herokuapp.com?id=${TRAVIS_PULL_REQUEST}
