Module = Module || {};
var gd = Module;

// Make sure that the naming convention for methods of GDevelop
// classes is camelCase (instead of CamelCase) and rename methods
// starting by WRAPPED_.
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
                if (method.indexOf("STATIC_") == 0) {
                    newName = removePrefix(newName, "STATIC_");
                    addToObject = true;
                }

                //Normalize method name
                newName = removePrefix(uncapitalizeFirstLetter(newName), "WRAPPED_");
                if (newName !== method) {
                    proto[newName] = proto[method];
                    delete proto[method];
                }

                if (addToObject) {
                    object[newName] = proto[newName];
                }
            }
        }
    }

    for(var gdClass in gd) {
        if (gd.hasOwnProperty(gdClass)) {
            if (typeof gd[gdClass] !== "function") continue;
            if (!gd[gdClass].prototype) continue;
            if (!gd[gdClass].prototype.hasOwnProperty("__class__")) continue;

            adaptClassMethods(gd[gdClass]);
        }
    }

    gd.initializePlatforms = gd.ProjectHelper.prototype.initializePlatforms;
})(gd);
