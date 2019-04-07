
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

// Converts big (string or array) values into a C-style storage, in temporary space

var ensureCache = {
  buffer: 0,  // the main buffer of temporary storage
  size: 0,   // the size of buffer
  pos: 0,    // the next free offset in buffer
  temps: [], // extra allocations
  needed: 0, // the total size we need next time

  prepare: function() {
    if (ensureCache.needed) {
      // clear the temps
      for (var i = 0; i < ensureCache.temps.length; i++) {
        Module['_free'](ensureCache.temps[i]);
      }
      ensureCache.temps.length = 0;
      // prepare to allocate a bigger buffer
      Module['_free'](ensureCache.buffer);
      ensureCache.buffer = 0;
      ensureCache.size += ensureCache.needed;
      // clean up
      ensureCache.needed = 0;
    }
    if (!ensureCache.buffer) { // happens first time, or when we need to grow
      ensureCache.size += 128; // heuristic, avoid many small grow events
      ensureCache.buffer = Module['_malloc'](ensureCache.size);
      assert(ensureCache.buffer);
    }
    ensureCache.pos = 0;
  },
  alloc: function(array, view) {
    assert(ensureCache.buffer);
    var bytes = view.BYTES_PER_ELEMENT;
    var len = array.length * bytes;
    len = (len + 7) & -8; // keep things aligned to 8 byte boundaries
    var ret;
    if (ensureCache.pos + len >= ensureCache.size) {
      // we failed to allocate in the buffer, ensureCache time around :(
      assert(len > 0); // null terminator, at least
      ensureCache.needed += len;
      ret = Module['_malloc'](len);
      ensureCache.temps.push(ret);
    } else {
      // we can allocate in the buffer
      ret = ensureCache.buffer + ensureCache.pos;
      ensureCache.pos += len;
    }
    return ret;
  },
  copy: function(array, view, offset) {
    var offsetShifted = offset;
    var bytes = view.BYTES_PER_ELEMENT;
    switch (bytes) {
      case 2: offsetShifted >>= 1; break;
      case 4: offsetShifted >>= 2; break;
      case 8: offsetShifted >>= 3; break;
    }
    for (var i = 0; i < array.length; i++) {
      view[offsetShifted + i] = array[i];
    }
  },
};

function ensureString(value) {
  if (typeof value === 'string') {
    var intArray = intArrayFromString(value);
    var offset = ensureCache.alloc(intArray, HEAP8);
    ensureCache.copy(intArray, HEAP8, offset);
    return offset;
  }
  return value;
}
function ensureInt8(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP8);
    ensureCache.copy(value, HEAP8, offset);
    return offset;
  }
  return value;
}
function ensureInt16(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP16);
    ensureCache.copy(value, HEAP16, offset);
    return offset;
  }
  return value;
}
function ensureInt32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP32);
    ensureCache.copy(value, HEAP32, offset);
    return offset;
  }
  return value;
}
function ensureFloat32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAPF32);
    ensureCache.copy(value, HEAPF32, offset);
    return offset;
  }
  return value;
}
function ensureFloat64(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAPF64);
    ensureCache.copy(value, HEAPF64, offset);
    return offset;
  }
  return value;
}


// ArbitraryResourceWorker
function ArbitraryResourceWorker() { throw "cannot construct a ArbitraryResourceWorker, no constructor in IDL" }
ArbitraryResourceWorker.prototype = Object.create(WrapperObject.prototype);
ArbitraryResourceWorker.prototype.constructor = ArbitraryResourceWorker;
ArbitraryResourceWorker.prototype.__class__ = ArbitraryResourceWorker;
ArbitraryResourceWorker.__cache__ = {};
Module['ArbitraryResourceWorker'] = ArbitraryResourceWorker;

  ArbitraryResourceWorker.prototype['__destroy__'] = ArbitraryResourceWorker.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
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

  InitialInstanceJSFunctorWrapper.prototype['__destroy__'] = InitialInstanceJSFunctorWrapper.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstanceJSFunctorWrapper___destroy___0(self);
};
// Behavior
/** @suppress {undefinedVars, duplicate} */function Behavior() {
  this.ptr = _emscripten_bind_Behavior_Behavior_0();
  getCache(Behavior)[this.ptr] = this;
};;
Behavior.prototype = Object.create(WrapperObject.prototype);
Behavior.prototype.constructor = Behavior;
Behavior.prototype.__class__ = Behavior;
Behavior.__cache__ = {};
Module['Behavior'] = Behavior;

Behavior.prototype['Clone'] = Behavior.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Behavior_Clone_0(self), Behavior);
};;

Behavior.prototype['SetName'] = Behavior.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Behavior_SetName_1(self, arg0);
};;

Behavior.prototype['GetName'] = Behavior.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Behavior_GetName_0(self));
};;

Behavior.prototype['GetTypeName'] = Behavior.prototype.GetTypeName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Behavior_GetTypeName_0(self));
};;

Behavior.prototype['UpdateProperty'] = Behavior.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_Behavior_UpdateProperty_3(self, arg0, arg1, arg2));
};;

Behavior.prototype['GetProperties'] = Behavior.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Behavior_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

  Behavior.prototype['__destroy__'] = Behavior.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Behavior___destroy___0(self);
};
// AbstractFileSystem
function AbstractFileSystem() { throw "cannot construct a AbstractFileSystem, no constructor in IDL" }
AbstractFileSystem.prototype = Object.create(WrapperObject.prototype);
AbstractFileSystem.prototype.constructor = AbstractFileSystem;
AbstractFileSystem.prototype.__class__ = AbstractFileSystem;
AbstractFileSystem.__cache__ = {};
Module['AbstractFileSystem'] = AbstractFileSystem;

  AbstractFileSystem.prototype['__destroy__'] = AbstractFileSystem.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_AbstractFileSystem___destroy___0(self);
};
// BehaviorsSharedData
/** @suppress {undefinedVars, duplicate} */function BehaviorsSharedData() {
  this.ptr = _emscripten_bind_BehaviorsSharedData_BehaviorsSharedData_0();
  getCache(BehaviorsSharedData)[this.ptr] = this;
};;
BehaviorsSharedData.prototype = Object.create(WrapperObject.prototype);
BehaviorsSharedData.prototype.constructor = BehaviorsSharedData;
BehaviorsSharedData.prototype.__class__ = BehaviorsSharedData;
BehaviorsSharedData.__cache__ = {};
Module['BehaviorsSharedData'] = BehaviorsSharedData;

BehaviorsSharedData.prototype['GetName'] = BehaviorsSharedData.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BehaviorsSharedData_GetName_0(self));
};;

BehaviorsSharedData.prototype['GetTypeName'] = BehaviorsSharedData.prototype.GetTypeName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BehaviorsSharedData_GetTypeName_0(self));
};;

BehaviorsSharedData.prototype['UpdateProperty'] = BehaviorsSharedData.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_BehaviorsSharedData_UpdateProperty_3(self, arg0, arg1, arg2));
};;

BehaviorsSharedData.prototype['GetProperties'] = BehaviorsSharedData.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_BehaviorsSharedData_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

BehaviorsSharedData.prototype['SerializeTo'] = BehaviorsSharedData.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_BehaviorsSharedData_SerializeTo_1(self, arg0);
};;

BehaviorsSharedData.prototype['UnserializeFrom'] = BehaviorsSharedData.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_BehaviorsSharedData_UnserializeFrom_1(self, arg0);
};;

  BehaviorsSharedData.prototype['__destroy__'] = BehaviorsSharedData.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_BehaviorsSharedData___destroy___0(self);
};
// gdObject
/** @suppress {undefinedVars, duplicate} */function gdObject(arg0) {
  ensureCache.prepare();
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

gdObject.prototype['SetName'] = gdObject.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_gdObject_SetName_1(self, arg0);
};;

gdObject.prototype['GetName'] = gdObject.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_gdObject_GetName_0(self));
};;

gdObject.prototype['SetType'] = gdObject.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_gdObject_SetType_1(self, arg0);
};;

gdObject.prototype['GetType'] = gdObject.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_gdObject_GetType_0(self));
};;

gdObject.prototype['GetProperties'] = gdObject.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_gdObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

gdObject.prototype['UpdateProperty'] = gdObject.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_gdObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

gdObject.prototype['GetInitialInstanceProperties'] = gdObject.prototype.GetInitialInstanceProperties = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_gdObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

gdObject.prototype['UpdateInitialInstanceProperty'] = gdObject.prototype.UpdateInitialInstanceProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_gdObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

gdObject.prototype['ExposeResources'] = gdObject.prototype.ExposeResources = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_gdObject_ExposeResources_1(self, arg0);
};;

gdObject.prototype['GetVariables'] = gdObject.prototype.GetVariables = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_gdObject_GetVariables_0(self), VariablesContainer);
};;

gdObject.prototype['GetAllBehaviorNames'] = gdObject.prototype.GetAllBehaviorNames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_gdObject_GetAllBehaviorNames_0(self), VectorString);
};;

gdObject.prototype['HasBehaviorNamed'] = gdObject.prototype.HasBehaviorNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_gdObject_HasBehaviorNamed_1(self, arg0));
};;

gdObject.prototype['AddNewBehavior'] = gdObject.prototype.AddNewBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_gdObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

gdObject.prototype['GetBehavior'] = gdObject.prototype.GetBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_gdObject_GetBehavior_1(self, arg0), Behavior);
};;

gdObject.prototype['RemoveBehavior'] = gdObject.prototype.RemoveBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_gdObject_RemoveBehavior_1(self, arg0);
};;

gdObject.prototype['RenameBehavior'] = gdObject.prototype.RenameBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_gdObject_RenameBehavior_2(self, arg0, arg1));
};;

gdObject.prototype['SerializeTo'] = gdObject.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_gdObject_SerializeTo_1(self, arg0);
};;

gdObject.prototype['UnserializeFrom'] = gdObject.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_gdObject_UnserializeFrom_2(self, arg0, arg1);
};;

  gdObject.prototype['__destroy__'] = gdObject.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_gdObject___destroy___0(self);
};
// Vector2f
/** @suppress {undefinedVars, duplicate} */function Vector2f() {
  this.ptr = _emscripten_bind_Vector2f_Vector2f_0();
  getCache(Vector2f)[this.ptr] = this;
};;
Vector2f.prototype = Object.create(WrapperObject.prototype);
Vector2f.prototype.constructor = Vector2f;
Vector2f.prototype.__class__ = Vector2f;
Vector2f.__cache__ = {};
Module['Vector2f'] = Vector2f;

  Vector2f.prototype['get_x'] = Vector2f.prototype.get_x = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Vector2f_get_x_0(self);
};
    Vector2f.prototype['set_x'] = Vector2f.prototype.set_x = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Vector2f_set_x_1(self, arg0);
};
  Vector2f.prototype['get_y'] = Vector2f.prototype.get_y = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Vector2f_get_y_0(self);
};
    Vector2f.prototype['set_y'] = Vector2f.prototype.set_y = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Vector2f_set_y_1(self, arg0);
};
  Vector2f.prototype['__destroy__'] = Vector2f.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Vector2f___destroy___0(self);
};
// ParticleEmitterObject
/** @suppress {undefinedVars, duplicate} */function ParticleEmitterObject(arg0) {
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_ParticleEmitterObject_ParticleEmitterObject_1(arg0);
  getCache(ParticleEmitterObject)[this.ptr] = this;
};;
ParticleEmitterObject.prototype = Object.create(WrapperObject.prototype);
ParticleEmitterObject.prototype.constructor = ParticleEmitterObject;
ParticleEmitterObject.prototype.__class__ = ParticleEmitterObject;
ParticleEmitterObject.__cache__ = {};
Module['ParticleEmitterObject'] = ParticleEmitterObject;

ParticleEmitterObject.prototype['SetRendererType'] = ParticleEmitterObject.prototype.SetRendererType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetRendererType_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetRendererType'] = ParticleEmitterObject.prototype.GetRendererType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetRendererType_0(self);
};;

ParticleEmitterObject.prototype['SetParticleTexture'] = ParticleEmitterObject.prototype.SetParticleTexture = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ParticleEmitterObject_SetParticleTexture_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleTexture'] = ParticleEmitterObject.prototype.GetParticleTexture = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ParticleEmitterObject_GetParticleTexture_0(self));
};;

ParticleEmitterObject.prototype['SetRendererParam1'] = ParticleEmitterObject.prototype.SetRendererParam1 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetRendererParam1_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetRendererParam1'] = ParticleEmitterObject.prototype.GetRendererParam1 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetRendererParam1_0(self);
};;

ParticleEmitterObject.prototype['SetRendererParam2'] = ParticleEmitterObject.prototype.SetRendererParam2 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetRendererParam2_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetRendererParam2'] = ParticleEmitterObject.prototype.GetRendererParam2 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetRendererParam2_0(self);
};;

ParticleEmitterObject.prototype['IsRenderingAdditive'] = ParticleEmitterObject.prototype.IsRenderingAdditive = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ParticleEmitterObject_IsRenderingAdditive_0(self));
};;

ParticleEmitterObject.prototype['SetRenderingAdditive'] = ParticleEmitterObject.prototype.SetRenderingAdditive = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ParticleEmitterObject_SetRenderingAdditive_0(self);
};;

ParticleEmitterObject.prototype['SetRenderingAlpha'] = ParticleEmitterObject.prototype.SetRenderingAlpha = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ParticleEmitterObject_SetRenderingAlpha_0(self);
};;

ParticleEmitterObject.prototype['SetMaxParticleNb'] = ParticleEmitterObject.prototype.SetMaxParticleNb = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetMaxParticleNb_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetMaxParticleNb'] = ParticleEmitterObject.prototype.GetMaxParticleNb = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetMaxParticleNb_0(self);
};;

ParticleEmitterObject.prototype['SetTank'] = ParticleEmitterObject.prototype.SetTank = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetTank_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetTank'] = ParticleEmitterObject.prototype.GetTank = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetTank_0(self);
};;

ParticleEmitterObject.prototype['SetFlow'] = ParticleEmitterObject.prototype.SetFlow = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetFlow_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetFlow'] = ParticleEmitterObject.prototype.GetFlow = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetFlow_0(self);
};;

ParticleEmitterObject.prototype['SetDestroyWhenNoParticles'] = ParticleEmitterObject.prototype.SetDestroyWhenNoParticles = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetDestroyWhenNoParticles_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetDestroyWhenNoParticles'] = ParticleEmitterObject.prototype.GetDestroyWhenNoParticles = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ParticleEmitterObject_GetDestroyWhenNoParticles_0(self));
};;

ParticleEmitterObject.prototype['SetEmitterForceMin'] = ParticleEmitterObject.prototype.SetEmitterForceMin = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetEmitterForceMin_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetEmitterForceMin'] = ParticleEmitterObject.prototype.GetEmitterForceMin = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetEmitterForceMin_0(self);
};;

ParticleEmitterObject.prototype['SetEmitterForceMax'] = ParticleEmitterObject.prototype.SetEmitterForceMax = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetEmitterForceMax_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetEmitterForceMax'] = ParticleEmitterObject.prototype.GetEmitterForceMax = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetEmitterForceMax_0(self);
};;

ParticleEmitterObject.prototype['SetConeSprayAngle'] = ParticleEmitterObject.prototype.SetConeSprayAngle = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetConeSprayAngle_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetConeSprayAngle'] = ParticleEmitterObject.prototype.GetConeSprayAngle = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetConeSprayAngle_0(self);
};;

ParticleEmitterObject.prototype['SetZoneRadius'] = ParticleEmitterObject.prototype.SetZoneRadius = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetZoneRadius_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetZoneRadius'] = ParticleEmitterObject.prototype.GetZoneRadius = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetZoneRadius_0(self);
};;

ParticleEmitterObject.prototype['SetParticleGravityX'] = ParticleEmitterObject.prototype.SetParticleGravityX = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleGravityX_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleGravityX'] = ParticleEmitterObject.prototype.GetParticleGravityX = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleGravityX_0(self);
};;

ParticleEmitterObject.prototype['SetParticleGravityY'] = ParticleEmitterObject.prototype.SetParticleGravityY = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleGravityY_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleGravityY'] = ParticleEmitterObject.prototype.GetParticleGravityY = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleGravityY_0(self);
};;

ParticleEmitterObject.prototype['SetParticleGravityZ'] = ParticleEmitterObject.prototype.SetParticleGravityZ = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleGravityZ_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleGravityZ'] = ParticleEmitterObject.prototype.GetParticleGravityZ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleGravityZ_0(self);
};;

ParticleEmitterObject.prototype['SetParticleGravityAngle'] = ParticleEmitterObject.prototype.SetParticleGravityAngle = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleGravityAngle_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleGravityAngle'] = ParticleEmitterObject.prototype.GetParticleGravityAngle = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleGravityAngle_0(self);
};;

ParticleEmitterObject.prototype['SetParticleGravityLength'] = ParticleEmitterObject.prototype.SetParticleGravityLength = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleGravityLength_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleGravityLength'] = ParticleEmitterObject.prototype.GetParticleGravityLength = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleGravityLength_0(self);
};;

ParticleEmitterObject.prototype['SetFriction'] = ParticleEmitterObject.prototype.SetFriction = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetFriction_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetFriction'] = ParticleEmitterObject.prototype.GetFriction = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetFriction_0(self);
};;

ParticleEmitterObject.prototype['SetParticleLifeTimeMin'] = ParticleEmitterObject.prototype.SetParticleLifeTimeMin = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleLifeTimeMin_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleLifeTimeMin'] = ParticleEmitterObject.prototype.GetParticleLifeTimeMin = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleLifeTimeMin_0(self);
};;

ParticleEmitterObject.prototype['SetParticleLifeTimeMax'] = ParticleEmitterObject.prototype.SetParticleLifeTimeMax = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleLifeTimeMax_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleLifeTimeMax'] = ParticleEmitterObject.prototype.GetParticleLifeTimeMax = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleLifeTimeMax_0(self);
};;

ParticleEmitterObject.prototype['SetParticleRed1'] = ParticleEmitterObject.prototype.SetParticleRed1 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleRed1_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleRed1'] = ParticleEmitterObject.prototype.GetParticleRed1 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleRed1_0(self);
};;

ParticleEmitterObject.prototype['SetParticleRed2'] = ParticleEmitterObject.prototype.SetParticleRed2 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleRed2_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleRed2'] = ParticleEmitterObject.prototype.GetParticleRed2 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleRed2_0(self);
};;

ParticleEmitterObject.prototype['SetParticleGreen1'] = ParticleEmitterObject.prototype.SetParticleGreen1 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleGreen1_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleGreen1'] = ParticleEmitterObject.prototype.GetParticleGreen1 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleGreen1_0(self);
};;

ParticleEmitterObject.prototype['SetParticleGreen2'] = ParticleEmitterObject.prototype.SetParticleGreen2 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleGreen2_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleGreen2'] = ParticleEmitterObject.prototype.GetParticleGreen2 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleGreen2_0(self);
};;

ParticleEmitterObject.prototype['SetParticleBlue1'] = ParticleEmitterObject.prototype.SetParticleBlue1 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleBlue1_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleBlue1'] = ParticleEmitterObject.prototype.GetParticleBlue1 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleBlue1_0(self);
};;

ParticleEmitterObject.prototype['SetParticleBlue2'] = ParticleEmitterObject.prototype.SetParticleBlue2 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleBlue2_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleBlue2'] = ParticleEmitterObject.prototype.GetParticleBlue2 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleBlue2_0(self);
};;

ParticleEmitterObject.prototype['SetParticleAlpha1'] = ParticleEmitterObject.prototype.SetParticleAlpha1 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleAlpha1_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleAlpha1'] = ParticleEmitterObject.prototype.GetParticleAlpha1 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleAlpha1_0(self);
};;

ParticleEmitterObject.prototype['SetParticleAlpha2'] = ParticleEmitterObject.prototype.SetParticleAlpha2 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleAlpha2_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleAlpha2'] = ParticleEmitterObject.prototype.GetParticleAlpha2 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleAlpha2_0(self);
};;

ParticleEmitterObject.prototype['SetParticleSize1'] = ParticleEmitterObject.prototype.SetParticleSize1 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleSize1_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleSize1'] = ParticleEmitterObject.prototype.GetParticleSize1 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleSize1_0(self);
};;

ParticleEmitterObject.prototype['SetParticleSize2'] = ParticleEmitterObject.prototype.SetParticleSize2 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleSize2_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleSize2'] = ParticleEmitterObject.prototype.GetParticleSize2 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleSize2_0(self);
};;

ParticleEmitterObject.prototype['SetParticleAngle1'] = ParticleEmitterObject.prototype.SetParticleAngle1 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleAngle1_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleAngle1'] = ParticleEmitterObject.prototype.GetParticleAngle1 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleAngle1_0(self);
};;

ParticleEmitterObject.prototype['SetParticleAngle2'] = ParticleEmitterObject.prototype.SetParticleAngle2 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleAngle2_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleAngle2'] = ParticleEmitterObject.prototype.GetParticleAngle2 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleAngle2_0(self);
};;

ParticleEmitterObject.prototype['SetParticleAlphaRandomness1'] = ParticleEmitterObject.prototype.SetParticleAlphaRandomness1 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleAlphaRandomness1_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleAlphaRandomness1'] = ParticleEmitterObject.prototype.GetParticleAlphaRandomness1 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleAlphaRandomness1_0(self);
};;

ParticleEmitterObject.prototype['SetParticleAlphaRandomness2'] = ParticleEmitterObject.prototype.SetParticleAlphaRandomness2 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleAlphaRandomness2_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleAlphaRandomness2'] = ParticleEmitterObject.prototype.GetParticleAlphaRandomness2 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleAlphaRandomness2_0(self);
};;

ParticleEmitterObject.prototype['SetParticleSizeRandomness1'] = ParticleEmitterObject.prototype.SetParticleSizeRandomness1 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleSizeRandomness1_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleSizeRandomness1'] = ParticleEmitterObject.prototype.GetParticleSizeRandomness1 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleSizeRandomness1_0(self);
};;

ParticleEmitterObject.prototype['SetParticleSizeRandomness2'] = ParticleEmitterObject.prototype.SetParticleSizeRandomness2 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleSizeRandomness2_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleSizeRandomness2'] = ParticleEmitterObject.prototype.GetParticleSizeRandomness2 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleSizeRandomness2_0(self);
};;

ParticleEmitterObject.prototype['SetParticleAngleRandomness1'] = ParticleEmitterObject.prototype.SetParticleAngleRandomness1 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleAngleRandomness1_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleAngleRandomness1'] = ParticleEmitterObject.prototype.GetParticleAngleRandomness1 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleAngleRandomness1_0(self);
};;

ParticleEmitterObject.prototype['SetParticleAngleRandomness2'] = ParticleEmitterObject.prototype.SetParticleAngleRandomness2 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SetParticleAngleRandomness2_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetParticleAngleRandomness2'] = ParticleEmitterObject.prototype.GetParticleAngleRandomness2 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParticleEmitterObject_GetParticleAngleRandomness2_0(self);
};;

ParticleEmitterObject.prototype['SetName'] = ParticleEmitterObject.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ParticleEmitterObject_SetName_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetName'] = ParticleEmitterObject.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ParticleEmitterObject_GetName_0(self));
};;

ParticleEmitterObject.prototype['SetType'] = ParticleEmitterObject.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ParticleEmitterObject_SetType_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetType'] = ParticleEmitterObject.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ParticleEmitterObject_GetType_0(self));
};;

ParticleEmitterObject.prototype['GetProperties'] = ParticleEmitterObject.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ParticleEmitterObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

ParticleEmitterObject.prototype['UpdateProperty'] = ParticleEmitterObject.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_ParticleEmitterObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

ParticleEmitterObject.prototype['GetInitialInstanceProperties'] = ParticleEmitterObject.prototype.GetInitialInstanceProperties = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_ParticleEmitterObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

ParticleEmitterObject.prototype['UpdateInitialInstanceProperty'] = ParticleEmitterObject.prototype.UpdateInitialInstanceProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_ParticleEmitterObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

ParticleEmitterObject.prototype['ExposeResources'] = ParticleEmitterObject.prototype.ExposeResources = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_ExposeResources_1(self, arg0);
};;

ParticleEmitterObject.prototype['GetVariables'] = ParticleEmitterObject.prototype.GetVariables = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ParticleEmitterObject_GetVariables_0(self), VariablesContainer);
};;

ParticleEmitterObject.prototype['GetAllBehaviorNames'] = ParticleEmitterObject.prototype.GetAllBehaviorNames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ParticleEmitterObject_GetAllBehaviorNames_0(self), VectorString);
};;

ParticleEmitterObject.prototype['HasBehaviorNamed'] = ParticleEmitterObject.prototype.HasBehaviorNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ParticleEmitterObject_HasBehaviorNamed_1(self, arg0));
};;

ParticleEmitterObject.prototype['AddNewBehavior'] = ParticleEmitterObject.prototype.AddNewBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_ParticleEmitterObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

ParticleEmitterObject.prototype['GetBehavior'] = ParticleEmitterObject.prototype.GetBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ParticleEmitterObject_GetBehavior_1(self, arg0), Behavior);
};;

ParticleEmitterObject.prototype['RemoveBehavior'] = ParticleEmitterObject.prototype.RemoveBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ParticleEmitterObject_RemoveBehavior_1(self, arg0);
};;

ParticleEmitterObject.prototype['RenameBehavior'] = ParticleEmitterObject.prototype.RenameBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_ParticleEmitterObject_RenameBehavior_2(self, arg0, arg1));
};;

ParticleEmitterObject.prototype['SerializeTo'] = ParticleEmitterObject.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParticleEmitterObject_SerializeTo_1(self, arg0);
};;

ParticleEmitterObject.prototype['UnserializeFrom'] = ParticleEmitterObject.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_ParticleEmitterObject_UnserializeFrom_2(self, arg0, arg1);
};;

  ParticleEmitterObject.prototype['__destroy__'] = ParticleEmitterObject.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ParticleEmitterObject___destroy___0(self);
};
// VectorPlatformExtension
function VectorPlatformExtension() { throw "cannot construct a VectorPlatformExtension, no constructor in IDL" }
VectorPlatformExtension.prototype = Object.create(WrapperObject.prototype);
VectorPlatformExtension.prototype.constructor = VectorPlatformExtension;
VectorPlatformExtension.prototype.__class__ = VectorPlatformExtension;
VectorPlatformExtension.__cache__ = {};
Module['VectorPlatformExtension'] = VectorPlatformExtension;

VectorPlatformExtension.prototype['size'] = VectorPlatformExtension.prototype.size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VectorPlatformExtension_size_0(self);
};;

VectorPlatformExtension.prototype['WRAPPED_at'] = VectorPlatformExtension.prototype.WRAPPED_at = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VectorPlatformExtension_WRAPPED_at_1(self, arg0), PlatformExtension);
};;

  VectorPlatformExtension.prototype['__destroy__'] = VectorPlatformExtension.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorPlatformExtension___destroy___0(self);
};
// EventsFunction
/** @suppress {undefinedVars, duplicate} */function EventsFunction() {
  this.ptr = _emscripten_bind_EventsFunction_EventsFunction_0();
  getCache(EventsFunction)[this.ptr] = this;
};;
EventsFunction.prototype = Object.create(WrapperObject.prototype);
EventsFunction.prototype.constructor = EventsFunction;
EventsFunction.prototype.__class__ = EventsFunction;
EventsFunction.__cache__ = {};
Module['EventsFunction'] = EventsFunction;

EventsFunction.prototype['SetDescription'] = EventsFunction.prototype.SetDescription = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_EventsFunction_SetDescription_1(self, arg0), EventsFunction);
};;

EventsFunction.prototype['GetDescription'] = EventsFunction.prototype.GetDescription = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventsFunction_GetDescription_0(self));
};;

EventsFunction.prototype['SetName'] = EventsFunction.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_EventsFunction_SetName_1(self, arg0), EventsFunction);
};;

EventsFunction.prototype['GetName'] = EventsFunction.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventsFunction_GetName_0(self));
};;

EventsFunction.prototype['SetFullName'] = EventsFunction.prototype.SetFullName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_EventsFunction_SetFullName_1(self, arg0), EventsFunction);
};;

EventsFunction.prototype['GetFullName'] = EventsFunction.prototype.GetFullName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventsFunction_GetFullName_0(self));
};;

EventsFunction.prototype['SetSentence'] = EventsFunction.prototype.SetSentence = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_EventsFunction_SetSentence_1(self, arg0), EventsFunction);
};;

EventsFunction.prototype['GetSentence'] = EventsFunction.prototype.GetSentence = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventsFunction_GetSentence_0(self));
};;

EventsFunction.prototype['SetFunctionType'] = EventsFunction.prototype.SetFunctionType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_EventsFunction_SetFunctionType_1(self, arg0), EventsFunction);
};;

EventsFunction.prototype['GetFunctionType'] = EventsFunction.prototype.GetFunctionType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_EventsFunction_GetFunctionType_0(self);
};;

EventsFunction.prototype['GetEvents'] = EventsFunction.prototype.GetEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_EventsFunction_GetEvents_0(self), EventsList);
};;

EventsFunction.prototype['GetParameters'] = EventsFunction.prototype.GetParameters = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_EventsFunction_GetParameters_0(self), VectorParameterMetadata);
};;

EventsFunction.prototype['GetObjectGroups'] = EventsFunction.prototype.GetObjectGroups = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_EventsFunction_GetObjectGroups_0(self), ObjectGroupsContainer);
};;

EventsFunction.prototype['SerializeTo'] = EventsFunction.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsFunction_SerializeTo_1(self, arg0);
};;

EventsFunction.prototype['UnserializeFrom'] = EventsFunction.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_EventsFunction_UnserializeFrom_2(self, arg0, arg1);
};;

  EventsFunction.prototype['__destroy__'] = EventsFunction.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_EventsFunction___destroy___0(self);
};
// PanelSpriteObject
/** @suppress {undefinedVars, duplicate} */function PanelSpriteObject(arg0) {
  ensureCache.prepare();
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

PanelSpriteObject.prototype['GetLeftMargin'] = PanelSpriteObject.prototype.GetLeftMargin = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_PanelSpriteObject_GetLeftMargin_0(self);
};;

PanelSpriteObject.prototype['SetLeftMargin'] = PanelSpriteObject.prototype.SetLeftMargin = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SetLeftMargin_1(self, arg0);
};;

PanelSpriteObject.prototype['GetTopMargin'] = PanelSpriteObject.prototype.GetTopMargin = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_PanelSpriteObject_GetTopMargin_0(self);
};;

PanelSpriteObject.prototype['SetTopMargin'] = PanelSpriteObject.prototype.SetTopMargin = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SetTopMargin_1(self, arg0);
};;

PanelSpriteObject.prototype['GetRightMargin'] = PanelSpriteObject.prototype.GetRightMargin = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_PanelSpriteObject_GetRightMargin_0(self);
};;

PanelSpriteObject.prototype['SetRightMargin'] = PanelSpriteObject.prototype.SetRightMargin = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SetRightMargin_1(self, arg0);
};;

PanelSpriteObject.prototype['GetBottomMargin'] = PanelSpriteObject.prototype.GetBottomMargin = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_PanelSpriteObject_GetBottomMargin_0(self);
};;

PanelSpriteObject.prototype['SetBottomMargin'] = PanelSpriteObject.prototype.SetBottomMargin = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SetBottomMargin_1(self, arg0);
};;

PanelSpriteObject.prototype['IsTiled'] = PanelSpriteObject.prototype.IsTiled = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_PanelSpriteObject_IsTiled_0(self));
};;

PanelSpriteObject.prototype['SetTiled'] = PanelSpriteObject.prototype.SetTiled = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SetTiled_1(self, arg0);
};;

PanelSpriteObject.prototype['SetTexture'] = PanelSpriteObject.prototype.SetTexture = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PanelSpriteObject_SetTexture_1(self, arg0);
};;

PanelSpriteObject.prototype['GetTexture'] = PanelSpriteObject.prototype.GetTexture = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PanelSpriteObject_GetTexture_0(self));
};;

PanelSpriteObject.prototype['SetWidth'] = PanelSpriteObject.prototype.SetWidth = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SetWidth_1(self, arg0);
};;

PanelSpriteObject.prototype['GetWidth'] = PanelSpriteObject.prototype.GetWidth = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_PanelSpriteObject_GetWidth_0(self);
};;

PanelSpriteObject.prototype['SetHeight'] = PanelSpriteObject.prototype.SetHeight = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SetHeight_1(self, arg0);
};;

PanelSpriteObject.prototype['GetHeight'] = PanelSpriteObject.prototype.GetHeight = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_PanelSpriteObject_GetHeight_0(self);
};;

PanelSpriteObject.prototype['SetName'] = PanelSpriteObject.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PanelSpriteObject_SetName_1(self, arg0);
};;

PanelSpriteObject.prototype['GetName'] = PanelSpriteObject.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PanelSpriteObject_GetName_0(self));
};;

PanelSpriteObject.prototype['SetType'] = PanelSpriteObject.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PanelSpriteObject_SetType_1(self, arg0);
};;

PanelSpriteObject.prototype['GetType'] = PanelSpriteObject.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PanelSpriteObject_GetType_0(self));
};;

PanelSpriteObject.prototype['GetProperties'] = PanelSpriteObject.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_PanelSpriteObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

PanelSpriteObject.prototype['UpdateProperty'] = PanelSpriteObject.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_PanelSpriteObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

PanelSpriteObject.prototype['GetInitialInstanceProperties'] = PanelSpriteObject.prototype.GetInitialInstanceProperties = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_PanelSpriteObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

PanelSpriteObject.prototype['UpdateInitialInstanceProperty'] = PanelSpriteObject.prototype.UpdateInitialInstanceProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_PanelSpriteObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

PanelSpriteObject.prototype['ExposeResources'] = PanelSpriteObject.prototype.ExposeResources = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_ExposeResources_1(self, arg0);
};;

PanelSpriteObject.prototype['GetVariables'] = PanelSpriteObject.prototype.GetVariables = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PanelSpriteObject_GetVariables_0(self), VariablesContainer);
};;

PanelSpriteObject.prototype['GetAllBehaviorNames'] = PanelSpriteObject.prototype.GetAllBehaviorNames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PanelSpriteObject_GetAllBehaviorNames_0(self), VectorString);
};;

PanelSpriteObject.prototype['HasBehaviorNamed'] = PanelSpriteObject.prototype.HasBehaviorNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_PanelSpriteObject_HasBehaviorNamed_1(self, arg0));
};;

PanelSpriteObject.prototype['AddNewBehavior'] = PanelSpriteObject.prototype.AddNewBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_PanelSpriteObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

PanelSpriteObject.prototype['GetBehavior'] = PanelSpriteObject.prototype.GetBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PanelSpriteObject_GetBehavior_1(self, arg0), Behavior);
};;

PanelSpriteObject.prototype['RemoveBehavior'] = PanelSpriteObject.prototype.RemoveBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PanelSpriteObject_RemoveBehavior_1(self, arg0);
};;

PanelSpriteObject.prototype['RenameBehavior'] = PanelSpriteObject.prototype.RenameBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_PanelSpriteObject_RenameBehavior_2(self, arg0, arg1));
};;

PanelSpriteObject.prototype['SerializeTo'] = PanelSpriteObject.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PanelSpriteObject_SerializeTo_1(self, arg0);
};;

PanelSpriteObject.prototype['UnserializeFrom'] = PanelSpriteObject.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_PanelSpriteObject_UnserializeFrom_2(self, arg0, arg1);
};;

  PanelSpriteObject.prototype['__destroy__'] = PanelSpriteObject.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_PanelSpriteObject___destroy___0(self);
};
// ObjectGroup
/** @suppress {undefinedVars, duplicate} */function ObjectGroup() {
  this.ptr = _emscripten_bind_ObjectGroup_ObjectGroup_0();
  getCache(ObjectGroup)[this.ptr] = this;
};;
ObjectGroup.prototype = Object.create(WrapperObject.prototype);
ObjectGroup.prototype.constructor = ObjectGroup;
ObjectGroup.prototype.__class__ = ObjectGroup;
ObjectGroup.__cache__ = {};
Module['ObjectGroup'] = ObjectGroup;

ObjectGroup.prototype['GetName'] = ObjectGroup.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ObjectGroup_GetName_0(self));
};;

ObjectGroup.prototype['SetName'] = ObjectGroup.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ObjectGroup_SetName_1(self, arg0);
};;

ObjectGroup.prototype['AddObject'] = ObjectGroup.prototype.AddObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ObjectGroup_AddObject_1(self, arg0);
};;

ObjectGroup.prototype['RemoveObject'] = ObjectGroup.prototype.RemoveObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ObjectGroup_RemoveObject_1(self, arg0);
};;

ObjectGroup.prototype['Find'] = ObjectGroup.prototype.Find = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ObjectGroup_Find_1(self, arg0));
};;

ObjectGroup.prototype['GetAllObjectsNames'] = ObjectGroup.prototype.GetAllObjectsNames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ObjectGroup_GetAllObjectsNames_0(self), VectorString);
};;

ObjectGroup.prototype['SerializeTo'] = ObjectGroup.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ObjectGroup_SerializeTo_1(self, arg0);
};;

ObjectGroup.prototype['UnserializeFrom'] = ObjectGroup.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ObjectGroup_UnserializeFrom_1(self, arg0);
};;

  ObjectGroup.prototype['__destroy__'] = ObjectGroup.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ObjectGroup___destroy___0(self);
};
// Direction
/** @suppress {undefinedVars, duplicate} */function Direction() {
  this.ptr = _emscripten_bind_Direction_Direction_0();
  getCache(Direction)[this.ptr] = this;
};;
Direction.prototype = Object.create(WrapperObject.prototype);
Direction.prototype.constructor = Direction;
Direction.prototype.__class__ = Direction;
Direction.__cache__ = {};
Module['Direction'] = Direction;

Direction.prototype['AddSprite'] = Direction.prototype.AddSprite = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Direction_AddSprite_1(self, arg0);
};;

Direction.prototype['GetSprite'] = Direction.prototype.GetSprite = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Direction_GetSprite_1(self, arg0), Sprite);
};;

Direction.prototype['GetSpritesCount'] = Direction.prototype.GetSpritesCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Direction_GetSpritesCount_0(self);
};;

Direction.prototype['HasNoSprites'] = Direction.prototype.HasNoSprites = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Direction_HasNoSprites_0(self));
};;

Direction.prototype['RemoveSprite'] = Direction.prototype.RemoveSprite = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Direction_RemoveSprite_1(self, arg0);
};;

Direction.prototype['RemoveAllSprites'] = Direction.prototype.RemoveAllSprites = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Direction_RemoveAllSprites_0(self);
};;

Direction.prototype['IsLooping'] = Direction.prototype.IsLooping = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Direction_IsLooping_0(self));
};;

Direction.prototype['SetLoop'] = Direction.prototype.SetLoop = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Direction_SetLoop_1(self, arg0);
};;

Direction.prototype['GetTimeBetweenFrames'] = Direction.prototype.GetTimeBetweenFrames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Direction_GetTimeBetweenFrames_0(self);
};;

