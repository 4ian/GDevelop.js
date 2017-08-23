
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

// Converts a value into a C-style string, storing it in temporary space

var ensureStringCache = {
  buffer: 0,  // the main buffer of temporary storage
  size: 0,   // the size of buffer
  pos: 0,    // the next free offset in buffer
  temps: [], // extra allocations
  needed: 0, // the total size we need next time

  prepare: function() {
    if (this.needed) {
      // clear the temps
      for (var i = 0; i < this.temps.length; i++) {
        Module['_free'](this.temps[i]);
      }
      this.temps.length = 0;
      // prepare to allocate a bigger buffer
      Module['_free'](this.buffer);
      this.buffer = 0;
      this.size += this.needed;
      // clean up
      this.needed = 0;
    }
    if (!this.buffer) { // happens first time, or when we need to grow
      this.size += 100; // heuristic, avoid many small grow events
      this.buffer = Module['_malloc'](this.size);
      assert(this.buffer);
    }
    this.pos = 0;
  },
  alloc: function(value) {
    assert(this.buffer);
    var array = intArrayFromString(value);
    var len = array.length;
    var ret;
    if (this.pos + len >= this.size) {
      // we failed to allocate in the buffer, this time around :(
      assert(len > 0); // null terminator, at least
      this.needed += len;
      ret = Module['_malloc'](len);
      this.temps.push(ret);
    } else {
      // we can allocate in the buffer
      ret = this.buffer + this.pos;
      this.pos += len;
    }
    writeArrayToMemory(array, ret);
    return ret;
  },
};

function ensureString(value) {
  if (typeof value === 'string') return ensureStringCache.alloc(value);
  return value;
}


// ArbitraryResourceWorker
function ArbitraryResourceWorker() { throw "cannot construct a ArbitraryResourceWorker, no constructor in IDL" }
ArbitraryResourceWorker.prototype = Object.create(WrapperObject.prototype);
ArbitraryResourceWorker.prototype.constructor = ArbitraryResourceWorker;
ArbitraryResourceWorker.prototype.__class__ = ArbitraryResourceWorker;
ArbitraryResourceWorker.__cache__ = {};
Module['ArbitraryResourceWorker'] = ArbitraryResourceWorker;

  ArbitraryResourceWorker.prototype['__destroy__'] = ArbitraryResourceWorker.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ArbitraryResourceWorker___destroy___0(self);
};
// InitialInstanceJSFunctorWrapper
function InitialInstanceJSFunctorWrapper() { throw "cannot construct a InitialInstanceJSFunctorWrapper, no constructor in IDL" }
InitialInstanceJSFunctorWrapper.prototype = Object.create(WrapperObject.prototype);
InitialInstanceJSFunctorWrapper.prototype.constructor = InitialInstanceJSFunctorWrapper;
InitialInstanceJSFunctorWrapper.prototype.__class__ = InitialInstanceJSFunctorWrapper;
InitialInstanceJSFunctorWrapper.__cache__ = {};
Module['InitialInstanceJSFunctorWrapper'] = InitialInstanceJSFunctorWrapper;

  InitialInstanceJSFunctorWrapper.prototype['__destroy__'] = InitialInstanceJSFunctorWrapper.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstanceJSFunctorWrapper___destroy___0(self);
};
// AbstractFileSystem
function AbstractFileSystem() { throw "cannot construct a AbstractFileSystem, no constructor in IDL" }
AbstractFileSystem.prototype = Object.create(WrapperObject.prototype);
AbstractFileSystem.prototype.constructor = AbstractFileSystem;
AbstractFileSystem.prototype.__class__ = AbstractFileSystem;
AbstractFileSystem.__cache__ = {};
Module['AbstractFileSystem'] = AbstractFileSystem;

  AbstractFileSystem.prototype['__destroy__'] = AbstractFileSystem.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_AbstractFileSystem___destroy___0(self);
};
// VectorPlatformExtension
function VectorPlatformExtension() { throw "cannot construct a VectorPlatformExtension, no constructor in IDL" }
VectorPlatformExtension.prototype = Object.create(WrapperObject.prototype);
VectorPlatformExtension.prototype.constructor = VectorPlatformExtension;
VectorPlatformExtension.prototype.__class__ = VectorPlatformExtension;
VectorPlatformExtension.__cache__ = {};
Module['VectorPlatformExtension'] = VectorPlatformExtension;

VectorPlatformExtension.prototype['size'] = VectorPlatformExtension.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_VectorPlatformExtension_size_0(self);
};;

VectorPlatformExtension.prototype['WRAPPED_at'] = VectorPlatformExtension.prototype.WRAPPED_at = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VectorPlatformExtension_WRAPPED_at_1(self, arg0), PlatformExtension);
};;

  VectorPlatformExtension.prototype['__destroy__'] = VectorPlatformExtension.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_VectorPlatformExtension___destroy___0(self);
};
// TextEntryObject
function TextEntryObject(arg0) {
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_TextEntryObject_TextEntryObject_1(arg0);
  getCache(TextEntryObject)[this.ptr] = this;
};;
TextEntryObject.prototype = Object.create(WrapperObject.prototype);
TextEntryObject.prototype.constructor = TextEntryObject;
TextEntryObject.prototype.__class__ = TextEntryObject;
TextEntryObject.__cache__ = {};
Module['TextEntryObject'] = TextEntryObject;

TextEntryObject.prototype['SetName'] = TextEntryObject.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextEntryObject_SetName_1(self, arg0);
};;

TextEntryObject.prototype['GetName'] = TextEntryObject.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TextEntryObject_GetName_0(self));
};;

TextEntryObject.prototype['SetType'] = TextEntryObject.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextEntryObject_SetType_1(self, arg0);
};;

TextEntryObject.prototype['GetType'] = TextEntryObject.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TextEntryObject_GetType_0(self));
};;

TextEntryObject.prototype['GetProperties'] = TextEntryObject.prototype.GetProperties = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_TextEntryObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

TextEntryObject.prototype['UpdateProperty'] = TextEntryObject.prototype.UpdateProperty = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_TextEntryObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

TextEntryObject.prototype['GetInitialInstanceProperties'] = TextEntryObject.prototype.GetInitialInstanceProperties = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_TextEntryObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

TextEntryObject.prototype['UpdateInitialInstanceProperty'] = TextEntryObject.prototype.UpdateInitialInstanceProperty = function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_TextEntryObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

TextEntryObject.prototype['GetVariables'] = TextEntryObject.prototype.GetVariables = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TextEntryObject_GetVariables_0(self), VariablesContainer);
};;

TextEntryObject.prototype['GetAllBehaviorNames'] = TextEntryObject.prototype.GetAllBehaviorNames = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TextEntryObject_GetAllBehaviorNames_0(self), VectorString);
};;

TextEntryObject.prototype['HasBehaviorNamed'] = TextEntryObject.prototype.HasBehaviorNamed = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_TextEntryObject_HasBehaviorNamed_1(self, arg0));
};;

TextEntryObject.prototype['AddNewBehavior'] = TextEntryObject.prototype.AddNewBehavior = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_TextEntryObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

TextEntryObject.prototype['GetBehavior'] = TextEntryObject.prototype.GetBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_TextEntryObject_GetBehavior_1(self, arg0), Behavior);
};;

TextEntryObject.prototype['RemoveBehavior'] = TextEntryObject.prototype.RemoveBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextEntryObject_RemoveBehavior_1(self, arg0);
};;

TextEntryObject.prototype['RenameBehavior'] = TextEntryObject.prototype.RenameBehavior = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_TextEntryObject_RenameBehavior_2(self, arg0, arg1));
};;

TextEntryObject.prototype['SerializeTo'] = TextEntryObject.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TextEntryObject_SerializeTo_1(self, arg0);
};;

TextEntryObject.prototype['UnserializeFrom'] = TextEntryObject.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_TextEntryObject_UnserializeFrom_2(self, arg0, arg1);
};;

  TextEntryObject.prototype['__destroy__'] = TextEntryObject.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_TextEntryObject___destroy___0(self);
};
// ObjectGroup
function ObjectGroup() {
  this.ptr = _emscripten_bind_ObjectGroup_ObjectGroup_0();
  getCache(ObjectGroup)[this.ptr] = this;
};;
ObjectGroup.prototype = Object.create(WrapperObject.prototype);
ObjectGroup.prototype.constructor = ObjectGroup;
ObjectGroup.prototype.__class__ = ObjectGroup;
ObjectGroup.__cache__ = {};
Module['ObjectGroup'] = ObjectGroup;

ObjectGroup.prototype['GetName'] = ObjectGroup.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ObjectGroup_GetName_0(self));
};;

ObjectGroup.prototype['SetName'] = ObjectGroup.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ObjectGroup_SetName_1(self, arg0);
};;

ObjectGroup.prototype['AddObject'] = ObjectGroup.prototype.AddObject = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ObjectGroup_AddObject_1(self, arg0);
};;

ObjectGroup.prototype['RemoveObject'] = ObjectGroup.prototype.RemoveObject = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ObjectGroup_RemoveObject_1(self, arg0);
};;

ObjectGroup.prototype['Find'] = ObjectGroup.prototype.Find = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ObjectGroup_Find_1(self, arg0));
};;

  ObjectGroup.prototype['__destroy__'] = ObjectGroup.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ObjectGroup___destroy___0(self);
};
// Direction
function Direction() {
  this.ptr = _emscripten_bind_Direction_Direction_0();
  getCache(Direction)[this.ptr] = this;
};;
Direction.prototype = Object.create(WrapperObject.prototype);
Direction.prototype.constructor = Direction;
Direction.prototype.__class__ = Direction;
Direction.__cache__ = {};
Module['Direction'] = Direction;

Direction.prototype['AddSprite'] = Direction.prototype.AddSprite = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Direction_AddSprite_1(self, arg0);
};;

Direction.prototype['GetSprite'] = Direction.prototype.GetSprite = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Direction_GetSprite_1(self, arg0), Sprite);
};;

Direction.prototype['GetSpritesCount'] = Direction.prototype.GetSpritesCount = function() {
  var self = this.ptr;
  return _emscripten_bind_Direction_GetSpritesCount_0(self);
};;

Direction.prototype['HasNoSprites'] = Direction.prototype.HasNoSprites = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Direction_HasNoSprites_0(self));
};;

Direction.prototype['RemoveSprite'] = Direction.prototype.RemoveSprite = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Direction_RemoveSprite_1(self, arg0);
};;

Direction.prototype['RemoveAllSprites'] = Direction.prototype.RemoveAllSprites = function() {
  var self = this.ptr;
  _emscripten_bind_Direction_RemoveAllSprites_0(self);
};;

Direction.prototype['IsLooping'] = Direction.prototype.IsLooping = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Direction_IsLooping_0(self));
};;

Direction.prototype['SetLoop'] = Direction.prototype.SetLoop = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Direction_SetLoop_1(self, arg0);
};;

Direction.prototype['GetTimeBetweenFrames'] = Direction.prototype.GetTimeBetweenFrames = function() {
  var self = this.ptr;
  return _emscripten_bind_Direction_GetTimeBetweenFrames_0(self);
};;

Direction.prototype['SetTimeBetweenFrames'] = Direction.prototype.SetTimeBetweenFrames = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Direction_SetTimeBetweenFrames_1(self, arg0);
};;

Direction.prototype['SwapSprites'] = Direction.prototype.SwapSprites = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Direction_SwapSprites_2(self, arg0, arg1);
};;

Direction.prototype['MoveSprite'] = Direction.prototype.MoveSprite = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Direction_MoveSprite_2(self, arg0, arg1);
};;

  Direction.prototype['__destroy__'] = Direction.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Direction___destroy___0(self);
};
// PairStringVariable
function PairStringVariable() {
  this.ptr = _emscripten_bind_PairStringVariable_PairStringVariable_0();
  getCache(PairStringVariable)[this.ptr] = this;
};;
PairStringVariable.prototype = Object.create(WrapperObject.prototype);
PairStringVariable.prototype.constructor = PairStringVariable;
PairStringVariable.prototype.__class__ = PairStringVariable;
PairStringVariable.__cache__ = {};
Module['PairStringVariable'] = PairStringVariable;

PairStringVariable.prototype['WRAPPED_GetName'] = PairStringVariable.prototype.WRAPPED_GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PairStringVariable_WRAPPED_GetName_0(self));
};;

PairStringVariable.prototype['WRAPPED_GetVariable'] = PairStringVariable.prototype.WRAPPED_GetVariable = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PairStringVariable_WRAPPED_GetVariable_0(self), Variable);
};;

  PairStringVariable.prototype['__destroy__'] = PairStringVariable.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_PairStringVariable___destroy___0(self);
};
// ResourcesManager
function ResourcesManager() {
  this.ptr = _emscripten_bind_ResourcesManager_ResourcesManager_0();
  getCache(ResourcesManager)[this.ptr] = this;
};;
ResourcesManager.prototype = Object.create(WrapperObject.prototype);
ResourcesManager.prototype.constructor = ResourcesManager;
ResourcesManager.prototype.__class__ = ResourcesManager;
ResourcesManager.__cache__ = {};
Module['ResourcesManager'] = ResourcesManager;

ResourcesManager.prototype['GetAllResourcesList'] = ResourcesManager.prototype.GetAllResourcesList = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ResourcesManager_GetAllResourcesList_0(self), VectorString);
};;

ResourcesManager.prototype['HasResource'] = ResourcesManager.prototype.HasResource = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ResourcesManager_HasResource_1(self, arg0));
};;

ResourcesManager.prototype['GetResource'] = ResourcesManager.prototype.GetResource = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ResourcesManager_GetResource_1(self, arg0), Resource);
};;

ResourcesManager.prototype['AddResource'] = ResourcesManager.prototype.AddResource = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return !!(_emscripten_bind_ResourcesManager_AddResource_1(self, arg0));
};;

ResourcesManager.prototype['RemoveResource'] = ResourcesManager.prototype.RemoveResource = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ResourcesManager_RemoveResource_1(self, arg0);
};;

ResourcesManager.prototype['RenameResource'] = ResourcesManager.prototype.RenameResource = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_ResourcesManager_RenameResource_2(self, arg0, arg1);
};;

ResourcesManager.prototype['MoveResourceUpInList'] = ResourcesManager.prototype.MoveResourceUpInList = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ResourcesManager_MoveResourceUpInList_1(self, arg0));
};;

ResourcesManager.prototype['MoveResourceDownInList'] = ResourcesManager.prototype.MoveResourceDownInList = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ResourcesManager_MoveResourceDownInList_1(self, arg0));
};;

  ResourcesManager.prototype['__destroy__'] = ResourcesManager.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ResourcesManager___destroy___0(self);
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

Project.prototype['SetName'] = Project.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetName_1(self, arg0);
};;

Project.prototype['GetName'] = Project.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetName_0(self));
};;

Project.prototype['SetAuthor'] = Project.prototype.SetAuthor = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetAuthor_1(self, arg0);
};;

Project.prototype['GetAuthor'] = Project.prototype.GetAuthor = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetAuthor_0(self));
};;

Project.prototype['SetPackageName'] = Project.prototype.SetPackageName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetPackageName_1(self, arg0);
};;

Project.prototype['GetPackageName'] = Project.prototype.GetPackageName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetPackageName_0(self));
};;

Project.prototype['SetProjectFile'] = Project.prototype.SetProjectFile = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetProjectFile_1(self, arg0);
};;

Project.prototype['GetProjectFile'] = Project.prototype.GetProjectFile = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetProjectFile_0(self));
};;

Project.prototype['SetDefaultWidth'] = Project.prototype.SetDefaultWidth = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_SetDefaultWidth_1(self, arg0);
};;

Project.prototype['GetMainWindowDefaultWidth'] = Project.prototype.GetMainWindowDefaultWidth = function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetMainWindowDefaultWidth_0(self);
};;

Project.prototype['SetDefaultHeight'] = Project.prototype.SetDefaultHeight = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_SetDefaultHeight_1(self, arg0);
};;

Project.prototype['GetMainWindowDefaultHeight'] = Project.prototype.GetMainWindowDefaultHeight = function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetMainWindowDefaultHeight_0(self);
};;

Project.prototype['GetMaximumFPS'] = Project.prototype.GetMaximumFPS = function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetMaximumFPS_0(self);
};;

Project.prototype['SetMaximumFPS'] = Project.prototype.SetMaximumFPS = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_SetMaximumFPS_1(self, arg0);
};;

Project.prototype['GetMinimumFPS'] = Project.prototype.GetMinimumFPS = function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetMinimumFPS_0(self);
};;

Project.prototype['SetMinimumFPS'] = Project.prototype.SetMinimumFPS = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_SetMinimumFPS_1(self, arg0);
};;

Project.prototype['SetLastCompilationDirectory'] = Project.prototype.SetLastCompilationDirectory = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetLastCompilationDirectory_1(self, arg0);
};;

Project.prototype['GetLastCompilationDirectory'] = Project.prototype.GetLastCompilationDirectory = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetLastCompilationDirectory_0(self));
};;

Project.prototype['GetUsedExtensions'] = Project.prototype.GetUsedExtensions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Project_GetUsedExtensions_0(self), VectorString);
};;

Project.prototype['AddPlatform'] = Project.prototype.AddPlatform = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_AddPlatform_1(self, arg0);
};;

Project.prototype['GetCurrentPlatform'] = Project.prototype.GetCurrentPlatform = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Project_GetCurrentPlatform_0(self), Platform);
};;

Project.prototype['HasLayoutNamed'] = Project.prototype.HasLayoutNamed = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Project_HasLayoutNamed_1(self, arg0));
};;

Project.prototype['GetLayout'] = Project.prototype.GetLayout = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Project_GetLayout_1(self, arg0), Layout);
};;

Project.prototype['GetLayoutAt'] = Project.prototype.GetLayoutAt = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Project_GetLayoutAt_1(self, arg0), Layout);
};;

Project.prototype['SwapLayouts'] = Project.prototype.SwapLayouts = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Project_SwapLayouts_2(self, arg0, arg1);
};;

Project.prototype['GetLayoutsCount'] = Project.prototype.GetLayoutsCount = function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetLayoutsCount_0(self);
};;

Project.prototype['InsertNewLayout'] = Project.prototype.InsertNewLayout = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_Project_InsertNewLayout_2(self, arg0, arg1), Layout);
};;

Project.prototype['RemoveLayout'] = Project.prototype.RemoveLayout = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_RemoveLayout_1(self, arg0);
};;

Project.prototype['SetFirstLayout'] = Project.prototype.SetFirstLayout = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetFirstLayout_1(self, arg0);
};;

Project.prototype['GetFirstLayout'] = Project.prototype.GetFirstLayout = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetFirstLayout_0(self));
};;

Project.prototype['HasExternalEventsNamed'] = Project.prototype.HasExternalEventsNamed = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Project_HasExternalEventsNamed_1(self, arg0));
};;

Project.prototype['GetExternalEvents'] = Project.prototype.GetExternalEvents = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Project_GetExternalEvents_1(self, arg0), ExternalEvents);
};;

Project.prototype['GetExternalEventsAt'] = Project.prototype.GetExternalEventsAt = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Project_GetExternalEventsAt_1(self, arg0), ExternalEvents);
};;

Project.prototype['SwapExternalEvents'] = Project.prototype.SwapExternalEvents = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Project_SwapExternalEvents_2(self, arg0, arg1);
};;

Project.prototype['GetExternalEventsCount'] = Project.prototype.GetExternalEventsCount = function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetExternalEventsCount_0(self);
};;

Project.prototype['InsertNewExternalEvents'] = Project.prototype.InsertNewExternalEvents = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_Project_InsertNewExternalEvents_2(self, arg0, arg1), ExternalEvents);
};;

Project.prototype['RemoveExternalEvents'] = Project.prototype.RemoveExternalEvents = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_RemoveExternalEvents_1(self, arg0);
};;

Project.prototype['HasExternalLayoutNamed'] = Project.prototype.HasExternalLayoutNamed = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Project_HasExternalLayoutNamed_1(self, arg0));
};;

Project.prototype['GetExternalLayout'] = Project.prototype.GetExternalLayout = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Project_GetExternalLayout_1(self, arg0), ExternalLayout);
};;

Project.prototype['GetExternalLayoutAt'] = Project.prototype.GetExternalLayoutAt = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Project_GetExternalLayoutAt_1(self, arg0), ExternalLayout);
};;

Project.prototype['SwapExternalLayouts'] = Project.prototype.SwapExternalLayouts = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Project_SwapExternalLayouts_2(self, arg0, arg1);
};;

Project.prototype['GetExternalLayoutsCount'] = Project.prototype.GetExternalLayoutsCount = function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetExternalLayoutsCount_0(self);
};;

Project.prototype['InsertNewExternalLayout'] = Project.prototype.InsertNewExternalLayout = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_Project_InsertNewExternalLayout_2(self, arg0, arg1), ExternalLayout);
};;

Project.prototype['RemoveExternalLayout'] = Project.prototype.RemoveExternalLayout = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_RemoveExternalLayout_1(self, arg0);
};;

Project.prototype['GetVariables'] = Project.prototype.GetVariables = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Project_GetVariables_0(self), VariablesContainer);
};;

Project.prototype['GetResourcesManager'] = Project.prototype.GetResourcesManager = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Project_GetResourcesManager_0(self), ResourcesManager);
};;

Project.prototype['ExposeResources'] = Project.prototype.ExposeResources = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_ExposeResources_1(self, arg0);
};;

Project.prototype['STATIC_ValidateObjectName'] = Project.prototype.STATIC_ValidateObjectName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Project_STATIC_ValidateObjectName_1(self, arg0));
};;

Project.prototype['IsDirty'] = Project.prototype.IsDirty = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Project_IsDirty_0(self));
};;

Project.prototype['SerializeTo'] = Project.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_SerializeTo_1(self, arg0);
};;

Project.prototype['UnserializeFrom'] = Project.prototype.UnserializeFrom = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_UnserializeFrom_1(self, arg0);
};;

Project.prototype['GetObjectGroups'] = Project.prototype.GetObjectGroups = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Project_GetObjectGroups_0(self), VectorObjectGroup);
};;

Project.prototype['FREE_GetTypeOfBehavior'] = Project.prototype.FREE_GetTypeOfBehavior = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return Pointer_stringify(_emscripten_bind_Project_FREE_GetTypeOfBehavior_3(self, arg0, arg1, arg2));
};;

Project.prototype['FREE_GetTypeOfObject'] = Project.prototype.FREE_GetTypeOfObject = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return Pointer_stringify(_emscripten_bind_Project_FREE_GetTypeOfObject_3(self, arg0, arg1, arg2));
};;

Project.prototype['FREE_GetBehaviorsOfObject'] = Project.prototype.FREE_GetBehaviorsOfObject = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_Project_FREE_GetBehaviorsOfObject_3(self, arg0, arg1, arg2), VectorString);
};;

Project.prototype['InsertNewObject'] = Project.prototype.InsertNewObject = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return wrapPointer(_emscripten_bind_Project_InsertNewObject_4(self, arg0, arg1, arg2, arg3), gdObject);
};;

Project.prototype['InsertObject'] = Project.prototype.InsertObject = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_Project_InsertObject_2(self, arg0, arg1), gdObject);
};;

Project.prototype['HasObjectNamed'] = Project.prototype.HasObjectNamed = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Project_HasObjectNamed_1(self, arg0));
};;

Project.prototype['GetObject'] = Project.prototype.GetObject = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Project_GetObject_1(self, arg0), gdObject);
};;

Project.prototype['GetObjectAt'] = Project.prototype.GetObjectAt = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Project_GetObjectAt_1(self, arg0), gdObject);
};;

Project.prototype['GetObjectPosition'] = Project.prototype.GetObjectPosition = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_GetObjectPosition_1(self, arg0);
};;

Project.prototype['RemoveObject'] = Project.prototype.RemoveObject = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_RemoveObject_1(self, arg0);
};;

Project.prototype['SwapObjects'] = Project.prototype.SwapObjects = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Project_SwapObjects_2(self, arg0, arg1);
};;

Project.prototype['MoveObject'] = Project.prototype.MoveObject = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Project_MoveObject_2(self, arg0, arg1);
};;

Project.prototype['GetObjectsCount'] = Project.prototype.GetObjectsCount = function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetObjectsCount_0(self);
};;

  Project.prototype['__destroy__'] = Project.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Project___destroy___0(self);
};
// Layer
function Layer() {
  this.ptr = _emscripten_bind_Layer_Layer_0();
  getCache(Layer)[this.ptr] = this;
};;
Layer.prototype = Object.create(WrapperObject.prototype);
Layer.prototype.constructor = Layer;
Layer.prototype.__class__ = Layer;
Layer.__cache__ = {};
Module['Layer'] = Layer;

