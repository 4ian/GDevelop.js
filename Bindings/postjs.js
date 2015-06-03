Module = Module || {};
var gd = Module;

// Make sure that the naming convention for methods of GDevelop
// classes is camelCase (instead of CamelCase) and rename methods
// with special names (like `WRAPPED_`, `STATIC_`...).
(function(gd) {
    function uncapitalizeFirstLetter(method) {
        return method.charAt(0).toLowerCase() + method.slice(1);
    }

    function removePrefix(method, prefix) {
        if (method.indexOf(prefix) !== 0)
            return method;

        return method.replace(prefix, "");
    }

    function adaptClassMethods(object) {
        var proto = object.prototype;
        for (var method in proto) {
            if (method && proto.hasOwnProperty(method)) {
                var newName = method;
                var addToObject = false;

                //Detect static methods
                if (method.indexOf("STATIC_") === 0) {
                    newName = removePrefix(newName, "STATIC_");
                    addToObject = true;
                }

                //Remove prefix used for custom code generation
                newName = removePrefix(newName, "MAP_");
                newName = removePrefix(newName, "WRAPPED_");
                if (newName.indexOf("CLONE_") === 0) {
                    newName = "clone";
                }

                //Normalize method name
                newName = uncapitalizeFirstLetter(newName);
                if (newName !== method) {
                    proto[newName] = proto[method];
                    delete proto[method];
                }

                if (addToObject) {
                    //TODO: Bind first argument to 0 for static?
                    object[newName] = proto[newName];
                }
            }
        }

        //Offer a delete method that does what gd.destroy does.
        proto.delete = function() { gd.destroy(this) };
    }

    for(var gdClass in gd) {
        if (gd.hasOwnProperty(gdClass)) {
            if (typeof gd[gdClass] !== "function") continue;
            if (!gd[gdClass].prototype) continue;
            if (!gd[gdClass].prototype.hasOwnProperty("__class__")) continue;

            adaptClassMethods(gd[gdClass]);
        }
    }

    gd.Object = gd.gdObject; //Renaming was done to avoid clashing with javascript Object.
    gd.initializePlatforms = gd.ProjectHelper.prototype.initializePlatforms;
    gd.asStandardEvent = function(evt) { return gd.castObject(evt, gd.StandardEvent); }
    gd.asRepeatEvent = function(evt) { return gd.castObject(evt, gd.RepeatEvent); }
    gd.asWhileEvent = function(evt) { return gd.castObject(evt, gd.WhileEvent); }
    gd.asForEachEvent = function(evt) { return gd.castObject(evt, gd.ForEachEvent); }
    gd.asCommentEvent = function(evt) { return gd.castObject(evt, gd.CommentEvent); }
    gd.asGroupEvent = function(evt) { return gd.castObject(evt, gd.GroupEvent); }
    gd.asPlatform = function(evt) { return gd.castObject(evt, gd.Platform); }

    gd.asSpriteObject = function(evt) { return gd.castObject(evt, gd.SpriteObject); }
    gd.asTiledSpriteObject = function(evt) { return gd.castObject(evt, gd.TiledSpriteObject); }
    gd.asTextObject = function(evt) { return gd.castObject(evt, gd.TextObject); }

    //Preserve backward compatibility with some alias for methods:
    gd.VectorString.prototype.get = gd.VectorString.prototype.at;
    gd.VectorPlatformExtension.prototype.get = gd.VectorPlatformExtension.prototype.at;
    gd.InstructionsList.prototype.push_back = function(e) {
    	this.insert(e, this.size() - 1);
    };

})(gd);
