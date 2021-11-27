#!/usr/bin/bash

# Update all courses from 2021-22
for d in ${HOME}/Documents/MEGA/main/2021-22/*/; do
    dname=${d#"$(dirname $d)/"}   # subtract prefix
    dname=${dname%"/"}            # subtract postfix
    echo "--- Sending $dname ---"
    rsync -urtv --delete ${HOME}/Documents/MEGA/main/2021-22/$dname/build/main.pdf ${HOME}/Documents/git/DedZago.github.io/files/pdf/notes/$dname.pdf
done

SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
for d in ${HOME}/Documents/MEGA/main/Other-courses/*/; do
    dname=${d#"$(dirname $d)/"}   # subtract prefix
    dname=${dname%"/"}            # subtract postfix
    echo "--- Sending $dname ---"
    rsync -urtv --delete ${HOME}/Documents/MEGA/main/Other-courses/$dname/build/main.pdf ${HOME}/Documents/git/DedZago.github.io/files/pdf/notes/$dname.pdf
done
IFS=$SAVEIFS

echo "--- Sending CV ---"
rsync -urtv --delete ${HOME}/Documents/git/CV/build/cv_thesis.pdf ${HOME}/Documents/git/DedZago.github.io/files/pdf/zago_cv.pdf
