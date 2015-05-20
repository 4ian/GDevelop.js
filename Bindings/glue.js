
// Bindings utilities

function WrapperObject() {
}
WrapperObject.prototype = Object.create(WrapperObject.prototype);
WrapperObject.prototype.constructor = WrapperObject;
WrapperObject.prototype.__class__ = WrapperObject;
WrapperObject.__cache__ = {};
Module['WrapperObject'] = WrapperObject;

function getCache(__class__) {
  return (__class__ || WrapperObject).__cache__;
}
Module['getCache'] = getCache;

function wrapPointer(ptr, __class__) {
  var cache = getCache(__class__);
  var ret = cache[ptr];
  if (ret) return ret;
  ret = Object.create((__class__ || WrapperObject).prototype);
  ret.ptr = ptr;
  return cache[ptr] = ret;
}
Module['wrapPointer'] = wrapPointer;

function castObject(obj, __class__) {
  return wrapPointer(obj.ptr, __class__);
}
Module['castObject'] = castObject;

Module['NULL'] = wrapPointer(0);

function destroy(obj) {
  if (!obj['__destroy__']) throw 'Error: Cannot destroy object. (Did you create it yourself?)';
  obj['__destroy__']();
  // Remove from cache, so the object can be GC'd and refs added onto it released
  delete getCache(obj.__class__)[obj.ptr];
}
Module['destroy'] = destroy;

function compare(obj1, obj2) {
  return obj1.ptr === obj2.ptr;
}
Module['compare'] = compare;

function getPointer(obj) {
  return obj.ptr;
}
Module['getPointer'] = getPointer;

function getClass(obj) {
  return obj.__class__;
}
Module['getClass'] = getClass;

// Converts a value into a C-style string.
var ensureString = (function() {
  var stringCache = {};
  function ensureString(value) {
    if (typeof value == 'string') {
      var cachedVal = stringCache[value];
      if (cachedVal) return cachedVal;
      var ret = allocate(intArrayFromString(value), 'i8', ALLOC_STACK);
      stringCache[value] = ret;
      return ret;
    }
    return value;
  }
  return ensureString;
})();


// InitialInstancesContainer
function InitialInstancesContainer() {
  this.ptr = _emscripten_bind_InitialInstancesContainer_InitialInstancesContainer_0();
  getCache(InitialInstancesContainer)[this.ptr] = this;
};;
InitialInstancesContainer.prototype = Object.create(WrapperObject.prototype);
InitialInstancesContainer.prototype.constructor = InitialInstancesContainer;
InitialInstancesContainer.prototype.__class__ = InitialInstancesContainer;
InitialInstancesContainer.__cache__ = {};
Module['InitialInstancesContainer'] = InitialInstancesContainer;

InitialInstancesContainer.prototype['GetInstancesCount'] = function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstancesContainer_GetInstancesCount_0(self);
};;

InitialInstancesContainer.prototype['IterateOverInstances'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstancesContainer_IterateOverInstances_1(self, arg0);
};;

InitialInstancesContainer.prototype['IterateOverInstancesWithZOrdering'] = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_InitialInstancesContainer_IterateOverInstancesWithZOrdering_2(self, arg0, arg1);
};;

InitialInstancesContainer.prototype['RemoveAllInstancesOnLayer'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstancesContainer_RemoveAllInstancesOnLayer_1(self, arg0);
};;

InitialInstancesContainer.prototype['SomeInstancesAreOnLayer'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_InitialInstancesContainer_SomeInstancesAreOnLayer_1(self, arg0);
};;

InitialInstancesContainer.prototype['InsertNewInitialInstance'] = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InitialInstancesContainer_InsertNewInitialInstance_0(self), InitialInstance);
};;

  InitialInstancesContainer.prototype['__destroy__'] = function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstancesContainer___destroy___0(self);
};
// VectorString
function VectorString() { throw "cannot construct a VectorString, no constructor in IDL" }
VectorString.prototype = Object.create(WrapperObject.prototype);
VectorString.prototype.constructor = VectorString;
VectorString.prototype.__class__ = VectorString;
VectorString.__cache__ = {};
Module['VectorString'] = VectorString;

VectorString.prototype['push_back'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_VectorString_push_back_1(self, arg0);
};;

VectorString.prototype['resize'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_VectorString_resize_1(self, arg0);
};;

VectorString.prototype['size'] = function() {
  var self = this.ptr;
  return _emscripten_bind_VectorString_size_0(self);
};;

VectorString.prototype['at'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return Pointer_stringify(_emscripten_bind_VectorString_at_1(self, arg0));
};;

