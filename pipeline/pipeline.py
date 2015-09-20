#!/usr/bin/env python

import os
#from process_infrablue import ndvi

PIPELINE_DIR = os.path.dirname(os.path.realpath(__file__))

outdir = os.path.join(PIPELINE_DIR, 'images/processed-ndvi/select')
os.system('rm -rf "%s"' % outdir)
os.system('mkdir -p "%s"' % outdir)

files = os.listdir(os.path.join(PIPELINE_DIR, 'images/original/select'))
for filename in files:
    fullpath = os.path.join(PIPELINE_DIR, 'images/original/select', filename)
    outpath = os.path.join(PIPELINE_DIR, 'images/processed-ndvi/select', filename)

    print fullpath, '-->', outpath

    #ndvi(fullpath, outpath, vmax=10, vmax=1000)

    cmd = 'infrapix_single -i "%s" -o "%s" --vmin 10 --vmax 100' % (fullpath, outpath)
    os.system(cmd)
