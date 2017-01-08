# Illustrated Algorithms
JavaScript edition

Inspired by [Grokking Algorithms](https://www.manning.com/books/grokking-algorithms) and [python-execution-trace](https://github.com/mihneadb/python-execution-trace), this project aims to make common algorithms easier to grasp through interactive visualizations of their execution.

Visual representations of local variables augment the control flow, alongside actual source code. You can fast foward and rewind the execution to closely observe how an algorithm works.

## Principles

- The same code that is displayed in the illustration is also transformed using Babel and executed to trace the context at every step. Literally the same source file.
- Going back and forth between function execution (or call stack when algorithm uses recursion) is effortless. So is pausing and resuming.
- Visualizations must be easy to follow, fun to play with and simple enough to fit inside the screen of any modern phone.
