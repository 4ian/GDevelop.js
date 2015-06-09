libGD.js
========

This is a port of some parts of **[GDevelop]** to Javascript using **[Emscripten]**.

GDevelop is a full featured, cross-platform, open-source game creator software requiring no programming skills. Download it on [the official website](http://compilgames.net) and check its [GitHub page](https://github.com/4ian/GD).

This module is used to power [GDevApp], a radically innovative game creator that can be used by anyone to create games directly from a desktop or tablet web browser.

How to build
------------

Make sure you have [CMake](http://www.cmake.org/) and [Emscripten](https://github.com/kripken/emscripten) installed (your OS package manager should be able to provide both). You need Emscripten 1.33.1 at least to avoid [this bug](https://github.com/kripken/emscripten/pull/3479).

* Clone [GDevelop repository](https://github.com/4ian/GD) and this repository at the root of GD repository:

```shell
    git clone https://github.com/4ian/GD.git
    cd GD && git clone https://github.com/4ian/libGD.js.git
```

* Patch WebIDL binder to support returning javascript boolean. Go to path/to/emscripten/tools/webidl_binder.py, search for

```python
    elif return_type == 'String':
      call_prefix += 'Pointer_stringify('
      call_postfix += ')'
```

and add just after:

```python
    elif return_type == 'Boolean':
      call_prefix += '!!('
      call_postfix += ')'
```

* Launch the build:

```shell
    cd libGD.js
    npm install
    grunt shell:cmake #The first time only
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

Refer to [GDevelop documentation](http://4ian.github.io/GD-Documentation/GDCore%20Documentation/) for detailed documentation of the original C++ classes. The file Bindings.idl describes all the classes available in libGD.js.

License
-------

* This library is distributed under the **MIT license**.
* GDevelop is under the MIT license (and GPL v3 license for the GUI).

[GDevelop]: https://github.com/4ian/GD
[GDevApp]: https://gdevapp.com
[Emscripten]: https://github.com/kripken/emscripten
