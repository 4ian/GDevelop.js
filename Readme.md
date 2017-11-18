GDevelop.js
===========

This is a port of some parts of **[GDevelop]** to Javascript using **[Emscripten]**.

GDevelop is a full featured, cross-platform, open-source game creator software requiring no programming skills. Download it on [the official website](http://compilgames.net) and check its [GitHub page](https://github.com/4ian/GD).

This module is used to power [GDevApp], a radically innovative game creator that can be used by anyone to create games directly from a desktop or tablet web browser.

How to build
------------

* Make sure you have [CMake 3.5+](http://www.cmake.org/)

* Install [Emscripten](https://github.com/kripken/emscripten), as explained on the [Emscripten installation instructions](http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html):

```shell
./emsdk update
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
```

* Make sure you have Node.js installed and grunt:

```shell
    npm install -g grunt-cli
```

* Clone [GDevelop repository](https://github.com/4ian/GD) and this repository at the root of GD repository:

```shell
    git clone https://github.com/4ian/GD.git
    cd GD && git clone https://github.com/4ian/GDevelop.js.git
```

* Launch the build:

```shell
    cd GDevelop.js
    npm install
    grunt build
```

Output is created in */path/to/GD/Binaries/Output/libGD.js/*.

Launch tests and examples
-------------------------

Launch tests with grunt:

    grunt test

Or launch example:

    cd examples && node demo.js

The demo generate a json file that can be opened with [GDevelop] or [GDevApp]!

### Memory profiler

You can also build a version with the Emscripten memory profiler (added at the bottom of the web page):

    grunt build:with-profiler

### About the internal steps of compilation

The grunt *build* task:

 * create `Binaries/embuild` directory,
 * patch SFML `Config.hpp` file to make Emscripten recognized as a linux target,
 * launch CMake inside to compile GDevelop with *Emscripten toolchain file*,
 * update the glue.cpp and glue.js from Bindings.idl using *Emscripten WebIDL Binder*,
 * launch the compilation with *make* and wrap the generated `libGD.js.raw` into the final `libGD.js` file.

It also create a compressed `libGD.js.gz` file which is handy for distributing the library pre-compressed to web browsers.

Documentation
-------------

Refer to [GDevelop documentation](http://4ian.github.io/GD-Documentation/GDCore%20Documentation/) for detailed documentation of the original C++ classes. The file [Bindings.idl](https://github.com/4ian/GDevelop.js/blob/master/Bindings/Bindings.idl) describes all the classes available in GDevelop.js.

License
-------

* GDevelop.js is distributed under the **MIT license**.
* GDevelop is under the MIT license (and GPL v3 license for the GUI).

[GDevelop]: https://github.com/4ian/GD
[GDevApp]: https://gdevapp.com
[Emscripten]: https://github.com/kripken/emscripten
