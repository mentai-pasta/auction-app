#!/bin/bash

if [ "$1" = "" ] && [ "$2" = "" ]
then
    echo "no argument"
else
    ssh $0@$1 "cd /home/github/apps/hal-platform && docker compose restart" | echo
fi