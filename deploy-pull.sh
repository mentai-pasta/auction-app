#!/bin/bash

ssh dev-server "cd /home/github/apps/hal-platform/docker-files/node/projects/auction-app && git pull origin" | echo