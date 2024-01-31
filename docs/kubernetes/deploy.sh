#!/bin/bash
export DIR=${BASH_SOURCE%/*}

if [ "$1" = "delete" ]; then
    echo "Clearing the cluster."
    kubectl delete -R -f ${DIR}/yamls
    echo "Done. The project was removed from the cluster."
elif [ "$1" = "create" ]; then
    echo "Deploying the project to kubernetes cluster"
    kubectl create -R -f ${DIR}/yamls
    echo "Done. The project was deployed to kubernetes. :)"
fi