Direction.prototype['SetTimeBetweenFrames'] = Direction.prototype.SetTimeBetweenFrames = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Direction_SetTimeBetweenFrames_1(self, arg0);
};;

Direction.prototype['SwapSprites'] = Direction.prototype.SwapSprites = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Direction_SwapSprites_2(self, arg0, arg1);
};;

Direction.prototype['MoveSprite'] = Direction.prototype.MoveSprite = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Direction_MoveSprite_2(self, arg0, arg1);
};;

Direction.prototype['SetMetadata'] = Direction.prototype.SetMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Direction_SetMetadata_1(self, arg0);
};;

Direction.prototype['GetMetadata'] = Direction.prototype.GetMetadata = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Direction_GetMetadata_0(self));
};;

  Direction.prototype['__destroy__'] = Direction.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Direction___destroy___0(self);
};
// FontResource
/** @suppress {undefinedVars, duplicate} */function FontResource() {
  this.ptr = _emscripten_bind_FontResource_FontResource_0();
  getCache(FontResource)[this.ptr] = this;
};;
FontResource.prototype = Object.create(WrapperObject.prototype);
FontResource.prototype.constructor = FontResource;
FontResource.prototype.__class__ = FontResource;
FontResource.__cache__ = {};
Module['FontResource'] = FontResource;

FontResource.prototype['Clone'] = FontResource.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_FontResource_Clone_0(self), Resource);
};;

FontResource.prototype['SetName'] = FontResource.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_FontResource_SetName_1(self, arg0);
};;

FontResource.prototype['GetName'] = FontResource.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_FontResource_GetName_0(self));
};;

FontResource.prototype['SetKind'] = FontResource.prototype.SetKind = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_FontResource_SetKind_1(self, arg0);
};;

FontResource.prototype['GetKind'] = FontResource.prototype.GetKind = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_FontResource_GetKind_0(self));
};;

FontResource.prototype['IsUserAdded'] = FontResource.prototype.IsUserAdded = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_FontResource_IsUserAdded_0(self));
};;

FontResource.prototype['SetUserAdded'] = FontResource.prototype.SetUserAdded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_FontResource_SetUserAdded_1(self, arg0);
};;

FontResource.prototype['UseFile'] = FontResource.prototype.UseFile = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_FontResource_UseFile_0(self));
};;

FontResource.prototype['SetFile'] = FontResource.prototype.SetFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_FontResource_SetFile_1(self, arg0);
};;

FontResource.prototype['GetFile'] = FontResource.prototype.GetFile = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_FontResource_GetFile_0(self));
};;

FontResource.prototype['GetAbsoluteFile'] = FontResource.prototype.GetAbsoluteFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_FontResource_GetAbsoluteFile_1(self, arg0));
};;

FontResource.prototype['SetMetadata'] = FontResource.prototype.SetMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_FontResource_SetMetadata_1(self, arg0);
};;

FontResource.prototype['GetMetadata'] = FontResource.prototype.GetMetadata = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_FontResource_GetMetadata_0(self));
};;

FontResource.prototype['GetProperties'] = FontResource.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_FontResource_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

FontResource.prototype['UpdateProperty'] = FontResource.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_FontResource_UpdateProperty_3(self, arg0, arg1, arg2));
};;

FontResource.prototype['SerializeTo'] = FontResource.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_FontResource_SerializeTo_1(self, arg0);
};;

FontResource.prototype['UnserializeFrom'] = FontResource.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_FontResource_UnserializeFrom_1(self, arg0);
};;

  FontResource.prototype['__destroy__'] = FontResource.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_FontResource___destroy___0(self);
};
// PairStringVariable
/** @suppress {undefinedVars, duplicate} */function PairStringVariable() {
  this.ptr = _emscripten_bind_PairStringVariable_PairStringVariable_0();
  getCache(PairStringVariable)[this.ptr] = this;
};;
PairStringVariable.prototype = Object.create(WrapperObject.prototype);
PairStringVariable.prototype.constructor = PairStringVariable;
PairStringVariable.prototype.__class__ = PairStringVariable;
PairStringVariable.__cache__ = {};
Module['PairStringVariable'] = PairStringVariable;

PairStringVariable.prototype['WRAPPED_GetName'] = PairStringVariable.prototype.WRAPPED_GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PairStringVariable_WRAPPED_GetName_0(self));
};;

PairStringVariable.prototype['WRAPPED_GetVariable'] = PairStringVariable.prototype.WRAPPED_GetVariable = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PairStringVariable_WRAPPED_GetVariable_0(self), Variable);
};;

  PairStringVariable.prototype['__destroy__'] = PairStringVariable.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_PairStringVariable___destroy___0(self);
};
// ObjectJsImplementation
/** @suppress {undefinedVars, duplicate} */function ObjectJsImplementation(arg0) {
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_ObjectJsImplementation_ObjectJsImplementation_1(arg0);
  getCache(ObjectJsImplementation)[this.ptr] = this;
};;
ObjectJsImplementation.prototype = Object.create(gdObject.prototype);
ObjectJsImplementation.prototype.constructor = ObjectJsImplementation;
ObjectJsImplementation.prototype.__class__ = ObjectJsImplementation;
ObjectJsImplementation.__cache__ = {};
Module['ObjectJsImplementation'] = ObjectJsImplementation;

ObjectJsImplementation.prototype['Clone'] = ObjectJsImplementation.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ObjectJsImplementation_Clone_0(self), UniquePtrObject);
};;

ObjectJsImplementation.prototype['GetProperties'] = ObjectJsImplementation.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ObjectJsImplementation_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

ObjectJsImplementation.prototype['UpdateProperty'] = ObjectJsImplementation.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_ObjectJsImplementation_UpdateProperty_3(self, arg0, arg1, arg2));
};;

ObjectJsImplementation.prototype['GetInitialInstanceProperties'] = ObjectJsImplementation.prototype.GetInitialInstanceProperties = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_ObjectJsImplementation_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

ObjectJsImplementation.prototype['UpdateInitialInstanceProperty'] = ObjectJsImplementation.prototype.UpdateInitialInstanceProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_ObjectJsImplementation_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

ObjectJsImplementation.prototype['GetRawJSONContent'] = ObjectJsImplementation.prototype.GetRawJSONContent = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ObjectJsImplementation_GetRawJSONContent_0(self));
};;

ObjectJsImplementation.prototype['SetRawJSONContent'] = ObjectJsImplementation.prototype.SetRawJSONContent = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ObjectJsImplementation_SetRawJSONContent_1(self, arg0), ObjectJsImplementation);
};;

ObjectJsImplementation.prototype['SerializeTo'] = ObjectJsImplementation.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ObjectJsImplementation_SerializeTo_1(self, arg0);
};;

ObjectJsImplementation.prototype['UnserializeFrom'] = ObjectJsImplementation.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_ObjectJsImplementation_UnserializeFrom_2(self, arg0, arg1);
};;

  ObjectJsImplementation.prototype['__destroy__'] = ObjectJsImplementation.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ObjectJsImplementation___destroy___0(self);
};
// ExtraInformation
function ExtraInformation() { throw "cannot construct a ExtraInformation, no constructor in IDL" }
ExtraInformation.prototype = Object.create(WrapperObject.prototype);
ExtraInformation.prototype.constructor = ExtraInformation;
ExtraInformation.prototype.__class__ = ExtraInformation;
ExtraInformation.__cache__ = {};
Module['ExtraInformation'] = ExtraInformation;

ExtraInformation.prototype['SetFunctionName'] = ExtraInformation.prototype.SetFunctionName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ExtraInformation_SetFunctionName_1(self, arg0), ExtraInformation);
};;

ExtraInformation.prototype['SetManipulatedType'] = ExtraInformation.prototype.SetManipulatedType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ExtraInformation_SetManipulatedType_1(self, arg0), ExtraInformation);
};;

ExtraInformation.prototype['SetGetter'] = ExtraInformation.prototype.SetGetter = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ExtraInformation_SetGetter_1(self, arg0), ExtraInformation);
};;

ExtraInformation.prototype['SetMutators'] = ExtraInformation.prototype.SetMutators = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ExtraInformation_SetMutators_1(self, arg0), ExtraInformation);
};;

ExtraInformation.prototype['SetIncludeFile'] = ExtraInformation.prototype.SetIncludeFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ExtraInformation_SetIncludeFile_1(self, arg0), ExtraInformation);
};;

ExtraInformation.prototype['AddIncludeFile'] = ExtraInformation.prototype.AddIncludeFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ExtraInformation_AddIncludeFile_1(self, arg0), ExtraInformation);
};;

  ExtraInformation.prototype['__destroy__'] = ExtraInformation.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExtraInformation___destroy___0(self);
};
// ResourcesManager
/** @suppress {undefinedVars, duplicate} */function ResourcesManager() {
  this.ptr = _emscripten_bind_ResourcesManager_ResourcesManager_0();
  getCache(ResourcesManager)[this.ptr] = this;
};;
ResourcesManager.prototype = Object.create(WrapperObject.prototype);
ResourcesManager.prototype.constructor = ResourcesManager;
ResourcesManager.prototype.__class__ = ResourcesManager;
ResourcesManager.__cache__ = {};
Module['ResourcesManager'] = ResourcesManager;

ResourcesManager.prototype['GetAllResourceNames'] = ResourcesManager.prototype.GetAllResourceNames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ResourcesManager_GetAllResourceNames_0(self), VectorString);
};;

ResourcesManager.prototype['HasResource'] = ResourcesManager.prototype.HasResource = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ResourcesManager_HasResource_1(self, arg0));
};;

ResourcesManager.prototype['GetResource'] = ResourcesManager.prototype.GetResource = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ResourcesManager_GetResource_1(self, arg0), Resource);
};;

ResourcesManager.prototype['AddResource'] = ResourcesManager.prototype.AddResource = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return !!(_emscripten_bind_ResourcesManager_AddResource_1(self, arg0));
};;

ResourcesManager.prototype['RemoveResource'] = ResourcesManager.prototype.RemoveResource = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ResourcesManager_RemoveResource_1(self, arg0);
};;

ResourcesManager.prototype['RenameResource'] = ResourcesManager.prototype.RenameResource = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_ResourcesManager_RenameResource_2(self, arg0, arg1);
};;

ResourcesManager.prototype['GetResourcePosition'] = ResourcesManager.prototype.GetResourcePosition = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_ResourcesManager_GetResourcePosition_1(self, arg0);
};;

ResourcesManager.prototype['MoveResourceUpInList'] = ResourcesManager.prototype.MoveResourceUpInList = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ResourcesManager_MoveResourceUpInList_1(self, arg0));
};;

ResourcesManager.prototype['MoveResourceDownInList'] = ResourcesManager.prototype.MoveResourceDownInList = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ResourcesManager_MoveResourceDownInList_1(self, arg0));
};;

ResourcesManager.prototype['MoveResource'] = ResourcesManager.prototype.MoveResource = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_ResourcesManager_MoveResource_2(self, arg0, arg1);
};;

  ResourcesManager.prototype['__destroy__'] = ResourcesManager.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ResourcesManager___destroy___0(self);
};
// Project
/** @suppress {undefinedVars, duplicate} */function Project() {
  this.ptr = _emscripten_bind_Project_Project_0();
  getCache(Project)[this.ptr] = this;
};;
Project.prototype = Object.create(WrapperObject.prototype);
Project.prototype.constructor = Project;
Project.prototype.__class__ = Project;
Project.__cache__ = {};
Module['Project'] = Project;

Project.prototype['SetName'] = Project.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetName_1(self, arg0);
};;

Project.prototype['GetName'] = Project.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetName_0(self));
};;

Project.prototype['SetVersion'] = Project.prototype.SetVersion = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetVersion_1(self, arg0);
};;

Project.prototype['GetVersion'] = Project.prototype.GetVersion = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetVersion_0(self));
};;

Project.prototype['SetAuthor'] = Project.prototype.SetAuthor = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetAuthor_1(self, arg0);
};;

Project.prototype['GetAuthor'] = Project.prototype.GetAuthor = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetAuthor_0(self));
};;

Project.prototype['SetPackageName'] = Project.prototype.SetPackageName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetPackageName_1(self, arg0);
};;

Project.prototype['GetPackageName'] = Project.prototype.GetPackageName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetPackageName_0(self));
};;

Project.prototype['SetOrientation'] = Project.prototype.SetOrientation = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetOrientation_1(self, arg0);
};;

Project.prototype['GetOrientation'] = Project.prototype.GetOrientation = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetOrientation_0(self));
};;

Project.prototype['SetAdMobAppId'] = Project.prototype.SetAdMobAppId = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetAdMobAppId_1(self, arg0);
};;

Project.prototype['GetAdMobAppId'] = Project.prototype.GetAdMobAppId = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetAdMobAppId_0(self));
};;

Project.prototype['SetProjectFile'] = Project.prototype.SetProjectFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetProjectFile_1(self, arg0);
};;

Project.prototype['GetProjectFile'] = Project.prototype.GetProjectFile = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetProjectFile_0(self));
};;

Project.prototype['SetDefaultWidth'] = Project.prototype.SetDefaultWidth = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_SetDefaultWidth_1(self, arg0);
};;

Project.prototype['GetMainWindowDefaultWidth'] = Project.prototype.GetMainWindowDefaultWidth = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetMainWindowDefaultWidth_0(self);
};;

Project.prototype['SetDefaultHeight'] = Project.prototype.SetDefaultHeight = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_SetDefaultHeight_1(self, arg0);
};;

Project.prototype['GetMainWindowDefaultHeight'] = Project.prototype.GetMainWindowDefaultHeight = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetMainWindowDefaultHeight_0(self);
};;

Project.prototype['SetScaleMode'] = Project.prototype.SetScaleMode = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetScaleMode_1(self, arg0);
};;

Project.prototype['GetScaleMode'] = Project.prototype.GetScaleMode = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetScaleMode_0(self));
};;

Project.prototype['SetSizeOnStartupMode'] = Project.prototype.SetSizeOnStartupMode = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetSizeOnStartupMode_1(self, arg0);
};;

Project.prototype['GetSizeOnStartupMode'] = Project.prototype.GetSizeOnStartupMode = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetSizeOnStartupMode_0(self));
};;

Project.prototype['GetMaximumFPS'] = Project.prototype.GetMaximumFPS = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetMaximumFPS_0(self);
};;

Project.prototype['SetMaximumFPS'] = Project.prototype.SetMaximumFPS = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_SetMaximumFPS_1(self, arg0);
};;

Project.prototype['GetMinimumFPS'] = Project.prototype.GetMinimumFPS = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetMinimumFPS_0(self);
};;

Project.prototype['SetMinimumFPS'] = Project.prototype.SetMinimumFPS = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_SetMinimumFPS_1(self, arg0);
};;

Project.prototype['SetLastCompilationDirectory'] = Project.prototype.SetLastCompilationDirectory = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetLastCompilationDirectory_1(self, arg0);
};;

Project.prototype['GetLastCompilationDirectory'] = Project.prototype.GetLastCompilationDirectory = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetLastCompilationDirectory_0(self));
};;

Project.prototype['GetUsedExtensions'] = Project.prototype.GetUsedExtensions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Project_GetUsedExtensions_0(self), VectorString);
};;

Project.prototype['AddPlatform'] = Project.prototype.AddPlatform = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_AddPlatform_1(self, arg0);
};;

Project.prototype['GetCurrentPlatform'] = Project.prototype.GetCurrentPlatform = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Project_GetCurrentPlatform_0(self), Platform);
};;

Project.prototype['GetPlatformSpecificAssets'] = Project.prototype.GetPlatformSpecificAssets = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Project_GetPlatformSpecificAssets_0(self), PlatformSpecificAssets);
};;

Project.prototype['GetLoadingScreen'] = Project.prototype.GetLoadingScreen = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Project_GetLoadingScreen_0(self), LoadingScreen);
};;

Project.prototype['HasLayoutNamed'] = Project.prototype.HasLayoutNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Project_HasLayoutNamed_1(self, arg0));
};;

Project.prototype['GetLayout'] = Project.prototype.GetLayout = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Project_GetLayout_1(self, arg0), Layout);
};;

Project.prototype['GetLayoutAt'] = Project.prototype.GetLayoutAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Project_GetLayoutAt_1(self, arg0), Layout);
};;

Project.prototype['SwapLayouts'] = Project.prototype.SwapLayouts = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Project_SwapLayouts_2(self, arg0, arg1);
};;

Project.prototype['GetLayoutsCount'] = Project.prototype.GetLayoutsCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetLayoutsCount_0(self);
};;

Project.prototype['InsertNewLayout'] = Project.prototype.InsertNewLayout = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_Project_InsertNewLayout_2(self, arg0, arg1), Layout);
};;

Project.prototype['RemoveLayout'] = Project.prototype.RemoveLayout = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_RemoveLayout_1(self, arg0);
};;

Project.prototype['SetFirstLayout'] = Project.prototype.SetFirstLayout = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_SetFirstLayout_1(self, arg0);
};;

Project.prototype['GetFirstLayout'] = Project.prototype.GetFirstLayout = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Project_GetFirstLayout_0(self));
};;

Project.prototype['HasExternalEventsNamed'] = Project.prototype.HasExternalEventsNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Project_HasExternalEventsNamed_1(self, arg0));
};;

Project.prototype['GetExternalEvents'] = Project.prototype.GetExternalEvents = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Project_GetExternalEvents_1(self, arg0), ExternalEvents);
};;

Project.prototype['GetExternalEventsAt'] = Project.prototype.GetExternalEventsAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Project_GetExternalEventsAt_1(self, arg0), ExternalEvents);
};;

Project.prototype['SwapExternalEvents'] = Project.prototype.SwapExternalEvents = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Project_SwapExternalEvents_2(self, arg0, arg1);
};;

Project.prototype['GetExternalEventsCount'] = Project.prototype.GetExternalEventsCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetExternalEventsCount_0(self);
};;

Project.prototype['InsertNewExternalEvents'] = Project.prototype.InsertNewExternalEvents = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_Project_InsertNewExternalEvents_2(self, arg0, arg1), ExternalEvents);
};;

Project.prototype['RemoveExternalEvents'] = Project.prototype.RemoveExternalEvents = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_RemoveExternalEvents_1(self, arg0);
};;

Project.prototype['HasExternalLayoutNamed'] = Project.prototype.HasExternalLayoutNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Project_HasExternalLayoutNamed_1(self, arg0));
};;

Project.prototype['GetExternalLayout'] = Project.prototype.GetExternalLayout = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Project_GetExternalLayout_1(self, arg0), ExternalLayout);
};;

Project.prototype['GetExternalLayoutAt'] = Project.prototype.GetExternalLayoutAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Project_GetExternalLayoutAt_1(self, arg0), ExternalLayout);
};;

Project.prototype['SwapExternalLayouts'] = Project.prototype.SwapExternalLayouts = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Project_SwapExternalLayouts_2(self, arg0, arg1);
};;

Project.prototype['GetExternalLayoutsCount'] = Project.prototype.GetExternalLayoutsCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetExternalLayoutsCount_0(self);
};;

Project.prototype['InsertNewExternalLayout'] = Project.prototype.InsertNewExternalLayout = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_Project_InsertNewExternalLayout_2(self, arg0, arg1), ExternalLayout);
};;

Project.prototype['RemoveExternalLayout'] = Project.prototype.RemoveExternalLayout = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_RemoveExternalLayout_1(self, arg0);
};;

Project.prototype['HasEventsFunctionsExtensionNamed'] = Project.prototype.HasEventsFunctionsExtensionNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Project_HasEventsFunctionsExtensionNamed_1(self, arg0));
};;

Project.prototype['GetEventsFunctionsExtension'] = Project.prototype.GetEventsFunctionsExtension = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Project_GetEventsFunctionsExtension_1(self, arg0), EventsFunctionsExtension);
};;

Project.prototype['GetEventsFunctionsExtensionAt'] = Project.prototype.GetEventsFunctionsExtensionAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Project_GetEventsFunctionsExtensionAt_1(self, arg0), EventsFunctionsExtension);
};;

Project.prototype['SwapEventsFunctionsExtensions'] = Project.prototype.SwapEventsFunctionsExtensions = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Project_SwapEventsFunctionsExtensions_2(self, arg0, arg1);
};;

Project.prototype['GetEventsFunctionsExtensionsCount'] = Project.prototype.GetEventsFunctionsExtensionsCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetEventsFunctionsExtensionsCount_0(self);
};;

Project.prototype['InsertNewEventsFunctionsExtension'] = Project.prototype.InsertNewEventsFunctionsExtension = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_Project_InsertNewEventsFunctionsExtension_2(self, arg0, arg1), EventsFunctionsExtension);
};;

Project.prototype['RemoveEventsFunctionsExtension'] = Project.prototype.RemoveEventsFunctionsExtension = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_RemoveEventsFunctionsExtension_1(self, arg0);
};;

Project.prototype['GetVariables'] = Project.prototype.GetVariables = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Project_GetVariables_0(self), VariablesContainer);
};;

Project.prototype['GetResourcesManager'] = Project.prototype.GetResourcesManager = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Project_GetResourcesManager_0(self), ResourcesManager);
};;

Project.prototype['ExposeResources'] = Project.prototype.ExposeResources = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_ExposeResources_1(self, arg0);
};;

Project.prototype['STATIC_ValidateObjectName'] = Project.prototype.STATIC_ValidateObjectName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Project_STATIC_ValidateObjectName_1(self, arg0));
};;

Project.prototype['IsDirty'] = Project.prototype.IsDirty = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Project_IsDirty_0(self));
};;

Project.prototype['SerializeTo'] = Project.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_SerializeTo_1(self, arg0);
};;

Project.prototype['UnserializeFrom'] = Project.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Project_UnserializeFrom_1(self, arg0);
};;

Project.prototype['FREE_GetTypeOfBehavior'] = Project.prototype.FREE_GetTypeOfBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return Pointer_stringify(_emscripten_bind_Project_FREE_GetTypeOfBehavior_3(self, arg0, arg1, arg2));
};;

Project.prototype['FREE_GetTypeOfObject'] = Project.prototype.FREE_GetTypeOfObject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return Pointer_stringify(_emscripten_bind_Project_FREE_GetTypeOfObject_3(self, arg0, arg1, arg2));
};;

Project.prototype['FREE_GetBehaviorsOfObject'] = Project.prototype.FREE_GetBehaviorsOfObject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_Project_FREE_GetBehaviorsOfObject_3(self, arg0, arg1, arg2), VectorString);
};;

Project.prototype['InsertNewObject'] = Project.prototype.InsertNewObject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return wrapPointer(_emscripten_bind_Project_InsertNewObject_4(self, arg0, arg1, arg2, arg3), gdObject);
};;

Project.prototype['InsertObject'] = Project.prototype.InsertObject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_Project_InsertObject_2(self, arg0, arg1), gdObject);
};;

Project.prototype['HasObjectNamed'] = Project.prototype.HasObjectNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Project_HasObjectNamed_1(self, arg0));
};;

Project.prototype['GetObject'] = Project.prototype.GetObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Project_GetObject_1(self, arg0), gdObject);
};;

Project.prototype['GetObjectAt'] = Project.prototype.GetObjectAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Project_GetObjectAt_1(self, arg0), gdObject);
};;

Project.prototype['GetObjectPosition'] = Project.prototype.GetObjectPosition = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_Project_GetObjectPosition_1(self, arg0);
};;

Project.prototype['RemoveObject'] = Project.prototype.RemoveObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Project_RemoveObject_1(self, arg0);
};;

Project.prototype['SwapObjects'] = Project.prototype.SwapObjects = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Project_SwapObjects_2(self, arg0, arg1);
};;

Project.prototype['MoveObject'] = Project.prototype.MoveObject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Project_MoveObject_2(self, arg0, arg1);
};;

Project.prototype['GetObjectsCount'] = Project.prototype.GetObjectsCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Project_GetObjectsCount_0(self);
};;

Project.prototype['GetObjectGroups'] = Project.prototype.GetObjectGroups = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Project_GetObjectGroups_0(self), ObjectGroupsContainer);
};;

  Project.prototype['__destroy__'] = Project.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Project___destroy___0(self);
};
// ExpressionParser2NodeWorker
function ExpressionParser2NodeWorker() { throw "cannot construct a ExpressionParser2NodeWorker, no constructor in IDL" }
ExpressionParser2NodeWorker.prototype = Object.create(WrapperObject.prototype);
ExpressionParser2NodeWorker.prototype.constructor = ExpressionParser2NodeWorker;
ExpressionParser2NodeWorker.prototype.__class__ = ExpressionParser2NodeWorker;
ExpressionParser2NodeWorker.__cache__ = {};
Module['ExpressionParser2NodeWorker'] = ExpressionParser2NodeWorker;

  ExpressionParser2NodeWorker.prototype['__destroy__'] = ExpressionParser2NodeWorker.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExpressionParser2NodeWorker___destroy___0(self);
};
// Layer
/** @suppress {undefinedVars, duplicate} */function Layer() {
  this.ptr = _emscripten_bind_Layer_Layer_0();
  getCache(Layer)[this.ptr] = this;
};;
Layer.prototype = Object.create(WrapperObject.prototype);
Layer.prototype.constructor = Layer;
Layer.prototype.__class__ = Layer;
Layer.__cache__ = {};
Module['Layer'] = Layer;

Layer.prototype['SetName'] = Layer.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Layer_SetName_1(self, arg0);
};;

Layer.prototype['GetName'] = Layer.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Layer_GetName_0(self));
};;

Layer.prototype['SetVisibility'] = Layer.prototype.SetVisibility = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Layer_SetVisibility_1(self, arg0);
};;

Layer.prototype['GetVisibility'] = Layer.prototype.GetVisibility = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Layer_GetVisibility_0(self));
};;

  Layer.prototype['__destroy__'] = Layer.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
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

BehaviorMetadata.prototype['GetFullName'] = BehaviorMetadata.prototype.GetFullName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BehaviorMetadata_GetFullName_0(self));
};;

BehaviorMetadata.prototype['GetDefaultName'] = BehaviorMetadata.prototype.GetDefaultName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BehaviorMetadata_GetDefaultName_0(self));
};;

BehaviorMetadata.prototype['GetDescription'] = BehaviorMetadata.prototype.GetDescription = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BehaviorMetadata_GetDescription_0(self));
};;

BehaviorMetadata.prototype['GetGroup'] = BehaviorMetadata.prototype.GetGroup = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BehaviorMetadata_GetGroup_0(self));
};;

BehaviorMetadata.prototype['GetIconFilename'] = BehaviorMetadata.prototype.GetIconFilename = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BehaviorMetadata_GetIconFilename_0(self));
};;

BehaviorMetadata.prototype['AddCondition'] = BehaviorMetadata.prototype.AddCondition = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  if (arg5 && typeof arg5 === 'object') arg5 = arg5.ptr;
  else arg5 = ensureString(arg5);
  if (arg6 && typeof arg6 === 'object') arg6 = arg6.ptr;
  else arg6 = ensureString(arg6);
  return wrapPointer(_emscripten_bind_BehaviorMetadata_AddCondition_7(self, arg0, arg1, arg2, arg3, arg4, arg5, arg6), InstructionMetadata);
};;

BehaviorMetadata.prototype['AddAction'] = BehaviorMetadata.prototype.AddAction = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  if (arg5 && typeof arg5 === 'object') arg5 = arg5.ptr;
  else arg5 = ensureString(arg5);
  if (arg6 && typeof arg6 === 'object') arg6 = arg6.ptr;
  else arg6 = ensureString(arg6);
  return wrapPointer(_emscripten_bind_BehaviorMetadata_AddAction_7(self, arg0, arg1, arg2, arg3, arg4, arg5, arg6), InstructionMetadata);
};;

BehaviorMetadata.prototype['AddExpression'] = BehaviorMetadata.prototype.AddExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  return wrapPointer(_emscripten_bind_BehaviorMetadata_AddExpression_5(self, arg0, arg1, arg2, arg3, arg4), ExpressionMetadata);
};;

BehaviorMetadata.prototype['AddStrExpression'] = BehaviorMetadata.prototype.AddStrExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  return wrapPointer(_emscripten_bind_BehaviorMetadata_AddStrExpression_5(self, arg0, arg1, arg2, arg3, arg4), ExpressionMetadata);
};;

BehaviorMetadata.prototype['SetIncludeFile'] = BehaviorMetadata.prototype.SetIncludeFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_BehaviorMetadata_SetIncludeFile_1(self, arg0), BehaviorMetadata);
};;

BehaviorMetadata.prototype['AddIncludeFile'] = BehaviorMetadata.prototype.AddIncludeFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_BehaviorMetadata_AddIncludeFile_1(self, arg0), BehaviorMetadata);
};;

BehaviorMetadata.prototype['WRAPPED_Get'] = BehaviorMetadata.prototype.WRAPPED_Get = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BehaviorMetadata_WRAPPED_Get_0(self), Behavior);
};;

BehaviorMetadata.prototype['WRAPPED_GetSharedDataInstance'] = BehaviorMetadata.prototype.WRAPPED_GetSharedDataInstance = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BehaviorMetadata_WRAPPED_GetSharedDataInstance_0(self), BehaviorsSharedData);
};;

  BehaviorMetadata.prototype['__destroy__'] = BehaviorMetadata.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_BehaviorMetadata___destroy___0(self);
};
// EventsParametersLister
/** @suppress {undefinedVars, duplicate} */function EventsParametersLister(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  this.ptr = _emscripten_bind_EventsParametersLister_EventsParametersLister_1(arg0);
  getCache(EventsParametersLister)[this.ptr] = this;
};;
EventsParametersLister.prototype = Object.create(WrapperObject.prototype);
EventsParametersLister.prototype.constructor = EventsParametersLister;
EventsParametersLister.prototype.__class__ = EventsParametersLister;
EventsParametersLister.__cache__ = {};
Module['EventsParametersLister'] = EventsParametersLister;

EventsParametersLister.prototype['GetParametersAndTypes'] = EventsParametersLister.prototype.GetParametersAndTypes = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_EventsParametersLister_GetParametersAndTypes_0(self), MapStringString);
};;

EventsParametersLister.prototype['Launch'] = EventsParametersLister.prototype.Launch = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsParametersLister_Launch_1(self, arg0);
};;

  EventsParametersLister.prototype['__destroy__'] = EventsParametersLister.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_EventsParametersLister___destroy___0(self);
};
// VectorPolygon2d
/** @suppress {undefinedVars, duplicate} */function VectorPolygon2d() {
  this.ptr = _emscripten_bind_VectorPolygon2d_VectorPolygon2d_0();
  getCache(VectorPolygon2d)[this.ptr] = this;
};;
VectorPolygon2d.prototype = Object.create(WrapperObject.prototype);
VectorPolygon2d.prototype.constructor = VectorPolygon2d;
VectorPolygon2d.prototype.__class__ = VectorPolygon2d;
VectorPolygon2d.__cache__ = {};
Module['VectorPolygon2d'] = VectorPolygon2d;

VectorPolygon2d.prototype['push_back'] = VectorPolygon2d.prototype.push_back = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VectorPolygon2d_push_back_1(self, arg0);
};;

VectorPolygon2d.prototype['size'] = VectorPolygon2d.prototype.size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VectorPolygon2d_size_0(self);
};;

VectorPolygon2d.prototype['at'] = VectorPolygon2d.prototype.at = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VectorPolygon2d_at_1(self, arg0), Polygon2d);
};;

VectorPolygon2d.prototype['WRAPPED_set'] = VectorPolygon2d.prototype.WRAPPED_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_VectorPolygon2d_WRAPPED_set_2(self, arg0, arg1);
};;

VectorPolygon2d.prototype['FREE_removeFromVectorPolygon2d'] = VectorPolygon2d.prototype.FREE_removeFromVectorPolygon2d = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VectorPolygon2d_FREE_removeFromVectorPolygon2d_1(self, arg0);
};;

VectorPolygon2d.prototype['clear'] = VectorPolygon2d.prototype.clear = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorPolygon2d_clear_0(self);
};;

  VectorPolygon2d.prototype['__destroy__'] = VectorPolygon2d.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorPolygon2d___destroy___0(self);
};
// EventMetadata
function EventMetadata() { throw "cannot construct a EventMetadata, no constructor in IDL" }
EventMetadata.prototype = Object.create(WrapperObject.prototype);
EventMetadata.prototype.constructor = EventMetadata;
EventMetadata.prototype.__class__ = EventMetadata;
EventMetadata.__cache__ = {};
Module['EventMetadata'] = EventMetadata;

EventMetadata.prototype['GetFullName'] = EventMetadata.prototype.GetFullName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventMetadata_GetFullName_0(self));
};;

EventMetadata.prototype['GetDescription'] = EventMetadata.prototype.GetDescription = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventMetadata_GetDescription_0(self));
};;

EventMetadata.prototype['GetGroup'] = EventMetadata.prototype.GetGroup = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventMetadata_GetGroup_0(self));
};;

  EventMetadata.prototype['__destroy__'] = EventMetadata.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_EventMetadata___destroy___0(self);
};
// VectorParameterMetadata
/** @suppress {undefinedVars, duplicate} */function VectorParameterMetadata() {
  this.ptr = _emscripten_bind_VectorParameterMetadata_VectorParameterMetadata_0();
  getCache(VectorParameterMetadata)[this.ptr] = this;
};;
VectorParameterMetadata.prototype = Object.create(WrapperObject.prototype);
VectorParameterMetadata.prototype.constructor = VectorParameterMetadata;
VectorParameterMetadata.prototype.__class__ = VectorParameterMetadata;
VectorParameterMetadata.__cache__ = {};
Module['VectorParameterMetadata'] = VectorParameterMetadata;

VectorParameterMetadata.prototype['push_back'] = VectorParameterMetadata.prototype.push_back = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VectorParameterMetadata_push_back_1(self, arg0);
};;

VectorParameterMetadata.prototype['size'] = VectorParameterMetadata.prototype.size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VectorParameterMetadata_size_0(self);
};;

VectorParameterMetadata.prototype['at'] = VectorParameterMetadata.prototype.at = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VectorParameterMetadata_at_1(self, arg0), ParameterMetadata);
};;

VectorParameterMetadata.prototype['WRAPPED_set'] = VectorParameterMetadata.prototype.WRAPPED_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_VectorParameterMetadata_WRAPPED_set_2(self, arg0, arg1);
};;

VectorParameterMetadata.prototype['FREE_removeFromVectorParameterMetadata'] = VectorParameterMetadata.prototype.FREE_removeFromVectorParameterMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VectorParameterMetadata_FREE_removeFromVectorParameterMetadata_1(self, arg0);
};;

VectorParameterMetadata.prototype['clear'] = VectorParameterMetadata.prototype.clear = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorParameterMetadata_clear_0(self);
};;

  VectorParameterMetadata.prototype['__destroy__'] = VectorParameterMetadata.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorParameterMetadata___destroy___0(self);
};
// TextObject
/** @suppress {undefinedVars, duplicate} */function TextObject(arg0) {
  ensureCache.prepare();
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

TextObject.prototype['SetString'] = TextObject.prototype.SetString = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextObject_SetString_1(self, arg0);
};;

TextObject.prototype['GetString'] = TextObject.prototype.GetString = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TextObject_GetString_0(self));
};;

TextObject.prototype['SetCharacterSize'] = TextObject.prototype.SetCharacterSize = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TextObject_SetCharacterSize_1(self, arg0);
};;

TextObject.prototype['GetCharacterSize'] = TextObject.prototype.GetCharacterSize = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TextObject_GetCharacterSize_0(self);
};;

TextObject.prototype['SetFontName'] = TextObject.prototype.SetFontName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextObject_SetFontName_1(self, arg0);
};;

TextObject.prototype['GetFontName'] = TextObject.prototype.GetFontName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TextObject_GetFontName_0(self));
};;

TextObject.prototype['IsBold'] = TextObject.prototype.IsBold = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TextObject_IsBold_0(self));
};;

TextObject.prototype['SetBold'] = TextObject.prototype.SetBold = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TextObject_SetBold_1(self, arg0);
};;

TextObject.prototype['IsItalic'] = TextObject.prototype.IsItalic = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TextObject_IsItalic_0(self));
};;

TextObject.prototype['SetItalic'] = TextObject.prototype.SetItalic = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TextObject_SetItalic_1(self, arg0);
};;

TextObject.prototype['IsUnderlined'] = TextObject.prototype.IsUnderlined = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TextObject_IsUnderlined_0(self));
};;

TextObject.prototype['SetUnderlined'] = TextObject.prototype.SetUnderlined = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TextObject_SetUnderlined_1(self, arg0);
};;

TextObject.prototype['SetColor'] = TextObject.prototype.SetColor = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_TextObject_SetColor_3(self, arg0, arg1, arg2);
};;

TextObject.prototype['GetColorR'] = TextObject.prototype.GetColorR = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TextObject_GetColorR_0(self);
};;

TextObject.prototype['GetColorG'] = TextObject.prototype.GetColorG = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TextObject_GetColorG_0(self);
};;

TextObject.prototype['GetColorB'] = TextObject.prototype.GetColorB = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TextObject_GetColorB_0(self);
};;

TextObject.prototype['SetName'] = TextObject.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextObject_SetName_1(self, arg0);
};;

TextObject.prototype['GetName'] = TextObject.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TextObject_GetName_0(self));
};;

TextObject.prototype['SetType'] = TextObject.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextObject_SetType_1(self, arg0);
};;

TextObject.prototype['GetType'] = TextObject.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TextObject_GetType_0(self));
};;

TextObject.prototype['GetProperties'] = TextObject.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_TextObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

TextObject.prototype['UpdateProperty'] = TextObject.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_TextObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

TextObject.prototype['GetInitialInstanceProperties'] = TextObject.prototype.GetInitialInstanceProperties = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_TextObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

TextObject.prototype['UpdateInitialInstanceProperty'] = TextObject.prototype.UpdateInitialInstanceProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_TextObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

TextObject.prototype['ExposeResources'] = TextObject.prototype.ExposeResources = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TextObject_ExposeResources_1(self, arg0);
};;

TextObject.prototype['GetVariables'] = TextObject.prototype.GetVariables = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TextObject_GetVariables_0(self), VariablesContainer);
};;

TextObject.prototype['GetAllBehaviorNames'] = TextObject.prototype.GetAllBehaviorNames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TextObject_GetAllBehaviorNames_0(self), VectorString);
};;

TextObject.prototype['HasBehaviorNamed'] = TextObject.prototype.HasBehaviorNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_TextObject_HasBehaviorNamed_1(self, arg0));
};;

TextObject.prototype['AddNewBehavior'] = TextObject.prototype.AddNewBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_TextObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

TextObject.prototype['GetBehavior'] = TextObject.prototype.GetBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_TextObject_GetBehavior_1(self, arg0), Behavior);
};;

TextObject.prototype['RemoveBehavior'] = TextObject.prototype.RemoveBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextObject_RemoveBehavior_1(self, arg0);
};;

TextObject.prototype['RenameBehavior'] = TextObject.prototype.RenameBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_TextObject_RenameBehavior_2(self, arg0, arg1));
};;

TextObject.prototype['SerializeTo'] = TextObject.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TextObject_SerializeTo_1(self, arg0);
};;

