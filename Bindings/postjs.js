        /*Emscripten generated-code for Module will be inserted here*/

        return Module;
    };

    // Make sure that the naming convention for methods of GDevelop
    // classes is camelCase (instead of CamelCase) and rename methods
    // with special names (like `WRAPPED_`, `STATIC_`...).
    var adaptNamingConventions = function(gd) {
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
                    var addToModule = false;
                    var addToObject = false;

                    //Detect static methods
                    if (method.indexOf("STATIC_") === 0) {
                        newName = removePrefix(newName, "STATIC_");
                        addToObject = true;
                    }

                    //Detect free functions
                    if (method.indexOf("FREE_") === 0) {
                        newName = removePrefix(newName, "FREE_");
                        addToModule = true;
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
                        object[newName] = proto[newName];
                    }

                    if (addToModule) {
                        gd[newName] = (function(fct) {
                            return function() { //Simulate a free function
                                if (arguments.length === 0) return fct();
                                var args = [];
                                Array.prototype.push.apply(args, arguments);
                                args.shift();

                                return fct.apply(arguments[0], args);
                            };
                        })(proto[newName]);
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

        //Provide shortcuts for casts:
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

        //Convenience methods:
        gd.VectorString.prototype.toJSArray = function() {
            var arr = [];
            for(var i = 0;i < this.size(); ++i) {
                arr.push(this.at(i));
            }
            return arr;
        }

        //Preserve backward compatibility with some alias for methods:
        gd.VectorString.prototype.get = gd.VectorString.prototype.at;
        gd.VectorPlatformExtension.prototype.get = gd.VectorPlatformExtension.prototype.at;
        gd.InstructionsList.prototype.push_back = function(e) {
            this.insert(e, this.size() - 1);
        };

        return gd;
    };

    //Expose gd module.
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = function(options) {
            return adaptNamingConventions(createModule(options));
        };
    } else {
        window.gd = adaptNamingConventions(createModule());
    }
})();
//# sourceMappingURL=libGD.raw.js.map;
