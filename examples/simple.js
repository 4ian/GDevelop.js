var gd = require('../../Binaries/Output/libGD.js/Release/libGD.js')();

var project = new gd.Project();
project.setName('Hello!');

console.log(project.getName('Hello!'));

console.log(project.hasLayoutNamed("My new layout"));
var layout = project.insertNewLayout("My new layout", 0);
console.log(layout.getName());
console.log(project.hasLayoutNamed("My new layout"));
layout.setName("New name");
console.log(project.getLayout("New name").getName());


var instances = new gd.InitialInstancesContainer();
var object1 = instances.insertNewInitialInstance();
var object2 = instances.insertNewInitialInstance();
var object3 = instances.insertNewInitialInstance();
object1.setObjectName("Background");
object1.setX(120);
object1.setY(120);
object1.setLayer("layer1");
object2.setObjectName("MyCharacter");
object2.setX(250);
object2.setY(20);
object2.setAngle(45);
object2.setLayer("layer2");
object3.setObjectName("Background");
object3.setLayer("layer3");

var functor = new gd.InitialInstanceJSFunctor();
functor.invoke = function(initialInstancePtr) {
	initialInstance = gd.wrapPointer(initialInstancePtr, gd.InitialInstance);
	console.dir(initialInstance.getObjectName());
};
instances.iterateOverInstances(functor);

console.log(instances.someInstancesAreOnLayer("layer2"));
instances.removeAllInstancesOnLayer("layer2");
console.log(instances.someInstancesAreOnLayer("layer2"));
instances.iterateOverInstances(functor);

console.log(project.getUsedExtensions().size());
project.getUsedExtensions().push_back("MyNewExtensionName");
project.getUsedExtensions().push_back("MyNewExtensionName2");
console.log(project.getUsedExtensions().size());
console.log(project.getUsedExtensions().at(0));
console.log(project.getUsedExtensions().at(19));
project.getUsedExtensions().clear();
console.log(project.getUsedExtensions().size());

console.log(gd.ProjectHelper.createNewGDJSProject);

gd.destroy(instances);
gd.destroy(project);