TextObject.prototype['UnserializeFrom'] = TextObject.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_TextObject_UnserializeFrom_2(self, arg0, arg1);
};;

  TextObject.prototype['__destroy__'] = TextObject.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TextObject___destroy___0(self);
};
// ExternalEvents
/** @suppress {undefinedVars, duplicate} */function ExternalEvents() {
  this.ptr = _emscripten_bind_ExternalEvents_ExternalEvents_0();
  getCache(ExternalEvents)[this.ptr] = this;
};;
ExternalEvents.prototype = Object.create(WrapperObject.prototype);
ExternalEvents.prototype.constructor = ExternalEvents;
ExternalEvents.prototype.__class__ = ExternalEvents;
ExternalEvents.__cache__ = {};
Module['ExternalEvents'] = ExternalEvents;

ExternalEvents.prototype['SetName'] = ExternalEvents.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ExternalEvents_SetName_1(self, arg0);
};;

ExternalEvents.prototype['GetName'] = ExternalEvents.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExternalEvents_GetName_0(self));
};;

ExternalEvents.prototype['GetAssociatedLayout'] = ExternalEvents.prototype.GetAssociatedLayout = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExternalEvents_GetAssociatedLayout_0(self));
};;

ExternalEvents.prototype['SetAssociatedLayout'] = ExternalEvents.prototype.SetAssociatedLayout = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ExternalEvents_SetAssociatedLayout_1(self, arg0);
};;

ExternalEvents.prototype['GetEvents'] = ExternalEvents.prototype.GetEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExternalEvents_GetEvents_0(self), EventsList);
};;

ExternalEvents.prototype['SerializeTo'] = ExternalEvents.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ExternalEvents_SerializeTo_1(self, arg0);
};;

ExternalEvents.prototype['UnserializeFrom'] = ExternalEvents.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_ExternalEvents_UnserializeFrom_2(self, arg0, arg1);
};;

  ExternalEvents.prototype['__destroy__'] = ExternalEvents.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
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

MapStringString.prototype['MAP_get'] = MapStringString.prototype.MAP_get = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return Pointer_stringify(_emscripten_bind_MapStringString_MAP_get_1(self, arg0));
};;

MapStringString.prototype['MAP_set'] = MapStringString.prototype.MAP_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_MapStringString_MAP_set_2(self, arg0, arg1);
};;

MapStringString.prototype['MAP_has'] = MapStringString.prototype.MAP_has = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_MapStringString_MAP_has_1(self, arg0));
};;

MapStringString.prototype['MAP_keys'] = MapStringString.prototype.MAP_keys = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_MapStringString_MAP_keys_0(self), VectorString);
};;

  MapStringString.prototype['__destroy__'] = MapStringString.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_MapStringString___destroy___0(self);
};
// ExtensionAndExpressionMetadata
function ExtensionAndExpressionMetadata() { throw "cannot construct a ExtensionAndExpressionMetadata, no constructor in IDL" }
ExtensionAndExpressionMetadata.prototype = Object.create(WrapperObject.prototype);
ExtensionAndExpressionMetadata.prototype.constructor = ExtensionAndExpressionMetadata;
ExtensionAndExpressionMetadata.prototype.__class__ = ExtensionAndExpressionMetadata;
ExtensionAndExpressionMetadata.__cache__ = {};
Module['ExtensionAndExpressionMetadata'] = ExtensionAndExpressionMetadata;

ExtensionAndExpressionMetadata.prototype['GetExtension'] = ExtensionAndExpressionMetadata.prototype.GetExtension = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExtensionAndExpressionMetadata_GetExtension_0(self), PlatformExtension);
};;

ExtensionAndExpressionMetadata.prototype['GetMetadata'] = ExtensionAndExpressionMetadata.prototype.GetMetadata = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExtensionAndExpressionMetadata_GetMetadata_0(self), ExpressionMetadata);
};;

  ExtensionAndExpressionMetadata.prototype['__destroy__'] = ExtensionAndExpressionMetadata.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExtensionAndExpressionMetadata___destroy___0(self);
};
// EventsTypesLister
/** @suppress {undefinedVars, duplicate} */function EventsTypesLister(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  this.ptr = _emscripten_bind_EventsTypesLister_EventsTypesLister_1(arg0);
  getCache(EventsTypesLister)[this.ptr] = this;
};;
EventsTypesLister.prototype = Object.create(WrapperObject.prototype);
EventsTypesLister.prototype.constructor = EventsTypesLister;
EventsTypesLister.prototype.__class__ = EventsTypesLister;
EventsTypesLister.__cache__ = {};
Module['EventsTypesLister'] = EventsTypesLister;

EventsTypesLister.prototype['GetAllEventsTypes'] = EventsTypesLister.prototype.GetAllEventsTypes = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_EventsTypesLister_GetAllEventsTypes_0(self), VectorString);
};;

EventsTypesLister.prototype['GetAllConditionsTypes'] = EventsTypesLister.prototype.GetAllConditionsTypes = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_EventsTypesLister_GetAllConditionsTypes_0(self), VectorString);
};;

EventsTypesLister.prototype['GetAllActionsTypes'] = EventsTypesLister.prototype.GetAllActionsTypes = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_EventsTypesLister_GetAllActionsTypes_0(self), VectorString);
};;

EventsTypesLister.prototype['Launch'] = EventsTypesLister.prototype.Launch = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsTypesLister_Launch_1(self, arg0);
};;

  EventsTypesLister.prototype['__destroy__'] = EventsTypesLister.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_EventsTypesLister___destroy___0(self);
};
// ExtensionAndInstructionMetadata
function ExtensionAndInstructionMetadata() { throw "cannot construct a ExtensionAndInstructionMetadata, no constructor in IDL" }
ExtensionAndInstructionMetadata.prototype = Object.create(WrapperObject.prototype);
ExtensionAndInstructionMetadata.prototype.constructor = ExtensionAndInstructionMetadata;
ExtensionAndInstructionMetadata.prototype.__class__ = ExtensionAndInstructionMetadata;
ExtensionAndInstructionMetadata.__cache__ = {};
Module['ExtensionAndInstructionMetadata'] = ExtensionAndInstructionMetadata;

ExtensionAndInstructionMetadata.prototype['GetExtension'] = ExtensionAndInstructionMetadata.prototype.GetExtension = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExtensionAndInstructionMetadata_GetExtension_0(self), PlatformExtension);
};;

ExtensionAndInstructionMetadata.prototype['GetMetadata'] = ExtensionAndInstructionMetadata.prototype.GetMetadata = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExtensionAndInstructionMetadata_GetMetadata_0(self), InstructionMetadata);
};;

  ExtensionAndInstructionMetadata.prototype['__destroy__'] = ExtensionAndInstructionMetadata.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExtensionAndInstructionMetadata___destroy___0(self);
};
// ExpressionCodeGenerator
function ExpressionCodeGenerator() { throw "cannot construct a ExpressionCodeGenerator, no constructor in IDL" }
ExpressionCodeGenerator.prototype = Object.create(WrapperObject.prototype);
ExpressionCodeGenerator.prototype.constructor = ExpressionCodeGenerator;
ExpressionCodeGenerator.prototype.__class__ = ExpressionCodeGenerator;
ExpressionCodeGenerator.__cache__ = {};
Module['ExpressionCodeGenerator'] = ExpressionCodeGenerator;

ExpressionCodeGenerator.prototype['STATIC_UseOldExpressionParser'] = ExpressionCodeGenerator.prototype.STATIC_UseOldExpressionParser = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ExpressionCodeGenerator_STATIC_UseOldExpressionParser_1(self, arg0);
};;

ExpressionCodeGenerator.prototype['STATIC_IsUsingOldExpressionParser'] = ExpressionCodeGenerator.prototype.STATIC_IsUsingOldExpressionParser = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ExpressionCodeGenerator_STATIC_IsUsingOldExpressionParser_0(self));
};;

  ExpressionCodeGenerator.prototype['__destroy__'] = ExpressionCodeGenerator.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExpressionCodeGenerator___destroy___0(self);
};
// LinkEvent
/** @suppress {undefinedVars, duplicate} */function LinkEvent() {
  this.ptr = _emscripten_bind_LinkEvent_LinkEvent_0();
  getCache(LinkEvent)[this.ptr] = this;
};;
LinkEvent.prototype = Object.create(WrapperObject.prototype);
LinkEvent.prototype.constructor = LinkEvent;
LinkEvent.prototype.__class__ = LinkEvent;
LinkEvent.__cache__ = {};
Module['LinkEvent'] = LinkEvent;

LinkEvent.prototype['SetTarget'] = LinkEvent.prototype.SetTarget = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_LinkEvent_SetTarget_1(self, arg0);
};;

LinkEvent.prototype['GetTarget'] = LinkEvent.prototype.GetTarget = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_LinkEvent_GetTarget_0(self));
};;

LinkEvent.prototype['GetIncludeConfig'] = LinkEvent.prototype.GetIncludeConfig = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_LinkEvent_GetIncludeConfig_0(self);
};;

LinkEvent.prototype['SetIncludeAllEvents'] = LinkEvent.prototype.SetIncludeAllEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_LinkEvent_SetIncludeAllEvents_0(self);
};;

LinkEvent.prototype['SetIncludeEventsGroup'] = LinkEvent.prototype.SetIncludeEventsGroup = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_LinkEvent_SetIncludeEventsGroup_1(self, arg0);
};;

LinkEvent.prototype['GetEventsGroupName'] = LinkEvent.prototype.GetEventsGroupName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_LinkEvent_GetEventsGroupName_0(self));
};;

LinkEvent.prototype['SetIncludeStartAndEnd'] = LinkEvent.prototype.SetIncludeStartAndEnd = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_LinkEvent_SetIncludeStartAndEnd_2(self, arg0, arg1);
};;

LinkEvent.prototype['GetIncludeStart'] = LinkEvent.prototype.GetIncludeStart = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_LinkEvent_GetIncludeStart_0(self);
};;

LinkEvent.prototype['GetIncludeEnd'] = LinkEvent.prototype.GetIncludeEnd = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_LinkEvent_GetIncludeEnd_0(self);
};;

LinkEvent.prototype['Clone'] = LinkEvent.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_LinkEvent_Clone_0(self), LinkEvent);
};;

LinkEvent.prototype['GetType'] = LinkEvent.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_LinkEvent_GetType_0(self));
};;

LinkEvent.prototype['SetType'] = LinkEvent.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_LinkEvent_SetType_1(self, arg0);
};;

LinkEvent.prototype['IsExecutable'] = LinkEvent.prototype.IsExecutable = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_LinkEvent_IsExecutable_0(self));
};;

LinkEvent.prototype['CanHaveSubEvents'] = LinkEvent.prototype.CanHaveSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_LinkEvent_CanHaveSubEvents_0(self));
};;

LinkEvent.prototype['HasSubEvents'] = LinkEvent.prototype.HasSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_LinkEvent_HasSubEvents_0(self));
};;

LinkEvent.prototype['GetSubEvents'] = LinkEvent.prototype.GetSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_LinkEvent_GetSubEvents_0(self), EventsList);
};;

LinkEvent.prototype['IsDisabled'] = LinkEvent.prototype.IsDisabled = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_LinkEvent_IsDisabled_0(self));
};;

LinkEvent.prototype['SetDisabled'] = LinkEvent.prototype.SetDisabled = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_LinkEvent_SetDisabled_1(self, arg0);
};;

LinkEvent.prototype['IsFolded'] = LinkEvent.prototype.IsFolded = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_LinkEvent_IsFolded_0(self));
};;

LinkEvent.prototype['SetFolded'] = LinkEvent.prototype.SetFolded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_LinkEvent_SetFolded_1(self, arg0);
};;

LinkEvent.prototype['SerializeTo'] = LinkEvent.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_LinkEvent_SerializeTo_1(self, arg0);
};;

LinkEvent.prototype['UnserializeFrom'] = LinkEvent.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_LinkEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  LinkEvent.prototype['__destroy__'] = LinkEvent.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_LinkEvent___destroy___0(self);
};
// WhileEvent
/** @suppress {undefinedVars, duplicate} */function WhileEvent() {
  this.ptr = _emscripten_bind_WhileEvent_WhileEvent_0();
  getCache(WhileEvent)[this.ptr] = this;
};;
WhileEvent.prototype = Object.create(WrapperObject.prototype);
WhileEvent.prototype.constructor = WhileEvent;
WhileEvent.prototype.__class__ = WhileEvent;
WhileEvent.__cache__ = {};
Module['WhileEvent'] = WhileEvent;

WhileEvent.prototype['GetConditions'] = WhileEvent.prototype.GetConditions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WhileEvent_GetConditions_0(self), InstructionsList);
};;

WhileEvent.prototype['GetWhileConditions'] = WhileEvent.prototype.GetWhileConditions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WhileEvent_GetWhileConditions_0(self), InstructionsList);
};;

WhileEvent.prototype['GetActions'] = WhileEvent.prototype.GetActions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WhileEvent_GetActions_0(self), InstructionsList);
};;

WhileEvent.prototype['Clone'] = WhileEvent.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WhileEvent_Clone_0(self), WhileEvent);
};;

WhileEvent.prototype['GetType'] = WhileEvent.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_WhileEvent_GetType_0(self));
};;

WhileEvent.prototype['SetType'] = WhileEvent.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_WhileEvent_SetType_1(self, arg0);
};;

WhileEvent.prototype['IsExecutable'] = WhileEvent.prototype.IsExecutable = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WhileEvent_IsExecutable_0(self));
};;

WhileEvent.prototype['CanHaveSubEvents'] = WhileEvent.prototype.CanHaveSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WhileEvent_CanHaveSubEvents_0(self));
};;

WhileEvent.prototype['HasSubEvents'] = WhileEvent.prototype.HasSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WhileEvent_HasSubEvents_0(self));
};;

WhileEvent.prototype['GetSubEvents'] = WhileEvent.prototype.GetSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WhileEvent_GetSubEvents_0(self), EventsList);
};;

WhileEvent.prototype['IsDisabled'] = WhileEvent.prototype.IsDisabled = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WhileEvent_IsDisabled_0(self));
};;

WhileEvent.prototype['SetDisabled'] = WhileEvent.prototype.SetDisabled = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_WhileEvent_SetDisabled_1(self, arg0);
};;

WhileEvent.prototype['IsFolded'] = WhileEvent.prototype.IsFolded = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WhileEvent_IsFolded_0(self));
};;

WhileEvent.prototype['SetFolded'] = WhileEvent.prototype.SetFolded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_WhileEvent_SetFolded_1(self, arg0);
};;

WhileEvent.prototype['SerializeTo'] = WhileEvent.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_WhileEvent_SerializeTo_1(self, arg0);
};;

WhileEvent.prototype['UnserializeFrom'] = WhileEvent.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_WhileEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  WhileEvent.prototype['__destroy__'] = WhileEvent.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
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

Platform.prototype['GetName'] = Platform.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Platform_GetName_0(self));
};;

Platform.prototype['GetFullName'] = Platform.prototype.GetFullName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Platform_GetFullName_0(self));
};;

Platform.prototype['GetSubtitle'] = Platform.prototype.GetSubtitle = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Platform_GetSubtitle_0(self));
};;

Platform.prototype['GetDescription'] = Platform.prototype.GetDescription = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Platform_GetDescription_0(self));
};;

Platform.prototype['IsExtensionLoaded'] = Platform.prototype.IsExtensionLoaded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Platform_IsExtensionLoaded_1(self, arg0));
};;

Platform.prototype['RemoveExtension'] = Platform.prototype.RemoveExtension = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Platform_RemoveExtension_1(self, arg0);
};;

Platform.prototype['ReloadBuiltinExtensions'] = Platform.prototype.ReloadBuiltinExtensions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Platform_ReloadBuiltinExtensions_0(self);
};;

Platform.prototype['GetAllPlatformExtensions'] = Platform.prototype.GetAllPlatformExtensions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Platform_GetAllPlatformExtensions_0(self), VectorPlatformExtension);
};;

  Platform.prototype['__destroy__'] = Platform.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Platform___destroy___0(self);
};
// ExpressionParser
/** @suppress {undefinedVars, duplicate} */function ExpressionParser(arg0) {
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_ExpressionParser_ExpressionParser_1(arg0);
  getCache(ExpressionParser)[this.ptr] = this;
};;
ExpressionParser.prototype = Object.create(WrapperObject.prototype);
ExpressionParser.prototype.constructor = ExpressionParser;
ExpressionParser.prototype.__class__ = ExpressionParser;
ExpressionParser.__cache__ = {};
Module['ExpressionParser'] = ExpressionParser;

ExpressionParser.prototype['ParseMathExpression'] = ExpressionParser.prototype.ParseMathExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return !!(_emscripten_bind_ExpressionParser_ParseMathExpression_4(self, arg0, arg1, arg2, arg3));
};;

ExpressionParser.prototype['ParseStringExpression'] = ExpressionParser.prototype.ParseStringExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return !!(_emscripten_bind_ExpressionParser_ParseStringExpression_4(self, arg0, arg1, arg2, arg3));
};;

ExpressionParser.prototype['GetFirstError'] = ExpressionParser.prototype.GetFirstError = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExpressionParser_GetFirstError_0(self));
};;

ExpressionParser.prototype['GetFirstErrorPosition'] = ExpressionParser.prototype.GetFirstErrorPosition = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ExpressionParser_GetFirstErrorPosition_0(self);
};;

  ExpressionParser.prototype['__destroy__'] = ExpressionParser.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExpressionParser___destroy___0(self);
};
// VoidPtr
function VoidPtr() { throw "cannot construct a VoidPtr, no constructor in IDL" }
VoidPtr.prototype = Object.create(WrapperObject.prototype);
VoidPtr.prototype.constructor = VoidPtr;
VoidPtr.prototype.__class__ = VoidPtr;
VoidPtr.__cache__ = {};
Module['VoidPtr'] = VoidPtr;

  VoidPtr.prototype['__destroy__'] = VoidPtr.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VoidPtr___destroy___0(self);
};
// SpriteObject
/** @suppress {undefinedVars, duplicate} */function SpriteObject(arg0) {
  ensureCache.prepare();
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

SpriteObject.prototype['AddAnimation'] = SpriteObject.prototype.AddAnimation = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SpriteObject_AddAnimation_1(self, arg0);
};;

SpriteObject.prototype['GetAnimation'] = SpriteObject.prototype.GetAnimation = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_SpriteObject_GetAnimation_1(self, arg0), Animation);
};;

SpriteObject.prototype['GetAnimationsCount'] = SpriteObject.prototype.GetAnimationsCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_SpriteObject_GetAnimationsCount_0(self);
};;

SpriteObject.prototype['RemoveAnimation'] = SpriteObject.prototype.RemoveAnimation = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SpriteObject_RemoveAnimation_1(self, arg0);
};;

SpriteObject.prototype['RemoveAllAnimations'] = SpriteObject.prototype.RemoveAllAnimations = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_SpriteObject_RemoveAllAnimations_0(self);
};;

SpriteObject.prototype['HasNoAnimations'] = SpriteObject.prototype.HasNoAnimations = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_SpriteObject_HasNoAnimations_0(self));
};;

SpriteObject.prototype['SwapAnimations'] = SpriteObject.prototype.SwapAnimations = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_SpriteObject_SwapAnimations_2(self, arg0, arg1);
};;

SpriteObject.prototype['MoveAnimation'] = SpriteObject.prototype.MoveAnimation = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_SpriteObject_MoveAnimation_2(self, arg0, arg1);
};;

SpriteObject.prototype['SetName'] = SpriteObject.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_SpriteObject_SetName_1(self, arg0);
};;

SpriteObject.prototype['GetName'] = SpriteObject.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_SpriteObject_GetName_0(self));
};;

SpriteObject.prototype['SetType'] = SpriteObject.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_SpriteObject_SetType_1(self, arg0);
};;

SpriteObject.prototype['GetType'] = SpriteObject.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_SpriteObject_GetType_0(self));
};;

SpriteObject.prototype['GetProperties'] = SpriteObject.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_SpriteObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

SpriteObject.prototype['UpdateProperty'] = SpriteObject.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_SpriteObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

SpriteObject.prototype['GetInitialInstanceProperties'] = SpriteObject.prototype.GetInitialInstanceProperties = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_SpriteObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

SpriteObject.prototype['UpdateInitialInstanceProperty'] = SpriteObject.prototype.UpdateInitialInstanceProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_SpriteObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

SpriteObject.prototype['ExposeResources'] = SpriteObject.prototype.ExposeResources = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SpriteObject_ExposeResources_1(self, arg0);
};;

SpriteObject.prototype['GetVariables'] = SpriteObject.prototype.GetVariables = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_SpriteObject_GetVariables_0(self), VariablesContainer);
};;

SpriteObject.prototype['GetAllBehaviorNames'] = SpriteObject.prototype.GetAllBehaviorNames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_SpriteObject_GetAllBehaviorNames_0(self), VectorString);
};;

SpriteObject.prototype['HasBehaviorNamed'] = SpriteObject.prototype.HasBehaviorNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_SpriteObject_HasBehaviorNamed_1(self, arg0));
};;

SpriteObject.prototype['AddNewBehavior'] = SpriteObject.prototype.AddNewBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_SpriteObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

SpriteObject.prototype['GetBehavior'] = SpriteObject.prototype.GetBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_SpriteObject_GetBehavior_1(self, arg0), Behavior);
};;

SpriteObject.prototype['RemoveBehavior'] = SpriteObject.prototype.RemoveBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_SpriteObject_RemoveBehavior_1(self, arg0);
};;

SpriteObject.prototype['RenameBehavior'] = SpriteObject.prototype.RenameBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_SpriteObject_RenameBehavior_2(self, arg0, arg1));
};;

SpriteObject.prototype['SerializeTo'] = SpriteObject.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SpriteObject_SerializeTo_1(self, arg0);
};;

SpriteObject.prototype['UnserializeFrom'] = SpriteObject.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_SpriteObject_UnserializeFrom_2(self, arg0, arg1);
};;

  SpriteObject.prototype['__destroy__'] = SpriteObject.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_SpriteObject___destroy___0(self);
};
// ArbitraryResourceWorkerJS
/** @suppress {undefinedVars, duplicate} */function ArbitraryResourceWorkerJS() {
  this.ptr = _emscripten_bind_ArbitraryResourceWorkerJS_ArbitraryResourceWorkerJS_0();
  getCache(ArbitraryResourceWorkerJS)[this.ptr] = this;
};;
ArbitraryResourceWorkerJS.prototype = Object.create(ArbitraryResourceWorker.prototype);
ArbitraryResourceWorkerJS.prototype.constructor = ArbitraryResourceWorkerJS;
ArbitraryResourceWorkerJS.prototype.__class__ = ArbitraryResourceWorkerJS;
ArbitraryResourceWorkerJS.__cache__ = {};
Module['ArbitraryResourceWorkerJS'] = ArbitraryResourceWorkerJS;

ArbitraryResourceWorkerJS.prototype['ExposeImage'] = ArbitraryResourceWorkerJS.prototype.ExposeImage = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ArbitraryResourceWorkerJS_ExposeImage_1(self, arg0);
};;

ArbitraryResourceWorkerJS.prototype['ExposeShader'] = ArbitraryResourceWorkerJS.prototype.ExposeShader = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ArbitraryResourceWorkerJS_ExposeShader_1(self, arg0);
};;

ArbitraryResourceWorkerJS.prototype['ExposeFile'] = ArbitraryResourceWorkerJS.prototype.ExposeFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ArbitraryResourceWorkerJS_ExposeFile_1(self, arg0);
};;

  ArbitraryResourceWorkerJS.prototype['__destroy__'] = ArbitraryResourceWorkerJS.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ArbitraryResourceWorkerJS___destroy___0(self);
};
// HighestZOrderFinder
/** @suppress {undefinedVars, duplicate} */function HighestZOrderFinder() {
  this.ptr = _emscripten_bind_HighestZOrderFinder_HighestZOrderFinder_0();
  getCache(HighestZOrderFinder)[this.ptr] = this;
};;
HighestZOrderFinder.prototype = Object.create(WrapperObject.prototype);
HighestZOrderFinder.prototype.constructor = HighestZOrderFinder;
HighestZOrderFinder.prototype.__class__ = HighestZOrderFinder;
HighestZOrderFinder.__cache__ = {};
Module['HighestZOrderFinder'] = HighestZOrderFinder;

HighestZOrderFinder.prototype['RestrictSearchToLayer'] = HighestZOrderFinder.prototype.RestrictSearchToLayer = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_HighestZOrderFinder_RestrictSearchToLayer_1(self, arg0);
};;

HighestZOrderFinder.prototype['GetHighestZOrder'] = HighestZOrderFinder.prototype.GetHighestZOrder = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_HighestZOrderFinder_GetHighestZOrder_0(self);
};;

HighestZOrderFinder.prototype['GetLowestZOrder'] = HighestZOrderFinder.prototype.GetLowestZOrder = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_HighestZOrderFinder_GetLowestZOrder_0(self);
};;

  HighestZOrderFinder.prototype['__destroy__'] = HighestZOrderFinder.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_HighestZOrderFinder___destroy___0(self);
};
// ObjectGroupsContainer
/** @suppress {undefinedVars, duplicate} */function ObjectGroupsContainer() {
  this.ptr = _emscripten_bind_ObjectGroupsContainer_ObjectGroupsContainer_0();
  getCache(ObjectGroupsContainer)[this.ptr] = this;
};;
ObjectGroupsContainer.prototype = Object.create(WrapperObject.prototype);
ObjectGroupsContainer.prototype.constructor = ObjectGroupsContainer;
ObjectGroupsContainer.prototype.__class__ = ObjectGroupsContainer;
ObjectGroupsContainer.__cache__ = {};
Module['ObjectGroupsContainer'] = ObjectGroupsContainer;

ObjectGroupsContainer.prototype['Has'] = ObjectGroupsContainer.prototype.Has = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ObjectGroupsContainer_Has_1(self, arg0));
};;

ObjectGroupsContainer.prototype['Insert'] = ObjectGroupsContainer.prototype.Insert = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_ObjectGroupsContainer_Insert_2(self, arg0, arg1), ObjectGroup);
};;

ObjectGroupsContainer.prototype['InsertNew'] = ObjectGroupsContainer.prototype.InsertNew = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_ObjectGroupsContainer_InsertNew_2(self, arg0, arg1), ObjectGroup);
};;

ObjectGroupsContainer.prototype['Count'] = ObjectGroupsContainer.prototype.Count = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ObjectGroupsContainer_Count_0(self);
};;

ObjectGroupsContainer.prototype['Get'] = ObjectGroupsContainer.prototype.Get = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ObjectGroupsContainer_Get_1(self, arg0), ObjectGroup);
};;

ObjectGroupsContainer.prototype['GetAt'] = ObjectGroupsContainer.prototype.GetAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ObjectGroupsContainer_GetAt_1(self, arg0), ObjectGroup);
};;

ObjectGroupsContainer.prototype['Clear'] = ObjectGroupsContainer.prototype.Clear = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ObjectGroupsContainer_Clear_0(self);
};;

ObjectGroupsContainer.prototype['Remove'] = ObjectGroupsContainer.prototype.Remove = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ObjectGroupsContainer_Remove_1(self, arg0);
};;

ObjectGroupsContainer.prototype['GetPosition'] = ObjectGroupsContainer.prototype.GetPosition = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_ObjectGroupsContainer_GetPosition_1(self, arg0);
};;

ObjectGroupsContainer.prototype['Rename'] = ObjectGroupsContainer.prototype.Rename = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_ObjectGroupsContainer_Rename_2(self, arg0, arg1));
};;

ObjectGroupsContainer.prototype['Move'] = ObjectGroupsContainer.prototype.Move = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_ObjectGroupsContainer_Move_2(self, arg0, arg1);
};;

ObjectGroupsContainer.prototype['SerializeTo'] = ObjectGroupsContainer.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ObjectGroupsContainer_SerializeTo_1(self, arg0);
};;

ObjectGroupsContainer.prototype['UnserializeFrom'] = ObjectGroupsContainer.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ObjectGroupsContainer_UnserializeFrom_1(self, arg0);
};;

  ObjectGroupsContainer.prototype['__destroy__'] = ObjectGroupsContainer.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ObjectGroupsContainer___destroy___0(self);
};
// ExpressionNode
function ExpressionNode() { throw "cannot construct a ExpressionNode, no constructor in IDL" }
ExpressionNode.prototype = Object.create(WrapperObject.prototype);
ExpressionNode.prototype.constructor = ExpressionNode;
ExpressionNode.prototype.__class__ = ExpressionNode;
ExpressionNode.__cache__ = {};
Module['ExpressionNode'] = ExpressionNode;

ExpressionNode.prototype['Visit'] = ExpressionNode.prototype.Visit = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ExpressionNode_Visit_1(self, arg0);
};;

  ExpressionNode.prototype['__destroy__'] = ExpressionNode.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExpressionNode___destroy___0(self);
};
// ResourcesMergingHelper
/** @suppress {undefinedVars, duplicate} */function ResourcesMergingHelper(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  this.ptr = _emscripten_bind_ResourcesMergingHelper_ResourcesMergingHelper_1(arg0);
  getCache(ResourcesMergingHelper)[this.ptr] = this;
};;
ResourcesMergingHelper.prototype = Object.create(WrapperObject.prototype);
ResourcesMergingHelper.prototype.constructor = ResourcesMergingHelper;
ResourcesMergingHelper.prototype.__class__ = ResourcesMergingHelper;
ResourcesMergingHelper.__cache__ = {};
Module['ResourcesMergingHelper'] = ResourcesMergingHelper;

ResourcesMergingHelper.prototype['SetBaseDirectory'] = ResourcesMergingHelper.prototype.SetBaseDirectory = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ResourcesMergingHelper_SetBaseDirectory_1(self, arg0);
};;

ResourcesMergingHelper.prototype['GetAllResourcesOldAndNewFilename'] = ResourcesMergingHelper.prototype.GetAllResourcesOldAndNewFilename = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ResourcesMergingHelper_GetAllResourcesOldAndNewFilename_0(self), MapStringString);
};;

  ResourcesMergingHelper.prototype['__destroy__'] = ResourcesMergingHelper.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ResourcesMergingHelper___destroy___0(self);
};
// WholeProjectRefactorer
function WholeProjectRefactorer() { throw "cannot construct a WholeProjectRefactorer, no constructor in IDL" }
WholeProjectRefactorer.prototype = Object.create(WrapperObject.prototype);
WholeProjectRefactorer.prototype.constructor = WholeProjectRefactorer;
WholeProjectRefactorer.prototype.__class__ = WholeProjectRefactorer;
WholeProjectRefactorer.__cache__ = {};
Module['WholeProjectRefactorer'] = WholeProjectRefactorer;

WholeProjectRefactorer.prototype['STATIC_ExposeProjectEvents'] = WholeProjectRefactorer.prototype.STATIC_ExposeProjectEvents = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_WholeProjectRefactorer_STATIC_ExposeProjectEvents_2(self, arg0, arg1);
};;

WholeProjectRefactorer.prototype['STATIC_RenameEventsFunctionsExtension'] = WholeProjectRefactorer.prototype.STATIC_RenameEventsFunctionsExtension = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  _emscripten_bind_WholeProjectRefactorer_STATIC_RenameEventsFunctionsExtension_4(self, arg0, arg1, arg2, arg3);
};;

WholeProjectRefactorer.prototype['STATIC_RenameEventsFunction'] = WholeProjectRefactorer.prototype.STATIC_RenameEventsFunction = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  _emscripten_bind_WholeProjectRefactorer_STATIC_RenameEventsFunction_4(self, arg0, arg1, arg2, arg3);
};;

WholeProjectRefactorer.prototype['STATIC_ObjectRenamedInLayout'] = WholeProjectRefactorer.prototype.STATIC_ObjectRenamedInLayout = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  _emscripten_bind_WholeProjectRefactorer_STATIC_ObjectRenamedInLayout_4(self, arg0, arg1, arg2, arg3);
};;

WholeProjectRefactorer.prototype['STATIC_ObjectRemovedInLayout'] = WholeProjectRefactorer.prototype.STATIC_ObjectRemovedInLayout = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  _emscripten_bind_WholeProjectRefactorer_STATIC_ObjectRemovedInLayout_4(self, arg0, arg1, arg2, arg3);
};;

WholeProjectRefactorer.prototype['STATIC_GlobalObjectRenamed'] = WholeProjectRefactorer.prototype.STATIC_GlobalObjectRenamed = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  _emscripten_bind_WholeProjectRefactorer_STATIC_GlobalObjectRenamed_3(self, arg0, arg1, arg2);
};;

WholeProjectRefactorer.prototype['STATIC_GlobalObjectRemoved'] = WholeProjectRefactorer.prototype.STATIC_GlobalObjectRemoved = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_WholeProjectRefactorer_STATIC_GlobalObjectRemoved_3(self, arg0, arg1, arg2);
};;

  WholeProjectRefactorer.prototype['__destroy__'] = WholeProjectRefactorer.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_WholeProjectRefactorer___destroy___0(self);
};
// SerializerElement
/** @suppress {undefinedVars, duplicate} */function SerializerElement() {
  this.ptr = _emscripten_bind_SerializerElement_SerializerElement_0();
  getCache(SerializerElement)[this.ptr] = this;
};;
SerializerElement.prototype = Object.create(WrapperObject.prototype);
SerializerElement.prototype.constructor = SerializerElement;
SerializerElement.prototype.__class__ = SerializerElement;
SerializerElement.__cache__ = {};
Module['SerializerElement'] = SerializerElement;

SerializerElement.prototype['GetValue'] = SerializerElement.prototype.GetValue = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_SerializerElement_GetValue_0(self), SerializerValue);
};;

SerializerElement.prototype['WRAPPED_SetBool'] = SerializerElement.prototype.WRAPPED_SetBool = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SerializerElement_WRAPPED_SetBool_1(self, arg0);
};;

SerializerElement.prototype['WRAPPED_SetString'] = SerializerElement.prototype.WRAPPED_SetString = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_SerializerElement_WRAPPED_SetString_1(self, arg0);
};;

SerializerElement.prototype['WRAPPED_SetInt'] = SerializerElement.prototype.WRAPPED_SetInt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SerializerElement_WRAPPED_SetInt_1(self, arg0);
};;

SerializerElement.prototype['WRAPPED_SetDouble'] = SerializerElement.prototype.WRAPPED_SetDouble = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SerializerElement_WRAPPED_SetDouble_1(self, arg0);
};;

SerializerElement.prototype['ConsiderAsArray'] = SerializerElement.prototype.ConsiderAsArray = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_SerializerElement_ConsiderAsArray_0(self);
};;

SerializerElement.prototype['ConsideredAsArray'] = SerializerElement.prototype.ConsideredAsArray = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_SerializerElement_ConsideredAsArray_0(self));
};;

SerializerElement.prototype['AddChild'] = SerializerElement.prototype.AddChild = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_SerializerElement_AddChild_1(self, arg0), SerializerElement);
};;

SerializerElement.prototype['GetChild'] = SerializerElement.prototype.GetChild = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_SerializerElement_GetChild_1(self, arg0), SerializerElement);
};;

SerializerElement.prototype['WRAPPED_SetChild'] = SerializerElement.prototype.WRAPPED_SetChild = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_SerializerElement_WRAPPED_SetChild_2(self, arg0, arg1);
};;

SerializerElement.prototype['HasChild'] = SerializerElement.prototype.HasChild = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_SerializerElement_HasChild_1(self, arg0));
};;

  SerializerElement.prototype['__destroy__'] = SerializerElement.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
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

ExpressionMetadata.prototype['GetFullName'] = ExpressionMetadata.prototype.GetFullName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExpressionMetadata_GetFullName_0(self));
};;

ExpressionMetadata.prototype['GetDescription'] = ExpressionMetadata.prototype.GetDescription = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExpressionMetadata_GetDescription_0(self));
};;

ExpressionMetadata.prototype['GetGroup'] = ExpressionMetadata.prototype.GetGroup = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExpressionMetadata_GetGroup_0(self));
};;

ExpressionMetadata.prototype['GetSmallIconFilename'] = ExpressionMetadata.prototype.GetSmallIconFilename = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExpressionMetadata_GetSmallIconFilename_0(self));
};;

ExpressionMetadata.prototype['IsShown'] = ExpressionMetadata.prototype.IsShown = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ExpressionMetadata_IsShown_0(self));
};;

ExpressionMetadata.prototype['GetParameter'] = ExpressionMetadata.prototype.GetParameter = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ExpressionMetadata_GetParameter_1(self, arg0), ParameterMetadata);
};;

ExpressionMetadata.prototype['GetParametersCount'] = ExpressionMetadata.prototype.GetParametersCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ExpressionMetadata_GetParametersCount_0(self);
};;

ExpressionMetadata.prototype['GetParameters'] = ExpressionMetadata.prototype.GetParameters = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExpressionMetadata_GetParameters_0(self), VectorParameterMetadata);
};;

ExpressionMetadata.prototype['SetHidden'] = ExpressionMetadata.prototype.SetHidden = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExpressionMetadata_SetHidden_0(self), ExpressionMetadata);
};;

ExpressionMetadata.prototype['SetGroup'] = ExpressionMetadata.prototype.SetGroup = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ExpressionMetadata_SetGroup_1(self, arg0), ExpressionMetadata);
};;

ExpressionMetadata.prototype['AddParameter'] = ExpressionMetadata.prototype.AddParameter = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return wrapPointer(_emscripten_bind_ExpressionMetadata_AddParameter_4(self, arg0, arg1, arg2, arg3), ExpressionMetadata);
};;

ExpressionMetadata.prototype['AddCodeOnlyParameter'] = ExpressionMetadata.prototype.AddCodeOnlyParameter = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_ExpressionMetadata_AddCodeOnlyParameter_2(self, arg0, arg1), ExpressionMetadata);
};;

ExpressionMetadata.prototype['SetDefaultValue'] = ExpressionMetadata.prototype.SetDefaultValue = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ExpressionMetadata_SetDefaultValue_1(self, arg0), ExpressionMetadata);
};;

ExpressionMetadata.prototype['GetCodeExtraInformation'] = ExpressionMetadata.prototype.GetCodeExtraInformation = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExpressionMetadata_GetCodeExtraInformation_0(self), ExpressionCodeGenerationInformation);
};;

  ExpressionMetadata.prototype['__destroy__'] = ExpressionMetadata.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExpressionMetadata___destroy___0(self);
};
// BehaviorSharedDataJsImplementation
/** @suppress {undefinedVars, duplicate} */function BehaviorSharedDataJsImplementation() {
  this.ptr = _emscripten_bind_BehaviorSharedDataJsImplementation_BehaviorSharedDataJsImplementation_0();
  getCache(BehaviorSharedDataJsImplementation)[this.ptr] = this;
};;
BehaviorSharedDataJsImplementation.prototype = Object.create(BehaviorsSharedData.prototype);
BehaviorSharedDataJsImplementation.prototype.constructor = BehaviorSharedDataJsImplementation;
BehaviorSharedDataJsImplementation.prototype.__class__ = BehaviorSharedDataJsImplementation;
BehaviorSharedDataJsImplementation.__cache__ = {};
Module['BehaviorSharedDataJsImplementation'] = BehaviorSharedDataJsImplementation;

