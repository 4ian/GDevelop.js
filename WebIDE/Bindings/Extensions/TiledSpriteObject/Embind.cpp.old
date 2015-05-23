/**

GDevelop - Tiled Sprite Extension
Copyright (c) 2012 Victor Levasseur (victorlevasseur01@orange.fr)
Copyright (c) 2014 Florian Rival (Florian.Rival@gmail.com)
This project is released under the MIT License.
*/

/*
 * When cross-compiling using emscripten, this file exposes the extension API
 * to javascript.
 */
#if defined(EMSCRIPTEN)
#include <emscripten/bind.h>
#include "GDCore/PlatformDefinition/Layout.h"
#include "GDCore/PlatformDefinition/Project.h"
#include "GDCore/PlatformDefinition/Platform.h"
#include "../../../../../Extensions/TiledSpriteObject/TiledSpriteObject.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(gd_TiledSpriteObject) {
    class_<TiledSpriteObject, base<gd::Object> >("TiledSpriteObject")
        .constructor<const std::string &>()
        .function("setTexture", &TiledSpriteObject::SetTexture)
        .function("getTexture", &TiledSpriteObject::GetTexture)
        .function("setWidth", &TiledSpriteObject::SetWidth)
        .function("setHeight", &TiledSpriteObject::SetHeight)
        .function("getWidth", &TiledSpriteObject::GetWidth)
        .function("getHeight", &TiledSpriteObject::GetHeight)
        ;
}
#endif