VectorString.prototype['WRAPPED_set'] = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_VectorString_WRAPPED_set_2(self, arg0, arg1);
};;

VectorString.prototype['clear'] = function() {
  var self = this.ptr;
  _emscripten_bind_VectorString_clear_0(self);
};;

  VectorString.prototype['__destroy__'] = function() {
  var self = this.ptr;
  _emscripten_bind_VectorString___destroy___0(self);
};
// Layout
function Layout() {
  this.ptr = _emscripten_bind_Layout_Layout_0();
  getCache(Layout)[this.ptr] = this;
};;
Layout.prototype = Object.create(WrapperObject.prototype);
Layout.prototype.constructor = Layout;
Layout.prototype.__class__ = Layout;
Layout.__cache__ = {};
Module['Layout'] = Layout;

Layout.prototype['SetName'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Layout_SetName_1(self, arg0);
};;

Layout.prototype['GetName'] = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Layout_GetName_0(self));
};;

  Layout.prototype['__destroy__'] = function() {
  var self = this.ptr;
  _emscripten_bind_Layout___destroy___0(self);
};
// InitialInstanceFunctor
function InitialInstanceFunctor() { throw "cannot construct a InitialInstanceFunctor, no constructor in IDL" }
InitialInstanceFunctor.prototype = Object.create(WrapperObject.prototype);
InitialInstanceFunctor.prototype.constructor = InitialInstanceFunctor;
InitialInstanceFunctor.prototype.__class__ = InitialInstanceFunctor;
InitialInstanceFunctor.__cache__ = {};
Module['InitialInstanceFunctor'] = InitialInstanceFunctor;

  InitialInstanceFunctor.prototype['__destroy__'] = function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstanceFunctor___destroy___0(self);
};
// InitialInstance
function InitialInstance() {
  this.ptr = _emscripten_bind_InitialInstance_InitialInstance_0();
  getCache(InitialInstance)[this.ptr] = this;
};;
InitialInstance.prototype = Object.create(WrapperObject.prototype);
InitialInstance.prototype.constructor = InitialInstance;
InitialInstance.prototype.__class__ = InitialInstance;
InitialInstance.__cache__ = {};
Module['InitialInstance'] = InitialInstance;

InitialInstance.prototype['SetObjectName'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstance_SetObjectName_1(self, arg0);
};;

InitialInstance.prototype['GetObjectName'] = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InitialInstance_GetObjectName_0(self));
};;

InitialInstance.prototype['GetX'] = function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetX_0(self);
};;

InitialInstance.prototype['SetX'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstance_SetX_1(self, arg0);
};;

InitialInstance.prototype['GetY'] = function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetY_0(self);
};;

InitialInstance.prototype['SetY'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstance_SetY_1(self, arg0);
};;

InitialInstance.prototype['GetAngle'] = function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetAngle_0(self);
};;

InitialInstance.prototype['SetAngle'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstance_SetAngle_1(self, arg0);
};;

InitialInstance.prototype['GetZOrder'] = function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetZOrder_0(self);
};;

InitialInstance.prototype['SetZOrder'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstance_SetZOrder_1(self, arg0);
};;

InitialInstance.prototype['GetLayer'] = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InitialInstance_GetLayer_0(self));
};;

InitialInstance.prototype['SetLayer'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstance_SetLayer_1(self, arg0);
};;

  InitialInstance.prototype['__destroy__'] = function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstance___destroy___0(self);
};
// InitialInstanceJSFunctorWrapper
function InitialInstanceJSFunctorWrapper() { throw "cannot construct a InitialInstanceJSFunctorWrapper, no constructor in IDL" }
InitialInstanceJSFunctorWrapper.prototype = Object.create(WrapperObject.prototype);
InitialInstanceJSFunctorWrapper.prototype.constructor = InitialInstanceJSFunctorWrapper;
InitialInstanceJSFunctorWrapper.prototype.__class__ = InitialInstanceJSFunctorWrapper;
InitialInstanceJSFunctorWrapper.__cache__ = {};
Module['InitialInstanceJSFunctorWrapper'] = InitialInstanceJSFunctorWrapper;

  InitialInstanceJSFunctorWrapper.prototype['__destroy__'] = function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstanceJSFunctorWrapper___destroy___0(self);
};
// InitialInstanceJSFunctor
function InitialInstanceJSFunctor() {
  this.ptr = _emscripten_bind_InitialInstanceJSFunctor_InitialInstanceJSFunctor_0();
  getCache(InitialInstanceJSFunctor)[this.ptr] = this;
};;
InitialInstanceJSFunctor.prototype = Object.create(InitialInstanceJSFunctorWrapper.prototype);
InitialInstanceJSFunctor.prototype.constructor = InitialInstanceJSFunctor;
InitialInstanceJSFunctor.prototype.__class__ = InitialInstanceJSFunctor;
InitialInstanceJSFunctor.__cache__ = {};
Module['InitialInstanceJSFunctor'] = InitialInstanceJSFunctor;