BehaviorSharedDataJsImplementation.prototype['GetProperties'] = BehaviorSharedDataJsImplementation.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_BehaviorSharedDataJsImplementation_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

BehaviorSharedDataJsImplementation.prototype['UpdateProperty'] = BehaviorSharedDataJsImplementation.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_BehaviorSharedDataJsImplementation_UpdateProperty_3(self, arg0, arg1, arg2));
};;

BehaviorSharedDataJsImplementation.prototype['SerializeTo'] = BehaviorSharedDataJsImplementation.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_BehaviorSharedDataJsImplementation_SerializeTo_1(self, arg0);
};;

BehaviorSharedDataJsImplementation.prototype['UnserializeFrom'] = BehaviorSharedDataJsImplementation.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_BehaviorSharedDataJsImplementation_UnserializeFrom_1(self, arg0);
};;

BehaviorSharedDataJsImplementation.prototype['GetRawJSONContent'] = BehaviorSharedDataJsImplementation.prototype.GetRawJSONContent = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BehaviorSharedDataJsImplementation_GetRawJSONContent_0(self));
};;

BehaviorSharedDataJsImplementation.prototype['SetRawJSONContent'] = BehaviorSharedDataJsImplementation.prototype.SetRawJSONContent = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_BehaviorSharedDataJsImplementation_SetRawJSONContent_1(self, arg0), BehaviorSharedDataJsImplementation);
};;

  BehaviorSharedDataJsImplementation.prototype['__destroy__'] = BehaviorSharedDataJsImplementation.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_BehaviorSharedDataJsImplementation___destroy___0(self);
};
// InstructionsList
/** @suppress {undefinedVars, duplicate} */function InstructionsList() {
  this.ptr = _emscripten_bind_InstructionsList_InstructionsList_0();
  getCache(InstructionsList)[this.ptr] = this;
};;
InstructionsList.prototype = Object.create(WrapperObject.prototype);
InstructionsList.prototype.constructor = InstructionsList;
InstructionsList.prototype.__class__ = InstructionsList;
InstructionsList.__cache__ = {};
Module['InstructionsList'] = InstructionsList;

InstructionsList.prototype['Insert'] = InstructionsList.prototype.Insert = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_InstructionsList_Insert_2(self, arg0, arg1), Instruction);
};;

InstructionsList.prototype['InsertInstructions'] = InstructionsList.prototype.InsertInstructions = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  _emscripten_bind_InstructionsList_InsertInstructions_4(self, arg0, arg1, arg2, arg3);
};;

InstructionsList.prototype['size'] = InstructionsList.prototype.size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_InstructionsList_size_0(self);
};;

InstructionsList.prototype['WRAPPED_set'] = InstructionsList.prototype.WRAPPED_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_InstructionsList_WRAPPED_set_2(self, arg0, arg1);
};;

InstructionsList.prototype['Contains'] = InstructionsList.prototype.Contains = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return !!(_emscripten_bind_InstructionsList_Contains_1(self, arg0));
};;

InstructionsList.prototype['Get'] = InstructionsList.prototype.Get = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_InstructionsList_Get_1(self, arg0), Instruction);
};;

InstructionsList.prototype['Remove'] = InstructionsList.prototype.Remove = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InstructionsList_Remove_1(self, arg0);
};;

InstructionsList.prototype['RemoveAt'] = InstructionsList.prototype.RemoveAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InstructionsList_RemoveAt_1(self, arg0);
};;

InstructionsList.prototype['Clear'] = InstructionsList.prototype.Clear = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_InstructionsList_Clear_0(self);
};;

InstructionsList.prototype['SerializeTo'] = InstructionsList.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InstructionsList_SerializeTo_1(self, arg0);
};;

InstructionsList.prototype['UnserializeFrom'] = InstructionsList.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_InstructionsList_UnserializeFrom_2(self, arg0, arg1);
};;

  InstructionsList.prototype['__destroy__'] = InstructionsList.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_InstructionsList___destroy___0(self);
};
// CommentEvent
/** @suppress {undefinedVars, duplicate} */function CommentEvent() {
  this.ptr = _emscripten_bind_CommentEvent_CommentEvent_0();
  getCache(CommentEvent)[this.ptr] = this;
};;
CommentEvent.prototype = Object.create(WrapperObject.prototype);
CommentEvent.prototype.constructor = CommentEvent;
CommentEvent.prototype.__class__ = CommentEvent;
CommentEvent.__cache__ = {};
Module['CommentEvent'] = CommentEvent;

CommentEvent.prototype['GetComment'] = CommentEvent.prototype.GetComment = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_CommentEvent_GetComment_0(self));
};;

CommentEvent.prototype['SetComment'] = CommentEvent.prototype.SetComment = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_CommentEvent_SetComment_1(self, arg0);
};;

CommentEvent.prototype['SetBackgroundColor'] = CommentEvent.prototype.SetBackgroundColor = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_CommentEvent_SetBackgroundColor_3(self, arg0, arg1, arg2);
};;

CommentEvent.prototype['GetBackgroundColorRed'] = CommentEvent.prototype.GetBackgroundColorRed = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_CommentEvent_GetBackgroundColorRed_0(self);
};;

CommentEvent.prototype['GetBackgroundColorGreen'] = CommentEvent.prototype.GetBackgroundColorGreen = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_CommentEvent_GetBackgroundColorGreen_0(self);
};;

CommentEvent.prototype['GetBackgroundColorBlue'] = CommentEvent.prototype.GetBackgroundColorBlue = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_CommentEvent_GetBackgroundColorBlue_0(self);
};;

CommentEvent.prototype['SetTextColor'] = CommentEvent.prototype.SetTextColor = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_CommentEvent_SetTextColor_3(self, arg0, arg1, arg2);
};;

CommentEvent.prototype['GetTextColorRed'] = CommentEvent.prototype.GetTextColorRed = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_CommentEvent_GetTextColorRed_0(self);
};;

CommentEvent.prototype['GetTextColorGreen'] = CommentEvent.prototype.GetTextColorGreen = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_CommentEvent_GetTextColorGreen_0(self);
};;

CommentEvent.prototype['GetTextColorBlue'] = CommentEvent.prototype.GetTextColorBlue = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_CommentEvent_GetTextColorBlue_0(self);
};;

CommentEvent.prototype['Clone'] = CommentEvent.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_CommentEvent_Clone_0(self), CommentEvent);
};;

CommentEvent.prototype['GetType'] = CommentEvent.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_CommentEvent_GetType_0(self));
};;

CommentEvent.prototype['SetType'] = CommentEvent.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_CommentEvent_SetType_1(self, arg0);
};;

CommentEvent.prototype['IsExecutable'] = CommentEvent.prototype.IsExecutable = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_CommentEvent_IsExecutable_0(self));
};;

CommentEvent.prototype['CanHaveSubEvents'] = CommentEvent.prototype.CanHaveSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_CommentEvent_CanHaveSubEvents_0(self));
};;

CommentEvent.prototype['HasSubEvents'] = CommentEvent.prototype.HasSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_CommentEvent_HasSubEvents_0(self));
};;

CommentEvent.prototype['GetSubEvents'] = CommentEvent.prototype.GetSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_CommentEvent_GetSubEvents_0(self), EventsList);
};;

CommentEvent.prototype['IsDisabled'] = CommentEvent.prototype.IsDisabled = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_CommentEvent_IsDisabled_0(self));
};;

CommentEvent.prototype['SetDisabled'] = CommentEvent.prototype.SetDisabled = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_CommentEvent_SetDisabled_1(self, arg0);
};;

CommentEvent.prototype['IsFolded'] = CommentEvent.prototype.IsFolded = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_CommentEvent_IsFolded_0(self));
};;

CommentEvent.prototype['SetFolded'] = CommentEvent.prototype.SetFolded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_CommentEvent_SetFolded_1(self, arg0);
};;

CommentEvent.prototype['SerializeTo'] = CommentEvent.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_CommentEvent_SerializeTo_1(self, arg0);
};;

CommentEvent.prototype['UnserializeFrom'] = CommentEvent.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_CommentEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  CommentEvent.prototype['__destroy__'] = CommentEvent.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
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

MapStringInstructionMetadata.prototype['MAP_get'] = MapStringInstructionMetadata.prototype.MAP_get = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_MapStringInstructionMetadata_MAP_get_1(self, arg0), InstructionMetadata);
};;

MapStringInstructionMetadata.prototype['MAP_set'] = MapStringInstructionMetadata.prototype.MAP_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_MapStringInstructionMetadata_MAP_set_2(self, arg0, arg1);
};;

MapStringInstructionMetadata.prototype['MAP_has'] = MapStringInstructionMetadata.prototype.MAP_has = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_MapStringInstructionMetadata_MAP_has_1(self, arg0));
};;

MapStringInstructionMetadata.prototype['MAP_keys'] = MapStringInstructionMetadata.prototype.MAP_keys = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_MapStringInstructionMetadata_MAP_keys_0(self), VectorString);
};;

  MapStringInstructionMetadata.prototype['__destroy__'] = MapStringInstructionMetadata.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
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

InstructionMetadata.prototype['GetFullName'] = InstructionMetadata.prototype.GetFullName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionMetadata_GetFullName_0(self));
};;

InstructionMetadata.prototype['GetDescription'] = InstructionMetadata.prototype.GetDescription = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionMetadata_GetDescription_0(self));
};;

InstructionMetadata.prototype['GetSentence'] = InstructionMetadata.prototype.GetSentence = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionMetadata_GetSentence_0(self));
};;

InstructionMetadata.prototype['GetGroup'] = InstructionMetadata.prototype.GetGroup = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionMetadata_GetGroup_0(self));
};;

InstructionMetadata.prototype['GetIconFilename'] = InstructionMetadata.prototype.GetIconFilename = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionMetadata_GetIconFilename_0(self));
};;

InstructionMetadata.prototype['GetSmallIconFilename'] = InstructionMetadata.prototype.GetSmallIconFilename = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionMetadata_GetSmallIconFilename_0(self));
};;

InstructionMetadata.prototype['GetHelpPath'] = InstructionMetadata.prototype.GetHelpPath = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionMetadata_GetHelpPath_0(self));
};;

InstructionMetadata.prototype['CanHaveSubInstructions'] = InstructionMetadata.prototype.CanHaveSubInstructions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_InstructionMetadata_CanHaveSubInstructions_0(self));
};;

InstructionMetadata.prototype['GetParameter'] = InstructionMetadata.prototype.GetParameter = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_InstructionMetadata_GetParameter_1(self, arg0), ParameterMetadata);
};;

InstructionMetadata.prototype['GetParametersCount'] = InstructionMetadata.prototype.GetParametersCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_InstructionMetadata_GetParametersCount_0(self);
};;

InstructionMetadata.prototype['GetParameters'] = InstructionMetadata.prototype.GetParameters = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InstructionMetadata_GetParameters_0(self), VectorParameterMetadata);
};;

InstructionMetadata.prototype['GetUsageComplexity'] = InstructionMetadata.prototype.GetUsageComplexity = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_InstructionMetadata_GetUsageComplexity_0(self);
};;

InstructionMetadata.prototype['IsHidden'] = InstructionMetadata.prototype.IsHidden = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_InstructionMetadata_IsHidden_0(self));
};;

InstructionMetadata.prototype['SetCanHaveSubInstructions'] = InstructionMetadata.prototype.SetCanHaveSubInstructions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InstructionMetadata_SetCanHaveSubInstructions_0(self), InstructionMetadata);
};;

InstructionMetadata.prototype['SetHelpPath'] = InstructionMetadata.prototype.SetHelpPath = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_InstructionMetadata_SetHelpPath_1(self, arg0), InstructionMetadata);
};;

InstructionMetadata.prototype['SetHidden'] = InstructionMetadata.prototype.SetHidden = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InstructionMetadata_SetHidden_0(self), InstructionMetadata);
};;

InstructionMetadata.prototype['SetGroup'] = InstructionMetadata.prototype.SetGroup = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_InstructionMetadata_SetGroup_1(self, arg0), InstructionMetadata);
};;

InstructionMetadata.prototype['AddParameter'] = InstructionMetadata.prototype.AddParameter = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return wrapPointer(_emscripten_bind_InstructionMetadata_AddParameter_4(self, arg0, arg1, arg2, arg3), InstructionMetadata);
};;

InstructionMetadata.prototype['AddCodeOnlyParameter'] = InstructionMetadata.prototype.AddCodeOnlyParameter = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_InstructionMetadata_AddCodeOnlyParameter_2(self, arg0, arg1), InstructionMetadata);
};;

InstructionMetadata.prototype['SetDefaultValue'] = InstructionMetadata.prototype.SetDefaultValue = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_InstructionMetadata_SetDefaultValue_1(self, arg0), InstructionMetadata);
};;

InstructionMetadata.prototype['MarkAsSimple'] = InstructionMetadata.prototype.MarkAsSimple = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InstructionMetadata_MarkAsSimple_0(self), InstructionMetadata);
};;

InstructionMetadata.prototype['MarkAsAdvanced'] = InstructionMetadata.prototype.MarkAsAdvanced = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InstructionMetadata_MarkAsAdvanced_0(self), InstructionMetadata);
};;

InstructionMetadata.prototype['MarkAsComplex'] = InstructionMetadata.prototype.MarkAsComplex = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InstructionMetadata_MarkAsComplex_0(self), InstructionMetadata);
};;

InstructionMetadata.prototype['GetCodeExtraInformation'] = InstructionMetadata.prototype.GetCodeExtraInformation = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InstructionMetadata_GetCodeExtraInformation_0(self), ExtraInformation);
};;

  InstructionMetadata.prototype['__destroy__'] = InstructionMetadata.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_InstructionMetadata___destroy___0(self);
};
// VectorPoint
/** @suppress {undefinedVars, duplicate} */function VectorPoint() {
  this.ptr = _emscripten_bind_VectorPoint_VectorPoint_0();
  getCache(VectorPoint)[this.ptr] = this;
};;
VectorPoint.prototype = Object.create(WrapperObject.prototype);
VectorPoint.prototype.constructor = VectorPoint;
VectorPoint.prototype.__class__ = VectorPoint;
VectorPoint.__cache__ = {};
Module['VectorPoint'] = VectorPoint;

VectorPoint.prototype['push_back'] = VectorPoint.prototype.push_back = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VectorPoint_push_back_1(self, arg0);
};;

VectorPoint.prototype['size'] = VectorPoint.prototype.size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VectorPoint_size_0(self);
};;

VectorPoint.prototype['at'] = VectorPoint.prototype.at = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VectorPoint_at_1(self, arg0), Point);
};;

VectorPoint.prototype['WRAPPED_set'] = VectorPoint.prototype.WRAPPED_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_VectorPoint_WRAPPED_set_2(self, arg0, arg1);
};;

VectorPoint.prototype['clear'] = VectorPoint.prototype.clear = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorPoint_clear_0(self);
};;

  VectorPoint.prototype['__destroy__'] = VectorPoint.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorPoint___destroy___0(self);
};
// InitialInstanceFunctor
function InitialInstanceFunctor() { throw "cannot construct a InitialInstanceFunctor, no constructor in IDL" }
InitialInstanceFunctor.prototype = Object.create(WrapperObject.prototype);
InitialInstanceFunctor.prototype.constructor = InitialInstanceFunctor;
InitialInstanceFunctor.prototype.__class__ = InitialInstanceFunctor;
InitialInstanceFunctor.__cache__ = {};
Module['InitialInstanceFunctor'] = InitialInstanceFunctor;

  InitialInstanceFunctor.prototype['__destroy__'] = InitialInstanceFunctor.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstanceFunctor___destroy___0(self);
};
// SetString
/** @suppress {undefinedVars, duplicate} */function SetString() {
  this.ptr = _emscripten_bind_SetString_SetString_0();
  getCache(SetString)[this.ptr] = this;
};;
SetString.prototype = Object.create(WrapperObject.prototype);
SetString.prototype.constructor = SetString;
SetString.prototype.__class__ = SetString;
SetString.__cache__ = {};
Module['SetString'] = SetString;

SetString.prototype['FREE_toNewVectorString'] = SetString.prototype.FREE_toNewVectorString = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_SetString_FREE_toNewVectorString_0(self), VectorString);
};;

  SetString.prototype['__destroy__'] = SetString.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_SetString___destroy___0(self);
};
// JsCodeEvent
/** @suppress {undefinedVars, duplicate} */function JsCodeEvent() {
  this.ptr = _emscripten_bind_JsCodeEvent_JsCodeEvent_0();
  getCache(JsCodeEvent)[this.ptr] = this;
};;
JsCodeEvent.prototype = Object.create(WrapperObject.prototype);
JsCodeEvent.prototype.constructor = JsCodeEvent;
JsCodeEvent.prototype.__class__ = JsCodeEvent;
JsCodeEvent.__cache__ = {};
Module['JsCodeEvent'] = JsCodeEvent;

JsCodeEvent.prototype['GetInlineCode'] = JsCodeEvent.prototype.GetInlineCode = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_JsCodeEvent_GetInlineCode_0(self));
};;

JsCodeEvent.prototype['SetInlineCode'] = JsCodeEvent.prototype.SetInlineCode = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_JsCodeEvent_SetInlineCode_1(self, arg0);
};;

JsCodeEvent.prototype['GetParameterObjects'] = JsCodeEvent.prototype.GetParameterObjects = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_JsCodeEvent_GetParameterObjects_0(self));
};;

JsCodeEvent.prototype['SetParameterObjects'] = JsCodeEvent.prototype.SetParameterObjects = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_JsCodeEvent_SetParameterObjects_1(self, arg0);
};;

JsCodeEvent.prototype['Clone'] = JsCodeEvent.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_JsCodeEvent_Clone_0(self), JsCodeEvent);
};;

JsCodeEvent.prototype['GetType'] = JsCodeEvent.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_JsCodeEvent_GetType_0(self));
};;

JsCodeEvent.prototype['SetType'] = JsCodeEvent.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_JsCodeEvent_SetType_1(self, arg0);
};;

JsCodeEvent.prototype['IsExecutable'] = JsCodeEvent.prototype.IsExecutable = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_JsCodeEvent_IsExecutable_0(self));
};;

JsCodeEvent.prototype['CanHaveSubEvents'] = JsCodeEvent.prototype.CanHaveSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_JsCodeEvent_CanHaveSubEvents_0(self));
};;

JsCodeEvent.prototype['HasSubEvents'] = JsCodeEvent.prototype.HasSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_JsCodeEvent_HasSubEvents_0(self));
};;

JsCodeEvent.prototype['GetSubEvents'] = JsCodeEvent.prototype.GetSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_JsCodeEvent_GetSubEvents_0(self), EventsList);
};;

JsCodeEvent.prototype['IsDisabled'] = JsCodeEvent.prototype.IsDisabled = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_JsCodeEvent_IsDisabled_0(self));
};;

JsCodeEvent.prototype['SetDisabled'] = JsCodeEvent.prototype.SetDisabled = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_JsCodeEvent_SetDisabled_1(self, arg0);
};;

JsCodeEvent.prototype['IsFolded'] = JsCodeEvent.prototype.IsFolded = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_JsCodeEvent_IsFolded_0(self));
};;

JsCodeEvent.prototype['SetFolded'] = JsCodeEvent.prototype.SetFolded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_JsCodeEvent_SetFolded_1(self, arg0);
};;

JsCodeEvent.prototype['SerializeTo'] = JsCodeEvent.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_JsCodeEvent_SerializeTo_1(self, arg0);
};;

JsCodeEvent.prototype['UnserializeFrom'] = JsCodeEvent.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_JsCodeEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  JsCodeEvent.prototype['__destroy__'] = JsCodeEvent.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_JsCodeEvent___destroy___0(self);
};
// UniquePtrExpressionNode
function UniquePtrExpressionNode() { throw "cannot construct a UniquePtrExpressionNode, no constructor in IDL" }
UniquePtrExpressionNode.prototype = Object.create(WrapperObject.prototype);
UniquePtrExpressionNode.prototype.constructor = UniquePtrExpressionNode;
UniquePtrExpressionNode.prototype.__class__ = UniquePtrExpressionNode;
UniquePtrExpressionNode.__cache__ = {};
Module['UniquePtrExpressionNode'] = UniquePtrExpressionNode;

UniquePtrExpressionNode.prototype['get'] = UniquePtrExpressionNode.prototype.get = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_UniquePtrExpressionNode_get_0(self), ExpressionNode);
};;

  UniquePtrExpressionNode.prototype['__destroy__'] = UniquePtrExpressionNode.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_UniquePtrExpressionNode___destroy___0(self);
};
// EventsSearchResult
function EventsSearchResult() { throw "cannot construct a EventsSearchResult, no constructor in IDL" }
EventsSearchResult.prototype = Object.create(WrapperObject.prototype);
EventsSearchResult.prototype.constructor = EventsSearchResult;
EventsSearchResult.prototype.__class__ = EventsSearchResult;
EventsSearchResult.__cache__ = {};
Module['EventsSearchResult'] = EventsSearchResult;

EventsSearchResult.prototype['IsEventsListValid'] = EventsSearchResult.prototype.IsEventsListValid = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_EventsSearchResult_IsEventsListValid_0(self));
};;

EventsSearchResult.prototype['GetEventsList'] = EventsSearchResult.prototype.GetEventsList = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_EventsSearchResult_GetEventsList_0(self), EventsList);
};;

EventsSearchResult.prototype['GetPositionInList'] = EventsSearchResult.prototype.GetPositionInList = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_EventsSearchResult_GetPositionInList_0(self);
};;

EventsSearchResult.prototype['IsEventValid'] = EventsSearchResult.prototype.IsEventValid = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_EventsSearchResult_IsEventValid_0(self));
};;

EventsSearchResult.prototype['GetEvent'] = EventsSearchResult.prototype.GetEvent = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_EventsSearchResult_GetEvent_0(self), BaseEvent);
};;

  EventsSearchResult.prototype['__destroy__'] = EventsSearchResult.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_EventsSearchResult___destroy___0(self);
};
// ArbitraryEventsWorker
function ArbitraryEventsWorker() { throw "cannot construct a ArbitraryEventsWorker, no constructor in IDL" }
ArbitraryEventsWorker.prototype = Object.create(WrapperObject.prototype);
ArbitraryEventsWorker.prototype.constructor = ArbitraryEventsWorker;
ArbitraryEventsWorker.prototype.__class__ = ArbitraryEventsWorker;
ArbitraryEventsWorker.__cache__ = {};
Module['ArbitraryEventsWorker'] = ArbitraryEventsWorker;

ArbitraryEventsWorker.prototype['Launch'] = ArbitraryEventsWorker.prototype.Launch = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ArbitraryEventsWorker_Launch_1(self, arg0);
};;

  ArbitraryEventsWorker.prototype['__destroy__'] = ArbitraryEventsWorker.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ArbitraryEventsWorker___destroy___0(self);
};
// ExpressionValidator
/** @suppress {undefinedVars, duplicate} */function ExpressionValidator() {
  this.ptr = _emscripten_bind_ExpressionValidator_ExpressionValidator_0();
  getCache(ExpressionValidator)[this.ptr] = this;
};;
ExpressionValidator.prototype = Object.create(WrapperObject.prototype);
ExpressionValidator.prototype.constructor = ExpressionValidator;
ExpressionValidator.prototype.__class__ = ExpressionValidator;
ExpressionValidator.__cache__ = {};
Module['ExpressionValidator'] = ExpressionValidator;

ExpressionValidator.prototype['GetErrors'] = ExpressionValidator.prototype.GetErrors = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExpressionValidator_GetErrors_0(self), VectorExpressionParserDiagnostic);
};;

  ExpressionValidator.prototype['__destroy__'] = ExpressionValidator.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExpressionValidator___destroy___0(self);
};
// BehaviorJsImplementation
/** @suppress {undefinedVars, duplicate} */function BehaviorJsImplementation() {
  this.ptr = _emscripten_bind_BehaviorJsImplementation_BehaviorJsImplementation_0();
  getCache(BehaviorJsImplementation)[this.ptr] = this;
};;
BehaviorJsImplementation.prototype = Object.create(Behavior.prototype);
BehaviorJsImplementation.prototype.constructor = BehaviorJsImplementation;
BehaviorJsImplementation.prototype.__class__ = BehaviorJsImplementation;
BehaviorJsImplementation.__cache__ = {};
Module['BehaviorJsImplementation'] = BehaviorJsImplementation;

BehaviorJsImplementation.prototype['GetProperties'] = BehaviorJsImplementation.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_BehaviorJsImplementation_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

BehaviorJsImplementation.prototype['UpdateProperty'] = BehaviorJsImplementation.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_BehaviorJsImplementation_UpdateProperty_3(self, arg0, arg1, arg2));
};;

BehaviorJsImplementation.prototype['SerializeTo'] = BehaviorJsImplementation.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_BehaviorJsImplementation_SerializeTo_1(self, arg0);
};;

BehaviorJsImplementation.prototype['UnserializeFrom'] = BehaviorJsImplementation.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_BehaviorJsImplementation_UnserializeFrom_1(self, arg0);
};;

BehaviorJsImplementation.prototype['GetRawJSONContent'] = BehaviorJsImplementation.prototype.GetRawJSONContent = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BehaviorJsImplementation_GetRawJSONContent_0(self));
};;

BehaviorJsImplementation.prototype['SetRawJSONContent'] = BehaviorJsImplementation.prototype.SetRawJSONContent = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_BehaviorJsImplementation_SetRawJSONContent_1(self, arg0), BehaviorJsImplementation);
};;

  BehaviorJsImplementation.prototype['__destroy__'] = BehaviorJsImplementation.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_BehaviorJsImplementation___destroy___0(self);
};
// VectorString
/** @suppress {undefinedVars, duplicate} */function VectorString() {
  this.ptr = _emscripten_bind_VectorString_VectorString_0();
  getCache(VectorString)[this.ptr] = this;
};;
VectorString.prototype = Object.create(WrapperObject.prototype);
VectorString.prototype.constructor = VectorString;
VectorString.prototype.__class__ = VectorString;
VectorString.__cache__ = {};
Module['VectorString'] = VectorString;

VectorString.prototype['push_back'] = VectorString.prototype.push_back = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_VectorString_push_back_1(self, arg0);
};;

VectorString.prototype['resize'] = VectorString.prototype.resize = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VectorString_resize_1(self, arg0);
};;

VectorString.prototype['size'] = VectorString.prototype.size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VectorString_size_0(self);
};;

VectorString.prototype['at'] = VectorString.prototype.at = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_VectorString_at_1(self, arg0));
};;

VectorString.prototype['WRAPPED_set'] = VectorString.prototype.WRAPPED_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_VectorString_WRAPPED_set_2(self, arg0, arg1);
};;

VectorString.prototype['clear'] = VectorString.prototype.clear = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorString_clear_0(self);
};;

  VectorString.prototype['__destroy__'] = VectorString.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorString___destroy___0(self);
};
// Point
/** @suppress {undefinedVars, duplicate} */function Point(arg0) {
  ensureCache.prepare();
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

Point.prototype['SetName'] = Point.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Point_SetName_1(self, arg0);
};;

Point.prototype['GetName'] = Point.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Point_GetName_0(self));
};;

Point.prototype['SetXY'] = Point.prototype.SetXY = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Point_SetXY_2(self, arg0, arg1);
};;

Point.prototype['GetX'] = Point.prototype.GetX = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Point_GetX_0(self);
};;

Point.prototype['SetX'] = Point.prototype.SetX = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Point_SetX_1(self, arg0);
};;

Point.prototype['GetY'] = Point.prototype.GetY = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Point_GetY_0(self);
};;

Point.prototype['SetY'] = Point.prototype.SetY = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Point_SetY_1(self, arg0);
};;

  Point.prototype['__destroy__'] = Point.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Point___destroy___0(self);
};
// Polygon2d
/** @suppress {undefinedVars, duplicate} */function Polygon2d() {
  this.ptr = _emscripten_bind_Polygon2d_Polygon2d_0();
  getCache(Polygon2d)[this.ptr] = this;
};;
Polygon2d.prototype = Object.create(WrapperObject.prototype);
Polygon2d.prototype.constructor = Polygon2d;
Polygon2d.prototype.__class__ = Polygon2d;
Polygon2d.__cache__ = {};
Module['Polygon2d'] = Polygon2d;

Polygon2d.prototype['GetVertices'] = Polygon2d.prototype.GetVertices = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Polygon2d_GetVertices_0(self), VectorVector2f);
};;

Polygon2d.prototype['Move'] = Polygon2d.prototype.Move = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Polygon2d_Move_2(self, arg0, arg1);
};;

Polygon2d.prototype['Rotate'] = Polygon2d.prototype.Rotate = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Polygon2d_Rotate_1(self, arg0);
};;

Polygon2d.prototype['IsConvex'] = Polygon2d.prototype.IsConvex = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Polygon2d_IsConvex_0(self));
};;

Polygon2d.prototype['ComputeCenter'] = Polygon2d.prototype.ComputeCenter = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Polygon2d_ComputeCenter_0(self), Vector2f);
};;

Polygon2d.prototype['STATIC_CreateRectangle'] = Polygon2d.prototype.STATIC_CreateRectangle = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_Polygon2d_STATIC_CreateRectangle_2(self, arg0, arg1), Polygon2d);
};;

  Polygon2d.prototype['__destroy__'] = Polygon2d.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Polygon2d___destroy___0(self);
};
// TiledSpriteObject
/** @suppress {undefinedVars, duplicate} */function TiledSpriteObject(arg0) {
  ensureCache.prepare();
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

TiledSpriteObject.prototype['SetTexture'] = TiledSpriteObject.prototype.SetTexture = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TiledSpriteObject_SetTexture_1(self, arg0);
};;

TiledSpriteObject.prototype['GetTexture'] = TiledSpriteObject.prototype.GetTexture = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TiledSpriteObject_GetTexture_0(self));
};;

TiledSpriteObject.prototype['SetWidth'] = TiledSpriteObject.prototype.SetWidth = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TiledSpriteObject_SetWidth_1(self, arg0);
};;

TiledSpriteObject.prototype['GetWidth'] = TiledSpriteObject.prototype.GetWidth = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TiledSpriteObject_GetWidth_0(self);
};;

TiledSpriteObject.prototype['SetHeight'] = TiledSpriteObject.prototype.SetHeight = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TiledSpriteObject_SetHeight_1(self, arg0);
};;

TiledSpriteObject.prototype['GetHeight'] = TiledSpriteObject.prototype.GetHeight = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TiledSpriteObject_GetHeight_0(self);
};;

TiledSpriteObject.prototype['SetName'] = TiledSpriteObject.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TiledSpriteObject_SetName_1(self, arg0);
};;

TiledSpriteObject.prototype['GetName'] = TiledSpriteObject.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TiledSpriteObject_GetName_0(self));
};;

TiledSpriteObject.prototype['SetType'] = TiledSpriteObject.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TiledSpriteObject_SetType_1(self, arg0);
};;

TiledSpriteObject.prototype['GetType'] = TiledSpriteObject.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TiledSpriteObject_GetType_0(self));
};;

TiledSpriteObject.prototype['GetProperties'] = TiledSpriteObject.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_TiledSpriteObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

TiledSpriteObject.prototype['UpdateProperty'] = TiledSpriteObject.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_TiledSpriteObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

TiledSpriteObject.prototype['GetInitialInstanceProperties'] = TiledSpriteObject.prototype.GetInitialInstanceProperties = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_TiledSpriteObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

TiledSpriteObject.prototype['UpdateInitialInstanceProperty'] = TiledSpriteObject.prototype.UpdateInitialInstanceProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_TiledSpriteObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

TiledSpriteObject.prototype['ExposeResources'] = TiledSpriteObject.prototype.ExposeResources = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TiledSpriteObject_ExposeResources_1(self, arg0);
};;

TiledSpriteObject.prototype['GetVariables'] = TiledSpriteObject.prototype.GetVariables = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TiledSpriteObject_GetVariables_0(self), VariablesContainer);
};;

TiledSpriteObject.prototype['GetAllBehaviorNames'] = TiledSpriteObject.prototype.GetAllBehaviorNames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TiledSpriteObject_GetAllBehaviorNames_0(self), VectorString);
};;

TiledSpriteObject.prototype['HasBehaviorNamed'] = TiledSpriteObject.prototype.HasBehaviorNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_TiledSpriteObject_HasBehaviorNamed_1(self, arg0));
};;

TiledSpriteObject.prototype['AddNewBehavior'] = TiledSpriteObject.prototype.AddNewBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_TiledSpriteObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

TiledSpriteObject.prototype['GetBehavior'] = TiledSpriteObject.prototype.GetBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_TiledSpriteObject_GetBehavior_1(self, arg0), Behavior);
};;

TiledSpriteObject.prototype['RemoveBehavior'] = TiledSpriteObject.prototype.RemoveBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TiledSpriteObject_RemoveBehavior_1(self, arg0);
};;

TiledSpriteObject.prototype['RenameBehavior'] = TiledSpriteObject.prototype.RenameBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_TiledSpriteObject_RenameBehavior_2(self, arg0, arg1));
};;

TiledSpriteObject.prototype['SerializeTo'] = TiledSpriteObject.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TiledSpriteObject_SerializeTo_1(self, arg0);
};;

TiledSpriteObject.prototype['UnserializeFrom'] = TiledSpriteObject.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_TiledSpriteObject_UnserializeFrom_2(self, arg0, arg1);
};;

  TiledSpriteObject.prototype['__destroy__'] = TiledSpriteObject.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TiledSpriteObject___destroy___0(self);
};
// RepeatEvent
/** @suppress {undefinedVars, duplicate} */function RepeatEvent() {
  this.ptr = _emscripten_bind_RepeatEvent_RepeatEvent_0();
  getCache(RepeatEvent)[this.ptr] = this;
};;
RepeatEvent.prototype = Object.create(WrapperObject.prototype);
RepeatEvent.prototype.constructor = RepeatEvent;
RepeatEvent.prototype.__class__ = RepeatEvent;
RepeatEvent.__cache__ = {};
Module['RepeatEvent'] = RepeatEvent;

RepeatEvent.prototype['GetConditions'] = RepeatEvent.prototype.GetConditions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_RepeatEvent_GetConditions_0(self), InstructionsList);
};;

RepeatEvent.prototype['GetActions'] = RepeatEvent.prototype.GetActions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_RepeatEvent_GetActions_0(self), InstructionsList);
};;

RepeatEvent.prototype['SetRepeatExpression'] = RepeatEvent.prototype.SetRepeatExpression = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_RepeatEvent_SetRepeatExpression_1(self, arg0);
};;

RepeatEvent.prototype['GetRepeatExpression'] = RepeatEvent.prototype.GetRepeatExpression = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_RepeatEvent_GetRepeatExpression_0(self));
};;

RepeatEvent.prototype['Clone'] = RepeatEvent.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_RepeatEvent_Clone_0(self), RepeatEvent);
};;

RepeatEvent.prototype['GetType'] = RepeatEvent.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_RepeatEvent_GetType_0(self));
};;

RepeatEvent.prototype['SetType'] = RepeatEvent.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_RepeatEvent_SetType_1(self, arg0);
};;

RepeatEvent.prototype['IsExecutable'] = RepeatEvent.prototype.IsExecutable = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_RepeatEvent_IsExecutable_0(self));
};;

RepeatEvent.prototype['CanHaveSubEvents'] = RepeatEvent.prototype.CanHaveSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_RepeatEvent_CanHaveSubEvents_0(self));
};;

RepeatEvent.prototype['HasSubEvents'] = RepeatEvent.prototype.HasSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_RepeatEvent_HasSubEvents_0(self));
};;

RepeatEvent.prototype['GetSubEvents'] = RepeatEvent.prototype.GetSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_RepeatEvent_GetSubEvents_0(self), EventsList);
};;

RepeatEvent.prototype['IsDisabled'] = RepeatEvent.prototype.IsDisabled = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_RepeatEvent_IsDisabled_0(self));
};;

RepeatEvent.prototype['SetDisabled'] = RepeatEvent.prototype.SetDisabled = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_RepeatEvent_SetDisabled_1(self, arg0);
};;

RepeatEvent.prototype['IsFolded'] = RepeatEvent.prototype.IsFolded = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_RepeatEvent_IsFolded_0(self));
};;

RepeatEvent.prototype['SetFolded'] = RepeatEvent.prototype.SetFolded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_RepeatEvent_SetFolded_1(self, arg0);
};;

RepeatEvent.prototype['SerializeTo'] = RepeatEvent.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_RepeatEvent_SerializeTo_1(self, arg0);
};;

RepeatEvent.prototype['UnserializeFrom'] = RepeatEvent.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_RepeatEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  RepeatEvent.prototype['__destroy__'] = RepeatEvent.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_RepeatEvent___destroy___0(self);
};
// StandardEvent
/** @suppress {undefinedVars, duplicate} */function StandardEvent() {
  this.ptr = _emscripten_bind_StandardEvent_StandardEvent_0();
  getCache(StandardEvent)[this.ptr] = this;
};;
StandardEvent.prototype = Object.create(WrapperObject.prototype);
StandardEvent.prototype.constructor = StandardEvent;
StandardEvent.prototype.__class__ = StandardEvent;
StandardEvent.__cache__ = {};
Module['StandardEvent'] = StandardEvent;

StandardEvent.prototype['GetConditions'] = StandardEvent.prototype.GetConditions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_StandardEvent_GetConditions_0(self), InstructionsList);
};;

StandardEvent.prototype['GetActions'] = StandardEvent.prototype.GetActions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_StandardEvent_GetActions_0(self), InstructionsList);
};;

StandardEvent.prototype['Clone'] = StandardEvent.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_StandardEvent_Clone_0(self), StandardEvent);
};;

StandardEvent.prototype['GetType'] = StandardEvent.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_StandardEvent_GetType_0(self));
};;

StandardEvent.prototype['SetType'] = StandardEvent.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_StandardEvent_SetType_1(self, arg0);
};;

StandardEvent.prototype['IsExecutable'] = StandardEvent.prototype.IsExecutable = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_StandardEvent_IsExecutable_0(self));
};;

StandardEvent.prototype['CanHaveSubEvents'] = StandardEvent.prototype.CanHaveSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_StandardEvent_CanHaveSubEvents_0(self));
};;

StandardEvent.prototype['HasSubEvents'] = StandardEvent.prototype.HasSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_StandardEvent_HasSubEvents_0(self));
};;

StandardEvent.prototype['GetSubEvents'] = StandardEvent.prototype.GetSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_StandardEvent_GetSubEvents_0(self), EventsList);
};;

StandardEvent.prototype['IsDisabled'] = StandardEvent.prototype.IsDisabled = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_StandardEvent_IsDisabled_0(self));
};;

StandardEvent.prototype['SetDisabled'] = StandardEvent.prototype.SetDisabled = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_StandardEvent_SetDisabled_1(self, arg0);
};;