Layer.prototype['SetName'] = Layer.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Layer_SetName_1(self, arg0);
};;

Layer.prototype['GetName'] = Layer.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Layer_GetName_0(self));
};;

Layer.prototype['SetVisibility'] = Layer.prototype.SetVisibility = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Layer_SetVisibility_1(self, arg0);
};;

Layer.prototype['GetVisibility'] = Layer.prototype.GetVisibility = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Layer_GetVisibility_0(self));
};;

  Layer.prototype['__destroy__'] = Layer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Layer___destroy___0(self);
};
// BehaviorMetadata
function BehaviorMetadata() { throw "cannot construct a BehaviorMetadata, no constructor in IDL" }
BehaviorMetadata.prototype = Object.create(WrapperObject.prototype);
BehaviorMetadata.prototype.constructor = BehaviorMetadata;
BehaviorMetadata.prototype.__class__ = BehaviorMetadata;
BehaviorMetadata.__cache__ = {};
Module['BehaviorMetadata'] = BehaviorMetadata;

BehaviorMetadata.prototype['GetFullName'] = BehaviorMetadata.prototype.GetFullName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BehaviorMetadata_GetFullName_0(self));
};;

BehaviorMetadata.prototype['GetDefaultName'] = BehaviorMetadata.prototype.GetDefaultName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BehaviorMetadata_GetDefaultName_0(self));
};;

BehaviorMetadata.prototype['GetDescription'] = BehaviorMetadata.prototype.GetDescription = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BehaviorMetadata_GetDescription_0(self));
};;

BehaviorMetadata.prototype['GetGroup'] = BehaviorMetadata.prototype.GetGroup = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BehaviorMetadata_GetGroup_0(self));
};;

BehaviorMetadata.prototype['GetIconFilename'] = BehaviorMetadata.prototype.GetIconFilename = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BehaviorMetadata_GetIconFilename_0(self));
};;

  BehaviorMetadata.prototype['__destroy__'] = BehaviorMetadata.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BehaviorMetadata___destroy___0(self);
};
// EventsParametersLister
function EventsParametersLister(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  this.ptr = _emscripten_bind_EventsParametersLister_EventsParametersLister_1(arg0);
  getCache(EventsParametersLister)[this.ptr] = this;
};;
EventsParametersLister.prototype = Object.create(WrapperObject.prototype);
EventsParametersLister.prototype.constructor = EventsParametersLister;
EventsParametersLister.prototype.__class__ = EventsParametersLister;
EventsParametersLister.__cache__ = {};
Module['EventsParametersLister'] = EventsParametersLister;

EventsParametersLister.prototype['GetParametersAndTypes'] = EventsParametersLister.prototype.GetParametersAndTypes = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_EventsParametersLister_GetParametersAndTypes_0(self), MapStringString);
};;

EventsParametersLister.prototype['Launch'] = EventsParametersLister.prototype.Launch = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsParametersLister_Launch_1(self, arg0);
};;

  EventsParametersLister.prototype['__destroy__'] = EventsParametersLister.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_EventsParametersLister___destroy___0(self);
};
// EventMetadata
function EventMetadata() { throw "cannot construct a EventMetadata, no constructor in IDL" }
EventMetadata.prototype = Object.create(WrapperObject.prototype);
EventMetadata.prototype.constructor = EventMetadata;
EventMetadata.prototype.__class__ = EventMetadata;
EventMetadata.__cache__ = {};
Module['EventMetadata'] = EventMetadata;

EventMetadata.prototype['GetFullName'] = EventMetadata.prototype.GetFullName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventMetadata_GetFullName_0(self));
};;

EventMetadata.prototype['GetDescription'] = EventMetadata.prototype.GetDescription = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventMetadata_GetDescription_0(self));
};;

EventMetadata.prototype['GetGroup'] = EventMetadata.prototype.GetGroup = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventMetadata_GetGroup_0(self));
};;

  EventMetadata.prototype['__destroy__'] = EventMetadata.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_EventMetadata___destroy___0(self);
};
// TextObject
function TextObject(arg0) {
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_TextObject_TextObject_1(arg0);
  getCache(TextObject)[this.ptr] = this;
};;
TextObject.prototype = Object.create(WrapperObject.prototype);
TextObject.prototype.constructor = TextObject;
TextObject.prototype.__class__ = TextObject;
TextObject.__cache__ = {};
Module['TextObject'] = TextObject;

TextObject.prototype['SetString'] = TextObject.prototype.SetString = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextObject_SetString_1(self, arg0);
};;

TextObject.prototype['GetString'] = TextObject.prototype.GetString = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TextObject_GetString_0(self));
};;

TextObject.prototype['SetCharacterSize'] = TextObject.prototype.SetCharacterSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TextObject_SetCharacterSize_1(self, arg0);
};;

TextObject.prototype['GetCharacterSize'] = TextObject.prototype.GetCharacterSize = function() {
  var self = this.ptr;
  return _emscripten_bind_TextObject_GetCharacterSize_0(self);
};;

TextObject.prototype['SetFontFilename'] = TextObject.prototype.SetFontFilename = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextObject_SetFontFilename_1(self, arg0);
};;

TextObject.prototype['GetFontFilename'] = TextObject.prototype.GetFontFilename = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TextObject_GetFontFilename_0(self));
};;

TextObject.prototype['IsBold'] = TextObject.prototype.IsBold = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TextObject_IsBold_0(self));
};;

TextObject.prototype['SetBold'] = TextObject.prototype.SetBold = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TextObject_SetBold_1(self, arg0);
};;

TextObject.prototype['IsItalic'] = TextObject.prototype.IsItalic = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TextObject_IsItalic_0(self));
};;

TextObject.prototype['SetItalic'] = TextObject.prototype.SetItalic = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TextObject_SetItalic_1(self, arg0);
};;

TextObject.prototype['IsUnderlined'] = TextObject.prototype.IsUnderlined = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TextObject_IsUnderlined_0(self));
};;

TextObject.prototype['SetUnderlined'] = TextObject.prototype.SetUnderlined = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TextObject_SetUnderlined_1(self, arg0);
};;

TextObject.prototype['SetColor'] = TextObject.prototype.SetColor = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_TextObject_SetColor_3(self, arg0, arg1, arg2);
};;

TextObject.prototype['GetColorR'] = TextObject.prototype.GetColorR = function() {
  var self = this.ptr;
  return _emscripten_bind_TextObject_GetColorR_0(self);
};;

TextObject.prototype['GetColorG'] = TextObject.prototype.GetColorG = function() {
  var self = this.ptr;
  return _emscripten_bind_TextObject_GetColorG_0(self);
};;

TextObject.prototype['GetColorB'] = TextObject.prototype.GetColorB = function() {
  var self = this.ptr;
  return _emscripten_bind_TextObject_GetColorB_0(self);
};;

TextObject.prototype['SetName'] = TextObject.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextObject_SetName_1(self, arg0);
};;

TextObject.prototype['GetName'] = TextObject.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TextObject_GetName_0(self));
};;

TextObject.prototype['SetType'] = TextObject.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextObject_SetType_1(self, arg0);
};;

TextObject.prototype['GetType'] = TextObject.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TextObject_GetType_0(self));
};;

TextObject.prototype['GetProperties'] = TextObject.prototype.GetProperties = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_TextObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

TextObject.prototype['UpdateProperty'] = TextObject.prototype.UpdateProperty = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_TextObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

TextObject.prototype['GetInitialInstanceProperties'] = TextObject.prototype.GetInitialInstanceProperties = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_TextObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

TextObject.prototype['UpdateInitialInstanceProperty'] = TextObject.prototype.UpdateInitialInstanceProperty = function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_TextObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

TextObject.prototype['GetVariables'] = TextObject.prototype.GetVariables = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TextObject_GetVariables_0(self), VariablesContainer);
};;

TextObject.prototype['GetAllBehaviorNames'] = TextObject.prototype.GetAllBehaviorNames = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TextObject_GetAllBehaviorNames_0(self), VectorString);
};;

TextObject.prototype['HasBehaviorNamed'] = TextObject.prototype.HasBehaviorNamed = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_TextObject_HasBehaviorNamed_1(self, arg0));
};;

TextObject.prototype['AddNewBehavior'] = TextObject.prototype.AddNewBehavior = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_TextObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

TextObject.prototype['GetBehavior'] = TextObject.prototype.GetBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_TextObject_GetBehavior_1(self, arg0), Behavior);
};;

TextObject.prototype['RemoveBehavior'] = TextObject.prototype.RemoveBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextObject_RemoveBehavior_1(self, arg0);
};;

TextObject.prototype['RenameBehavior'] = TextObject.prototype.RenameBehavior = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_TextObject_RenameBehavior_2(self, arg0, arg1));
};;

TextObject.prototype['SerializeTo'] = TextObject.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TextObject_SerializeTo_1(self, arg0);
};;

TextObject.prototype['UnserializeFrom'] = TextObject.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_TextObject_UnserializeFrom_2(self, arg0, arg1);
};;

  TextObject.prototype['__destroy__'] = TextObject.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_TextObject___destroy___0(self);
};
// ExternalEvents
function ExternalEvents() {
  this.ptr = _emscripten_bind_ExternalEvents_ExternalEvents_0();
  getCache(ExternalEvents)[this.ptr] = this;
};;
ExternalEvents.prototype = Object.create(WrapperObject.prototype);
ExternalEvents.prototype.constructor = ExternalEvents;
ExternalEvents.prototype.__class__ = ExternalEvents;
ExternalEvents.__cache__ = {};
Module['ExternalEvents'] = ExternalEvents;

ExternalEvents.prototype['SetName'] = ExternalEvents.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ExternalEvents_SetName_1(self, arg0);
};;

ExternalEvents.prototype['GetName'] = ExternalEvents.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExternalEvents_GetName_0(self));
};;

ExternalEvents.prototype['GetAssociatedLayout'] = ExternalEvents.prototype.GetAssociatedLayout = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExternalEvents_GetAssociatedLayout_0(self));
};;

ExternalEvents.prototype['SetAssociatedLayout'] = ExternalEvents.prototype.SetAssociatedLayout = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ExternalEvents_SetAssociatedLayout_1(self, arg0);
};;

ExternalEvents.prototype['GetEvents'] = ExternalEvents.prototype.GetEvents = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExternalEvents_GetEvents_0(self), EventsList);
};;

ExternalEvents.prototype['SerializeTo'] = ExternalEvents.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ExternalEvents_SerializeTo_1(self, arg0);
};;

ExternalEvents.prototype['UnserializeFrom'] = ExternalEvents.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_ExternalEvents_UnserializeFrom_2(self, arg0, arg1);
};;

  ExternalEvents.prototype['__destroy__'] = ExternalEvents.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ExternalEvents___destroy___0(self);
};
// MapStringString
function MapStringString() { throw "cannot construct a MapStringString, no constructor in IDL" }
MapStringString.prototype = Object.create(WrapperObject.prototype);
MapStringString.prototype.constructor = MapStringString;
MapStringString.prototype.__class__ = MapStringString;
MapStringString.__cache__ = {};
Module['MapStringString'] = MapStringString;

MapStringString.prototype['MAP_get'] = MapStringString.prototype.MAP_get = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return Pointer_stringify(_emscripten_bind_MapStringString_MAP_get_1(self, arg0));
};;

MapStringString.prototype['MAP_set'] = MapStringString.prototype.MAP_set = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_MapStringString_MAP_set_2(self, arg0, arg1);
};;

MapStringString.prototype['MAP_has'] = MapStringString.prototype.MAP_has = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_MapStringString_MAP_has_1(self, arg0));
};;

MapStringString.prototype['MAP_keys'] = MapStringString.prototype.MAP_keys = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_MapStringString_MAP_keys_0(self), VectorString);
};;

  MapStringString.prototype['__destroy__'] = MapStringString.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_MapStringString___destroy___0(self);
};
// AdMobObject
function AdMobObject(arg0) {
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_AdMobObject_AdMobObject_1(arg0);
  getCache(AdMobObject)[this.ptr] = this;
};;
AdMobObject.prototype = Object.create(WrapperObject.prototype);
AdMobObject.prototype.constructor = AdMobObject;
AdMobObject.prototype.__class__ = AdMobObject;
AdMobObject.__cache__ = {};
Module['AdMobObject'] = AdMobObject;

AdMobObject.prototype['SetName'] = AdMobObject.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AdMobObject_SetName_1(self, arg0);
};;

AdMobObject.prototype['GetName'] = AdMobObject.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_AdMobObject_GetName_0(self));
};;

AdMobObject.prototype['SetType'] = AdMobObject.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AdMobObject_SetType_1(self, arg0);
};;

AdMobObject.prototype['GetType'] = AdMobObject.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_AdMobObject_GetType_0(self));
};;

AdMobObject.prototype['GetProperties'] = AdMobObject.prototype.GetProperties = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_AdMobObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

AdMobObject.prototype['UpdateProperty'] = AdMobObject.prototype.UpdateProperty = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_AdMobObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

AdMobObject.prototype['GetInitialInstanceProperties'] = AdMobObject.prototype.GetInitialInstanceProperties = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_AdMobObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

AdMobObject.prototype['UpdateInitialInstanceProperty'] = AdMobObject.prototype.UpdateInitialInstanceProperty = function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_AdMobObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

AdMobObject.prototype['GetVariables'] = AdMobObject.prototype.GetVariables = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_AdMobObject_GetVariables_0(self), VariablesContainer);
};;

AdMobObject.prototype['GetAllBehaviorNames'] = AdMobObject.prototype.GetAllBehaviorNames = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_AdMobObject_GetAllBehaviorNames_0(self), VectorString);
};;

AdMobObject.prototype['HasBehaviorNamed'] = AdMobObject.prototype.HasBehaviorNamed = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_AdMobObject_HasBehaviorNamed_1(self, arg0));
};;

AdMobObject.prototype['AddNewBehavior'] = AdMobObject.prototype.AddNewBehavior = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_AdMobObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

AdMobObject.prototype['GetBehavior'] = AdMobObject.prototype.GetBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_AdMobObject_GetBehavior_1(self, arg0), Behavior);
};;

AdMobObject.prototype['RemoveBehavior'] = AdMobObject.prototype.RemoveBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AdMobObject_RemoveBehavior_1(self, arg0);
};;

AdMobObject.prototype['RenameBehavior'] = AdMobObject.prototype.RenameBehavior = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_AdMobObject_RenameBehavior_2(self, arg0, arg1));
};;

AdMobObject.prototype['SerializeTo'] = AdMobObject.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AdMobObject_SerializeTo_1(self, arg0);
};;

AdMobObject.prototype['UnserializeFrom'] = AdMobObject.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_AdMobObject_UnserializeFrom_2(self, arg0, arg1);
};;

  AdMobObject.prototype['__destroy__'] = AdMobObject.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_AdMobObject___destroy___0(self);
};
// ExternalLayout
function ExternalLayout() {
  this.ptr = _emscripten_bind_ExternalLayout_ExternalLayout_0();
  getCache(ExternalLayout)[this.ptr] = this;
};;
ExternalLayout.prototype = Object.create(WrapperObject.prototype);
ExternalLayout.prototype.constructor = ExternalLayout;
ExternalLayout.prototype.__class__ = ExternalLayout;
ExternalLayout.__cache__ = {};
Module['ExternalLayout'] = ExternalLayout;

ExternalLayout.prototype['SetName'] = ExternalLayout.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ExternalLayout_SetName_1(self, arg0);
};;

ExternalLayout.prototype['GetName'] = ExternalLayout.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExternalLayout_GetName_0(self));
};;

ExternalLayout.prototype['SetAssociatedLayout'] = ExternalLayout.prototype.SetAssociatedLayout = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ExternalLayout_SetAssociatedLayout_1(self, arg0);
};;

ExternalLayout.prototype['GetAssociatedLayout'] = ExternalLayout.prototype.GetAssociatedLayout = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExternalLayout_GetAssociatedLayout_0(self));
};;

ExternalLayout.prototype['GetInitialInstances'] = ExternalLayout.prototype.GetInitialInstances = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExternalLayout_GetInitialInstances_0(self), InitialInstancesContainer);
};;

ExternalLayout.prototype['GetAssociatedSettings'] = ExternalLayout.prototype.GetAssociatedSettings = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExternalLayout_GetAssociatedSettings_0(self), LayoutEditorCanvasOptions);
};;

ExternalLayout.prototype['SerializeTo'] = ExternalLayout.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ExternalLayout_SerializeTo_1(self, arg0);
};;

ExternalLayout.prototype['UnserializeFrom'] = ExternalLayout.prototype.UnserializeFrom = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ExternalLayout_UnserializeFrom_1(self, arg0);
};;

  ExternalLayout.prototype['__destroy__'] = ExternalLayout.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ExternalLayout___destroy___0(self);
};
// WhileEvent
function WhileEvent() {
  this.ptr = _emscripten_bind_WhileEvent_WhileEvent_0();
  getCache(WhileEvent)[this.ptr] = this;
};;
WhileEvent.prototype = Object.create(WrapperObject.prototype);
WhileEvent.prototype.constructor = WhileEvent;
WhileEvent.prototype.__class__ = WhileEvent;
WhileEvent.__cache__ = {};
Module['WhileEvent'] = WhileEvent;

WhileEvent.prototype['GetConditions'] = WhileEvent.prototype.GetConditions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WhileEvent_GetConditions_0(self), InstructionsList);
};;

WhileEvent.prototype['GetWhileConditions'] = WhileEvent.prototype.GetWhileConditions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WhileEvent_GetWhileConditions_0(self), InstructionsList);
};;

WhileEvent.prototype['GetActions'] = WhileEvent.prototype.GetActions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WhileEvent_GetActions_0(self), InstructionsList);
};;

WhileEvent.prototype['Clone'] = WhileEvent.prototype.Clone = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WhileEvent_Clone_0(self), WhileEvent);
};;

WhileEvent.prototype['GetType'] = WhileEvent.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_WhileEvent_GetType_0(self));
};;

WhileEvent.prototype['SetType'] = WhileEvent.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_WhileEvent_SetType_1(self, arg0);
};;

WhileEvent.prototype['IsExecutable'] = WhileEvent.prototype.IsExecutable = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WhileEvent_IsExecutable_0(self));
};;

WhileEvent.prototype['CanHaveSubEvents'] = WhileEvent.prototype.CanHaveSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WhileEvent_CanHaveSubEvents_0(self));
};;

WhileEvent.prototype['HasSubEvents'] = WhileEvent.prototype.HasSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WhileEvent_HasSubEvents_0(self));
};;

WhileEvent.prototype['GetSubEvents'] = WhileEvent.prototype.GetSubEvents = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WhileEvent_GetSubEvents_0(self), EventsList);
};;

WhileEvent.prototype['IsDisabled'] = WhileEvent.prototype.IsDisabled = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WhileEvent_IsDisabled_0(self));
};;

WhileEvent.prototype['SetDisabled'] = WhileEvent.prototype.SetDisabled = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_WhileEvent_SetDisabled_1(self, arg0);
};;

WhileEvent.prototype['IsFolded'] = WhileEvent.prototype.IsFolded = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WhileEvent_IsFolded_0(self));
};;

WhileEvent.prototype['SetFolded'] = WhileEvent.prototype.SetFolded = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_WhileEvent_SetFolded_1(self, arg0);
};;

WhileEvent.prototype['SerializeTo'] = WhileEvent.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_WhileEvent_SerializeTo_1(self, arg0);
};;

WhileEvent.prototype['UnserializeFrom'] = WhileEvent.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_WhileEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  WhileEvent.prototype['__destroy__'] = WhileEvent.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WhileEvent___destroy___0(self);
};
// Platform
function Platform() { throw "cannot construct a Platform, no constructor in IDL" }
Platform.prototype = Object.create(WrapperObject.prototype);
Platform.prototype.constructor = Platform;
Platform.prototype.__class__ = Platform;
Platform.__cache__ = {};
Module['Platform'] = Platform;

Platform.prototype['GetName'] = Platform.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Platform_GetName_0(self));
};;

Platform.prototype['GetFullName'] = Platform.prototype.GetFullName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Platform_GetFullName_0(self));
};;

Platform.prototype['GetSubtitle'] = Platform.prototype.GetSubtitle = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Platform_GetSubtitle_0(self));
};;

Platform.prototype['GetDescription'] = Platform.prototype.GetDescription = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Platform_GetDescription_0(self));
};;

Platform.prototype['IsExtensionLoaded'] = Platform.prototype.IsExtensionLoaded = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Platform_IsExtensionLoaded_1(self, arg0));
};;

Platform.prototype['GetAllPlatformExtensions'] = Platform.prototype.GetAllPlatformExtensions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Platform_GetAllPlatformExtensions_0(self), VectorPlatformExtension);
};;

  Platform.prototype['__destroy__'] = Platform.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Platform___destroy___0(self);
};
// VoidPtr
function VoidPtr() { throw "cannot construct a VoidPtr, no constructor in IDL" }
VoidPtr.prototype = Object.create(WrapperObject.prototype);
VoidPtr.prototype.constructor = VoidPtr;
VoidPtr.prototype.__class__ = VoidPtr;
VoidPtr.__cache__ = {};
Module['VoidPtr'] = VoidPtr;

  VoidPtr.prototype['__destroy__'] = VoidPtr.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_VoidPtr___destroy___0(self);
};
// SpriteObject
function SpriteObject(arg0) {
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_SpriteObject_SpriteObject_1(arg0);
  getCache(SpriteObject)[this.ptr] = this;
};;
SpriteObject.prototype = Object.create(WrapperObject.prototype);
SpriteObject.prototype.constructor = SpriteObject;
SpriteObject.prototype.__class__ = SpriteObject;
SpriteObject.__cache__ = {};
Module['SpriteObject'] = SpriteObject;

SpriteObject.prototype['AddAnimation'] = SpriteObject.prototype.AddAnimation = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SpriteObject_AddAnimation_1(self, arg0);
};;

SpriteObject.prototype['GetAnimation'] = SpriteObject.prototype.GetAnimation = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_SpriteObject_GetAnimation_1(self, arg0), Animation);
};;

SpriteObject.prototype['GetAnimationsCount'] = SpriteObject.prototype.GetAnimationsCount = function() {
  var self = this.ptr;
  return _emscripten_bind_SpriteObject_GetAnimationsCount_0(self);
};;

SpriteObject.prototype['RemoveAnimation'] = SpriteObject.prototype.RemoveAnimation = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SpriteObject_RemoveAnimation_1(self, arg0);
};;

SpriteObject.prototype['RemoveAllAnimations'] = SpriteObject.prototype.RemoveAllAnimations = function() {
  var self = this.ptr;
  _emscripten_bind_SpriteObject_RemoveAllAnimations_0(self);
};;

SpriteObject.prototype['HasNoAnimations'] = SpriteObject.prototype.HasNoAnimations = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_SpriteObject_HasNoAnimations_0(self));
};;

SpriteObject.prototype['SwapAnimations'] = SpriteObject.prototype.SwapAnimations = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_SpriteObject_SwapAnimations_2(self, arg0, arg1);
};;

SpriteObject.prototype['MoveAnimation'] = SpriteObject.prototype.MoveAnimation = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_SpriteObject_MoveAnimation_2(self, arg0, arg1);
};;

SpriteObject.prototype['SetName'] = SpriteObject.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_SpriteObject_SetName_1(self, arg0);
};;

SpriteObject.prototype['GetName'] = SpriteObject.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_SpriteObject_GetName_0(self));
};;

SpriteObject.prototype['SetType'] = SpriteObject.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_SpriteObject_SetType_1(self, arg0);
};;

SpriteObject.prototype['GetType'] = SpriteObject.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_SpriteObject_GetType_0(self));
};;

SpriteObject.prototype['GetProperties'] = SpriteObject.prototype.GetProperties = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_SpriteObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

SpriteObject.prototype['UpdateProperty'] = SpriteObject.prototype.UpdateProperty = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_SpriteObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

SpriteObject.prototype['GetInitialInstanceProperties'] = SpriteObject.prototype.GetInitialInstanceProperties = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_SpriteObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

