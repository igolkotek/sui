#! /bin/bash
#it's for the case when subpackages must be installed, not updated
# installation is still manual, alas

curdir=$PWD

for dir in packages/utils packages/color_utils packages/icon packages/viewport packages/theme packages/themer packages/nav_sticky packages/common packages/delete_btn packages/modal packages/lazyimage packages/notifications packages/grid packages/autocomplete;
do echo "$dir"; cd "$dir"; ./pub_script.sh; cd "$curdir";
done;
#npm up
#npm run pub