StandardEvent.prototype['IsFolded'] = StandardEvent.prototype.IsFolded = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_StandardEvent_IsFolded_0(self));
};;

StandardEvent.prototype['SetFolded'] = StandardEvent.prototype.SetFolded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_StandardEvent_SetFolded_1(self, arg0);
};;

StandardEvent.prototype['SerializeTo'] = StandardEvent.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_StandardEvent_SerializeTo_1(self, arg0);
};;

StandardEvent.prototype['UnserializeFrom'] = StandardEvent.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_StandardEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  StandardEvent.prototype['__destroy__'] = StandardEvent.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_StandardEvent___destroy___0(self);
};
// ParameterMetadataTools
function ParameterMetadataTools() { throw "cannot construct a ParameterMetadataTools, no constructor in IDL" }
ParameterMetadataTools.prototype = Object.create(WrapperObject.prototype);
ParameterMetadataTools.prototype.constructor = ParameterMetadataTools;
ParameterMetadataTools.prototype.__class__ = ParameterMetadataTools;
ParameterMetadataTools.__cache__ = {};
Module['ParameterMetadataTools'] = ParameterMetadataTools;

ParameterMetadataTools.prototype['STATIC_ParametersToObjectsContainer'] = ParameterMetadataTools.prototype.STATIC_ParametersToObjectsContainer = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_ParameterMetadataTools_STATIC_ParametersToObjectsContainer_3(self, arg0, arg1, arg2);
};;

ParameterMetadataTools.prototype['STATIC_GetObjectParameterIndexFor'] = ParameterMetadataTools.prototype.STATIC_GetObjectParameterIndexFor = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_ParameterMetadataTools_STATIC_GetObjectParameterIndexFor_2(self, arg0, arg1);
};;

  ParameterMetadataTools.prototype['__destroy__'] = ParameterMetadataTools.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ParameterMetadataTools___destroy___0(self);
};
// VectorEventsFunction
/** @suppress {undefinedVars, duplicate} */function VectorEventsFunction() {
  this.ptr = _emscripten_bind_VectorEventsFunction_VectorEventsFunction_0();
  getCache(VectorEventsFunction)[this.ptr] = this;
};;
VectorEventsFunction.prototype = Object.create(WrapperObject.prototype);
VectorEventsFunction.prototype.constructor = VectorEventsFunction;
VectorEventsFunction.prototype.__class__ = VectorEventsFunction;
VectorEventsFunction.__cache__ = {};
Module['VectorEventsFunction'] = VectorEventsFunction;

VectorEventsFunction.prototype['push_back'] = VectorEventsFunction.prototype.push_back = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VectorEventsFunction_push_back_1(self, arg0);
};;

VectorEventsFunction.prototype['size'] = VectorEventsFunction.prototype.size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VectorEventsFunction_size_0(self);
};;

VectorEventsFunction.prototype['at'] = VectorEventsFunction.prototype.at = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VectorEventsFunction_at_1(self, arg0), EventsFunction);
};;

VectorEventsFunction.prototype['WRAPPED_set'] = VectorEventsFunction.prototype.WRAPPED_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_VectorEventsFunction_WRAPPED_set_2(self, arg0, arg1);
};;

VectorEventsFunction.prototype['clear'] = VectorEventsFunction.prototype.clear = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorEventsFunction_clear_0(self);
};;

  VectorEventsFunction.prototype['__destroy__'] = VectorEventsFunction.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorEventsFunction___destroy___0(self);
};
// UniquePtrObject
function UniquePtrObject() { throw "cannot construct a UniquePtrObject, no constructor in IDL" }
UniquePtrObject.prototype = Object.create(WrapperObject.prototype);
UniquePtrObject.prototype.constructor = UniquePtrObject;
UniquePtrObject.prototype.__class__ = UniquePtrObject;
UniquePtrObject.__cache__ = {};
Module['UniquePtrObject'] = UniquePtrObject;

UniquePtrObject.prototype['get'] = UniquePtrObject.prototype.get = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_UniquePtrObject_get_0(self), gdObject);
};;

UniquePtrObject.prototype['release'] = UniquePtrObject.prototype.release = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_UniquePtrObject_release_0(self), gdObject);
};;

  UniquePtrObject.prototype['__destroy__'] = UniquePtrObject.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_UniquePtrObject___destroy___0(self);
};
// ShapePainterObject
/** @suppress {undefinedVars, duplicate} */function ShapePainterObject(arg0) {
  ensureCache.prepare();
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

ShapePainterObject.prototype['SetCoordinatesAbsolute'] = ShapePainterObject.prototype.SetCoordinatesAbsolute = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ShapePainterObject_SetCoordinatesAbsolute_0(self);
};;

ShapePainterObject.prototype['SetCoordinatesRelative'] = ShapePainterObject.prototype.SetCoordinatesRelative = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ShapePainterObject_SetCoordinatesRelative_0(self);
};;

ShapePainterObject.prototype['AreCoordinatesAbsolute'] = ShapePainterObject.prototype.AreCoordinatesAbsolute = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ShapePainterObject_AreCoordinatesAbsolute_0(self));
};;

ShapePainterObject.prototype['SetOutlineSize'] = ShapePainterObject.prototype.SetOutlineSize = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ShapePainterObject_SetOutlineSize_1(self, arg0);
};;

ShapePainterObject.prototype['GetOutlineSize'] = ShapePainterObject.prototype.GetOutlineSize = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetOutlineSize_0(self);
};;

ShapePainterObject.prototype['SetOutlineOpacity'] = ShapePainterObject.prototype.SetOutlineOpacity = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ShapePainterObject_SetOutlineOpacity_1(self, arg0);
};;

ShapePainterObject.prototype['GetOutlineOpacity'] = ShapePainterObject.prototype.GetOutlineOpacity = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetOutlineOpacity_0(self);
};;

ShapePainterObject.prototype['SetOutlineColor'] = ShapePainterObject.prototype.SetOutlineColor = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_ShapePainterObject_SetOutlineColor_3(self, arg0, arg1, arg2);
};;

ShapePainterObject.prototype['GetOutlineColorR'] = ShapePainterObject.prototype.GetOutlineColorR = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetOutlineColorR_0(self);
};;

ShapePainterObject.prototype['GetOutlineColorG'] = ShapePainterObject.prototype.GetOutlineColorG = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetOutlineColorG_0(self);
};;

ShapePainterObject.prototype['GetOutlineColorB'] = ShapePainterObject.prototype.GetOutlineColorB = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetOutlineColorB_0(self);
};;

ShapePainterObject.prototype['SetFillOpacity'] = ShapePainterObject.prototype.SetFillOpacity = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ShapePainterObject_SetFillOpacity_1(self, arg0);
};;

ShapePainterObject.prototype['GetFillOpacity'] = ShapePainterObject.prototype.GetFillOpacity = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetFillOpacity_0(self);
};;

ShapePainterObject.prototype['SetFillColor'] = ShapePainterObject.prototype.SetFillColor = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_ShapePainterObject_SetFillColor_3(self, arg0, arg1, arg2);
};;

ShapePainterObject.prototype['GetFillColorR'] = ShapePainterObject.prototype.GetFillColorR = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetFillColorR_0(self);
};;

ShapePainterObject.prototype['GetFillColorG'] = ShapePainterObject.prototype.GetFillColorG = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetFillColorG_0(self);
};;

ShapePainterObject.prototype['GetFillColorB'] = ShapePainterObject.prototype.GetFillColorB = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ShapePainterObject_GetFillColorB_0(self);
};;

ShapePainterObject.prototype['SetName'] = ShapePainterObject.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ShapePainterObject_SetName_1(self, arg0);
};;

ShapePainterObject.prototype['GetName'] = ShapePainterObject.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ShapePainterObject_GetName_0(self));
};;

ShapePainterObject.prototype['SetType'] = ShapePainterObject.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ShapePainterObject_SetType_1(self, arg0);
};;

ShapePainterObject.prototype['GetType'] = ShapePainterObject.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ShapePainterObject_GetType_0(self));
};;

ShapePainterObject.prototype['GetProperties'] = ShapePainterObject.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ShapePainterObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

ShapePainterObject.prototype['UpdateProperty'] = ShapePainterObject.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_ShapePainterObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

ShapePainterObject.prototype['GetInitialInstanceProperties'] = ShapePainterObject.prototype.GetInitialInstanceProperties = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_ShapePainterObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

ShapePainterObject.prototype['UpdateInitialInstanceProperty'] = ShapePainterObject.prototype.UpdateInitialInstanceProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_ShapePainterObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

ShapePainterObject.prototype['ExposeResources'] = ShapePainterObject.prototype.ExposeResources = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ShapePainterObject_ExposeResources_1(self, arg0);
};;

ShapePainterObject.prototype['GetVariables'] = ShapePainterObject.prototype.GetVariables = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ShapePainterObject_GetVariables_0(self), VariablesContainer);
};;

ShapePainterObject.prototype['GetAllBehaviorNames'] = ShapePainterObject.prototype.GetAllBehaviorNames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ShapePainterObject_GetAllBehaviorNames_0(self), VectorString);
};;

ShapePainterObject.prototype['HasBehaviorNamed'] = ShapePainterObject.prototype.HasBehaviorNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ShapePainterObject_HasBehaviorNamed_1(self, arg0));
};;

ShapePainterObject.prototype['AddNewBehavior'] = ShapePainterObject.prototype.AddNewBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_ShapePainterObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

ShapePainterObject.prototype['GetBehavior'] = ShapePainterObject.prototype.GetBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ShapePainterObject_GetBehavior_1(self, arg0), Behavior);
};;

ShapePainterObject.prototype['RemoveBehavior'] = ShapePainterObject.prototype.RemoveBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ShapePainterObject_RemoveBehavior_1(self, arg0);
};;

ShapePainterObject.prototype['RenameBehavior'] = ShapePainterObject.prototype.RenameBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_ShapePainterObject_RenameBehavior_2(self, arg0, arg1));
};;

ShapePainterObject.prototype['SerializeTo'] = ShapePainterObject.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ShapePainterObject_SerializeTo_1(self, arg0);
};;

ShapePainterObject.prototype['UnserializeFrom'] = ShapePainterObject.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_ShapePainterObject_UnserializeFrom_2(self, arg0, arg1);
};;

  ShapePainterObject.prototype['__destroy__'] = ShapePainterObject.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
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

ProjectHelper.prototype['STATIC_CreateNewGDJSProject'] = ProjectHelper.prototype.STATIC_CreateNewGDJSProject = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ProjectHelper_STATIC_CreateNewGDJSProject_0(self), Project);
};;

ProjectHelper.prototype['STATIC_InitializePlatforms'] = ProjectHelper.prototype.STATIC_InitializePlatforms = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ProjectHelper_STATIC_InitializePlatforms_0(self);
};;

ProjectHelper.prototype['STATIC_SanityCheckBehaviorProperty'] = ProjectHelper.prototype.STATIC_SanityCheckBehaviorProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return Pointer_stringify(_emscripten_bind_ProjectHelper_STATIC_SanityCheckBehaviorProperty_3(self, arg0, arg1, arg2));
};;

ProjectHelper.prototype['STATIC_SanityCheckBehaviorsSharedDataProperty'] = ProjectHelper.prototype.STATIC_SanityCheckBehaviorsSharedDataProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return Pointer_stringify(_emscripten_bind_ProjectHelper_STATIC_SanityCheckBehaviorsSharedDataProperty_3(self, arg0, arg1, arg2));
};;

ProjectHelper.prototype['STATIC_SanityCheckObjectProperty'] = ProjectHelper.prototype.STATIC_SanityCheckObjectProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return Pointer_stringify(_emscripten_bind_ProjectHelper_STATIC_SanityCheckObjectProperty_3(self, arg0, arg1, arg2));
};;

ProjectHelper.prototype['STATIC_SanityCheckObjectInitialInstanceProperty'] = ProjectHelper.prototype.STATIC_SanityCheckObjectInitialInstanceProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return Pointer_stringify(_emscripten_bind_ProjectHelper_STATIC_SanityCheckObjectInitialInstanceProperty_3(self, arg0, arg1, arg2));
};;

  ProjectHelper.prototype['__destroy__'] = ProjectHelper.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ProjectHelper___destroy___0(self);
};
// ExpressionCodeGenerationInformation
function ExpressionCodeGenerationInformation() { throw "cannot construct a ExpressionCodeGenerationInformation, no constructor in IDL" }
ExpressionCodeGenerationInformation.prototype = Object.create(WrapperObject.prototype);
ExpressionCodeGenerationInformation.prototype.constructor = ExpressionCodeGenerationInformation;
ExpressionCodeGenerationInformation.prototype.__class__ = ExpressionCodeGenerationInformation;
ExpressionCodeGenerationInformation.__cache__ = {};
Module['ExpressionCodeGenerationInformation'] = ExpressionCodeGenerationInformation;

ExpressionCodeGenerationInformation.prototype['SetFunctionName'] = ExpressionCodeGenerationInformation.prototype.SetFunctionName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ExpressionCodeGenerationInformation_SetFunctionName_1(self, arg0), ExpressionCodeGenerationInformation);
};;

ExpressionCodeGenerationInformation.prototype['SetStatic'] = ExpressionCodeGenerationInformation.prototype.SetStatic = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExpressionCodeGenerationInformation_SetStatic_0(self), ExpressionCodeGenerationInformation);
};;

ExpressionCodeGenerationInformation.prototype['SetIncludeFile'] = ExpressionCodeGenerationInformation.prototype.SetIncludeFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ExpressionCodeGenerationInformation_SetIncludeFile_1(self, arg0), ExpressionCodeGenerationInformation);
};;

ExpressionCodeGenerationInformation.prototype['AddIncludeFile'] = ExpressionCodeGenerationInformation.prototype.AddIncludeFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ExpressionCodeGenerationInformation_AddIncludeFile_1(self, arg0), ExpressionCodeGenerationInformation);
};;

  ExpressionCodeGenerationInformation.prototype['__destroy__'] = ExpressionCodeGenerationInformation.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExpressionCodeGenerationInformation___destroy___0(self);
};
// AudioResource
/** @suppress {undefinedVars, duplicate} */function AudioResource() {
  this.ptr = _emscripten_bind_AudioResource_AudioResource_0();
  getCache(AudioResource)[this.ptr] = this;
};;
AudioResource.prototype = Object.create(WrapperObject.prototype);
AudioResource.prototype.constructor = AudioResource;
AudioResource.prototype.__class__ = AudioResource;
AudioResource.__cache__ = {};
Module['AudioResource'] = AudioResource;

AudioResource.prototype['Clone'] = AudioResource.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_AudioResource_Clone_0(self), Resource);
};;

AudioResource.prototype['SetName'] = AudioResource.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AudioResource_SetName_1(self, arg0);
};;

AudioResource.prototype['GetName'] = AudioResource.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_AudioResource_GetName_0(self));
};;

AudioResource.prototype['SetKind'] = AudioResource.prototype.SetKind = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AudioResource_SetKind_1(self, arg0);
};;

AudioResource.prototype['GetKind'] = AudioResource.prototype.GetKind = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_AudioResource_GetKind_0(self));
};;

AudioResource.prototype['IsUserAdded'] = AudioResource.prototype.IsUserAdded = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_AudioResource_IsUserAdded_0(self));
};;

AudioResource.prototype['SetUserAdded'] = AudioResource.prototype.SetUserAdded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AudioResource_SetUserAdded_1(self, arg0);
};;

AudioResource.prototype['UseFile'] = AudioResource.prototype.UseFile = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_AudioResource_UseFile_0(self));
};;

AudioResource.prototype['SetFile'] = AudioResource.prototype.SetFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AudioResource_SetFile_1(self, arg0);
};;

AudioResource.prototype['GetFile'] = AudioResource.prototype.GetFile = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_AudioResource_GetFile_0(self));
};;

AudioResource.prototype['GetAbsoluteFile'] = AudioResource.prototype.GetAbsoluteFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_AudioResource_GetAbsoluteFile_1(self, arg0));
};;

AudioResource.prototype['SetMetadata'] = AudioResource.prototype.SetMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AudioResource_SetMetadata_1(self, arg0);
};;

AudioResource.prototype['GetMetadata'] = AudioResource.prototype.GetMetadata = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_AudioResource_GetMetadata_0(self));
};;

AudioResource.prototype['GetProperties'] = AudioResource.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_AudioResource_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

AudioResource.prototype['UpdateProperty'] = AudioResource.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_AudioResource_UpdateProperty_3(self, arg0, arg1, arg2));
};;

AudioResource.prototype['SerializeTo'] = AudioResource.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AudioResource_SerializeTo_1(self, arg0);
};;

AudioResource.prototype['UnserializeFrom'] = AudioResource.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AudioResource_UnserializeFrom_1(self, arg0);
};;

  AudioResource.prototype['__destroy__'] = AudioResource.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_AudioResource___destroy___0(self);
};
// Exporter
/** @suppress {undefinedVars, duplicate} */function Exporter(arg0, arg1) {
  ensureCache.prepare();
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

Exporter.prototype['SetCodeOutputDirectory'] = Exporter.prototype.SetCodeOutputDirectory = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Exporter_SetCodeOutputDirectory_1(self, arg0);
};;

Exporter.prototype['ExportLayoutForPixiPreview'] = Exporter.prototype.ExportLayoutForPixiPreview = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_Exporter_ExportLayoutForPixiPreview_3(self, arg0, arg1, arg2));
};;

Exporter.prototype['ExportExternalLayoutForPixiPreview'] = Exporter.prototype.ExportExternalLayoutForPixiPreview = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  return !!(_emscripten_bind_Exporter_ExportExternalLayoutForPixiPreview_4(self, arg0, arg1, arg2, arg3));
};;

Exporter.prototype['ExportWholePixiProject'] = Exporter.prototype.ExportWholePixiProject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_Exporter_ExportWholePixiProject_3(self, arg0, arg1, arg2));
};;

Exporter.prototype['ExportWholeCocos2dProject'] = Exporter.prototype.ExportWholeCocos2dProject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_Exporter_ExportWholeCocos2dProject_3(self, arg0, arg1, arg2));
};;

Exporter.prototype['GetLastError'] = Exporter.prototype.GetLastError = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Exporter_GetLastError_0(self));
};;

  Exporter.prototype['__destroy__'] = Exporter.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Exporter___destroy___0(self);
};
// TextEntryObject
/** @suppress {undefinedVars, duplicate} */function TextEntryObject(arg0) {
  ensureCache.prepare();
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

TextEntryObject.prototype['SetName'] = TextEntryObject.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextEntryObject_SetName_1(self, arg0);
};;

TextEntryObject.prototype['GetName'] = TextEntryObject.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TextEntryObject_GetName_0(self));
};;

TextEntryObject.prototype['SetType'] = TextEntryObject.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextEntryObject_SetType_1(self, arg0);
};;

TextEntryObject.prototype['GetType'] = TextEntryObject.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_TextEntryObject_GetType_0(self));
};;

TextEntryObject.prototype['GetProperties'] = TextEntryObject.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_TextEntryObject_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

TextEntryObject.prototype['UpdateProperty'] = TextEntryObject.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_TextEntryObject_UpdateProperty_3(self, arg0, arg1, arg2));
};;

TextEntryObject.prototype['GetInitialInstanceProperties'] = TextEntryObject.prototype.GetInitialInstanceProperties = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_TextEntryObject_GetInitialInstanceProperties_3(self, arg0, arg1, arg2), MapStringPropertyDescriptor);
};;

TextEntryObject.prototype['UpdateInitialInstanceProperty'] = TextEntryObject.prototype.UpdateInitialInstanceProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return !!(_emscripten_bind_TextEntryObject_UpdateInitialInstanceProperty_5(self, arg0, arg1, arg2, arg3, arg4));
};;

TextEntryObject.prototype['ExposeResources'] = TextEntryObject.prototype.ExposeResources = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TextEntryObject_ExposeResources_1(self, arg0);
};;

TextEntryObject.prototype['GetVariables'] = TextEntryObject.prototype.GetVariables = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TextEntryObject_GetVariables_0(self), VariablesContainer);
};;

TextEntryObject.prototype['GetAllBehaviorNames'] = TextEntryObject.prototype.GetAllBehaviorNames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TextEntryObject_GetAllBehaviorNames_0(self), VectorString);
};;

TextEntryObject.prototype['HasBehaviorNamed'] = TextEntryObject.prototype.HasBehaviorNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_TextEntryObject_HasBehaviorNamed_1(self, arg0));
};;

TextEntryObject.prototype['AddNewBehavior'] = TextEntryObject.prototype.AddNewBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_TextEntryObject_AddNewBehavior_3(self, arg0, arg1, arg2), Behavior);
};;

TextEntryObject.prototype['GetBehavior'] = TextEntryObject.prototype.GetBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_TextEntryObject_GetBehavior_1(self, arg0), Behavior);
};;

TextEntryObject.prototype['RemoveBehavior'] = TextEntryObject.prototype.RemoveBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_TextEntryObject_RemoveBehavior_1(self, arg0);
};;

TextEntryObject.prototype['RenameBehavior'] = TextEntryObject.prototype.RenameBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_TextEntryObject_RenameBehavior_2(self, arg0, arg1));
};;

TextEntryObject.prototype['SerializeTo'] = TextEntryObject.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_TextEntryObject_SerializeTo_1(self, arg0);
};;

TextEntryObject.prototype['UnserializeFrom'] = TextEntryObject.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_TextEntryObject_UnserializeFrom_2(self, arg0, arg1);
};;

  TextEntryObject.prototype['__destroy__'] = TextEntryObject.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TextEntryObject___destroy___0(self);
};
// ResourcesInUseHelper
/** @suppress {undefinedVars, duplicate} */function ResourcesInUseHelper() {
  this.ptr = _emscripten_bind_ResourcesInUseHelper_ResourcesInUseHelper_0();
  getCache(ResourcesInUseHelper)[this.ptr] = this;
};;
ResourcesInUseHelper.prototype = Object.create(WrapperObject.prototype);
ResourcesInUseHelper.prototype.constructor = ResourcesInUseHelper;
ResourcesInUseHelper.prototype.__class__ = ResourcesInUseHelper;
ResourcesInUseHelper.__cache__ = {};
Module['ResourcesInUseHelper'] = ResourcesInUseHelper;

ResourcesInUseHelper.prototype['GetAllImages'] = ResourcesInUseHelper.prototype.GetAllImages = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ResourcesInUseHelper_GetAllImages_0(self), SetString);
};;

ResourcesInUseHelper.prototype['GetAllAudios'] = ResourcesInUseHelper.prototype.GetAllAudios = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ResourcesInUseHelper_GetAllAudios_0(self), SetString);
};;

ResourcesInUseHelper.prototype['GetAllFonts'] = ResourcesInUseHelper.prototype.GetAllFonts = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ResourcesInUseHelper_GetAllFonts_0(self), SetString);
};;

ResourcesInUseHelper.prototype['GetAll'] = ResourcesInUseHelper.prototype.GetAll = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ResourcesInUseHelper_GetAll_1(self, arg0), SetString);
};;

  ResourcesInUseHelper.prototype['__destroy__'] = ResourcesInUseHelper.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ResourcesInUseHelper___destroy___0(self);
};
// BaseEvent
/** @suppress {undefinedVars, duplicate} */function BaseEvent() {
  this.ptr = _emscripten_bind_BaseEvent_BaseEvent_0();
  getCache(BaseEvent)[this.ptr] = this;
};;
BaseEvent.prototype = Object.create(WrapperObject.prototype);
BaseEvent.prototype.constructor = BaseEvent;
BaseEvent.prototype.__class__ = BaseEvent;
BaseEvent.__cache__ = {};
Module['BaseEvent'] = BaseEvent;

BaseEvent.prototype['Clone'] = BaseEvent.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BaseEvent_Clone_0(self), BaseEvent);
};;

BaseEvent.prototype['GetType'] = BaseEvent.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_BaseEvent_GetType_0(self));
};;

BaseEvent.prototype['SetType'] = BaseEvent.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_BaseEvent_SetType_1(self, arg0);
};;

BaseEvent.prototype['IsExecutable'] = BaseEvent.prototype.IsExecutable = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_BaseEvent_IsExecutable_0(self));
};;

BaseEvent.prototype['CanHaveSubEvents'] = BaseEvent.prototype.CanHaveSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_BaseEvent_CanHaveSubEvents_0(self));
};;

BaseEvent.prototype['HasSubEvents'] = BaseEvent.prototype.HasSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_BaseEvent_HasSubEvents_0(self));
};;

BaseEvent.prototype['GetSubEvents'] = BaseEvent.prototype.GetSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BaseEvent_GetSubEvents_0(self), EventsList);
};;

BaseEvent.prototype['IsDisabled'] = BaseEvent.prototype.IsDisabled = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_BaseEvent_IsDisabled_0(self));
};;

BaseEvent.prototype['SetDisabled'] = BaseEvent.prototype.SetDisabled = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_BaseEvent_SetDisabled_1(self, arg0);
};;

BaseEvent.prototype['IsFolded'] = BaseEvent.prototype.IsFolded = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_BaseEvent_IsFolded_0(self));
};;

BaseEvent.prototype['SetFolded'] = BaseEvent.prototype.SetFolded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_BaseEvent_SetFolded_1(self, arg0);
};;

BaseEvent.prototype['SerializeTo'] = BaseEvent.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_BaseEvent_SerializeTo_1(self, arg0);
};;

BaseEvent.prototype['UnserializeFrom'] = BaseEvent.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_BaseEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  BaseEvent.prototype['__destroy__'] = BaseEvent.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
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

EventsCodeGenerator.prototype['STATIC_GenerateSceneEventsCompleteCode'] = EventsCodeGenerator.prototype.STATIC_GenerateSceneEventsCompleteCode = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return Pointer_stringify(_emscripten_bind_EventsCodeGenerator_STATIC_GenerateSceneEventsCompleteCode_5(self, arg0, arg1, arg2, arg3, arg4));
};;

EventsCodeGenerator.prototype['STATIC_GenerateEventsFunctionCode'] = EventsCodeGenerator.prototype.STATIC_GenerateEventsFunctionCode = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return Pointer_stringify(_emscripten_bind_EventsCodeGenerator_STATIC_GenerateEventsFunctionCode_5(self, arg0, arg1, arg2, arg3, arg4));
};;

// MapStringBoolean
/** @suppress {undefinedVars, duplicate} */function MapStringBoolean() {
  this.ptr = _emscripten_bind_MapStringBoolean_MapStringBoolean_0();
  getCache(MapStringBoolean)[this.ptr] = this;
};;
MapStringBoolean.prototype = Object.create(WrapperObject.prototype);
MapStringBoolean.prototype.constructor = MapStringBoolean;
MapStringBoolean.prototype.__class__ = MapStringBoolean;
MapStringBoolean.__cache__ = {};
Module['MapStringBoolean'] = MapStringBoolean;

MapStringBoolean.prototype['MAP_get'] = MapStringBoolean.prototype.MAP_get = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_MapStringBoolean_MAP_get_1(self, arg0));
};;

MapStringBoolean.prototype['MAP_set'] = MapStringBoolean.prototype.MAP_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_MapStringBoolean_MAP_set_2(self, arg0, arg1);
};;

MapStringBoolean.prototype['MAP_has'] = MapStringBoolean.prototype.MAP_has = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_MapStringBoolean_MAP_has_1(self, arg0));
};;

MapStringBoolean.prototype['MAP_keys'] = MapStringBoolean.prototype.MAP_keys = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_MapStringBoolean_MAP_keys_0(self), VectorString);
};;

  MapStringBoolean.prototype['__destroy__'] = MapStringBoolean.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_MapStringBoolean___destroy___0(self);
};
// Variable
/** @suppress {undefinedVars, duplicate} */function Variable() {
  this.ptr = _emscripten_bind_Variable_Variable_0();
  getCache(Variable)[this.ptr] = this;
};;
Variable.prototype = Object.create(WrapperObject.prototype);
Variable.prototype.constructor = Variable;
Variable.prototype.__class__ = Variable;
Variable.__cache__ = {};
Module['Variable'] = Variable;

Variable.prototype['SetString'] = Variable.prototype.SetString = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Variable_SetString_1(self, arg0);
};;

Variable.prototype['GetString'] = Variable.prototype.GetString = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Variable_GetString_0(self));
};;

Variable.prototype['SetValue'] = Variable.prototype.SetValue = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Variable_SetValue_1(self, arg0);
};;

Variable.prototype['GetValue'] = Variable.prototype.GetValue = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Variable_GetValue_0(self);
};;

Variable.prototype['HasChild'] = Variable.prototype.HasChild = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Variable_HasChild_1(self, arg0));
};;

Variable.prototype['GetChild'] = Variable.prototype.GetChild = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Variable_GetChild_1(self, arg0), Variable);
};;

Variable.prototype['RemoveChild'] = Variable.prototype.RemoveChild = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Variable_RemoveChild_1(self, arg0);
};;

Variable.prototype['RenameChild'] = Variable.prototype.RenameChild = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_Variable_RenameChild_2(self, arg0, arg1));
};;

Variable.prototype['GetAllChildrenNames'] = Variable.prototype.GetAllChildrenNames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Variable_GetAllChildrenNames_0(self), VectorString);
};;

Variable.prototype['GetChildrenCount'] = Variable.prototype.GetChildrenCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Variable_GetChildrenCount_0(self);
};;

Variable.prototype['IsNumber'] = Variable.prototype.IsNumber = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Variable_IsNumber_0(self));
};;

Variable.prototype['IsStructure'] = Variable.prototype.IsStructure = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Variable_IsStructure_0(self));
};;

Variable.prototype['Contains'] = Variable.prototype.Contains = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return !!(_emscripten_bind_Variable_Contains_2(self, arg0, arg1));
};;

Variable.prototype['RemoveRecursively'] = Variable.prototype.RemoveRecursively = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Variable_RemoveRecursively_1(self, arg0);
};;

Variable.prototype['SerializeTo'] = Variable.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Variable_SerializeTo_1(self, arg0);
};;

Variable.prototype['UnserializeFrom'] = Variable.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Variable_UnserializeFrom_1(self, arg0);
};;

  Variable.prototype['__destroy__'] = Variable.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Variable___destroy___0(self);
};
// CallbacksForExpressionCorrectnessTesting
/** @suppress {undefinedVars, duplicate} */function CallbacksForExpressionCorrectnessTesting(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  this.ptr = _emscripten_bind_CallbacksForExpressionCorrectnessTesting_CallbacksForExpressionCorrectnessTesting_2(arg0, arg1);
  getCache(CallbacksForExpressionCorrectnessTesting)[this.ptr] = this;
};;
CallbacksForExpressionCorrectnessTesting.prototype = Object.create(WrapperObject.prototype);
CallbacksForExpressionCorrectnessTesting.prototype.constructor = CallbacksForExpressionCorrectnessTesting;
CallbacksForExpressionCorrectnessTesting.prototype.__class__ = CallbacksForExpressionCorrectnessTesting;
CallbacksForExpressionCorrectnessTesting.__cache__ = {};
Module['CallbacksForExpressionCorrectnessTesting'] = CallbacksForExpressionCorrectnessTesting;

CallbacksForExpressionCorrectnessTesting.prototype['GetFirstError'] = CallbacksForExpressionCorrectnessTesting.prototype.GetFirstError = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_CallbacksForExpressionCorrectnessTesting_GetFirstError_0(self));
};;

CallbacksForExpressionCorrectnessTesting.prototype['GetFirstErrorPosition'] = CallbacksForExpressionCorrectnessTesting.prototype.GetFirstErrorPosition = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_CallbacksForExpressionCorrectnessTesting_GetFirstErrorPosition_0(self);
};;

  CallbacksForExpressionCorrectnessTesting.prototype['__destroy__'] = CallbacksForExpressionCorrectnessTesting.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_CallbacksForExpressionCorrectnessTesting___destroy___0(self);
};
// PlatformExtension
/** @suppress {undefinedVars, duplicate} */function PlatformExtension() {
  this.ptr = _emscripten_bind_PlatformExtension_PlatformExtension_0();
  getCache(PlatformExtension)[this.ptr] = this;
};;
PlatformExtension.prototype = Object.create(WrapperObject.prototype);
PlatformExtension.prototype.constructor = PlatformExtension;
PlatformExtension.prototype.__class__ = PlatformExtension;
PlatformExtension.__cache__ = {};
Module['PlatformExtension'] = PlatformExtension;

PlatformExtension.prototype['SetExtensionInformation'] = PlatformExtension.prototype.SetExtensionInformation = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  return wrapPointer(_emscripten_bind_PlatformExtension_SetExtensionInformation_5(self, arg0, arg1, arg2, arg3, arg4), PlatformExtension);
};;

PlatformExtension.prototype['SetExtensionHelpPath'] = PlatformExtension.prototype.SetExtensionHelpPath = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_SetExtensionHelpPath_1(self, arg0), PlatformExtension);
};;

PlatformExtension.prototype['MarkAsDeprecated'] = PlatformExtension.prototype.MarkAsDeprecated = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_PlatformExtension_MarkAsDeprecated_0(self);
};;

PlatformExtension.prototype['AddCondition'] = PlatformExtension.prototype.AddCondition = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  if (arg5 && typeof arg5 === 'object') arg5 = arg5.ptr;
  else arg5 = ensureString(arg5);
  if (arg6 && typeof arg6 === 'object') arg6 = arg6.ptr;
  else arg6 = ensureString(arg6);
  return wrapPointer(_emscripten_bind_PlatformExtension_AddCondition_7(self, arg0, arg1, arg2, arg3, arg4, arg5, arg6), InstructionMetadata);
};;

PlatformExtension.prototype['AddAction'] = PlatformExtension.prototype.AddAction = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  if (arg5 && typeof arg5 === 'object') arg5 = arg5.ptr;
  else arg5 = ensureString(arg5);
  if (arg6 && typeof arg6 === 'object') arg6 = arg6.ptr;
  else arg6 = ensureString(arg6);
  return wrapPointer(_emscripten_bind_PlatformExtension_AddAction_7(self, arg0, arg1, arg2, arg3, arg4, arg5, arg6), InstructionMetadata);
};;

PlatformExtension.prototype['AddExpression'] = PlatformExtension.prototype.AddExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  return wrapPointer(_emscripten_bind_PlatformExtension_AddExpression_5(self, arg0, arg1, arg2, arg3, arg4), ExpressionMetadata);
};;

PlatformExtension.prototype['AddStrExpression'] = PlatformExtension.prototype.AddStrExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  return wrapPointer(_emscripten_bind_PlatformExtension_AddStrExpression_5(self, arg0, arg1, arg2, arg3, arg4), ExpressionMetadata);
};;

PlatformExtension.prototype['WRAPPED_AddBehavior'] = PlatformExtension.prototype.WRAPPED_AddBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  if (arg5 && typeof arg5 === 'object') arg5 = arg5.ptr;
  else arg5 = ensureString(arg5);
  if (arg6 && typeof arg6 === 'object') arg6 = arg6.ptr;
  else arg6 = ensureString(arg6);
  if (arg7 && typeof arg7 === 'object') arg7 = arg7.ptr;
  if (arg8 && typeof arg8 === 'object') arg8 = arg8.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_WRAPPED_AddBehavior_9(self, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8), BehaviorMetadata);
};;

PlatformExtension.prototype['WRAPPED_AddObject'] = PlatformExtension.prototype.WRAPPED_AddObject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_WRAPPED_AddObject_5(self, arg0, arg1, arg2, arg3, arg4), ObjectMetadata);
};;

PlatformExtension.prototype['GetFullName'] = PlatformExtension.prototype.GetFullName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PlatformExtension_GetFullName_0(self));
};;

PlatformExtension.prototype['GetName'] = PlatformExtension.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PlatformExtension_GetName_0(self));
};;

PlatformExtension.prototype['GetDescription'] = PlatformExtension.prototype.GetDescription = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PlatformExtension_GetDescription_0(self));
};;

PlatformExtension.prototype['GetAuthor'] = PlatformExtension.prototype.GetAuthor = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PlatformExtension_GetAuthor_0(self));
};;

PlatformExtension.prototype['GetLicense'] = PlatformExtension.prototype.GetLicense = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PlatformExtension_GetLicense_0(self));
};;

PlatformExtension.prototype['GetHelpPath'] = PlatformExtension.prototype.GetHelpPath = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PlatformExtension_GetHelpPath_0(self));
};;

PlatformExtension.prototype['IsBuiltin'] = PlatformExtension.prototype.IsBuiltin = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_PlatformExtension_IsBuiltin_0(self));
};;

PlatformExtension.prototype['GetNameSpace'] = PlatformExtension.prototype.GetNameSpace = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PlatformExtension_GetNameSpace_0(self));
};;

PlatformExtension.prototype['GetExtensionObjectsTypes'] = PlatformExtension.prototype.GetExtensionObjectsTypes = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_GetExtensionObjectsTypes_0(self), VectorString);
};;

PlatformExtension.prototype['GetBehaviorsTypes'] = PlatformExtension.prototype.GetBehaviorsTypes = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_GetBehaviorsTypes_0(self), VectorString);
};;

PlatformExtension.prototype['GetObjectMetadata'] = PlatformExtension.prototype.GetObjectMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetObjectMetadata_1(self, arg0), ObjectMetadata);
};;

PlatformExtension.prototype['GetBehaviorMetadata'] = PlatformExtension.prototype.GetBehaviorMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetBehaviorMetadata_1(self, arg0), BehaviorMetadata);
};;

PlatformExtension.prototype['GetAllEvents'] = PlatformExtension.prototype.GetAllEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllEvents_0(self), MapStringEventMetadata);
};;

PlatformExtension.prototype['GetAllActions'] = PlatformExtension.prototype.GetAllActions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllActions_0(self), MapStringInstructionMetadata);
};;

PlatformExtension.prototype['GetAllConditions'] = PlatformExtension.prototype.GetAllConditions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllConditions_0(self), MapStringInstructionMetadata);
};;

PlatformExtension.prototype['GetAllExpressions'] = PlatformExtension.prototype.GetAllExpressions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllExpressions_0(self), MapStringExpressionMetadata);
};;

PlatformExtension.prototype['GetAllStrExpressions'] = PlatformExtension.prototype.GetAllStrExpressions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllStrExpressions_0(self), MapStringExpressionMetadata);
};;

PlatformExtension.prototype['GetAllActionsForObject'] = PlatformExtension.prototype.GetAllActionsForObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllActionsForObject_1(self, arg0), MapStringInstructionMetadata);
};;

PlatformExtension.prototype['GetAllConditionsForObject'] = PlatformExtension.prototype.GetAllConditionsForObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllConditionsForObject_1(self, arg0), MapStringInstructionMetadata);
};;

PlatformExtension.prototype['GetAllExpressionsForObject'] = PlatformExtension.prototype.GetAllExpressionsForObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllExpressionsForObject_1(self, arg0), MapStringExpressionMetadata);
};;

PlatformExtension.prototype['GetAllStrExpressionsForObject'] = PlatformExtension.prototype.GetAllStrExpressionsForObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllStrExpressionsForObject_1(self, arg0), MapStringExpressionMetadata);
};;

