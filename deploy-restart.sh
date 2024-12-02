#!/bin/bash

if [ "$1" = "" ] && [ "$2" = "" ]
then
    echo "no argument"
else
    ssh dev-server "cd /home/github/apps/hal-platform && docker compose restart" | echo
fi