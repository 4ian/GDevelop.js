var gd = require('../../Binaries/Output/libGD.js/Release/libGD.js')();
var gd2 = require('../../Binaries/Output/libGD.js/Release/libGD.js')();
var path = require('path');
var extend = require('extend');
var expect = require('expect.js');

describe('libGD.js', function(){
	gd.initializePlatforms();

	describe('gd.VersionWrapper', function(){
		it('can return the version number of the library', function() {
			expect(gd.VersionWrapper.major()).to.be.a("number");
			expect(gd.VersionWrapper.minor()).to.be.a("number");
			expect(gd.VersionWrapper.build()).to.be.a("number");
			expect(gd.VersionWrapper.revision()).to.be.a("number");
			expect(gd.VersionWrapper.fullString()).to.be.a("string");
		});
	});

	describe('gd.Project', function(){

		var project = gd.ProjectHelper.createNewGDJSProject();

		it('has properties that can be read and changed', function(){
			project.setName("My super project");
			expect(project.getName()).to.be("My super project");
			project.setPackageName("com.test.package");
			expect(project.getPackageName()).to.be("com.test.package");
			project.setAuthor("Me");
			expect(project.getAuthor()).to.be("Me");
			project.setMaximumFPS(15);
			expect(project.getMaximumFPS()).to.be(15);
			project.setMinimumFPS(15);
			expect(project.getMinimumFPS()).to.be(15);
		});

		it('handles layouts', function(){
			expect(project.hasLayoutNamed("Scene")).to.be(false);

			project.insertNewLayout("Scene", 0);
			expect(project.hasLayoutNamed("Scene")).to.be(true);
			expect(project.getLayout("Scene").getName()).to.be("Scene");

			project.removeLayout("Scene");
			expect(project.hasLayoutNamed("Scene")).to.be(false);
		});

		it('handles external events', function(){
			expect(project.hasExternalEventsNamed("My events")).to.be(false);

			project.insertNewExternalEvents("My events", 0);
			expect(project.hasExternalEventsNamed("My events")).to.be(true);
			expect(project.getExternalEvents("My events").getName()).to.be("My events");

			project.removeExternalEvents("My events");
			expect(project.hasExternalEventsNamed("My events")).to.be(false);
		});

		it('handles external layouts', function(){
			expect(project.hasExternalLayoutNamed("My layout")).to.be(false);

			project.insertNewExternalLayout("My layout", 0);
			expect(project.hasExternalLayoutNamed("My layout")).to.be(true);
			expect(project.getExternalLayout("My layout").getName()).to.be("My layout");

			project.removeExternalLayout("My layout");
			expect(project.hasExternalLayoutNamed("My layout")).to.be(false);
		});

		it("should validate object names", function() {
			expect(gd.Project.validateObjectName("ThisNameIs_Ok_123")).to.be(true);
			expect(gd.Project.validateObjectName("ThisName IsNot_Ok_123")).to.be(false);
			expect(gd.Project.validateObjectName("ThisNameIsNot_Ok!")).to.be(false);
		});

		it("should have a list of extensions", function() {
			expect(project.getUsedExtensions().size()).to.be.a("number");
			project.getUsedExtensions().clear();
			expect(project.getUsedExtensions().size()).to.be(0);
		});

		after(function() { project.delete(); });
	});

	describe('gd.Layout', function(){
		var project = gd.ProjectHelper.createNewGDJSProject();
		var layout = project.insertNewLayout("Scene", 0);

		it('can have a new name', function(){
			expect(layout.getName()).to.be("Scene");
			layout.setName("My super layout");
			expect(layout.getName()).to.be("My super layout");
		});
		it('can have a name with UTF8 characters', function(){
			layout.setName("Scene with a 官话 name");
			expect(layout.getName()).to.be("Scene with a 官话 name");
		});
		it('can store events', function() {
			var evts = layout.getEvents();
			expect(evts.getEventsCount()).to.be(0);
			var evt = evts.insertNewEvent(project, "BuiltinCommonInstructions::Standard", 0);
			expect(evts.getEventsCount()).to.be(1);
			evt.getSubEvents().insertNewEvent(project, "BuiltinCommonInstructions::Standard", 0);
			expect(evts.getEventAt(0).getSubEvents().getEventsCount()).to.be(1);
		});
		it('can have objects', function() {
			var object = layout.insertNewObject(project, "Sprite", "MyObject", 0);
			var object2 = layout.insertNewObject(project, "TextObject::Text", "MyObject2", 1);

			expect(layout.getObjectAt(0).ptr).to.be(object.ptr);
			expect(layout.getObjectAt(1).ptr).to.be(object2.ptr);
			expect(layout.getObjectAt(0).getType()).to.be("Sprite");
			expect(layout.getObjectAt(1).getType()).to.be("TextObject::Text");
		});

		after(function() { project.delete(); });
	});

	describe('gd.InitialInstancesContainer', function(){
		var container = new gd.InitialInstancesContainer();
		var containerCopy = null;

		it('initial state', function(){
			expect(container.getInstancesCount()).to.be(0);
		});
		it('adding instances', function() {
			var instance = container.insertNewInitialInstance();
			instance.setObjectName("MyObject1");
			instance.setZOrder(10);

			var instance2 = new gd.InitialInstance();
			instance2.setObjectName("MyObject2");
			instance2 = container.insertInitialInstance(instance2);

			var instance3 = container.insertNewInitialInstance();
			instance3.setObjectName("MyObject3");
			instance3.setZOrder(-1);
			instance3.setLayer("OtherLayer");

			expect(container.getInstancesCount()).to.be(3);
		});
		it('iterating', function() {
			var i = 0;
			var functor = new gd.InitialInstanceJSFunctor();
			functor.invoke = function(instance) {
				instance = gd.wrapPointer(instance, gd.InitialInstance);
				expect((i === 0 && instance.getObjectName() === "MyObject1") ||
					(i === 1 && instance.getObjectName() === "MyObject2") ||
					(i === 2 && instance.getObjectName() === "MyObject3")).to.be(true);
				i++;
			};
			container.iterateOverInstances(functor);
		});
		it('can rename instances', function() {
			container.renameInstancesOfObject("MyObject1", "MyObject");

			var i = 0;
			var functor = new gd.InitialInstanceJSFunctor();
			functor.invoke = function(instance) {
				instance = gd.wrapPointer(instance, gd.InitialInstance);
				expect((i === 0 && instance.getObjectName() === "MyObject") ||
					(i === 1 && instance.getObjectName() === "MyObject2") ||
					(i === 2 && instance.getObjectName() === "MyObject3")).to.be(true);
				i++;
			};
			container.iterateOverInstances(functor);
		});
		it('iterating with z ordering', function() {
			var i = 0;
			var functor = new gd.InitialInstanceJSFunctor();
			functor.invoke = function(instance) {
				instance = gd.wrapPointer(instance, gd.InitialInstance);
				expect((i === 0 && instance.getObjectName() === "MyObject2") ||
					(i === 1 && instance.getObjectName() === "MyObject")).to.be(true);
				i++;
			};
			container.iterateOverInstancesWithZOrdering(functor, "");
		});
		it('moving from layers to another', function() {
			container.moveInstancesToLayer("OtherLayer", "YetAnotherLayer");

			var functor = new gd.InitialInstanceJSFunctor();
			functor.invoke = function(instance) {
				instance = gd.wrapPointer(instance, gd.InitialInstance);
				expect(instance.getObjectName()).to.be("MyObject3");
			};
			container.iterateOverInstancesWithZOrdering(functor, "YetAnotherLayer");
		});
		it('can be cloned', function() {
			containerCopy = container.clone();
			expect(containerCopy.getInstancesCount()).to.be(3);

			var instance = containerCopy.insertNewInitialInstance();
			instance.setObjectName("MyObject4");
			expect(containerCopy.getInstancesCount()).to.be(4);
			expect(container.getInstancesCount()).to.be(3);

			containerCopy.delete();
			containerCopy = null;
		});
		it('removing instances', function() {
			container.removeInitialInstancesOfObject("MyObject");
			expect(container.getInstancesCount()).to.be(2);
		});
		it('removing instances on a layer', function() {
			container.removeAllInstancesOnLayer("YetAnotherLayer");
			expect(container.getInstancesCount()).to.be(1);
		});
		it('can be serialized', function() {
			expect(container.serializeTo).to.not.be(undefined);
			expect(container.unserializeFrom).to.not.be(undefined);
		});

		after(function() { container.delete(); });
	});

	describe('gd.InitialInstance', function(){
		var project = gd.ProjectHelper.createNewGDJSProject();
		var layout = project.insertNewLayout("Scene", 0);
		layout.insertNewObject(project, "Sprite", "MySpriteObject", 0);
		var initialInstance = layout.getInitialInstances().insertNewInitialInstance();

		it('properties', function(){
			initialInstance.setObjectName("MySpriteObject");
			expect(initialInstance.getObjectName()).to.be("MySpriteObject");
			initialInstance.setX(150);
			expect(initialInstance.getX()).to.be(150);
			initialInstance.setY(140);
			expect(initialInstance.getY()).to.be(140);
			initialInstance.setAngle(45);
			expect(initialInstance.getAngle()).to.be(45);
			initialInstance.setZOrder(12);
			expect(initialInstance.getZOrder()).to.be(12);
			initialInstance.setLayer("MyLayer");
			expect(initialInstance.getLayer()).to.be("MyLayer");
			initialInstance.setLocked(true);
			expect(initialInstance.isLocked()).to.be(true);
			initialInstance.setHasCustomSize(true);
			expect(initialInstance.hasCustomSize()).to.be(true);
			initialInstance.setCustomWidth(34);
			expect(initialInstance.getCustomWidth()).to.be(34);
			initialInstance.setCustomHeight(30);
			expect(initialInstance.getCustomHeight()).to.be(30);
		});
		it('Sprite object custom properties', function(){
			initialInstance.updateCustomProperty("Animation", "2", project, layout);
			expect(initialInstance.getCustomProperties(project, layout).get("Animation").getValue()).
				to.be("2");
			expect(initialInstance.getRawFloatProperty("animation")).to.be(2);
		});
		it('can be serialized', function() {
			expect(initialInstance.serializeTo).to.not.be(undefined);
			expect(initialInstance.unserializeFrom).to.not.be(undefined);

			var element = new gd.SerializerElement();
			initialInstance.serializeTo(element);

			var initialInstance2 = layout.getInitialInstances().insertNewInitialInstance();
			initialInstance2.unserializeFrom(element);
			expect(initialInstance2.getObjectName()).to.be("MySpriteObject");
			expect(initialInstance2.getX()).to.be(150);
			expect(initialInstance2.getY()).to.be(140);
			expect(initialInstance2.getAngle()).to.be(45);
			expect(initialInstance2.getZOrder()).to.be(12);
			expect(initialInstance2.getLayer()).to.be("MyLayer");
			expect(initialInstance2.isLocked()).to.be(true);
			expect(initialInstance2.hasCustomSize()).to.be(true);
			expect(initialInstance2.getCustomWidth()).to.be(34);
			expect(initialInstance2.getCustomHeight()).to.be(30);
		})

		after(function(){ project.delete(); });
	});

	describe('gd.VariablesContainer', function(){
		it('container is empty after being created', function(){
			var container = new gd.VariablesContainer();

			expect(container.has("Variable")).to.be(false);
			expect(container.count()).to.be(0);
			container.delete();
		});
		it('can insert variables', function(){
			var container = new gd.VariablesContainer();

			container.insertNew("Variable", 0);
			expect(container.has("Variable")).to.be(true);
			expect(container.count()).to.be(1);

			container.insertNew("SecondVariable", 0);
			expect(container.has("SecondVariable")).to.be(true);
			expect(container.count()).to.be(2);
			container.delete();
		});
		it('can rename variables', function(){
			var container = new gd.VariablesContainer();

			container.insertNew("Variable", 0);
			container.insertNew("SecondVariable", 0).setString("String of SecondVariable");
			container.insertNew("ThirdVariable", 0);

			expect(container.has("SecondVariable")).to.be(true);
			expect(container.has("NewName")).to.be(false);
			container.rename("SecondVariable", "NewName");
			expect(container.has("SecondVariable")).to.be(false);
			expect(container.has("NewName")).to.be(true);

			expect(container.get("NewName").getString()).to.be("String of SecondVariable");
			container.delete();
		});
		it('can reorganize variables', function(){
			var container = new gd.VariablesContainer();

			container.insertNew("Variable", 0).setValue(4);
			container.insertNew("SecondVariable", 1).setString("String of SecondVariable");
			container.insertNew("ThirdVariable", 2).getChild("Child1").setValue(7);

			expect(container.getAt(0).getName()).to.be("Variable");
			expect(container.getAt(2).getName()).to.be("ThirdVariable");

			container.swap(0, 2);
			expect(container.getAt(0).getName()).to.be("ThirdVariable");
			expect(container.getAt(2).getName()).to.be("Variable");
			expect(container.getAt(2).getVariable().getValue()).to.be(4);
			container.delete();
		});
	});

	describe('gd.Variable', function(){
		var variable = new gd.Variable();

		it('should have initial value', function(){
			expect(variable.getValue()).to.be(0);
			expect(variable.isNumber()).to.be(true);
		});
		it('can have a value', function(){
			variable.setValue(5);
			expect(variable.getValue()).to.be(5);
			expect(variable.isNumber()).to.be(true);
		});
		it('can have a string', function(){
			variable.setString("Hello");
			expect(variable.getString()).to.be("Hello");
			expect(variable.isNumber()).to.be(false);
		});
		it('can be a structure', function(){
			variable.getChild("FirstChild").setValue(1);
			variable.getChild("SecondChild").setString("two");
			expect(variable.hasChild("FirstChild")).to.be(true);
			expect(variable.hasChild("SecondChild")).to.be(true);
			expect(variable.hasChild("NotExisting")).to.be(false);
			expect(variable.getChild("SecondChild").getString()).to.be("two");
			variable.removeChild("FirstChild");
			expect(variable.hasChild("FirstChild")).to.be(false);
		});
		it('can expose its children', function(){
			variable.getChild("FirstChild").setValue(1);

			var children = variable.getAllChildren();
			var childrenNames = children.keys();
			expect(childrenNames.size()).to.be(2);

			children.get(childrenNames.get(0)).setString("one");
			children.get(childrenNames.get(1)).setValue(2);

			expect(variable.getChild("FirstChild").getString()).to.be("one");
			expect(variable.getChild("SecondChild").getValue()).to.be(2);

			//Check that children count didn't change
			expect(childrenNames.size()).to.be(2);
			var childrenNames = children.keys();
		});

		after(function() {variable.delete();});
	});

	describe('gd.ImageResource', function(){
		it('should have name and file', function() {
			var resource = new gd.ImageResource();
			resource.setName("MyResource");
			resource.setFile("MyFile");
			expect(resource.getName()).to.be("MyResource");
			expect(resource.getFile()).to.be("MyFile");
		});
	});

	describe('gd.ResourcesManager', function(){
		var project = gd.ProjectHelper.createNewGDJSProject();

		it('should support adding resources', function() {
			var resource = new gd.Resource();
			resource.setName("MyResource");
			project.getResourcesManager().addResource(resource);
			var allResources = project.getResourcesManager().getAllResourcesList();

			expect(allResources.size()).to.be(1);

		});
		it('should support removing resources', function() {
			var resource = new gd.Resource();
			resource.setName("MyResource");
			project.getResourcesManager().addResource(resource);
			project.getResourcesManager().removeResource("MyResource");
			var allResources = project.getResourcesManager().getAllResourcesList();

			expect(allResources.size()).to.be(0);
		});
	});

	describe('gd.ProjectResourcesAdder', function(){
		var project = gd.ProjectHelper.createNewGDJSProject();

		it('should support removing useless resources', function() {
			var resource1 = new gd.ImageResource();
			resource1.setName("Useless");
			var resource2 = new gd.ImageResource();
			resource2.setName("Used");
			project.getResourcesManager().addResource(resource1);
			project.getResourcesManager().addResource(resource2);

			//Create an object using a resource
			var obj = project.insertNewObject(project, "Sprite", "MyObject", 0);
			var sprite1 = new gd.Sprite();
			sprite1.setImageName("Used");

			var anim1 = new gd.Animation();
			anim1.setDirectionsCount(1);
			anim1.getDirection(0).addSprite(sprite1);

			gd.castObject(obj, gd.SpriteObject).addAnimation(anim1);

			var allResources = project.getResourcesManager().getAllResourcesList();
			expect(allResources.size()).to.be(2);

			gd.ProjectResourcesAdder.removeAllUselessImages(project);

			var allResources = project.getResourcesManager().getAllResourcesList();
			expect(allResources.size()).to.be(1);
			expect(allResources.get(0)).to.be("Used");
		});

		after(function() {project.delete();});
	});

	describe('gd.ArbitraryResourceWorker', function(){
		var project = gd.ProjectHelper.createNewGDJSProject();
		var obj = project.insertNewObject(project, "Sprite", "MyObject", 0);
		var sprite1 = new gd.Sprite();
		sprite1.setImageName("Used");

		it('should be called with resources of the project', function() {
			var worker = extend(new gd.ArbitraryResourceWorkerJS(), {
				exposeImage: function(image) {
 					console.log(image);
				}
			})

			project.exposeResources(worker);
		});

		after(function() {project.delete();});
	});
	describe('gd.Behavior', function(){
		var project = gd.ProjectHelper.createNewGDJSProject();
		var behavior = new gd.Behavior();

		it('properties and initial values', function() {
			behavior.setName("MyBehavior");
			expect(behavior.getName()).to.be("MyBehavior");
			expect(behavior.getTypeName()).to.be("");
		});
		it('update a not existing property', function() {
			expect(behavior.updateProperty("PropertyThatDoesNotExist", "MyValue", project)).to.be(false);
		});
		//TODO

		after(function() {
			behavior.delete();
			project.delete();
		});
	});

	describe('gd.Object', function(){
		var project = gd.ProjectHelper.createNewGDJSProject();
		var layout = project.insertNewLayout("Scene", 0);
		var object = layout.insertNewObject(project, "Sprite", "MyObject", 0);

		it('has properties and initial values', function() {
			object.setName("TheObject");
			expect(object.getName()).to.be("TheObject");
			expect(object.hasBehaviorNamed("DoNotExists")).to.be(false);
		});

		it('can have its type retrieved with gd.getTypeOfObject', function() {
			expect(gd.getTypeOfObject(project, layout, "TheObject", true)).to.be("Sprite");
		});

		it('can have behaviors', function() {
			var behavior = object.addNewBehavior(project, "DraggableBehavior::Draggable", "Draggable");
			expect(object.hasBehaviorNamed("Draggable")).to.be(true);
			expect(object.getBehavior("Draggable")).to.be(behavior);
		});

		it('can have its behaviors retrieved with gd.getBehaviorsOfObject', function() {
			var behaviors = gd.getBehaviorsOfObject(project, layout, "TheObject", true);
			expect(behaviors.size()).to.be(1);
			expect(behaviors.get(0)).to.be("Draggable");
		});

		after(function() {project.delete();});
	});

	describe('gd.Instruction', function(){
		var instr = new gd.Instruction();

		it('initial values', function(){
			expect(instr.getParametersCount()).to.be(0);
			expect(instr.getSubInstructions().size()).to.be(0);
		});
		it('setting parameters', function(){
			instr.setParametersCount(3);
			expect(instr.getParametersCount()).to.be(3);
			expect(instr.getParameter(1)).to.be("");
			instr.setParameter(2, "MyValue");
			expect(instr.getParameter(2)).to.be("MyValue");
		});
		it('can be cloned', function(){
			var newInstr = instr.clone();
			expect(newInstr.getParametersCount()).to.be(3);
			expect(newInstr.getParameter(1)).to.be("");
			expect(newInstr.getParameter(2)).to.be("MyValue");

			newInstr.setParameter(2, "MyChangedValue");
			expect(instr.getParameter(2)).to.be("MyValue");
			expect(newInstr.getParameter(2)).to.be("MyChangedValue");
			newInstr.delete();
			expect(instr.getParameter(2)).to.be("MyValue");
		});

		after(function() {instr.delete();});
	});

	describe('gd.InstructionsList', function(){
		var list = new gd.InstructionsList();

		it('can insert instructions', function(){
			expect(list.size()).to.be(0);
			list.insert(new gd.Instruction(), 0);
			expect(list.size()).to.be(1);
		});
		it('can modify its instructions', function(){
			expect(list.get(0).getType()).to.be("");

			var newInstr = new gd.Instruction();
			newInstr.setType("Type2");
			list.set(0, newInstr);

			expect(list.get(0).getType()).to.be("Type2");
			expect(list.size()).to.be(1);
		});
		it('can remove its instructions', function(){
			var newInstr = new gd.Instruction();
			newInstr.setType("Type3");
			var instruction = list.insert(newInstr, 1);
			expect(list.get(1).getType()).to.be("Type3");
			expect(list.size()).to.be(2);
			expect(list.contains(instruction)).to.be(true);

			list.remove(instruction);
			expect(list.size()).to.be(1);
			expect(list.get(0).getType()).to.be("Type2");
		});
		it('should clear its instructions', function(){
			list.clear();
			expect(list.size()).to.be(0);
		});

		after(function() {list.delete();});
	});

	describe("InstructionSentenceFormatter", function() {
		var instrFormatter = gd.InstructionSentenceFormatter.get();
		instrFormatter.loadTypesFormattingFromConfig();
		var action = new gd.Instruction(); //Create a simple instruction
		action.setType("Delete");
		action.setParametersCount(2);
		action.setParameter(0, "MyCharacter");

		it('should translate instructions', function() {
			var actionSentenceInEnglish = gd.InstructionSentenceFormatter.get().translate(action,
				gd.MetadataProvider.getActionMetadata(gd.JsPlatform.get(), "Delete"));
			expect(actionSentenceInEnglish).to.be("Delete object MyCharacter");
		});

		it('should translate instructions into a vector of text with formatting', function() {
			var formattedTexts = gd.InstructionSentenceFormatter.get().getAsFormattedText(action,
				gd.MetadataProvider.getActionMetadata(gd.JsPlatform.get(), "Delete"));

			expect(formattedTexts.size()).to.be(2);
			expect(formattedTexts.getString(0)).to.be("Delete object ");
			expect(formattedTexts.getString(1)).to.be("MyCharacter");
			expect(formattedTexts.getTextFormatting(0).isBold()).to.be(false);
			expect(formattedTexts.getTextFormatting(1).isBold()).to.be(true);
		});

		after(function() {
			instrFormatter.delete();
			action.delete();
		});
	});

	describe('gd.BaseEvent (and gd.EmptyEvent)', function(){
		//Nothing for now.
	});

	describe('gd.EventsList', function(){
		var project = new gd.ProjectHelper.createNewGDJSProject();
		var list = new gd.EventsList();

		it('can have events', function() {
			list.insertEvent(new gd.StandardEvent(), 0);
			var lastEvent = list.insertEvent(new gd.StandardEvent(), 1);
			list.insertEvent(new gd.StandardEvent(), 1);
			expect(list.getEventsCount()).to.be(3);
			expect(list.getEventAt(2).ptr).to.be(lastEvent.ptr);
		});

		it('can create lots of new events', function() {
			for(var i = 0;i<500;++i) {
				var evt = list.insertNewEvent(project, "BuiltinCommonInstructions::Standard", 0);
				expect(evt.getType()).to.be("BuiltinCommonInstructions::Standard");
				expect(gd.asStandardEvent(list.getEventAt(0))
					.getType()).to.be("BuiltinCommonInstructions::Standard");
				expect(list.getEventAt(0).getType()).to.be("BuiltinCommonInstructions::Standard");
			}
		});

		it('can tell if it contains an event', function() {
			var parentEvent = list.insertEvent(new gd.StandardEvent(), 0);
			var subEvent = parentEvent.getSubEvents().insertEvent(new gd.StandardEvent(), 0);

			expect(list.contains(parentEvent, false)).to.be(true);
			expect(list.contains(subEvent, false)).to.be(false);
			expect(list.contains(subEvent, true)).to.be(true);
		});

		after(function() {
			project.delete();
			list.delete();
		});
	});

	describe('gd.ArbitraryEventsWorker', function() {
		var project = new gd.ProjectHelper.createNewGDJSProject();
		var list = new gd.EventsList();

		describe('gd.EventsParametersLister', function() {
			var evt = new gd.StandardEvent();
			var actions = evt.getActions();
			var act = new gd.Instruction();
			act.setType("Delete");
			act.setParametersCount(1);
			act.setParameter(0, "MyObject");
			actions.push_back(act);
			evt = list.insertEvent(evt, 0);

			var subEvt = new gd.StandardEvent();
			var conditions = subEvt.getConditions();
			var cnd = new gd.Instruction();
			cnd.setType("PosX");
			cnd.setParametersCount(3);
			cnd.setParameter(0, "MyObject");
			cnd.setParameter(1, "<");
			cnd.setParameter(2, "300");
			conditions.push_back(cnd);
			evt.getSubEvents().insertEvent(subEvt, 0);

			var parametersLister = new gd.EventsParametersLister(project);
			parametersLister.launch(list);

			//Check that we collected the parameters and their types
			expect(parametersLister.getParametersAndTypes().keys().size()).to.be(3);
			expect(parametersLister.getParametersAndTypes().get("MyObject")).to.be("object");
			expect(parametersLister.getParametersAndTypes().get("300")).to.be("expression");
		});

		after(function() {
			project.delete();
			list.delete();
		});
	});

	describe('gd.GroupEvent', function(){
		var evt = new gd.GroupEvent();

		it('handle basic properties', function() {
			evt.setName("MyName");
			evt.setSource("http://source.url");
			evt.setCreationTimestamp(150);
			expect(evt.getName()).to.be("MyName");
			expect(evt.getSource()).to.be("http://source.url");
			expect(evt.getCreationTimestamp()).to.be(150);
		});
		it('can be folded', function() {
			expect(evt.isFolded()).to.be(false);
			evt.setFolded(true);
			expect(evt.isFolded()).to.be(true);
		});
		it('can remember parameters used to create the group from a template event', function() {
			var parameters = evt.getCreationParameters();
			parameters.push_back("Param1");
			parameters.push_back("Param2");

			expect(evt.getCreationParameters().size()).to.be(2);
			expect(evt.getCreationParameters().get(0)).to.be("Param1");
			expect(evt.getCreationParameters().get(1)).to.be("Param2");

			parameters.clear();
			expect(evt.getCreationParameters().size()).to.be(0);
			parameters.push_back("Param1");
			expect(evt.getCreationParameters().get(0)).to.be("Param1");
		});
	});

	describe('gd.StandardEvent', function(){
		var evt = new gd.StandardEvent();

		it('initial values', function(){
			expect(evt.canHaveSubEvents()).to.be(true);
			expect(evt.isExecutable()).to.be(true);
		});
		it('conditions and actions', function(){
			var conditions = evt.getConditions();
			expect(evt.getConditions().size()).to.be(0);
			var cnd = new gd.Instruction();
			conditions.push_back(cnd);
			expect(evt.getConditions().size()).to.be(1);

			var actions = evt.getActions();
			expect(evt.getActions().size()).to.be(0);
			var act = new gd.Instruction();
			actions.push_back(act);
			expect(evt.getActions().size()).to.be(1);
		});

		after(function() {evt.delete();});
	});
	describe('gd.CommentEvent', function(){
		var evt = new gd.CommentEvent();

		it('initial values', function(){
			expect(evt.canHaveSubEvents()).to.be(false);
			expect(evt.isExecutable()).to.be(false);
		});
		it('can have a comment', function(){
			evt.setComment("My nice comment about my events!");
			expect(evt.getComment()).to.be("My nice comment about my events!");
		});
		it('can have a comment with UTF8 characters', function(){
			evt.setComment("Hello 官话 world!");
			expect(evt.getComment()).to.be("Hello 官话 world!");
		});

		after(function() {evt.delete();});
	});

	describe('gd.SpriteObject', function(){

		var obj = new gd.SpriteObject("MySpriteObject");

		it('can have animations', function(){
			obj.addAnimation(new gd.Animation());
			obj.addAnimation(new gd.Animation());
			expect(obj.getAnimationsCount()).to.be(2);
			obj.removeAnimation(1);
			expect(obj.getAnimationsCount()).to.be(1);
		});

		it('can swap animations', function(){
			obj.removeAllAnimations();
			var anim1 = new gd.Animation();
			var anim2 = new gd.Animation();
			var sprite1 = new gd.Sprite();
			var sprite2 = new gd.Sprite();

			sprite1.setImageName("image1");
			sprite2.setImageName("image2");

			anim1.setDirectionsCount(1);
			anim2.setDirectionsCount(1);
			anim1.getDirection(0).addSprite(sprite1);
			anim2.getDirection(0).addSprite(sprite2);

			obj.addAnimation(anim1);
			obj.addAnimation(anim2);
			expect(obj.getAnimation(0).getDirection(0).getSprite(0).getImageName()).to.be("image1");
			obj.swapAnimations(0, 1);
			expect(obj.getAnimation(0).getDirection(0).getSprite(0).getImageName()).to.be("image2");
		});


		describe('gd.Direction', function() {
			var direction = new gd.Direction();

			it('can swap sprites', function() {
				var sprite1 = new gd.Sprite();
				var sprite2 = new gd.Sprite();
				sprite1.setImageName("image1");
				sprite2.setImageName("image2");
				direction.addSprite(sprite1);
				direction.addSprite(sprite2);

				expect(direction.getSprite(0).getImageName()).to.be("image1");
				direction.swapSprites(0, 1);
				expect(direction.getSprite(0).getImageName()).to.be("image2");
				direction.swapSprites(1, 0);
				expect(direction.getSprite(0).getImageName()).to.be("image1");
			});
		});
	});

	describe('gd.MetadataProvider', function() {
		var provider = gd.MetadataProvider;

		it('can return metadata about expressions (even if they do not exist)', function() {
			expect(provider.hasExpression(gd.JsPlatform.get(), "NotExistingExpression")).to.be(false);
			expect(provider.getExpressionMetadata(gd.JsPlatform.get(), "NotExistingExpression").getFullName()).to.be("");
		});

		describe('gd.ObjectMetadata', function() {
			var objMetadata = provider.getObjectMetadata(gd.JsPlatform.get(), 'Sprite');

			it('can return standard information about Sprite object', function() {
				expect(objMetadata.getName()).to.be("Sprite");
				expect(objMetadata.getFullName()).to.be("Sprite");
				expect(objMetadata.getDescription().length).not.to.be(0);
				expect(objMetadata.getIconFilename().length).not.to.be(0);
			});
		});
		describe('gd.BehaviorMetadata', function() {
			var autoMetadata = provider.getBehaviorMetadata(gd.JsPlatform.get(), 'NotExistingBehavior');

			it('have standard methods to get information', function() {
				expect(autoMetadata.getFullName).not.to.be(undefined);
				expect(autoMetadata.getDefaultName).not.to.be(undefined);
				expect(autoMetadata.getDescription).not.to.be(undefined);
				expect(autoMetadata.getGroup).not.to.be(undefined);
				expect(autoMetadata.getIconFilename).not.to.be(undefined);
			});
		});
	});

	describe('gd.Exporter (and gd.AbstractFileSystemJS)', function() {
		var fs = new gd.AbstractFileSystemJS();
		var project = new gd.ProjectHelper.createNewGDJSProject();
		var layout = project.insertNewLayout("Scene", 0);

		it('should export a layout for preview', function(done) {
			fs.mkDir = fs.clearDir = function() {};
			fs.getTempDir = function(path) { return "/tmp/"; };
    		fs.fileNameFrom = function(fullpath) {
        		return path.basename(fullpath);
    		};
    		fs.dirNameFrom = function(fullpath) {
        		return path.dirname(fullpath);
    		};
    		fs.writeToFile = function(path, content) {
    			//Validate that some code have been generated:
        		expect(content).to.match(/context.startNewFrame/);
        		done();
    		};

			var exporter = new gd.Exporter(fs);
			exporter.exportLayoutForPixiPreview(project, layout, "/path/for/export/");
			exporter.delete();
		});
	});
});
