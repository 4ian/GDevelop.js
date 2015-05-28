#include <string>
#include <set>
#include <map>
#include <utility>
#include <vector>
#include <GDCore/PlatformDefinition/Project.h>
#include <GDCore/PlatformDefinition/Layout.h>
#include <GDCore/PlatformDefinition/Object.h>
#include <GDCore/PlatformDefinition/Variable.h>
#include <GDCore/PlatformDefinition/Automatism.h>
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

#include <GDJS/EventsCodeGenerator.h>
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

#include "ProjectHelper.h"

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
#define STATIC_HasAutomatismAction HasAutomatismAction
#define STATIC_HasAutomatismCondition HasAutomatismCondition
#define STATIC_HasExpression HasExpression
#define STATIC_HasObjectExpression HasObjectExpression
#define STATIC_HasAutomatismExpression HasAutomatismExpression
#define STATIC_HasStrExpression HasStrExpression
#define STATIC_HasObjectStrExpression HasObjectStrExpression
#define STATIC_HasAutomatismStrExpression HasAutomatismStrExpression
#define STATIC_RenameObjectInEvents RenameObjectInEvents
#define STATIC_RemoveObjectInEvents RemoveObjectInEvents
#define STATIC_ReplaceStringInEvents ReplaceStringInEvents
#define STATIC_GetAutomatismMetadata GetAutomatismMetadata
#define STATIC_GetObjectMetadata GetObjectMetadata
#define STATIC_GetActionMetadata GetActionMetadata
#define STATIC_GetConditionMetadata GetConditionMetadata
#define STATIC_GetExpressionMetadata GetExpressionMetadata
#define STATIC_GetObjectExpressionMetadata GetObjectExpressionMetadata
#define STATIC_GetAutomatismExpressionMetadata GetAutomatismExpressionMetadata
#define STATIC_GetStrExpressionMetadata GetStrExpressionMetadata
#define STATIC_GetObjectStrExpressionMetadata GetObjectStrExpressionMetadata
#define STATIC_GetAutomatismStrExpressionMetadata GetAutomatismStrExpressionMetadata
#define STATIC_GenerateSceneEventsCompleteCode GenerateSceneEventsCompleteCode

//We postfix some methods with "At" as Javacsript does not support overloading
#define GetLayoutAt GetLayout
#define GetLayerAt GetLayer
#define GetObjectAt GetObject
#define GetAt Get
#define GetEventAt GetEvent
#define RemoveEventAt RemoveEvent

//We don't use prefix in .idl file to workaround a webidl_binder.py bug
//that can't find in its list of interfaces a class which has a prefix.
using namespace gd;
using namespace std;
#include "glue.cpp"
