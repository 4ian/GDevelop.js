# ℹ️ This repository is out-dated, it's now [integrated in GDevelop source code](https://github.com/4ian/GDevelop/tree/master/GDevelop.js) 

> Please take a look at the [latest version here in GDevelop source code](https://github.com/4ian/GDevelop/tree/master/GDevelop.js).

GDevelop.js
===========

This is a port of some parts of **[GDevelop]** to Javascript using **[Emscripten]**.

GDevelop is a full featured, cross-platform, open-source game creator software requiring no programming skills. Download it on [the official website](https://gdevelop-app.com) and check its [GitHub page](https://github.com/4ian/GDevelop).

How to build [![Build Status](https://travis-ci.org/4ian/GDevelop.js.svg?branch=master)](https://travis-ci.org/4ian/GDevelop.js)
------------

* Make sure you have [CMake 3.5+](http://www.cmake.org/)

* Install [Emscripten](https://github.com/kripken/emscripten), as explained on the [Emscripten installation instructions](http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html):

```shell
git clone https://github.com/juj/emsdk.git
cd emsdk
./emsdk update
./emsdk install sdk-1.37.37-64bit
./emsdk activate sdk-1.37.37-64bit
source ./emsdk_env.sh
```

(on Windows run `emsdk` instead of `./emsdk`, and `emsdk_env.bat` instead of `source ./emsdk_env.sh`. For up-to-date information, check again [Emscripten installation instructions](http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html)).

* Make sure you have Node.js installed and grunt:

```shell
    npm install -g grunt-cli
```

* Clone [GDevelop repository](https://github.com/4ian/GDevelop) and this repository at the root of GD repository:

```shell
    git clone https://github.com/4ian/GDevelop.git
    cd GDevelop && git clone https://github.com/4ian/GDevelop.js.git
```

* Launch the build:

```shell
    cd GDevelop.js
    npm install
    npm run build
```

Output is created in */path/to/GD/Binaries/Output/libGD.js/*.

* You can then launch GDevelop 5 that will use your build of Gdevelop.js:

```shell
    cd ..
    cd newIDE/app
    npm install
    npm start
```

More information in [GDevelop 5 readme](https://github.com/4ian/GD/blob/master/newIDE/README.md).

Launch tests and examples
-------------------------

Launch tests with grunt:

    npm test

Or launch example:

    cd examples && node demo.js

The demo generate a json file that can be opened with [GDevelop]!

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
* GDevelop is under the MIT license (and GPL v3 license for the old IDE).

[GDevelop]: https://github.com/4ian/GDevelop
[Emscripten]: https://github.com/kripken/emscripten