PlatformExtension.prototype['GetAllActionsForBehavior'] = PlatformExtension.prototype.GetAllActionsForBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllActionsForBehavior_1(self, arg0), MapStringInstructionMetadata);
};;

PlatformExtension.prototype['GetAllConditionsForBehavior'] = PlatformExtension.prototype.GetAllConditionsForBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllConditionsForBehavior_1(self, arg0), MapStringInstructionMetadata);
};;

PlatformExtension.prototype['GetAllExpressionsForBehavior'] = PlatformExtension.prototype.GetAllExpressionsForBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllExpressionsForBehavior_1(self, arg0), MapStringExpressionMetadata);
};;

PlatformExtension.prototype['GetAllStrExpressionsForBehavior'] = PlatformExtension.prototype.GetAllStrExpressionsForBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PlatformExtension_GetAllStrExpressionsForBehavior_1(self, arg0), MapStringExpressionMetadata);
};;

PlatformExtension.prototype['STATIC_GetNamespaceSeparator'] = PlatformExtension.prototype.STATIC_GetNamespaceSeparator = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PlatformExtension_STATIC_GetNamespaceSeparator_0(self));
};;

  PlatformExtension.prototype['__destroy__'] = PlatformExtension.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_PlatformExtension___destroy___0(self);
};
// InitialInstance
/** @suppress {undefinedVars, duplicate} */function InitialInstance() {
  this.ptr = _emscripten_bind_InitialInstance_InitialInstance_0();
  getCache(InitialInstance)[this.ptr] = this;
};;
InitialInstance.prototype = Object.create(WrapperObject.prototype);
InitialInstance.prototype.constructor = InitialInstance;
InitialInstance.prototype.__class__ = InitialInstance;
InitialInstance.__cache__ = {};
Module['InitialInstance'] = InitialInstance;

InitialInstance.prototype['SetObjectName'] = InitialInstance.prototype.SetObjectName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstance_SetObjectName_1(self, arg0);
};;

InitialInstance.prototype['GetObjectName'] = InitialInstance.prototype.GetObjectName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InitialInstance_GetObjectName_0(self));
};;

InitialInstance.prototype['GetX'] = InitialInstance.prototype.GetX = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetX_0(self);
};;

InitialInstance.prototype['SetX'] = InitialInstance.prototype.SetX = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetX_1(self, arg0);
};;

InitialInstance.prototype['GetY'] = InitialInstance.prototype.GetY = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetY_0(self);
};;

InitialInstance.prototype['SetY'] = InitialInstance.prototype.SetY = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetY_1(self, arg0);
};;

InitialInstance.prototype['GetAngle'] = InitialInstance.prototype.GetAngle = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetAngle_0(self);
};;

InitialInstance.prototype['SetAngle'] = InitialInstance.prototype.SetAngle = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetAngle_1(self, arg0);
};;

InitialInstance.prototype['IsLocked'] = InitialInstance.prototype.IsLocked = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_InitialInstance_IsLocked_0(self));
};;

InitialInstance.prototype['SetLocked'] = InitialInstance.prototype.SetLocked = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetLocked_1(self, arg0);
};;

InitialInstance.prototype['GetZOrder'] = InitialInstance.prototype.GetZOrder = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetZOrder_0(self);
};;

InitialInstance.prototype['SetZOrder'] = InitialInstance.prototype.SetZOrder = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetZOrder_1(self, arg0);
};;

InitialInstance.prototype['GetLayer'] = InitialInstance.prototype.GetLayer = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_InitialInstance_GetLayer_0(self));
};;

InitialInstance.prototype['SetLayer'] = InitialInstance.prototype.SetLayer = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstance_SetLayer_1(self, arg0);
};;

InitialInstance.prototype['SetHasCustomSize'] = InitialInstance.prototype.SetHasCustomSize = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetHasCustomSize_1(self, arg0);
};;

InitialInstance.prototype['HasCustomSize'] = InitialInstance.prototype.HasCustomSize = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_InitialInstance_HasCustomSize_0(self));
};;

InitialInstance.prototype['SetCustomWidth'] = InitialInstance.prototype.SetCustomWidth = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetCustomWidth_1(self, arg0);
};;

InitialInstance.prototype['GetCustomWidth'] = InitialInstance.prototype.GetCustomWidth = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetCustomWidth_0(self);
};;

InitialInstance.prototype['SetCustomHeight'] = InitialInstance.prototype.SetCustomHeight = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SetCustomHeight_1(self, arg0);
};;

InitialInstance.prototype['GetCustomHeight'] = InitialInstance.prototype.GetCustomHeight = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstance_GetCustomHeight_0(self);
};;

InitialInstance.prototype['UpdateCustomProperty'] = InitialInstance.prototype.UpdateCustomProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  _emscripten_bind_InitialInstance_UpdateCustomProperty_4(self, arg0, arg1, arg2, arg3);
};;

InitialInstance.prototype['GetCustomProperties'] = InitialInstance.prototype.GetCustomProperties = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_InitialInstance_GetCustomProperties_2(self, arg0, arg1), MapStringPropertyDescriptor);
};;

InitialInstance.prototype['GetRawFloatProperty'] = InitialInstance.prototype.GetRawFloatProperty = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_InitialInstance_GetRawFloatProperty_1(self, arg0);
};;

InitialInstance.prototype['GetRawStringProperty'] = InitialInstance.prototype.GetRawStringProperty = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return Pointer_stringify(_emscripten_bind_InitialInstance_GetRawStringProperty_1(self, arg0));
};;

InitialInstance.prototype['SetRawFloatProperty'] = InitialInstance.prototype.SetRawFloatProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_InitialInstance_SetRawFloatProperty_2(self, arg0, arg1);
};;

InitialInstance.prototype['SetRawStringProperty'] = InitialInstance.prototype.SetRawStringProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_InitialInstance_SetRawStringProperty_2(self, arg0, arg1);
};;

InitialInstance.prototype['GetVariables'] = InitialInstance.prototype.GetVariables = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InitialInstance_GetVariables_0(self), VariablesContainer);
};;

InitialInstance.prototype['SerializeTo'] = InitialInstance.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_SerializeTo_1(self, arg0);
};;

InitialInstance.prototype['UnserializeFrom'] = InitialInstance.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstance_UnserializeFrom_1(self, arg0);
};;

  InitialInstance.prototype['__destroy__'] = InitialInstance.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstance___destroy___0(self);
};
// Instruction
/** @suppress {undefinedVars, duplicate} */function Instruction() {
  this.ptr = _emscripten_bind_Instruction_Instruction_0();
  getCache(Instruction)[this.ptr] = this;
};;
Instruction.prototype = Object.create(WrapperObject.prototype);
Instruction.prototype.constructor = Instruction;
Instruction.prototype.__class__ = Instruction;
Instruction.__cache__ = {};
Module['Instruction'] = Instruction;

Instruction.prototype['CLONE_Instruction'] = Instruction.prototype.CLONE_Instruction = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Instruction_CLONE_Instruction_0(self), Instruction);
};;

Instruction.prototype['SetType'] = Instruction.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Instruction_SetType_1(self, arg0);
};;

Instruction.prototype['GetType'] = Instruction.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Instruction_GetType_0(self));
};;

Instruction.prototype['SetInverted'] = Instruction.prototype.SetInverted = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Instruction_SetInverted_1(self, arg0);
};;

Instruction.prototype['IsInverted'] = Instruction.prototype.IsInverted = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Instruction_IsInverted_0(self));
};;

Instruction.prototype['SetParameter'] = Instruction.prototype.SetParameter = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_Instruction_SetParameter_2(self, arg0, arg1);
};;

Instruction.prototype['GetParameter'] = Instruction.prototype.GetParameter = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_Instruction_GetParameter_1(self, arg0));
};;

Instruction.prototype['SetParametersCount'] = Instruction.prototype.SetParametersCount = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Instruction_SetParametersCount_1(self, arg0);
};;

Instruction.prototype['GetParametersCount'] = Instruction.prototype.GetParametersCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Instruction_GetParametersCount_0(self);
};;

Instruction.prototype['GetSubInstructions'] = Instruction.prototype.GetSubInstructions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Instruction_GetSubInstructions_0(self), InstructionsList);
};;

  Instruction.prototype['__destroy__'] = Instruction.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Instruction___destroy___0(self);
};
// ExtensionAndObjectMetadata
function ExtensionAndObjectMetadata() { throw "cannot construct a ExtensionAndObjectMetadata, no constructor in IDL" }
ExtensionAndObjectMetadata.prototype = Object.create(WrapperObject.prototype);
ExtensionAndObjectMetadata.prototype.constructor = ExtensionAndObjectMetadata;
ExtensionAndObjectMetadata.prototype.__class__ = ExtensionAndObjectMetadata;
ExtensionAndObjectMetadata.__cache__ = {};
Module['ExtensionAndObjectMetadata'] = ExtensionAndObjectMetadata;

ExtensionAndObjectMetadata.prototype['GetExtension'] = ExtensionAndObjectMetadata.prototype.GetExtension = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExtensionAndObjectMetadata_GetExtension_0(self), PlatformExtension);
};;

ExtensionAndObjectMetadata.prototype['GetMetadata'] = ExtensionAndObjectMetadata.prototype.GetMetadata = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExtensionAndObjectMetadata_GetMetadata_0(self), ObjectMetadata);
};;

  ExtensionAndObjectMetadata.prototype['__destroy__'] = ExtensionAndObjectMetadata.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExtensionAndObjectMetadata___destroy___0(self);
};
// EventsRemover
/** @suppress {undefinedVars, duplicate} */function EventsRemover() {
  this.ptr = _emscripten_bind_EventsRemover_EventsRemover_0();
  getCache(EventsRemover)[this.ptr] = this;
};;
EventsRemover.prototype = Object.create(WrapperObject.prototype);
EventsRemover.prototype.constructor = EventsRemover;
EventsRemover.prototype.__class__ = EventsRemover;
EventsRemover.__cache__ = {};
Module['EventsRemover'] = EventsRemover;

EventsRemover.prototype['AddEventToRemove'] = EventsRemover.prototype.AddEventToRemove = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsRemover_AddEventToRemove_1(self, arg0);
};;

EventsRemover.prototype['AddInstructionToRemove'] = EventsRemover.prototype.AddInstructionToRemove = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsRemover_AddInstructionToRemove_1(self, arg0);
};;

EventsRemover.prototype['Launch'] = EventsRemover.prototype.Launch = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsRemover_Launch_1(self, arg0);
};;

  EventsRemover.prototype['__destroy__'] = EventsRemover.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_EventsRemover___destroy___0(self);
};
// InitialInstancesContainer
/** @suppress {undefinedVars, duplicate} */function InitialInstancesContainer() {
  this.ptr = _emscripten_bind_InitialInstancesContainer_InitialInstancesContainer_0();
  getCache(InitialInstancesContainer)[this.ptr] = this;
};;
InitialInstancesContainer.prototype = Object.create(WrapperObject.prototype);
InitialInstancesContainer.prototype.constructor = InitialInstancesContainer;
InitialInstancesContainer.prototype.__class__ = InitialInstancesContainer;
InitialInstancesContainer.__cache__ = {};
Module['InitialInstancesContainer'] = InitialInstancesContainer;

InitialInstancesContainer.prototype['Clone'] = InitialInstancesContainer.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InitialInstancesContainer_Clone_0(self), InitialInstancesContainer);
};;

InitialInstancesContainer.prototype['GetInstancesCount'] = InitialInstancesContainer.prototype.GetInstancesCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_InitialInstancesContainer_GetInstancesCount_0(self);
};;

InitialInstancesContainer.prototype['IterateOverInstances'] = InitialInstancesContainer.prototype.IterateOverInstances = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstancesContainer_IterateOverInstances_1(self, arg0);
};;

InitialInstancesContainer.prototype['IterateOverInstancesWithZOrdering'] = InitialInstancesContainer.prototype.IterateOverInstancesWithZOrdering = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_InitialInstancesContainer_IterateOverInstancesWithZOrdering_2(self, arg0, arg1);
};;

InitialInstancesContainer.prototype['MoveInstancesToLayer'] = InitialInstancesContainer.prototype.MoveInstancesToLayer = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_InitialInstancesContainer_MoveInstancesToLayer_2(self, arg0, arg1);
};;

InitialInstancesContainer.prototype['RemoveAllInstancesOnLayer'] = InitialInstancesContainer.prototype.RemoveAllInstancesOnLayer = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstancesContainer_RemoveAllInstancesOnLayer_1(self, arg0);
};;

InitialInstancesContainer.prototype['RemoveInitialInstancesOfObject'] = InitialInstancesContainer.prototype.RemoveInitialInstancesOfObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_InitialInstancesContainer_RemoveInitialInstancesOfObject_1(self, arg0);
};;

InitialInstancesContainer.prototype['HasInstancesOfObject'] = InitialInstancesContainer.prototype.HasInstancesOfObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_InitialInstancesContainer_HasInstancesOfObject_1(self, arg0));
};;

InitialInstancesContainer.prototype['SomeInstancesAreOnLayer'] = InitialInstancesContainer.prototype.SomeInstancesAreOnLayer = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_InitialInstancesContainer_SomeInstancesAreOnLayer_1(self, arg0));
};;

InitialInstancesContainer.prototype['RenameInstancesOfObject'] = InitialInstancesContainer.prototype.RenameInstancesOfObject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_InitialInstancesContainer_RenameInstancesOfObject_2(self, arg0, arg1);
};;

InitialInstancesContainer.prototype['RemoveInstance'] = InitialInstancesContainer.prototype.RemoveInstance = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstancesContainer_RemoveInstance_1(self, arg0);
};;

InitialInstancesContainer.prototype['InsertNewInitialInstance'] = InitialInstancesContainer.prototype.InsertNewInitialInstance = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InitialInstancesContainer_InsertNewInitialInstance_0(self), InitialInstance);
};;

InitialInstancesContainer.prototype['InsertInitialInstance'] = InitialInstancesContainer.prototype.InsertInitialInstance = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_InitialInstancesContainer_InsertInitialInstance_1(self, arg0), InitialInstance);
};;

InitialInstancesContainer.prototype['SerializeTo'] = InitialInstancesContainer.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstancesContainer_SerializeTo_1(self, arg0);
};;

InitialInstancesContainer.prototype['UnserializeFrom'] = InitialInstancesContainer.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstancesContainer_UnserializeFrom_1(self, arg0);
};;

  InitialInstancesContainer.prototype['__destroy__'] = InitialInstancesContainer.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstancesContainer___destroy___0(self);
};
// ImageResource
/** @suppress {undefinedVars, duplicate} */function ImageResource() {
  this.ptr = _emscripten_bind_ImageResource_ImageResource_0();
  getCache(ImageResource)[this.ptr] = this;
};;
ImageResource.prototype = Object.create(WrapperObject.prototype);
ImageResource.prototype.constructor = ImageResource;
ImageResource.prototype.__class__ = ImageResource;
ImageResource.__cache__ = {};
Module['ImageResource'] = ImageResource;

ImageResource.prototype['IsSmooth'] = ImageResource.prototype.IsSmooth = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImageResource_IsSmooth_0(self));
};;

ImageResource.prototype['SetSmooth'] = ImageResource.prototype.SetSmooth = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImageResource_SetSmooth_1(self, arg0);
};;

ImageResource.prototype['Clone'] = ImageResource.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImageResource_Clone_0(self), Resource);
};;

ImageResource.prototype['SetName'] = ImageResource.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ImageResource_SetName_1(self, arg0);
};;

ImageResource.prototype['GetName'] = ImageResource.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ImageResource_GetName_0(self));
};;

ImageResource.prototype['SetKind'] = ImageResource.prototype.SetKind = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ImageResource_SetKind_1(self, arg0);
};;

ImageResource.prototype['GetKind'] = ImageResource.prototype.GetKind = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ImageResource_GetKind_0(self));
};;

ImageResource.prototype['IsUserAdded'] = ImageResource.prototype.IsUserAdded = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImageResource_IsUserAdded_0(self));
};;

ImageResource.prototype['SetUserAdded'] = ImageResource.prototype.SetUserAdded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImageResource_SetUserAdded_1(self, arg0);
};;

ImageResource.prototype['UseFile'] = ImageResource.prototype.UseFile = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImageResource_UseFile_0(self));
};;

ImageResource.prototype['SetFile'] = ImageResource.prototype.SetFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ImageResource_SetFile_1(self, arg0);
};;

ImageResource.prototype['GetFile'] = ImageResource.prototype.GetFile = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ImageResource_GetFile_0(self));
};;

ImageResource.prototype['GetAbsoluteFile'] = ImageResource.prototype.GetAbsoluteFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_ImageResource_GetAbsoluteFile_1(self, arg0));
};;

ImageResource.prototype['SetMetadata'] = ImageResource.prototype.SetMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ImageResource_SetMetadata_1(self, arg0);
};;

ImageResource.prototype['GetMetadata'] = ImageResource.prototype.GetMetadata = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ImageResource_GetMetadata_0(self));
};;

ImageResource.prototype['GetProperties'] = ImageResource.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ImageResource_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

ImageResource.prototype['UpdateProperty'] = ImageResource.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_ImageResource_UpdateProperty_3(self, arg0, arg1, arg2));
};;

ImageResource.prototype['SerializeTo'] = ImageResource.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImageResource_SerializeTo_1(self, arg0);
};;

ImageResource.prototype['UnserializeFrom'] = ImageResource.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImageResource_UnserializeFrom_1(self, arg0);
};;

  ImageResource.prototype['__destroy__'] = ImageResource.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ImageResource___destroy___0(self);
};
// LoadingScreen
/** @suppress {undefinedVars, duplicate} */function LoadingScreen() {
  this.ptr = _emscripten_bind_LoadingScreen_LoadingScreen_0();
  getCache(LoadingScreen)[this.ptr] = this;
};;
LoadingScreen.prototype = Object.create(WrapperObject.prototype);
LoadingScreen.prototype.constructor = LoadingScreen;
LoadingScreen.prototype.__class__ = LoadingScreen;
LoadingScreen.__cache__ = {};
Module['LoadingScreen'] = LoadingScreen;

LoadingScreen.prototype['ShowGDevelopSplash'] = LoadingScreen.prototype.ShowGDevelopSplash = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_LoadingScreen_ShowGDevelopSplash_1(self, arg0);
};;

LoadingScreen.prototype['IsGDevelopSplashShown'] = LoadingScreen.prototype.IsGDevelopSplashShown = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_LoadingScreen_IsGDevelopSplashShown_0(self));
};;

LoadingScreen.prototype['SerializeTo'] = LoadingScreen.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_LoadingScreen_SerializeTo_1(self, arg0);
};;

LoadingScreen.prototype['UnserializeFrom'] = LoadingScreen.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_LoadingScreen_UnserializeFrom_1(self, arg0);
};;

  LoadingScreen.prototype['__destroy__'] = LoadingScreen.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_LoadingScreen___destroy___0(self);
};
// SerializerValue
function SerializerValue() { throw "cannot construct a SerializerValue, no constructor in IDL" }
SerializerValue.prototype = Object.create(WrapperObject.prototype);
SerializerValue.prototype.constructor = SerializerValue;
SerializerValue.prototype.__class__ = SerializerValue;
SerializerValue.__cache__ = {};
Module['SerializerValue'] = SerializerValue;

SerializerValue.prototype['GetBool'] = SerializerValue.prototype.GetBool = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_SerializerValue_GetBool_0(self));
};;

SerializerValue.prototype['GetString'] = SerializerValue.prototype.GetString = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_SerializerValue_GetString_0(self));
};;

SerializerValue.prototype['GetInt'] = SerializerValue.prototype.GetInt = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_SerializerValue_GetInt_0(self);
};;

SerializerValue.prototype['GetDouble'] = SerializerValue.prototype.GetDouble = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_SerializerValue_GetDouble_0(self);
};;

  SerializerValue.prototype['__destroy__'] = SerializerValue.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
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

VersionWrapper.prototype['STATIC_Major'] = VersionWrapper.prototype.STATIC_Major = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VersionWrapper_STATIC_Major_0(self);
};;

VersionWrapper.prototype['STATIC_Minor'] = VersionWrapper.prototype.STATIC_Minor = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VersionWrapper_STATIC_Minor_0(self);
};;

VersionWrapper.prototype['STATIC_Build'] = VersionWrapper.prototype.STATIC_Build = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VersionWrapper_STATIC_Build_0(self);
};;

VersionWrapper.prototype['STATIC_Revision'] = VersionWrapper.prototype.STATIC_Revision = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VersionWrapper_STATIC_Revision_0(self);
};;

VersionWrapper.prototype['STATIC_FullString'] = VersionWrapper.prototype.STATIC_FullString = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_VersionWrapper_STATIC_FullString_0(self));
};;

VersionWrapper.prototype['STATIC_Status'] = VersionWrapper.prototype.STATIC_Status = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_VersionWrapper_STATIC_Status_0(self));
};;

VersionWrapper.prototype['STATIC_Year'] = VersionWrapper.prototype.STATIC_Year = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_VersionWrapper_STATIC_Year_0(self));
};;

VersionWrapper.prototype['STATIC_Month'] = VersionWrapper.prototype.STATIC_Month = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_VersionWrapper_STATIC_Month_0(self));
};;

VersionWrapper.prototype['STATIC_Date'] = VersionWrapper.prototype.STATIC_Date = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_VersionWrapper_STATIC_Date_0(self));
};;

  VersionWrapper.prototype['__destroy__'] = VersionWrapper.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VersionWrapper___destroy___0(self);
};
// VectorPairStringTextFormatting
function VectorPairStringTextFormatting() { throw "cannot construct a VectorPairStringTextFormatting, no constructor in IDL" }
VectorPairStringTextFormatting.prototype = Object.create(WrapperObject.prototype);
VectorPairStringTextFormatting.prototype.constructor = VectorPairStringTextFormatting;
VectorPairStringTextFormatting.prototype.__class__ = VectorPairStringTextFormatting;
VectorPairStringTextFormatting.__cache__ = {};
Module['VectorPairStringTextFormatting'] = VectorPairStringTextFormatting;

VectorPairStringTextFormatting.prototype['size'] = VectorPairStringTextFormatting.prototype.size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VectorPairStringTextFormatting_size_0(self);
};;

VectorPairStringTextFormatting.prototype['WRAPPED_GetString'] = VectorPairStringTextFormatting.prototype.WRAPPED_GetString = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_VectorPairStringTextFormatting_WRAPPED_GetString_1(self, arg0));
};;

VectorPairStringTextFormatting.prototype['WRAPPED_GetTextFormatting'] = VectorPairStringTextFormatting.prototype.WRAPPED_GetTextFormatting = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VectorPairStringTextFormatting_WRAPPED_GetTextFormatting_1(self, arg0), TextFormatting);
};;

  VectorPairStringTextFormatting.prototype['__destroy__'] = VectorPairStringTextFormatting.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorPairStringTextFormatting___destroy___0(self);
};
// InstructionsTypeRenamer
/** @suppress {undefinedVars, duplicate} */function InstructionsTypeRenamer(arg0, arg1, arg2) {
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  this.ptr = _emscripten_bind_InstructionsTypeRenamer_InstructionsTypeRenamer_3(arg0, arg1, arg2);
  getCache(InstructionsTypeRenamer)[this.ptr] = this;
};;
InstructionsTypeRenamer.prototype = Object.create(WrapperObject.prototype);
InstructionsTypeRenamer.prototype.constructor = InstructionsTypeRenamer;
InstructionsTypeRenamer.prototype.__class__ = InstructionsTypeRenamer;
InstructionsTypeRenamer.__cache__ = {};
Module['InstructionsTypeRenamer'] = InstructionsTypeRenamer;

InstructionsTypeRenamer.prototype['Launch'] = InstructionsTypeRenamer.prototype.Launch = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InstructionsTypeRenamer_Launch_1(self, arg0);
};;

  InstructionsTypeRenamer.prototype['__destroy__'] = InstructionsTypeRenamer.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_InstructionsTypeRenamer___destroy___0(self);
};
// Serializer
function Serializer() { throw "cannot construct a Serializer, no constructor in IDL" }
Serializer.prototype = Object.create(WrapperObject.prototype);
Serializer.prototype.constructor = Serializer;
Serializer.prototype.__class__ = Serializer;
Serializer.__cache__ = {};
Module['Serializer'] = Serializer;

Serializer.prototype['STATIC_ToJSON'] = Serializer.prototype.STATIC_ToJSON = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_Serializer_STATIC_ToJSON_1(self, arg0));
};;

Serializer.prototype['STATIC_FromJSON'] = Serializer.prototype.STATIC_FromJSON = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Serializer_STATIC_FromJSON_1(self, arg0), SerializerElement);
};;

  Serializer.prototype['__destroy__'] = Serializer.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Serializer___destroy___0(self);
};
// GroupEvent
/** @suppress {undefinedVars, duplicate} */function GroupEvent() {
  this.ptr = _emscripten_bind_GroupEvent_GroupEvent_0();
  getCache(GroupEvent)[this.ptr] = this;
};;
GroupEvent.prototype = Object.create(WrapperObject.prototype);
GroupEvent.prototype.constructor = GroupEvent;
GroupEvent.prototype.__class__ = GroupEvent;
GroupEvent.__cache__ = {};
Module['GroupEvent'] = GroupEvent;

GroupEvent.prototype['SetName'] = GroupEvent.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_GroupEvent_SetName_1(self, arg0);
};;

GroupEvent.prototype['GetName'] = GroupEvent.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_GroupEvent_GetName_0(self));
};;

GroupEvent.prototype['SetBackgroundColor'] = GroupEvent.prototype.SetBackgroundColor = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_GroupEvent_SetBackgroundColor_3(self, arg0, arg1, arg2);
};;

GroupEvent.prototype['GetBackgroundColorR'] = GroupEvent.prototype.GetBackgroundColorR = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_GroupEvent_GetBackgroundColorR_0(self);
};;

GroupEvent.prototype['GetBackgroundColorG'] = GroupEvent.prototype.GetBackgroundColorG = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_GroupEvent_GetBackgroundColorG_0(self);
};;

GroupEvent.prototype['GetBackgroundColorB'] = GroupEvent.prototype.GetBackgroundColorB = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_GroupEvent_GetBackgroundColorB_0(self);
};;

GroupEvent.prototype['SetSource'] = GroupEvent.prototype.SetSource = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_GroupEvent_SetSource_1(self, arg0);
};;

GroupEvent.prototype['GetSource'] = GroupEvent.prototype.GetSource = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_GroupEvent_GetSource_0(self));
};;

GroupEvent.prototype['GetCreationParameters'] = GroupEvent.prototype.GetCreationParameters = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GroupEvent_GetCreationParameters_0(self), VectorString);
};;

GroupEvent.prototype['GetCreationTimestamp'] = GroupEvent.prototype.GetCreationTimestamp = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_GroupEvent_GetCreationTimestamp_0(self);
};;

GroupEvent.prototype['SetCreationTimestamp'] = GroupEvent.prototype.SetCreationTimestamp = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GroupEvent_SetCreationTimestamp_1(self, arg0);
};;

GroupEvent.prototype['Clone'] = GroupEvent.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GroupEvent_Clone_0(self), GroupEvent);
};;

GroupEvent.prototype['GetType'] = GroupEvent.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_GroupEvent_GetType_0(self));
};;

GroupEvent.prototype['SetType'] = GroupEvent.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_GroupEvent_SetType_1(self, arg0);
};;

GroupEvent.prototype['IsExecutable'] = GroupEvent.prototype.IsExecutable = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_GroupEvent_IsExecutable_0(self));
};;

GroupEvent.prototype['CanHaveSubEvents'] = GroupEvent.prototype.CanHaveSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_GroupEvent_CanHaveSubEvents_0(self));
};;

GroupEvent.prototype['HasSubEvents'] = GroupEvent.prototype.HasSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_GroupEvent_HasSubEvents_0(self));
};;

GroupEvent.prototype['GetSubEvents'] = GroupEvent.prototype.GetSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GroupEvent_GetSubEvents_0(self), EventsList);
};;

GroupEvent.prototype['IsDisabled'] = GroupEvent.prototype.IsDisabled = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_GroupEvent_IsDisabled_0(self));
};;

GroupEvent.prototype['SetDisabled'] = GroupEvent.prototype.SetDisabled = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GroupEvent_SetDisabled_1(self, arg0);
};;

GroupEvent.prototype['IsFolded'] = GroupEvent.prototype.IsFolded = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_GroupEvent_IsFolded_0(self));
};;

GroupEvent.prototype['SetFolded'] = GroupEvent.prototype.SetFolded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GroupEvent_SetFolded_1(self, arg0);
};;

GroupEvent.prototype['SerializeTo'] = GroupEvent.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GroupEvent_SerializeTo_1(self, arg0);
};;

GroupEvent.prototype['UnserializeFrom'] = GroupEvent.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_GroupEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  GroupEvent.prototype['__destroy__'] = GroupEvent.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_GroupEvent___destroy___0(self);
};
// MapStringPropertyDescriptor
/** @suppress {undefinedVars, duplicate} */function MapStringPropertyDescriptor() {
  this.ptr = _emscripten_bind_MapStringPropertyDescriptor_MapStringPropertyDescriptor_0();
  getCache(MapStringPropertyDescriptor)[this.ptr] = this;
};;
MapStringPropertyDescriptor.prototype = Object.create(WrapperObject.prototype);
MapStringPropertyDescriptor.prototype.constructor = MapStringPropertyDescriptor;
MapStringPropertyDescriptor.prototype.__class__ = MapStringPropertyDescriptor;
MapStringPropertyDescriptor.__cache__ = {};
Module['MapStringPropertyDescriptor'] = MapStringPropertyDescriptor;

MapStringPropertyDescriptor.prototype['MAP_get'] = MapStringPropertyDescriptor.prototype.MAP_get = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_MapStringPropertyDescriptor_MAP_get_1(self, arg0), PropertyDescriptor);
};;

MapStringPropertyDescriptor.prototype['MAP_set'] = MapStringPropertyDescriptor.prototype.MAP_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_MapStringPropertyDescriptor_MAP_set_2(self, arg0, arg1);
};;

MapStringPropertyDescriptor.prototype['MAP_has'] = MapStringPropertyDescriptor.prototype.MAP_has = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_MapStringPropertyDescriptor_MAP_has_1(self, arg0));
};;

MapStringPropertyDescriptor.prototype['MAP_keys'] = MapStringPropertyDescriptor.prototype.MAP_keys = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_MapStringPropertyDescriptor_MAP_keys_0(self), VectorString);
};;

  MapStringPropertyDescriptor.prototype['__destroy__'] = MapStringPropertyDescriptor.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_MapStringPropertyDescriptor___destroy___0(self);
};
// LayoutEditorCanvasOptions
/** @suppress {undefinedVars, duplicate} */function LayoutEditorCanvasOptions() {
  this.ptr = _emscripten_bind_LayoutEditorCanvasOptions_LayoutEditorCanvasOptions_0();
  getCache(LayoutEditorCanvasOptions)[this.ptr] = this;
};;
LayoutEditorCanvasOptions.prototype = Object.create(WrapperObject.prototype);
LayoutEditorCanvasOptions.prototype.constructor = LayoutEditorCanvasOptions;
LayoutEditorCanvasOptions.prototype.__class__ = LayoutEditorCanvasOptions;
LayoutEditorCanvasOptions.__cache__ = {};
Module['LayoutEditorCanvasOptions'] = LayoutEditorCanvasOptions;

LayoutEditorCanvasOptions.prototype['SerializeTo'] = LayoutEditorCanvasOptions.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_LayoutEditorCanvasOptions_SerializeTo_1(self, arg0);
};;

LayoutEditorCanvasOptions.prototype['UnserializeFrom'] = LayoutEditorCanvasOptions.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_LayoutEditorCanvasOptions_UnserializeFrom_1(self, arg0);
};;

  LayoutEditorCanvasOptions.prototype['__destroy__'] = LayoutEditorCanvasOptions.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_LayoutEditorCanvasOptions___destroy___0(self);
};
// EventsList
/** @suppress {undefinedVars, duplicate} */function EventsList() {
  this.ptr = _emscripten_bind_EventsList_EventsList_0();
  getCache(EventsList)[this.ptr] = this;
};;
EventsList.prototype = Object.create(WrapperObject.prototype);
EventsList.prototype.constructor = EventsList;
EventsList.prototype.__class__ = EventsList;
EventsList.__cache__ = {};
Module['EventsList'] = EventsList;

EventsList.prototype['InsertEvent'] = EventsList.prototype.InsertEvent = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_EventsList_InsertEvent_2(self, arg0, arg1), BaseEvent);
};;

EventsList.prototype['InsertNewEvent'] = EventsList.prototype.InsertNewEvent = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_EventsList_InsertNewEvent_3(self, arg0, arg1, arg2), BaseEvent);
};;

EventsList.prototype['InsertEvents'] = EventsList.prototype.InsertEvents = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  _emscripten_bind_EventsList_InsertEvents_4(self, arg0, arg1, arg2, arg3);
};;

EventsList.prototype['GetEventAt'] = EventsList.prototype.GetEventAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_EventsList_GetEventAt_1(self, arg0), BaseEvent);
};;

EventsList.prototype['RemoveEventAt'] = EventsList.prototype.RemoveEventAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsList_RemoveEventAt_1(self, arg0);
};;

EventsList.prototype['RemoveEvent'] = EventsList.prototype.RemoveEvent = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsList_RemoveEvent_1(self, arg0);
};;

EventsList.prototype['GetEventsCount'] = EventsList.prototype.GetEventsCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_EventsList_GetEventsCount_0(self);
};;

EventsList.prototype['Contains'] = EventsList.prototype.Contains = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return !!(_emscripten_bind_EventsList_Contains_2(self, arg0, arg1));
};;

EventsList.prototype['IsEmpty'] = EventsList.prototype.IsEmpty = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_EventsList_IsEmpty_0(self));
};;

EventsList.prototype['Clear'] = EventsList.prototype.Clear = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_EventsList_Clear_0(self);
};;

EventsList.prototype['SerializeTo'] = EventsList.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsList_SerializeTo_1(self, arg0);
};;

EventsList.prototype['UnserializeFrom'] = EventsList.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_EventsList_UnserializeFrom_2(self, arg0, arg1);
};;

  EventsList.prototype['__destroy__'] = EventsList.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_EventsList___destroy___0(self);
};
// ParameterMetadata
/** @suppress {undefinedVars, duplicate} */function ParameterMetadata() {
  this.ptr = _emscripten_bind_ParameterMetadata_ParameterMetadata_0();
  getCache(ParameterMetadata)[this.ptr] = this;
};;
ParameterMetadata.prototype = Object.create(WrapperObject.prototype);
ParameterMetadata.prototype.constructor = ParameterMetadata;
ParameterMetadata.prototype.__class__ = ParameterMetadata;
ParameterMetadata.__cache__ = {};
Module['ParameterMetadata'] = ParameterMetadata;

ParameterMetadata.prototype['GetType'] = ParameterMetadata.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ParameterMetadata_GetType_0(self));
};;

ParameterMetadata.prototype['SetType'] = ParameterMetadata.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ParameterMetadata_SetType_1(self, arg0), ParameterMetadata);
};;

ParameterMetadata.prototype['GetName'] = ParameterMetadata.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ParameterMetadata_GetName_0(self));
};;

ParameterMetadata.prototype['SetName'] = ParameterMetadata.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ParameterMetadata_SetName_1(self, arg0), ParameterMetadata);
};;

ParameterMetadata.prototype['GetExtraInfo'] = ParameterMetadata.prototype.GetExtraInfo = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ParameterMetadata_GetExtraInfo_0(self));
};;

ParameterMetadata.prototype['SetExtraInfo'] = ParameterMetadata.prototype.SetExtraInfo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ParameterMetadata_SetExtraInfo_1(self, arg0), ParameterMetadata);
};;

ParameterMetadata.prototype['IsOptional'] = ParameterMetadata.prototype.IsOptional = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ParameterMetadata_IsOptional_0(self));
};;

ParameterMetadata.prototype['SetOptional'] = ParameterMetadata.prototype.SetOptional = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ParameterMetadata_SetOptional_1(self, arg0), ParameterMetadata);
};;

ParameterMetadata.prototype['GetDescription'] = ParameterMetadata.prototype.GetDescription = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ParameterMetadata_GetDescription_0(self));
};;

ParameterMetadata.prototype['SetDescription'] = ParameterMetadata.prototype.SetDescription = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ParameterMetadata_SetDescription_1(self, arg0), ParameterMetadata);
};;

ParameterMetadata.prototype['IsCodeOnly'] = ParameterMetadata.prototype.IsCodeOnly = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ParameterMetadata_IsCodeOnly_0(self));
};;

ParameterMetadata.prototype['SetCodeOnly'] = ParameterMetadata.prototype.SetCodeOnly = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ParameterMetadata_SetCodeOnly_1(self, arg0), ParameterMetadata);
};;

ParameterMetadata.prototype['GetDefaultValue'] = ParameterMetadata.prototype.GetDefaultValue = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ParameterMetadata_GetDefaultValue_0(self));
};;

ParameterMetadata.prototype['SetDefaultValue'] = ParameterMetadata.prototype.SetDefaultValue = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ParameterMetadata_SetDefaultValue_1(self, arg0), ParameterMetadata);
};;

ParameterMetadata.prototype['STATIC_IsObject'] = ParameterMetadata.prototype.STATIC_IsObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ParameterMetadata_STATIC_IsObject_1(self, arg0));
};;

ParameterMetadata.prototype['STATIC_IsBehavior'] = ParameterMetadata.prototype.STATIC_IsBehavior = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ParameterMetadata_STATIC_IsBehavior_1(self, arg0));
};;

  ParameterMetadata.prototype['__destroy__'] = ParameterMetadata.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ParameterMetadata___destroy___0(self);
};
// PlatformSpecificAssets
/** @suppress {undefinedVars, duplicate} */function PlatformSpecificAssets() {
  this.ptr = _emscripten_bind_PlatformSpecificAssets_PlatformSpecificAssets_0();
  getCache(PlatformSpecificAssets)[this.ptr] = this;
};;
PlatformSpecificAssets.prototype = Object.create(WrapperObject.prototype);
PlatformSpecificAssets.prototype.constructor = PlatformSpecificAssets;
PlatformSpecificAssets.prototype.__class__ = PlatformSpecificAssets;
PlatformSpecificAssets.__cache__ = {};
Module['PlatformSpecificAssets'] = PlatformSpecificAssets;

PlatformSpecificAssets.prototype['Has'] = PlatformSpecificAssets.prototype.Has = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_PlatformSpecificAssets_Has_2(self, arg0, arg1));
};;

PlatformSpecificAssets.prototype['Get'] = PlatformSpecificAssets.prototype.Get = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return Pointer_stringify(_emscripten_bind_PlatformSpecificAssets_Get_2(self, arg0, arg1));
};;

PlatformSpecificAssets.prototype['Remove'] = PlatformSpecificAssets.prototype.Remove = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_PlatformSpecificAssets_Remove_2(self, arg0, arg1);
};;

PlatformSpecificAssets.prototype['Set'] = PlatformSpecificAssets.prototype.Set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  _emscripten_bind_PlatformSpecificAssets_Set_3(self, arg0, arg1, arg2);
};;

