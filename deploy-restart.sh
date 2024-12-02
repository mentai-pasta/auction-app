#!/bin/bash

ssh dev-server "cd /home/github/apps/hal-platform && docker compose restart" | echo