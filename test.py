import numpy as np
import math
# import matplotlib.pyplot as plt
import pandas as pd 

x = np.linspace(0,2*np.pi)
y = np.cos(x)

df = pd.DataFrame({"x" : x, "y" : y})
print(df)
# df.to_csv("./file.csv", index=False)
# plt.plot(x,y)
# plt.show()
