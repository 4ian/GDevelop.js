#include "ObjectJsImplementation.h"
#include <GDCore/IDE/Dialogs/PropertyDescriptor.h>
#include <GDCore/Project/Object.h>
#include <GDCore/Project/Project.h>
#include <GDCore/Serialization/Serializer.h>
#include <GDCore/Serialization/SerializerElement.h>
#include <emscripten.h>
#include <map>

using namespace gd;

std::unique_ptr<gd::Object> ObjectJsImplementation::Clone() const {
  ObjectJsImplementation* clone = new ObjectJsImplementation(*this);

  // Copy the references to the implementations of the functions
  EM_ASM_INT(
      {
        Module['getCache'](Module['ObjectJsImplementation'])[$0] = {};
        Module['getCache'](Module['ObjectJsImplementation'])[$0]['ptr'] = $0;
        Module['getCache'](
            Module['ObjectJsImplementation'])[$0]['getProperties'] =
            Module['getCache'](
                Module['ObjectJsImplementation'])[$1]['getProperties'];
        Module['getCache'](
            Module['ObjectJsImplementation'])[$0]['updateProperty'] =
            Module['getCache'](
                Module['ObjectJsImplementation'])[$1]['updateProperty'];
      },
      (int)clone,
      (int)this);

  return std::unique_ptr<gd::Object>(clone);
}

std::map<gd::String, gd::PropertyDescriptor>
ObjectJsImplementation::GetProperties(gd::Project&) const {
  std::map<gd::String, gd::PropertyDescriptor>* jsCreatedProperties = nullptr;
  std::map<gd::String, gd::PropertyDescriptor> copiedProperties;

  jsCreatedProperties = (std::map<gd::String, gd::PropertyDescriptor>*)EM_ASM_INT(
      {
        var self = Module['getCache'](Module['ObjectJsImplementation'])[$0];
        if (!self.hasOwnProperty('getProperties'))
          throw 'getProperties is not defined on a ObjectJsImplementation.';

        var objectContent = JSON.parse(Pointer_stringify($1));
        var newProperties = self['getProperties'](objectContent);
        if (!newProperties)
          throw 'getProperties returned nothing in a gd::ObjectJsImplementation.';

        return getPointer(newProperties);
      },
      (int)this,
      jsonContent.c_str());

  copiedProperties = *jsCreatedProperties;
  delete jsCreatedProperties;
  return copiedProperties;
}
bool ObjectJsImplementation::UpdateProperty(const gd::String& arg0,
                                              const gd::String& arg1,
                                              Project&) {
  jsonContent = (const char*)EM_ASM_INT(
      {
        var self = Module['getCache'](Module['ObjectJsImplementation'])[$0];
        if (!self.hasOwnProperty('updateProperty'))
          throw 'updateProperty is not defined on a ObjectJsImplementation.';
        var objectContent = JSON.parse(Pointer_stringify($1));
        self['updateProperty'](
            objectContent, Pointer_stringify($2), Pointer_stringify($3));
        return ensureString(JSON.stringify(objectContent));
      },
      (int)this,
      jsonContent.c_str(),
      arg0.c_str(),
      arg1.c_str());

  return true;
}
void ObjectJsImplementation::DoSerializeTo(SerializerElement& arg0) const {
  arg0 = gd::Serializer::FromJSON(jsonContent);
}
void ObjectJsImplementation::DoUnserializeFrom(Project& arg0, const SerializerElement& arg1) {
  jsonContent = gd::Serializer::ToJSON(arg1);
}
void ObjectJsImplementation::__destroy__() {  // Useless?
  EM_ASM_INT(
      {
        var self = Module['getCache'](Module['ObjectJsImplementation'])[$0];
        if (!self.hasOwnProperty('__destroy__'))
          throw 'a JSImplementation must implement all functions, you forgot ObjectJsImplementation::__destroy__.';
        self['__destroy__']();
      },
      (int)this);
}
