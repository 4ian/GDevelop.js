#include <string>
#include <set>
#include <map>
#include <utility>
#include <vector>

#include <GDCore/PlatformDefinition/Project.h>
#include <GDCore/PlatformDefinition/Layout.h>
#include <GDCore/PlatformDefinition/Object.h>
#include <GDCore/PlatformDefinition/Variable.h>
#include <GDCore/PlatformDefinition/Behavior.h>
#include <GDCore/PlatformDefinition/VariablesContainer.h>
#include <GDCore/PlatformDefinition/Platform.h>
#include <GDCore/PlatformDefinition/InitialInstance.h>
#include <GDCore/PlatformDefinition/InitialInstancesContainer.h>
#include <GDCore/Serialization/SerializerElement.h>
#include <GDCore/Serialization/Serializer.h>

#include <GDCore/IDE/Dialogs/PropertyDescriptor.h>
#include <GDCore/IDE/Dialogs/ObjectListDialogsHelper.h>
#include <GDCore/IDE/TextFormatting.h>
#include <GDCore/IDE/InstructionSentenceFormatter.h>
#include <GDCore/IDE/EventsRefactorer.h>
#include <GDCore/IDE/ProjectResourcesAdder.h>
#include <GDCore/IDE/AbstractFileSystem.h>
#include <GDCore/IDE/ArbitraryResourceWorker.h>
#include <GDCore/IDE/MetadataProvider.h>
#include <GDCore/IDE/EventsParametersLister.h>
#include <GDCore/IDE/ArbitraryEventsWorker.h>

#include <GDCore/Events/Builtin/StandardEvent.h>
#include <GDCore/Events/Builtin/CommentEvent.h>
#include <GDCore/Events/Builtin/ForEachEvent.h>
#include <GDCore/Events/Builtin/WhileEvent.h>
#include <GDCore/Events/Builtin/RepeatEvent.h>
#include <GDCore/Events/Builtin/GroupEvent.h>

#include <GDCore/BuiltinExtensions/SpriteExtension/SpriteObject.h>
#include <GDCore/BuiltinExtensions/SpriteExtension/Animation.h>
#include <GDCore/BuiltinExtensions/SpriteExtension/Direction.h>
#include <GDCore/BuiltinExtensions/SpriteExtension/Sprite.h>

#include "../../Extensions/TiledSpriteObject/TiledSpriteObject.h"
#include "../../Extensions/TextObject/TextObject.h"

#include <GDJS/EventsCodeGenerator.h>
#include <GDJS/Exporter.h>

#include "ProjectHelper.h"
#include <emscripten.h>

/**
 * \brief Manual binding of gd::ArbitraryResourceWorker to allow overriding methods
 * that are using std::string
 */
class ArbitraryResourceWorkerJS : public ArbitraryResourceWorker {
public:
  void ExposeImage(std::string & arg0) {
    arg0 = (const char*)EM_ASM_INT({
      var self = Module['getCache'](Module['ArbitraryResourceWorkerJS'])[$0];
      if (!self.hasOwnProperty('exposeImage')) throw 'a JSImplementation must implement all functions, you forgot ArbitraryResourceWorkerJS::exposeImage.';
      return ensureString(self.exposeImage(Module.Pointer_stringify($1)));
    }, (int)this, arg0.c_str());
  }
  void ExposeShader(std::string & arg0) {
    arg0 = (const char*)EM_ASM_INT({
      var self = Module['getCache'](Module['ArbitraryResourceWorkerJS'])[$0];
      if (!self.hasOwnProperty('exposeShader')) throw 'a JSImplementation must implement all functions, you forgot ArbitraryResourceWorkerJS::exposeShader.';
      return ensureString(self.exposeShader(Module.Pointer_stringify($1)));
    }, (int)this, arg0.c_str());
  }
  void ExposeFile(std::string & arg0) {
    arg0 = (const char*)EM_ASM_INT({
      var self = Module['getCache'](Module['ArbitraryResourceWorkerJS'])[$0];
      if (!self.hasOwnProperty('exposeFile')) throw 'a JSImplementation must implement all functions, you forgot ArbitraryResourceWorkerJS::exposeFile.';
      return ensureString(self.exposeFile(Module.Pointer_stringify($1)));
    }, (int)this, arg0.c_str());
  }

};

