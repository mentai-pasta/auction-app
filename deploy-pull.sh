#!/bin/bash

if [ "$1" = "" ] && [ "$2" = "" ]
then
    echo "no argument"
else
    ssh $1@$2 "cd /home/github/apps/hal-platform/docker-files/node/projects/auction-app && git pull origin" | echo
fi