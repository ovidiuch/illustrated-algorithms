# Illustrated Algorithms
Algorithm → AST → CSS (3 x JavaScript)

Inspired by [Grokking Algorithms](https://www.manning.com/books/grokking-algorithms) and [python-execution-trace](https://github.com/mihneadb/python-execution-trace), this project aims to make common algorithms easier to grasp through interactive visualizations of their execution.

Visual representations of local variables augment the control flow, alongside actual source code. You can fast forward and rewind the execution to closely observe how an algorithm works.

## Principles

- The same code that is displayed next to the illustration is also decorated using [Babel](babel-plugin-trace-context/src/index.js) and executed to record the context at every step. Literally the same source file.
- Going back and forth between function execution (or call stack when algorithm uses recursion) is effortless. So is pausing and resuming.
- Visualizations must be easy to follow, fun to play with and simple enough to fit inside the screen of any modern phone.

## Motivation

To learn some basic algorithms and play with ASTs. Visual candy and smooth transitions are my soft spot.

## Work in progress

- Follow [@skidding](https://twitter.com/skidding) for updates
- Check out gifs attached to [Releases](https://github.com/skidding/illustrated-algorithms/releases) to see project evolution
- Let me know if you want to contribute, I'm open (as long as cohesion is maintained)
