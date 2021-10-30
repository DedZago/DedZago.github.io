#!/usr/bin/bash

# Update all courses from 2021-22
for d in ${HOME}/Documents/MEGA/main/2021-22/*/; do
    dname=${d#"$(dirname $d)/"}   # subtract prefix
    dname=${dname%"/"}            # subtract postfix
    echo "--- Sending $dname ---"
    rsync -urtv --delete ${HOME}/Documents/MEGA/main/2021-22/$dname/build/main.pdf files/pdf/notes/$dname.pdf
done

echo "--- Sending CV ---"
rsync -urtv --delete ${HOME}/Documents/git/CV/build/zago_cv.pdf files/pdf/zago_cv.pdf

