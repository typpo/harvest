#!/usr/bin/env python

import sys
from scipy import misc
import matplotlib.pyplot as plt

# args[0:1] are paths to input images
# args[2] optional output image

def gen_diff(args):
  a = misc.imread(args[0])
  b = misc.imread(args[1])
  output = a - b
  # print output.max(), output.min()
  if args[2]:
    misc.imsave(args[2],output)
  else:
    plt.imshow(output)
    plt.show()



if __name__ == "__main__":
  gen_diff(sys.argv[1:])