SpriteObject.prototype['UpdateInitialInstanceProperty'] = SpriteObject.prototype.UpdateInitialInstanceProperty = function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_SpriteObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

SpriteObject.prototype['GetVariables'] = SpriteObject.prototype.GetVariables = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_SpriteObject_GetVariables_0(self), VariablesContainer);
};;

SpriteObject.prototype['GetAllBehaviorNames'] = SpriteObject.prototype.GetAllBehaviorNames = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_SpriteObject_GetAllBehaviorNames_0(self), VectorString);
};;

SpriteObject.prototype['HasBehaviorNamed'] = SpriteObject.prototype.HasBehaviorNamed = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_SpriteObject_HasBehaviorNamed_1(self, arg0));
};;

SpriteObject.prototype['AddNewBehavior'] = SpriteObject.prototype.AddNewBehavior = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_SpriteObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

SpriteObject.prototype['GetBehavior'] = SpriteObject.prototype.GetBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_SpriteObject_GetBehavior_1(self, arg0), Behavior);
};;

SpriteObject.prototype['RemoveBehavior'] = SpriteObject.prototype.RemoveBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_SpriteObject_RemoveBehavior_1(self, arg0);
};;

SpriteObject.prototype['RenameBehavior'] = SpriteObject.prototype.RenameBehavior = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_SpriteObject_RenameBehavior_2(self, arg0, arg1));
};;

SpriteObject.prototype['SerializeTo'] = SpriteObject.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SpriteObject_SerializeTo_1(self, arg0);
};;

SpriteObject.prototype['UnserializeFrom'] = SpriteObject.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_SpriteObject_UnserializeFrom_2(self, arg0, arg1);
};;

  SpriteObject.prototype['__destroy__'] = SpriteObject.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_SpriteObject___destroy___0(self);
};
// HighestZOrderFinder
function HighestZOrderFinder() {
  this.ptr = _emscripten_bind_HighestZOrderFinder_HighestZOrderFinder_0();
  getCache(HighestZOrderFinder)[this.ptr] = this;
};;
HighestZOrderFinder.prototype = Object.create(WrapperObject.prototype);
HighestZOrderFinder.prototype.constructor = HighestZOrderFinder;
HighestZOrderFinder.prototype.__class__ = HighestZOrderFinder;
HighestZOrderFinder.__cache__ = {};
Module['HighestZOrderFinder'] = HighestZOrderFinder;

HighestZOrderFinder.prototype['RestrictSearchToLayer'] = HighestZOrderFinder.prototype.RestrictSearchToLayer = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_HighestZOrderFinder_RestrictSearchToLayer_1(self, arg0);
};;

HighestZOrderFinder.prototype['GetHighestZOrder'] = HighestZOrderFinder.prototype.GetHighestZOrder = function() {
  var self = this.ptr;
  return _emscripten_bind_HighestZOrderFinder_GetHighestZOrder_0(self);
};;

HighestZOrderFinder.prototype['GetLowestZOrder'] = HighestZOrderFinder.prototype.GetLowestZOrder = function() {
  var self = this.ptr;
  return _emscripten_bind_HighestZOrderFinder_GetLowestZOrder_0(self);
};;

  HighestZOrderFinder.prototype['__destroy__'] = HighestZOrderFinder.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_HighestZOrderFinder___destroy___0(self);
};
// WholeProjectRefactorer
function WholeProjectRefactorer() { throw "cannot construct a WholeProjectRefactorer, no constructor in IDL" }
WholeProjectRefactorer.prototype = Object.create(WrapperObject.prototype);
WholeProjectRefactorer.prototype.constructor = WholeProjectRefactorer;
WholeProjectRefactorer.prototype.__class__ = WholeProjectRefactorer;
WholeProjectRefactorer.__cache__ = {};
Module['WholeProjectRefactorer'] = WholeProjectRefactorer;

WholeProjectRefactorer.prototype['STATIC_ObjectRenamedInLayout'] = WholeProjectRefactorer.prototype.STATIC_ObjectRenamedInLayout = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  _emscripten_bind_WholeProjectRefactorer_STATIC_ObjectRenamedInLayout_4(self, arg0, arg1, arg2, arg3);
};;

WholeProjectRefactorer.prototype['STATIC_ObjectRemovedInLayout'] = WholeProjectRefactorer.prototype.STATIC_ObjectRemovedInLayout = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  _emscripten_bind_WholeProjectRefactorer_STATIC_ObjectRemovedInLayout_4(self, arg0, arg1, arg2, arg3);
};;

WholeProjectRefactorer.prototype['STATIC_GlobalObjectRenamed'] = WholeProjectRefactorer.prototype.STATIC_GlobalObjectRenamed = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  _emscripten_bind_WholeProjectRefactorer_STATIC_GlobalObjectRenamed_3(self, arg0, arg1, arg2);
};;

WholeProjectRefactorer.prototype['STATIC_GlobalObjectRemoved'] = WholeProjectRefactorer.prototype.STATIC_GlobalObjectRemoved = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_WholeProjectRefactorer_STATIC_GlobalObjectRemoved_3(self, arg0, arg1, arg2);
};;

  WholeProjectRefactorer.prototype['__destroy__'] = WholeProjectRefactorer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WholeProjectRefactorer___destroy___0(self);
};
// SerializerElement
function SerializerElement() {
  this.ptr = _emscripten_bind_SerializerElement_SerializerElement_0();
  getCache(SerializerElement)[this.ptr] = this;
};;
SerializerElement.prototype = Object.create(WrapperObject.prototype);
SerializerElement.prototype.constructor = SerializerElement;
SerializerElement.prototype.__class__ = SerializerElement;
SerializerElement.__cache__ = {};
Module['SerializerElement'] = SerializerElement;

SerializerElement.prototype['GetValue'] = SerializerElement.prototype.GetValue = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_SerializerElement_GetValue_0(self), SerializerValue);
};;

SerializerElement.prototype['WRAPPED_SetBool'] = SerializerElement.prototype.WRAPPED_SetBool = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SerializerElement_WRAPPED_SetBool_1(self, arg0);
};;

SerializerElement.prototype['WRAPPED_SetString'] = SerializerElement.prototype.WRAPPED_SetString = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_SerializerElement_WRAPPED_SetString_1(self, arg0);
};;

SerializerElement.prototype['WRAPPED_SetInt'] = SerializerElement.prototype.WRAPPED_SetInt = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SerializerElement_WRAPPED_SetInt_1(self, arg0);
};;

SerializerElement.prototype['WRAPPED_SetDouble'] = SerializerElement.prototype.WRAPPED_SetDouble = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SerializerElement_WRAPPED_SetDouble_1(self, arg0);
};;

SerializerElement.prototype['AddChild'] = SerializerElement.prototype.AddChild = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_SerializerElement_AddChild_1(self, arg0), SerializerElement);
};;

SerializerElement.prototype['GetChild'] = SerializerElement.prototype.GetChild = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_SerializerElement_GetChild_1(self, arg0), SerializerElement);
};;

SerializerElement.prototype['WRAPPED_SetChild'] = SerializerElement.prototype.WRAPPED_SetChild = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_SerializerElement_WRAPPED_SetChild_2(self, arg0, arg1);
};;

SerializerElement.prototype['HasChild'] = SerializerElement.prototype.HasChild = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_SerializerElement_HasChild_1(self, arg0));
};;

  SerializerElement.prototype['__destroy__'] = SerializerElement.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_SerializerElement___destroy___0(self);
};
// ExpressionMetadata
function ExpressionMetadata() { throw "cannot construct a ExpressionMetadata, no constructor in IDL" }
ExpressionMetadata.prototype = Object.create(WrapperObject.prototype);
ExpressionMetadata.prototype.constructor = ExpressionMetadata;
ExpressionMetadata.prototype.__class__ = ExpressionMetadata;
ExpressionMetadata.__cache__ = {};
Module['ExpressionMetadata'] = ExpressionMetadata;

ExpressionMetadata.prototype['GetFullName'] = ExpressionMetadata.prototype.GetFullName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExpressionMetadata_GetFullName_0(self));
};;

ExpressionMetadata.prototype['GetDescription'] = ExpressionMetadata.prototype.GetDescription = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExpressionMetadata_GetDescription_0(self));
};;

ExpressionMetadata.prototype['GetGroup'] = ExpressionMetadata.prototype.GetGroup = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExpressionMetadata_GetGroup_0(self));
};;

ExpressionMetadata.prototype['GetSmallIconFilename'] = ExpressionMetadata.prototype.GetSmallIconFilename = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExpressionMetadata_GetSmallIconFilename_0(self));
};;

ExpressionMetadata.prototype['IsShown'] = ExpressionMetadata.prototype.IsShown = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ExpressionMetadata_IsShown_0(self));
};;

ExpressionMetadata.prototype['GetParameter'] = ExpressionMetadata.prototype.GetParameter = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ExpressionMetadata_GetParameter_1(self, arg0), ParameterMetadata);
};;

ExpressionMetadata.prototype['GetParametersCount'] = ExpressionMetadata.prototype.GetParametersCount = function() {
  var self = this.ptr;
  return _emscripten_bind_ExpressionMetadata_GetParametersCount_0(self);
};;

  ExpressionMetadata.prototype['__destroy__'] = ExpressionMetadata.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ExpressionMetadata___destroy___0(self);
};
// InitialInstanceFunctor
function InitialInstanceFunctor() { throw "cannot construct a InitialInstanceFunctor, no constructor in IDL" }
InitialInstanceFunctor.prototype = Object.create(WrapperObject.prototype);
InitialInstanceFunctor.prototype.constructor = InitialInstanceFunctor;
InitialInstanceFunctor.prototype.__class__ = InitialInstanceFunctor;
InitialInstanceFunctor.__cache__ = {};
Module['InitialInstanceFunctor'] = InitialInstanceFunctor;

  InitialInstanceFunctor.prototype['__destroy__'] = InitialInstanceFunctor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstanceFunctor___destroy___0(self);
};
// InstructionsList
function InstructionsList() {
  this.ptr = _emscripten_bind_InstructionsList_InstructionsList_0();
  getCache(InstructionsList)[this.ptr] = this;
};;
InstructionsList.prototype = Object.create(WrapperObject.prototype);
InstructionsList.prototype.constructor = InstructionsList;
InstructionsList.prototype.__class__ = InstructionsList;
InstructionsList.__cache__ = {};
Module['InstructionsList'] = InstructionsList;

InstructionsList.prototype['Insert'] = InstructionsList.prototype.Insert = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_InstructionsList_Insert_2(self, arg0, arg1), Instruction);
};;

InstructionsList.prototype['InsertInstructions'] = InstructionsList.prototype.InsertInstructions = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  _emscripten_bind_InstructionsList_InsertInstructions_4(self, arg0, arg1, arg2, arg3);
};;

InstructionsList.prototype['size'] = InstructionsList.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_InstructionsList_size_0(self);
};;

InstructionsList.prototype['WRAPPED_set'] = InstructionsList.prototype.WRAPPED_set = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_InstructionsList_WRAPPED_set_2(self, arg0, arg1);
};;

InstructionsList.prototype['Contains'] = InstructionsList.prototype.Contains = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return !!(_emscripten_bind_InstructionsList_Contains_1(self, arg0));
};;

InstructionsList.prototype['Get'] = InstructionsList.prototype.Get = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_InstructionsList_Get_1(self, arg0), Instruction);
};;

InstructionsList.prototype['Remove'] = InstructionsList.prototype.Remove = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InstructionsList_Remove_1(self, arg0);
};;

InstructionsList.prototype['RemoveAt'] = InstructionsList.prototype.RemoveAt = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InstructionsList_RemoveAt_1(self, arg0);
};;

InstructionsList.prototype['Clear'] = InstructionsList.prototype.Clear = function() {
  var self = this.ptr;
  _emscripten_bind_InstructionsList_Clear_0(self);
};;

InstructionsList.prototype['SerializeTo'] = InstructionsList.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InstructionsList_SerializeTo_1(self, arg0);
};;

InstructionsList.prototype['UnserializeFrom'] = InstructionsList.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_InstructionsList_UnserializeFrom_2(self, arg0, arg1);
};;

  InstructionsList.prototype['__destroy__'] = InstructionsList.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_InstructionsList___destroy___0(self);
};
// CommentEvent
function CommentEvent() {
  this.ptr = _emscripten_bind_CommentEvent_CommentEvent_0();
  getCache(CommentEvent)[this.ptr] = this;
};;
CommentEvent.prototype = Object.create(WrapperObject.prototype);
CommentEvent.prototype.constructor = CommentEvent;
CommentEvent.prototype.__class__ = CommentEvent;
CommentEvent.__cache__ = {};
Module['CommentEvent'] = CommentEvent;

CommentEvent.prototype['WRAPPED_GetComment'] = CommentEvent.prototype.WRAPPED_GetComment = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_CommentEvent_WRAPPED_GetComment_0(self));
};;

CommentEvent.prototype['WRAPPED_SetComment'] = CommentEvent.prototype.WRAPPED_SetComment = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_CommentEvent_WRAPPED_SetComment_1(self, arg0);
};;

CommentEvent.prototype['Clone'] = CommentEvent.prototype.Clone = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_CommentEvent_Clone_0(self), CommentEvent);
};;

CommentEvent.prototype['GetType'] = CommentEvent.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_CommentEvent_GetType_0(self));
};;

CommentEvent.prototype['SetType'] = CommentEvent.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_CommentEvent_SetType_1(self, arg0);
};;

CommentEvent.prototype['IsExecutable'] = CommentEvent.prototype.IsExecutable = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_CommentEvent_IsExecutable_0(self));
};;

CommentEvent.prototype['CanHaveSubEvents'] = CommentEvent.prototype.CanHaveSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_CommentEvent_CanHaveSubEvents_0(self));
};;

CommentEvent.prototype['HasSubEvents'] = CommentEvent.prototype.HasSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_CommentEvent_HasSubEvents_0(self));
};;

CommentEvent.prototype['GetSubEvents'] = CommentEvent.prototype.GetSubEvents = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_CommentEvent_GetSubEvents_0(self), EventsList);
};;

CommentEvent.prototype['IsDisabled'] = CommentEvent.prototype.IsDisabled = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_CommentEvent_IsDisabled_0(self));
};;

CommentEvent.prototype['SetDisabled'] = CommentEvent.prototype.SetDisabled = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_CommentEvent_SetDisabled_1(self, arg0);
};;

CommentEvent.prototype['IsFolded'] = CommentEvent.prototype.IsFolded = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_CommentEvent_IsFolded_0(self));
};;

CommentEvent.prototype['SetFolded'] = CommentEvent.prototype.SetFolded = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_CommentEvent_SetFolded_1(self, arg0);
};;

CommentEvent.prototype['SerializeTo'] = CommentEvent.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_CommentEvent_SerializeTo_1(self, arg0);
};;

CommentEvent.prototype['UnserializeFrom'] = CommentEvent.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_CommentEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  CommentEvent.prototype['__destroy__'] = CommentEvent.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_CommentEvent___destroy___0(self);
};
// MapStringInstructionMetadata
function MapStringInstructionMetadata() { throw "cannot construct a MapStringInstructionMetadata, no constructor in IDL" }
MapStringInstructionMetadata.prototype = Object.create(WrapperObject.prototype);
MapStringInstructionMetadata.prototype.constructor = MapStringInstructionMetadata;
MapStringInstructionMetadata.prototype.__class__ = MapStringInstructionMetadata;
MapStringInstructionMetadata.__cache__ = {};
Module['MapStringInstructionMetadata'] = MapStringInstructionMetadata;

MapStringInstructionMetadata.prototype['MAP_get'] = MapStringInstructionMetadata.prototype.MAP_get = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_MapStringInstructionMetadata_MAP_get_1(self, arg0), InstructionMetadata);
};;

MapStringInstructionMetadata.prototype['MAP_set'] = MapStringInstructionMetadata.prototype.MAP_set = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_MapStringInstructionMetadata_MAP_set_2(self, arg0, arg1);
};;

MapStringInstructionMetadata.prototype['MAP_has'] = MapStringInstructionMetadata.prototype.MAP_has = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_MapStringInstructionMetadata_MAP_has_1(self, arg0));
};;

MapStringInstructionMetadata.prototype['MAP_keys'] = MapStringInstructionMetadata.prototype.MAP_keys = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_MapStringInstructionMetadata_MAP_keys_0(self), VectorString);
};;

  MapStringInstructionMetadata.prototype['__destroy__'] = MapStringInstructionMetadata.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_MapStringInstructionMetadata___destroy___0(self);
};
// InstructionMetadata
function InstructionMetadata() { throw "cannot construct a InstructionMetadata, no constructor in IDL" }
InstructionMetadata.prototype = Object.create(WrapperObject.prototype);
InstructionMetadata.prototype.constructor = InstructionMetadata;
InstructionMetadata.prototype.__class__ = InstructionMetadata;
InstructionMetadata.__cache__ = {};
Module['InstructionMetadata'] = InstructionMetadata;

InstructionMetadata.prototype['GetFullName'] = InstructionMetadata.prototype.GetFullName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionMetadata_GetFullName_0(self));
};;

InstructionMetadata.prototype['GetDescription'] = InstructionMetadata.prototype.GetDescription = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionMetadata_GetDescription_0(self));
};;

InstructionMetadata.prototype['GetSentence'] = InstructionMetadata.prototype.GetSentence = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionMetadata_GetSentence_0(self));
};;

InstructionMetadata.prototype['GetGroup'] = InstructionMetadata.prototype.GetGroup = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionMetadata_GetGroup_0(self));
};;

InstructionMetadata.prototype['GetIconFilename'] = InstructionMetadata.prototype.GetIconFilename = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionMetadata_GetIconFilename_0(self));
};;

InstructionMetadata.prototype['GetSmallIconFilename'] = InstructionMetadata.prototype.GetSmallIconFilename = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionMetadata_GetSmallIconFilename_0(self));
};;

InstructionMetadata.prototype['CanHaveSubInstructions'] = InstructionMetadata.prototype.CanHaveSubInstructions = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_InstructionMetadata_CanHaveSubInstructions_0(self));
};;

InstructionMetadata.prototype['SetCanHaveSubInstructions'] = InstructionMetadata.prototype.SetCanHaveSubInstructions = function() {
  var self = this.ptr;
  _emscripten_bind_InstructionMetadata_SetCanHaveSubInstructions_0(self);
};;

InstructionMetadata.prototype['GetParameter'] = InstructionMetadata.prototype.GetParameter = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_InstructionMetadata_GetParameter_1(self, arg0), ParameterMetadata);
};;

InstructionMetadata.prototype['GetParametersCount'] = InstructionMetadata.prototype.GetParametersCount = function() {
  var self = this.ptr;
  return _emscripten_bind_InstructionMetadata_GetParametersCount_0(self);
};;

InstructionMetadata.prototype['GetUsageComplexity'] = InstructionMetadata.prototype.GetUsageComplexity = function() {
  var self = this.ptr;
  return _emscripten_bind_InstructionMetadata_GetUsageComplexity_0(self);
};;

InstructionMetadata.prototype['IsHidden'] = InstructionMetadata.prototype.IsHidden = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_InstructionMetadata_IsHidden_0(self));
};;

  InstructionMetadata.prototype['__destroy__'] = InstructionMetadata.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_InstructionMetadata___destroy___0(self);
};
// VectorPairStringTextFormatting
function VectorPairStringTextFormatting() { throw "cannot construct a VectorPairStringTextFormatting, no constructor in IDL" }
VectorPairStringTextFormatting.prototype = Object.create(WrapperObject.prototype);
VectorPairStringTextFormatting.prototype.constructor = VectorPairStringTextFormatting;
VectorPairStringTextFormatting.prototype.__class__ = VectorPairStringTextFormatting;
VectorPairStringTextFormatting.__cache__ = {};
Module['VectorPairStringTextFormatting'] = VectorPairStringTextFormatting;

VectorPairStringTextFormatting.prototype['size'] = VectorPairStringTextFormatting.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_VectorPairStringTextFormatting_size_0(self);
};;

VectorPairStringTextFormatting.prototype['WRAPPED_GetString'] = VectorPairStringTextFormatting.prototype.WRAPPED_GetString = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_VectorPairStringTextFormatting_WRAPPED_GetString_1(self, arg0));
};;

VectorPairStringTextFormatting.prototype['WRAPPED_GetTextFormatting'] = VectorPairStringTextFormatting.prototype.WRAPPED_GetTextFormatting = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VectorPairStringTextFormatting_WRAPPED_GetTextFormatting_1(self, arg0), TextFormatting);
};;

  VectorPairStringTextFormatting.prototype['__destroy__'] = VectorPairStringTextFormatting.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_VectorPairStringTextFormatting___destroy___0(self);
};
// SetString
function SetString() {
  this.ptr = _emscripten_bind_SetString_SetString_0();
  getCache(SetString)[this.ptr] = this;
};;
SetString.prototype = Object.create(WrapperObject.prototype);
SetString.prototype.constructor = SetString;
SetString.prototype.__class__ = SetString;
SetString.__cache__ = {};
Module['SetString'] = SetString;

  SetString.prototype['__destroy__'] = SetString.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_SetString___destroy___0(self);
};
// Behavior
function Behavior() {
  this.ptr = _emscripten_bind_Behavior_Behavior_0();
  getCache(Behavior)[this.ptr] = this;
};;
Behavior.prototype = Object.create(WrapperObject.prototype);
Behavior.prototype.constructor = Behavior;
Behavior.prototype.__class__ = Behavior;
Behavior.__cache__ = {};
Module['Behavior'] = Behavior;

Behavior.prototype['Clone'] = Behavior.prototype.Clone = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Behavior_Clone_0(self), Behavior);
};;

Behavior.prototype['SetName'] = Behavior.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Behavior_SetName_1(self, arg0);
};;

Behavior.prototype['GetName'] = Behavior.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Behavior_GetName_0(self));
};;

Behavior.prototype['GetTypeName'] = Behavior.prototype.GetTypeName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Behavior_GetTypeName_0(self));
};;

Behavior.prototype['UpdateProperty'] = Behavior.prototype.UpdateProperty = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_Behavior_UpdateProperty_3(self, arg0, arg1, arg2));
};;

Behavior.prototype['GetProperties'] = Behavior.prototype.GetProperties = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Behavior_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

  Behavior.prototype['__destroy__'] = Behavior.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Behavior___destroy___0(self);
};
// ArbitraryEventsWorker
function ArbitraryEventsWorker() { throw "cannot construct a ArbitraryEventsWorker, no constructor in IDL" }
ArbitraryEventsWorker.prototype = Object.create(WrapperObject.prototype);
ArbitraryEventsWorker.prototype.constructor = ArbitraryEventsWorker;
ArbitraryEventsWorker.prototype.__class__ = ArbitraryEventsWorker;
ArbitraryEventsWorker.__cache__ = {};
Module['ArbitraryEventsWorker'] = ArbitraryEventsWorker;

ArbitraryEventsWorker.prototype['Launch'] = ArbitraryEventsWorker.prototype.Launch = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ArbitraryEventsWorker_Launch_1(self, arg0);
};;

  ArbitraryEventsWorker.prototype['__destroy__'] = ArbitraryEventsWorker.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ArbitraryEventsWorker___destroy___0(self);
};
// VectorString
function VectorString() {
  this.ptr = _emscripten_bind_VectorString_VectorString_0();
  getCache(VectorString)[this.ptr] = this;
};;
VectorString.prototype = Object.create(WrapperObject.prototype);
VectorString.prototype.constructor = VectorString;
VectorString.prototype.__class__ = VectorString;
VectorString.__cache__ = {};
Module['VectorString'] = VectorString;

VectorString.prototype['push_back'] = VectorString.prototype.push_back = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_VectorString_push_back_1(self, arg0);
};;

VectorString.prototype['resize'] = VectorString.prototype.resize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VectorString_resize_1(self, arg0);
};;

VectorString.prototype['size'] = VectorString.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_VectorString_size_0(self);
};;

VectorString.prototype['at'] = VectorString.prototype.at = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_VectorString_at_1(self, arg0));
};;

VectorString.prototype['WRAPPED_set'] = VectorString.prototype.WRAPPED_set = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_VectorString_WRAPPED_set_2(self, arg0, arg1);
};;

