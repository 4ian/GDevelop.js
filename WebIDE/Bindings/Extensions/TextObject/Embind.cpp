/**

GDevelop - Text Object Extension
Copyright (c) 2008-2014 Florian Rival (Florian.Rival@gmail.com)
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
#include "../../../../../Extensions/TextObject/TextObject.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(gd_TextObject) {
    class_<TextObject, base<gd::Object> >("TextObject")
        .constructor<const std::string &>()
        .function("setString", &TextObject::SetString)
        .function("getString", &TextObject::GetString)
        .function("setCharacterSize", &TextObject::SetCharacterSize)
        .function("getCharacterSize", &TextObject::GetCharacterSize)
        .function("setFontFilename", &TextObject::SetFontFilename)
        .function("getFontFilename", &TextObject::GetFontFilename)
        .function("isBold", &TextObject::IsBold)
        .function("setBold", &TextObject::SetBold)
        .function("isItalic", &TextObject::IsItalic)
        .function("setItalic", &TextObject::SetItalic)
        .function("isUnderlined", &TextObject::IsUnderlined)
        .function("setUnderlined", &TextObject::SetUnderlined)
        .function("setColor", &TextObject::SetColor)
        .function("getColorR", &TextObject::GetColorR)
        .function("getColorG", &TextObject::GetColorG)
        .function("getColorB", &TextObject::GetColorB)
        ;
}
#endif