PlatformSpecificAssets.prototype['ExposeResources'] = PlatformSpecificAssets.prototype.ExposeResources = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PlatformSpecificAssets_ExposeResources_1(self, arg0);
};;

PlatformSpecificAssets.prototype['SerializeTo'] = PlatformSpecificAssets.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PlatformSpecificAssets_SerializeTo_1(self, arg0);
};;

PlatformSpecificAssets.prototype['UnserializeFrom'] = PlatformSpecificAssets.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PlatformSpecificAssets_UnserializeFrom_1(self, arg0);
};;

  PlatformSpecificAssets.prototype['__destroy__'] = PlatformSpecificAssets.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_PlatformSpecificAssets___destroy___0(self);
};
// ObjectMetadata
function ObjectMetadata() { throw "cannot construct a ObjectMetadata, no constructor in IDL" }
ObjectMetadata.prototype = Object.create(WrapperObject.prototype);
ObjectMetadata.prototype.constructor = ObjectMetadata;
ObjectMetadata.prototype.__class__ = ObjectMetadata;
ObjectMetadata.__cache__ = {};
Module['ObjectMetadata'] = ObjectMetadata;

ObjectMetadata.prototype['GetName'] = ObjectMetadata.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ObjectMetadata_GetName_0(self));
};;

ObjectMetadata.prototype['GetFullName'] = ObjectMetadata.prototype.GetFullName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ObjectMetadata_GetFullName_0(self));
};;

ObjectMetadata.prototype['GetDescription'] = ObjectMetadata.prototype.GetDescription = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ObjectMetadata_GetDescription_0(self));
};;

ObjectMetadata.prototype['GetIconFilename'] = ObjectMetadata.prototype.GetIconFilename = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ObjectMetadata_GetIconFilename_0(self));
};;

ObjectMetadata.prototype['AddCondition'] = ObjectMetadata.prototype.AddCondition = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  if (arg5 && typeof arg5 === 'object') arg5 = arg5.ptr;
  else arg5 = ensureString(arg5);
  if (arg6 && typeof arg6 === 'object') arg6 = arg6.ptr;
  else arg6 = ensureString(arg6);
  return wrapPointer(_emscripten_bind_ObjectMetadata_AddCondition_7(self, arg0, arg1, arg2, arg3, arg4, arg5, arg6), InstructionMetadata);
};;

ObjectMetadata.prototype['AddAction'] = ObjectMetadata.prototype.AddAction = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  if (arg5 && typeof arg5 === 'object') arg5 = arg5.ptr;
  else arg5 = ensureString(arg5);
  if (arg6 && typeof arg6 === 'object') arg6 = arg6.ptr;
  else arg6 = ensureString(arg6);
  return wrapPointer(_emscripten_bind_ObjectMetadata_AddAction_7(self, arg0, arg1, arg2, arg3, arg4, arg5, arg6), InstructionMetadata);
};;

ObjectMetadata.prototype['AddExpression'] = ObjectMetadata.prototype.AddExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  return wrapPointer(_emscripten_bind_ObjectMetadata_AddExpression_5(self, arg0, arg1, arg2, arg3, arg4), ExpressionMetadata);
};;

ObjectMetadata.prototype['AddStrExpression'] = ObjectMetadata.prototype.AddStrExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  return wrapPointer(_emscripten_bind_ObjectMetadata_AddStrExpression_5(self, arg0, arg1, arg2, arg3, arg4), ExpressionMetadata);
};;

ObjectMetadata.prototype['SetIncludeFile'] = ObjectMetadata.prototype.SetIncludeFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ObjectMetadata_SetIncludeFile_1(self, arg0), ObjectMetadata);
};;

ObjectMetadata.prototype['AddIncludeFile'] = ObjectMetadata.prototype.AddIncludeFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ObjectMetadata_AddIncludeFile_1(self, arg0), ObjectMetadata);
};;

  ObjectMetadata.prototype['__destroy__'] = ObjectMetadata.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ObjectMetadata___destroy___0(self);
};
// ExpressionParser2
/** @suppress {undefinedVars, duplicate} */function ExpressionParser2(arg0, arg1, arg2) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  this.ptr = _emscripten_bind_ExpressionParser2_ExpressionParser2_3(arg0, arg1, arg2);
  getCache(ExpressionParser2)[this.ptr] = this;
};;
ExpressionParser2.prototype = Object.create(WrapperObject.prototype);
ExpressionParser2.prototype.constructor = ExpressionParser2;
ExpressionParser2.prototype.__class__ = ExpressionParser2;
ExpressionParser2.__cache__ = {};
Module['ExpressionParser2'] = ExpressionParser2;

ExpressionParser2.prototype['ParseExpression'] = ExpressionParser2.prototype.ParseExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_ExpressionParser2_ParseExpression_2(self, arg0, arg1), UniquePtrExpressionNode);
};;

  ExpressionParser2.prototype['__destroy__'] = ExpressionParser2.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExpressionParser2___destroy___0(self);
};
// ExpressionParserDiagnostic
function ExpressionParserDiagnostic() { throw "cannot construct a ExpressionParserDiagnostic, no constructor in IDL" }
ExpressionParserDiagnostic.prototype = Object.create(WrapperObject.prototype);
ExpressionParserDiagnostic.prototype.constructor = ExpressionParserDiagnostic;
ExpressionParserDiagnostic.prototype.__class__ = ExpressionParserDiagnostic;
ExpressionParserDiagnostic.__cache__ = {};
Module['ExpressionParserDiagnostic'] = ExpressionParserDiagnostic;

ExpressionParserDiagnostic.prototype['IsError'] = ExpressionParserDiagnostic.prototype.IsError = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ExpressionParserDiagnostic_IsError_0(self));
};;

ExpressionParserDiagnostic.prototype['GetMessage'] = ExpressionParserDiagnostic.prototype.GetMessage = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExpressionParserDiagnostic_GetMessage_0(self));
};;

ExpressionParserDiagnostic.prototype['GetStartPosition'] = ExpressionParserDiagnostic.prototype.GetStartPosition = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ExpressionParserDiagnostic_GetStartPosition_0(self);
};;

ExpressionParserDiagnostic.prototype['GetEndPosition'] = ExpressionParserDiagnostic.prototype.GetEndPosition = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ExpressionParserDiagnostic_GetEndPosition_0(self);
};;

  ExpressionParserDiagnostic.prototype['__destroy__'] = ExpressionParserDiagnostic.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExpressionParserDiagnostic___destroy___0(self);
};
// Layout
/** @suppress {undefinedVars, duplicate} */function Layout() {
  this.ptr = _emscripten_bind_Layout_Layout_0();
  getCache(Layout)[this.ptr] = this;
};;
Layout.prototype = Object.create(WrapperObject.prototype);
Layout.prototype.constructor = Layout;
Layout.prototype.__class__ = Layout;
Layout.__cache__ = {};
Module['Layout'] = Layout;

Layout.prototype['SetName'] = Layout.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Layout_SetName_1(self, arg0);
};;

Layout.prototype['GetName'] = Layout.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Layout_GetName_0(self));
};;

Layout.prototype['SetBackgroundColor'] = Layout.prototype.SetBackgroundColor = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_Layout_SetBackgroundColor_3(self, arg0, arg1, arg2);
};;

Layout.prototype['GetBackgroundColorRed'] = Layout.prototype.GetBackgroundColorRed = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Layout_GetBackgroundColorRed_0(self);
};;

Layout.prototype['GetBackgroundColorGreen'] = Layout.prototype.GetBackgroundColorGreen = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Layout_GetBackgroundColorGreen_0(self);
};;

Layout.prototype['GetBackgroundColorBlue'] = Layout.prototype.GetBackgroundColorBlue = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Layout_GetBackgroundColorBlue_0(self);
};;

Layout.prototype['SetWindowDefaultTitle'] = Layout.prototype.SetWindowDefaultTitle = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Layout_SetWindowDefaultTitle_1(self, arg0);
};;

Layout.prototype['GetWindowDefaultTitle'] = Layout.prototype.GetWindowDefaultTitle = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Layout_GetWindowDefaultTitle_0(self));
};;

Layout.prototype['GetInitialInstances'] = Layout.prototype.GetInitialInstances = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetInitialInstances_0(self), InitialInstancesContainer);
};;

Layout.prototype['GetVariables'] = Layout.prototype.GetVariables = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetVariables_0(self), VariablesContainer);
};;

Layout.prototype['GetEvents'] = Layout.prototype.GetEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetEvents_0(self), EventsList);
};;

Layout.prototype['UpdateBehaviorsSharedData'] = Layout.prototype.UpdateBehaviorsSharedData = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Layout_UpdateBehaviorsSharedData_1(self, arg0);
};;

Layout.prototype['GetAllBehaviorSharedDataNames'] = Layout.prototype.GetAllBehaviorSharedDataNames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetAllBehaviorSharedDataNames_0(self), VectorString);
};;

Layout.prototype['HasBehaviorSharedData'] = Layout.prototype.HasBehaviorSharedData = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Layout_HasBehaviorSharedData_1(self, arg0));
};;

Layout.prototype['GetBehaviorSharedData'] = Layout.prototype.GetBehaviorSharedData = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Layout_GetBehaviorSharedData_1(self, arg0), BehaviorsSharedData);
};;

Layout.prototype['InsertNewLayer'] = Layout.prototype.InsertNewLayer = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Layout_InsertNewLayer_2(self, arg0, arg1);
};;

Layout.prototype['InsertLayer'] = Layout.prototype.InsertLayer = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Layout_InsertLayer_2(self, arg0, arg1);
};;

Layout.prototype['GetLayer'] = Layout.prototype.GetLayer = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Layout_GetLayer_1(self, arg0), Layer);
};;

Layout.prototype['GetLayerAt'] = Layout.prototype.GetLayerAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetLayerAt_1(self, arg0), Layer);
};;

Layout.prototype['HasLayerNamed'] = Layout.prototype.HasLayerNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Layout_HasLayerNamed_1(self, arg0));
};;

Layout.prototype['RemoveLayer'] = Layout.prototype.RemoveLayer = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Layout_RemoveLayer_1(self, arg0);
};;

Layout.prototype['GetLayersCount'] = Layout.prototype.GetLayersCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Layout_GetLayersCount_0(self);
};;

Layout.prototype['SwapLayers'] = Layout.prototype.SwapLayers = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Layout_SwapLayers_2(self, arg0, arg1);
};;

Layout.prototype['MoveLayer'] = Layout.prototype.MoveLayer = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Layout_MoveLayer_2(self, arg0, arg1);
};;

Layout.prototype['SerializeLayersTo'] = Layout.prototype.SerializeLayersTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Layout_SerializeLayersTo_1(self, arg0);
};;

Layout.prototype['UnserializeLayersFrom'] = Layout.prototype.UnserializeLayersFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Layout_UnserializeLayersFrom_1(self, arg0);
};;

Layout.prototype['GetAssociatedSettings'] = Layout.prototype.GetAssociatedSettings = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetAssociatedSettings_0(self), LayoutEditorCanvasOptions);
};;

Layout.prototype['SerializeTo'] = Layout.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Layout_SerializeTo_1(self, arg0);
};;

Layout.prototype['UnserializeFrom'] = Layout.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Layout_UnserializeFrom_2(self, arg0, arg1);
};;

Layout.prototype['SetStopSoundsOnStartup'] = Layout.prototype.SetStopSoundsOnStartup = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Layout_SetStopSoundsOnStartup_1(self, arg0);
};;

Layout.prototype['StopSoundsOnStartup'] = Layout.prototype.StopSoundsOnStartup = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Layout_StopSoundsOnStartup_0(self));
};;

Layout.prototype['InsertNewObject'] = Layout.prototype.InsertNewObject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return wrapPointer(_emscripten_bind_Layout_InsertNewObject_4(self, arg0, arg1, arg2, arg3), gdObject);
};;

Layout.prototype['InsertObject'] = Layout.prototype.InsertObject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_Layout_InsertObject_2(self, arg0, arg1), gdObject);
};;

Layout.prototype['HasObjectNamed'] = Layout.prototype.HasObjectNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Layout_HasObjectNamed_1(self, arg0));
};;

Layout.prototype['GetObject'] = Layout.prototype.GetObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Layout_GetObject_1(self, arg0), gdObject);
};;

Layout.prototype['GetObjectAt'] = Layout.prototype.GetObjectAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetObjectAt_1(self, arg0), gdObject);
};;

Layout.prototype['GetObjectPosition'] = Layout.prototype.GetObjectPosition = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_Layout_GetObjectPosition_1(self, arg0);
};;

Layout.prototype['RemoveObject'] = Layout.prototype.RemoveObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Layout_RemoveObject_1(self, arg0);
};;

Layout.prototype['SwapObjects'] = Layout.prototype.SwapObjects = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Layout_SwapObjects_2(self, arg0, arg1);
};;

Layout.prototype['MoveObject'] = Layout.prototype.MoveObject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Layout_MoveObject_2(self, arg0, arg1);
};;

Layout.prototype['GetObjectsCount'] = Layout.prototype.GetObjectsCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Layout_GetObjectsCount_0(self);
};;

Layout.prototype['GetObjectGroups'] = Layout.prototype.GetObjectGroups = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Layout_GetObjectGroups_0(self), ObjectGroupsContainer);
};;

  Layout.prototype['__destroy__'] = Layout.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Layout___destroy___0(self);
};
// VariablesContainer
/** @suppress {undefinedVars, duplicate} */function VariablesContainer() {
  this.ptr = _emscripten_bind_VariablesContainer_VariablesContainer_0();
  getCache(VariablesContainer)[this.ptr] = this;
};;
VariablesContainer.prototype = Object.create(WrapperObject.prototype);
VariablesContainer.prototype.constructor = VariablesContainer;
VariablesContainer.prototype.__class__ = VariablesContainer;
VariablesContainer.__cache__ = {};
Module['VariablesContainer'] = VariablesContainer;

VariablesContainer.prototype['Has'] = VariablesContainer.prototype.Has = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_VariablesContainer_Has_1(self, arg0));
};;

VariablesContainer.prototype['Get'] = VariablesContainer.prototype.Get = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_VariablesContainer_Get_1(self, arg0), Variable);
};;

VariablesContainer.prototype['GetAt'] = VariablesContainer.prototype.GetAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VariablesContainer_GetAt_1(self, arg0), Variable);
};;

VariablesContainer.prototype['GetNameAt'] = VariablesContainer.prototype.GetNameAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_VariablesContainer_GetNameAt_1(self, arg0));
};;

VariablesContainer.prototype['Insert'] = VariablesContainer.prototype.Insert = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_VariablesContainer_Insert_3(self, arg0, arg1, arg2), Variable);
};;

VariablesContainer.prototype['InsertNew'] = VariablesContainer.prototype.InsertNew = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_VariablesContainer_InsertNew_2(self, arg0, arg1), Variable);
};;

VariablesContainer.prototype['Remove'] = VariablesContainer.prototype.Remove = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_VariablesContainer_Remove_1(self, arg0);
};;

VariablesContainer.prototype['Rename'] = VariablesContainer.prototype.Rename = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_VariablesContainer_Rename_2(self, arg0, arg1));
};;

VariablesContainer.prototype['Swap'] = VariablesContainer.prototype.Swap = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_VariablesContainer_Swap_2(self, arg0, arg1);
};;

VariablesContainer.prototype['Move'] = VariablesContainer.prototype.Move = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_VariablesContainer_Move_2(self, arg0, arg1);
};;

VariablesContainer.prototype['GetPosition'] = VariablesContainer.prototype.GetPosition = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_VariablesContainer_GetPosition_1(self, arg0);
};;

VariablesContainer.prototype['Count'] = VariablesContainer.prototype.Count = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VariablesContainer_Count_0(self);
};;

VariablesContainer.prototype['Clear'] = VariablesContainer.prototype.Clear = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VariablesContainer_Clear_0(self);
};;

VariablesContainer.prototype['RemoveRecursively'] = VariablesContainer.prototype.RemoveRecursively = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VariablesContainer_RemoveRecursively_1(self, arg0);
};;

VariablesContainer.prototype['SerializeTo'] = VariablesContainer.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VariablesContainer_SerializeTo_1(self, arg0);
};;

VariablesContainer.prototype['UnserializeFrom'] = VariablesContainer.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VariablesContainer_UnserializeFrom_1(self, arg0);
};;

  VariablesContainer.prototype['__destroy__'] = VariablesContainer.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VariablesContainer___destroy___0(self);
};
// EventsFunctionsExtension
/** @suppress {undefinedVars, duplicate} */function EventsFunctionsExtension() {
  this.ptr = _emscripten_bind_EventsFunctionsExtension_EventsFunctionsExtension_0();
  getCache(EventsFunctionsExtension)[this.ptr] = this;
};;
EventsFunctionsExtension.prototype = Object.create(WrapperObject.prototype);
EventsFunctionsExtension.prototype.constructor = EventsFunctionsExtension;
EventsFunctionsExtension.prototype.__class__ = EventsFunctionsExtension;
EventsFunctionsExtension.__cache__ = {};
Module['EventsFunctionsExtension'] = EventsFunctionsExtension;

EventsFunctionsExtension.prototype['SetNamespace'] = EventsFunctionsExtension.prototype.SetNamespace = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_EventsFunctionsExtension_SetNamespace_1(self, arg0), EventsFunctionsExtension);
};;

EventsFunctionsExtension.prototype['GetNamespace'] = EventsFunctionsExtension.prototype.GetNamespace = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventsFunctionsExtension_GetNamespace_0(self));
};;

EventsFunctionsExtension.prototype['SetVersion'] = EventsFunctionsExtension.prototype.SetVersion = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_EventsFunctionsExtension_SetVersion_1(self, arg0), EventsFunctionsExtension);
};;

EventsFunctionsExtension.prototype['GetVersion'] = EventsFunctionsExtension.prototype.GetVersion = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventsFunctionsExtension_GetVersion_0(self));
};;

EventsFunctionsExtension.prototype['SetDescription'] = EventsFunctionsExtension.prototype.SetDescription = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_EventsFunctionsExtension_SetDescription_1(self, arg0), EventsFunctionsExtension);
};;

EventsFunctionsExtension.prototype['GetDescription'] = EventsFunctionsExtension.prototype.GetDescription = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventsFunctionsExtension_GetDescription_0(self));
};;

EventsFunctionsExtension.prototype['SetName'] = EventsFunctionsExtension.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_EventsFunctionsExtension_SetName_1(self, arg0), EventsFunctionsExtension);
};;

EventsFunctionsExtension.prototype['GetName'] = EventsFunctionsExtension.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventsFunctionsExtension_GetName_0(self));
};;

EventsFunctionsExtension.prototype['SetFullName'] = EventsFunctionsExtension.prototype.SetFullName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_EventsFunctionsExtension_SetFullName_1(self, arg0), EventsFunctionsExtension);
};;

EventsFunctionsExtension.prototype['GetFullName'] = EventsFunctionsExtension.prototype.GetFullName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_EventsFunctionsExtension_GetFullName_0(self));
};;

EventsFunctionsExtension.prototype['InsertNewEventsFunction'] = EventsFunctionsExtension.prototype.InsertNewEventsFunction = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_EventsFunctionsExtension_InsertNewEventsFunction_2(self, arg0, arg1), EventsFunction);
};;

EventsFunctionsExtension.prototype['InsertEventsFunction'] = EventsFunctionsExtension.prototype.InsertEventsFunction = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_EventsFunctionsExtension_InsertEventsFunction_2(self, arg0, arg1), EventsFunction);
};;

EventsFunctionsExtension.prototype['HasEventsFunctionNamed'] = EventsFunctionsExtension.prototype.HasEventsFunctionNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_EventsFunctionsExtension_HasEventsFunctionNamed_1(self, arg0));
};;

EventsFunctionsExtension.prototype['GetEventsFunction'] = EventsFunctionsExtension.prototype.GetEventsFunction = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_EventsFunctionsExtension_GetEventsFunction_1(self, arg0), EventsFunction);
};;

EventsFunctionsExtension.prototype['GetEventsFunctionAt'] = EventsFunctionsExtension.prototype.GetEventsFunctionAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_EventsFunctionsExtension_GetEventsFunctionAt_1(self, arg0), EventsFunction);
};;

EventsFunctionsExtension.prototype['RemoveEventsFunction'] = EventsFunctionsExtension.prototype.RemoveEventsFunction = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_EventsFunctionsExtension_RemoveEventsFunction_1(self, arg0);
};;

EventsFunctionsExtension.prototype['MoveEventsFunction'] = EventsFunctionsExtension.prototype.MoveEventsFunction = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_EventsFunctionsExtension_MoveEventsFunction_2(self, arg0, arg1);
};;

EventsFunctionsExtension.prototype['GetEventsFunctionsCount'] = EventsFunctionsExtension.prototype.GetEventsFunctionsCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_EventsFunctionsExtension_GetEventsFunctionsCount_0(self);
};;

EventsFunctionsExtension.prototype['SerializeTo'] = EventsFunctionsExtension.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsFunctionsExtension_SerializeTo_1(self, arg0);
};;

EventsFunctionsExtension.prototype['UnserializeFrom'] = EventsFunctionsExtension.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_EventsFunctionsExtension_UnserializeFrom_2(self, arg0, arg1);
};;

  EventsFunctionsExtension.prototype['__destroy__'] = EventsFunctionsExtension.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_EventsFunctionsExtension___destroy___0(self);
};
// EventsRefactorer
function EventsRefactorer() { throw "cannot construct a EventsRefactorer, no constructor in IDL" }
EventsRefactorer.prototype = Object.create(WrapperObject.prototype);
EventsRefactorer.prototype.constructor = EventsRefactorer;
EventsRefactorer.prototype.__class__ = EventsRefactorer;
EventsRefactorer.__cache__ = {};
Module['EventsRefactorer'] = EventsRefactorer;

EventsRefactorer.prototype['STATIC_RenameObjectInEvents'] = EventsRefactorer.prototype.STATIC_RenameObjectInEvents = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4, arg5) {
  var self = this.ptr;
  ensureCache.prepare();
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

EventsRefactorer.prototype['STATIC_RemoveObjectInEvents'] = EventsRefactorer.prototype.STATIC_RemoveObjectInEvents = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  else arg4 = ensureString(arg4);
  _emscripten_bind_EventsRefactorer_STATIC_RemoveObjectInEvents_5(self, arg0, arg1, arg2, arg3, arg4);
};;

EventsRefactorer.prototype['STATIC_ReplaceStringInEvents'] = EventsRefactorer.prototype.STATIC_ReplaceStringInEvents = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
  var self = this.ptr;
  ensureCache.prepare();
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

EventsRefactorer.prototype['STATIC_SearchInEvents'] = EventsRefactorer.prototype.STATIC_SearchInEvents = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  if (arg5 && typeof arg5 === 'object') arg5 = arg5.ptr;
  if (arg6 && typeof arg6 === 'object') arg6 = arg6.ptr;
  return wrapPointer(_emscripten_bind_EventsRefactorer_STATIC_SearchInEvents_7(self, arg0, arg1, arg2, arg3, arg4, arg5, arg6), VectorEventsSearchResult);
};;

  EventsRefactorer.prototype['__destroy__'] = EventsRefactorer.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_EventsRefactorer___destroy___0(self);
};
// InitialInstanceJSFunctor
/** @suppress {undefinedVars, duplicate} */function InitialInstanceJSFunctor() {
  this.ptr = _emscripten_bind_InitialInstanceJSFunctor_InitialInstanceJSFunctor_0();
  getCache(InitialInstanceJSFunctor)[this.ptr] = this;
};;
InitialInstanceJSFunctor.prototype = Object.create(InitialInstanceJSFunctorWrapper.prototype);
InitialInstanceJSFunctor.prototype.constructor = InitialInstanceJSFunctor;
InitialInstanceJSFunctor.prototype.__class__ = InitialInstanceJSFunctor;
InitialInstanceJSFunctor.__cache__ = {};
Module['InitialInstanceJSFunctor'] = InitialInstanceJSFunctor;

InitialInstanceJSFunctor.prototype['invoke'] = InitialInstanceJSFunctor.prototype.invoke = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_InitialInstanceJSFunctor_invoke_1(self, arg0);
};;

  InitialInstanceJSFunctor.prototype['__destroy__'] = InitialInstanceJSFunctor.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_InitialInstanceJSFunctor___destroy___0(self);
};
// Animation
/** @suppress {undefinedVars, duplicate} */function Animation() {
  this.ptr = _emscripten_bind_Animation_Animation_0();
  getCache(Animation)[this.ptr] = this;
};;
Animation.prototype = Object.create(WrapperObject.prototype);
Animation.prototype.constructor = Animation;
Animation.prototype.__class__ = Animation;
Animation.__cache__ = {};
Module['Animation'] = Animation;

Animation.prototype['SetName'] = Animation.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Animation_SetName_1(self, arg0);
};;

Animation.prototype['GetName'] = Animation.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Animation_GetName_0(self));
};;

Animation.prototype['SetDirectionsCount'] = Animation.prototype.SetDirectionsCount = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Animation_SetDirectionsCount_1(self, arg0);
};;

Animation.prototype['GetDirectionsCount'] = Animation.prototype.GetDirectionsCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Animation_GetDirectionsCount_0(self);
};;

Animation.prototype['GetDirection'] = Animation.prototype.GetDirection = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Animation_GetDirection_1(self, arg0), Direction);
};;

Animation.prototype['SetDirection'] = Animation.prototype.SetDirection = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Animation_SetDirection_2(self, arg0, arg1);
};;

Animation.prototype['HasNoDirections'] = Animation.prototype.HasNoDirections = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Animation_HasNoDirections_0(self));
};;

Animation.prototype['UseMultipleDirections'] = Animation.prototype.UseMultipleDirections = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Animation_UseMultipleDirections_0(self));
};;

Animation.prototype['SetUseMultipleDirections'] = Animation.prototype.SetUseMultipleDirections = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Animation_SetUseMultipleDirections_1(self, arg0);
};;

  Animation.prototype['__destroy__'] = Animation.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Animation___destroy___0(self);
};
// EventsContext
function EventsContext() { throw "cannot construct a EventsContext, no constructor in IDL" }
EventsContext.prototype = Object.create(WrapperObject.prototype);
EventsContext.prototype.constructor = EventsContext;
EventsContext.prototype.__class__ = EventsContext;
EventsContext.__cache__ = {};
Module['EventsContext'] = EventsContext;

EventsContext.prototype['GetReferencedObjectOrGroupNames'] = EventsContext.prototype.GetReferencedObjectOrGroupNames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_EventsContext_GetReferencedObjectOrGroupNames_0(self), SetString);
};;

EventsContext.prototype['GetObjectNames'] = EventsContext.prototype.GetObjectNames = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_EventsContext_GetObjectNames_0(self), SetString);
};;

EventsContext.prototype['GetBehaviorNamesOfObjectOrGroup'] = EventsContext.prototype.GetBehaviorNamesOfObjectOrGroup = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_EventsContext_GetBehaviorNamesOfObjectOrGroup_1(self, arg0), SetString);
};;

  EventsContext.prototype['__destroy__'] = EventsContext.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_EventsContext___destroy___0(self);
};
// MapStringEventMetadata
function MapStringEventMetadata() { throw "cannot construct a MapStringEventMetadata, no constructor in IDL" }
MapStringEventMetadata.prototype = Object.create(WrapperObject.prototype);
MapStringEventMetadata.prototype.constructor = MapStringEventMetadata;
MapStringEventMetadata.prototype.__class__ = MapStringEventMetadata;
MapStringEventMetadata.__cache__ = {};
Module['MapStringEventMetadata'] = MapStringEventMetadata;

MapStringEventMetadata.prototype['MAP_get'] = MapStringEventMetadata.prototype.MAP_get = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_MapStringEventMetadata_MAP_get_1(self, arg0), EventMetadata);
};;

MapStringEventMetadata.prototype['MAP_set'] = MapStringEventMetadata.prototype.MAP_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_MapStringEventMetadata_MAP_set_2(self, arg0, arg1);
};;

MapStringEventMetadata.prototype['MAP_has'] = MapStringEventMetadata.prototype.MAP_has = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_MapStringEventMetadata_MAP_has_1(self, arg0));
};;

MapStringEventMetadata.prototype['MAP_keys'] = MapStringEventMetadata.prototype.MAP_keys = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_MapStringEventMetadata_MAP_keys_0(self), VectorString);
};;

  MapStringEventMetadata.prototype['__destroy__'] = MapStringEventMetadata.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_MapStringEventMetadata___destroy___0(self);
};
// ForEachEvent
/** @suppress {undefinedVars, duplicate} */function ForEachEvent() {
  this.ptr = _emscripten_bind_ForEachEvent_ForEachEvent_0();
  getCache(ForEachEvent)[this.ptr] = this;
};;
ForEachEvent.prototype = Object.create(WrapperObject.prototype);
ForEachEvent.prototype.constructor = ForEachEvent;
ForEachEvent.prototype.__class__ = ForEachEvent;
ForEachEvent.__cache__ = {};
Module['ForEachEvent'] = ForEachEvent;

ForEachEvent.prototype['SetObjectToPick'] = ForEachEvent.prototype.SetObjectToPick = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ForEachEvent_SetObjectToPick_1(self, arg0);
};;

ForEachEvent.prototype['GetObjectToPick'] = ForEachEvent.prototype.GetObjectToPick = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ForEachEvent_GetObjectToPick_0(self));
};;

ForEachEvent.prototype['GetConditions'] = ForEachEvent.prototype.GetConditions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ForEachEvent_GetConditions_0(self), InstructionsList);
};;

ForEachEvent.prototype['GetActions'] = ForEachEvent.prototype.GetActions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ForEachEvent_GetActions_0(self), InstructionsList);
};;

ForEachEvent.prototype['Clone'] = ForEachEvent.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ForEachEvent_Clone_0(self), ForEachEvent);
};;

ForEachEvent.prototype['GetType'] = ForEachEvent.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ForEachEvent_GetType_0(self));
};;

ForEachEvent.prototype['SetType'] = ForEachEvent.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ForEachEvent_SetType_1(self, arg0);
};;

ForEachEvent.prototype['IsExecutable'] = ForEachEvent.prototype.IsExecutable = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ForEachEvent_IsExecutable_0(self));
};;

ForEachEvent.prototype['CanHaveSubEvents'] = ForEachEvent.prototype.CanHaveSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ForEachEvent_CanHaveSubEvents_0(self));
};;

ForEachEvent.prototype['HasSubEvents'] = ForEachEvent.prototype.HasSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ForEachEvent_HasSubEvents_0(self));
};;

ForEachEvent.prototype['GetSubEvents'] = ForEachEvent.prototype.GetSubEvents = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ForEachEvent_GetSubEvents_0(self), EventsList);
};;

ForEachEvent.prototype['IsDisabled'] = ForEachEvent.prototype.IsDisabled = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ForEachEvent_IsDisabled_0(self));
};;

ForEachEvent.prototype['SetDisabled'] = ForEachEvent.prototype.SetDisabled = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ForEachEvent_SetDisabled_1(self, arg0);
};;

ForEachEvent.prototype['IsFolded'] = ForEachEvent.prototype.IsFolded = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ForEachEvent_IsFolded_0(self));
};;

ForEachEvent.prototype['SetFolded'] = ForEachEvent.prototype.SetFolded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ForEachEvent_SetFolded_1(self, arg0);
};;

ForEachEvent.prototype['SerializeTo'] = ForEachEvent.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ForEachEvent_SerializeTo_1(self, arg0);
};;

ForEachEvent.prototype['UnserializeFrom'] = ForEachEvent.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_ForEachEvent_UnserializeFrom_2(self, arg0, arg1);
};;

  ForEachEvent.prototype['__destroy__'] = ForEachEvent.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ForEachEvent___destroy___0(self);
};
// ObjectsContainer
/** @suppress {undefinedVars, duplicate} */function ObjectsContainer() {
  this.ptr = _emscripten_bind_ObjectsContainer_ObjectsContainer_0();
  getCache(ObjectsContainer)[this.ptr] = this;
};;
ObjectsContainer.prototype = Object.create(WrapperObject.prototype);
ObjectsContainer.prototype.constructor = ObjectsContainer;
ObjectsContainer.prototype.__class__ = ObjectsContainer;
ObjectsContainer.__cache__ = {};
Module['ObjectsContainer'] = ObjectsContainer;

ObjectsContainer.prototype['InsertNewObject'] = ObjectsContainer.prototype.InsertNewObject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return wrapPointer(_emscripten_bind_ObjectsContainer_InsertNewObject_4(self, arg0, arg1, arg2, arg3), gdObject);
};;

ObjectsContainer.prototype['InsertObject'] = ObjectsContainer.prototype.InsertObject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_ObjectsContainer_InsertObject_2(self, arg0, arg1), gdObject);
};;

ObjectsContainer.prototype['HasObjectNamed'] = ObjectsContainer.prototype.HasObjectNamed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ObjectsContainer_HasObjectNamed_1(self, arg0));
};;

ObjectsContainer.prototype['GetObject'] = ObjectsContainer.prototype.GetObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ObjectsContainer_GetObject_1(self, arg0), gdObject);
};;

ObjectsContainer.prototype['GetObjectAt'] = ObjectsContainer.prototype.GetObjectAt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ObjectsContainer_GetObjectAt_1(self, arg0), gdObject);
};;

ObjectsContainer.prototype['GetObjectPosition'] = ObjectsContainer.prototype.GetObjectPosition = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_ObjectsContainer_GetObjectPosition_1(self, arg0);
};;

ObjectsContainer.prototype['RemoveObject'] = ObjectsContainer.prototype.RemoveObject = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ObjectsContainer_RemoveObject_1(self, arg0);
};;

ObjectsContainer.prototype['SwapObjects'] = ObjectsContainer.prototype.SwapObjects = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_ObjectsContainer_SwapObjects_2(self, arg0, arg1);
};;

ObjectsContainer.prototype['MoveObject'] = ObjectsContainer.prototype.MoveObject = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_ObjectsContainer_MoveObject_2(self, arg0, arg1);
};;

ObjectsContainer.prototype['GetObjectsCount'] = ObjectsContainer.prototype.GetObjectsCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ObjectsContainer_GetObjectsCount_0(self);
};;

ObjectsContainer.prototype['GetObjectGroups'] = ObjectsContainer.prototype.GetObjectGroups = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ObjectsContainer_GetObjectGroups_0(self), ObjectGroupsContainer);
};;

  ObjectsContainer.prototype['__destroy__'] = ObjectsContainer.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ObjectsContainer___destroy___0(self);
};
// InstructionSentenceFormatter
function InstructionSentenceFormatter() { throw "cannot construct a InstructionSentenceFormatter, no constructor in IDL" }
InstructionSentenceFormatter.prototype = Object.create(WrapperObject.prototype);
InstructionSentenceFormatter.prototype.constructor = InstructionSentenceFormatter;
InstructionSentenceFormatter.prototype.__class__ = InstructionSentenceFormatter;
InstructionSentenceFormatter.__cache__ = {};
Module['InstructionSentenceFormatter'] = InstructionSentenceFormatter;

InstructionSentenceFormatter.prototype['STATIC_Get'] = InstructionSentenceFormatter.prototype.STATIC_Get = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_InstructionSentenceFormatter_STATIC_Get_0(self), InstructionSentenceFormatter);
};;

InstructionSentenceFormatter.prototype['Translate'] = InstructionSentenceFormatter.prototype.Translate = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return Pointer_stringify(_emscripten_bind_InstructionSentenceFormatter_Translate_2(self, arg0, arg1));
};;

InstructionSentenceFormatter.prototype['GetAsFormattedText'] = InstructionSentenceFormatter.prototype.GetAsFormattedText = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_InstructionSentenceFormatter_GetAsFormattedText_2(self, arg0, arg1), VectorPairStringTextFormatting);
};;

InstructionSentenceFormatter.prototype['GetFormattingFromType'] = InstructionSentenceFormatter.prototype.GetFormattingFromType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_InstructionSentenceFormatter_GetFormattingFromType_1(self, arg0), TextFormatting);
};;

InstructionSentenceFormatter.prototype['LabelFromType'] = InstructionSentenceFormatter.prototype.LabelFromType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return Pointer_stringify(_emscripten_bind_InstructionSentenceFormatter_LabelFromType_1(self, arg0));
};;

InstructionSentenceFormatter.prototype['LoadTypesFormattingFromConfig'] = InstructionSentenceFormatter.prototype.LoadTypesFormattingFromConfig = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_InstructionSentenceFormatter_LoadTypesFormattingFromConfig_0(self);
};;

  InstructionSentenceFormatter.prototype['__destroy__'] = InstructionSentenceFormatter.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_InstructionSentenceFormatter___destroy___0(self);
};
// Sprite
/** @suppress {undefinedVars, duplicate} */function Sprite() {
  this.ptr = _emscripten_bind_Sprite_Sprite_0();
  getCache(Sprite)[this.ptr] = this;
};;
Sprite.prototype = Object.create(WrapperObject.prototype);
Sprite.prototype.constructor = Sprite;
Sprite.prototype.__class__ = Sprite;
Sprite.__cache__ = {};
Module['Sprite'] = Sprite;

Sprite.prototype['SetImageName'] = Sprite.prototype.SetImageName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Sprite_SetImageName_1(self, arg0);
};;

Sprite.prototype['GetImageName'] = Sprite.prototype.GetImageName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Sprite_GetImageName_0(self));
};;

Sprite.prototype['GetOrigin'] = Sprite.prototype.GetOrigin = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Sprite_GetOrigin_0(self), Point);
};;

Sprite.prototype['GetCenter'] = Sprite.prototype.GetCenter = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Sprite_GetCenter_0(self), Point);
};;

Sprite.prototype['IsDefaultCenterPoint'] = Sprite.prototype.IsDefaultCenterPoint = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Sprite_IsDefaultCenterPoint_0(self));
};;

Sprite.prototype['SetDefaultCenterPoint'] = Sprite.prototype.SetDefaultCenterPoint = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sprite_SetDefaultCenterPoint_1(self, arg0);
};;

Sprite.prototype['GetAllNonDefaultPoints'] = Sprite.prototype.GetAllNonDefaultPoints = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Sprite_GetAllNonDefaultPoints_0(self), VectorPoint);
};;

Sprite.prototype['AddPoint'] = Sprite.prototype.AddPoint = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sprite_AddPoint_1(self, arg0);
};;

Sprite.prototype['DelPoint'] = Sprite.prototype.DelPoint = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Sprite_DelPoint_1(self, arg0);
};;

Sprite.prototype['GetPoint'] = Sprite.prototype.GetPoint = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Sprite_GetPoint_1(self, arg0), Point);
};;

Sprite.prototype['HasPoint'] = Sprite.prototype.HasPoint = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_Sprite_HasPoint_1(self, arg0));
};;

Sprite.prototype['IsCollisionMaskAutomatic'] = Sprite.prototype.IsCollisionMaskAutomatic = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Sprite_IsCollisionMaskAutomatic_0(self));
};;