/**
 * \brief Manual binding of gd::AbstractFileSystem to allow overriding methods
 * that are using std::string
 */
class AbstractFileSystemJS : public AbstractFileSystem
{
public:
	virtual void MkDir(const std::string & path) {
	    EM_ASM_INT({
	      var self = Module['getCache'](Module['AbstractFileSystemJS'])[$0];
	      if (!self.hasOwnProperty('mkDir')) throw 'a JSImplementation must implement all functions, you forgot AbstractFileSystemJS::mkDir.';
	      self.mkDir(Module.Pointer_stringify($1));
	    }, (int)this, path.c_str());
	}
    virtual bool DirExists(const std::string & path) {
	    return EM_ASM_INT({
	      var self = Module['getCache'](Module['AbstractFileSystemJS'])[$0];
	      if (!self.hasOwnProperty('dirExists')) throw 'a JSImplementation must implement all functions, you forgot AbstractFileSystemJS::dirExists.';
	      return self.dirExists(Module.Pointer_stringify($1));
	    }, (int)this, path.c_str());
	}

    virtual bool FileExists(const std::string & path) {
	    return EM_ASM_INT({
	      var self = Module['getCache'](Module['AbstractFileSystemJS'])[$0];
	      if (!self.hasOwnProperty('fileExists')) throw 'a JSImplementation must implement all functions, you forgot AbstractFileSystemJS::fileExists.';
	      return self.fileExists(Module.Pointer_stringify($1));
	    }, (int)this, path.c_str());
	}

    virtual std::string FileNameFrom(const std::string & file) {
	    return (const char *)EM_ASM_INT({
	      var self = Module['getCache'](Module['AbstractFileSystemJS'])[$0];
	      if (!self.hasOwnProperty('fileNameFrom')) throw 'a JSImplementation must implement all functions, you forgot AbstractFileSystemJS::fileNameFrom.';
	      return ensureString(self.fileNameFrom(Module.Pointer_stringify($1)));
	    }, (int)this, file.c_str());
	}

    virtual std::string DirNameFrom(const std::string & file) {
	    return (const char *)EM_ASM_INT({
	      var self = Module['getCache'](Module['AbstractFileSystemJS'])[$0];
	      if (!self.hasOwnProperty('dirNameFrom')) throw 'a JSImplementation must implement all functions, you forgot AbstractFileSystemJS::dirNameFrom.';
	      return ensureString(self.dirNameFrom(Module.Pointer_stringify($1)));
	    }, (int)this, file.c_str());
	}

    virtual bool MakeAbsolute(std::string & filename, const std::string & baseDirectory) {
	    filename = (const char*)EM_ASM_INT({
	      var self = Module['getCache'](Module['AbstractFileSystemJS'])[$0];
	      if (!self.hasOwnProperty('makeAbsolute')) throw 'a JSImplementation must implement all functions, you forgot AbstractFileSystemJS::makeAbsolute.';
	      return ensureString(self.makeAbsolute(Module.Pointer_stringify($1), Module.Pointer_stringify($2)));
	    }, (int)this, filename.c_str(), baseDirectory.c_str());

	    return true;
	}

    virtual bool MakeRelative(std::string & filename, const std::string & baseDirectory) {
    	std::cout << "MakeRelative: " << filename;
	    filename = (const char*)EM_ASM_INT({
	      var self = Module['getCache'](Module['AbstractFileSystemJS'])[$0];
	      if (!self.hasOwnProperty('makeRelative')) throw 'a JSImplementation must implement all functions, you forgot AbstractFileSystemJS::makeRelative.';
	      return ensureString(self.makeRelative(Module.Pointer_stringify($1), Module.Pointer_stringify($2)));
	    }, (int)this, filename.c_str(), baseDirectory.c_str());
    	std::cout << " => Result: " << filename << std::endl;

	    return true;
	}

    virtual bool IsAbsolute(const std::string & filename) {
	    return (bool)EM_ASM_INT({
	      var self = Module['getCache'](Module['AbstractFileSystemJS'])[$0];
	      if (!self.hasOwnProperty('isAbsolute')) throw 'a JSImplementation must implement all functions, you forgot AbstractFileSystemJS::isAbsolute.';
	      return self.isAbsolute(Module.Pointer_stringify($1));
	    }, (int)this, filename.c_str());
	};

