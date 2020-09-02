#!/usr/bin/env bash

export DEPLOY_BRANCH=${DEPLOY_BRANCH:-master}

if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_REPO_SLUG" != "fossasia/open-event-frontend" -o  "$TRAVIS_BRANCH" != "$DEPLOY_BRANCH" ]; then
    echo "Skip production deployment for a very good reason."
    exit 0
fi

##
## Google Cloud Setup
##
sudo rm -f /usr/bin/git-credential-gcloud.sh
sudo rm -f /usr/bin/bq
sudo rm -f /usr/bin/gsutil
sudo rm -f /usr/bin/gcloud

curl https://sdk.cloud.google.com | bash;
source ~/.bashrc
gcloud components install kubectl

gcloud config set compute/zone us-west1-a
openssl aes-256-cbc -K $encrypted_2c9f8871f031_key -iv $encrypted_2c9f8871f031_iv -in ./kubernetes/travis/eventyay-b3ebbd09f2d2.json.enc -out eventyay-b3ebbd09f2d2.json -d
mkdir -p lib
gcloud auth activate-service-account --key-file eventyay-b3ebbd09f2d2.json
export GOOGLE_APPLICATION_CREDENTIALS=$(pwd)/eventyay-b3ebbd09f2d2.json
gcloud config set project eventyay
gcloud container clusters get-credentials nextgen-cluster

##
## Start rolling update of Kubernetes pod
##
kubectl set image deployment/frontend --namespace=web frontend=eventyay/frontend:$TRAVIS_COMMIT