VectorString.prototype['clear'] = VectorString.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_VectorString_clear_0(self);
};;

  VectorString.prototype['__destroy__'] = VectorString.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_VectorString___destroy___0(self);
};
// Point
function Point(arg0) {
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_Point_Point_1(arg0);
  getCache(Point)[this.ptr] = this;
};;
Point.prototype = Object.create(WrapperObject.prototype);
Point.prototype.constructor = Point;
Point.prototype.__class__ = Point;
Point.__cache__ = {};
Module['Point'] = Point;

Point.prototype['SetName'] = Point.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Point_SetName_1(self, arg0);
};;

Point.prototype['GetName'] = Point.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Point_GetName_0(self));
};;

Point.prototype['SetXY'] = Point.prototype.SetXY = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Point_SetXY_2(self, arg0, arg1);
};;

Point.prototype['GetX'] = Point.prototype.GetX = function() {
  var self = this.ptr;
  return _emscripten_bind_Point_GetX_0(self);
};;

Point.prototype['SetX'] = Point.prototype.SetX = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Point_SetX_1(self, arg0);
};;

Point.prototype['GetY'] = Point.prototype.GetY = function() {
  var self = this.ptr;
  return _emscripten_bind_Point_GetY_0(self);
};;

Point.prototype['SetY'] = Point.prototype.SetY = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Point_SetY_1(self, arg0);
};;

  Point.prototype['__destroy__'] = Point.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Point___destroy___0(self);
};
// TiledSpriteObject
function TiledSpriteObject(arg0) {
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_TiledSpriteObject_TiledSpriteObject_1(arg0);
  getCache(TiledSpriteObject)[this.ptr] = this;
};;
TiledSpriteObject.prototype = Object.create(WrapperObject.prototype);
TiledSpriteObject.prototype.constructor = TiledSpriteObject;
TiledSpriteObject.prototype.__class__ = TiledSpriteObject;
TiledSpriteObject.__cache__ = {};
Module['TiledSpriteObject'] = TiledSpriteObject;

TiledSpriteObject.prototype['SetTexture'] = TiledSpriteObject.prototype.SetTexture = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TiledSpriteObject_SetTexture_1(self, arg0);
};;

TiledSpriteObject.prototype['GetTexture'] = TiledSpriteObject.prototype.GetTexture = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TiledSpriteObject_GetTexture_0(self));
};;

TiledSpriteObject.prototype['SetWidth'] = TiledSpriteObject.prototype.SetWidth = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TiledSpriteObject_SetWidth_1(self, arg0);
};;

TiledSpriteObject.prototype['GetWidth'] = TiledSpriteObject.prototype.GetWidth = function() {
  var self = this.ptr;
  return _emscripten_bind_TiledSpriteObject_GetWidth_0(self);
};;

TiledSpriteObject.prototype['SetHeight'] = TiledSpriteObject.prototype.SetHeight = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TiledSpriteObject_SetHeight_1(self, arg0);
};;

TiledSpriteObject.prototype['GetHeight'] = TiledSpriteObject.prototype.GetHeight = function() {
  var self = this.ptr;
  return _emscripten_bind_TiledSpriteObject_GetHeight_0(self);
};;

TiledSpriteObject.prototype['SetName'] = TiledSpriteObject.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TiledSpriteObject_SetName_1(self, arg0);
};;

TiledSpriteObject.prototype['GetName'] = TiledSpriteObject.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TiledSpriteObject_GetName_0(self));
};;

TiledSpriteObject.prototype['SetType'] = TiledSpriteObject.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TiledSpriteObject_SetType_1(self, arg0);
};;

TiledSpriteObject.prototype['GetType'] = TiledSpriteObject.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TiledSpriteObject_GetType_0(self));
};;

TiledSpriteObject.prototype['GetProperties'] = TiledSpriteObject.prototype.GetProperties = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_TiledSpriteObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

TiledSpriteObject.prototype['UpdateProperty'] = TiledSpriteObject.prototype.UpdateProperty = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_TiledSpriteObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

TiledSpriteObject.prototype['GetInitialInstanceProperties'] = TiledSpriteObject.prototype.GetInitialInstanceProperties = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_TiledSpriteObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

TiledSpriteObject.prototype['UpdateInitialInstanceProperty'] = TiledSpriteObject.prototype.UpdateInitialInstanceProperty = function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_TiledSpriteObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

TiledSpriteObject.prototype['GetVariables'] = TiledSpriteObject.prototype.GetVariables = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TiledSpriteObject_GetVariables_0(self), VariablesContainer);
};;

TiledSpriteObject.prototype['GetAllBehaviorNames'] = TiledSpriteObject.prototype.GetAllBehaviorNames = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TiledSpriteObject_GetAllBehaviorNames_0(self), VectorString);
};;

TiledSpriteObject.prototype['HasBehaviorNamed'] = TiledSpriteObject.prototype.HasBehaviorNamed = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_TiledSpriteObject_HasBehaviorNamed_1(self, arg0));
};;

TiledSpriteObject.prototype['AddNewBehavior'] = TiledSpriteObject.prototype.AddNewBehavior = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_TiledSpriteObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

TiledSpriteObject.prototype['GetBehavior'] = TiledSpriteObject.prototype.GetBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_TiledSpriteObject_GetBehavior_1(self, arg0), Behavior);
};;

TiledSpriteObject.prototype['RemoveBehavior'] = TiledSpriteObject.prototype.RemoveBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TiledSpriteObject_RemoveBehavior_1(self, arg0);
};;

TiledSpriteObject.prototype['RenameBehavior'] = TiledSpriteObject.prototype.RenameBehavior = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_TiledSpriteObject_RenameBehavior_2(self, arg0, arg1));
};;

TiledSpriteObject.prototype['SerializeTo'] = TiledSpriteObject.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TiledSpriteObject_SerializeTo_1(self, arg0);
};;

TiledSpriteObject.prototype['UnserializeFrom'] = TiledSpriteObject.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_TiledSpriteObject_UnserializeFrom_2(self, arg0, arg1);
};;

  TiledSpriteObject.prototype['__destroy__'] = TiledSpriteObject.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_TiledSpriteObject___destroy___0(self);
};
// RepeatEvent
function RepeatEvent() {
  this.ptr = _emscripten_bind_RepeatEvent_RepeatEvent_0();
  getCache(RepeatEvent)[this.ptr] = this;
};;
RepeatEvent.prototype = Object.create(WrapperObject.prototype);
RepeatEvent.prototype.constructor = RepeatEvent;
RepeatEvent.prototype.__class__ = RepeatEvent;
RepeatEvent.__cache__ = {};
Module['RepeatEvent'] = RepeatEvent;

RepeatEvent.prototype['GetConditions'] = RepeatEvent.prototype.GetConditions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_RepeatEvent_GetConditions_0(self), InstructionsList);
};;

RepeatEvent.prototype['GetActions'] = RepeatEvent.prototype.GetActions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_RepeatEvent_GetActions_0(self), InstructionsList);
};;

RepeatEvent.prototype['SetRepeatExpression'] = RepeatEvent.prototype.SetRepeatExpression = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_RepeatEvent_SetRepeatExpression_1(self, arg0);
};;

RepeatEvent.prototype['GetRepeatExpression'] = RepeatEvent.prototype.GetRepeatExpression = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_RepeatEvent_GetRepeatExpression_0(self));
};;

RepeatEvent.prototype['Clone'] = RepeatEvent.prototype.Clone = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_RepeatEvent_Clone_0(self), RepeatEvent);
};;

RepeatEvent.prototype['GetType'] = RepeatEvent.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_RepeatEvent_GetType_0(self));
};;

RepeatEvent.prototype['SetType'] = RepeatEvent.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_RepeatEvent_SetType_1(self, arg0);
};;

RepeatEvent.prototype['IsExecutable'] = RepeatEvent.prototype.IsExecutable = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_RepeatEvent_IsExecutable_0(self));
};;

RepeatEvent.prototype['CanHaveSubEvents'] = RepeatEvent.prototype.CanHaveSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_RepeatEvent_CanHaveSubEvents_0(self));
};;

RepeatEvent.prototype['HasSubEvents'] = RepeatEvent.prototype.HasSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_RepeatEvent_HasSubEvents_0(self));
};;

RepeatEvent.prototype['GetSubEvents'] = RepeatEvent.prototype.GetSubEvents = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_RepeatEvent_GetSubEvents_0(self), EventsList);
};;

RepeatEvent.prototype['IsDisabled'] = RepeatEvent.prototype.IsDisabled = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_RepeatEvent_IsDisabled_0(self));
};;

RepeatEvent.prototype['SetDisabled'] = RepeatEvent.prototype.SetDisabled = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_RepeatEvent_SetDisabled_1(self, arg0);
};;

RepeatEvent.prototype['IsFolded'] = RepeatEvent.prototype.IsFolded = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_RepeatEvent_IsFolded_0(self));
};;

RepeatEvent.prototype['SetFolded'] = RepeatEvent.prototype.SetFolded = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_RepeatEvent_SetFolded_1(self, arg0);
};;

RepeatEvent.prototype['SerializeTo'] = RepeatEvent.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_RepeatEvent_SerializeTo_1(self, arg0);
};;

RepeatEvent.prototype['UnserializeFrom'] = RepeatEvent.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_RepeatEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  RepeatEvent.prototype['__destroy__'] = RepeatEvent.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_RepeatEvent___destroy___0(self);
};
// StandardEvent
function StandardEvent() {
  this.ptr = _emscripten_bind_StandardEvent_StandardEvent_0();
  getCache(StandardEvent)[this.ptr] = this;
};;
StandardEvent.prototype = Object.create(WrapperObject.prototype);
StandardEvent.prototype.constructor = StandardEvent;
StandardEvent.prototype.__class__ = StandardEvent;
StandardEvent.__cache__ = {};
Module['StandardEvent'] = StandardEvent;

StandardEvent.prototype['GetConditions'] = StandardEvent.prototype.GetConditions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_StandardEvent_GetConditions_0(self), InstructionsList);
};;

StandardEvent.prototype['GetActions'] = StandardEvent.prototype.GetActions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_StandardEvent_GetActions_0(self), InstructionsList);
};;

StandardEvent.prototype['Clone'] = StandardEvent.prototype.Clone = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_StandardEvent_Clone_0(self), StandardEvent);
};;

StandardEvent.prototype['GetType'] = StandardEvent.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_StandardEvent_GetType_0(self));
};;

StandardEvent.prototype['SetType'] = StandardEvent.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_StandardEvent_SetType_1(self, arg0);
};;

StandardEvent.prototype['IsExecutable'] = StandardEvent.prototype.IsExecutable = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_StandardEvent_IsExecutable_0(self));
};;

StandardEvent.prototype['CanHaveSubEvents'] = StandardEvent.prototype.CanHaveSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_StandardEvent_CanHaveSubEvents_0(self));
};;

StandardEvent.prototype['HasSubEvents'] = StandardEvent.prototype.HasSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_StandardEvent_HasSubEvents_0(self));
};;

StandardEvent.prototype['GetSubEvents'] = StandardEvent.prototype.GetSubEvents = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_StandardEvent_GetSubEvents_0(self), EventsList);
};;

StandardEvent.prototype['IsDisabled'] = StandardEvent.prototype.IsDisabled = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_StandardEvent_IsDisabled_0(self));
};;

StandardEvent.prototype['SetDisabled'] = StandardEvent.prototype.SetDisabled = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_StandardEvent_SetDisabled_1(self, arg0);
};;

StandardEvent.prototype['IsFolded'] = StandardEvent.prototype.IsFolded = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_StandardEvent_IsFolded_0(self));
};;

StandardEvent.prototype['SetFolded'] = StandardEvent.prototype.SetFolded = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_StandardEvent_SetFolded_1(self, arg0);
};;

StandardEvent.prototype['SerializeTo'] = StandardEvent.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_StandardEvent_SerializeTo_1(self, arg0);
};;

StandardEvent.prototype['UnserializeFrom'] = StandardEvent.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_StandardEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  StandardEvent.prototype['__destroy__'] = StandardEvent.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_StandardEvent___destroy___0(self);
};
// PanelSpriteObject
function PanelSpriteObject(arg0) {
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_PanelSpriteObject_PanelSpriteObject_1(arg0);
  getCache(PanelSpriteObject)[this.ptr] = this;
};;
PanelSpriteObject.prototype = Object.create(WrapperObject.prototype);
PanelSpriteObject.prototype.constructor = PanelSpriteObject;
PanelSpriteObject.prototype.__class__ = PanelSpriteObject;
PanelSpriteObject.__cache__ = {};
Module['PanelSpriteObject'] = PanelSpriteObject;

PanelSpriteObject.prototype['GetLeftMargin'] = PanelSpriteObject.prototype.GetLeftMargin = function() {
  var self = this.ptr;
  return _emscripten_bind_PanelSpriteObject_GetLeftMargin_0(self);
};;

PanelSpriteObject.prototype['SetLeftMargin'] = PanelSpriteObject.prototype.SetLeftMargin = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SetLeftMargin_1(self, arg0);
};;

PanelSpriteObject.prototype['GetTopMargin'] = PanelSpriteObject.prototype.GetTopMargin = function() {
  var self = this.ptr;
  return _emscripten_bind_PanelSpriteObject_GetTopMargin_0(self);
};;

PanelSpriteObject.prototype['SetTopMargin'] = PanelSpriteObject.prototype.SetTopMargin = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SetTopMargin_1(self, arg0);
};;

PanelSpriteObject.prototype['GetRightMargin'] = PanelSpriteObject.prototype.GetRightMargin = function() {
  var self = this.ptr;
  return _emscripten_bind_PanelSpriteObject_GetRightMargin_0(self);
};;

PanelSpriteObject.prototype['SetRightMargin'] = PanelSpriteObject.prototype.SetRightMargin = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SetRightMargin_1(self, arg0);
};;

PanelSpriteObject.prototype['GetBottomMargin'] = PanelSpriteObject.prototype.GetBottomMargin = function() {
  var self = this.ptr;
  return _emscripten_bind_PanelSpriteObject_GetBottomMargin_0(self);
};;

PanelSpriteObject.prototype['SetBottomMargin'] = PanelSpriteObject.prototype.SetBottomMargin = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SetBottomMargin_1(self, arg0);
};;

PanelSpriteObject.prototype['IsTiled'] = PanelSpriteObject.prototype.IsTiled = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_PanelSpriteObject_IsTiled_0(self));
};;

PanelSpriteObject.prototype['SetTiled'] = PanelSpriteObject.prototype.SetTiled = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SetTiled_1(self, arg0);
};;

PanelSpriteObject.prototype['SetTexture'] = PanelSpriteObject.prototype.SetTexture = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PanelSpriteObject_SetTexture_1(self, arg0);
};;

PanelSpriteObject.prototype['GetTexture'] = PanelSpriteObject.prototype.GetTexture = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PanelSpriteObject_GetTexture_0(self));
};;

PanelSpriteObject.prototype['SetWidth'] = PanelSpriteObject.prototype.SetWidth = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SetWidth_1(self, arg0);
};;

PanelSpriteObject.prototype['GetWidth'] = PanelSpriteObject.prototype.GetWidth = function() {
  var self = this.ptr;
  return _emscripten_bind_PanelSpriteObject_GetWidth_0(self);
};;

PanelSpriteObject.prototype['SetHeight'] = PanelSpriteObject.prototype.SetHeight = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SetHeight_1(self, arg0);
};;

PanelSpriteObject.prototype['GetHeight'] = PanelSpriteObject.prototype.GetHeight = function() {
  var self = this.ptr;
  return _emscripten_bind_PanelSpriteObject_GetHeight_0(self);
};;

PanelSpriteObject.prototype['SetName'] = PanelSpriteObject.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PanelSpriteObject_SetName_1(self, arg0);
};;

PanelSpriteObject.prototype['GetName'] = PanelSpriteObject.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PanelSpriteObject_GetName_0(self));
};;

PanelSpriteObject.prototype['SetType'] = PanelSpriteObject.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PanelSpriteObject_SetType_1(self, arg0);
};;

PanelSpriteObject.prototype['GetType'] = PanelSpriteObject.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PanelSpriteObject_GetType_0(self));
};;

PanelSpriteObject.prototype['GetProperties'] = PanelSpriteObject.prototype.GetProperties = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_PanelSpriteObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

PanelSpriteObject.prototype['UpdateProperty'] = PanelSpriteObject.prototype.UpdateProperty = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_PanelSpriteObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

PanelSpriteObject.prototype['GetInitialInstanceProperties'] = PanelSpriteObject.prototype.GetInitialInstanceProperties = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_PanelSpriteObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

PanelSpriteObject.prototype['UpdateInitialInstanceProperty'] = PanelSpriteObject.prototype.UpdateInitialInstanceProperty = function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_PanelSpriteObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

PanelSpriteObject.prototype['GetVariables'] = PanelSpriteObject.prototype.GetVariables = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PanelSpriteObject_GetVariables_0(self), VariablesContainer);
};;

PanelSpriteObject.prototype['GetAllBehaviorNames'] = PanelSpriteObject.prototype.GetAllBehaviorNames = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PanelSpriteObject_GetAllBehaviorNames_0(self), VectorString);
};;

PanelSpriteObject.prototype['HasBehaviorNamed'] = PanelSpriteObject.prototype.HasBehaviorNamed = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_PanelSpriteObject_HasBehaviorNamed_1(self, arg0));
};;

PanelSpriteObject.prototype['AddNewBehavior'] = PanelSpriteObject.prototype.AddNewBehavior = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_PanelSpriteObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

PanelSpriteObject.prototype['GetBehavior'] = PanelSpriteObject.prototype.GetBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PanelSpriteObject_GetBehavior_1(self, arg0), Behavior);
};;

PanelSpriteObject.prototype['RemoveBehavior'] = PanelSpriteObject.prototype.RemoveBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PanelSpriteObject_RemoveBehavior_1(self, arg0);
};;

PanelSpriteObject.prototype['RenameBehavior'] = PanelSpriteObject.prototype.RenameBehavior = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_PanelSpriteObject_RenameBehavior_2(self, arg0, arg1));
};;

PanelSpriteObject.prototype['SerializeTo'] = PanelSpriteObject.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SerializeTo_1(self, arg0);
};;

PanelSpriteObject.prototype['UnserializeFrom'] = PanelSpriteObject.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_PanelSpriteObject_UnserializeFrom_2(self, arg0, arg1);
};;

  PanelSpriteObject.prototype['__destroy__'] = PanelSpriteObject.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_PanelSpriteObject___destroy___0(self);
};
// ShapePainterObject
function ShapePainterObject(arg0) {
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_ShapePainterObject_ShapePainterObject_1(arg0);
  getCache(ShapePainterObject)[this.ptr] = this;
};;
ShapePainterObject.prototype = Object.create(WrapperObject.prototype);
ShapePainterObject.prototype.constructor = ShapePainterObject;
ShapePainterObject.prototype.__class__ = ShapePainterObject;
ShapePainterObject.__cache__ = {};
Module['ShapePainterObject'] = ShapePainterObject;

ShapePainterObject.prototype['SetCoordinatesAbsolute'] = ShapePainterObject.prototype.SetCoordinatesAbsolute = function() {
  var self = this.ptr;
  _emscripten_bind_ShapePainterObject_SetCoordinatesAbsolute_0(self);
};;

ShapePainterObject.prototype['SetCoordinatesRelative'] = ShapePainterObject.prototype.SetCoordinatesRelative = function() {
  var self = this.ptr;
  _emscripten_bind_ShapePainterObject_SetCoordinatesRelative_0(self);
};;

ShapePainterObject.prototype['AreCoordinatesAbsolute'] = ShapePainterObject.prototype.AreCoordinatesAbsolute = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ShapePainterObject_AreCoordinatesAbsolute_0(self));
};;

ShapePainterObject.prototype['SetOutlineSize'] = ShapePainterObject.prototype.SetOutlineSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ShapePainterObject_SetOutlineSize_1(self, arg0);
};;

ShapePainterObject.prototype['GetOutlineSize'] = ShapePainterObject.prototype.GetOutlineSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetOutlineSize_0(self);
};;

ShapePainterObject.prototype['SetOutlineOpacity'] = ShapePainterObject.prototype.SetOutlineOpacity = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ShapePainterObject_SetOutlineOpacity_1(self, arg0);
};;

ShapePainterObject.prototype['GetOutlineOpacity'] = ShapePainterObject.prototype.GetOutlineOpacity = function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetOutlineOpacity_0(self);
};;

ShapePainterObject.prototype['SetOutlineColor'] = ShapePainterObject.prototype.SetOutlineColor = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_ShapePainterObject_SetOutlineColor_3(self, arg0, arg1, arg2);
};;

ShapePainterObject.prototype['GetOutlineColorR'] = ShapePainterObject.prototype.GetOutlineColorR = function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetOutlineColorR_0(self);
};;

ShapePainterObject.prototype['GetOutlineColorG'] = ShapePainterObject.prototype.GetOutlineColorG = function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetOutlineColorG_0(self);
};;

ShapePainterObject.prototype['GetOutlineColorB'] = ShapePainterObject.prototype.GetOutlineColorB = function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetOutlineColorB_0(self);
};;

ShapePainterObject.prototype['SetFillOpacity'] = ShapePainterObject.prototype.SetFillOpacity = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ShapePainterObject_SetFillOpacity_1(self, arg0);
};;

ShapePainterObject.prototype['GetFillOpacity'] = ShapePainterObject.prototype.GetFillOpacity = function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetFillOpacity_0(self);
};;

ShapePainterObject.prototype['SetFillColor'] = ShapePainterObject.prototype.SetFillColor = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_ShapePainterObject_SetFillColor_3(self, arg0, arg1, arg2);
};;

ShapePainterObject.prototype['GetFillColorR'] = ShapePainterObject.prototype.GetFillColorR = function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetFillColorR_0(self);
};;

ShapePainterObject.prototype['GetFillColorG'] = ShapePainterObject.prototype.GetFillColorG = function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetFillColorG_0(self);
};;

ShapePainterObject.prototype['GetFillColorB'] = ShapePainterObject.prototype.GetFillColorB = function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetFillColorB_0(self);
};;

ShapePainterObject.prototype['SetName'] = ShapePainterObject.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ShapePainterObject_SetName_1(self, arg0);
};;

ShapePainterObject.prototype['GetName'] = ShapePainterObject.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ShapePainterObject_GetName_0(self));
};;

ShapePainterObject.prototype['SetType'] = ShapePainterObject.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ShapePainterObject_SetType_1(self, arg0);
};;

ShapePainterObject.prototype['GetType'] = ShapePainterObject.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ShapePainterObject_GetType_0(self));
};;

ShapePainterObject.prototype['GetProperties'] = ShapePainterObject.prototype.GetProperties = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ShapePainterObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

ShapePainterObject.prototype['UpdateProperty'] = ShapePainterObject.prototype.UpdateProperty = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_ShapePainterObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

ShapePainterObject.prototype['GetInitialInstanceProperties'] = ShapePainterObject.prototype.GetInitialInstanceProperties = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_ShapePainterObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

ShapePainterObject.prototype['UpdateInitialInstanceProperty'] = ShapePainterObject.prototype.UpdateInitialInstanceProperty = function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_ShapePainterObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

ShapePainterObject.prototype['GetVariables'] = ShapePainterObject.prototype.GetVariables = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ShapePainterObject_GetVariables_0(self), VariablesContainer);
};;

ShapePainterObject.prototype['GetAllBehaviorNames'] = ShapePainterObject.prototype.GetAllBehaviorNames = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ShapePainterObject_GetAllBehaviorNames_0(self), VectorString);
};;

ShapePainterObject.prototype['HasBehaviorNamed'] = ShapePainterObject.prototype.HasBehaviorNamed = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ShapePainterObject_HasBehaviorNamed_1(self, arg0));
};;

ShapePainterObject.prototype['AddNewBehavior'] = ShapePainterObject.prototype.AddNewBehavior = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_ShapePainterObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

ShapePainterObject.prototype['GetBehavior'] = ShapePainterObject.prototype.GetBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ShapePainterObject_GetBehavior_1(self, arg0), Behavior);
};;

ShapePainterObject.prototype['RemoveBehavior'] = ShapePainterObject.prototype.RemoveBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ShapePainterObject_RemoveBehavior_1(self, arg0);
};;

ShapePainterObject.prototype['RenameBehavior'] = ShapePainterObject.prototype.RenameBehavior = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_ShapePainterObject_RenameBehavior_2(self, arg0, arg1));
};;

ShapePainterObject.prototype['SerializeTo'] = ShapePainterObject.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ShapePainterObject_SerializeTo_1(self, arg0);
};;

