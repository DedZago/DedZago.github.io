#!/usr/bin/bash

# Update all courses from 2021-22
for d in ${HOME}/Documents/MEGA/main/2021-22/*/; do
    dname=${d#"$(dirname $d)/"}   # subtract prefix
    dname=${dname%"/"}            # subtract postfix
    echo $dname
    rsync -urtv --delete ${HOME}/Documents/MEGA/main/2021-22/$dname/build/main.pdf files/pdf/notes/$dname.pdf
done
# rsync -urtv --delete ${HOME}/Documents/MEGA/main/2021-22/functional-analysis/build/main.pdf files/pdf/notes/functional-analysis.pdf
# rsync -urtv --delete ${HOME}/Documents/MEGA/main/2021-22/probability-theory/build/main.pdf files/pdf/notes/probability-theory.pdf
# rsync -urtv --delete ${HOME}/Documents/MEGA/main/2021-22/applied-multivariate-techniques/build/main.pdf files/pdf/notes/applied-multivariate-techniques.pdf
# rsync -urtv --delete ${HOME}/Documents/MEGA/main/2021-22/theory-methods-inference/build/main.pdf files/pdf/notes/theory-methods-inference.pdf
# rsync -urtv --delete ${HOME}/Documents/MEGA/main/2021-22/time-series/build/main.pdf files/pdf/notes/time-series.pdf
