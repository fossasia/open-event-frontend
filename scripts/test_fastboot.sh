#!/bin/bash

node ./scripts/fastboot-server.js &
sleep 5
FASTBOOT_PID=$!
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/)
kill -9 $FASTBOOT_PID

[ 200 = $STATUS_CODE ]
