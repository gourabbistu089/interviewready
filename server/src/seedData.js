// scripts/seedData.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Cheatsheet = require('./models/Cheatsheet');

dotenv.config();

const database = require("./config/database");
 database.connect();


const comprehensiveData = [
  {
    "language": "numpy",
    "title": "NumPy: The Definitive Cheatsheet",
    "description": "A comprehensive guide to the NumPy library, created from your notebooks. This cheatsheet covers array creation, attributes, manipulation, operations, and advanced indexing, providing a solid foundation for scientific computing in Python.",
    "sections": [
      {
        "title": "Introduction & Array Creation 🔢",
        "items": [
          {
            "concept": "What is NumPy?",
            "code": "# Import the numpy library, conventionally aliased as 'np'.\nimport numpy as np",
            "explanation": "NumPy (Numerical Python) is the fundamental package for scientific computing in Python. It provides a powerful N-dimensional array object, sophisticated (broadcasting) functions, tools for integrating C/C++ and Fortran code, and useful linear algebra, Fourier transform, and random number capabilities.",
            "tags": ["numpy", "introduction", "scientific-computing", "ndarray"],
            "difficulty": "beginner"
          },
          {
            "concept": "Creating Arrays from Python Objects",
            "code": "# 1. Create a 1D array from a Python list.\narr_1d = np.array([1, 2, 3, 4])\n\n# 2. Create a 2D array (matrix) from a list of lists.\nlist_2d = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\narr_2d = np.array(list_2d)\n\n# 3. NumPy arrays are homogeneous.\n# Mixing types (e.g., int and float) will upcast all elements to the most general type (float).\narr_upcast_float = np.array([1, 2, 3.5]) # Resulting dtype is float64\n\n# Mixing with strings will upcast all elements to string.\narr_upcast_str = np.array([1, 2, 3, 4, \"dd\", 4.4]) # Resulting dtype is string",
            "explanation": "The primary way to create a NumPy array is with the `np.array()` function. It can convert Python sequences like lists and tuples into a NumPy `ndarray`. Unlike Python lists, NumPy arrays are homogeneous, meaning all elements must be of the same data type. If different types are provided, NumPy will upcast them to the most general type.",
            "tags": ["array-creation", "ndarray", "np.array", "homogeneous", "upcasting"],
            "difficulty": "beginner"
          },
          {
            "concept": "Array Generation Functions",
            "code": "# np.arange creates arrays with regularly spaced values.\n# Format: np.arange(start, stop, step)\narr_range = np.arange(1, 11, 2) # -> array([1, 3, 5, 7, 9])\n\n# np.zeros creates an array filled with zeros.\n# Format: np.zeros(shape, dtype='float64')\narr_zeros = np.zeros(8, dtype='int') # -> array([0, 0, 0, 0, 0, 0, 0, 0])\n\n# np.ones creates an array filled with ones.\n# Format: np.ones(shape, dtype='float64')\narr_ones = np.ones((6, 6)) # Creates a 6x6 matrix of ones\n\n# np.linspace creates arrays with a specific number of evenly spaced points.\n# Format: np.linspace(start, stop, num_points)\narr_space = np.linspace(1, 5, 4) # -> array([1., 2.33, 3.66, 5.])",
            "explanation": "NumPy provides several functions to generate arrays from scratch. `np.arange` is similar to Python's `range` but returns an array. `np.zeros` and `np.ones` are useful for initializing arrays of a given shape. `np.linspace` is ideal for creating coordinate vectors when you need a specific number of points between a start and end value.",
            "tags": ["array-generation", "arange", "zeros", "ones", "linspace"],
            "difficulty": "beginner"
          },
          {
            "concept": "Random Array Generation",
            "code": "# np.random.rand creates an array of a given shape with random values\n# from a uniform distribution over [0, 1).\narr_uniform = np.random.rand(10)\n\n# np.random.randn creates an array with samples from the standard normal\n# (or \"Gaussian\") distribution (mean 0, variance 1).\narr_normal = np.random.randn(10)\n\n# np.random.randint creates an array of random integers in a given range.\n# Format: np.random.randint(low, high, size)\narr_integers = np.random.randint(10, 20, 10) # 10 integers from 10 (inclusive) to 20 (exclusive)",
            "explanation": "The `np.random` module is essential for creating arrays with random data, which is useful for simulations, testing, and machine learning. Use `rand` for uniform floats, `randn` for normally distributed floats, and `randint` for random integers.",
            "tags": ["random", "rand", "randn", "randint", "uniform-distribution", "normal-distribution"],
            "difficulty": "intermediate"
          }
        ]
      },
      {
        "title": "Array Attributes and Methods ⚙️",
        "items": [
          {
            "concept": "Inspecting Array Attributes",
            "code": "arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9], [4, 4, 6]])\n\n# .shape: A tuple representing the dimensions of the array.\nprint(arr.shape) # -> (4, 3)\n\n# .size: The total number of elements in the array.\nprint(arr.size) # -> 12\n\n# .dtype: The data type of the array's elements.\nprint(arr.dtype) # -> dtype('int64')\n\n# .ndim: The number of dimensions (or axes) of the array.\nprint(arr.ndim) # -> 2",
            "explanation": "Every NumPy array has attributes that describe its properties without requiring computation. `shape` gives the size of each dimension, `size` gives the total number of elements, `dtype` shows the data type of the elements, and `ndim` shows the number of axes.",
            "tags": ["attributes", "shape", "size", "dtype", "ndim"],
            "difficulty": "beginner"
          },
          {
            "concept": "Aggregate Methods & Functions",
            "code": "arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])\n\n# Basic aggregations across the entire array\narr.min()   # -> 1\narr.max()   # -> 9\narr.sum()   # -> 45\narr.mean()  # -> 5.0\narr.std()   # -> 2.58... (Standard Deviation)\n\n# Aggregations along an axis\n# axis=0 collapses the rows (performs operation down each column)\narr.sum(axis=0) # -> array([12, 15, 18])\n\n# axis=1 collapses the columns (performs operation across each row)\narr.sum(axis=1) # -> array([ 6, 15, 24])\n\n# argmin/argmax find the index of the min/max value\narr.argmin() # -> 0 (index of value 1)\narr.argmax() # -> 8 (index of value 9)",
            "explanation": "NumPy arrays come with a host of built-in aggregation methods for performing statistical calculations. These can be applied to the entire array or along a specific axis (`axis=0` for columns, `axis=1` for rows). `argmin` and `argmax` are useful for finding the location of extreme values.",
            "tags": ["aggregation", "sum", "mean", "min", "max", "std", "axis", "argmin", "argmax"],
            "difficulty": "intermediate"
          }
        ]
      },
      {
        "title": "Indexing, Slicing & Broadcasting 🎯",
        "items": [
          {
            "concept": "Indexing and Slicing",
            "code": "# For 1D arrays, it works like Python lists\narr_1d = np.arange(11, 21)\narr_1d[4] # -> 15\n\n# Slicing format: [start:stop:step]\narr_1d[3::2] # -> array([14, 16, 18, 20])\n\n# For 2D arrays (matrices)\narr_2d = np.arange(1, 31).reshape(6, 5)\n\n# Access a single element: arr[row, col]\narr_2d[3, 4] # -> 20\n\n# Slice a sub-matrix: arr[row_slice, col_slice]\narr_2d[2:, 1:] # Rows from 2 to end, columns from 1 to end\n\n# Select an entire column\narr_2d[:, 2] # All rows, 3rd column -> array([ 3,  8, 13, 18, 23, 28])",
            "explanation": "Indexing is how you access elements in an array. Slicing allows you to extract subarrays. For multidimensional arrays, you can use a comma-separated tuple of indices or slices to select data from each dimension.",
            "tags": ["indexing", "slicing", "2d-array", "matrix"],
            "difficulty": "beginner"
          },
          {
            "concept": "Boolean Indexing",
            "code": "arr = np.arange(11, 21)\n\n# 1. Create a boolean mask based on a condition.\n# This returns an array of True/False values.\nbool_mask = arr % 2 == 0\n# -> array([False, True, False, True, ...])\n\n# 2. Use the mask to select elements from the original array.\n# This will only return elements where the mask is True.\neven_numbers = arr[bool_mask]\n# -> array([12, 14, 16, 18, 20])\n\n# This can be done in a single line\nstudents_over_90 = data[data[:, 1] > 90] # Example with student data",
            "explanation": "Boolean indexing allows you to select elements from an array based on a condition. You create a boolean array (the \"mask\") and use it to index the original array, which effectively filters the data, returning only the elements corresponding to `True` values in the mask.",
            "tags": ["boolean-indexing", "filtering", "masking", "conditional-selection"],
            "difficulty": "intermediate"
          },
          {
            "concept": "Broadcasting",
            "code": "# Broadcasting allows operations between arrays of different shapes.\n\n# --- Operation between an array and a scalar ---\n# The scalar is 'broadcast' to all elements of the array.\narr = np.array([10, 20, 30, 40])\narr + 10 # -> array([20, 30, 40, 50])\n\n# --- Operation between a 2D and 1D array ---\narr2d = np.arange(1, 26).reshape(5, 5)\n# If shapes are compatible, NumPy will stretch the smaller array\n# to match the shape of the larger one.\n# Example: Add a 1D array [0,1,2,3,4] to each row of arr2d",
            "explanation": "Broadcasting describes how NumPy treats arrays with different shapes during arithmetic operations. Subject to certain constraints, the smaller array is “broadcast” across the larger array so that they have compatible shapes. This avoids the need to explicitly create copies of data and makes code more efficient and readable.",
            "tags": ["broadcasting", "arithmetic", "shape", "ufunc"],
            "difficulty": "advanced"
          }
        ]
      },
      {
        "title": "Array Manipulation 🔄",
        "items": [
          {
            "concept": "Reshaping and Flattening",
            "code": "arr = np.arange(1, 36)\n\n# .reshape() changes the shape of an array without changing its data.\n# The new shape must have the same number of total elements.\narr_reshaped = arr.reshape(7, 5)\n\n# .T attribute transposes the array (swaps rows and columns).\nA = np.array([[1, 2], [3, 4]])\nA.T # -> array([[1, 3], [2, 4]])\n\n# .flatten() returns a 1D copy of the array.\narr_reshaped.flatten() # -> array([1, 2, 3, ... 35])",
            "explanation": "You can change the shape of an array as long as the total number of elements remains the same. `reshape()` is used to give a new shape to an array, `T` transposes its axes, and `flatten()` collapses the array into one dimension.",
            "tags": ["reshape", "transpose", "flatten", "manipulation"],
            "difficulty": "intermediate"
          },
          {
            "concept": "Stacking and Splitting",
            "code": "a = np.array([1, 2, 3, 4])\nb = np.array([5, 6, 7, 8])\n\n# --- Stacking Arrays ---\n# np.vstack: Stack arrays in sequence vertically (row wise).\nnp.vstack((a, b))\n\n# np.hstack: Stack arrays in sequence horizontally (column wise).\nnp.hstack((a, b))\n\n# np.column_stack: Stack 1-D arrays as columns into a 2-D array.\nnp.column_stack((a, b))\n\n# --- Splitting Arrays ---\nc = np.arange(16).reshape(4, 4)\n\n# np.hsplit: Split an array into multiple sub-arrays horizontally (column-wise).\nnp.hsplit(c, 2)\n\n# np.vsplit: Split an array into multiple sub-arrays vertically (row-wise).\nnp.vsplit(c, 2)",
            "explanation": "Stacking functions are used to join a sequence of arrays along a new axis. `vstack` and `hstack` are common helpers. Conversely, splitting functions like `vsplit` and `hsplit` break one array into multiple smaller ones.",
            "tags": ["stacking", "splitting", "vstack", "hstack", "vsplit", "hsplit"],
            "difficulty": "advanced"
          },
          {
            "concept": "Shallow vs. Deep Copy",
            "code": "a = np.arange(1, 11)\n\n# --- Shallow Copy (View) ---\n# Slicing creates a view. Modifying the slice modifies the original array.\nslice_view = a[0:5]\nslice_view[0] = 99\n# Now, a is array([99, 2, 3, ...])\n\n# --- Deep Copy ---\n# The .copy() method creates a new array with a new data buffer.\n# Modifying the copy does NOT affect the original.\ndeep_copy = a.copy()\ndeep_copy[0] = 1\n# The original 'a' still starts with 99.",
            "explanation": "Understanding how NumPy handles memory is crucial. By default, slicing an array creates a **view** (a shallow copy), which is a new array object that looks at the same data. Changes to the view will affect the original array. To create a completely independent array, you must use the `.copy()` method for a **deep copy**.",
            "tags": ["copy", "view", "shallow-copy", "deep-copy", "memory"],
            "difficulty": "advanced"
          }
        ]
      },
      {
        "title": "Mathematical & Linear Algebra Operations ➕",
        "items": [
          {
            "concept": "Element-wise Arithmetic (Ufuncs)",
            "code": "a1 = np.array([1, 2, 3, 4, 50])\na2 = np.array([6, 7, 8, 9, 10])\n\n# Arithmetic operations are applied element-wise.\na1 + a2 # -> array([ 7,  9, 11, 13, 60])\na1 * a2 # -> array([  6,  14,  24,  36, 500])\na1 / a2 # -> array([0.166..., 0.285..., ...])\na1 ** a2 # Exponentiation\n\n# Universal Functions (ufuncs) are functions that operate on ndarrays\n# in an element-by-element fashion.\nnp.sqrt(a1) # -> array([1.   , 1.414, ...])\nnp.exp(a1)  # Exponential function",
            "explanation": "A key feature of NumPy is its vectorized operations, implemented via **Universal Functions (ufuncs)**. Standard arithmetic operators (`+`, `*`, etc.) are overloaded to perform fast element-wise operations on arrays, which is significantly more efficient than iterating in Python.",
            "tags": ["ufunc", "vectorization", "element-wise", "arithmetic", "sqrt", "exp"],
            "difficulty": "beginner"
          },
          {
            "concept": "Matrix Operations",
            "code": "A = np.array([[1, 2], [3, 4]])\nB = np.array([[5, 6], [7, 8]])\n\n# --- Matrix Multiplication ---\n# 1. Using np.dot()\nnp.dot(A, B)\n\n# 2. Using the '@' operator (Python 3.5+)\nA @ B\n# Both result in: array([[19, 22], [43, 50]])\n\n# Note: A * B is element-wise multiplication, not matrix multiplication.",
            "explanation": "For linear algebra, NumPy distinguishes between element-wise multiplication (`*`) and matrix multiplication. Use the `np.dot()` function or the `@` infix operator for true matrix multiplication.",
            "tags": ["linear-algebra", "matrix-multiplication", "dot-product", "linalg"],
            "difficulty": "intermediate"
          }
        ]
      }
    ]
  }
]

async function seedDatabase() {
  try {
    console.log("Starting database seed...");
    
    // Clear existing data
    // await Cheatsheet.deleteMany({});
    // console.log('Cleared existing cheatsheets');
    
    // Insert comprehensive data
    await Cheatsheet.insertMany(comprehensiveData);
    console.log('Successfully seeded JavaScript cheatsheet data');
    
    // Display summary
    const count = await Cheatsheet.countDocuments();
    console.log('Total cheatsheets in database:', count);
    
    for (const sheet of comprehensiveData) {
      const sectionCount = sheet.sections.length;
      const itemCount = sheet.sections.reduce((total, section) => total + section.items.length, 0);
      console.log(sheet.language + ': ' + sectionCount + ' sections, ' + itemCount + ' concepts');
    }
    
    console.log('Seed completed successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    // mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// ✅ Run only when file is executed directly
if (require.main === module) {
  seedDatabase();
}
module.exports = { seedDatabase, comprehensiveData };