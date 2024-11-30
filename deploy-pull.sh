#!/bin/bash

if [ "$1" = "" ] && [ "$2" = "" ] && [ "$3" = "" ]
then
    echo "no argument"
else
    ssh $1@$2 -o StrictHostKeyChecking=no -o ProxyCommand="$3" "cd /home/github/apps/hal-platform/docker-files/node/projects/auction-app && git pull origin" | echo
fi