ShapePainterObject.prototype['UnserializeFrom'] = ShapePainterObject.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_ShapePainterObject_UnserializeFrom_2(self, arg0, arg1);
};;

  ShapePainterObject.prototype['__destroy__'] = ShapePainterObject.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ShapePainterObject___destroy___0(self);
};
// ProjectHelper
function ProjectHelper() { throw "cannot construct a ProjectHelper, no constructor in IDL" }
ProjectHelper.prototype = Object.create(WrapperObject.prototype);
ProjectHelper.prototype.constructor = ProjectHelper;
ProjectHelper.prototype.__class__ = ProjectHelper;
ProjectHelper.__cache__ = {};
Module['ProjectHelper'] = ProjectHelper;

ProjectHelper.prototype['STATIC_CreateNewGDJSProject'] = ProjectHelper.prototype.STATIC_CreateNewGDJSProject = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ProjectHelper_STATIC_CreateNewGDJSProject_0(self), Project);
};;

ProjectHelper.prototype['STATIC_InitializePlatforms'] = ProjectHelper.prototype.STATIC_InitializePlatforms = function() {
  var self = this.ptr;
  _emscripten_bind_ProjectHelper_STATIC_InitializePlatforms_0(self);
};;

  ProjectHelper.prototype['__destroy__'] = ProjectHelper.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ProjectHelper___destroy___0(self);
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

Layout.prototype['SetName'] = Layout.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Layout_SetName_1(self, arg0);
};;

Layout.prototype['GetName'] = Layout.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Layout_GetName_0(self));
};;

Layout.prototype['SetBackgroundColor'] = Layout.prototype.SetBackgroundColor = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_Layout_SetBackgroundColor_3(self, arg0, arg1, arg2);
};;

Layout.prototype['GetBackgroundColorRed'] = Layout.prototype.GetBackgroundColorRed = function() {
  var self = this.ptr;
  return _emscripten_bind_Layout_GetBackgroundColorRed_0(self);
};;

Layout.prototype['GetBackgroundColorGreen'] = Layout.prototype.GetBackgroundColorGreen = function() {
  var self = this.ptr;
  return _emscripten_bind_Layout_GetBackgroundColorGreen_0(self);
};;

Layout.prototype['GetBackgroundColorBlue'] = Layout.prototype.GetBackgroundColorBlue = function() {
  var self = this.ptr;
  return _emscripten_bind_Layout_GetBackgroundColorBlue_0(self);
};;

Layout.prototype['SetWindowDefaultTitle'] = Layout.prototype.SetWindowDefaultTitle = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Layout_SetWindowDefaultTitle_1(self, arg0);
};;

Layout.prototype['GetWindowDefaultTitle'] = Layout.prototype.GetWindowDefaultTitle = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Layout_GetWindowDefaultTitle_0(self));
};;

Layout.prototype['GetInitialInstances'] = Layout.prototype.GetInitialInstances = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetInitialInstances_0(self), InitialInstancesContainer);
};;

Layout.prototype['GetVariables'] = Layout.prototype.GetVariables = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetVariables_0(self), VariablesContainer);
};;

Layout.prototype['GetEvents'] = Layout.prototype.GetEvents = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetEvents_0(self), EventsList);
};;

Layout.prototype['InsertNewLayer'] = Layout.prototype.InsertNewLayer = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Layout_InsertNewLayer_2(self, arg0, arg1);
};;

Layout.prototype['InsertLayer'] = Layout.prototype.InsertLayer = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Layout_InsertLayer_2(self, arg0, arg1);
};;

Layout.prototype['GetLayer'] = Layout.prototype.GetLayer = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Layout_GetLayer_1(self, arg0), Layer);
};;

Layout.prototype['GetLayerAt'] = Layout.prototype.GetLayerAt = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetLayerAt_1(self, arg0), Layer);
};;

Layout.prototype['HasLayerNamed'] = Layout.prototype.HasLayerNamed = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Layout_HasLayerNamed_1(self, arg0));
};;

Layout.prototype['RemoveLayer'] = Layout.prototype.RemoveLayer = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Layout_RemoveLayer_1(self, arg0);
};;

Layout.prototype['GetLayersCount'] = Layout.prototype.GetLayersCount = function() {
  var self = this.ptr;
  return _emscripten_bind_Layout_GetLayersCount_0(self);
};;

Layout.prototype['SwapLayers'] = Layout.prototype.SwapLayers = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Layout_SwapLayers_2(self, arg0, arg1);
};;

Layout.prototype['MoveLayer'] = Layout.prototype.MoveLayer = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Layout_MoveLayer_2(self, arg0, arg1);
};;

Layout.prototype['SerializeLayersTo'] = Layout.prototype.SerializeLayersTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Layout_SerializeLayersTo_1(self, arg0);
};;

Layout.prototype['UnserializeLayersFrom'] = Layout.prototype.UnserializeLayersFrom = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Layout_UnserializeLayersFrom_1(self, arg0);
};;

Layout.prototype['GetObjectGroups'] = Layout.prototype.GetObjectGroups = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetObjectGroups_0(self), VectorObjectGroup);
};;

Layout.prototype['GetAssociatedSettings'] = Layout.prototype.GetAssociatedSettings = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetAssociatedSettings_0(self), LayoutEditorCanvasOptions);
};;

Layout.prototype['SerializeTo'] = Layout.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Layout_SerializeTo_1(self, arg0);
};;

Layout.prototype['UnserializeFrom'] = Layout.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Layout_UnserializeFrom_2(self, arg0, arg1);
};;

Layout.prototype['InsertNewObject'] = Layout.prototype.InsertNewObject = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return wrapPointer(_emscripten_bind_Layout_InsertNewObject_4(self, arg0, arg1, arg2, arg3), gdObject);
};;

Layout.prototype['InsertObject'] = Layout.prototype.InsertObject = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_Layout_InsertObject_2(self, arg0, arg1), gdObject);
};;

Layout.prototype['HasObjectNamed'] = Layout.prototype.HasObjectNamed = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Layout_HasObjectNamed_1(self, arg0));
};;

Layout.prototype['GetObject'] = Layout.prototype.GetObject = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Layout_GetObject_1(self, arg0), gdObject);
};;

Layout.prototype['GetObjectAt'] = Layout.prototype.GetObjectAt = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetObjectAt_1(self, arg0), gdObject);
};;

Layout.prototype['GetObjectPosition'] = Layout.prototype.GetObjectPosition = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Layout_GetObjectPosition_1(self, arg0);
};;

Layout.prototype['RemoveObject'] = Layout.prototype.RemoveObject = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Layout_RemoveObject_1(self, arg0);
};;

Layout.prototype['SwapObjects'] = Layout.prototype.SwapObjects = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Layout_SwapObjects_2(self, arg0, arg1);
};;

Layout.prototype['MoveObject'] = Layout.prototype.MoveObject = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Layout_MoveObject_2(self, arg0, arg1);
};;

Layout.prototype['GetObjectsCount'] = Layout.prototype.GetObjectsCount = function() {
  var self = this.ptr;
  return _emscripten_bind_Layout_GetObjectsCount_0(self);
};;

  Layout.prototype['__destroy__'] = Layout.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Layout___destroy___0(self);
};
// AudioResource
function AudioResource() {
  this.ptr = _emscripten_bind_AudioResource_AudioResource_0();
  getCache(AudioResource)[this.ptr] = this;
};;
AudioResource.prototype = Object.create(WrapperObject.prototype);
AudioResource.prototype.constructor = AudioResource;
AudioResource.prototype.__class__ = AudioResource;
AudioResource.__cache__ = {};
Module['AudioResource'] = AudioResource;

AudioResource.prototype['Clone'] = AudioResource.prototype.Clone = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_AudioResource_Clone_0(self), Resource);
};;

AudioResource.prototype['SetName'] = AudioResource.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AudioResource_SetName_1(self, arg0);
};;

AudioResource.prototype['GetName'] = AudioResource.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_AudioResource_GetName_0(self));
};;

AudioResource.prototype['SetKind'] = AudioResource.prototype.SetKind = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AudioResource_SetKind_1(self, arg0);
};;

AudioResource.prototype['GetKind'] = AudioResource.prototype.GetKind = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_AudioResource_GetKind_0(self));
};;

AudioResource.prototype['IsUserAdded'] = AudioResource.prototype.IsUserAdded = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_AudioResource_IsUserAdded_0(self));
};;

AudioResource.prototype['SetUserAdded'] = AudioResource.prototype.SetUserAdded = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AudioResource_SetUserAdded_1(self, arg0);
};;

AudioResource.prototype['UseFile'] = AudioResource.prototype.UseFile = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_AudioResource_UseFile_0(self));
};;

AudioResource.prototype['SetFile'] = AudioResource.prototype.SetFile = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AudioResource_SetFile_1(self, arg0);
};;

AudioResource.prototype['GetFile'] = AudioResource.prototype.GetFile = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_AudioResource_GetFile_0(self));
};;

AudioResource.prototype['GetAbsoluteFile'] = AudioResource.prototype.GetAbsoluteFile = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_AudioResource_GetAbsoluteFile_1(self, arg0));
};;

AudioResource.prototype['SerializeTo'] = AudioResource.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AudioResource_SerializeTo_1(self, arg0);
};;

AudioResource.prototype['UnserializeFrom'] = AudioResource.prototype.UnserializeFrom = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AudioResource_UnserializeFrom_1(self, arg0);
};;

  AudioResource.prototype['__destroy__'] = AudioResource.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_AudioResource___destroy___0(self);
};
// Exporter
function Exporter(arg0, arg1) {
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  this.ptr = _emscripten_bind_Exporter_Exporter_2(arg0, arg1);
  getCache(Exporter)[this.ptr] = this;
};;
Exporter.prototype = Object.create(WrapperObject.prototype);
Exporter.prototype.constructor = Exporter;
Exporter.prototype.__class__ = Exporter;
Exporter.__cache__ = {};
Module['Exporter'] = Exporter;

Exporter.prototype['SetCodeOutputDirectory'] = Exporter.prototype.SetCodeOutputDirectory = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Exporter_SetCodeOutputDirectory_1(self, arg0);
};;

Exporter.prototype['ExportLayoutForPixiPreview'] = Exporter.prototype.ExportLayoutForPixiPreview = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_Exporter_ExportLayoutForPixiPreview_3(self, arg0, arg1, arg2));
};;

Exporter.prototype['ExportExternalLayoutForPixiPreview'] = Exporter.prototype.ExportExternalLayoutForPixiPreview = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  return !!(_emscripten_bind_Exporter_ExportExternalLayoutForPixiPreview_4(self, arg0, arg1, arg2, arg3));
};;

Exporter.prototype['ExportWholePixiProject'] = Exporter.prototype.ExportWholePixiProject = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return !!(_emscripten_bind_Exporter_ExportWholePixiProject_4(self, arg0, arg1, arg2, arg3));
};;

Exporter.prototype['GetLastError'] = Exporter.prototype.GetLastError = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Exporter_GetLastError_0(self));
};;

  Exporter.prototype['__destroy__'] = Exporter.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Exporter___destroy___0(self);
};
// BaseEvent
function BaseEvent() {
  this.ptr = _emscripten_bind_BaseEvent_BaseEvent_0();
  getCache(BaseEvent)[this.ptr] = this;
};;
BaseEvent.prototype = Object.create(WrapperObject.prototype);
BaseEvent.prototype.constructor = BaseEvent;
BaseEvent.prototype.__class__ = BaseEvent;
BaseEvent.__cache__ = {};
Module['BaseEvent'] = BaseEvent;

BaseEvent.prototype['Clone'] = BaseEvent.prototype.Clone = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BaseEvent_Clone_0(self), BaseEvent);
};;

BaseEvent.prototype['GetType'] = BaseEvent.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BaseEvent_GetType_0(self));
};;

BaseEvent.prototype['SetType'] = BaseEvent.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_BaseEvent_SetType_1(self, arg0);
};;

BaseEvent.prototype['IsExecutable'] = BaseEvent.prototype.IsExecutable = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_BaseEvent_IsExecutable_0(self));
};;

BaseEvent.prototype['CanHaveSubEvents'] = BaseEvent.prototype.CanHaveSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_BaseEvent_CanHaveSubEvents_0(self));
};;

BaseEvent.prototype['HasSubEvents'] = BaseEvent.prototype.HasSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_BaseEvent_HasSubEvents_0(self));
};;

BaseEvent.prototype['GetSubEvents'] = BaseEvent.prototype.GetSubEvents = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BaseEvent_GetSubEvents_0(self), EventsList);
};;

BaseEvent.prototype['IsDisabled'] = BaseEvent.prototype.IsDisabled = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_BaseEvent_IsDisabled_0(self));
};;

BaseEvent.prototype['SetDisabled'] = BaseEvent.prototype.SetDisabled = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_BaseEvent_SetDisabled_1(self, arg0);
};;

BaseEvent.prototype['IsFolded'] = BaseEvent.prototype.IsFolded = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_BaseEvent_IsFolded_0(self));
};;

BaseEvent.prototype['SetFolded'] = BaseEvent.prototype.SetFolded = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_BaseEvent_SetFolded_1(self, arg0);
};;

BaseEvent.prototype['SerializeTo'] = BaseEvent.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_BaseEvent_SerializeTo_1(self, arg0);
};;

BaseEvent.prototype['UnserializeFrom'] = BaseEvent.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_BaseEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  BaseEvent.prototype['__destroy__'] = BaseEvent.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BaseEvent___destroy___0(self);
};
// EventsCodeGenerator
function EventsCodeGenerator() { throw "cannot construct a EventsCodeGenerator, no constructor in IDL" }
EventsCodeGenerator.prototype = Object.create(WrapperObject.prototype);
EventsCodeGenerator.prototype.constructor = EventsCodeGenerator;
EventsCodeGenerator.prototype.__class__ = EventsCodeGenerator;
EventsCodeGenerator.__cache__ = {};
Module['EventsCodeGenerator'] = EventsCodeGenerator;

EventsCodeGenerator.prototype['STATIC_GenerateSceneEventsCompleteCode'] = EventsCodeGenerator.prototype.STATIC_GenerateSceneEventsCompleteCode = function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return Pointer_stringify(_emscripten_bind_EventsCodeGenerator_STATIC_GenerateSceneEventsCompleteCode_5(self, arg0, arg1, arg2, arg3, arg4));
};;

// Variable
function Variable() {
  this.ptr = _emscripten_bind_Variable_Variable_0();
  getCache(Variable)[this.ptr] = this;
};;
Variable.prototype = Object.create(WrapperObject.prototype);
Variable.prototype.constructor = Variable;
Variable.prototype.__class__ = Variable;
Variable.__cache__ = {};
Module['Variable'] = Variable;

Variable.prototype['SetString'] = Variable.prototype.SetString = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Variable_SetString_1(self, arg0);
};;

Variable.prototype['GetString'] = Variable.prototype.GetString = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Variable_GetString_0(self));
};;

Variable.prototype['SetValue'] = Variable.prototype.SetValue = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Variable_SetValue_1(self, arg0);
};;

Variable.prototype['GetValue'] = Variable.prototype.GetValue = function() {
  var self = this.ptr;
  return _emscripten_bind_Variable_GetValue_0(self);
};;

Variable.prototype['HasChild'] = Variable.prototype.HasChild = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Variable_HasChild_1(self, arg0));
};;

Variable.prototype['GetChild'] = Variable.prototype.GetChild = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Variable_GetChild_1(self, arg0), Variable);
};;

Variable.prototype['RemoveChild'] = Variable.prototype.RemoveChild = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Variable_RemoveChild_1(self, arg0);
};;

Variable.prototype['RenameChild'] = Variable.prototype.RenameChild = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_Variable_RenameChild_2(self, arg0, arg1));
};;

Variable.prototype['GetAllChildren'] = Variable.prototype.GetAllChildren = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Variable_GetAllChildren_0(self), MapStringVariable);
};;

Variable.prototype['IsNumber'] = Variable.prototype.IsNumber = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Variable_IsNumber_0(self));
};;

Variable.prototype['IsStructure'] = Variable.prototype.IsStructure = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Variable_IsStructure_0(self));
};;

  Variable.prototype['__destroy__'] = Variable.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Variable___destroy___0(self);
};
// PlatformExtension
function PlatformExtension() { throw "cannot construct a PlatformExtension, no constructor in IDL" }
PlatformExtension.prototype = Object.create(WrapperObject.prototype);
PlatformExtension.prototype.constructor = PlatformExtension;
PlatformExtension.prototype.__class__ = PlatformExtension;
PlatformExtension.__cache__ = {};
Module['PlatformExtension'] = PlatformExtension;

PlatformExtension.prototype['GetFullName'] = PlatformExtension.prototype.GetFullName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PlatformExtension_GetFullName_0(self));
};;

PlatformExtension.prototype['GetName'] = PlatformExtension.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PlatformExtension_GetName_0(self));
};;

PlatformExtension.prototype['GetDescription'] = PlatformExtension.prototype.GetDescription = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PlatformExtension_GetDescription_0(self));
};;

PlatformExtension.prototype['GetAuthor'] = PlatformExtension.prototype.GetAuthor = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PlatformExtension_GetAuthor_0(self));
};;

PlatformExtension.prototype['GetLicense'] = PlatformExtension.prototype.GetLicense = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PlatformExtension_GetLicense_0(self));
};;

PlatformExtension.prototype['IsBuiltin'] = PlatformExtension.prototype.IsBuiltin = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_PlatformExtension_IsBuiltin_0(self));
};;

PlatformExtension.prototype['GetNameSpace'] = PlatformExtension.prototype.GetNameSpace = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PlatformExtension_GetNameSpace_0(self));
};;

PlatformExtension.prototype['GetExtensionObjectsTypes'] = PlatformExtension.prototype.GetExtensionObjectsTypes = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_GetExtensionObjectsTypes_0(self), VectorString);
};;

PlatformExtension.prototype['GetBehaviorsTypes'] = PlatformExtension.prototype.GetBehaviorsTypes = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_GetBehaviorsTypes_0(self), VectorString);
};;

PlatformExtension.prototype['GetObjectMetadata'] = PlatformExtension.prototype.GetObjectMetadata = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetObjectMetadata_1(self, arg0), ObjectMetadata);
};;

PlatformExtension.prototype['GetBehaviorMetadata'] = PlatformExtension.prototype.GetBehaviorMetadata = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetBehaviorMetadata_1(self, arg0), BehaviorMetadata);
};;

PlatformExtension.prototype['GetAllEvents'] = PlatformExtension.prototype.GetAllEvents = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllEvents_0(self), MapStringEventMetadata);
};;

PlatformExtension.prototype['GetAllActions'] = PlatformExtension.prototype.GetAllActions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllActions_0(self), MapStringInstructionMetadata);
};;

PlatformExtension.prototype['GetAllConditions'] = PlatformExtension.prototype.GetAllConditions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllConditions_0(self), MapStringInstructionMetadata);
};;

PlatformExtension.prototype['GetAllExpressions'] = PlatformExtension.prototype.GetAllExpressions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllExpressions_0(self), MapStringExpressionMetadata);
};;

PlatformExtension.prototype['GetAllStrExpressions'] = PlatformExtension.prototype.GetAllStrExpressions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllStrExpressions_0(self), MapStringExpressionMetadata);
};;

PlatformExtension.prototype['GetAllActionsForObject'] = PlatformExtension.prototype.GetAllActionsForObject = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllActionsForObject_1(self, arg0), MapStringInstructionMetadata);
};;

PlatformExtension.prototype['GetAllConditionsForObject'] = PlatformExtension.prototype.GetAllConditionsForObject = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllConditionsForObject_1(self, arg0), MapStringInstructionMetadata);
};;

PlatformExtension.prototype['GetAllExpressionsForObject'] = PlatformExtension.prototype.GetAllExpressionsForObject = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllExpressionsForObject_1(self, arg0), MapStringExpressionMetadata);
};;

PlatformExtension.prototype['GetAllStrExpressionsForObject'] = PlatformExtension.prototype.GetAllStrExpressionsForObject = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllStrExpressionsForObject_1(self, arg0), MapStringExpressionMetadata);
};;

PlatformExtension.prototype['GetAllActionsForBehavior'] = PlatformExtension.prototype.GetAllActionsForBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllActionsForBehavior_1(self, arg0), MapStringInstructionMetadata);
};;

PlatformExtension.prototype['GetAllConditionsForBehavior'] = PlatformExtension.prototype.GetAllConditionsForBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllConditionsForBehavior_1(self, arg0), MapStringInstructionMetadata);
};;

PlatformExtension.prototype['GetAllExpressionsForBehavior'] = PlatformExtension.prototype.GetAllExpressionsForBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllExpressionsForBehavior_1(self, arg0), MapStringExpressionMetadata);
};;

PlatformExtension.prototype['GetAllStrExpressionsForBehavior'] = PlatformExtension.prototype.GetAllStrExpressionsForBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllStrExpressionsForBehavior_1(self, arg0), MapStringExpressionMetadata);
};;

  PlatformExtension.prototype['__destroy__'] = PlatformExtension.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_PlatformExtension___destroy___0(self);
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

InitialInstance.prototype['SetObjectName'] = InitialInstance.prototype.SetObjectName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstance_SetObjectName_1(self, arg0);
};;

InitialInstance.prototype['GetObjectName'] = InitialInstance.prototype.GetObjectName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InitialInstance_GetObjectName_0(self));
};;

InitialInstance.prototype['GetX'] = InitialInstance.prototype.GetX = function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetX_0(self);
};;

InitialInstance.prototype['SetX'] = InitialInstance.prototype.SetX = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetX_1(self, arg0);
};;

InitialInstance.prototype['GetY'] = InitialInstance.prototype.GetY = function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetY_0(self);
};;

InitialInstance.prototype['SetY'] = InitialInstance.prototype.SetY = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetY_1(self, arg0);
};;

InitialInstance.prototype['GetAngle'] = InitialInstance.prototype.GetAngle = function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetAngle_0(self);
};;

InitialInstance.prototype['SetAngle'] = InitialInstance.prototype.SetAngle = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetAngle_1(self, arg0);
};;

InitialInstance.prototype['IsLocked'] = InitialInstance.prototype.IsLocked = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_InitialInstance_IsLocked_0(self));
};;

InitialInstance.prototype['SetLocked'] = InitialInstance.prototype.SetLocked = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetLocked_1(self, arg0);
};;

InitialInstance.prototype['GetZOrder'] = InitialInstance.prototype.GetZOrder = function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetZOrder_0(self);
};;

InitialInstance.prototype['SetZOrder'] = InitialInstance.prototype.SetZOrder = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetZOrder_1(self, arg0);
};;

InitialInstance.prototype['GetLayer'] = InitialInstance.prototype.GetLayer = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InitialInstance_GetLayer_0(self));
};;

InitialInstance.prototype['SetLayer'] = InitialInstance.prototype.SetLayer = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstance_SetLayer_1(self, arg0);
};;

InitialInstance.prototype['SetHasCustomSize'] = InitialInstance.prototype.SetHasCustomSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetHasCustomSize_1(self, arg0);
};;

InitialInstance.prototype['HasCustomSize'] = InitialInstance.prototype.HasCustomSize = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_InitialInstance_HasCustomSize_0(self));
};;

InitialInstance.prototype['SetCustomWidth'] = InitialInstance.prototype.SetCustomWidth = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetCustomWidth_1(self, arg0);
};;

InitialInstance.prototype['GetCustomWidth'] = InitialInstance.prototype.GetCustomWidth = function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetCustomWidth_0(self);
};;

InitialInstance.prototype['SetCustomHeight'] = InitialInstance.prototype.SetCustomHeight = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetCustomHeight_1(self, arg0);
};;

InitialInstance.prototype['GetCustomHeight'] = InitialInstance.prototype.GetCustomHeight = function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetCustomHeight_0(self);
};;

InitialInstance.prototype['UpdateCustomProperty'] = InitialInstance.prototype.UpdateCustomProperty = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  _emscripten_bind_InitialInstance_UpdateCustomProperty_4(self, arg0, arg1, arg2, arg3);
};;

InitialInstance.prototype['GetCustomProperties'] = InitialInstance.prototype.GetCustomProperties = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_InitialInstance_GetCustomProperties_2(self, arg0, arg1), MapStringPropertyDescriptor);
};;

InitialInstance.prototype['GetRawFloatProperty'] = InitialInstance.prototype.GetRawFloatProperty = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_InitialInstance_GetRawFloatProperty_1(self, arg0);
};;

