#! /bin/bash

curdir=$PWD

for dir in packages/utils packages/viewport; 
do echo "$dir"; cd "$dir"; ls -l; cd "$curdir";
done;
