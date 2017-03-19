
#include <emscripten.h>



class InitialInstanceJSFunctor : public InitialInstanceJSFunctorWrapper {
public:
  void invoke(InitialInstance* arg0) {
    EM_ASM_INT({
      var self = Module['getCache'](Module['InitialInstanceJSFunctor'])[$0];
      if (!self.hasOwnProperty('invoke')) throw 'a JSImplementation must implement all functions, you forgot InitialInstanceJSFunctor::invoke.';
      self['invoke']($1);
    }, (int)this, (int)arg0);
  }
  void __destroy__() {
    EM_ASM_INT({
      var self = Module['getCache'](Module['InitialInstanceJSFunctor'])[$0];
      if (!self.hasOwnProperty('__destroy__')) throw 'a JSImplementation must implement all functions, you forgot InitialInstanceJSFunctor::__destroy__.';
      self['__destroy__']();
    }, (int)this);
  }
};

extern "C" {

// Not using size_t for array indices as the values used by the javascript code are signed.
void array_bounds_check(const int array_size, const int array_idx) {
  if (array_idx < 0 || array_idx >= array_size) {
    EM_ASM_INT({
      throw 'Array index ' + $0 + ' out of bounds: [0,' + $1 + ')';
    }, array_idx, array_size);
  }
}

// ArbitraryResourceWorker

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ArbitraryResourceWorker___destroy___0(ArbitraryResourceWorker* self) {
  delete self;
}

// InitialInstanceJSFunctorWrapper

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstanceJSFunctorWrapper___destroy___0(InitialInstanceJSFunctorWrapper* self) {
  delete self;
}

// AbstractFileSystem

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystem___destroy___0(AbstractFileSystem* self) {
  delete self;
}

// Layout

Layout* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_Layout_0() {
  return new Layout();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_SetName_1(Layout* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetName_0(Layout* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_SetBackgroundColor_3(Layout* self, unsigned int arg0, unsigned int arg1, unsigned int arg2) {
  self->SetBackgroundColor(arg0, arg1, arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetBackgroundColorRed_0(Layout* self) {
  return self->GetBackgroundColorRed();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetBackgroundColorGreen_0(Layout* self) {
  return self->GetBackgroundColorGreen();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetBackgroundColorBlue_0(Layout* self) {
  return self->GetBackgroundColorBlue();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_SetWindowDefaultTitle_1(Layout* self, char* arg0) {
  self->SetWindowDefaultTitle(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetWindowDefaultTitle_0(Layout* self) {
  return self->GetWindowDefaultTitle().c_str();
}

InitialInstancesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetInitialInstances_0(Layout* self) {
  return &self->GetInitialInstances();
}

VariablesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetVariables_0(Layout* self) {
  return &self->GetVariables();
}

EventsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetEvents_0(Layout* self) {
  return &self->GetEvents();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_InsertNewLayer_2(Layout* self, char* arg0, unsigned int arg1) {
  self->InsertNewLayer(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_InsertLayer_2(Layout* self, Layer* arg0, unsigned int arg1) {
  self->InsertLayer(*arg0, arg1);
}

Layer* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetLayer_1(Layout* self, char* arg0) {
  return &self->GetLayer(arg0);
}

Layer* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetLayerAt_1(Layout* self, unsigned int arg0) {
  return &self->GetLayerAt(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_HasLayerNamed_1(Layout* self, char* arg0) {
  return self->HasLayerNamed(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_RemoveLayer_1(Layout* self, char* arg0) {
  self->RemoveLayer(arg0);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetLayersCount_0(Layout* self) {
  return self->GetLayersCount();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_SwapLayers_2(Layout* self, unsigned int arg0, unsigned int arg1) {
  self->SwapLayers(arg0, arg1);
}

LayoutEditorCanvasOptions* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetAssociatedLayoutEditorCanvasOptions_0(Layout* self) {
  return &self->GetAssociatedLayoutEditorCanvasOptions();
}

gdObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_InsertNewObject_4(Layout* self, Project* arg0, char* arg1, char* arg2, unsigned int arg3) {
  return &self->InsertNewObject(*arg0, arg1, arg2, arg3);
}

gdObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_InsertObject_2(Layout* self, gdObject* arg0, unsigned int arg1) {
  return &self->InsertObject(*arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_HasObjectNamed_1(Layout* self, char* arg0) {
  return self->HasObjectNamed(arg0);
}

gdObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetObject_1(Layout* self, char* arg0) {
  return &self->GetObject(arg0);
}

gdObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetObjectAt_1(Layout* self, unsigned int arg0) {
  return &self->GetObjectAt(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetObjectPosition_1(Layout* self, char* arg0) {
  self->GetObjectPosition(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_RemoveObject_1(Layout* self, char* arg0) {
  self->RemoveObject(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_SwapObjects_2(Layout* self, unsigned int arg0, unsigned int arg1) {
  self->SwapObjects(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout_GetObjectsCount_0(Layout* self) {
  return self->GetObjectsCount();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout___destroy___0(Layout* self) {
  delete self;
}

// MapStringEventMetadata

EventMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringEventMetadata_MAP_get_1(MapStringEventMetadata* self, char* arg0) {
  return &self->MAP_get(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringEventMetadata_MAP_set_2(MapStringEventMetadata* self, char* arg0, EventMetadata* arg1) {
  (*self)MAP_set(arg0, *arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringEventMetadata_MAP_has_1(MapStringEventMetadata* self, char* arg0) {
  return self->MAP_has(arg0);
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringEventMetadata_MAP_keys_0(MapStringEventMetadata* self) {
  static VectorString temp;
temp.clear(); for(auto it = self->begin(); it != self->end();++it) { temp.push_back(it->first); } return &temp;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringEventMetadata___destroy___0(MapStringEventMetadata* self) {
  delete self;
}

// Vector2f

sf::Vector2f* EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector2f_Vector2f_0() {
  return new sf::Vector2f();
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector2f_get_x_0(sf::Vector2f* self) {
  return self->x;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector2f_set_x_1(sf::Vector2f* self, float arg0) {
  self->x = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector2f_get_y_0(sf::Vector2f* self) {
  return self->y;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector2f_set_y_1(sf::Vector2f* self, float arg0) {
  self->y = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector2f___destroy___0(sf::Vector2f* self) {
  delete self;
}

// EventsRefactorer

void EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsRefactorer_STATIC_RenameObjectInEvents_6(EventsRefactorer* self, Platform* arg0, Project* arg1, Layout* arg2, EventsList* arg3, char* arg4, char* arg5) {
  self->STATIC_RenameObjectInEvents(*arg0, *arg1, *arg2, *arg3, arg4, arg5);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsRefactorer_STATIC_RemoveObjectInEvents_5(EventsRefactorer* self, Platform* arg0, Project* arg1, Layout* arg2, EventsList* arg3, char* arg4) {
  self->STATIC_RemoveObjectInEvents(*arg0, *arg1, *arg2, *arg3, arg4);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsRefactorer_STATIC_ReplaceStringInEvents_8(EventsRefactorer* self, Project* arg0, Layout* arg1, EventsList* arg2, char* arg3, char* arg4, bool arg5, bool arg6, bool arg7) {
  self->STATIC_ReplaceStringInEvents(*arg0, *arg1, *arg2, arg3, arg4, arg5, arg6, arg7);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsRefactorer___destroy___0(EventsRefactorer* self) {
  delete self;
}

// WhileEvent

WhileEvent* EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_WhileEvent_0() {
  return new WhileEvent();
}

InstructionsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_GetConditions_0(WhileEvent* self) {
  return &self->GetConditions();
}

InstructionsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_GetWhileConditions_0(WhileEvent* self) {
  return &self->GetWhileConditions();
}

InstructionsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_GetActions_0(WhileEvent* self) {
  return &self->GetActions();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_Clone_0(WhileEvent* self) {
  self->Clone();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_GetType_0(WhileEvent* self) {
  return self->GetType().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_SetType_1(WhileEvent* self, char* arg0) {
  self->SetType(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_IsExecutable_0(WhileEvent* self) {
  return self->IsExecutable();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_CanHaveSubEvents_0(WhileEvent* self) {
  return self->CanHaveSubEvents();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_HasSubEvents_0(WhileEvent* self) {
  return self->HasSubEvents();
}

EventsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_GetSubEvents_0(WhileEvent* self) {
  return &self->GetSubEvents();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_IsDisabled_0(WhileEvent* self) {
  return self->IsDisabled();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_SetDisabled_1(WhileEvent* self, bool arg0) {
  self->SetDisabled(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_IsFolded_0(WhileEvent* self) {
  return self->IsFolded();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent_SetFolded_1(WhileEvent* self, bool arg0) {
  self->SetFolded(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_WhileEvent___destroy___0(WhileEvent* self) {
  delete self;
}

// Platform

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Platform_GetName_0(Platform* self) {
  static gd::String temp;
  return (temp = self->GetName(), temp.c_str());
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Platform_GetFullName_0(Platform* self) {
  static gd::String temp;
  return (temp = self->GetFullName(), temp.c_str());
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Platform_GetSubtitle_0(Platform* self) {
  static gd::String temp;
  return (temp = self->GetSubtitle(), temp.c_str());
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Platform_GetDescription_0(Platform* self) {
  static gd::String temp;
  return (temp = self->GetDescription(), temp.c_str());
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Platform_IsExtensionLoaded_1(Platform* self, char* arg0) {
  return self->IsExtensionLoaded(arg0);
}

const VectorPlatformExtension* EMSCRIPTEN_KEEPALIVE emscripten_bind_Platform_GetAllPlatformExtensions_0(Platform* self) {
  return &self->GetAllPlatformExtensions();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Platform___destroy___0(Platform* self) {
  delete self;
}

// ProjectHelper

Project* EMSCRIPTEN_KEEPALIVE emscripten_bind_ProjectHelper_STATIC_CreateNewGDJSProject_0(ProjectHelper* self) {
  return &self->STATIC_CreateNewGDJSProject();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ProjectHelper_STATIC_InitializePlatforms_0(ProjectHelper* self) {
  self->STATIC_InitializePlatforms();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ProjectHelper___destroy___0(ProjectHelper* self) {
  delete self;
}

// Animation

Animation* EMSCRIPTEN_KEEPALIVE emscripten_bind_Animation_Animation_0() {
  return new Animation();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Animation_SetDirectionsCount_1(Animation* self, unsigned int arg0) {
  self->SetDirectionsCount(arg0);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_Animation_GetDirectionsCount_0(Animation* self) {
  return self->GetDirectionsCount();
}

Direction* EMSCRIPTEN_KEEPALIVE emscripten_bind_Animation_GetDirection_1(Animation* self, unsigned int arg0) {
  return &self->GetDirection(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Animation_SetDirection_2(Animation* self, Direction* arg0, unsigned int arg1) {
  self->SetDirection(*arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Animation_HasNoDirections_0(Animation* self) {
  return self->HasNoDirections();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Animation_UseMultipleDirections_0(Animation* self) {
  return self->UseMultipleDirections();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Animation_SetUseMultipleDirections_1(Animation* self, bool arg0) {
  self->SetUseMultipleDirections(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Animation___destroy___0(Animation* self) {
  delete self;
}

// VariablesContainer

VariablesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer_VariablesContainer_0() {
  return new VariablesContainer();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer_Has_1(VariablesContainer* self, char* arg0) {
  return self->Has(arg0);
}

Variable* EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer_Get_1(VariablesContainer* self, char* arg0) {
  return &self->Get(arg0);
}

PairStringVariable* EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer_GetAt_1(VariablesContainer* self, unsigned int arg0) {
  return &self->GetAt(arg0);
}

Variable* EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer_Insert_3(VariablesContainer* self, char* arg0, Variable* arg1, unsigned int arg2) {
  return &self->Insert(arg0, *arg1, arg2);
}

Variable* EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer_InsertNew_2(VariablesContainer* self, char* arg0, unsigned int arg1) {
  return &self->InsertNew(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer_Remove_1(VariablesContainer* self, char* arg0) {
  self->Remove(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer_Rename_2(VariablesContainer* self, char* arg0, char* arg1) {
  return self->Rename(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer_Swap_2(VariablesContainer* self, unsigned int arg0, unsigned int arg1) {
  self->Swap(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer_GetPosition_1(VariablesContainer* self, char* arg0) {
  return self->GetPosition(arg0);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer_Count_0(VariablesContainer* self) {
  return self->Count();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer_Clear_0(VariablesContainer* self) {
  self->Clear();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer_SerializeTo_1(VariablesContainer* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer_UnserializeFrom_1(VariablesContainer* self, SerializerElement* arg0) {
  self->UnserializeFrom(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VariablesContainer___destroy___0(VariablesContainer* self) {
  delete self;
}

// VectorPlatformExtension

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorPlatformExtension_size_0(VectorPlatformExtension* self) {
  return self->size();
}

const PlatformExtension* EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorPlatformExtension_WRAPPED_at_1(VectorPlatformExtension* self, unsigned int arg0) {
  return self->WRAPPED_at(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorPlatformExtension___destroy___0(VectorPlatformExtension* self) {
  delete self;
}

// ResourcesManager

ResourcesManager* EMSCRIPTEN_KEEPALIVE emscripten_bind_ResourcesManager_ResourcesManager_0() {
  return new ResourcesManager();
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_ResourcesManager_GetAllResourcesList_0(ResourcesManager* self) {
  static VectorString temp;
  return (temp = self->GetAllResourcesList(), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResourcesManager_HasResource_1(ResourcesManager* self, char* arg0) {
  return self->HasResource(arg0);
}

const Resource* EMSCRIPTEN_KEEPALIVE emscripten_bind_ResourcesManager_GetResource_1(ResourcesManager* self, char* arg0) {
  return &self->GetResource(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResourcesManager_AddResource_1(ResourcesManager* self, Resource* arg0) {
  return self->AddResource(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ResourcesManager_RemoveResource_1(ResourcesManager* self, char* arg0) {
  self->RemoveResource(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ResourcesManager_RenameResource_2(ResourcesManager* self, char* arg0, char* arg1) {
  self->RenameResource(arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResourcesManager_MoveResourceUpInList_1(ResourcesManager* self, char* arg0) {
  return self->MoveResourceUpInList(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResourcesManager_MoveResourceDownInList_1(ResourcesManager* self, char* arg0) {
  return self->MoveResourceDownInList(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ResourcesManager___destroy___0(ResourcesManager* self) {
  delete self;
}

// ForEachEvent

ForEachEvent* EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_ForEachEvent_0() {
  return new ForEachEvent();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_SetObjectToPick_1(ForEachEvent* self, char* arg0) {
  self->SetObjectToPick(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_GetObjectToPick_0(ForEachEvent* self) {
  return self->GetObjectToPick().c_str();
}

InstructionsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_GetConditions_0(ForEachEvent* self) {
  return &self->GetConditions();
}

InstructionsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_GetActions_0(ForEachEvent* self) {
  return &self->GetActions();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_Clone_0(ForEachEvent* self) {
  self->Clone();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_GetType_0(ForEachEvent* self) {
  return self->GetType().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_SetType_1(ForEachEvent* self, char* arg0) {
  self->SetType(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_IsExecutable_0(ForEachEvent* self) {
  return self->IsExecutable();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_CanHaveSubEvents_0(ForEachEvent* self) {
  return self->CanHaveSubEvents();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_HasSubEvents_0(ForEachEvent* self) {
  return self->HasSubEvents();
}

EventsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_GetSubEvents_0(ForEachEvent* self) {
  return &self->GetSubEvents();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_IsDisabled_0(ForEachEvent* self) {
  return self->IsDisabled();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_SetDisabled_1(ForEachEvent* self, bool arg0) {
  self->SetDisabled(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_IsFolded_0(ForEachEvent* self) {
  return self->IsFolded();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent_SetFolded_1(ForEachEvent* self, bool arg0) {
  self->SetFolded(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ForEachEvent___destroy___0(ForEachEvent* self) {
  delete self;
}

// VoidPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VoidPtr___destroy___0(void** self) {
  delete self;
}

// LayoutEditorCanvasOptions

LayoutEditorCanvasOptions* EMSCRIPTEN_KEEPALIVE emscripten_bind_LayoutEditorCanvasOptions_LayoutEditorCanvasOptions_0() {
  return new LayoutEditorCanvasOptions();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_LayoutEditorCanvasOptions_SerializeTo_1(LayoutEditorCanvasOptions* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_LayoutEditorCanvasOptions_UnserializeFrom_1(LayoutEditorCanvasOptions* self, SerializerElement* arg0) {
  self->UnserializeFrom(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_LayoutEditorCanvasOptions___destroy___0(LayoutEditorCanvasOptions* self) {
  delete self;
}

// MapStringPropertyDescriptor

PropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringPropertyDescriptor_MAP_get_1(MapStringPropertyDescriptor* self, char* arg0) {
  return &self->MAP_get(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringPropertyDescriptor_MAP_set_2(MapStringPropertyDescriptor* self, char* arg0, PropertyDescriptor* arg1) {
  (*self)MAP_set(arg0, *arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringPropertyDescriptor_MAP_has_1(MapStringPropertyDescriptor* self, char* arg0) {
  return self->MAP_has(arg0);
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringPropertyDescriptor_MAP_keys_0(MapStringPropertyDescriptor* self) {
  static VectorString temp;
temp.clear(); for(auto it = self->begin(); it != self->end();++it) { temp.push_back(it->first); } return &temp;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringPropertyDescriptor___destroy___0(MapStringPropertyDescriptor* self) {
  delete self;
}

// SpriteObject

SpriteObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_SpriteObject_1(char* arg0) {
  return new SpriteObject(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_AddAnimation_1(SpriteObject* self, Animation* arg0) {
  self->AddAnimation(*arg0);
}

Animation* EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_GetAnimation_1(SpriteObject* self, unsigned int arg0) {
  return &self->GetAnimation(arg0);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_GetAnimationsCount_0(SpriteObject* self) {
  return self->GetAnimationsCount();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_RemoveAnimation_1(SpriteObject* self, unsigned int arg0) {
  self->RemoveAnimation(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_RemoveAllAnimations_0(SpriteObject* self) {
  self->RemoveAllAnimations();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_HasNoAnimations_0(SpriteObject* self) {
  return self->HasNoAnimations();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_SwapAnimations_2(SpriteObject* self, unsigned int arg0, unsigned int arg1) {
  self->SwapAnimations(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_SetName_1(SpriteObject* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_GetName_0(SpriteObject* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_SetType_1(SpriteObject* self, char* arg0) {
  self->SetType(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_GetType_0(SpriteObject* self) {
  return self->GetType().c_str();
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_GetProperties_1(SpriteObject* self, Project* arg0) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetProperties(*arg0), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_UpdateProperty_3(SpriteObject* self, char* arg0, char* arg1, Project* arg2) {
  return self->UpdateProperty(arg0, arg1, *arg2);
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_GetInitialInstanceProperties_3(SpriteObject* self, InitialInstance* arg0, Project* arg1, Layout* arg2) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetInitialInstanceProperties(*arg0, *arg1, *arg2), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_UpdateInitialInstanceProperty_5(SpriteObject* self, InitialInstance* arg0, char* arg1, char* arg2, Project* arg3, Layout* arg4) {
  return self->UpdateInitialInstanceProperty(*arg0, arg1, arg2, *arg3, *arg4);
}

VariablesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_GetVariables_0(SpriteObject* self) {
  return &self->GetVariables();
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_GetAllBehaviorNames_0(SpriteObject* self) {
  static VectorString temp;
  return (temp = self->GetAllBehaviorNames(), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_HasBehaviorNamed_1(SpriteObject* self, char* arg0) {
  return self->HasBehaviorNamed(arg0);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_AddNewBehavior_3(SpriteObject* self, Project* arg0, char* arg1, char* arg2) {
  return self->AddNewBehavior(*arg0, arg1, arg2);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_GetBehavior_1(SpriteObject* self, char* arg0) {
  return &self->GetBehavior(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_RemoveBehavior_1(SpriteObject* self, char* arg0) {
  self->RemoveBehavior(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_RenameBehavior_2(SpriteObject* self, char* arg0, char* arg1) {
  return self->RenameBehavior(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_SerializeTo_1(SpriteObject* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject_UnserializeFrom_2(SpriteObject* self, Project* arg0, SerializerElement* arg1) {
  self->UnserializeFrom(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SpriteObject___destroy___0(SpriteObject* self) {
  delete self;
}

// PanelSpriteObject

PanelSpriteObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_PanelSpriteObject_1(char* arg0) {
  return new PanelSpriteObject(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_GetLeftMargin_0(PanelSpriteObject* self) {
  return self->GetLeftMargin();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_SetLeftMargin_1(PanelSpriteObject* self, float arg0) {
  self->SetLeftMargin(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_GetTopMargin_0(PanelSpriteObject* self) {
  return self->GetTopMargin();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_SetTopMargin_1(PanelSpriteObject* self, float arg0) {
  self->SetTopMargin(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_GetRightMargin_0(PanelSpriteObject* self) {
  return self->GetRightMargin();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_SetRightMargin_1(PanelSpriteObject* self, float arg0) {
  self->SetRightMargin(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_GetBottomMargin_0(PanelSpriteObject* self) {
  return self->GetBottomMargin();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_SetBottomMargin_1(PanelSpriteObject* self, float arg0) {
  self->SetBottomMargin(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_IsTiled_0(PanelSpriteObject* self) {
  return self->IsTiled();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_SetTiled_1(PanelSpriteObject* self, bool arg0) {
  self->SetTiled(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_SetTexture_1(PanelSpriteObject* self, char* arg0) {
  self->SetTexture(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_GetTexture_0(PanelSpriteObject* self) {
  return self->GetTexture().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_SetWidth_1(PanelSpriteObject* self, float arg0) {
  self->SetWidth(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_GetWidth_0(PanelSpriteObject* self) {
  return self->GetWidth();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_SetHeight_1(PanelSpriteObject* self, float arg0) {
  self->SetHeight(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_GetHeight_0(PanelSpriteObject* self) {
  return self->GetHeight();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_SetName_1(PanelSpriteObject* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_GetName_0(PanelSpriteObject* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_SetType_1(PanelSpriteObject* self, char* arg0) {
  self->SetType(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_GetType_0(PanelSpriteObject* self) {
  return self->GetType().c_str();
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_GetProperties_1(PanelSpriteObject* self, Project* arg0) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetProperties(*arg0), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_UpdateProperty_3(PanelSpriteObject* self, char* arg0, char* arg1, Project* arg2) {
  return self->UpdateProperty(arg0, arg1, *arg2);
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_GetInitialInstanceProperties_3(PanelSpriteObject* self, InitialInstance* arg0, Project* arg1, Layout* arg2) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetInitialInstanceProperties(*arg0, *arg1, *arg2), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_UpdateInitialInstanceProperty_5(PanelSpriteObject* self, InitialInstance* arg0, char* arg1, char* arg2, Project* arg3, Layout* arg4) {
  return self->UpdateInitialInstanceProperty(*arg0, arg1, arg2, *arg3, *arg4);
}

VariablesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_GetVariables_0(PanelSpriteObject* self) {
  return &self->GetVariables();
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_GetAllBehaviorNames_0(PanelSpriteObject* self) {
  static VectorString temp;
  return (temp = self->GetAllBehaviorNames(), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_HasBehaviorNamed_1(PanelSpriteObject* self, char* arg0) {
  return self->HasBehaviorNamed(arg0);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_AddNewBehavior_3(PanelSpriteObject* self, Project* arg0, char* arg1, char* arg2) {
  return self->AddNewBehavior(*arg0, arg1, arg2);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_GetBehavior_1(PanelSpriteObject* self, char* arg0) {
  return &self->GetBehavior(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_RemoveBehavior_1(PanelSpriteObject* self, char* arg0) {
  self->RemoveBehavior(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_RenameBehavior_2(PanelSpriteObject* self, char* arg0, char* arg1) {
  return self->RenameBehavior(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_SerializeTo_1(PanelSpriteObject* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject_UnserializeFrom_2(PanelSpriteObject* self, Project* arg0, SerializerElement* arg1) {
  self->UnserializeFrom(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PanelSpriteObject___destroy___0(PanelSpriteObject* self) {
  delete self;
}

// ObjectGroup

ObjectGroup* EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectGroup_ObjectGroup_0() {
  return new ObjectGroup();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectGroup_GetName_0(ObjectGroup* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectGroup_AddObject_1(ObjectGroup* self, char* arg0) {
  self->AddObject(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectGroup_RemoveObject_1(ObjectGroup* self, char* arg0) {
  self->RemoveObject(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectGroup_Find_1(ObjectGroup* self, char* arg0) {
  return self->Find(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectGroup___destroy___0(ObjectGroup* self) {
  delete self;
}

// Direction

Direction* EMSCRIPTEN_KEEPALIVE emscripten_bind_Direction_Direction_0() {
  return new Direction();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Direction_AddSprite_1(Direction* self, Sprite* arg0) {
  self->AddSprite(*arg0);
}

Sprite* EMSCRIPTEN_KEEPALIVE emscripten_bind_Direction_GetSprite_1(Direction* self, unsigned int arg0) {
  return &self->GetSprite(arg0);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_Direction_GetSpritesCount_0(Direction* self) {
  return self->GetSpritesCount();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Direction_HasNoSprites_0(Direction* self) {
  return self->HasNoSprites();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Direction_RemoveSprite_1(Direction* self, unsigned int arg0) {
  self->RemoveSprite(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Direction_RemoveAllSprites_0(Direction* self) {
  self->RemoveAllSprites();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Direction_IsLooping_0(Direction* self) {
  return self->IsLooping();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Direction_SetLoop_1(Direction* self, bool arg0) {
  self->SetLoop(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Direction_GetTimeBetweenFrames_0(Direction* self) {
  return self->GetTimeBetweenFrames();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Direction_SetTimeBetweenFrames_1(Direction* self, float arg0) {
  self->SetTimeBetweenFrames(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Direction_SwapSprites_2(Direction* self, unsigned int arg0, unsigned int arg1) {
  self->SwapSprites(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Direction___destroy___0(Direction* self) {
  delete self;
}

// InstructionSentenceFormatter

InstructionSentenceFormatter* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionSentenceFormatter_STATIC_Get_0(InstructionSentenceFormatter* self) {
  return self->STATIC_Get();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionSentenceFormatter_Translate_2(InstructionSentenceFormatter* self, Instruction* arg0, InstructionMetadata* arg1) {
  static gd::String temp;
  return (temp = self->Translate(*arg0, *arg1), temp.c_str());
}

VectorPairStringTextFormatting* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionSentenceFormatter_GetAsFormattedText_2(InstructionSentenceFormatter* self, Instruction* arg0, InstructionMetadata* arg1) {
  static VectorPairStringTextFormatting temp;
  return (temp = self->GetAsFormattedText(*arg0, *arg1), &temp);
}

TextFormatting* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionSentenceFormatter_GetFormattingFromType_1(InstructionSentenceFormatter* self, char* arg0) {
  static TextFormatting temp;
  return (temp = self->GetFormattingFromType(arg0), &temp);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionSentenceFormatter_LabelFromType_1(InstructionSentenceFormatter* self, char* arg0) {
  static gd::String temp;
  return (temp = self->LabelFromType(arg0), temp.c_str());
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionSentenceFormatter_LoadTypesFormattingFromConfig_0(InstructionSentenceFormatter* self) {
  self->LoadTypesFormattingFromConfig();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionSentenceFormatter___destroy___0(InstructionSentenceFormatter* self) {
  delete self;
}

// TextEntryObject

TextEntryObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_TextEntryObject_1(char* arg0) {
  return new TextEntryObject(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_SetName_1(TextEntryObject* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_GetName_0(TextEntryObject* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_SetType_1(TextEntryObject* self, char* arg0) {
  self->SetType(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_GetType_0(TextEntryObject* self) {
  return self->GetType().c_str();
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_GetProperties_1(TextEntryObject* self, Project* arg0) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetProperties(*arg0), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_UpdateProperty_3(TextEntryObject* self, char* arg0, char* arg1, Project* arg2) {
  return self->UpdateProperty(arg0, arg1, *arg2);
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_GetInitialInstanceProperties_3(TextEntryObject* self, InitialInstance* arg0, Project* arg1, Layout* arg2) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetInitialInstanceProperties(*arg0, *arg1, *arg2), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_UpdateInitialInstanceProperty_5(TextEntryObject* self, InitialInstance* arg0, char* arg1, char* arg2, Project* arg3, Layout* arg4) {
  return self->UpdateInitialInstanceProperty(*arg0, arg1, arg2, *arg3, *arg4);
}

VariablesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_GetVariables_0(TextEntryObject* self) {
  return &self->GetVariables();
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_GetAllBehaviorNames_0(TextEntryObject* self) {
  static VectorString temp;
  return (temp = self->GetAllBehaviorNames(), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_HasBehaviorNamed_1(TextEntryObject* self, char* arg0) {
  return self->HasBehaviorNamed(arg0);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_AddNewBehavior_3(TextEntryObject* self, Project* arg0, char* arg1, char* arg2) {
  return self->AddNewBehavior(*arg0, arg1, arg2);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_GetBehavior_1(TextEntryObject* self, char* arg0) {
  return &self->GetBehavior(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_RemoveBehavior_1(TextEntryObject* self, char* arg0) {
  self->RemoveBehavior(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_RenameBehavior_2(TextEntryObject* self, char* arg0, char* arg1) {
  return self->RenameBehavior(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_SerializeTo_1(TextEntryObject* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject_UnserializeFrom_2(TextEntryObject* self, Project* arg0, SerializerElement* arg1) {
  self->UnserializeFrom(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextEntryObject___destroy___0(TextEntryObject* self) {
  delete self;
}

// PairStringVariable

PairStringVariable* EMSCRIPTEN_KEEPALIVE emscripten_bind_PairStringVariable_PairStringVariable_0() {
  return new PairStringVariable();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_PairStringVariable_WRAPPED_GetName_0(PairStringVariable* self) {
  return self->WRAPPED_GetName().c_str();
}

Variable* EMSCRIPTEN_KEEPALIVE emscripten_bind_PairStringVariable_WRAPPED_GetVariable_0(PairStringVariable* self) {
  return &self->WRAPPED_GetVariable();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PairStringVariable___destroy___0(PairStringVariable* self) {
  delete self;
}

// ArbitraryResourceWorkerJS

ArbitraryResourceWorkerJS* EMSCRIPTEN_KEEPALIVE emscripten_bind_ArbitraryResourceWorkerJS_ArbitraryResourceWorkerJS_0() {
  return new ArbitraryResourceWorkerJS();
}




void EMSCRIPTEN_KEEPALIVE emscripten_bind_ArbitraryResourceWorkerJS___destroy___0(ArbitraryResourceWorkerJS* self) {
  delete self;
}

// AdMobObject

AdMobObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_AdMobObject_1(char* arg0) {
  return new AdMobObject(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_SetName_1(AdMobObject* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_GetName_0(AdMobObject* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_SetType_1(AdMobObject* self, char* arg0) {
  self->SetType(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_GetType_0(AdMobObject* self) {
  return self->GetType().c_str();
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_GetProperties_1(AdMobObject* self, Project* arg0) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetProperties(*arg0), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_UpdateProperty_3(AdMobObject* self, char* arg0, char* arg1, Project* arg2) {
  return self->UpdateProperty(arg0, arg1, *arg2);
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_GetInitialInstanceProperties_3(AdMobObject* self, InitialInstance* arg0, Project* arg1, Layout* arg2) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetInitialInstanceProperties(*arg0, *arg1, *arg2), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_UpdateInitialInstanceProperty_5(AdMobObject* self, InitialInstance* arg0, char* arg1, char* arg2, Project* arg3, Layout* arg4) {
  return self->UpdateInitialInstanceProperty(*arg0, arg1, arg2, *arg3, *arg4);
}

VariablesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_GetVariables_0(AdMobObject* self) {
  return &self->GetVariables();
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_GetAllBehaviorNames_0(AdMobObject* self) {
  static VectorString temp;
  return (temp = self->GetAllBehaviorNames(), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_HasBehaviorNamed_1(AdMobObject* self, char* arg0) {
  return self->HasBehaviorNamed(arg0);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_AddNewBehavior_3(AdMobObject* self, Project* arg0, char* arg1, char* arg2) {
  return self->AddNewBehavior(*arg0, arg1, arg2);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_GetBehavior_1(AdMobObject* self, char* arg0) {
  return &self->GetBehavior(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_RemoveBehavior_1(AdMobObject* self, char* arg0) {
  self->RemoveBehavior(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_RenameBehavior_2(AdMobObject* self, char* arg0, char* arg1) {
  return self->RenameBehavior(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_SerializeTo_1(AdMobObject* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject_UnserializeFrom_2(AdMobObject* self, Project* arg0, SerializerElement* arg1) {
  self->UnserializeFrom(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AdMobObject___destroy___0(AdMobObject* self) {
  delete self;
}

// BaseEvent

BaseEvent* EMSCRIPTEN_KEEPALIVE emscripten_bind_BaseEvent_BaseEvent_0() {
  return new BaseEvent();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BaseEvent_Clone_0(BaseEvent* self) {
  self->Clone();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_BaseEvent_GetType_0(BaseEvent* self) {
  return self->GetType().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BaseEvent_SetType_1(BaseEvent* self, char* arg0) {
  self->SetType(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_BaseEvent_IsExecutable_0(BaseEvent* self) {
  return self->IsExecutable();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_BaseEvent_CanHaveSubEvents_0(BaseEvent* self) {
  return self->CanHaveSubEvents();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_BaseEvent_HasSubEvents_0(BaseEvent* self) {
  return self->HasSubEvents();
}

EventsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_BaseEvent_GetSubEvents_0(BaseEvent* self) {
  return &self->GetSubEvents();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_BaseEvent_IsDisabled_0(BaseEvent* self) {
  return self->IsDisabled();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BaseEvent_SetDisabled_1(BaseEvent* self, bool arg0) {
  self->SetDisabled(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_BaseEvent_IsFolded_0(BaseEvent* self) {
  return self->IsFolded();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BaseEvent_SetFolded_1(BaseEvent* self, bool arg0) {
  self->SetFolded(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BaseEvent___destroy___0(BaseEvent* self) {
  delete self;
}

// SerializerElement

SerializerElement* EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerElement_SerializerElement_0() {
  return new SerializerElement();
}

const SerializerValue* EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerElement_GetValue_0(SerializerElement* self) {
  return &self->GetValue();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerElement_WRAPPED_SetBool_1(SerializerElement* self, bool arg0) {
  self->WRAPPED_SetBool(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerElement_WRAPPED_SetString_1(SerializerElement* self, char* arg0) {
  self->WRAPPED_SetString(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerElement_WRAPPED_SetInt_1(SerializerElement* self, int arg0) {
  self->WRAPPED_SetInt(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerElement_WRAPPED_SetDouble_1(SerializerElement* self, float arg0) {
  self->WRAPPED_SetDouble(arg0);
}

SerializerElement* EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerElement_AddChild_1(SerializerElement* self, char* arg0) {
  return &self->AddChild(arg0);
}

SerializerElement* EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerElement_GetChild_1(SerializerElement* self, char* arg0) {
  return &self->GetChild(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerElement_WRAPPED_SetChild_2(SerializerElement* self, char* arg0, SerializerElement* arg1) {
  self->WRAPPED_SetChild(arg0, *arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerElement_HasChild_1(SerializerElement* self, char* arg0) {
  return self->HasChild(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerElement___destroy___0(SerializerElement* self) {
  delete self;
}

// MapStringExpressionMetadata

ExpressionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringExpressionMetadata_MAP_get_1(MapStringExpressionMetadata* self, char* arg0) {
  return &self->MAP_get(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringExpressionMetadata_MAP_set_2(MapStringExpressionMetadata* self, char* arg0, ExpressionMetadata* arg1) {
  (*self)MAP_set(arg0, *arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringExpressionMetadata_MAP_has_1(MapStringExpressionMetadata* self, char* arg0) {
  return self->MAP_has(arg0);
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringExpressionMetadata_MAP_keys_0(MapStringExpressionMetadata* self) {
  static VectorString temp;
temp.clear(); for(auto it = self->begin(); it != self->end();++it) { temp.push_back(it->first); } return &temp;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringExpressionMetadata___destroy___0(MapStringExpressionMetadata* self) {
  delete self;
}

// ShapePainterObject

ShapePainterObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_ShapePainterObject_1(char* arg0) {
  return new ShapePainterObject(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_SetCoordinatesAbsolute_0(ShapePainterObject* self) {
  self->SetCoordinatesAbsolute();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_SetCoordinatesRelative_0(ShapePainterObject* self) {
  self->SetCoordinatesRelative();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_AreCoordinatesAbsolute_0(ShapePainterObject* self) {
  return self->AreCoordinatesAbsolute();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_SetName_1(ShapePainterObject* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_GetName_0(ShapePainterObject* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_SetType_1(ShapePainterObject* self, char* arg0) {
  self->SetType(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_GetType_0(ShapePainterObject* self) {
  return self->GetType().c_str();
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_GetProperties_1(ShapePainterObject* self, Project* arg0) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetProperties(*arg0), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_UpdateProperty_3(ShapePainterObject* self, char* arg0, char* arg1, Project* arg2) {
  return self->UpdateProperty(arg0, arg1, *arg2);
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_GetInitialInstanceProperties_3(ShapePainterObject* self, InitialInstance* arg0, Project* arg1, Layout* arg2) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetInitialInstanceProperties(*arg0, *arg1, *arg2), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_UpdateInitialInstanceProperty_5(ShapePainterObject* self, InitialInstance* arg0, char* arg1, char* arg2, Project* arg3, Layout* arg4) {
  return self->UpdateInitialInstanceProperty(*arg0, arg1, arg2, *arg3, *arg4);
}

VariablesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_GetVariables_0(ShapePainterObject* self) {
  return &self->GetVariables();
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_GetAllBehaviorNames_0(ShapePainterObject* self) {
  static VectorString temp;
  return (temp = self->GetAllBehaviorNames(), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_HasBehaviorNamed_1(ShapePainterObject* self, char* arg0) {
  return self->HasBehaviorNamed(arg0);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_AddNewBehavior_3(ShapePainterObject* self, Project* arg0, char* arg1, char* arg2) {
  return self->AddNewBehavior(*arg0, arg1, arg2);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_GetBehavior_1(ShapePainterObject* self, char* arg0) {
  return &self->GetBehavior(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_RemoveBehavior_1(ShapePainterObject* self, char* arg0) {
  self->RemoveBehavior(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_RenameBehavior_2(ShapePainterObject* self, char* arg0, char* arg1) {
  return self->RenameBehavior(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_SerializeTo_1(ShapePainterObject* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject_UnserializeFrom_2(ShapePainterObject* self, Project* arg0, SerializerElement* arg1) {
  self->UnserializeFrom(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ShapePainterObject___destroy___0(ShapePainterObject* self) {
  delete self;
}

// VectorPairStringTextFormatting

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorPairStringTextFormatting_size_0(VectorPairStringTextFormatting* self) {
  return self->size();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorPairStringTextFormatting_WRAPPED_GetString_1(VectorPairStringTextFormatting* self, unsigned int arg0) {
  return self->WRAPPED_GetString(arg0).c_str();
}

TextFormatting* EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorPairStringTextFormatting_WRAPPED_GetTextFormatting_1(VectorPairStringTextFormatting* self, unsigned int arg0) {
  return &self->WRAPPED_GetTextFormatting(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorPairStringTextFormatting___destroy___0(VectorPairStringTextFormatting* self) {
  delete self;
}

// EventsCodeGenerator

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsCodeGenerator_STATIC_GenerateSceneEventsCompleteCode_5(gdjs::EventsCodeGenerator* self, Project* arg0, Layout* arg1, EventsList* arg2, SetString* arg3, bool arg4) {
  static gd::String temp;
  return (temp = self->STATIC_GenerateSceneEventsCompleteCode(*arg0, *arg1, *arg2, *arg3, arg4), temp.c_str());
}

// InstructionsList

InstructionsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionsList_InstructionsList_0() {
  return new InstructionsList();
}

Instruction* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionsList_Insert_2(InstructionsList* self, Instruction* arg0, unsigned int arg1) {
  return &self->Insert(*arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionsList_size_0(InstructionsList* self) {
  return self->size();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionsList_WRAPPED_set_2(InstructionsList* self, unsigned int arg0, Instruction* arg1) {
  self->WRAPPED_set(arg0, *arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionsList_Contains_1(InstructionsList* self, Instruction* arg0) {
  return self->Contains(*arg0);
}

Instruction* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionsList_Get_1(InstructionsList* self, unsigned int arg0) {
  return &self->Get(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionsList_Remove_1(InstructionsList* self, Instruction* arg0) {
  self->Remove(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionsList_RemoveAt_1(InstructionsList* self, unsigned int arg0) {
  self->RemoveAt(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionsList_Clear_0(InstructionsList* self) {
  self->Clear();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionsList___destroy___0(InstructionsList* self) {
  delete self;
}

// Variable

Variable* EMSCRIPTEN_KEEPALIVE emscripten_bind_Variable_Variable_0() {
  return new Variable();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Variable_SetString_1(Variable* self, char* arg0) {
  self->SetString(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Variable_GetString_0(Variable* self) {
  return self->GetString().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Variable_SetValue_1(Variable* self, double arg0) {
  self->SetValue(arg0);
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Variable_GetValue_0(Variable* self) {
  return self->GetValue();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Variable_HasChild_1(Variable* self, char* arg0) {
  return self->HasChild(arg0);
}

Variable* EMSCRIPTEN_KEEPALIVE emscripten_bind_Variable_GetChild_1(Variable* self, char* arg0) {
  return &self->GetChild(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Variable_RemoveChild_1(Variable* self, char* arg0) {
  self->RemoveChild(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Variable_RenameChild_2(Variable* self, char* arg0, char* arg1) {
  return self->RenameChild(arg0, arg1);
}

const MapStringVariable* EMSCRIPTEN_KEEPALIVE emscripten_bind_Variable_GetAllChildren_0(Variable* self) {
  return &self->GetAllChildren();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Variable_IsNumber_0(Variable* self) {
  return self->IsNumber();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Variable_IsStructure_0(Variable* self) {
  return self->IsStructure();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Variable___destroy___0(Variable* self) {
  delete self;
}

// RepeatEvent

RepeatEvent* EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_RepeatEvent_0() {
  return new RepeatEvent();
}

InstructionsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_GetConditions_0(RepeatEvent* self) {
  return &self->GetConditions();
}

InstructionsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_GetActions_0(RepeatEvent* self) {
  return &self->GetActions();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_SetRepeatExpression_1(RepeatEvent* self, char* arg0) {
  self->SetRepeatExpression(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_GetRepeatExpression_0(RepeatEvent* self) {
  return self->GetRepeatExpression().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_Clone_0(RepeatEvent* self) {
  self->Clone();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_GetType_0(RepeatEvent* self) {
  return self->GetType().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_SetType_1(RepeatEvent* self, char* arg0) {
  self->SetType(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_IsExecutable_0(RepeatEvent* self) {
  return self->IsExecutable();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_CanHaveSubEvents_0(RepeatEvent* self) {
  return self->CanHaveSubEvents();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_HasSubEvents_0(RepeatEvent* self) {
  return self->HasSubEvents();
}

EventsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_GetSubEvents_0(RepeatEvent* self) {
  return &self->GetSubEvents();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_IsDisabled_0(RepeatEvent* self) {
  return self->IsDisabled();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_SetDisabled_1(RepeatEvent* self, bool arg0) {
  self->SetDisabled(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_IsFolded_0(RepeatEvent* self) {
  return self->IsFolded();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent_SetFolded_1(RepeatEvent* self, bool arg0) {
  self->SetFolded(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_RepeatEvent___destroy___0(RepeatEvent* self) {
  delete self;
}

// MapStringInstructionMetadata

InstructionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringInstructionMetadata_MAP_get_1(MapStringInstructionMetadata* self, char* arg0) {
  return &self->MAP_get(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringInstructionMetadata_MAP_set_2(MapStringInstructionMetadata* self, char* arg0, InstructionMetadata* arg1) {
  (*self)MAP_set(arg0, *arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringInstructionMetadata_MAP_has_1(MapStringInstructionMetadata* self, char* arg0) {
  return self->MAP_has(arg0);
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringInstructionMetadata_MAP_keys_0(MapStringInstructionMetadata* self) {
  static VectorString temp;
temp.clear(); for(auto it = self->begin(); it != self->end();++it) { temp.push_back(it->first); } return &temp;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringInstructionMetadata___destroy___0(MapStringInstructionMetadata* self) {
  delete self;
}

// InitialInstance

InitialInstance* EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_InitialInstance_0() {
  return new InitialInstance();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_SetObjectName_1(InitialInstance* self, char* arg0) {
  self->SetObjectName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_GetObjectName_0(InitialInstance* self) {
  return self->GetObjectName().c_str();
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_GetX_0(InitialInstance* self) {
  return self->GetX();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_SetX_1(InitialInstance* self, float arg0) {
  self->SetX(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_GetY_0(InitialInstance* self) {
  return self->GetY();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_SetY_1(InitialInstance* self, float arg0) {
  self->SetY(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_GetAngle_0(InitialInstance* self) {
  return self->GetAngle();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_SetAngle_1(InitialInstance* self, float arg0) {
  self->SetAngle(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_IsLocked_0(InitialInstance* self) {
  return self->IsLocked();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_SetLocked_1(InitialInstance* self, bool arg0) {
  self->SetLocked(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_GetZOrder_0(InitialInstance* self) {
  return self->GetZOrder();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_SetZOrder_1(InitialInstance* self, int arg0) {
  self->SetZOrder(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_GetLayer_0(InitialInstance* self) {
  return self->GetLayer().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_SetLayer_1(InitialInstance* self, char* arg0) {
  self->SetLayer(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_SetHasCustomSize_1(InitialInstance* self, bool arg0) {
  self->SetHasCustomSize(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_HasCustomSize_0(InitialInstance* self) {
  return self->HasCustomSize();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_SetCustomWidth_1(InitialInstance* self, float arg0) {
  self->SetCustomWidth(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_GetCustomWidth_0(InitialInstance* self) {
  return self->GetCustomWidth();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_SetCustomHeight_1(InitialInstance* self, float arg0) {
  self->SetCustomHeight(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_GetCustomHeight_0(InitialInstance* self) {
  return self->GetCustomHeight();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_UpdateCustomProperty_4(InitialInstance* self, char* arg0, char* arg1, Project* arg2, Layout* arg3) {
  self->UpdateCustomProperty(arg0, arg1, *arg2, *arg3);
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_GetCustomProperties_2(InitialInstance* self, Project* arg0, Layout* arg1) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetCustomProperties(*arg0, *arg1), &temp);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_GetRawFloatProperty_1(InitialInstance* self, char* arg0) {
  return self->GetRawFloatProperty(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_GetRawStringProperty_1(InitialInstance* self, char* arg0) {
  return self->GetRawStringProperty(arg0).c_str();
}

VariablesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance_GetVariables_0(InitialInstance* self) {
  return &self->GetVariables();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance___destroy___0(InitialInstance* self) {
  delete self;
}

// GroupEvent

GroupEvent* EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_GroupEvent_0() {
  return new GroupEvent();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_SetName_1(GroupEvent* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_GetName_0(GroupEvent* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_SetBackgroundColor_3(GroupEvent* self, unsigned int arg0, unsigned int arg1, unsigned int arg2) {
  self->SetBackgroundColor(arg0, arg1, arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_GetBackgroundColorR_0(GroupEvent* self) {
  return self->GetBackgroundColorR();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_GetBackgroundColorG_0(GroupEvent* self) {
  return self->GetBackgroundColorG();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_GetBackgroundColorB_0(GroupEvent* self) {
  return self->GetBackgroundColorB();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_SetSource_1(GroupEvent* self, char* arg0) {
  self->SetSource(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_GetSource_0(GroupEvent* self) {
  return self->GetSource().c_str();
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_GetCreationParameters_0(GroupEvent* self) {
  return &self->GetCreationParameters();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_GetCreationTimestamp_0(GroupEvent* self) {
  return self->GetCreationTimestamp();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_SetCreationTimestamp_1(GroupEvent* self, unsigned int arg0) {
  self->SetCreationTimestamp(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_Clone_0(GroupEvent* self) {
  self->Clone();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_GetType_0(GroupEvent* self) {
  return self->GetType().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_SetType_1(GroupEvent* self, char* arg0) {
  self->SetType(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_IsExecutable_0(GroupEvent* self) {
  return self->IsExecutable();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_CanHaveSubEvents_0(GroupEvent* self) {
  return self->CanHaveSubEvents();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_HasSubEvents_0(GroupEvent* self) {
  return self->HasSubEvents();
}

EventsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_GetSubEvents_0(GroupEvent* self) {
  return &self->GetSubEvents();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_IsDisabled_0(GroupEvent* self) {
  return self->IsDisabled();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_SetDisabled_1(GroupEvent* self, bool arg0) {
  self->SetDisabled(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_IsFolded_0(GroupEvent* self) {
  return self->IsFolded();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent_SetFolded_1(GroupEvent* self, bool arg0) {
  self->SetFolded(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GroupEvent___destroy___0(GroupEvent* self) {
  delete self;
}

// EventMetadata

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_EventMetadata_GetFullName_0(EventMetadata* self) {
  return self->GetFullName().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_EventMetadata_GetDescription_0(EventMetadata* self) {
  return self->GetDescription().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_EventMetadata_GetGroup_0(EventMetadata* self) {
  return self->GetGroup().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_EventMetadata___destroy___0(EventMetadata* self) {
  delete self;
}

// ExternalLayout

ExternalLayout* EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalLayout_ExternalLayout_0() {
  return new ExternalLayout();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalLayout_SetName_1(ExternalLayout* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalLayout_GetName_0(ExternalLayout* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalLayout_SetAssociatedLayout_1(ExternalLayout* self, char* arg0) {
  self->SetAssociatedLayout(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalLayout_GetAssociatedLayout_0(ExternalLayout* self) {
  return self->GetAssociatedLayout().c_str();
}

InitialInstancesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalLayout_GetInitialInstances_0(ExternalLayout* self) {
  return &self->GetInitialInstances();
}

LayoutEditorCanvasOptions* EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalLayout_GetAssociatedSettings_0(ExternalLayout* self) {
  return &self->GetAssociatedSettings();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalLayout_SerializeTo_1(ExternalLayout* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalLayout_UnserializeFrom_1(ExternalLayout* self, SerializerElement* arg0) {
  self->UnserializeFrom(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalLayout___destroy___0(ExternalLayout* self) {
  delete self;
}

// Resource

Resource* EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource_Resource_0() {
  return new Resource();
}

Resource* EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource_Clone_0(Resource* self) {
  return self->Clone();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource_SetName_1(Resource* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource_GetName_0(Resource* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource_SetKind_1(Resource* self, char* arg0) {
  self->SetKind(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource_GetKind_0(Resource* self) {
  return self->GetKind().c_str();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource_IsUserAdded_0(Resource* self) {
  return self->IsUserAdded();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource_SetUserAdded_1(Resource* self, bool arg0) {
  self->SetUserAdded(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource_UseFile_0(Resource* self) {
  return self->UseFile();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource_SetFile_1(Resource* self, char* arg0) {
  self->SetFile(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource_GetFile_0(Resource* self) {
  return self->GetFile().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource_GetAbsoluteFile_1(Resource* self, Project* arg0) {
  static gd::String temp;
  return (temp = self->GetAbsoluteFile(*arg0), temp.c_str());
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource_SerializeTo_1(Resource* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource_UnserializeFrom_1(Resource* self, SerializerElement* arg0) {
  self->UnserializeFrom(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Resource___destroy___0(Resource* self) {
  delete self;
}

// PlatformExtension

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetFullName_0(PlatformExtension* self) {
  return self->GetFullName().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetName_0(PlatformExtension* self) {
  return self->GetName().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetDescription_0(PlatformExtension* self) {
  return self->GetDescription().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetAuthor_0(PlatformExtension* self) {
  return self->GetAuthor().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetLicense_0(PlatformExtension* self) {
  return self->GetLicense().c_str();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_IsBuiltin_0(PlatformExtension* self) {
  return self->IsBuiltin();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetNameSpace_0(PlatformExtension* self) {
  return self->GetNameSpace().c_str();
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetExtensionObjectsTypes_0(PlatformExtension* self) {
  static VectorString temp;
  return (temp = self->GetExtensionObjectsTypes(), &temp);
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetBehaviorsTypes_0(PlatformExtension* self) {
  static VectorString temp;
  return (temp = self->GetBehaviorsTypes(), &temp);
}

ObjectMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetObjectMetadata_1(PlatformExtension* self, char* arg0) {
  return &self->GetObjectMetadata(arg0);
}

BehaviorMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetBehaviorMetadata_1(PlatformExtension* self, char* arg0) {
  return &self->GetBehaviorMetadata(arg0);
}

MapStringEventMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetAllEvents_0(PlatformExtension* self) {
  return &self->GetAllEvents();
}

MapStringInstructionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetAllActions_0(PlatformExtension* self) {
  return &self->GetAllActions();
}

MapStringInstructionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetAllConditions_0(PlatformExtension* self) {
  return &self->GetAllConditions();
}

MapStringExpressionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetAllExpressions_0(PlatformExtension* self) {
  return &self->GetAllExpressions();
}

MapStringExpressionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetAllStrExpressions_0(PlatformExtension* self) {
  return &self->GetAllStrExpressions();
}

MapStringInstructionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetAllActionsForObject_1(PlatformExtension* self, char* arg0) {
  return &self->GetAllActionsForObject(arg0);
}

MapStringInstructionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetAllConditionsForObject_1(PlatformExtension* self, char* arg0) {
  return &self->GetAllConditionsForObject(arg0);
}

MapStringExpressionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetAllExpressionsForObject_1(PlatformExtension* self, char* arg0) {
  return &self->GetAllExpressionsForObject(arg0);
}

MapStringExpressionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetAllStrExpressionsForObject_1(PlatformExtension* self, char* arg0) {
  return &self->GetAllStrExpressionsForObject(arg0);
}

MapStringInstructionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetAllActionsForBehavior_1(PlatformExtension* self, char* arg0) {
  return &self->GetAllActionsForBehavior(arg0);
}

MapStringInstructionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetAllConditionsForBehavior_1(PlatformExtension* self, char* arg0) {
  return &self->GetAllConditionsForBehavior(arg0);
}

MapStringExpressionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetAllExpressionsForBehavior_1(PlatformExtension* self, char* arg0) {
  return &self->GetAllExpressionsForBehavior(arg0);
}

MapStringExpressionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension_GetAllStrExpressionsForBehavior_1(PlatformExtension* self, char* arg0) {
  return &self->GetAllStrExpressionsForBehavior(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PlatformExtension___destroy___0(PlatformExtension* self) {
  delete self;
}

// AbstractFileSystemJS

AbstractFileSystemJS* EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystemJS_AbstractFileSystemJS_0() {
  return new AbstractFileSystemJS();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystemJS_MkDir_1(AbstractFileSystemJS* self, char* arg0) {
  self->MkDir(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystemJS_DirExists_1(AbstractFileSystemJS* self, char* arg0) {
  self->DirExists(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystemJS_ClearDir_1(AbstractFileSystemJS* self, char* arg0) {
  self->ClearDir(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystemJS_GetTempDir_0(AbstractFileSystemJS* self) {
  return self->GetTempDir().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystemJS_FileNameFrom_1(AbstractFileSystemJS* self, char* arg0) {
  return self->FileNameFrom(arg0).c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystemJS_DirNameFrom_1(AbstractFileSystemJS* self, char* arg0) {
  return self->DirNameFrom(arg0).c_str();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystemJS_IsAbsolute_1(AbstractFileSystemJS* self, char* arg0) {
  return self->IsAbsolute(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystemJS_CopyFile_2(AbstractFileSystemJS* self, char* arg0, char* arg1) {
  self->CopyFile(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystemJS_WriteToFile_2(AbstractFileSystemJS* self, char* arg0, char* arg1) {
  self->WriteToFile(arg0, arg1);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystemJS_ReadFile_1(AbstractFileSystemJS* self, char* arg0) {
  return self->ReadFile(arg0).c_str();
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystemJS_ReadDir_1(AbstractFileSystemJS* self, char* arg0) {
  static VectorString temp;
  return (temp = self->ReadDir(arg0), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystemJS_FileExists_1(AbstractFileSystemJS* self, char* arg0) {
  return self->FileExists(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AbstractFileSystemJS___destroy___0(AbstractFileSystemJS* self) {
  delete self;
}

// HighestZOrderFinder

HighestZOrderFinder* EMSCRIPTEN_KEEPALIVE emscripten_bind_HighestZOrderFinder_HighestZOrderFinder_0() {
  return new HighestZOrderFinder();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_HighestZOrderFinder_RestrictSearchToLayer_1(HighestZOrderFinder* self, char* arg0) {
  self->RestrictSearchToLayer(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_HighestZOrderFinder_GetHighestZOrder_0(HighestZOrderFinder* self) {
  return self->GetHighestZOrder();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_HighestZOrderFinder_GetLowestZOrder_0(HighestZOrderFinder* self) {
  return self->GetLowestZOrder();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_HighestZOrderFinder___destroy___0(HighestZOrderFinder* self) {
  delete self;
}

// InitialInstanceFunctor

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstanceFunctor___destroy___0(InitialInstanceFunctor* self) {
  delete self;
}

// SetString

SetString* EMSCRIPTEN_KEEPALIVE emscripten_bind_SetString_SetString_0() {
  return new SetString();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SetString___destroy___0(SetString* self) {
  delete self;
}

// Instruction

Instruction* EMSCRIPTEN_KEEPALIVE emscripten_bind_Instruction_Instruction_0() {
  return new Instruction();
}

Instruction* EMSCRIPTEN_KEEPALIVE emscripten_bind_Instruction_CLONE_Instruction_0(Instruction* self) {
  return new Instruction(*self);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Instruction_SetType_1(Instruction* self, char* arg0) {
  self->SetType(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Instruction_GetType_0(Instruction* self) {
  return self->GetType().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Instruction_SetInverted_1(Instruction* self, bool arg0) {
  self->SetInverted(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Instruction_IsInverted_0(Instruction* self) {
  return self->IsInverted();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Instruction_SetParameter_2(Instruction* self, unsigned int arg0, char* arg1) {
  self->SetParameter(arg0, arg1);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Instruction_GetParameter_1(Instruction* self, unsigned int arg0) {
  return self->GetParameter(arg0).c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Instruction_SetParametersCount_1(Instruction* self, unsigned int arg0) {
  self->SetParametersCount(arg0);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_Instruction_GetParametersCount_0(Instruction* self) {
  return self->GetParametersCount();
}

InstructionsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_Instruction_GetSubInstructions_0(Instruction* self) {
  return &self->GetSubInstructions();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Instruction___destroy___0(Instruction* self) {
  delete self;
}

// JsPlatform

JsPlatform* EMSCRIPTEN_KEEPALIVE emscripten_bind_JsPlatform_STATIC_Get_0(JsPlatform* self) {
  return &self->STATIC_Get();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_JsPlatform___destroy___0(JsPlatform* self) {
  delete self;
}

// PropertyDescriptor

PropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_PropertyDescriptor_PropertyDescriptor_1(char* arg0) {
  return new PropertyDescriptor(arg0);
}

PropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_PropertyDescriptor_SetValue_1(PropertyDescriptor* self, char* arg0) {
  return &self->SetValue(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_PropertyDescriptor_GetValue_0(PropertyDescriptor* self) {
  return self->GetValue().c_str();
}

PropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_PropertyDescriptor_SetType_1(PropertyDescriptor* self, char* arg0) {
  return &self->SetType(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_PropertyDescriptor_GetType_0(PropertyDescriptor* self) {
  return self->GetType().c_str();
}

PropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_PropertyDescriptor_AddExtraInfo_1(PropertyDescriptor* self, char* arg0) {
  return &self->AddExtraInfo(arg0);
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_PropertyDescriptor_GetExtraInfo_0(PropertyDescriptor* self) {
  static VectorString temp;
  return (temp = self->GetExtraInfo(), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PropertyDescriptor___destroy___0(PropertyDescriptor* self) {
  delete self;
}

// InitialInstanceJSFunctor

InitialInstanceJSFunctor* EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstanceJSFunctor_InitialInstanceJSFunctor_0() {
  return new InitialInstanceJSFunctor();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstanceJSFunctor_invoke_1(InitialInstanceJSFunctor* self, InitialInstance* arg0) {
  self->invoke(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstanceJSFunctor___destroy___0(InitialInstanceJSFunctor* self) {
  delete self;
}

// Project

Project* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_Project_0() {
  return new Project();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_SetName_1(Project* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetName_0(Project* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_SetAuthor_1(Project* self, char* arg0) {
  self->SetAuthor(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetAuthor_0(Project* self) {
  return self->GetAuthor().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_SetPackageName_1(Project* self, char* arg0) {
  self->SetPackageName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetPackageName_0(Project* self) {
  return self->GetPackageName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_SetProjectFile_1(Project* self, char* arg0) {
  self->SetProjectFile(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetProjectFile_0(Project* self) {
  return self->GetProjectFile().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_SetDefaultWidth_1(Project* self, int arg0) {
  self->SetDefaultWidth(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetMainWindowDefaultWidth_0(Project* self) {
  return self->GetMainWindowDefaultWidth();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_SetDefaultHeight_1(Project* self, int arg0) {
  self->SetDefaultHeight(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetMainWindowDefaultHeight_0(Project* self) {
  return self->GetMainWindowDefaultHeight();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetMaximumFPS_0(Project* self) {
  return self->GetMaximumFPS();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_SetMaximumFPS_1(Project* self, int arg0) {
  self->SetMaximumFPS(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetMinimumFPS_0(Project* self) {
  return self->GetMinimumFPS();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_SetMinimumFPS_1(Project* self, int arg0) {
  self->SetMinimumFPS(arg0);
}

const VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetUsedExtensions_0(Project* self) {
  return &self->GetUsedExtensions();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_AddPlatform_1(Project* self, Platform* arg0) {
  self->AddPlatform(*arg0);
}

Platform* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetCurrentPlatform_0(Project* self) {
  return &self->GetCurrentPlatform();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_HasLayoutNamed_1(Project* self, char* arg0) {
  return self->HasLayoutNamed(arg0);
}

Layout* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetLayout_1(Project* self, char* arg0) {
  return &self->GetLayout(arg0);
}

Layout* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetLayoutAt_1(Project* self, unsigned int arg0) {
  return &self->GetLayoutAt(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_SwapLayouts_2(Project* self, unsigned int arg0, unsigned int arg1) {
  self->SwapLayouts(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetLayoutsCount_0(Project* self) {
  return self->GetLayoutsCount();
}

Layout* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_InsertNewLayout_2(Project* self, char* arg0, unsigned int arg1) {
  return &self->InsertNewLayout(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_RemoveLayout_1(Project* self, char* arg0) {
  self->RemoveLayout(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_SetFirstLayout_1(Project* self, char* arg0) {
  self->SetFirstLayout(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetFirstLayout_0(Project* self) {
  return self->GetFirstLayout().c_str();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_HasExternalEventsNamed_1(Project* self, char* arg0) {
  return self->HasExternalEventsNamed(arg0);
}

ExternalEvents* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetExternalEvents_1(Project* self, char* arg0) {
  return &self->GetExternalEvents(arg0);
}

ExternalEvents* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetExternalEventsAt_1(Project* self, unsigned int arg0) {
  return &self->GetExternalEventsAt(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_SwapExternalEvents_2(Project* self, unsigned int arg0, unsigned int arg1) {
  self->SwapExternalEvents(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetExternalEventsCount_0(Project* self) {
  return self->GetExternalEventsCount();
}

ExternalEvents* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_InsertNewExternalEvents_2(Project* self, char* arg0, unsigned int arg1) {
  return &self->InsertNewExternalEvents(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_RemoveExternalEvents_1(Project* self, char* arg0) {
  self->RemoveExternalEvents(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_HasExternalLayoutNamed_1(Project* self, char* arg0) {
  return self->HasExternalLayoutNamed(arg0);
}

ExternalLayout* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetExternalLayout_1(Project* self, char* arg0) {
  return &self->GetExternalLayout(arg0);
}

ExternalLayout* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetExternalLayoutAt_1(Project* self, unsigned int arg0) {
  return &self->GetExternalLayoutAt(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_SwapExternalLayouts_2(Project* self, unsigned int arg0, unsigned int arg1) {
  self->SwapExternalLayouts(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetExternalLayoutsCount_0(Project* self) {
  return self->GetExternalLayoutsCount();
}

ExternalLayout* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_InsertNewExternalLayout_2(Project* self, char* arg0, unsigned int arg1) {
  return &self->InsertNewExternalLayout(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_RemoveExternalLayout_1(Project* self, char* arg0) {
  self->RemoveExternalLayout(arg0);
}

VariablesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetVariables_0(Project* self) {
  return &self->GetVariables();
}

ResourcesManager* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetResourcesManager_0(Project* self) {
  return &self->GetResourcesManager();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_ExposeResources_1(Project* self, ArbitraryResourceWorker* arg0) {
  self->ExposeResources(*arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_STATIC_ValidateObjectName_1(Project* self, char* arg0) {
  return self->STATIC_ValidateObjectName(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_IsDirty_0(Project* self) {
  return self->IsDirty();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_SerializeTo_1(Project* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_UnserializeFrom_1(Project* self, SerializerElement* arg0) {
  self->UnserializeFrom(*arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_FREE_GetTypeOfBehavior_3(Project* self, Layout* arg0, char* arg1, bool arg2) {
  static gd::String temp;
  return (temp = GetTypeOfBehavior(*self, *arg0, arg1, arg2), temp.c_str());
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_FREE_GetTypeOfObject_3(Project* self, Layout* arg0, char* arg1, bool arg2) {
  static gd::String temp;
  return (temp = GetTypeOfObject(*self, *arg0, arg1, arg2), temp.c_str());
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_FREE_GetBehaviorsOfObject_3(Project* self, Layout* arg0, char* arg1, bool arg2) {
  static VectorString temp;
  return (temp = GetBehaviorsOfObject(*self, *arg0, arg1, arg2), &temp);
}

gdObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_InsertNewObject_4(Project* self, Project* arg0, char* arg1, char* arg2, unsigned int arg3) {
  return &self->InsertNewObject(*arg0, arg1, arg2, arg3);
}

gdObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_InsertObject_2(Project* self, gdObject* arg0, unsigned int arg1) {
  return &self->InsertObject(*arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_HasObjectNamed_1(Project* self, char* arg0) {
  return self->HasObjectNamed(arg0);
}

gdObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetObject_1(Project* self, char* arg0) {
  return &self->GetObject(arg0);
}

gdObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetObjectAt_1(Project* self, unsigned int arg0) {
  return &self->GetObjectAt(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetObjectPosition_1(Project* self, char* arg0) {
  self->GetObjectPosition(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_RemoveObject_1(Project* self, char* arg0) {
  self->RemoveObject(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_SwapObjects_2(Project* self, unsigned int arg0, unsigned int arg1) {
  self->SwapObjects(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetObjectsCount_0(Project* self) {
  return self->GetObjectsCount();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project___destroy___0(Project* self) {
  delete self;
}

// MapStringVariable

Variable* EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringVariable_MAP_get_1(MapStringVariable* self, char* arg0) {
  return &self->MAP_get(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringVariable_MAP_set_2(MapStringVariable* self, char* arg0, Variable* arg1) {
  (*self)MAP_set(arg0, *arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringVariable_MAP_has_1(MapStringVariable* self, char* arg0) {
  return self->MAP_has(arg0);
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringVariable_MAP_keys_0(MapStringVariable* self) {
  static VectorString temp;
temp.clear(); for(auto it = self->begin(); it != self->end();++it) { temp.push_back(it->first); } return &temp;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringVariable___destroy___0(MapStringVariable* self) {
  delete self;
}

// ImageResource

ImageResource* EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_ImageResource_0() {
  return new ImageResource();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_IsSmooth_0(ImageResource* self) {
  return self->IsSmooth();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_SetSmooth_1(ImageResource* self, bool arg0) {
  self->SetSmooth(arg0);
}

Resource* EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_Clone_0(ImageResource* self) {
  return self->Clone();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_SetName_1(ImageResource* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_GetName_0(ImageResource* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_SetKind_1(ImageResource* self, char* arg0) {
  self->SetKind(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_GetKind_0(ImageResource* self) {
  return self->GetKind().c_str();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_IsUserAdded_0(ImageResource* self) {
  return self->IsUserAdded();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_SetUserAdded_1(ImageResource* self, bool arg0) {
  self->SetUserAdded(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_UseFile_0(ImageResource* self) {
  return self->UseFile();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_SetFile_1(ImageResource* self, char* arg0) {
  self->SetFile(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_GetFile_0(ImageResource* self) {
  return self->GetFile().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_GetAbsoluteFile_1(ImageResource* self, Project* arg0) {
  static gd::String temp;
  return (temp = self->GetAbsoluteFile(*arg0), temp.c_str());
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_SerializeTo_1(ImageResource* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource_UnserializeFrom_1(ImageResource* self, SerializerElement* arg0) {
  self->UnserializeFrom(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageResource___destroy___0(ImageResource* self) {
  delete self;
}

// ProjectResourcesAdder

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ProjectResourcesAdder_STATIC_AddAllMissingImages_1(ProjectResourcesAdder* self, Project* arg0) {
  self->STATIC_AddAllMissingImages(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ProjectResourcesAdder_STATIC_GetAllUselessImages_1(ProjectResourcesAdder* self, Project* arg0) {
  self->STATIC_GetAllUselessImages(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ProjectResourcesAdder_STATIC_RemoveAllUselessImages_1(ProjectResourcesAdder* self, Project* arg0) {
  self->STATIC_RemoveAllUselessImages(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ProjectResourcesAdder___destroy___0(ProjectResourcesAdder* self) {
  delete self;
}

// Layer

Layer* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layer_Layer_0() {
  return new Layer();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layer_SetName_1(Layer* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Layer_GetName_0(Layer* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layer_SetVisibility_1(Layer* self, bool arg0) {
  self->SetVisibility(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Layer_GetVisibility_0(Layer* self) {
  return self->GetVisibility();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layer___destroy___0(Layer* self) {
  delete self;
}

// Behavior

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_Behavior_Behavior_0() {
  return new Behavior();
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_Behavior_Clone_0(Behavior* self) {
  return self->Clone();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Behavior_SetName_1(Behavior* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Behavior_GetName_0(Behavior* self) {
  return self->GetName().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Behavior_GetTypeName_0(Behavior* self) {
  return self->GetTypeName().c_str();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Behavior_UpdateProperty_3(Behavior* self, char* arg0, char* arg1, Project* arg2) {
  return self->UpdateProperty(arg0, arg1, *arg2);
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_Behavior_GetProperties_1(Behavior* self, Project* arg0) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetProperties(*arg0), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Behavior___destroy___0(Behavior* self) {
  delete self;
}

// CommentEvent

CommentEvent* EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent_CommentEvent_0() {
  return new CommentEvent();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent_WRAPPED_GetComment_0(CommentEvent* self) {
  return self->WRAPPED_GetComment().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent_WRAPPED_SetComment_1(CommentEvent* self, char* arg0) {
  self->WRAPPED_SetComment(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent_Clone_0(CommentEvent* self) {
  self->Clone();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent_GetType_0(CommentEvent* self) {
  return self->GetType().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent_SetType_1(CommentEvent* self, char* arg0) {
  self->SetType(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent_IsExecutable_0(CommentEvent* self) {
  return self->IsExecutable();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent_CanHaveSubEvents_0(CommentEvent* self) {
  return self->CanHaveSubEvents();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent_HasSubEvents_0(CommentEvent* self) {
  return self->HasSubEvents();
}

EventsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent_GetSubEvents_0(CommentEvent* self) {
  return &self->GetSubEvents();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent_IsDisabled_0(CommentEvent* self) {
  return self->IsDisabled();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent_SetDisabled_1(CommentEvent* self, bool arg0) {
  self->SetDisabled(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent_IsFolded_0(CommentEvent* self) {
  return self->IsFolded();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent_SetFolded_1(CommentEvent* self, bool arg0) {
  self->SetFolded(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_CommentEvent___destroy___0(CommentEvent* self) {
  delete self;
}

// SerializerValue

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerValue_GetBool_0(SerializerValue* self) {
  return self->GetBool();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerValue_GetString_0(SerializerValue* self) {
  static gd::String temp;
  return (temp = self->GetString(), temp.c_str());
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerValue_GetInt_0(SerializerValue* self) {
  return self->GetInt();
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerValue_GetDouble_0(SerializerValue* self) {
  return self->GetDouble();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SerializerValue___destroy___0(SerializerValue* self) {
  delete self;
}

// ArbitraryEventsWorker

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ArbitraryEventsWorker_Launch_1(ArbitraryEventsWorker* self, EventsList* arg0) {
  self->Launch(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ArbitraryEventsWorker___destroy___0(ArbitraryEventsWorker* self) {
  delete self;
}

// ObjectListDialogsHelper

ObjectListDialogsHelper* EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectListDialogsHelper_ObjectListDialogsHelper_2(Project* arg0, Layout* arg1) {
  return new ObjectListDialogsHelper(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectListDialogsHelper_SetSearchText_1(ObjectListDialogsHelper* self, char* arg0) {
  self->SetSearchText(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectListDialogsHelper_SetAllowedObjectType_1(ObjectListDialogsHelper* self, char* arg0) {
  self->SetAllowedObjectType(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectListDialogsHelper_SetGroupsAllowed_1(ObjectListDialogsHelper* self, bool arg0) {
  self->SetGroupsAllowed(arg0);
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectListDialogsHelper_GetMatchingObjects_0(ObjectListDialogsHelper* self) {
  static VectorString temp;
  return (temp = self->GetMatchingObjects(), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectListDialogsHelper___destroy___0(ObjectListDialogsHelper* self) {
  delete self;
}

// Serializer

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Serializer_STATIC_ToJSON_1(Serializer* self, SerializerElement* arg0) {
  static gd::String temp;
  return (temp = self->STATIC_ToJSON(*arg0), temp.c_str());
}

SerializerElement* EMSCRIPTEN_KEEPALIVE emscripten_bind_Serializer_STATIC_FromJSON_1(Serializer* self, char* arg0) {
  static SerializerElement temp;
  return (temp = self->STATIC_FromJSON(arg0), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Serializer___destroy___0(Serializer* self) {
  delete self;
}

// EventsList

EventsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsList_EventsList_0() {
  return new EventsList();
}

BaseEvent* EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsList_InsertEvent_2(EventsList* self, BaseEvent* arg0, unsigned int arg1) {
  return &self->InsertEvent(*arg0, arg1);
}

BaseEvent* EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsList_InsertNewEvent_3(EventsList* self, Project* arg0, char* arg1, unsigned int arg2) {
  return &self->InsertNewEvent(*arg0, arg1, arg2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsList_InsertEvents_4(EventsList* self, EventsList* arg0, unsigned int arg1, unsigned int arg2, unsigned int arg3) {
  self->InsertEvents(*arg0, arg1, arg2, arg3);
}

BaseEvent* EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsList_GetEventAt_1(EventsList* self, unsigned int arg0) {
  return &self->GetEventAt(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsList_RemoveEventAt_1(EventsList* self, unsigned int arg0) {
  self->RemoveEventAt(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsList_RemoveEvent_1(EventsList* self, BaseEvent* arg0) {
  self->RemoveEvent(*arg0);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsList_GetEventsCount_0(EventsList* self) {
  return self->GetEventsCount();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsList_Contains_2(EventsList* self, BaseEvent* arg0, bool arg1) {
  return self->Contains(*arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsList_IsEmpty_0(EventsList* self) {
  return self->IsEmpty();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsList_Clear_0(EventsList* self) {
  self->Clear();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsList_SerializeTo_1(EventsList* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsList_UnserializeFrom_2(EventsList* self, Project* arg0, SerializerElement* arg1) {
  self->UnserializeFrom(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsList___destroy___0(EventsList* self) {
  delete self;
}

// gdObject

gdObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_gdObject_1(char* arg0) {
  return new gdObject(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_SetName_1(gdObject* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_GetName_0(gdObject* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_SetType_1(gdObject* self, char* arg0) {
  self->SetType(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_GetType_0(gdObject* self) {
  return self->GetType().c_str();
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_GetProperties_1(gdObject* self, Project* arg0) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetProperties(*arg0), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_UpdateProperty_3(gdObject* self, char* arg0, char* arg1, Project* arg2) {
  return self->UpdateProperty(arg0, arg1, *arg2);
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_GetInitialInstanceProperties_3(gdObject* self, InitialInstance* arg0, Project* arg1, Layout* arg2) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetInitialInstanceProperties(*arg0, *arg1, *arg2), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_UpdateInitialInstanceProperty_5(gdObject* self, InitialInstance* arg0, char* arg1, char* arg2, Project* arg3, Layout* arg4) {
  return self->UpdateInitialInstanceProperty(*arg0, arg1, arg2, *arg3, *arg4);
}

VariablesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_GetVariables_0(gdObject* self) {
  return &self->GetVariables();
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_GetAllBehaviorNames_0(gdObject* self) {
  static VectorString temp;
  return (temp = self->GetAllBehaviorNames(), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_HasBehaviorNamed_1(gdObject* self, char* arg0) {
  return self->HasBehaviorNamed(arg0);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_AddNewBehavior_3(gdObject* self, Project* arg0, char* arg1, char* arg2) {
  return self->AddNewBehavior(*arg0, arg1, arg2);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_GetBehavior_1(gdObject* self, char* arg0) {
  return &self->GetBehavior(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_RemoveBehavior_1(gdObject* self, char* arg0) {
  self->RemoveBehavior(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_RenameBehavior_2(gdObject* self, char* arg0, char* arg1) {
  return self->RenameBehavior(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_SerializeTo_1(gdObject* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject_UnserializeFrom_2(gdObject* self, Project* arg0, SerializerElement* arg1) {
  self->UnserializeFrom(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gdObject___destroy___0(gdObject* self) {
  delete self;
}

// InitialInstancesContainer

InitialInstancesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_InitialInstancesContainer_0() {
  return new InitialInstancesContainer();
}

InitialInstancesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_Clone_0(InitialInstancesContainer* self) {
  return self->Clone();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_GetInstancesCount_0(InitialInstancesContainer* self) {
  return self->GetInstancesCount();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_IterateOverInstances_1(InitialInstancesContainer* self, InitialInstanceFunctor* arg0) {
  self->IterateOverInstances(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_IterateOverInstancesWithZOrdering_2(InitialInstancesContainer* self, InitialInstanceFunctor* arg0, char* arg1) {
  self->IterateOverInstancesWithZOrdering(*arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_MoveInstancesToLayer_2(InitialInstancesContainer* self, char* arg0, char* arg1) {
  self->MoveInstancesToLayer(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_RemoveAllInstancesOnLayer_1(InitialInstancesContainer* self, char* arg0) {
  self->RemoveAllInstancesOnLayer(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_RemoveInitialInstancesOfObject_1(InitialInstancesContainer* self, char* arg0) {
  self->RemoveInitialInstancesOfObject(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_SomeInstancesAreOnLayer_1(InitialInstancesContainer* self, char* arg0) {
  return self->SomeInstancesAreOnLayer(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_RenameInstancesOfObject_2(InitialInstancesContainer* self, char* arg0, char* arg1) {
  self->RenameInstancesOfObject(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_RemoveInstance_1(InitialInstancesContainer* self, InitialInstance* arg0) {
  self->RemoveInstance(*arg0);
}

InitialInstance* EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_InsertNewInitialInstance_0(InitialInstancesContainer* self) {
  return &self->InsertNewInitialInstance();
}

InitialInstance* EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_InsertInitialInstance_1(InitialInstancesContainer* self, InitialInstance* arg0) {
  return &self->InsertInitialInstance(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_SerializeTo_1(InitialInstancesContainer* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_UnserializeFrom_1(InitialInstancesContainer* self, SerializerElement* arg0) {
  self->UnserializeFrom(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer___destroy___0(InitialInstancesContainer* self) {
  delete self;
}

// VectorString

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString_VectorString_0() {
  return new VectorString();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString_push_back_1(VectorString* self, char* arg0) {
  self->push_back(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString_resize_1(VectorString* self, unsigned int arg0) {
  self->resize(arg0);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString_size_0(VectorString* self) {
  return self->size();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString_at_1(VectorString* self, unsigned int arg0) {
  return self->at(arg0).c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString_WRAPPED_set_2(VectorString* self, unsigned int arg0, char* arg1) {
  self->WRAPPED_set(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString_clear_0(VectorString* self) {
  self->clear();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString___destroy___0(VectorString* self) {
  delete self;
}

// Exporter

gdjs::Exporter* EMSCRIPTEN_KEEPALIVE emscripten_bind_Exporter_Exporter_1(AbstractFileSystem* arg0) {
  return new gdjs::Exporter(*arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Exporter_ExportLayoutForPixiPreview_3(gdjs::Exporter* self, Project* arg0, Layout* arg1, char* arg2) {
  return self->ExportLayoutForPixiPreview(*arg0, *arg1, arg2);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Exporter_ExportWholePixiProject_4(gdjs::Exporter* self, Project* arg0, char* arg1, bool arg2, bool arg3) {
  return self->ExportWholePixiProject(*arg0, arg1, arg2, arg3);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Exporter_GetLastError_0(gdjs::Exporter* self) {
  return self->GetLastError().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Exporter___destroy___0(gdjs::Exporter* self) {
  delete self;
}

// MetadataProvider

const BehaviorMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_GetBehaviorMetadata_2(MetadataProvider* self, Platform* arg0, char* arg1) {
  return &self->STATIC_GetBehaviorMetadata(*arg0, arg1);
}

const ObjectMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_GetObjectMetadata_2(MetadataProvider* self, Platform* arg0, char* arg1) {
  return &self->STATIC_GetObjectMetadata(*arg0, arg1);
}

const InstructionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_GetActionMetadata_2(MetadataProvider* self, Platform* arg0, char* arg1) {
  return &self->STATIC_GetActionMetadata(*arg0, arg1);
}

const InstructionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_GetConditionMetadata_2(MetadataProvider* self, Platform* arg0, char* arg1) {
  return &self->STATIC_GetConditionMetadata(*arg0, arg1);
}

const ExpressionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_GetExpressionMetadata_2(MetadataProvider* self, Platform* arg0, char* arg1) {
  return &self->STATIC_GetExpressionMetadata(*arg0, arg1);
}

const ExpressionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_GetObjectExpressionMetadata_3(MetadataProvider* self, Platform* arg0, char* arg1, char* arg2) {
  return &self->STATIC_GetObjectExpressionMetadata(*arg0, arg1, arg2);
}

const ExpressionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_GetBehaviorExpressionMetadata_3(MetadataProvider* self, Platform* arg0, char* arg1, char* arg2) {
  return &self->STATIC_GetBehaviorExpressionMetadata(*arg0, arg1, arg2);
}

const ExpressionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_GetStrExpressionMetadata_2(MetadataProvider* self, Platform* arg0, char* arg1) {
  return &self->STATIC_GetStrExpressionMetadata(*arg0, arg1);
}

const ExpressionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_GetObjectStrExpressionMetadata_3(MetadataProvider* self, Platform* arg0, char* arg1, char* arg2) {
  return &self->STATIC_GetObjectStrExpressionMetadata(*arg0, arg1, arg2);
}

const ExpressionMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_GetBehaviorStrExpressionMetadata_3(MetadataProvider* self, Platform* arg0, char* arg1, char* arg2) {
  return &self->STATIC_GetBehaviorStrExpressionMetadata(*arg0, arg1, arg2);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_HasCondition_2(MetadataProvider* self, Platform* arg0, char* arg1) {
  return self->STATIC_HasCondition(*arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_HasAction_2(MetadataProvider* self, Platform* arg0, char* arg1) {
  return self->STATIC_HasAction(*arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_HasObjectAction_3(MetadataProvider* self, Platform* arg0, char* arg1, char* arg2) {
  return self->STATIC_HasObjectAction(*arg0, arg1, arg2);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_HasObjectCondition_3(MetadataProvider* self, Platform* arg0, char* arg1, char* arg2) {
  return self->STATIC_HasObjectCondition(*arg0, arg1, arg2);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_HasBehaviorAction_3(MetadataProvider* self, Platform* arg0, char* arg1, char* arg2) {
  return self->STATIC_HasBehaviorAction(*arg0, arg1, arg2);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_HasBehaviorCondition_3(MetadataProvider* self, Platform* arg0, char* arg1, char* arg2) {
  return self->STATIC_HasBehaviorCondition(*arg0, arg1, arg2);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_HasExpression_2(MetadataProvider* self, Platform* arg0, char* arg1) {
  return self->STATIC_HasExpression(*arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_HasObjectExpression_3(MetadataProvider* self, Platform* arg0, char* arg1, char* arg2) {
  return self->STATIC_HasObjectExpression(*arg0, arg1, arg2);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_HasBehaviorExpression_3(MetadataProvider* self, Platform* arg0, char* arg1, char* arg2) {
  return self->STATIC_HasBehaviorExpression(*arg0, arg1, arg2);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_HasStrExpression_2(MetadataProvider* self, Platform* arg0, char* arg1) {
  return self->STATIC_HasStrExpression(*arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_HasObjectStrExpression_3(MetadataProvider* self, Platform* arg0, char* arg1, char* arg2) {
  return self->STATIC_HasObjectStrExpression(*arg0, arg1, arg2);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider_STATIC_HasBehaviorStrExpression_3(MetadataProvider* self, Platform* arg0, char* arg1, char* arg2) {
  return self->STATIC_HasBehaviorStrExpression(*arg0, arg1, arg2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MetadataProvider___destroy___0(MetadataProvider* self) {
  delete self;
}

// BehaviorMetadata

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_BehaviorMetadata_GetFullName_0(BehaviorMetadata* self) {
  return self->GetFullName().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_BehaviorMetadata_GetDefaultName_0(BehaviorMetadata* self) {
  return self->GetDefaultName().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_BehaviorMetadata_GetDescription_0(BehaviorMetadata* self) {
  return self->GetDescription().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_BehaviorMetadata_GetGroup_0(BehaviorMetadata* self) {
  return self->GetGroup().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_BehaviorMetadata_GetIconFilename_0(BehaviorMetadata* self) {
  return self->GetIconFilename().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BehaviorMetadata___destroy___0(BehaviorMetadata* self) {
  delete self;
}

// ParameterMetadata

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParameterMetadata_GetType_0(ParameterMetadata* self) {
  return self->GetType().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParameterMetadata_GetExtraInfo_0(ParameterMetadata* self) {
  return self->GetExtraInfo().c_str();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ParameterMetadata_IsOptional_0(ParameterMetadata* self) {
  return self->IsOptional();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParameterMetadata_GetDescription_0(ParameterMetadata* self) {
  return self->GetDescription().c_str();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ParameterMetadata_IsCodeOnly_0(ParameterMetadata* self) {
  return self->IsCodeOnly();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParameterMetadata_GetDefaultValue_0(ParameterMetadata* self) {
  return self->GetDefaultValue().c_str();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ParameterMetadata_STATIC_IsObject_1(ParameterMetadata* self, char* arg0) {
  return self->STATIC_IsObject(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParameterMetadata___destroy___0(ParameterMetadata* self) {
  delete self;
}

// EventsParametersLister

EventsParametersLister* EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsParametersLister_EventsParametersLister_1(Project* arg0) {
  return new EventsParametersLister(*arg0);
}

const MapStringString* EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsParametersLister_GetParametersAndTypes_0(EventsParametersLister* self) {
  return &self->GetParametersAndTypes();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsParametersLister_Launch_1(EventsParametersLister* self, EventsList* arg0) {
  self->Launch(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_EventsParametersLister___destroy___0(EventsParametersLister* self) {
  delete self;
}

// StandardEvent

StandardEvent* EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent_StandardEvent_0() {
  return new StandardEvent();
}

InstructionsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent_GetConditions_0(StandardEvent* self) {
  return &self->GetConditions();
}

InstructionsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent_GetActions_0(StandardEvent* self) {
  return &self->GetActions();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent_Clone_0(StandardEvent* self) {
  self->Clone();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent_GetType_0(StandardEvent* self) {
  return self->GetType().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent_SetType_1(StandardEvent* self, char* arg0) {
  self->SetType(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent_IsExecutable_0(StandardEvent* self) {
  return self->IsExecutable();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent_CanHaveSubEvents_0(StandardEvent* self) {
  return self->CanHaveSubEvents();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent_HasSubEvents_0(StandardEvent* self) {
  return self->HasSubEvents();
}

EventsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent_GetSubEvents_0(StandardEvent* self) {
  return &self->GetSubEvents();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent_IsDisabled_0(StandardEvent* self) {
  return self->IsDisabled();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent_SetDisabled_1(StandardEvent* self, bool arg0) {
  self->SetDisabled(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent_IsFolded_0(StandardEvent* self) {
  return self->IsFolded();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent_SetFolded_1(StandardEvent* self, bool arg0) {
  self->SetFolded(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_StandardEvent___destroy___0(StandardEvent* self) {
  delete self;
}

// TextFormatting

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TextFormatting_IsBold_0(TextFormatting* self) {
  return self->IsBold();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TextFormatting_IsItalic_0(TextFormatting* self) {
  return self->IsItalic();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_TextFormatting_GetColorRed_0(TextFormatting* self) {
  return self->GetColorRed();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_TextFormatting_GetColorGreen_0(TextFormatting* self) {
  return self->GetColorGreen();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_TextFormatting_GetColorBlue_0(TextFormatting* self) {
  return self->GetColorBlue();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextFormatting___destroy___0(TextFormatting* self) {
  delete self;
}

// Point

Point* EMSCRIPTEN_KEEPALIVE emscripten_bind_Point_Point_1(char* arg0) {
  return new Point(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Point_SetName_1(Point* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Point_GetName_0(Point* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Point_SetXY_2(Point* self, float arg0, float arg1) {
  self->SetXY(arg0, arg1);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Point_GetX_0(Point* self) {
  return self->GetX();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Point_SetX_1(Point* self, float arg0) {
  self->SetX(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Point_GetY_0(Point* self) {
  return self->GetY();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Point_SetY_1(Point* self, float arg0) {
  self->SetY(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Point___destroy___0(Point* self) {
  delete self;
}

// ExpressionMetadata

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ExpressionMetadata_GetFullName_0(ExpressionMetadata* self) {
  return self->GetFullName().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ExpressionMetadata_GetDescription_0(ExpressionMetadata* self) {
  return self->GetDescription().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ExpressionMetadata_GetGroup_0(ExpressionMetadata* self) {
  return self->GetGroup().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ExpressionMetadata_GetSmallIconFilename_0(ExpressionMetadata* self) {
  return self->GetSmallIconFilename().c_str();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ExpressionMetadata_IsShown_0(ExpressionMetadata* self) {
  return self->IsShown();
}

ParameterMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_ExpressionMetadata_GetParameter_1(ExpressionMetadata* self, unsigned int arg0) {
  return &self->GetParameter(arg0);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_ExpressionMetadata_GetParametersCount_0(ExpressionMetadata* self) {
  return self->GetParametersCount();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ExpressionMetadata___destroy___0(ExpressionMetadata* self) {
  delete self;
}

// ObjectMetadata

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectMetadata_GetName_0(ObjectMetadata* self) {
  return self->GetName().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectMetadata_GetFullName_0(ObjectMetadata* self) {
  return self->GetFullName().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectMetadata_GetDescription_0(ObjectMetadata* self) {
  return self->GetDescription().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectMetadata_GetIconFilename_0(ObjectMetadata* self) {
  return self->GetIconFilename().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ObjectMetadata___destroy___0(ObjectMetadata* self) {
  delete self;
}

// Sprite

Sprite* EMSCRIPTEN_KEEPALIVE emscripten_bind_Sprite_Sprite_0() {
  return new Sprite();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sprite_SetImageName_1(Sprite* self, char* arg0) {
  self->SetImageName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Sprite_GetImageName_0(Sprite* self) {
  return self->GetImageName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sprite_AddPoint_1(Sprite* self, Point* arg0) {
  self->AddPoint(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sprite_DelPoint_1(Sprite* self, char* arg0) {
  self->DelPoint(arg0);
}

Point* EMSCRIPTEN_KEEPALIVE emscripten_bind_Sprite_GetPoint_1(Sprite* self, char* arg0) {
  return &self->GetPoint(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Sprite_HasPoint_1(Sprite* self, char* arg0) {
  return self->HasPoint(arg0);
}

Point* EMSCRIPTEN_KEEPALIVE emscripten_bind_Sprite_GetOrigin_0(Sprite* self) {
  return &self->GetOrigin();
}

Point* EMSCRIPTEN_KEEPALIVE emscripten_bind_Sprite_GetCenter_0(Sprite* self) {
  return &self->GetCenter();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Sprite_IsDefaultCenterPoint_0(Sprite* self) {
  return self->IsDefaultCenterPoint();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sprite_SetDefaultCenterPoint_1(Sprite* self, bool arg0) {
  self->SetDefaultCenterPoint(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sprite___destroy___0(Sprite* self) {
  delete self;
}

// TiledSpriteObject

TiledSpriteObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_TiledSpriteObject_1(char* arg0) {
  return new TiledSpriteObject(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_SetTexture_1(TiledSpriteObject* self, char* arg0) {
  self->SetTexture(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_GetTexture_0(TiledSpriteObject* self) {
  return self->GetTexture().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_SetWidth_1(TiledSpriteObject* self, float arg0) {
  self->SetWidth(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_GetWidth_0(TiledSpriteObject* self) {
  return self->GetWidth();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_SetHeight_1(TiledSpriteObject* self, float arg0) {
  self->SetHeight(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_GetHeight_0(TiledSpriteObject* self) {
  return self->GetHeight();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_SetName_1(TiledSpriteObject* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_GetName_0(TiledSpriteObject* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_SetType_1(TiledSpriteObject* self, char* arg0) {
  self->SetType(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_GetType_0(TiledSpriteObject* self) {
  return self->GetType().c_str();
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_GetProperties_1(TiledSpriteObject* self, Project* arg0) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetProperties(*arg0), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_UpdateProperty_3(TiledSpriteObject* self, char* arg0, char* arg1, Project* arg2) {
  return self->UpdateProperty(arg0, arg1, *arg2);
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_GetInitialInstanceProperties_3(TiledSpriteObject* self, InitialInstance* arg0, Project* arg1, Layout* arg2) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetInitialInstanceProperties(*arg0, *arg1, *arg2), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_UpdateInitialInstanceProperty_5(TiledSpriteObject* self, InitialInstance* arg0, char* arg1, char* arg2, Project* arg3, Layout* arg4) {
  return self->UpdateInitialInstanceProperty(*arg0, arg1, arg2, *arg3, *arg4);
}

VariablesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_GetVariables_0(TiledSpriteObject* self) {
  return &self->GetVariables();
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_GetAllBehaviorNames_0(TiledSpriteObject* self) {
  static VectorString temp;
  return (temp = self->GetAllBehaviorNames(), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_HasBehaviorNamed_1(TiledSpriteObject* self, char* arg0) {
  return self->HasBehaviorNamed(arg0);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_AddNewBehavior_3(TiledSpriteObject* self, Project* arg0, char* arg1, char* arg2) {
  return self->AddNewBehavior(*arg0, arg1, arg2);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_GetBehavior_1(TiledSpriteObject* self, char* arg0) {
  return &self->GetBehavior(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_RemoveBehavior_1(TiledSpriteObject* self, char* arg0) {
  self->RemoveBehavior(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_RenameBehavior_2(TiledSpriteObject* self, char* arg0, char* arg1) {
  return self->RenameBehavior(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_SerializeTo_1(TiledSpriteObject* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject_UnserializeFrom_2(TiledSpriteObject* self, Project* arg0, SerializerElement* arg1) {
  self->UnserializeFrom(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TiledSpriteObject___destroy___0(TiledSpriteObject* self) {
  delete self;
}

// InstructionMetadata

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionMetadata_GetFullName_0(InstructionMetadata* self) {
  return self->GetFullName().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionMetadata_GetDescription_0(InstructionMetadata* self) {
  return self->GetDescription().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionMetadata_GetSentence_0(InstructionMetadata* self) {
  return self->GetSentence().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionMetadata_GetGroup_0(InstructionMetadata* self) {
  return self->GetGroup().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionMetadata_GetIconFilename_0(InstructionMetadata* self) {
  return self->GetIconFilename().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionMetadata_GetSmallIconFilename_0(InstructionMetadata* self) {
  return self->GetSmallIconFilename().c_str();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionMetadata_CanHaveSubInstructions_0(InstructionMetadata* self) {
  return self->CanHaveSubInstructions();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionMetadata_SetCanHaveSubInstructions_0(InstructionMetadata* self) {
  self->SetCanHaveSubInstructions();
}

const ParameterMetadata* EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionMetadata_GetParameter_1(InstructionMetadata* self, unsigned int arg0) {
  return &self->GetParameter(arg0);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionMetadata_GetParametersCount_0(InstructionMetadata* self) {
  return self->GetParametersCount();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionMetadata_GetUsageComplexity_0(InstructionMetadata* self) {
  return self->GetUsageComplexity();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionMetadata_IsHidden_0(InstructionMetadata* self) {
  return self->IsHidden();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InstructionMetadata___destroy___0(InstructionMetadata* self) {
  delete self;
}

// TextObject

TextObject* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_TextObject_1(char* arg0) {
  return new TextObject(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_SetString_1(TextObject* self, char* arg0) {
  self->SetString(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_GetString_0(TextObject* self) {
  return self->GetString().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_SetCharacterSize_1(TextObject* self, float arg0) {
  self->SetCharacterSize(arg0);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_GetCharacterSize_0(TextObject* self) {
  return self->GetCharacterSize();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_SetFontFilename_1(TextObject* self, char* arg0) {
  self->SetFontFilename(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_GetFontFilename_0(TextObject* self) {
  return self->GetFontFilename().c_str();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_IsBold_0(TextObject* self) {
  return self->IsBold();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_SetBold_1(TextObject* self, bool arg0) {
  self->SetBold(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_IsItalic_0(TextObject* self) {
  return self->IsItalic();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_SetItalic_1(TextObject* self, bool arg0) {
  self->SetItalic(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_IsUnderlined_0(TextObject* self) {
  return self->IsUnderlined();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_SetUnderlined_1(TextObject* self, bool arg0) {
  self->SetUnderlined(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_SetColor_3(TextObject* self, unsigned int arg0, unsigned int arg1, unsigned int arg2) {
  self->SetColor(arg0, arg1, arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_GetColorR_0(TextObject* self) {
  return self->GetColorR();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_GetColorG_0(TextObject* self) {
  return self->GetColorG();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_GetColorB_0(TextObject* self) {
  return self->GetColorB();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_SetName_1(TextObject* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_GetName_0(TextObject* self) {
  return self->GetName().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_SetType_1(TextObject* self, char* arg0) {
  self->SetType(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_GetType_0(TextObject* self) {
  return self->GetType().c_str();
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_GetProperties_1(TextObject* self, Project* arg0) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetProperties(*arg0), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_UpdateProperty_3(TextObject* self, char* arg0, char* arg1, Project* arg2) {
  return self->UpdateProperty(arg0, arg1, *arg2);
}

MapStringPropertyDescriptor* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_GetInitialInstanceProperties_3(TextObject* self, InitialInstance* arg0, Project* arg1, Layout* arg2) {
  static MapStringPropertyDescriptor temp;
  return (temp = self->GetInitialInstanceProperties(*arg0, *arg1, *arg2), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_UpdateInitialInstanceProperty_5(TextObject* self, InitialInstance* arg0, char* arg1, char* arg2, Project* arg3, Layout* arg4) {
  return self->UpdateInitialInstanceProperty(*arg0, arg1, arg2, *arg3, *arg4);
}

VariablesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_GetVariables_0(TextObject* self) {
  return &self->GetVariables();
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_GetAllBehaviorNames_0(TextObject* self) {
  static VectorString temp;
  return (temp = self->GetAllBehaviorNames(), &temp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_HasBehaviorNamed_1(TextObject* self, char* arg0) {
  return self->HasBehaviorNamed(arg0);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_AddNewBehavior_3(TextObject* self, Project* arg0, char* arg1, char* arg2) {
  return self->AddNewBehavior(*arg0, arg1, arg2);
}

Behavior* EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_GetBehavior_1(TextObject* self, char* arg0) {
  return &self->GetBehavior(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_RemoveBehavior_1(TextObject* self, char* arg0) {
  self->RemoveBehavior(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_RenameBehavior_2(TextObject* self, char* arg0, char* arg1) {
  return self->RenameBehavior(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_SerializeTo_1(TextObject* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject_UnserializeFrom_2(TextObject* self, Project* arg0, SerializerElement* arg1) {
  self->UnserializeFrom(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextObject___destroy___0(TextObject* self) {
  delete self;
}

// ExternalEvents

ExternalEvents* EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalEvents_ExternalEvents_0() {
  return new ExternalEvents();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalEvents_SetName_1(ExternalEvents* self, char* arg0) {
  self->SetName(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalEvents_GetName_0(ExternalEvents* self) {
  return self->GetName().c_str();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalEvents_GetAssociatedLayout_0(ExternalEvents* self) {
  return self->GetAssociatedLayout().c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalEvents_SetAssociatedLayout_1(ExternalEvents* self, char* arg0) {
  self->SetAssociatedLayout(arg0);
}

EventsList* EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalEvents_GetEvents_0(ExternalEvents* self) {
  return &self->GetEvents();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalEvents_SerializeTo_1(ExternalEvents* self, SerializerElement* arg0) {
  self->SerializeTo(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalEvents_UnserializeFrom_2(ExternalEvents* self, Project* arg0, SerializerElement* arg1) {
  self->UnserializeFrom(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ExternalEvents___destroy___0(ExternalEvents* self) {
  delete self;
}

// MapStringString

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringString_MAP_get_1(MapStringString* self, char* arg0) {
  return self->MAP_get(arg0).c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringString_MAP_set_2(MapStringString* self, char* arg0, char* arg1) {
  (*self)MAP_set(arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringString_MAP_has_1(MapStringString* self, char* arg0) {
  return self->MAP_has(arg0);
}

VectorString* EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringString_MAP_keys_0(MapStringString* self) {
  static VectorString temp;
temp.clear(); for(auto it = self->begin(); it != self->end();++it) { temp.push_back(it->first); } return &temp;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MapStringString___destroy___0(MapStringString* self) {
  delete self;
}

}


