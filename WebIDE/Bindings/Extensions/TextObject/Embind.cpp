/**

GDevelop - Text Object Extension
Copyright (c) 2008-2014 Florian Rival (Florian.Rival@gmail.com)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

    1. The origin of this software must not be misrepresented; you must not
    claim that you wrote the original software. If you use this software
    in a product, an acknowledgment in the product documentation would be
    appreciated but is not required.

    2. Altered source versions must be plainly marked as such, and must not be
    misrepresented as being the original software.

    3. This notice may not be removed or altered from any source
    distribution.

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
