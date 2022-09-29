#!/usr/bin/bash

# Update all courses from 2021-22
for d in ${HOME}/Documents/MEGA/main/courses/2021-22/*/; do
    dname=${d#"$(dirname $d)/"}   # subtract prefix
    dname=${dname%"/"}            # subtract postfix
    echo "--- Sending $dname ---"
    rsync -urtv --delete ${HOME}/Documents/MEGA/main/courses/2021-22/$dname/build/main.pdf ${HOME}/Documents/git/DedZago.github.io/files/pdf/notes/$dname.pdf
done

SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
for d in ${HOME}/Documents/MEGA/main/courses/Other-courses/*/; do
    dname=${d#"$(dirname $d)/"}   # subtract prefix
    dname=${dname%"/"}            # subtract postfix
    echo "--- Sending $dname ---"
    rsync -urtv --delete ${HOME}/Documents/MEGA/main/courses/Other-courses/$dname/build/main.pdf ${HOME}/Documents/git/DedZago.github.io/files/pdf/notes/$dname.pdf
done
IFS=$SAVEIFS

echo "--- Sending CV ---"
rsync -urtv --delete ${HOME}/Documents/git/CV/build/zago_cv_academic.pdf ${HOME}/Documents/git/DedZago.github.io/files/pdf/zago_cv.pdf
