libGD.js
========

This is a port of some parts of Game Develop to Javascript using Emscripten.

How to build
------------

* Put this repository into a folder called WebIDE at the root of the Game Develop repository.
* Launch CMake, choose the emscripten toolchain, and the root of the GD repository for the sources.
* Go to the folder where the makefile was generated and launch the compilation.

You may need to do:

    set EMCC_FAST_COMPILER = 0     //on Windows
    export EMCC_FAST_COMPILER=0    //on Linux

before starting the compilation.