#!/bin/bash

if [ "$1" = "" ] && [ "$2" = "" ]
then
    echo "no argument"
else
    ssh $1@$2 -o StrictHostKeyChecking=no -o ProxyCommand="$SSH_PROXY_COMMAND" "cd /home/github/apps/hal-platform && docker compose restart" | echo
fi