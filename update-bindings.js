#!/usr/bin/env node
/**
 * This script launch Emscripten's WebIDL binder to generate
 * the glue.cpp and glue.js file inside Bindings directory
 * using Bindings.idl
 */

var fs = require('fs');
var exec = require('child_process').exec;

if (!process.env.EMSCRIPTEN) {
	console.error("EMSCRIPTEN env. variable is not set");
	console.log("Please set Emscripten environment by launching `emsdk_env` script");
}
var emscriptenPath = process.env.EMSCRIPTEN;
var webIdlBinderPath = emscriptenPath + "/tools/webidl_binder.py";

generateGlueFromBinding(function(err) {
	if (err) return fatalError(err);

	patchGlueCppFile(function(err) {
		if (err) return fatalError(err);

	});
});

/**
 * Run Embind webidl_binder.py to generate glue.cpp and glue.js
 * from Bindings.idl
 */
function generateGlueFromBinding(cb) {
	fs.exists(webIdlBinderPath, function (exists) {
		if (!exists) {
			cb({message: "Please check your Emscripten installation",
				output: "Can't find " + webIdlBinderPath});
			return;
		}

		exec('python "' + webIdlBinderPath + '" Bindings/Bindings.idl Bindings/glue',
			function (err, stdout, stderr) {
			if (err) {
			  	cb({ message: "Error while running WebIDL binder:", output: err});
			}

			cb(null);
		});

	});
}

/**
 * A few modification needs to be made to glue.cpp because of limitations
 * of the IDL language/binder.
 */
function patchGlueCppFile(cb) {
	var file = 'Bindings/glue.cpp';
	fs.readFile(file, function (err, data) {
		if (err) cb(err);

		var patchedFile = "";
		var patchReturnString = false;
		data.toString().split('\n').forEach(function (line) {
			//When declaring a function returning "[Const, Ref] DOMString"
			//in the IDL file, the return type is const char*. We are using
			//std::string in GDevelop and need to call c_str.
			if (patchReturnString) {
				line = line
					.replace(";", ".c_str();")
					.replace("&", "");
			}

			//Make sure free functions are called properly.
			var freeCallPos = line.indexOf("self->FREE_");
			if(freeCallPos !== -1) {
				var nameEndPos = line.indexOf("(", freeCallPos);
				var name = line.substring(freeCallPos + 11, nameEndPos);

				line = line.substring(0, freeCallPos) +
	           		name + "(*self, " +
	           		line.substring(nameEndPos+1, line.length);
			}

			//Fix calls to operator [] with pointers
			line = line.replace("self->MAP_set", "(*self)MAP_set");

			patchedFile += line + "\n";
			patchReturnString = (line.indexOf("const char* EMSCRIPTEN_KEEPALIVE") == 0);
		});

		fs.writeFile(file, patchedFile, function(err) {
			cb(err);
		});
	});
}

function fatalError(error) {
	if (error.message) console.error(error.message);
	if (error.output) console.log(error.output);
	process.exit(1);
}
