#!/bin/bash
echo "Starting nginx";
exec "$@"
echo "Nginx stopped. Quitting.";
