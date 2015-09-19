#!/usr/bin/env python

import os

PIPELINE_DIR = os.path.dirname(os.path.realpath(__file__))

files = os.listdir(os.path.join(PIPELINE_DIR, 'images/original'))
for filename in files:
    fullpath = os.path.join(PIPELINE_DIR, 'images/original/', filename)
    print fullpath

    infrapix_single -i $fullpath -o $fullpath_out
