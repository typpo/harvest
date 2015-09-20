#!/usr/bin/env python

import sys
from scipy import misc
import matplotlib.pyplot as plt
import numpy as np

import matplotlib.image as mpimg
from PIL import Image

# args[0] is path to input image
# args[1] optional output image

def main(args):
    img = Image.open(args[0])
    imgR, imgB, imgG = img.split() #get channels
    #compute the NDVI
    arrR = np.asarray(imgR).astype('float64')
    arrG = np.asarray(imgG).astype('float64') #this channel is ignored
    arrB = np.asarray(imgB).astype('float64')
    num   = (arrR - arrB)
    denom = (arrR + arrB)
    arr_ndvi = num/denom

    print np.mean(arr_ndvi)
    print np.amax(arr_ndvi)
    print np.amin(arr_ndvi)


if __name__ == "__main__":
  main(sys.argv[1:])