Sprite.prototype['SetCollisionMaskAutomatic'] = Sprite.prototype.SetCollisionMaskAutomatic = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sprite_SetCollisionMaskAutomatic_1(self, arg0);
};;

Sprite.prototype['GetCustomCollisionMask'] = Sprite.prototype.GetCustomCollisionMask = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Sprite_GetCustomCollisionMask_0(self), VectorPolygon2d);
};;

Sprite.prototype['SetCustomCollisionMask'] = Sprite.prototype.SetCustomCollisionMask = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sprite_SetCustomCollisionMask_1(self, arg0);
};;

  Sprite.prototype['__destroy__'] = Sprite.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Sprite___destroy___0(self);
};
// VideoResource
/** @suppress {undefinedVars, duplicate} */function VideoResource() {
  this.ptr = _emscripten_bind_VideoResource_VideoResource_0();
  getCache(VideoResource)[this.ptr] = this;
};;
VideoResource.prototype = Object.create(WrapperObject.prototype);
VideoResource.prototype.constructor = VideoResource;
VideoResource.prototype.__class__ = VideoResource;
VideoResource.__cache__ = {};
Module['VideoResource'] = VideoResource;

VideoResource.prototype['Clone'] = VideoResource.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_VideoResource_Clone_0(self), Resource);
};;

VideoResource.prototype['SetName'] = VideoResource.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_VideoResource_SetName_1(self, arg0);
};;

VideoResource.prototype['GetName'] = VideoResource.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_VideoResource_GetName_0(self));
};;

VideoResource.prototype['SetKind'] = VideoResource.prototype.SetKind = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_VideoResource_SetKind_1(self, arg0);
};;

VideoResource.prototype['GetKind'] = VideoResource.prototype.GetKind = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_VideoResource_GetKind_0(self));
};;

VideoResource.prototype['IsUserAdded'] = VideoResource.prototype.IsUserAdded = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_VideoResource_IsUserAdded_0(self));
};;

VideoResource.prototype['SetUserAdded'] = VideoResource.prototype.SetUserAdded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VideoResource_SetUserAdded_1(self, arg0);
};;

VideoResource.prototype['UseFile'] = VideoResource.prototype.UseFile = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_VideoResource_UseFile_0(self));
};;

VideoResource.prototype['SetFile'] = VideoResource.prototype.SetFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_VideoResource_SetFile_1(self, arg0);
};;

VideoResource.prototype['GetFile'] = VideoResource.prototype.GetFile = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_VideoResource_GetFile_0(self));
};;

VideoResource.prototype['GetAbsoluteFile'] = VideoResource.prototype.GetAbsoluteFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_VideoResource_GetAbsoluteFile_1(self, arg0));
};;

VideoResource.prototype['SetMetadata'] = VideoResource.prototype.SetMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_VideoResource_SetMetadata_1(self, arg0);
};;

VideoResource.prototype['GetMetadata'] = VideoResource.prototype.GetMetadata = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_VideoResource_GetMetadata_0(self));
};;

VideoResource.prototype['GetProperties'] = VideoResource.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VideoResource_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

VideoResource.prototype['UpdateProperty'] = VideoResource.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_VideoResource_UpdateProperty_3(self, arg0, arg1, arg2));
};;

VideoResource.prototype['SerializeTo'] = VideoResource.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VideoResource_SerializeTo_1(self, arg0);
};;

VideoResource.prototype['UnserializeFrom'] = VideoResource.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VideoResource_UnserializeFrom_1(self, arg0);
};;

  VideoResource.prototype['__destroy__'] = VideoResource.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VideoResource___destroy___0(self);
};
// EventsContextAnalyzer
/** @suppress {undefinedVars, duplicate} */function EventsContextAnalyzer(arg0, arg1, arg2) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  this.ptr = _emscripten_bind_EventsContextAnalyzer_EventsContextAnalyzer_3(arg0, arg1, arg2);
  getCache(EventsContextAnalyzer)[this.ptr] = this;
};;
EventsContextAnalyzer.prototype = Object.create(WrapperObject.prototype);
EventsContextAnalyzer.prototype.constructor = EventsContextAnalyzer;
EventsContextAnalyzer.prototype.__class__ = EventsContextAnalyzer;
EventsContextAnalyzer.__cache__ = {};
Module['EventsContextAnalyzer'] = EventsContextAnalyzer;

EventsContextAnalyzer.prototype['GetEventsContext'] = EventsContextAnalyzer.prototype.GetEventsContext = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_EventsContextAnalyzer_GetEventsContext_0(self), EventsContext);
};;

EventsContextAnalyzer.prototype['Launch'] = EventsContextAnalyzer.prototype.Launch = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_EventsContextAnalyzer_Launch_1(self, arg0);
};;

  EventsContextAnalyzer.prototype['__destroy__'] = EventsContextAnalyzer.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_EventsContextAnalyzer___destroy___0(self);
};
// MapStringExpressionMetadata
function MapStringExpressionMetadata() { throw "cannot construct a MapStringExpressionMetadata, no constructor in IDL" }
MapStringExpressionMetadata.prototype = Object.create(WrapperObject.prototype);
MapStringExpressionMetadata.prototype.constructor = MapStringExpressionMetadata;
MapStringExpressionMetadata.prototype.__class__ = MapStringExpressionMetadata;
MapStringExpressionMetadata.__cache__ = {};
Module['MapStringExpressionMetadata'] = MapStringExpressionMetadata;

MapStringExpressionMetadata.prototype['MAP_get'] = MapStringExpressionMetadata.prototype.MAP_get = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_MapStringExpressionMetadata_MAP_get_1(self, arg0), ExpressionMetadata);
};;

MapStringExpressionMetadata.prototype['MAP_set'] = MapStringExpressionMetadata.prototype.MAP_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_MapStringExpressionMetadata_MAP_set_2(self, arg0, arg1);
};;

MapStringExpressionMetadata.prototype['MAP_has'] = MapStringExpressionMetadata.prototype.MAP_has = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_MapStringExpressionMetadata_MAP_has_1(self, arg0));
};;

MapStringExpressionMetadata.prototype['MAP_keys'] = MapStringExpressionMetadata.prototype.MAP_keys = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_MapStringExpressionMetadata_MAP_keys_0(self), VectorString);
};;

  MapStringExpressionMetadata.prototype['__destroy__'] = MapStringExpressionMetadata.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
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

MapStringVariable.prototype['MAP_get'] = MapStringVariable.prototype.MAP_get = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_MapStringVariable_MAP_get_1(self, arg0), Variable);
};;

MapStringVariable.prototype['MAP_set'] = MapStringVariable.prototype.MAP_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_MapStringVariable_MAP_set_2(self, arg0, arg1);
};;

MapStringVariable.prototype['MAP_has'] = MapStringVariable.prototype.MAP_has = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_MapStringVariable_MAP_has_1(self, arg0));
};;

MapStringVariable.prototype['MAP_keys'] = MapStringVariable.prototype.MAP_keys = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_MapStringVariable_MAP_keys_0(self), VectorString);
};;

  MapStringVariable.prototype['__destroy__'] = MapStringVariable.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_MapStringVariable___destroy___0(self);
};
// EventsListUnfolder
function EventsListUnfolder() { throw "cannot construct a EventsListUnfolder, no constructor in IDL" }
EventsListUnfolder.prototype = Object.create(WrapperObject.prototype);
EventsListUnfolder.prototype.constructor = EventsListUnfolder;
EventsListUnfolder.prototype.__class__ = EventsListUnfolder;
EventsListUnfolder.__cache__ = {};
Module['EventsListUnfolder'] = EventsListUnfolder;

EventsListUnfolder.prototype['STATIC_UnfoldWhenContaining'] = EventsListUnfolder.prototype.STATIC_UnfoldWhenContaining = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_EventsListUnfolder_STATIC_UnfoldWhenContaining_2(self, arg0, arg1);
};;

  EventsListUnfolder.prototype['__destroy__'] = EventsListUnfolder.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_EventsListUnfolder___destroy___0(self);
};
// ExternalLayout
/** @suppress {undefinedVars, duplicate} */function ExternalLayout() {
  this.ptr = _emscripten_bind_ExternalLayout_ExternalLayout_0();
  getCache(ExternalLayout)[this.ptr] = this;
};;
ExternalLayout.prototype = Object.create(WrapperObject.prototype);
ExternalLayout.prototype.constructor = ExternalLayout;
ExternalLayout.prototype.__class__ = ExternalLayout;
ExternalLayout.__cache__ = {};
Module['ExternalLayout'] = ExternalLayout;

ExternalLayout.prototype['SetName'] = ExternalLayout.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ExternalLayout_SetName_1(self, arg0);
};;

ExternalLayout.prototype['GetName'] = ExternalLayout.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExternalLayout_GetName_0(self));
};;

ExternalLayout.prototype['SetAssociatedLayout'] = ExternalLayout.prototype.SetAssociatedLayout = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ExternalLayout_SetAssociatedLayout_1(self, arg0);
};;

ExternalLayout.prototype['GetAssociatedLayout'] = ExternalLayout.prototype.GetAssociatedLayout = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ExternalLayout_GetAssociatedLayout_0(self));
};;

ExternalLayout.prototype['GetInitialInstances'] = ExternalLayout.prototype.GetInitialInstances = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExternalLayout_GetInitialInstances_0(self), InitialInstancesContainer);
};;

ExternalLayout.prototype['GetAssociatedSettings'] = ExternalLayout.prototype.GetAssociatedSettings = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExternalLayout_GetAssociatedSettings_0(self), LayoutEditorCanvasOptions);
};;

ExternalLayout.prototype['SerializeTo'] = ExternalLayout.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ExternalLayout_SerializeTo_1(self, arg0);
};;

ExternalLayout.prototype['UnserializeFrom'] = ExternalLayout.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ExternalLayout_UnserializeFrom_1(self, arg0);
};;

  ExternalLayout.prototype['__destroy__'] = ExternalLayout.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExternalLayout___destroy___0(self);
};
// ExtensionAndBehaviorMetadata
function ExtensionAndBehaviorMetadata() { throw "cannot construct a ExtensionAndBehaviorMetadata, no constructor in IDL" }
ExtensionAndBehaviorMetadata.prototype = Object.create(WrapperObject.prototype);
ExtensionAndBehaviorMetadata.prototype.constructor = ExtensionAndBehaviorMetadata;
ExtensionAndBehaviorMetadata.prototype.__class__ = ExtensionAndBehaviorMetadata;
ExtensionAndBehaviorMetadata.__cache__ = {};
Module['ExtensionAndBehaviorMetadata'] = ExtensionAndBehaviorMetadata;

ExtensionAndBehaviorMetadata.prototype['GetExtension'] = ExtensionAndBehaviorMetadata.prototype.GetExtension = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExtensionAndBehaviorMetadata_GetExtension_0(self), PlatformExtension);
};;

ExtensionAndBehaviorMetadata.prototype['GetMetadata'] = ExtensionAndBehaviorMetadata.prototype.GetMetadata = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ExtensionAndBehaviorMetadata_GetMetadata_0(self), BehaviorMetadata);
};;

  ExtensionAndBehaviorMetadata.prototype['__destroy__'] = ExtensionAndBehaviorMetadata.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ExtensionAndBehaviorMetadata___destroy___0(self);
};
// Resource
/** @suppress {undefinedVars, duplicate} */function Resource() {
  this.ptr = _emscripten_bind_Resource_Resource_0();
  getCache(Resource)[this.ptr] = this;
};;
Resource.prototype = Object.create(WrapperObject.prototype);
Resource.prototype.constructor = Resource;
Resource.prototype.__class__ = Resource;
Resource.__cache__ = {};
Module['Resource'] = Resource;

Resource.prototype['Clone'] = Resource.prototype.Clone = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Resource_Clone_0(self), Resource);
};;

Resource.prototype['SetName'] = Resource.prototype.SetName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Resource_SetName_1(self, arg0);
};;

Resource.prototype['GetName'] = Resource.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Resource_GetName_0(self));
};;

Resource.prototype['SetKind'] = Resource.prototype.SetKind = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Resource_SetKind_1(self, arg0);
};;

Resource.prototype['GetKind'] = Resource.prototype.GetKind = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Resource_GetKind_0(self));
};;

Resource.prototype['IsUserAdded'] = Resource.prototype.IsUserAdded = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Resource_IsUserAdded_0(self));
};;

Resource.prototype['SetUserAdded'] = Resource.prototype.SetUserAdded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Resource_SetUserAdded_1(self, arg0);
};;

Resource.prototype['UseFile'] = Resource.prototype.UseFile = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Resource_UseFile_0(self));
};;

Resource.prototype['SetFile'] = Resource.prototype.SetFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Resource_SetFile_1(self, arg0);
};;

Resource.prototype['GetFile'] = Resource.prototype.GetFile = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Resource_GetFile_0(self));
};;

Resource.prototype['GetAbsoluteFile'] = Resource.prototype.GetAbsoluteFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return Pointer_stringify(_emscripten_bind_Resource_GetAbsoluteFile_1(self, arg0));
};;

Resource.prototype['SetMetadata'] = Resource.prototype.SetMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Resource_SetMetadata_1(self, arg0);
};;

Resource.prototype['GetMetadata'] = Resource.prototype.GetMetadata = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Resource_GetMetadata_0(self));
};;

Resource.prototype['GetProperties'] = Resource.prototype.GetProperties = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Resource_GetProperties_1(self, arg0), MapStringPropertyDescriptor);
};;

Resource.prototype['UpdateProperty'] = Resource.prototype.UpdateProperty = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_Resource_UpdateProperty_3(self, arg0, arg1, arg2));
};;

Resource.prototype['SerializeTo'] = Resource.prototype.SerializeTo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Resource_SerializeTo_1(self, arg0);
};;

Resource.prototype['UnserializeFrom'] = Resource.prototype.UnserializeFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Resource_UnserializeFrom_1(self, arg0);
};;

  Resource.prototype['__destroy__'] = Resource.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Resource___destroy___0(self);
};
// AbstractFileSystemJS
/** @suppress {undefinedVars, duplicate} */function AbstractFileSystemJS() {
  this.ptr = _emscripten_bind_AbstractFileSystemJS_AbstractFileSystemJS_0();
  getCache(AbstractFileSystemJS)[this.ptr] = this;
};;
AbstractFileSystemJS.prototype = Object.create(AbstractFileSystem.prototype);
AbstractFileSystemJS.prototype.constructor = AbstractFileSystemJS;
AbstractFileSystemJS.prototype.__class__ = AbstractFileSystemJS;
AbstractFileSystemJS.__cache__ = {};
Module['AbstractFileSystemJS'] = AbstractFileSystemJS;

AbstractFileSystemJS.prototype['MkDir'] = AbstractFileSystemJS.prototype.MkDir = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AbstractFileSystemJS_MkDir_1(self, arg0);
};;

AbstractFileSystemJS.prototype['DirExists'] = AbstractFileSystemJS.prototype.DirExists = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AbstractFileSystemJS_DirExists_1(self, arg0);
};;

AbstractFileSystemJS.prototype['ClearDir'] = AbstractFileSystemJS.prototype.ClearDir = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_AbstractFileSystemJS_ClearDir_1(self, arg0);
};;

AbstractFileSystemJS.prototype['GetTempDir'] = AbstractFileSystemJS.prototype.GetTempDir = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_AbstractFileSystemJS_GetTempDir_0(self));
};;

AbstractFileSystemJS.prototype['FileNameFrom'] = AbstractFileSystemJS.prototype.FileNameFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return Pointer_stringify(_emscripten_bind_AbstractFileSystemJS_FileNameFrom_1(self, arg0));
};;

AbstractFileSystemJS.prototype['DirNameFrom'] = AbstractFileSystemJS.prototype.DirNameFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return Pointer_stringify(_emscripten_bind_AbstractFileSystemJS_DirNameFrom_1(self, arg0));
};;

AbstractFileSystemJS.prototype['IsAbsolute'] = AbstractFileSystemJS.prototype.IsAbsolute = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_AbstractFileSystemJS_IsAbsolute_1(self, arg0));
};;

AbstractFileSystemJS.prototype['CopyFile'] = AbstractFileSystemJS.prototype.CopyFile = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_AbstractFileSystemJS_CopyFile_2(self, arg0, arg1);
};;

AbstractFileSystemJS.prototype['WriteToFile'] = AbstractFileSystemJS.prototype.WriteToFile = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_AbstractFileSystemJS_WriteToFile_2(self, arg0, arg1);
};;

AbstractFileSystemJS.prototype['ReadFile'] = AbstractFileSystemJS.prototype.ReadFile = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return Pointer_stringify(_emscripten_bind_AbstractFileSystemJS_ReadFile_1(self, arg0));
};;

AbstractFileSystemJS.prototype['ReadDir'] = AbstractFileSystemJS.prototype.ReadDir = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_AbstractFileSystemJS_ReadDir_1(self, arg0), VectorString);
};;

AbstractFileSystemJS.prototype['FileExists'] = AbstractFileSystemJS.prototype.FileExists = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_AbstractFileSystemJS_FileExists_1(self, arg0));
};;

  AbstractFileSystemJS.prototype['__destroy__'] = AbstractFileSystemJS.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_AbstractFileSystemJS___destroy___0(self);
};
// PropertyDescriptor
/** @suppress {undefinedVars, duplicate} */function PropertyDescriptor(arg0) {
  ensureCache.prepare();
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

PropertyDescriptor.prototype['SetValue'] = PropertyDescriptor.prototype.SetValue = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PropertyDescriptor_SetValue_1(self, arg0), PropertyDescriptor);
};;

PropertyDescriptor.prototype['GetValue'] = PropertyDescriptor.prototype.GetValue = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PropertyDescriptor_GetValue_0(self));
};;

PropertyDescriptor.prototype['SetType'] = PropertyDescriptor.prototype.SetType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PropertyDescriptor_SetType_1(self, arg0), PropertyDescriptor);
};;

PropertyDescriptor.prototype['GetType'] = PropertyDescriptor.prototype.GetType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PropertyDescriptor_GetType_0(self));
};;

PropertyDescriptor.prototype['SetLabel'] = PropertyDescriptor.prototype.SetLabel = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PropertyDescriptor_SetLabel_1(self, arg0), PropertyDescriptor);
};;

PropertyDescriptor.prototype['GetLabel'] = PropertyDescriptor.prototype.GetLabel = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_PropertyDescriptor_GetLabel_0(self));
};;

PropertyDescriptor.prototype['AddExtraInfo'] = PropertyDescriptor.prototype.AddExtraInfo = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_PropertyDescriptor_AddExtraInfo_1(self, arg0), PropertyDescriptor);
};;

PropertyDescriptor.prototype['GetExtraInfo'] = PropertyDescriptor.prototype.GetExtraInfo = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PropertyDescriptor_GetExtraInfo_0(self), VectorString);
};;

  PropertyDescriptor.prototype['__destroy__'] = PropertyDescriptor.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_PropertyDescriptor___destroy___0(self);
};
// ObjectListDialogsHelper
/** @suppress {undefinedVars, duplicate} */function ObjectListDialogsHelper(arg0, arg1) {
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

ObjectListDialogsHelper.prototype['SetSearchText'] = ObjectListDialogsHelper.prototype.SetSearchText = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ObjectListDialogsHelper_SetSearchText_1(self, arg0);
};;

ObjectListDialogsHelper.prototype['SetAllowedObjectType'] = ObjectListDialogsHelper.prototype.SetAllowedObjectType = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_ObjectListDialogsHelper_SetAllowedObjectType_1(self, arg0);
};;

ObjectListDialogsHelper.prototype['SetGroupsAllowed'] = ObjectListDialogsHelper.prototype.SetGroupsAllowed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ObjectListDialogsHelper_SetGroupsAllowed_1(self, arg0);
};;

ObjectListDialogsHelper.prototype['GetMatchingObjects'] = ObjectListDialogsHelper.prototype.GetMatchingObjects = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ObjectListDialogsHelper_GetMatchingObjects_0(self), VectorString);
};;

  ObjectListDialogsHelper.prototype['__destroy__'] = ObjectListDialogsHelper.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ObjectListDialogsHelper___destroy___0(self);
};
// ProjectResourcesAdder
function ProjectResourcesAdder() { throw "cannot construct a ProjectResourcesAdder, no constructor in IDL" }
ProjectResourcesAdder.prototype = Object.create(WrapperObject.prototype);
ProjectResourcesAdder.prototype.constructor = ProjectResourcesAdder;
ProjectResourcesAdder.prototype.__class__ = ProjectResourcesAdder;
ProjectResourcesAdder.__cache__ = {};
Module['ProjectResourcesAdder'] = ProjectResourcesAdder;

ProjectResourcesAdder.prototype['STATIC_AddAllMissing'] = ProjectResourcesAdder.prototype.STATIC_AddAllMissing = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_ProjectResourcesAdder_STATIC_AddAllMissing_2(self, arg0, arg1);
};;

ProjectResourcesAdder.prototype['STATIC_GetAllUseless'] = ProjectResourcesAdder.prototype.STATIC_GetAllUseless = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_ProjectResourcesAdder_STATIC_GetAllUseless_2(self, arg0, arg1), VectorString);
};;

ProjectResourcesAdder.prototype['STATIC_RemoveAllUseless'] = ProjectResourcesAdder.prototype.STATIC_RemoveAllUseless = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_ProjectResourcesAdder_STATIC_RemoveAllUseless_2(self, arg0, arg1);
};;

  ProjectResourcesAdder.prototype['__destroy__'] = ProjectResourcesAdder.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ProjectResourcesAdder___destroy___0(self);
};
// VectorExpressionParserDiagnostic
function VectorExpressionParserDiagnostic() { throw "cannot construct a VectorExpressionParserDiagnostic, no constructor in IDL" }
VectorExpressionParserDiagnostic.prototype = Object.create(WrapperObject.prototype);
VectorExpressionParserDiagnostic.prototype.constructor = VectorExpressionParserDiagnostic;
VectorExpressionParserDiagnostic.prototype.__class__ = VectorExpressionParserDiagnostic;
VectorExpressionParserDiagnostic.__cache__ = {};
Module['VectorExpressionParserDiagnostic'] = VectorExpressionParserDiagnostic;

VectorExpressionParserDiagnostic.prototype['size'] = VectorExpressionParserDiagnostic.prototype.size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VectorExpressionParserDiagnostic_size_0(self);
};;

VectorExpressionParserDiagnostic.prototype['at'] = VectorExpressionParserDiagnostic.prototype.at = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VectorExpressionParserDiagnostic_at_1(self, arg0), ExpressionParserDiagnostic);
};;

  VectorExpressionParserDiagnostic.prototype['__destroy__'] = VectorExpressionParserDiagnostic.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorExpressionParserDiagnostic___destroy___0(self);
};
// JsPlatform
function JsPlatform() { throw "cannot construct a JsPlatform, no constructor in IDL" }
JsPlatform.prototype = Object.create(WrapperObject.prototype);
JsPlatform.prototype.constructor = JsPlatform;
JsPlatform.prototype.__class__ = JsPlatform;
JsPlatform.__cache__ = {};
Module['JsPlatform'] = JsPlatform;

JsPlatform.prototype['STATIC_Get'] = JsPlatform.prototype.STATIC_Get = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_JsPlatform_STATIC_Get_0(self), JsPlatform);
};;

JsPlatform.prototype['AddNewExtension'] = JsPlatform.prototype.AddNewExtension = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_JsPlatform_AddNewExtension_1(self, arg0);
};;

JsPlatform.prototype['GetName'] = JsPlatform.prototype.GetName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_JsPlatform_GetName_0(self));
};;

JsPlatform.prototype['GetFullName'] = JsPlatform.prototype.GetFullName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_JsPlatform_GetFullName_0(self));
};;

JsPlatform.prototype['GetSubtitle'] = JsPlatform.prototype.GetSubtitle = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_JsPlatform_GetSubtitle_0(self));
};;

JsPlatform.prototype['GetDescription'] = JsPlatform.prototype.GetDescription = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_JsPlatform_GetDescription_0(self));
};;

JsPlatform.prototype['IsExtensionLoaded'] = JsPlatform.prototype.IsExtensionLoaded = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_JsPlatform_IsExtensionLoaded_1(self, arg0));
};;

JsPlatform.prototype['RemoveExtension'] = JsPlatform.prototype.RemoveExtension = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_JsPlatform_RemoveExtension_1(self, arg0);
};;

JsPlatform.prototype['ReloadBuiltinExtensions'] = JsPlatform.prototype.ReloadBuiltinExtensions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_JsPlatform_ReloadBuiltinExtensions_0(self);
};;

JsPlatform.prototype['GetAllPlatformExtensions'] = JsPlatform.prototype.GetAllPlatformExtensions = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_JsPlatform_GetAllPlatformExtensions_0(self), VectorPlatformExtension);
};;

  JsPlatform.prototype['__destroy__'] = JsPlatform.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
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

MetadataProvider.prototype['STATIC_GetExtensionAndBehaviorMetadata'] = MetadataProvider.prototype.STATIC_GetExtensionAndBehaviorMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetExtensionAndBehaviorMetadata_2(self, arg0, arg1), ExtensionAndBehaviorMetadata);
};;

MetadataProvider.prototype['STATIC_GetExtensionAndObjectMetadata'] = MetadataProvider.prototype.STATIC_GetExtensionAndObjectMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetExtensionAndObjectMetadata_2(self, arg0, arg1), ExtensionAndObjectMetadata);
};;

MetadataProvider.prototype['STATIC_GetExtensionAndActionMetadata'] = MetadataProvider.prototype.STATIC_GetExtensionAndActionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetExtensionAndActionMetadata_2(self, arg0, arg1), ExtensionAndInstructionMetadata);
};;

MetadataProvider.prototype['STATIC_GetExtensionAndConditionMetadata'] = MetadataProvider.prototype.STATIC_GetExtensionAndConditionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetExtensionAndConditionMetadata_2(self, arg0, arg1), ExtensionAndInstructionMetadata);
};;

MetadataProvider.prototype['STATIC_GetExtensionAndExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetExtensionAndExpressionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetExtensionAndExpressionMetadata_2(self, arg0, arg1), ExtensionAndExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetExtensionAndObjectExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetExtensionAndObjectExpressionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetExtensionAndObjectExpressionMetadata_3(self, arg0, arg1, arg2), ExtensionAndExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetExtensionAndBehaviorExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetExtensionAndBehaviorExpressionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetExtensionAndBehaviorExpressionMetadata_3(self, arg0, arg1, arg2), ExtensionAndExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetExtensionAndStrExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetExtensionAndStrExpressionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetExtensionAndStrExpressionMetadata_2(self, arg0, arg1), ExtensionAndExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetExtensionAndObjectStrExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetExtensionAndObjectStrExpressionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetExtensionAndObjectStrExpressionMetadata_3(self, arg0, arg1, arg2), ExtensionAndExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetExtensionAndBehaviorStrExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetExtensionAndBehaviorStrExpressionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetExtensionAndBehaviorStrExpressionMetadata_3(self, arg0, arg1, arg2), ExtensionAndExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetBehaviorMetadata'] = MetadataProvider.prototype.STATIC_GetBehaviorMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetBehaviorMetadata_2(self, arg0, arg1), BehaviorMetadata);
};;

MetadataProvider.prototype['STATIC_GetObjectMetadata'] = MetadataProvider.prototype.STATIC_GetObjectMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetObjectMetadata_2(self, arg0, arg1), ObjectMetadata);
};;

MetadataProvider.prototype['STATIC_GetActionMetadata'] = MetadataProvider.prototype.STATIC_GetActionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetActionMetadata_2(self, arg0, arg1), InstructionMetadata);
};;

MetadataProvider.prototype['STATIC_GetConditionMetadata'] = MetadataProvider.prototype.STATIC_GetConditionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetConditionMetadata_2(self, arg0, arg1), InstructionMetadata);
};;

MetadataProvider.prototype['STATIC_GetExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetExpressionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetExpressionMetadata_2(self, arg0, arg1), ExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetObjectExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetObjectExpressionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetObjectExpressionMetadata_3(self, arg0, arg1, arg2), ExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetBehaviorExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetBehaviorExpressionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetBehaviorExpressionMetadata_3(self, arg0, arg1, arg2), ExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetStrExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetStrExpressionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetStrExpressionMetadata_2(self, arg0, arg1), ExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetObjectStrExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetObjectStrExpressionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetObjectStrExpressionMetadata_3(self, arg0, arg1, arg2), ExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_GetBehaviorStrExpressionMetadata'] = MetadataProvider.prototype.STATIC_GetBehaviorStrExpressionMetadata = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return wrapPointer(_emscripten_bind_MetadataProvider_STATIC_GetBehaviorStrExpressionMetadata_3(self, arg0, arg1, arg2), ExpressionMetadata);
};;

MetadataProvider.prototype['STATIC_HasCondition'] = MetadataProvider.prototype.STATIC_HasCondition = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasCondition_2(self, arg0, arg1));
};;

MetadataProvider.prototype['STATIC_HasAction'] = MetadataProvider.prototype.STATIC_HasAction = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasAction_2(self, arg0, arg1));
};;

MetadataProvider.prototype['STATIC_HasObjectAction'] = MetadataProvider.prototype.STATIC_HasObjectAction = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasObjectAction_3(self, arg0, arg1, arg2));
};;

MetadataProvider.prototype['STATIC_HasObjectCondition'] = MetadataProvider.prototype.STATIC_HasObjectCondition = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasObjectCondition_3(self, arg0, arg1, arg2));
};;

MetadataProvider.prototype['STATIC_HasBehaviorAction'] = MetadataProvider.prototype.STATIC_HasBehaviorAction = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasBehaviorAction_3(self, arg0, arg1, arg2));
};;

MetadataProvider.prototype['STATIC_HasBehaviorCondition'] = MetadataProvider.prototype.STATIC_HasBehaviorCondition = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasBehaviorCondition_3(self, arg0, arg1, arg2));
};;

MetadataProvider.prototype['STATIC_HasExpression'] = MetadataProvider.prototype.STATIC_HasExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasExpression_2(self, arg0, arg1));
};;

MetadataProvider.prototype['STATIC_HasObjectExpression'] = MetadataProvider.prototype.STATIC_HasObjectExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasObjectExpression_3(self, arg0, arg1, arg2));
};;

MetadataProvider.prototype['STATIC_HasBehaviorExpression'] = MetadataProvider.prototype.STATIC_HasBehaviorExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasBehaviorExpression_3(self, arg0, arg1, arg2));
};;

MetadataProvider.prototype['STATIC_HasStrExpression'] = MetadataProvider.prototype.STATIC_HasStrExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasStrExpression_2(self, arg0, arg1));
};;

MetadataProvider.prototype['STATIC_HasObjectStrExpression'] = MetadataProvider.prototype.STATIC_HasObjectStrExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasObjectStrExpression_3(self, arg0, arg1, arg2));
};;

MetadataProvider.prototype['STATIC_HasBehaviorStrExpression'] = MetadataProvider.prototype.STATIC_HasBehaviorStrExpression = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  return !!(_emscripten_bind_MetadataProvider_STATIC_HasBehaviorStrExpression_3(self, arg0, arg1, arg2));
};;

  MetadataProvider.prototype['__destroy__'] = MetadataProvider.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_MetadataProvider___destroy___0(self);
};
// VectorEventsSearchResult
/** @suppress {undefinedVars, duplicate} */function VectorEventsSearchResult() {
  this.ptr = _emscripten_bind_VectorEventsSearchResult_VectorEventsSearchResult_0();
  getCache(VectorEventsSearchResult)[this.ptr] = this;
};;
VectorEventsSearchResult.prototype = Object.create(WrapperObject.prototype);
VectorEventsSearchResult.prototype.constructor = VectorEventsSearchResult;
VectorEventsSearchResult.prototype.__class__ = VectorEventsSearchResult;
VectorEventsSearchResult.__cache__ = {};
Module['VectorEventsSearchResult'] = VectorEventsSearchResult;

VectorEventsSearchResult.prototype['CLONE_VectorEventsSearchResult'] = VectorEventsSearchResult.prototype.CLONE_VectorEventsSearchResult = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_VectorEventsSearchResult_CLONE_VectorEventsSearchResult_0(self), VectorEventsSearchResult);
};;

VectorEventsSearchResult.prototype['push_back'] = VectorEventsSearchResult.prototype.push_back = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VectorEventsSearchResult_push_back_1(self, arg0);
};;

VectorEventsSearchResult.prototype['resize'] = VectorEventsSearchResult.prototype.resize = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VectorEventsSearchResult_resize_1(self, arg0);
};;

VectorEventsSearchResult.prototype['size'] = VectorEventsSearchResult.prototype.size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VectorEventsSearchResult_size_0(self);
};;

VectorEventsSearchResult.prototype['at'] = VectorEventsSearchResult.prototype.at = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VectorEventsSearchResult_at_1(self, arg0), EventsSearchResult);
};;

VectorEventsSearchResult.prototype['WRAPPED_set'] = VectorEventsSearchResult.prototype.WRAPPED_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_VectorEventsSearchResult_WRAPPED_set_2(self, arg0, arg1);
};;

VectorEventsSearchResult.prototype['clear'] = VectorEventsSearchResult.prototype.clear = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorEventsSearchResult_clear_0(self);
};;

  VectorEventsSearchResult.prototype['__destroy__'] = VectorEventsSearchResult.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorEventsSearchResult___destroy___0(self);
};
// TextFormatting
function TextFormatting() { throw "cannot construct a TextFormatting, no constructor in IDL" }
TextFormatting.prototype = Object.create(WrapperObject.prototype);
TextFormatting.prototype.constructor = TextFormatting;
TextFormatting.prototype.__class__ = TextFormatting;
TextFormatting.__cache__ = {};
Module['TextFormatting'] = TextFormatting;

TextFormatting.prototype['IsBold'] = TextFormatting.prototype.IsBold = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TextFormatting_IsBold_0(self));
};;

TextFormatting.prototype['IsItalic'] = TextFormatting.prototype.IsItalic = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TextFormatting_IsItalic_0(self));
};;

TextFormatting.prototype['GetColorRed'] = TextFormatting.prototype.GetColorRed = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TextFormatting_GetColorRed_0(self);
};;

TextFormatting.prototype['GetColorGreen'] = TextFormatting.prototype.GetColorGreen = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TextFormatting_GetColorGreen_0(self);
};;

TextFormatting.prototype['GetColorBlue'] = TextFormatting.prototype.GetColorBlue = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TextFormatting_GetColorBlue_0(self);
};;

TextFormatting.prototype['GetUserData'] = TextFormatting.prototype.GetUserData = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TextFormatting_GetUserData_0(self);
};;

  TextFormatting.prototype['__destroy__'] = TextFormatting.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TextFormatting___destroy___0(self);
};
// ParserCallbacks
function ParserCallbacks() { throw "cannot construct a ParserCallbacks, no constructor in IDL" }
ParserCallbacks.prototype = Object.create(WrapperObject.prototype);
ParserCallbacks.prototype.constructor = ParserCallbacks;
ParserCallbacks.prototype.__class__ = ParserCallbacks;
ParserCallbacks.__cache__ = {};
Module['ParserCallbacks'] = ParserCallbacks;

ParserCallbacks.prototype['GetFirstError'] = ParserCallbacks.prototype.GetFirstError = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_ParserCallbacks_GetFirstError_0(self));
};;

ParserCallbacks.prototype['GetFirstErrorPosition'] = ParserCallbacks.prototype.GetFirstErrorPosition = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParserCallbacks_GetFirstErrorPosition_0(self);
};;

  ParserCallbacks.prototype['__destroy__'] = ParserCallbacks.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ParserCallbacks___destroy___0(self);
};
// EventsFunctionTools
function EventsFunctionTools() { throw "cannot construct a EventsFunctionTools, no constructor in IDL" }
EventsFunctionTools.prototype = Object.create(WrapperObject.prototype);
EventsFunctionTools.prototype.constructor = EventsFunctionTools;
EventsFunctionTools.prototype.__class__ = EventsFunctionTools;
EventsFunctionTools.__cache__ = {};
Module['EventsFunctionTools'] = EventsFunctionTools;

EventsFunctionTools.prototype['STATIC_EventsFunctionToObjectsContainer'] = EventsFunctionTools.prototype.STATIC_EventsFunctionToObjectsContainer = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_EventsFunctionTools_STATIC_EventsFunctionToObjectsContainer_3(self, arg0, arg1, arg2);
};;

  EventsFunctionTools.prototype['__destroy__'] = EventsFunctionTools.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_EventsFunctionTools___destroy___0(self);
};
// VectorVector2f
/** @suppress {undefinedVars, duplicate} */function VectorVector2f() {
  this.ptr = _emscripten_bind_VectorVector2f_VectorVector2f_0();
  getCache(VectorVector2f)[this.ptr] = this;
};;
VectorVector2f.prototype = Object.create(WrapperObject.prototype);
VectorVector2f.prototype.constructor = VectorVector2f;
VectorVector2f.prototype.__class__ = VectorVector2f;
VectorVector2f.__cache__ = {};
Module['VectorVector2f'] = VectorVector2f;

VectorVector2f.prototype['push_back'] = VectorVector2f.prototype.push_back = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VectorVector2f_push_back_1(self, arg0);
};;

VectorVector2f.prototype['size'] = VectorVector2f.prototype.size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_VectorVector2f_size_0(self);
};;

VectorVector2f.prototype['at'] = VectorVector2f.prototype.at = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_VectorVector2f_at_1(self, arg0), Vector2f);
};;

VectorVector2f.prototype['WRAPPED_set'] = VectorVector2f.prototype.WRAPPED_set = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_VectorVector2f_WRAPPED_set_2(self, arg0, arg1);
};;

VectorVector2f.prototype['FREE_removeFromVectorVector2f'] = VectorVector2f.prototype.FREE_removeFromVectorVector2f = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_VectorVector2f_FREE_removeFromVectorVector2f_1(self, arg0);
};;

VectorVector2f.prototype['clear'] = VectorVector2f.prototype.clear = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorVector2f_clear_0(self);
};;

  VectorVector2f.prototype['__destroy__'] = VectorVector2f.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VectorVector2f___destroy___0(self);
};
(function() {
  function setupEnums() {
    

    // EventsFunction_FunctionType

    Module['EventsFunction']['Action'] = _emscripten_enum_EventsFunction_FunctionType_Action();

    Module['EventsFunction']['Condition'] = _emscripten_enum_EventsFunction_FunctionType_Condition();

    Module['EventsFunction']['Expression'] = _emscripten_enum_EventsFunction_FunctionType_Expression();

    Module['EventsFunction']['StringExpression'] = _emscripten_enum_EventsFunction_FunctionType_StringExpression();

    

    // ParticleEmitterObject_RendererType

    Module['ParticleEmitterObject']['Point'] = _emscripten_enum_ParticleEmitterObject_RendererType_Point();

    Module['ParticleEmitterObject']['Line'] = _emscripten_enum_ParticleEmitterObject_RendererType_Line();

    Module['ParticleEmitterObject']['Quad'] = _emscripten_enum_ParticleEmitterObject_RendererType_Quad();

  }
  if (Module['calledRun']) setupEnums();
  else addOnPreMain(setupEnums);
})();
