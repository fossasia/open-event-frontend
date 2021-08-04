#!/bin/sh

node ./scripts/fastboot-server.js

if [ "$FASTBOOT_DISABLED" == "true" ]
then
    nginx -g 'daemon off;'
fi