    virtual bool CopyFile(const std::string & file, const std::string & destination) {
	    return (bool)EM_ASM_INT({
	      var self = Module['getCache'](Module['AbstractFileSystemJS'])[$0];
	      if (!self.hasOwnProperty('copyFile')) throw 'a JSImplementation must implement all functions, you forgot AbstractFileSystemJS::copyFile.';
	      return self.copyFile(Module.Pointer_stringify($1), Module.Pointer_stringify($2));
	    }, (int)this, file.c_str(), destination.c_str());
	}

    virtual bool ClearDir(const std::string & directory) {
	    return (bool)EM_ASM_INT({
	      var self = Module['getCache'](Module['AbstractFileSystemJS'])[$0];
	      if (!self.hasOwnProperty('clearDir')) throw 'a JSImplementation must implement all functions, you forgot AbstractFileSystemJS::clearDir.';
	      return self.clearDir(Module.Pointer_stringify($1));
	    }, (int)this, directory.c_str());
	}

    virtual bool WriteToFile(const std::string & file, const std::string & content) {
	    return (bool)EM_ASM_INT({
	      var self = Module['getCache'](Module['AbstractFileSystemJS'])[$0];
	      if (!self.hasOwnProperty('writeToFile')) throw 'a JSImplementation must implement all functions, you forgot AbstractFileSystemJS::writeToFile.';
	      return self.writeToFile(Module.Pointer_stringify($1), Module.Pointer_stringify($2));
	    }, (int)this, file.c_str(), content.c_str());
	}

    virtual std::string ReadFile(const std::string & file) {
	    return (const char *)EM_ASM_INT({
	      var self = Module['getCache'](Module['AbstractFileSystemJS'])[$0];
	      if (!self.hasOwnProperty('readFile')) throw 'a JSImplementation must implement all functions, you forgot AbstractFileSystemJS::readFile.';
	      return ensureString(self.readFile(Module.Pointer_stringify($1)));
	    }, (int)this, file.c_str());
	}
    virtual std::string GetTempDir() {
	    return (const char *)EM_ASM_INT({
	      var self = Module['getCache'](Module['AbstractFileSystemJS'])[$0];
	      if (!self.hasOwnProperty('getTempDir')) throw 'a JSImplementation must implement all functions, you forgot AbstractFileSystemJS::getTempDir.';
	      return ensureString(self.getTempDir());
	    }, (int)this);
	}

    virtual std::vector<std::string> ReadDir(const std::string & path, const std::string & extension = "") {
	    std::vector<std::string> directories = *(std::vector<std::string>*)EM_ASM_INT({
	      var self = Module['getCache'](Module['AbstractFileSystemJS'])[$0];
	      if (!self.hasOwnProperty('readDir')) throw 'a JSImplementation must implement all functions, you forgot AbstractFileSystemJS::readDir.';
	      return self.readDir(Module.Pointer_stringify($1), Module.Pointer_stringify($2)).ptr;
	    }, (int)this, path.c_str(), extension.c_str());

	    std::cout << "ReadDir Files:" << std::endl;
	    for(auto it : directories) {
	    	std::cout << it << std::endl;
	    }
	    return directories;
	}

    AbstractFileSystemJS() {};
    virtual ~AbstractFileSystemJS() {};
};

class InitialInstanceJSFunctorWrapper : public gd::InitialInstanceFunctor {
public:
    InitialInstanceJSFunctorWrapper() {};

    virtual void operator()(gd::InitialInstance * instance) {
    	invoke(instance);
    };

    virtual void invoke(gd::InitialInstance * instance) {
    };
};

