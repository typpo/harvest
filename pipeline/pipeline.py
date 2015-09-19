#!/usr/bin/env python

import os

PIPELINE_DIR = os.path.dirname(os.path.realpath(__file__))

files = os.listdir(os.path.join(PIPELINE_DIR, 'images/original'))
for filename in files:
    fullpath = os.path.join(PIPELINE_DIR, 'images/original/', filename)
    outpath = os.path.join(PIPELINE_DIR, 'images/processed-nvdi/', filename)

    print fullpath, '-->', outpath

    cmd = 'infrapix_single -i "%s" -o "%s"' % (fullpath, outpath)
    os.system(cmd)
