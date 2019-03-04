#!/bin/bash

# Replaces 'commit' var in every environment file
for ENV_FILE in src/environments/environment*
do
  sed "s/.*__COMMIT__.*/  commit: '$COMMIT',/" $ENV_FILE > /tmp/env.tmp
  mv /tmp/env.tmp $ENV_FILE
done
