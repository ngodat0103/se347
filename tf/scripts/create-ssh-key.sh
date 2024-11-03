#!/bin/bash
mkdir -p /tmp/secrets
ssh-keygen -t rsa -b 4096 -f "/tmp/secrets/id_rsa" -N ""