//Declares typedef for std::vector and templatized types
typedef std::vector<std::string> VectorString;
typedef std::vector < std::shared_ptr<gd::PlatformExtension> > VectorPlatformExtension;
typedef std::pair<std::string, gd::Variable> PairStringVariable;
typedef std::pair<std::string, TextFormatting> PairStringTextFormatting;
typedef std::vector<std::pair<std::string, TextFormatting>> VectorPairStringTextFormatting;
typedef std::map<std::string, std::string> MapStringString;
typedef std::map<std::string, gd::ExpressionMetadata> MapStringExpressionMetadata;
typedef std::map<std::string, gd::InstructionMetadata> MapStringInstructionMetadata;
typedef std::map<std::string, gd::EventMetadata> MapStringEventMetadata;
typedef std::map<std::string, gd::Variable> MapStringVariable;
typedef std::map<std::string, gd::PropertyDescriptor> MapStringPropertyDescriptor;
typedef std::set<std::string> SetString;
typedef std::string StdString;
typedef gd::Object gdObject; //To avoid clashing javascript Object in glue.js

//Customize some functions implementation thanks to WRAPPED_* macros
//The original names will be reconstructed in the js file (see postjs.js)
#define WRAPPED_at(a) at(a).get()
#define WRAPPED_set(a, b) at(a) = b
#define WRAPPED_GetString(i) at(i).first
#define WRAPPED_GetComment() com1
#define WRAPPED_SetComment(str) com1 = str
#define WRAPPED_GetTextFormatting(i) at(i).second
#define WRAPPED_GetName() first
#define WRAPPED_GetVariable() second

#define MAP_get(a) find(a)->second
#define MAP_set(key, value) [key] = value
#define MAP_has(key) find(key) != self->end()

#define STATIC_CreateNewGDJSProject CreateNewGDJSProject
#define STATIC_InitializePlatforms InitializePlatforms
#define STATIC_ValidateObjectName ValidateObjectName
#define STATIC_ToJSON ToJSON
#define STATIC_FromJSON FromJSON
#define STATIC_IsObject IsObject
#define STATIC_Get Get
#define STATIC_AddAllMissingImages AddAllMissingImages
#define STATIC_GetAllUselessResources GetAllUselessResources
#define STATIC_RemoveAllUselessResources RemoveAllUselessResources
#define STATIC_HasCondition HasCondition
#define STATIC_HasAction HasAction
#define STATIC_HasObjectAction HasObjectAction
#define STATIC_HasObjectCondition HasObjectCondition
#define STATIC_HasBehaviorAction HasBehaviorAction
#define STATIC_HasBehaviorCondition HasBehaviorCondition
#define STATIC_HasExpression HasExpression
#define STATIC_HasObjectExpression HasObjectExpression
#define STATIC_HasBehaviorExpression HasBehaviorExpression
#define STATIC_HasStrExpression HasStrExpression
#define STATIC_HasObjectStrExpression HasObjectStrExpression
#define STATIC_HasBehaviorStrExpression HasBehaviorStrExpression
#define STATIC_RenameObjectInEvents RenameObjectInEvents
#define STATIC_RemoveObjectInEvents RemoveObjectInEvents
#define STATIC_ReplaceStringInEvents ReplaceStringInEvents
#define STATIC_GetBehaviorMetadata GetBehaviorMetadata
#define STATIC_GetObjectMetadata GetObjectMetadata
#define STATIC_GetActionMetadata GetActionMetadata
#define STATIC_GetConditionMetadata GetConditionMetadata
#define STATIC_GetExpressionMetadata GetExpressionMetadata
#define STATIC_GetObjectExpressionMetadata GetObjectExpressionMetadata
#define STATIC_GetBehaviorExpressionMetadata GetBehaviorExpressionMetadata
#define STATIC_GetStrExpressionMetadata GetStrExpressionMetadata
#define STATIC_GetObjectStrExpressionMetadata GetObjectStrExpressionMetadata
#define STATIC_GetBehaviorStrExpressionMetadata GetBehaviorStrExpressionMetadata
#define STATIC_GenerateSceneEventsCompleteCode GenerateSceneEventsCompleteCode

//We postfix some methods with "At" as Javascript does not support overloading
#define GetLayoutAt GetLayout
#define GetLayerAt GetLayer
#define GetObjectAt GetObject
#define GetAt Get
#define GetEventAt GetEvent
#define RemoveEventAt RemoveEvent
#define RemoveAt Remove

//We don't use prefix in .idl file to workaround a webidl_binder.py bug
//that can't find in its list of interfaces a class which has a prefix.
using namespace gd;
using namespace std;

#include "glue.cpp"