InitialInstanceJSFunctor.prototype['invoke'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstanceJSFunctor_invoke_1(self, arg0);
};;

  InitialInstanceJSFunctor.prototype['__destroy__'] = function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstanceJSFunctor___destroy___0(self);
};
// Project
function Project() {
  this.ptr = _emscripten_bind_Project_Project_0();
  getCache(Project)[this.ptr] = this;
};;
Project.prototype = Object.create(WrapperObject.prototype);
Project.prototype.constructor = Project;
Project.prototype.__class__ = Project;
Project.__cache__ = {};
Module['Project'] = Project;

Project.prototype['SetName'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetName_1(self, arg0);
};;

Project.prototype['GetName'] = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetName_0(self));
};;

Project.prototype['SetAuthor'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetAuthor_1(self, arg0);
};;

Project.prototype['GetAuthor'] = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetAuthor_0(self));
};;

Project.prototype['SetProjectFile'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetProjectFile_1(self, arg0);
};;

Project.prototype['GetProjectFile'] = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetProjectFile_0(self));
};;

Project.prototype['SetDefaultWidth'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetDefaultWidth_1(self, arg0);
};;

Project.prototype['GetMainWindowDefaultWidth'] = function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetMainWindowDefaultWidth_0(self);
};;

Project.prototype['SetDefaultHeight'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetDefaultHeight_1(self, arg0);
};;

Project.prototype['GetMainWindowDefaultHeight'] = function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetMainWindowDefaultHeight_0(self);
};;

Project.prototype['GetMaximumFPS'] = function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetMaximumFPS_0(self);
};;

Project.prototype['SetMaximumFPS'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetMaximumFPS_1(self, arg0);
};;

Project.prototype['GetMinimumFPS'] = function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetMinimumFPS_0(self);
};;

Project.prototype['SetMinimumFPS'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetMinimumFPS_1(self, arg0);
};;

Project.prototype['GetUsedExtensions'] = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Project_GetUsedExtensions_0(self), VectorString);
};;

Project.prototype['HasLayoutNamed'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_Project_HasLayoutNamed_1(self, arg0);
};;

Project.prototype['InsertNewLayout'] = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_Project_InsertNewLayout_2(self, arg0, arg1), Layout);
};;

Project.prototype['GetLayout'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Project_GetLayout_1(self, arg0), Layout);
};;

  Project.prototype['__destroy__'] = function() {
  var self = this.ptr;
  _emscripten_bind_Project___destroy___0(self);
};
// ProjectHelper
function ProjectHelper() { throw "cannot construct a ProjectHelper, no constructor in IDL" }
ProjectHelper.prototype = Object.create(WrapperObject.prototype);
ProjectHelper.prototype.constructor = ProjectHelper;
ProjectHelper.prototype.__class__ = ProjectHelper;
ProjectHelper.__cache__ = {};
Module['ProjectHelper'] = ProjectHelper;

ProjectHelper.prototype['STATIC_CreateNewGDJSProject'] = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ProjectHelper_STATIC_CreateNewGDJSProject_0(self), Project);
};;

ProjectHelper.prototype['STATIC_InitializePlatforms'] = function() {
  var self = this.ptr;
  _emscripten_bind_ProjectHelper_STATIC_InitializePlatforms_0(self);
};;

  ProjectHelper.prototype['__destroy__'] = function() {
  var self = this.ptr;
  _emscripten_bind_ProjectHelper___destroy___0(self);
};
// VoidPtr
function VoidPtr() { throw "cannot construct a VoidPtr, no constructor in IDL" }
VoidPtr.prototype = Object.create(WrapperObject.prototype);
VoidPtr.prototype.constructor = VoidPtr;
VoidPtr.prototype.__class__ = VoidPtr;
VoidPtr.__cache__ = {};
Module['VoidPtr'] = VoidPtr;

  VoidPtr.prototype['__destroy__'] = function() {
  var self = this.ptr;
  _emscripten_bind_VoidPtr___destroy___0(self);
};
(function() {
  function setupEnums() {
    
  }
  if (Module['calledRun']) setupEnums();
  else addOnPreMain(setupEnums);
})();