InitialInstance.prototype['GetRawStringProperty'] = InitialInstance.prototype.GetRawStringProperty = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return Pointer_stringify(_emscripten_bind_InitialInstance_GetRawStringProperty_1(self, arg0));
};;

InitialInstance.prototype['GetVariables'] = InitialInstance.prototype.GetVariables = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InitialInstance_GetVariables_0(self), VariablesContainer);
};;

InitialInstance.prototype['SerializeTo'] = InitialInstance.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SerializeTo_1(self, arg0);
};;

InitialInstance.prototype['UnserializeFrom'] = InitialInstance.prototype.UnserializeFrom = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_UnserializeFrom_1(self, arg0);
};;

  InitialInstance.prototype['__destroy__'] = InitialInstance.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstance___destroy___0(self);
};
// Instruction
function Instruction() {
  this.ptr = _emscripten_bind_Instruction_Instruction_0();
  getCache(Instruction)[this.ptr] = this;
};;
Instruction.prototype = Object.create(WrapperObject.prototype);
Instruction.prototype.constructor = Instruction;
Instruction.prototype.__class__ = Instruction;
Instruction.__cache__ = {};
Module['Instruction'] = Instruction;

Instruction.prototype['CLONE_Instruction'] = Instruction.prototype.CLONE_Instruction = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Instruction_CLONE_Instruction_0(self), Instruction);
};;

Instruction.prototype['SetType'] = Instruction.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Instruction_SetType_1(self, arg0);
};;

Instruction.prototype['GetType'] = Instruction.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Instruction_GetType_0(self));
};;

Instruction.prototype['SetInverted'] = Instruction.prototype.SetInverted = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Instruction_SetInverted_1(self, arg0);
};;

Instruction.prototype['IsInverted'] = Instruction.prototype.IsInverted = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Instruction_IsInverted_0(self));
};;

Instruction.prototype['SetParameter'] = Instruction.prototype.SetParameter = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_Instruction_SetParameter_2(self, arg0, arg1);
};;

Instruction.prototype['GetParameter'] = Instruction.prototype.GetParameter = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_Instruction_GetParameter_1(self, arg0));
};;

Instruction.prototype['SetParametersCount'] = Instruction.prototype.SetParametersCount = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Instruction_SetParametersCount_1(self, arg0);
};;

Instruction.prototype['GetParametersCount'] = Instruction.prototype.GetParametersCount = function() {
  var self = this.ptr;
  return _emscripten_bind_Instruction_GetParametersCount_0(self);
};;

Instruction.prototype['GetSubInstructions'] = Instruction.prototype.GetSubInstructions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Instruction_GetSubInstructions_0(self), InstructionsList);
};;

  Instruction.prototype['__destroy__'] = Instruction.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Instruction___destroy___0(self);
};
// EventsRemover
function EventsRemover() {
  this.ptr = _emscripten_bind_EventsRemover_EventsRemover_0();
  getCache(EventsRemover)[this.ptr] = this;
};;
EventsRemover.prototype = Object.create(WrapperObject.prototype);
EventsRemover.prototype.constructor = EventsRemover;
EventsRemover.prototype.__class__ = EventsRemover;
EventsRemover.__cache__ = {};
Module['EventsRemover'] = EventsRemover;

EventsRemover.prototype['AddEventToRemove'] = EventsRemover.prototype.AddEventToRemove = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsRemover_AddEventToRemove_1(self, arg0);
};;

EventsRemover.prototype['AddInstructionToRemove'] = EventsRemover.prototype.AddInstructionToRemove = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsRemover_AddInstructionToRemove_1(self, arg0);
};;

EventsRemover.prototype['Launch'] = EventsRemover.prototype.Launch = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsRemover_Launch_1(self, arg0);
};;

  EventsRemover.prototype['__destroy__'] = EventsRemover.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_EventsRemover___destroy___0(self);
};
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

InitialInstancesContainer.prototype['Clone'] = InitialInstancesContainer.prototype.Clone = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InitialInstancesContainer_Clone_0(self), InitialInstancesContainer);
};;

InitialInstancesContainer.prototype['GetInstancesCount'] = InitialInstancesContainer.prototype.GetInstancesCount = function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstancesContainer_GetInstancesCount_0(self);
};;

InitialInstancesContainer.prototype['IterateOverInstances'] = InitialInstancesContainer.prototype.IterateOverInstances = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstancesContainer_IterateOverInstances_1(self, arg0);
};;

InitialInstancesContainer.prototype['IterateOverInstancesWithZOrdering'] = InitialInstancesContainer.prototype.IterateOverInstancesWithZOrdering = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_InitialInstancesContainer_IterateOverInstancesWithZOrdering_2(self, arg0, arg1);
};;

InitialInstancesContainer.prototype['MoveInstancesToLayer'] = InitialInstancesContainer.prototype.MoveInstancesToLayer = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_InitialInstancesContainer_MoveInstancesToLayer_2(self, arg0, arg1);
};;

InitialInstancesContainer.prototype['RemoveAllInstancesOnLayer'] = InitialInstancesContainer.prototype.RemoveAllInstancesOnLayer = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstancesContainer_RemoveAllInstancesOnLayer_1(self, arg0);
};;

InitialInstancesContainer.prototype['RemoveInitialInstancesOfObject'] = InitialInstancesContainer.prototype.RemoveInitialInstancesOfObject = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstancesContainer_RemoveInitialInstancesOfObject_1(self, arg0);
};;

InitialInstancesContainer.prototype['HasInstancesOfObject'] = InitialInstancesContainer.prototype.HasInstancesOfObject = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_InitialInstancesContainer_HasInstancesOfObject_1(self, arg0));
};;

InitialInstancesContainer.prototype['SomeInstancesAreOnLayer'] = InitialInstancesContainer.prototype.SomeInstancesAreOnLayer = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_InitialInstancesContainer_SomeInstancesAreOnLayer_1(self, arg0));
};;

InitialInstancesContainer.prototype['RenameInstancesOfObject'] = InitialInstancesContainer.prototype.RenameInstancesOfObject = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_InitialInstancesContainer_RenameInstancesOfObject_2(self, arg0, arg1);
};;

InitialInstancesContainer.prototype['RemoveInstance'] = InitialInstancesContainer.prototype.RemoveInstance = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstancesContainer_RemoveInstance_1(self, arg0);
};;

InitialInstancesContainer.prototype['InsertNewInitialInstance'] = InitialInstancesContainer.prototype.InsertNewInitialInstance = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InitialInstancesContainer_InsertNewInitialInstance_0(self), InitialInstance);
};;

InitialInstancesContainer.prototype['InsertInitialInstance'] = InitialInstancesContainer.prototype.InsertInitialInstance = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_InitialInstancesContainer_InsertInitialInstance_1(self, arg0), InitialInstance);
};;

InitialInstancesContainer.prototype['SerializeTo'] = InitialInstancesContainer.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstancesContainer_SerializeTo_1(self, arg0);
};;

InitialInstancesContainer.prototype['UnserializeFrom'] = InitialInstancesContainer.prototype.UnserializeFrom = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstancesContainer_UnserializeFrom_1(self, arg0);
};;

  InitialInstancesContainer.prototype['__destroy__'] = InitialInstancesContainer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstancesContainer___destroy___0(self);
};
// ImageResource
function ImageResource() {
  this.ptr = _emscripten_bind_ImageResource_ImageResource_0();
  getCache(ImageResource)[this.ptr] = this;
};;
ImageResource.prototype = Object.create(WrapperObject.prototype);
ImageResource.prototype.constructor = ImageResource;
ImageResource.prototype.__class__ = ImageResource;
ImageResource.__cache__ = {};
Module['ImageResource'] = ImageResource;

ImageResource.prototype['IsSmooth'] = ImageResource.prototype.IsSmooth = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImageResource_IsSmooth_0(self));
};;

ImageResource.prototype['SetSmooth'] = ImageResource.prototype.SetSmooth = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImageResource_SetSmooth_1(self, arg0);
};;

ImageResource.prototype['Clone'] = ImageResource.prototype.Clone = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImageResource_Clone_0(self), Resource);
};;

ImageResource.prototype['SetName'] = ImageResource.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ImageResource_SetName_1(self, arg0);
};;

ImageResource.prototype['GetName'] = ImageResource.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ImageResource_GetName_0(self));
};;

ImageResource.prototype['SetKind'] = ImageResource.prototype.SetKind = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ImageResource_SetKind_1(self, arg0);
};;

ImageResource.prototype['GetKind'] = ImageResource.prototype.GetKind = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ImageResource_GetKind_0(self));
};;

ImageResource.prototype['IsUserAdded'] = ImageResource.prototype.IsUserAdded = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImageResource_IsUserAdded_0(self));
};;

ImageResource.prototype['SetUserAdded'] = ImageResource.prototype.SetUserAdded = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImageResource_SetUserAdded_1(self, arg0);
};;

ImageResource.prototype['UseFile'] = ImageResource.prototype.UseFile = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImageResource_UseFile_0(self));
};;

ImageResource.prototype['SetFile'] = ImageResource.prototype.SetFile = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ImageResource_SetFile_1(self, arg0);
};;

ImageResource.prototype['GetFile'] = ImageResource.prototype.GetFile = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ImageResource_GetFile_0(self));
};;

ImageResource.prototype['GetAbsoluteFile'] = ImageResource.prototype.GetAbsoluteFile = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_ImageResource_GetAbsoluteFile_1(self, arg0));
};;

ImageResource.prototype['SerializeTo'] = ImageResource.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImageResource_SerializeTo_1(self, arg0);
};;

ImageResource.prototype['UnserializeFrom'] = ImageResource.prototype.UnserializeFrom = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImageResource_UnserializeFrom_1(self, arg0);
};;

  ImageResource.prototype['__destroy__'] = ImageResource.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImageResource___destroy___0(self);
};
// SerializerValue
function SerializerValue() { throw "cannot construct a SerializerValue, no constructor in IDL" }
SerializerValue.prototype = Object.create(WrapperObject.prototype);
SerializerValue.prototype.constructor = SerializerValue;
SerializerValue.prototype.__class__ = SerializerValue;
SerializerValue.__cache__ = {};
Module['SerializerValue'] = SerializerValue;

SerializerValue.prototype['GetBool'] = SerializerValue.prototype.GetBool = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_SerializerValue_GetBool_0(self));
};;

SerializerValue.prototype['GetString'] = SerializerValue.prototype.GetString = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_SerializerValue_GetString_0(self));
};;

SerializerValue.prototype['GetInt'] = SerializerValue.prototype.GetInt = function() {
  var self = this.ptr;
  return _emscripten_bind_SerializerValue_GetInt_0(self);
};;

SerializerValue.prototype['GetDouble'] = SerializerValue.prototype.GetDouble = function() {
  var self = this.ptr;
  return _emscripten_bind_SerializerValue_GetDouble_0(self);
};;

  SerializerValue.prototype['__destroy__'] = SerializerValue.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_SerializerValue___destroy___0(self);
};
// VersionWrapper
function VersionWrapper() { throw "cannot construct a VersionWrapper, no constructor in IDL" }
VersionWrapper.prototype = Object.create(WrapperObject.prototype);
VersionWrapper.prototype.constructor = VersionWrapper;
VersionWrapper.prototype.__class__ = VersionWrapper;
VersionWrapper.__cache__ = {};
Module['VersionWrapper'] = VersionWrapper;

VersionWrapper.prototype['STATIC_Major'] = VersionWrapper.prototype.STATIC_Major = function() {
  var self = this.ptr;
  return _emscripten_bind_VersionWrapper_STATIC_Major_0(self);
};;

VersionWrapper.prototype['STATIC_Minor'] = VersionWrapper.prototype.STATIC_Minor = function() {
  var self = this.ptr;
  return _emscripten_bind_VersionWrapper_STATIC_Minor_0(self);
};;

VersionWrapper.prototype['STATIC_Build'] = VersionWrapper.prototype.STATIC_Build = function() {
  var self = this.ptr;
  return _emscripten_bind_VersionWrapper_STATIC_Build_0(self);
};;

VersionWrapper.prototype['STATIC_Revision'] = VersionWrapper.prototype.STATIC_Revision = function() {
  var self = this.ptr;
  return _emscripten_bind_VersionWrapper_STATIC_Revision_0(self);
};;

VersionWrapper.prototype['STATIC_FullString'] = VersionWrapper.prototype.STATIC_FullString = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_VersionWrapper_STATIC_FullString_0(self));
};;

VersionWrapper.prototype['STATIC_Status'] = VersionWrapper.prototype.STATIC_Status = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_VersionWrapper_STATIC_Status_0(self));
};;

VersionWrapper.prototype['STATIC_Year'] = VersionWrapper.prototype.STATIC_Year = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_VersionWrapper_STATIC_Year_0(self));
};;

VersionWrapper.prototype['STATIC_Month'] = VersionWrapper.prototype.STATIC_Month = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_VersionWrapper_STATIC_Month_0(self));
};;

VersionWrapper.prototype['STATIC_Date'] = VersionWrapper.prototype.STATIC_Date = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_VersionWrapper_STATIC_Date_0(self));
};;

  VersionWrapper.prototype['__destroy__'] = VersionWrapper.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_VersionWrapper___destroy___0(self);
};
// Serializer
function Serializer() { throw "cannot construct a Serializer, no constructor in IDL" }
Serializer.prototype = Object.create(WrapperObject.prototype);
Serializer.prototype.constructor = Serializer;
Serializer.prototype.__class__ = Serializer;
Serializer.__cache__ = {};
Module['Serializer'] = Serializer;

Serializer.prototype['STATIC_ToJSON'] = Serializer.prototype.STATIC_ToJSON = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_Serializer_STATIC_ToJSON_1(self, arg0));
};;

Serializer.prototype['STATIC_FromJSON'] = Serializer.prototype.STATIC_FromJSON = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Serializer_STATIC_FromJSON_1(self, arg0), SerializerElement);
};;

  Serializer.prototype['__destroy__'] = Serializer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Serializer___destroy___0(self);
};
// GroupEvent
function GroupEvent() {
  this.ptr = _emscripten_bind_GroupEvent_GroupEvent_0();
  getCache(GroupEvent)[this.ptr] = this;
};;
GroupEvent.prototype = Object.create(WrapperObject.prototype);
GroupEvent.prototype.constructor = GroupEvent;
GroupEvent.prototype.__class__ = GroupEvent;
GroupEvent.__cache__ = {};
Module['GroupEvent'] = GroupEvent;

GroupEvent.prototype['SetName'] = GroupEvent.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_GroupEvent_SetName_1(self, arg0);
};;

GroupEvent.prototype['GetName'] = GroupEvent.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_GroupEvent_GetName_0(self));
};;

GroupEvent.prototype['SetBackgroundColor'] = GroupEvent.prototype.SetBackgroundColor = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_GroupEvent_SetBackgroundColor_3(self, arg0, arg1, arg2);
};;

GroupEvent.prototype['GetBackgroundColorR'] = GroupEvent.prototype.GetBackgroundColorR = function() {
  var self = this.ptr;
  return _emscripten_bind_GroupEvent_GetBackgroundColorR_0(self);
};;

GroupEvent.prototype['GetBackgroundColorG'] = GroupEvent.prototype.GetBackgroundColorG = function() {
  var self = this.ptr;
  return _emscripten_bind_GroupEvent_GetBackgroundColorG_0(self);
};;

GroupEvent.prototype['GetBackgroundColorB'] = GroupEvent.prototype.GetBackgroundColorB = function() {
  var self = this.ptr;
  return _emscripten_bind_GroupEvent_GetBackgroundColorB_0(self);
};;

GroupEvent.prototype['SetSource'] = GroupEvent.prototype.SetSource = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_GroupEvent_SetSource_1(self, arg0);
};;

GroupEvent.prototype['GetSource'] = GroupEvent.prototype.GetSource = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_GroupEvent_GetSource_0(self));
};;

GroupEvent.prototype['GetCreationParameters'] = GroupEvent.prototype.GetCreationParameters = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GroupEvent_GetCreationParameters_0(self), VectorString);
};;

GroupEvent.prototype['GetCreationTimestamp'] = GroupEvent.prototype.GetCreationTimestamp = function() {
  var self = this.ptr;
  return _emscripten_bind_GroupEvent_GetCreationTimestamp_0(self);
};;

GroupEvent.prototype['SetCreationTimestamp'] = GroupEvent.prototype.SetCreationTimestamp = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GroupEvent_SetCreationTimestamp_1(self, arg0);
};;

GroupEvent.prototype['Clone'] = GroupEvent.prototype.Clone = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GroupEvent_Clone_0(self), GroupEvent);
};;

GroupEvent.prototype['GetType'] = GroupEvent.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_GroupEvent_GetType_0(self));
};;

GroupEvent.prototype['SetType'] = GroupEvent.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_GroupEvent_SetType_1(self, arg0);
};;

GroupEvent.prototype['IsExecutable'] = GroupEvent.prototype.IsExecutable = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_GroupEvent_IsExecutable_0(self));
};;

GroupEvent.prototype['CanHaveSubEvents'] = GroupEvent.prototype.CanHaveSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_GroupEvent_CanHaveSubEvents_0(self));
};;

GroupEvent.prototype['HasSubEvents'] = GroupEvent.prototype.HasSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_GroupEvent_HasSubEvents_0(self));
};;

GroupEvent.prototype['GetSubEvents'] = GroupEvent.prototype.GetSubEvents = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GroupEvent_GetSubEvents_0(self), EventsList);
};;

GroupEvent.prototype['IsDisabled'] = GroupEvent.prototype.IsDisabled = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_GroupEvent_IsDisabled_0(self));
};;

GroupEvent.prototype['SetDisabled'] = GroupEvent.prototype.SetDisabled = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GroupEvent_SetDisabled_1(self, arg0);
};;

GroupEvent.prototype['IsFolded'] = GroupEvent.prototype.IsFolded = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_GroupEvent_IsFolded_0(self));
};;

GroupEvent.prototype['SetFolded'] = GroupEvent.prototype.SetFolded = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GroupEvent_SetFolded_1(self, arg0);
};;

GroupEvent.prototype['SerializeTo'] = GroupEvent.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GroupEvent_SerializeTo_1(self, arg0);
};;

GroupEvent.prototype['UnserializeFrom'] = GroupEvent.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_GroupEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  GroupEvent.prototype['__destroy__'] = GroupEvent.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GroupEvent___destroy___0(self);
};
// MapStringPropertyDescriptor
function MapStringPropertyDescriptor() { throw "cannot construct a MapStringPropertyDescriptor, no constructor in IDL" }
MapStringPropertyDescriptor.prototype = Object.create(WrapperObject.prototype);
MapStringPropertyDescriptor.prototype.constructor = MapStringPropertyDescriptor;
MapStringPropertyDescriptor.prototype.__class__ = MapStringPropertyDescriptor;
MapStringPropertyDescriptor.__cache__ = {};
Module['MapStringPropertyDescriptor'] = MapStringPropertyDescriptor;

MapStringPropertyDescriptor.prototype['MAP_get'] = MapStringPropertyDescriptor.prototype.MAP_get = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_MapStringPropertyDescriptor_MAP_get_1(self, arg0), PropertyDescriptor);
};;

MapStringPropertyDescriptor.prototype['MAP_set'] = MapStringPropertyDescriptor.prototype.MAP_set = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_MapStringPropertyDescriptor_MAP_set_2(self, arg0, arg1);
};;

MapStringPropertyDescriptor.prototype['MAP_has'] = MapStringPropertyDescriptor.prototype.MAP_has = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_MapStringPropertyDescriptor_MAP_has_1(self, arg0));
};;

MapStringPropertyDescriptor.prototype['MAP_keys'] = MapStringPropertyDescriptor.prototype.MAP_keys = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_MapStringPropertyDescriptor_MAP_keys_0(self), VectorString);
};;

  MapStringPropertyDescriptor.prototype['__destroy__'] = MapStringPropertyDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_MapStringPropertyDescriptor___destroy___0(self);
};
// LayoutEditorCanvasOptions
function LayoutEditorCanvasOptions() {
  this.ptr = _emscripten_bind_LayoutEditorCanvasOptions_LayoutEditorCanvasOptions_0();
  getCache(LayoutEditorCanvasOptions)[this.ptr] = this;
};;
LayoutEditorCanvasOptions.prototype = Object.create(WrapperObject.prototype);
LayoutEditorCanvasOptions.prototype.constructor = LayoutEditorCanvasOptions;
LayoutEditorCanvasOptions.prototype.__class__ = LayoutEditorCanvasOptions;
LayoutEditorCanvasOptions.__cache__ = {};
Module['LayoutEditorCanvasOptions'] = LayoutEditorCanvasOptions;

LayoutEditorCanvasOptions.prototype['SerializeTo'] = LayoutEditorCanvasOptions.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_LayoutEditorCanvasOptions_SerializeTo_1(self, arg0);
};;

LayoutEditorCanvasOptions.prototype['UnserializeFrom'] = LayoutEditorCanvasOptions.prototype.UnserializeFrom = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_LayoutEditorCanvasOptions_UnserializeFrom_1(self, arg0);
};;

  LayoutEditorCanvasOptions.prototype['__destroy__'] = LayoutEditorCanvasOptions.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_LayoutEditorCanvasOptions___destroy___0(self);
};
// EventsList
function EventsList() {
  this.ptr = _emscripten_bind_EventsList_EventsList_0();
  getCache(EventsList)[this.ptr] = this;
};;
EventsList.prototype = Object.create(WrapperObject.prototype);
EventsList.prototype.constructor = EventsList;
EventsList.prototype.__class__ = EventsList;
EventsList.__cache__ = {};
Module['EventsList'] = EventsList;

EventsList.prototype['InsertEvent'] = EventsList.prototype.InsertEvent = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_EventsList_InsertEvent_2(self, arg0, arg1), BaseEvent);
};;

EventsList.prototype['InsertNewEvent'] = EventsList.prototype.InsertNewEvent = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_EventsList_InsertNewEvent_3(self, arg0, arg1, arg2), BaseEvent);
};;

EventsList.prototype['InsertEvents'] = EventsList.prototype.InsertEvents = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  _emscripten_bind_EventsList_InsertEvents_4(self, arg0, arg1, arg2, arg3);
};;

EventsList.prototype['GetEventAt'] = EventsList.prototype.GetEventAt = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_EventsList_GetEventAt_1(self, arg0), BaseEvent);
};;

EventsList.prototype['RemoveEventAt'] = EventsList.prototype.RemoveEventAt = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsList_RemoveEventAt_1(self, arg0);
};;

EventsList.prototype['RemoveEvent'] = EventsList.prototype.RemoveEvent = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsList_RemoveEvent_1(self, arg0);
};;

EventsList.prototype['GetEventsCount'] = EventsList.prototype.GetEventsCount = function() {
  var self = this.ptr;
  return _emscripten_bind_EventsList_GetEventsCount_0(self);
};;

EventsList.prototype['Contains'] = EventsList.prototype.Contains = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return !!(_emscripten_bind_EventsList_Contains_2(self, arg0, arg1));
};;

EventsList.prototype['IsEmpty'] = EventsList.prototype.IsEmpty = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_EventsList_IsEmpty_0(self));
};;

EventsList.prototype['Clear'] = EventsList.prototype.Clear = function() {
  var self = this.ptr;
  _emscripten_bind_EventsList_Clear_0(self);
};;

EventsList.prototype['SerializeTo'] = EventsList.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsList_SerializeTo_1(self, arg0);
};;

EventsList.prototype['UnserializeFrom'] = EventsList.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_EventsList_UnserializeFrom_2(self, arg0, arg1);
};;

  EventsList.prototype['__destroy__'] = EventsList.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_EventsList___destroy___0(self);
};
// ParameterMetadata
function ParameterMetadata() { throw "cannot construct a ParameterMetadata, no constructor in IDL" }
ParameterMetadata.prototype = Object.create(WrapperObject.prototype);
ParameterMetadata.prototype.constructor = ParameterMetadata;
ParameterMetadata.prototype.__class__ = ParameterMetadata;
ParameterMetadata.__cache__ = {};
Module['ParameterMetadata'] = ParameterMetadata;

ParameterMetadata.prototype['GetType'] = ParameterMetadata.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ParameterMetadata_GetType_0(self));
};;

ParameterMetadata.prototype['GetExtraInfo'] = ParameterMetadata.prototype.GetExtraInfo = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ParameterMetadata_GetExtraInfo_0(self));
};;

