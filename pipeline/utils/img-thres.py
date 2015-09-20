#!/usr/bin/env python

import sys
from scipy import misc
import matplotlib.pyplot as plt
import numpy as np


# args[0] is path to input image
# args[1] optional output image

def gen_diff(args):
  img = misc.imread(args[0])
  output = img
  # print img.max(), img.min()
  if len(args) == 2:
    misc.imsave(args[1],output)
  else:
    plt.imshow(output)
    plt.show()



if __name__ == "__main__":
  gen_diff(sys.argv[1:])
