libGD.js
========

This is a port of some parts of [GDevelop] to Javascript using [Emscripten].

GDevelop is a full featured, cross-platform, open-source game creator software requiring no programming skills. Download it on [the official website](http://compilgames.net) and check its [GitHub page](https://github.com/4ian/GD).

How to build
------------

* Clone [GDevelop repository](https://github.com/4ian/GD)

        git clone https://github.com/4ian/GD.git

* Put libGD.js into a folder called `WebIDE` at the root of the GDevelop repository.
* Launch [CMake](http://www.cmake.org/), choose the Emscripten toolchain, and the root of the GDevelop repository for the sources. For example:

        cd /path/to/GD
        mkdir embuild && cd embuild
        cmake .. -DCMAKE_TOOLCHAIN_FILE=/path/to/emsdk/emscripten/1.30.0/cmake/Modules/Platform/Emscripten.cmake

* Patch SFML (TODO)
* TODO: try tweak options if error
* Launch compilation:

        make

## Building for old versions of emscripten

With old versions of emscripten, you may need to do:

    set EMCC_FAST_COMPILER=0       //on Windows
    export EMCC_FAST_COMPILER=0    //on Linux

before starting the compilation.

[GDevelop]: https://github.com/4ian/GD
[Emscripten]: https://github.com/kripken/emscripten