ParameterMetadata.prototype['IsOptional'] = ParameterMetadata.prototype.IsOptional = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ParameterMetadata_IsOptional_0(self));
};;

ParameterMetadata.prototype['GetDescription'] = ParameterMetadata.prototype.GetDescription = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ParameterMetadata_GetDescription_0(self));
};;

ParameterMetadata.prototype['IsCodeOnly'] = ParameterMetadata.prototype.IsCodeOnly = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ParameterMetadata_IsCodeOnly_0(self));
};;

ParameterMetadata.prototype['GetDefaultValue'] = ParameterMetadata.prototype.GetDefaultValue = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ParameterMetadata_GetDefaultValue_0(self));
};;

ParameterMetadata.prototype['STATIC_IsObject'] = ParameterMetadata.prototype.STATIC_IsObject = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ParameterMetadata_STATIC_IsObject_1(self, arg0));
};;

  ParameterMetadata.prototype['__destroy__'] = ParameterMetadata.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ParameterMetadata___destroy___0(self);
};
// ObjectMetadata
function ObjectMetadata() { throw "cannot construct a ObjectMetadata, no constructor in IDL" }
ObjectMetadata.prototype = Object.create(WrapperObject.prototype);
ObjectMetadata.prototype.constructor = ObjectMetadata;
ObjectMetadata.prototype.__class__ = ObjectMetadata;
ObjectMetadata.__cache__ = {};
Module['ObjectMetadata'] = ObjectMetadata;

ObjectMetadata.prototype['GetName'] = ObjectMetadata.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ObjectMetadata_GetName_0(self));
};;

ObjectMetadata.prototype['GetFullName'] = ObjectMetadata.prototype.GetFullName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ObjectMetadata_GetFullName_0(self));
};;

ObjectMetadata.prototype['GetDescription'] = ObjectMetadata.prototype.GetDescription = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ObjectMetadata_GetDescription_0(self));
};;

ObjectMetadata.prototype['GetIconFilename'] = ObjectMetadata.prototype.GetIconFilename = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ObjectMetadata_GetIconFilename_0(self));
};;

  ObjectMetadata.prototype['__destroy__'] = ObjectMetadata.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ObjectMetadata___destroy___0(self);
};
// VectorObjectGroup
function VectorObjectGroup() { throw "cannot construct a VectorObjectGroup, no constructor in IDL" }
VectorObjectGroup.prototype = Object.create(WrapperObject.prototype);
VectorObjectGroup.prototype.constructor = VectorObjectGroup;
VectorObjectGroup.prototype.__class__ = VectorObjectGroup;
VectorObjectGroup.__cache__ = {};
Module['VectorObjectGroup'] = VectorObjectGroup;

VectorObjectGroup.prototype['push_back'] = VectorObjectGroup.prototype.push_back = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VectorObjectGroup_push_back_1(self, arg0);
};;

VectorObjectGroup.prototype['size'] = VectorObjectGroup.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_VectorObjectGroup_size_0(self);
};;

VectorObjectGroup.prototype['at'] = VectorObjectGroup.prototype.at = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VectorObjectGroup_at_1(self, arg0), ObjectGroup);
};;

VectorObjectGroup.prototype['WRAPPED_set'] = VectorObjectGroup.prototype.WRAPPED_set = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_VectorObjectGroup_WRAPPED_set_2(self, arg0, arg1);
};;

VectorObjectGroup.prototype['clear'] = VectorObjectGroup.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_VectorObjectGroup_clear_0(self);
};;

  VectorObjectGroup.prototype['__destroy__'] = VectorObjectGroup.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_VectorObjectGroup___destroy___0(self);
};
// VariablesContainer
function VariablesContainer() {
  this.ptr = _emscripten_bind_VariablesContainer_VariablesContainer_0();
  getCache(VariablesContainer)[this.ptr] = this;
};;
VariablesContainer.prototype = Object.create(WrapperObject.prototype);
VariablesContainer.prototype.constructor = VariablesContainer;
VariablesContainer.prototype.__class__ = VariablesContainer;
VariablesContainer.__cache__ = {};
Module['VariablesContainer'] = VariablesContainer;

VariablesContainer.prototype['Has'] = VariablesContainer.prototype.Has = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_VariablesContainer_Has_1(self, arg0));
};;

VariablesContainer.prototype['Get'] = VariablesContainer.prototype.Get = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_VariablesContainer_Get_1(self, arg0), Variable);
};;

VariablesContainer.prototype['GetAt'] = VariablesContainer.prototype.GetAt = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VariablesContainer_GetAt_1(self, arg0), PairStringVariable);
};;

VariablesContainer.prototype['Insert'] = VariablesContainer.prototype.Insert = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_VariablesContainer_Insert_3(self, arg0, arg1, arg2), Variable);
};;

VariablesContainer.prototype['InsertNew'] = VariablesContainer.prototype.InsertNew = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_VariablesContainer_InsertNew_2(self, arg0, arg1), Variable);
};;

VariablesContainer.prototype['Remove'] = VariablesContainer.prototype.Remove = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_VariablesContainer_Remove_1(self, arg0);
};;

VariablesContainer.prototype['Rename'] = VariablesContainer.prototype.Rename = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_VariablesContainer_Rename_2(self, arg0, arg1));
};;

VariablesContainer.prototype['Swap'] = VariablesContainer.prototype.Swap = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_VariablesContainer_Swap_2(self, arg0, arg1);
};;

VariablesContainer.prototype['Move'] = VariablesContainer.prototype.Move = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_VariablesContainer_Move_2(self, arg0, arg1);
};;

VariablesContainer.prototype['GetPosition'] = VariablesContainer.prototype.GetPosition = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_VariablesContainer_GetPosition_1(self, arg0);
};;

VariablesContainer.prototype['Count'] = VariablesContainer.prototype.Count = function() {
  var self = this.ptr;
  return _emscripten_bind_VariablesContainer_Count_0(self);
};;

VariablesContainer.prototype['Clear'] = VariablesContainer.prototype.Clear = function() {
  var self = this.ptr;
  _emscripten_bind_VariablesContainer_Clear_0(self);
};;

VariablesContainer.prototype['SerializeTo'] = VariablesContainer.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VariablesContainer_SerializeTo_1(self, arg0);
};;

VariablesContainer.prototype['UnserializeFrom'] = VariablesContainer.prototype.UnserializeFrom = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VariablesContainer_UnserializeFrom_1(self, arg0);
};;

  VariablesContainer.prototype['__destroy__'] = VariablesContainer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_VariablesContainer___destroy___0(self);
};
// Vector2f
function Vector2f() {
  this.ptr = _emscripten_bind_Vector2f_Vector2f_0();
  getCache(Vector2f)[this.ptr] = this;
};;
Vector2f.prototype = Object.create(WrapperObject.prototype);
Vector2f.prototype.constructor = Vector2f;
Vector2f.prototype.__class__ = Vector2f;
Vector2f.__cache__ = {};
Module['Vector2f'] = Vector2f;

  Vector2f.prototype['get_x'] = Vector2f.prototype.get_x = function() {
  var self = this.ptr;
  return _emscripten_bind_Vector2f_get_x_0(self);
};
    Vector2f.prototype['set_x'] = Vector2f.prototype.set_x = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Vector2f_set_x_1(self, arg0);
};
  Vector2f.prototype['get_y'] = Vector2f.prototype.get_y = function() {
  var self = this.ptr;
  return _emscripten_bind_Vector2f_get_y_0(self);
};
    Vector2f.prototype['set_y'] = Vector2f.prototype.set_y = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Vector2f_set_y_1(self, arg0);
};
  Vector2f.prototype['__destroy__'] = Vector2f.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Vector2f___destroy___0(self);
};
// EventsRefactorer
function EventsRefactorer() { throw "cannot construct a EventsRefactorer, no constructor in IDL" }
EventsRefactorer.prototype = Object.create(WrapperObject.prototype);
EventsRefactorer.prototype.constructor = EventsRefactorer;
EventsRefactorer.prototype.__class__ = EventsRefactorer;
EventsRefactorer.__cache__ = {};
Module['EventsRefactorer'] = EventsRefactorer;

EventsRefactorer.prototype['STATIC_RenameObjectInEvents'] = EventsRefactorer.prototype.STATIC_RenameObjectInEvents = function(arg0, arg1, arg2, arg3, arg4, arg5) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  if (arg5 && typeof arg5 === 'object') arg5 = arg5.ptr;
  else arg5 = ensureString(arg5);
  _emscripten_bind_EventsRefactorer_STATIC_RenameObjectInEvents_6(self, arg0, arg1, arg2, arg3, arg4, arg5);
};;

EventsRefactorer.prototype['STATIC_RemoveObjectInEvents'] = EventsRefactorer.prototype.STATIC_RemoveObjectInEvents = function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  _emscripten_bind_EventsRefactorer_STATIC_RemoveObjectInEvents_5(self, arg0, arg1, arg2, arg3, arg4);
};;

EventsRefactorer.prototype['STATIC_ReplaceStringInEvents'] = EventsRefactorer.prototype.STATIC_ReplaceStringInEvents = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  if (arg5 && typeof arg5 === 'object') arg5 = arg5.ptr;
  if (arg6 && typeof arg6 === 'object') arg6 = arg6.ptr;
  if (arg7 && typeof arg7 === 'object') arg7 = arg7.ptr;
  _emscripten_bind_EventsRefactorer_STATIC_ReplaceStringInEvents_8(self, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
};;

  EventsRefactorer.prototype['__destroy__'] = EventsRefactorer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_EventsRefactorer___destroy___0(self);
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

InitialInstanceJSFunctor.prototype['invoke'] = InitialInstanceJSFunctor.prototype.invoke = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstanceJSFunctor_invoke_1(self, arg0);
};;

  InitialInstanceJSFunctor.prototype['__destroy__'] = InitialInstanceJSFunctor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstanceJSFunctor___destroy___0(self);
};
// Animation
function Animation() {
  this.ptr = _emscripten_bind_Animation_Animation_0();
  getCache(Animation)[this.ptr] = this;
};;
Animation.prototype = Object.create(WrapperObject.prototype);
Animation.prototype.constructor = Animation;
Animation.prototype.__class__ = Animation;
Animation.__cache__ = {};
Module['Animation'] = Animation;

Animation.prototype['SetName'] = Animation.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Animation_SetName_1(self, arg0);
};;

Animation.prototype['GetName'] = Animation.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Animation_GetName_0(self));
};;

Animation.prototype['SetDirectionsCount'] = Animation.prototype.SetDirectionsCount = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Animation_SetDirectionsCount_1(self, arg0);
};;

Animation.prototype['GetDirectionsCount'] = Animation.prototype.GetDirectionsCount = function() {
  var self = this.ptr;
  return _emscripten_bind_Animation_GetDirectionsCount_0(self);
};;

Animation.prototype['GetDirection'] = Animation.prototype.GetDirection = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Animation_GetDirection_1(self, arg0), Direction);
};;

Animation.prototype['SetDirection'] = Animation.prototype.SetDirection = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Animation_SetDirection_2(self, arg0, arg1);
};;

Animation.prototype['HasNoDirections'] = Animation.prototype.HasNoDirections = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Animation_HasNoDirections_0(self));
};;

Animation.prototype['UseMultipleDirections'] = Animation.prototype.UseMultipleDirections = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Animation_UseMultipleDirections_0(self));
};;

Animation.prototype['SetUseMultipleDirections'] = Animation.prototype.SetUseMultipleDirections = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Animation_SetUseMultipleDirections_1(self, arg0);
};;

  Animation.prototype['__destroy__'] = Animation.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Animation___destroy___0(self);
};
// MapStringEventMetadata
function MapStringEventMetadata() { throw "cannot construct a MapStringEventMetadata, no constructor in IDL" }
MapStringEventMetadata.prototype = Object.create(WrapperObject.prototype);
MapStringEventMetadata.prototype.constructor = MapStringEventMetadata;
MapStringEventMetadata.prototype.__class__ = MapStringEventMetadata;
MapStringEventMetadata.__cache__ = {};
Module['MapStringEventMetadata'] = MapStringEventMetadata;

MapStringEventMetadata.prototype['MAP_get'] = MapStringEventMetadata.prototype.MAP_get = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_MapStringEventMetadata_MAP_get_1(self, arg0), EventMetadata);
};;

MapStringEventMetadata.prototype['MAP_set'] = MapStringEventMetadata.prototype.MAP_set = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_MapStringEventMetadata_MAP_set_2(self, arg0, arg1);
};;

MapStringEventMetadata.prototype['MAP_has'] = MapStringEventMetadata.prototype.MAP_has = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_MapStringEventMetadata_MAP_has_1(self, arg0));
};;

MapStringEventMetadata.prototype['MAP_keys'] = MapStringEventMetadata.prototype.MAP_keys = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_MapStringEventMetadata_MAP_keys_0(self), VectorString);
};;

  MapStringEventMetadata.prototype['__destroy__'] = MapStringEventMetadata.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_MapStringEventMetadata___destroy___0(self);
};
// ForEachEvent
function ForEachEvent() {
  this.ptr = _emscripten_bind_ForEachEvent_ForEachEvent_0();
  getCache(ForEachEvent)[this.ptr] = this;
};;
ForEachEvent.prototype = Object.create(WrapperObject.prototype);
ForEachEvent.prototype.constructor = ForEachEvent;
ForEachEvent.prototype.__class__ = ForEachEvent;
ForEachEvent.__cache__ = {};
Module['ForEachEvent'] = ForEachEvent;

ForEachEvent.prototype['SetObjectToPick'] = ForEachEvent.prototype.SetObjectToPick = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ForEachEvent_SetObjectToPick_1(self, arg0);
};;

ForEachEvent.prototype['GetObjectToPick'] = ForEachEvent.prototype.GetObjectToPick = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ForEachEvent_GetObjectToPick_0(self));
};;

ForEachEvent.prototype['GetConditions'] = ForEachEvent.prototype.GetConditions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ForEachEvent_GetConditions_0(self), InstructionsList);
};;

ForEachEvent.prototype['GetActions'] = ForEachEvent.prototype.GetActions = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ForEachEvent_GetActions_0(self), InstructionsList);
};;

ForEachEvent.prototype['Clone'] = ForEachEvent.prototype.Clone = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ForEachEvent_Clone_0(self), ForEachEvent);
};;

ForEachEvent.prototype['GetType'] = ForEachEvent.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ForEachEvent_GetType_0(self));
};;

ForEachEvent.prototype['SetType'] = ForEachEvent.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ForEachEvent_SetType_1(self, arg0);
};;

ForEachEvent.prototype['IsExecutable'] = ForEachEvent.prototype.IsExecutable = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ForEachEvent_IsExecutable_0(self));
};;

ForEachEvent.prototype['CanHaveSubEvents'] = ForEachEvent.prototype.CanHaveSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ForEachEvent_CanHaveSubEvents_0(self));
};;

ForEachEvent.prototype['HasSubEvents'] = ForEachEvent.prototype.HasSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ForEachEvent_HasSubEvents_0(self));
};;

ForEachEvent.prototype['GetSubEvents'] = ForEachEvent.prototype.GetSubEvents = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ForEachEvent_GetSubEvents_0(self), EventsList);
};;

ForEachEvent.prototype['IsDisabled'] = ForEachEvent.prototype.IsDisabled = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ForEachEvent_IsDisabled_0(self));
};;

ForEachEvent.prototype['SetDisabled'] = ForEachEvent.prototype.SetDisabled = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ForEachEvent_SetDisabled_1(self, arg0);
};;

ForEachEvent.prototype['IsFolded'] = ForEachEvent.prototype.IsFolded = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ForEachEvent_IsFolded_0(self));
};;

ForEachEvent.prototype['SetFolded'] = ForEachEvent.prototype.SetFolded = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ForEachEvent_SetFolded_1(self, arg0);
};;

ForEachEvent.prototype['SerializeTo'] = ForEachEvent.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ForEachEvent_SerializeTo_1(self, arg0);
};;

ForEachEvent.prototype['UnserializeFrom'] = ForEachEvent.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_ForEachEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  ForEachEvent.prototype['__destroy__'] = ForEachEvent.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ForEachEvent___destroy___0(self);
};
// ProjectResourcesAdder
function ProjectResourcesAdder() { throw "cannot construct a ProjectResourcesAdder, no constructor in IDL" }
ProjectResourcesAdder.prototype = Object.create(WrapperObject.prototype);
ProjectResourcesAdder.prototype.constructor = ProjectResourcesAdder;
ProjectResourcesAdder.prototype.__class__ = ProjectResourcesAdder;
ProjectResourcesAdder.__cache__ = {};
Module['ProjectResourcesAdder'] = ProjectResourcesAdder;

ProjectResourcesAdder.prototype['STATIC_AddAllMissingImages'] = ProjectResourcesAdder.prototype.STATIC_AddAllMissingImages = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ProjectResourcesAdder_STATIC_AddAllMissingImages_1(self, arg0);
};;

ProjectResourcesAdder.prototype['STATIC_GetAllUselessImages'] = ProjectResourcesAdder.prototype.STATIC_GetAllUselessImages = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ProjectResourcesAdder_STATIC_GetAllUselessImages_1(self, arg0);
};;

ProjectResourcesAdder.prototype['STATIC_RemoveAllUselessImages'] = ProjectResourcesAdder.prototype.STATIC_RemoveAllUselessImages = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ProjectResourcesAdder_STATIC_RemoveAllUselessImages_1(self, arg0);
};;

  ProjectResourcesAdder.prototype['__destroy__'] = ProjectResourcesAdder.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ProjectResourcesAdder___destroy___0(self);
};
// Sprite
function Sprite() {
  this.ptr = _emscripten_bind_Sprite_Sprite_0();
  getCache(Sprite)[this.ptr] = this;
};;
Sprite.prototype = Object.create(WrapperObject.prototype);
Sprite.prototype.constructor = Sprite;
Sprite.prototype.__class__ = Sprite;
Sprite.__cache__ = {};
Module['Sprite'] = Sprite;

Sprite.prototype['SetImageName'] = Sprite.prototype.SetImageName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Sprite_SetImageName_1(self, arg0);
};;

Sprite.prototype['GetImageName'] = Sprite.prototype.GetImageName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Sprite_GetImageName_0(self));
};;

Sprite.prototype['AddPoint'] = Sprite.prototype.AddPoint = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sprite_AddPoint_1(self, arg0);
};;

Sprite.prototype['DelPoint'] = Sprite.prototype.DelPoint = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Sprite_DelPoint_1(self, arg0);
};;

Sprite.prototype['GetPoint'] = Sprite.prototype.GetPoint = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Sprite_GetPoint_1(self, arg0), Point);
};;

Sprite.prototype['HasPoint'] = Sprite.prototype.HasPoint = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Sprite_HasPoint_1(self, arg0));
};;

Sprite.prototype['GetOrigin'] = Sprite.prototype.GetOrigin = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Sprite_GetOrigin_0(self), Point);
};;

Sprite.prototype['GetCenter'] = Sprite.prototype.GetCenter = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Sprite_GetCenter_0(self), Point);
};;

Sprite.prototype['IsDefaultCenterPoint'] = Sprite.prototype.IsDefaultCenterPoint = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Sprite_IsDefaultCenterPoint_0(self));
};;

Sprite.prototype['SetDefaultCenterPoint'] = Sprite.prototype.SetDefaultCenterPoint = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sprite_SetDefaultCenterPoint_1(self, arg0);
};;

  Sprite.prototype['__destroy__'] = Sprite.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Sprite___destroy___0(self);
};
// ArbitraryResourceWorkerJS
function ArbitraryResourceWorkerJS() {
  this.ptr = _emscripten_bind_ArbitraryResourceWorkerJS_ArbitraryResourceWorkerJS_0();
  getCache(ArbitraryResourceWorkerJS)[this.ptr] = this;
};;
ArbitraryResourceWorkerJS.prototype = Object.create(ArbitraryResourceWorker.prototype);
ArbitraryResourceWorkerJS.prototype.constructor = ArbitraryResourceWorkerJS;
ArbitraryResourceWorkerJS.prototype.__class__ = ArbitraryResourceWorkerJS;
ArbitraryResourceWorkerJS.__cache__ = {};
Module['ArbitraryResourceWorkerJS'] = ArbitraryResourceWorkerJS;

ArbitraryResourceWorkerJS.prototype['ExposeImage'] = ArbitraryResourceWorkerJS.prototype.ExposeImage = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ArbitraryResourceWorkerJS_ExposeImage_1(self, arg0);
};;

ArbitraryResourceWorkerJS.prototype['ExposeShader'] = ArbitraryResourceWorkerJS.prototype.ExposeShader = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ArbitraryResourceWorkerJS_ExposeShader_1(self, arg0);
};;

ArbitraryResourceWorkerJS.prototype['ExposeFile'] = ArbitraryResourceWorkerJS.prototype.ExposeFile = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ArbitraryResourceWorkerJS_ExposeFile_1(self, arg0);
};;

  ArbitraryResourceWorkerJS.prototype['__destroy__'] = ArbitraryResourceWorkerJS.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ArbitraryResourceWorkerJS___destroy___0(self);
};
// MapStringExpressionMetadata
function MapStringExpressionMetadata() { throw "cannot construct a MapStringExpressionMetadata, no constructor in IDL" }
MapStringExpressionMetadata.prototype = Object.create(WrapperObject.prototype);
MapStringExpressionMetadata.prototype.constructor = MapStringExpressionMetadata;
MapStringExpressionMetadata.prototype.__class__ = MapStringExpressionMetadata;
MapStringExpressionMetadata.__cache__ = {};
Module['MapStringExpressionMetadata'] = MapStringExpressionMetadata;

MapStringExpressionMetadata.prototype['MAP_get'] = MapStringExpressionMetadata.prototype.MAP_get = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_MapStringExpressionMetadata_MAP_get_1(self, arg0), ExpressionMetadata);
};;

MapStringExpressionMetadata.prototype['MAP_set'] = MapStringExpressionMetadata.prototype.MAP_set = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_MapStringExpressionMetadata_MAP_set_2(self, arg0, arg1);
};;

MapStringExpressionMetadata.prototype['MAP_has'] = MapStringExpressionMetadata.prototype.MAP_has = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_MapStringExpressionMetadata_MAP_has_1(self, arg0));
};;

MapStringExpressionMetadata.prototype['MAP_keys'] = MapStringExpressionMetadata.prototype.MAP_keys = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_MapStringExpressionMetadata_MAP_keys_0(self), VectorString);
};;

  MapStringExpressionMetadata.prototype['__destroy__'] = MapStringExpressionMetadata.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_MapStringExpressionMetadata___destroy___0(self);
};
// MapStringVariable
function MapStringVariable() { throw "cannot construct a MapStringVariable, no constructor in IDL" }
MapStringVariable.prototype = Object.create(WrapperObject.prototype);
MapStringVariable.prototype.constructor = MapStringVariable;
MapStringVariable.prototype.__class__ = MapStringVariable;
MapStringVariable.__cache__ = {};
Module['MapStringVariable'] = MapStringVariable;

MapStringVariable.prototype['MAP_get'] = MapStringVariable.prototype.MAP_get = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_MapStringVariable_MAP_get_1(self, arg0), Variable);
};;

MapStringVariable.prototype['MAP_set'] = MapStringVariable.prototype.MAP_set = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_MapStringVariable_MAP_set_2(self, arg0, arg1);
};;

MapStringVariable.prototype['MAP_has'] = MapStringVariable.prototype.MAP_has = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_MapStringVariable_MAP_has_1(self, arg0));
};;

MapStringVariable.prototype['MAP_keys'] = MapStringVariable.prototype.MAP_keys = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_MapStringVariable_MAP_keys_0(self), VectorString);
};;

  MapStringVariable.prototype['__destroy__'] = MapStringVariable.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_MapStringVariable___destroy___0(self);
};
// LinkEvent
function LinkEvent() {
  this.ptr = _emscripten_bind_LinkEvent_LinkEvent_0();
  getCache(LinkEvent)[this.ptr] = this;
};;
LinkEvent.prototype = Object.create(WrapperObject.prototype);
LinkEvent.prototype.constructor = LinkEvent;
LinkEvent.prototype.__class__ = LinkEvent;
LinkEvent.__cache__ = {};
Module['LinkEvent'] = LinkEvent;

LinkEvent.prototype['SetTarget'] = LinkEvent.prototype.SetTarget = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_LinkEvent_SetTarget_1(self, arg0);
};;

