libGD.js
========

This is a port of some parts of [GDevelop] to Javascript using [Emscripten].

GDevelop is a full featured, cross-platform, open-source game creator software requiring no programming skills. Download it on [the official website](http://compilgames.net) and check its [GitHub page](https://github.com/4ian/GD).

How to build
------------

Make sure you have [CMake](http://www.cmake.org/) and [Emscripten](https://github.com/kripken/emscripten) installed (your OS package manager should be able to provide both).

* Clone [GDevelop repository](https://github.com/4ian/GD)

        git clone https://github.com/4ian/GD.git

* Patch SFML (TODO)
* Put libGD.js into a folder called `WebIDE` at the root of the GDevelop repository.
* Launch grunt

        grunt build

### Internal steps for compilation

Internally, the grunt build task create `Binaries/embuild` directory, launch CMake inside to compile GDevelop with *Emscripten toolchain file*, update the glue.cpp and glue.js from Bindings.idl using *Emscripten WebIDL Binder*, launch the compilation with *make* and wrap the generated `libGD.js.raw` into the final `libGD.js` file.

It also create a compressed `libGD.js.gz` file which is handy for distributing the library pre-compressed to web browsers.

Launch tests and examples
-------------------------

Launch tests with grunt:

    grunt test

[GDevelop]: https://github.com/4ian/GD
[Emscripten]: https://github.com/kripken/emscripten
