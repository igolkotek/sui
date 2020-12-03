#! /bin/bash

for dir in packages/*; do
  if [ "$dir" != "packages/_theme" ]; then
    cd "$dir"
    $@
    cd ../..
  fi
done