LinkEvent.prototype['GetTarget'] = LinkEvent.prototype.GetTarget = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_LinkEvent_GetTarget_0(self));
};;

LinkEvent.prototype['GetIncludeConfig'] = LinkEvent.prototype.GetIncludeConfig = function() {
  var self = this.ptr;
  return _emscripten_bind_LinkEvent_GetIncludeConfig_0(self);
};;

LinkEvent.prototype['SetIncludeAllEvents'] = LinkEvent.prototype.SetIncludeAllEvents = function() {
  var self = this.ptr;
  _emscripten_bind_LinkEvent_SetIncludeAllEvents_0(self);
};;

LinkEvent.prototype['SetIncludeEventsGroup'] = LinkEvent.prototype.SetIncludeEventsGroup = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_LinkEvent_SetIncludeEventsGroup_1(self, arg0);
};;

LinkEvent.prototype['GetEventsGroupName'] = LinkEvent.prototype.GetEventsGroupName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_LinkEvent_GetEventsGroupName_0(self));
};;

LinkEvent.prototype['SetIncludeStartAndEnd'] = LinkEvent.prototype.SetIncludeStartAndEnd = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_LinkEvent_SetIncludeStartAndEnd_2(self, arg0, arg1);
};;

LinkEvent.prototype['GetIncludeStart'] = LinkEvent.prototype.GetIncludeStart = function() {
  var self = this.ptr;
  return _emscripten_bind_LinkEvent_GetIncludeStart_0(self);
};;

LinkEvent.prototype['GetIncludeEnd'] = LinkEvent.prototype.GetIncludeEnd = function() {
  var self = this.ptr;
  return _emscripten_bind_LinkEvent_GetIncludeEnd_0(self);
};;

LinkEvent.prototype['Clone'] = LinkEvent.prototype.Clone = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_LinkEvent_Clone_0(self), LinkEvent);
};;

LinkEvent.prototype['GetType'] = LinkEvent.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_LinkEvent_GetType_0(self));
};;

LinkEvent.prototype['SetType'] = LinkEvent.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_LinkEvent_SetType_1(self, arg0);
};;

LinkEvent.prototype['IsExecutable'] = LinkEvent.prototype.IsExecutable = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_LinkEvent_IsExecutable_0(self));
};;

LinkEvent.prototype['CanHaveSubEvents'] = LinkEvent.prototype.CanHaveSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_LinkEvent_CanHaveSubEvents_0(self));
};;

LinkEvent.prototype['HasSubEvents'] = LinkEvent.prototype.HasSubEvents = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_LinkEvent_HasSubEvents_0(self));
};;

LinkEvent.prototype['GetSubEvents'] = LinkEvent.prototype.GetSubEvents = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_LinkEvent_GetSubEvents_0(self), EventsList);
};;

LinkEvent.prototype['IsDisabled'] = LinkEvent.prototype.IsDisabled = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_LinkEvent_IsDisabled_0(self));
};;

LinkEvent.prototype['SetDisabled'] = LinkEvent.prototype.SetDisabled = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_LinkEvent_SetDisabled_1(self, arg0);
};;

LinkEvent.prototype['IsFolded'] = LinkEvent.prototype.IsFolded = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_LinkEvent_IsFolded_0(self));
};;

LinkEvent.prototype['SetFolded'] = LinkEvent.prototype.SetFolded = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_LinkEvent_SetFolded_1(self, arg0);
};;

LinkEvent.prototype['SerializeTo'] = LinkEvent.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_LinkEvent_SerializeTo_1(self, arg0);
};;

LinkEvent.prototype['UnserializeFrom'] = LinkEvent.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_LinkEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  LinkEvent.prototype['__destroy__'] = LinkEvent.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_LinkEvent___destroy___0(self);
};
// Resource
function Resource() {
  this.ptr = _emscripten_bind_Resource_Resource_0();
  getCache(Resource)[this.ptr] = this;
};;
Resource.prototype = Object.create(WrapperObject.prototype);
Resource.prototype.constructor = Resource;
Resource.prototype.__class__ = Resource;
Resource.__cache__ = {};
Module['Resource'] = Resource;

Resource.prototype['Clone'] = Resource.prototype.Clone = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Resource_Clone_0(self), Resource);
};;

Resource.prototype['SetName'] = Resource.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Resource_SetName_1(self, arg0);
};;

Resource.prototype['GetName'] = Resource.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Resource_GetName_0(self));
};;

Resource.prototype['SetKind'] = Resource.prototype.SetKind = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Resource_SetKind_1(self, arg0);
};;

Resource.prototype['GetKind'] = Resource.prototype.GetKind = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Resource_GetKind_0(self));
};;

Resource.prototype['IsUserAdded'] = Resource.prototype.IsUserAdded = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Resource_IsUserAdded_0(self));
};;

Resource.prototype['SetUserAdded'] = Resource.prototype.SetUserAdded = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Resource_SetUserAdded_1(self, arg0);
};;

Resource.prototype['UseFile'] = Resource.prototype.UseFile = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Resource_UseFile_0(self));
};;

Resource.prototype['SetFile'] = Resource.prototype.SetFile = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Resource_SetFile_1(self, arg0);
};;

Resource.prototype['GetFile'] = Resource.prototype.GetFile = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Resource_GetFile_0(self));
};;

Resource.prototype['GetAbsoluteFile'] = Resource.prototype.GetAbsoluteFile = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_Resource_GetAbsoluteFile_1(self, arg0));
};;

Resource.prototype['SerializeTo'] = Resource.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Resource_SerializeTo_1(self, arg0);
};;

Resource.prototype['UnserializeFrom'] = Resource.prototype.UnserializeFrom = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Resource_UnserializeFrom_1(self, arg0);
};;

  Resource.prototype['__destroy__'] = Resource.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Resource___destroy___0(self);
};
// AbstractFileSystemJS
function AbstractFileSystemJS() {
  this.ptr = _emscripten_bind_AbstractFileSystemJS_AbstractFileSystemJS_0();
  getCache(AbstractFileSystemJS)[this.ptr] = this;
};;
AbstractFileSystemJS.prototype = Object.create(AbstractFileSystem.prototype);
AbstractFileSystemJS.prototype.constructor = AbstractFileSystemJS;
AbstractFileSystemJS.prototype.__class__ = AbstractFileSystemJS;
AbstractFileSystemJS.__cache__ = {};
Module['AbstractFileSystemJS'] = AbstractFileSystemJS;

AbstractFileSystemJS.prototype['MkDir'] = AbstractFileSystemJS.prototype.MkDir = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AbstractFileSystemJS_MkDir_1(self, arg0);
};;

AbstractFileSystemJS.prototype['DirExists'] = AbstractFileSystemJS.prototype.DirExists = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AbstractFileSystemJS_DirExists_1(self, arg0);
};;

AbstractFileSystemJS.prototype['ClearDir'] = AbstractFileSystemJS.prototype.ClearDir = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AbstractFileSystemJS_ClearDir_1(self, arg0);
};;

AbstractFileSystemJS.prototype['GetTempDir'] = AbstractFileSystemJS.prototype.GetTempDir = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_AbstractFileSystemJS_GetTempDir_0(self));
};;

AbstractFileSystemJS.prototype['FileNameFrom'] = AbstractFileSystemJS.prototype.FileNameFrom = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return Pointer_stringify(_emscripten_bind_AbstractFileSystemJS_FileNameFrom_1(self, arg0));
};;

AbstractFileSystemJS.prototype['DirNameFrom'] = AbstractFileSystemJS.prototype.DirNameFrom = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return Pointer_stringify(_emscripten_bind_AbstractFileSystemJS_DirNameFrom_1(self, arg0));
};;

AbstractFileSystemJS.prototype['IsAbsolute'] = AbstractFileSystemJS.prototype.IsAbsolute = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_AbstractFileSystemJS_IsAbsolute_1(self, arg0));
};;

AbstractFileSystemJS.prototype['CopyFile'] = AbstractFileSystemJS.prototype.CopyFile = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_AbstractFileSystemJS_CopyFile_2(self, arg0, arg1);
};;

AbstractFileSystemJS.prototype['WriteToFile'] = AbstractFileSystemJS.prototype.WriteToFile = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_AbstractFileSystemJS_WriteToFile_2(self, arg0, arg1);
};;

AbstractFileSystemJS.prototype['ReadFile'] = AbstractFileSystemJS.prototype.ReadFile = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return Pointer_stringify(_emscripten_bind_AbstractFileSystemJS_ReadFile_1(self, arg0));
};;

AbstractFileSystemJS.prototype['ReadDir'] = AbstractFileSystemJS.prototype.ReadDir = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_AbstractFileSystemJS_ReadDir_1(self, arg0), VectorString);
};;

AbstractFileSystemJS.prototype['FileExists'] = AbstractFileSystemJS.prototype.FileExists = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_AbstractFileSystemJS_FileExists_1(self, arg0));
};;

  AbstractFileSystemJS.prototype['__destroy__'] = AbstractFileSystemJS.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_AbstractFileSystemJS___destroy___0(self);
};
// PropertyDescriptor
function PropertyDescriptor(arg0) {
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_PropertyDescriptor_PropertyDescriptor_1(arg0);
  getCache(PropertyDescriptor)[this.ptr] = this;
};;
PropertyDescriptor.prototype = Object.create(WrapperObject.prototype);
PropertyDescriptor.prototype.constructor = PropertyDescriptor;
PropertyDescriptor.prototype.__class__ = PropertyDescriptor;
PropertyDescriptor.__cache__ = {};
Module['PropertyDescriptor'] = PropertyDescriptor;

PropertyDescriptor.prototype['SetValue'] = PropertyDescriptor.prototype.SetValue = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PropertyDescriptor_SetValue_1(self, arg0), PropertyDescriptor);
};;

PropertyDescriptor.prototype['GetValue'] = PropertyDescriptor.prototype.GetValue = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PropertyDescriptor_GetValue_0(self));
};;

PropertyDescriptor.prototype['SetType'] = PropertyDescriptor.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PropertyDescriptor_SetType_1(self, arg0), PropertyDescriptor);
};;

PropertyDescriptor.prototype['GetType'] = PropertyDescriptor.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PropertyDescriptor_GetType_0(self));
};;

PropertyDescriptor.prototype['AddExtraInfo'] = PropertyDescriptor.prototype.AddExtraInfo = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PropertyDescriptor_AddExtraInfo_1(self, arg0), PropertyDescriptor);
};;

PropertyDescriptor.prototype['GetExtraInfo'] = PropertyDescriptor.prototype.GetExtraInfo = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PropertyDescriptor_GetExtraInfo_0(self), VectorString);
};;

  PropertyDescriptor.prototype['__destroy__'] = PropertyDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_PropertyDescriptor___destroy___0(self);
};
// ObjectListDialogsHelper
function ObjectListDialogsHelper(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  this.ptr = _emscripten_bind_ObjectListDialogsHelper_ObjectListDialogsHelper_2(arg0, arg1);
  getCache(ObjectListDialogsHelper)[this.ptr] = this;
};;
ObjectListDialogsHelper.prototype = Object.create(WrapperObject.prototype);
ObjectListDialogsHelper.prototype.constructor = ObjectListDialogsHelper;
ObjectListDialogsHelper.prototype.__class__ = ObjectListDialogsHelper;
ObjectListDialogsHelper.__cache__ = {};
Module['ObjectListDialogsHelper'] = ObjectListDialogsHelper;

ObjectListDialogsHelper.prototype['SetSearchText'] = ObjectListDialogsHelper.prototype.SetSearchText = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ObjectListDialogsHelper_SetSearchText_1(self, arg0);
};;

ObjectListDialogsHelper.prototype['SetAllowedObjectType'] = ObjectListDialogsHelper.prototype.SetAllowedObjectType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ObjectListDialogsHelper_SetAllowedObjectType_1(self, arg0);
};;

ObjectListDialogsHelper.prototype['SetGroupsAllowed'] = ObjectListDialogsHelper.prototype.SetGroupsAllowed = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ObjectListDialogsHelper_SetGroupsAllowed_1(self, arg0);
};;

ObjectListDialogsHelper.prototype['GetMatchingObjects'] = ObjectListDialogsHelper.prototype.GetMatchingObjects = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ObjectListDialogsHelper_GetMatchingObjects_0(self), VectorString);
};;

  ObjectListDialogsHelper.prototype['__destroy__'] = ObjectListDialogsHelper.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ObjectListDialogsHelper___destroy___0(self);
};
// InstructionSentenceFormatter
function InstructionSentenceFormatter() { throw "cannot construct a InstructionSentenceFormatter, no constructor in IDL" }
InstructionSentenceFormatter.prototype = Object.create(WrapperObject.prototype);
InstructionSentenceFormatter.prototype.constructor = InstructionSentenceFormatter;
InstructionSentenceFormatter.prototype.__class__ = InstructionSentenceFormatter;
InstructionSentenceFormatter.__cache__ = {};
Module['InstructionSentenceFormatter'] = InstructionSentenceFormatter;

InstructionSentenceFormatter.prototype['STATIC_Get'] = InstructionSentenceFormatter.prototype.STATIC_Get = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InstructionSentenceFormatter_STATIC_Get_0(self), InstructionSentenceFormatter);
};;

InstructionSentenceFormatter.prototype['Translate'] = InstructionSentenceFormatter.prototype.Translate = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionSentenceFormatter_Translate_2(self, arg0, arg1));
};;

InstructionSentenceFormatter.prototype['GetAsFormattedText'] = InstructionSentenceFormatter.prototype.GetAsFormattedText = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_InstructionSentenceFormatter_GetAsFormattedText_2(self, arg0, arg1), VectorPairStringTextFormatting);
};;

InstructionSentenceFormatter.prototype['GetFormattingFromType'] = InstructionSentenceFormatter.prototype.GetFormattingFromType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_InstructionSentenceFormatter_GetFormattingFromType_1(self, arg0), TextFormatting);
};;

InstructionSentenceFormatter.prototype['LabelFromType'] = InstructionSentenceFormatter.prototype.LabelFromType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return Pointer_stringify(_emscripten_bind_InstructionSentenceFormatter_LabelFromType_1(self, arg0));
};;

InstructionSentenceFormatter.prototype['LoadTypesFormattingFromConfig'] = InstructionSentenceFormatter.prototype.LoadTypesFormattingFromConfig = function() {
  var self = this.ptr;
  _emscripten_bind_InstructionSentenceFormatter_LoadTypesFormattingFromConfig_0(self);
};;

  InstructionSentenceFormatter.prototype['__destroy__'] = InstructionSentenceFormatter.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_InstructionSentenceFormatter___destroy___0(self);
};
// gdObject
function gdObject(arg0) {
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_gdObject_gdObject_1(arg0);
  getCache(gdObject)[this.ptr] = this;
};;
gdObject.prototype = Object.create(WrapperObject.prototype);
gdObject.prototype.constructor = gdObject;
gdObject.prototype.__class__ = gdObject;
gdObject.__cache__ = {};
Module['gdObject'] = gdObject;

gdObject.prototype['SetName'] = gdObject.prototype.SetName = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_gdObject_SetName_1(self, arg0);
};;

gdObject.prototype['GetName'] = gdObject.prototype.GetName = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_gdObject_GetName_0(self));
};;

gdObject.prototype['SetType'] = gdObject.prototype.SetType = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_gdObject_SetType_1(self, arg0);
};;

gdObject.prototype['GetType'] = gdObject.prototype.GetType = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_gdObject_GetType_0(self));
};;

gdObject.prototype['GetProperties'] = gdObject.prototype.GetProperties = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_gdObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

gdObject.prototype['UpdateProperty'] = gdObject.prototype.UpdateProperty = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_gdObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

gdObject.prototype['GetInitialInstanceProperties'] = gdObject.prototype.GetInitialInstanceProperties = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_gdObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

gdObject.prototype['UpdateInitialInstanceProperty'] = gdObject.prototype.UpdateInitialInstanceProperty = function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_gdObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

gdObject.prototype['GetVariables'] = gdObject.prototype.GetVariables = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_gdObject_GetVariables_0(self), VariablesContainer);
};;

gdObject.prototype['GetAllBehaviorNames'] = gdObject.prototype.GetAllBehaviorNames = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_gdObject_GetAllBehaviorNames_0(self), VectorString);
};;

gdObject.prototype['HasBehaviorNamed'] = gdObject.prototype.HasBehaviorNamed = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_gdObject_HasBehaviorNamed_1(self, arg0));
};;

gdObject.prototype['AddNewBehavior'] = gdObject.prototype.AddNewBehavior = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_gdObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

gdObject.prototype['GetBehavior'] = gdObject.prototype.GetBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_gdObject_GetBehavior_1(self, arg0), Behavior);
};;

gdObject.prototype['RemoveBehavior'] = gdObject.prototype.RemoveBehavior = function(arg0) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_gdObject_RemoveBehavior_1(self, arg0);
};;

gdObject.prototype['RenameBehavior'] = gdObject.prototype.RenameBehavior = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_gdObject_RenameBehavior_2(self, arg0, arg1));
};;

gdObject.prototype['SerializeTo'] = gdObject.prototype.SerializeTo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_gdObject_SerializeTo_1(self, arg0);
};;

gdObject.prototype['UnserializeFrom'] = gdObject.prototype.UnserializeFrom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_gdObject_UnserializeFrom_2(self, arg0, arg1);
};;

  gdObject.prototype['__destroy__'] = gdObject.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_gdObject___destroy___0(self);
};
// JsPlatform
function JsPlatform() { throw "cannot construct a JsPlatform, no constructor in IDL" }
JsPlatform.prototype = Object.create(WrapperObject.prototype);
JsPlatform.prototype.constructor = JsPlatform;
JsPlatform.prototype.__class__ = JsPlatform;
JsPlatform.__cache__ = {};
Module['JsPlatform'] = JsPlatform;

JsPlatform.prototype['STATIC_Get'] = JsPlatform.prototype.STATIC_Get = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_JsPlatform_STATIC_Get_0(self), JsPlatform);
};;

  JsPlatform.prototype['__destroy__'] = JsPlatform.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_JsPlatform___destroy___0(self);
};
// MetadataProvider
function MetadataProvider() { throw "cannot construct a MetadataProvider, no constructor in IDL" }
MetadataProvider.prototype = Object.create(WrapperObject.prototype);
MetadataProvider.prototype.constructor = MetadataProvider;
MetadataProvider.prototype.__class__ = MetadataProvider;
MetadataProvider.__cache__ = {};
Module['MetadataProvider'] = MetadataProvider;

MetadataProvider.prototype['STATIC_GetBehaviorMetadata'] = MetadataProvider.prototype.STATIC_GetBehaviorMetadata = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetBehaviorMetadata_2(self, arg0, arg1), BehaviorMetadata);
};;

MetadataProvider.prototype['STATIC_GetObjectMetadata'] = MetadataProvider.prototype.STATIC_GetObjectMetadata = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetObjectMetadata_2(self, arg0, arg1), ObjectMetadata);
};;

MetadataProvider.prototype['STATIC_GetActionMetadata'] = MetadataProvider.prototype.STATIC_GetActionMetadata = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetActionMetadata_2(self, arg0, arg1), InstructionMetadata);
};;

MetadataProvider.prototype['STATIC_GetConditionMetadata'] = MetadataProvider.prototype.STATIC_GetConditionMetadata = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetConditionMetadata_2(self, arg0, arg1), InstructionMetadata);
};;

MetadataProvider.prototype['STATIC_GetExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetExpressionMetadata = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetExpressionMetadata_2(self, arg0, arg1), ExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetObjectExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetObjectExpressionMetadata = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetObjectExpressionMetadata_3(self, arg0, arg1, arg2), ExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetBehaviorExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetBehaviorExpressionMetadata = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetBehaviorExpressionMetadata_3(self, arg0, arg1, arg2), ExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetStrExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetStrExpressionMetadata = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetStrExpressionMetadata_2(self, arg0, arg1), ExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetObjectStrExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetObjectStrExpressionMetadata = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetObjectStrExpressionMetadata_3(self, arg0, arg1, arg2), ExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetBehaviorStrExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetBehaviorStrExpressionMetadata = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetBehaviorStrExpressionMetadata_3(self, arg0, arg1, arg2), ExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_HasCondition'] = MetadataProvider.prototype.STATIC_HasCondition = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasCondition_2(self, arg0, arg1));
};;

MetadataProvider.prototype['STATIC_HasAction'] = MetadataProvider.prototype.STATIC_HasAction = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasAction_2(self, arg0, arg1));
};;

MetadataProvider.prototype['STATIC_HasObjectAction'] = MetadataProvider.prototype.STATIC_HasObjectAction = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasObjectAction_3(self, arg0, arg1, arg2));
};;

MetadataProvider.prototype['STATIC_HasObjectCondition'] = MetadataProvider.prototype.STATIC_HasObjectCondition = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasObjectCondition_3(self, arg0, arg1, arg2));
};;

MetadataProvider.prototype['STATIC_HasBehaviorAction'] = MetadataProvider.prototype.STATIC_HasBehaviorAction = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasBehaviorAction_3(self, arg0, arg1, arg2));
};;

MetadataProvider.prototype['STATIC_HasBehaviorCondition'] = MetadataProvider.prototype.STATIC_HasBehaviorCondition = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasBehaviorCondition_3(self, arg0, arg1, arg2));
};;

MetadataProvider.prototype['STATIC_HasExpression'] = MetadataProvider.prototype.STATIC_HasExpression = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasExpression_2(self, arg0, arg1));
};;

MetadataProvider.prototype['STATIC_HasObjectExpression'] = MetadataProvider.prototype.STATIC_HasObjectExpression = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasObjectExpression_3(self, arg0, arg1, arg2));
};;

MetadataProvider.prototype['STATIC_HasBehaviorExpression'] = MetadataProvider.prototype.STATIC_HasBehaviorExpression = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasBehaviorExpression_3(self, arg0, arg1, arg2));
};;

MetadataProvider.prototype['STATIC_HasStrExpression'] = MetadataProvider.prototype.STATIC_HasStrExpression = function(arg0, arg1) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasStrExpression_2(self, arg0, arg1));
};;

MetadataProvider.prototype['STATIC_HasObjectStrExpression'] = MetadataProvider.prototype.STATIC_HasObjectStrExpression = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasObjectStrExpression_3(self, arg0, arg1, arg2));
};;

MetadataProvider.prototype['STATIC_HasBehaviorStrExpression'] = MetadataProvider.prototype.STATIC_HasBehaviorStrExpression = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureStringCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasBehaviorStrExpression_3(self, arg0, arg1, arg2));
};;

  MetadataProvider.prototype['__destroy__'] = MetadataProvider.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_MetadataProvider___destroy___0(self);
};
// TextFormatting
function TextFormatting() { throw "cannot construct a TextFormatting, no constructor in IDL" }
TextFormatting.prototype = Object.create(WrapperObject.prototype);
TextFormatting.prototype.constructor = TextFormatting;
TextFormatting.prototype.__class__ = TextFormatting;
TextFormatting.__cache__ = {};
Module['TextFormatting'] = TextFormatting;

TextFormatting.prototype['IsBold'] = TextFormatting.prototype.IsBold = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TextFormatting_IsBold_0(self));
};;

TextFormatting.prototype['IsItalic'] = TextFormatting.prototype.IsItalic = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TextFormatting_IsItalic_0(self));
};;

TextFormatting.prototype['GetColorRed'] = TextFormatting.prototype.GetColorRed = function() {
  var self = this.ptr;
  return _emscripten_bind_TextFormatting_GetColorRed_0(self);
};;

TextFormatting.prototype['GetColorGreen'] = TextFormatting.prototype.GetColorGreen = function() {
  var self = this.ptr;
  return _emscripten_bind_TextFormatting_GetColorGreen_0(self);
};;

TextFormatting.prototype['GetColorBlue'] = TextFormatting.prototype.GetColorBlue = function() {
  var self = this.ptr;
  return _emscripten_bind_TextFormatting_GetColorBlue_0(self);
};;

TextFormatting.prototype['GetUserData'] = TextFormatting.prototype.GetUserData = function() {
  var self = this.ptr;
  return _emscripten_bind_TextFormatting_GetUserData_0(self);
};;

  TextFormatting.prototype['__destroy__'] = TextFormatting.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_TextFormatting___destroy___0(self);
};
(function() {
  function setupEnums() {
    
  }
  if (Module['calledRun']) setupEnums();
  else addOnPreMain(setupEnums);
})();
