
#include <emscripten.h>

class InitialInstanceJSFunctor : public InitialInstanceJSFunctorWrapper {
public:
  void invoke(InitialInstance* arg0) {
    EM_ASM_INT({
      var self = Module['getCache'](Module['InitialInstanceJSFunctor'])[$0];
      if (!self.hasOwnProperty('invoke')) throw 'a JSImplementation must implement all functions, you forgot InitialInstanceJSFunctor::invoke.';
      self.invoke($1);
    }, (int)this, (int)arg0);
  }
  void __destroy__() {
    EM_ASM_INT({
      var self = Module['getCache'](Module['InitialInstanceJSFunctor'])[$0];
      if (!self.hasOwnProperty('__destroy__')) throw 'a JSImplementation must implement all functions, you forgot InitialInstanceJSFunctor::__destroy__.';
      self.__destroy__();
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

// InitialInstancesContainer

InitialInstancesContainer* EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_InitialInstancesContainer_0() {
  return new InitialInstancesContainer();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_GetInstancesCount_0(InitialInstancesContainer* self) {
  return self->GetInstancesCount();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_IterateOverInstances_1(InitialInstancesContainer* self, InitialInstanceFunctor* arg0) {
  self->IterateOverInstances(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_IterateOverInstancesWithZOrdering_2(InitialInstancesContainer* self, InitialInstanceFunctor* arg0, char* arg1) {
  self->IterateOverInstancesWithZOrdering(*arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_RemoveAllInstancesOnLayer_1(InitialInstancesContainer* self, char* arg0) {
  self->RemoveAllInstancesOnLayer(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_SomeInstancesAreOnLayer_1(InitialInstancesContainer* self, char* arg0) {
  return self->SomeInstancesAreOnLayer(arg0);
}

InitialInstance* EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer_InsertNewInitialInstance_0(InitialInstancesContainer* self) {
  return &self->InsertNewInitialInstance();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstancesContainer___destroy___0(InitialInstancesContainer* self) {
  delete self;
}

// VectorString

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString_push_back_1(VectorString* self, char* arg0) {
  self->push_back(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString_resize_1(VectorString* self, int arg0) {
  self->resize(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString_size_0(VectorString* self) {
  return self->size();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString_at_1(VectorString* self, int arg0) {
  return self->at(arg0).c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString_WRAPPED_set_2(VectorString* self, int arg0, char* arg1) {
  self->WRAPPED_set(arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString_clear_0(VectorString* self) {
  self->clear();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VectorString___destroy___0(VectorString* self) {
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

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Layout___destroy___0(Layout* self) {
  delete self;
}

// InitialInstanceFunctor

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstanceFunctor___destroy___0(InitialInstanceFunctor* self) {
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

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstance___destroy___0(InitialInstance* self) {
  delete self;
}

// InitialInstanceJSFunctorWrapper

void EMSCRIPTEN_KEEPALIVE emscripten_bind_InitialInstanceJSFunctorWrapper___destroy___0(InitialInstanceJSFunctorWrapper* self) {
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

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_HasLayoutNamed_1(Project* self, char* arg0) {
  return self->HasLayoutNamed(arg0);
}

Layout* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_InsertNewLayout_2(Project* self, char* arg0, int arg1) {
  return &self->InsertNewLayout(arg0, arg1);
}

Layout* EMSCRIPTEN_KEEPALIVE emscripten_bind_Project_GetLayout_1(Project* self, char* arg0) {
  return &self->GetLayout(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Project___destroy___0(Project* self) {
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

// VoidPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VoidPtr___destroy___0(void** self) {
  delete self;
}

}

