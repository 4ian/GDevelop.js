var gd = require('../../Binaries/Output/WebIDE/Release/libGD.js');
var expect = require('expect.js');

describe('libGD.js', function(){
	gd.initializePlatforms();

	describe('gd.Project', function(){

		var project = gd.ProjectHelper.createNewGDJSProject();

		it('properties can be read and changed', function(){
			project.setName("My super project");
			expect(project.getName()).to.be("My super project");
			project.setAuthor("Me");
			expect(project.getAuthor()).to.be("Me");
			project.setMaximumFPS(15);
			expect(project.getMaximumFPS()).to.be(15);
			project.setMinimumFPS(15);
			expect(project.getMinimumFPS()).to.be(15);
		});
		it('layouts management is ok', function(){
			expect(project.hasLayoutNamed("Scene")).to.be(false);

			project.insertNewLayout("Scene", 0);
			expect(project.hasLayoutNamed("Scene")).to.be(true);
			expect(project.getLayout("Scene").getName()).to.be("Scene");

			project.removeLayout("Scene");
			expect(project.hasLayoutNamed("Scene")).to.be(false);
		});

		after(function() { project.delete(); });
	});

	describe('gd.Layout', function(){
		var project = gd.ProjectHelper.createNewGDJSProject();
		var layout = project.insertNewLayout("Scene", 0);

		it('properties can be read and changed', function(){
			expect(layout.getName()).to.be("Scene");
			layout.setName("My super layout");
			expect(layout.getName()).to.be("My super layout");
		});
		it('events', function() {
			var evts = layout.getEvents();
			expect(evts.getEventsCount()).to.be(0);
			var evt = evts.insertNewEvent(project, "BuiltinCommonInstructions::Standard", 0);
			expect(evts.getEventsCount()).to.be(1);
			evt.getSubEvents().insertNewEvent(project, "BuiltinCommonInstructions::Standard", 0);
			expect(evts.getEventAt(0).getSubEvents().getEventsCount()).to.be(1);
		});
		//TODO

		after(function() { project.delete(); });
	});

	describe('gd.InitialInstancesContainer', function(){
		var container = new gd.InitialInstancesContainer();

		it('initial state', function(){
			expect(container.getInstancesCount()).to.be(0);
		});
		it('adding instances', function() {
			var instance = container.insertNewInitialInstance();
			instance.setObjectName("MyObject");
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
			var functor = {
				invoke:function(instance){
					expect((i === 0 && instance.getObjectName() === "MyObject") ||
						(i === 1 && instance.getObjectName() === "MyObject2") ||
						(i === 2 && instance.getObjectName() === "MyObject3")).to.be(true);
					i++;
				}
			};
			container.iterateOverInstances(gd.InitialInstanceFunctor.implement(functor));
		});
		it('iterating with z ordering', function() {
			var i = 0;
			var functor = {
				invoke:function(instance){
					expect((i === 0 && instance.getObjectName() === "MyObject2") ||
						(i === 1 && instance.getObjectName() === "MyObject")).to.be(true);
					i++;
				}
			};
			container.iterateOverInstancesWithZOrdering(gd.InitialInstanceFunctor.implement(functor), "");
		});
		it('moving from layers to another', function() {
			container.moveInstancesToLayer("OtherLayer", "YetAnotherLayer");

			var functor = {
				invoke:function(instance){
					expect(instance.getObjectName()).to.be("MyObject3");
				}
			};
			container.iterateOverInstancesWithZOrdering(gd.InitialInstanceFunctor.implement(functor), "YetAnotherLayer");
		});
		it('removing instances', function() {
			container.removeInitialInstancesOfObject("MyObject");
			expect(container.getInstancesCount()).to.be(2);
		});
		it('removing instances on a layer', function() {
			container.removeAllInstancesOnLayer("YetAnotherLayer");
			expect(container.getInstancesCount()).to.be(1);
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
		it('custom properties', function(){
			initialInstance.updateCustomProperty("Animation", "2", project, layout);
			expect(initialInstance.getCustomProperties(project, layout).get("Animation").getValue()).
				to.be("2");
		});

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

		it('initial value', function(){
			expect(variable.getValue()).to.be(0);
			expect(variable.isNumber()).to.be(true);
		});
		it('value', function(){
			variable.setValue(5);
			expect(variable.getValue()).to.be(5);
			expect(variable.isNumber()).to.be(true);
		});
		it('string', function(){
			variable.setString("Hello");
			expect(variable.getString()).to.be("Hello");
			expect(variable.isNumber()).to.be(false);
		});
		it('structure', function(){
			variable.getChild("FirstChild").setValue(1);
			variable.getChild("SecondChild").setString("two");
			expect(variable.hasChild("FirstChild")).to.be(true);
			expect(variable.hasChild("SecondChild")).to.be(true);
			expect(variable.hasChild("NotExisting")).to.be(false);
			expect(variable.getChild("SecondChild").getString()).to.be("two");
			variable.removeChild("FirstChild");
			expect(variable.hasChild("FirstChild")).to.be(false);
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

			obj.addAnimation(anim1);

			var allResources = project.getResourcesManager().getAllResourcesList();
			expect(allResources.size()).to.be(2);

			gd.ProjectResourcesAdder.removeAllUselessResources(project);

			var allResources = project.getResourcesManager().getAllResourcesList();
			expect(allResources.size()).to.be(1);
			expect(allResources.get(0)).to.be("Used");
		});

	});

	describe('gd.Object', function(){
		var project = gd.ProjectHelper.createNewGDJSProject();
		var layout = project.insertNewLayout("Scene", 0);
		var object = layout.insertNewObject(project, "Sprite", "MyObject", 0);
		it('properties and initial values', function() {
			object.setName("TheObject");
			expect(object.getName()).to.be("TheObject");
			expect(object.hasAutomatismNamed("DoNotExists")).to.be(false);
		});
		//TODO

		after(function() {project.delete();});
	});
	describe('gd.Automatism', function(){
		var project = gd.ProjectHelper.createNewGDJSProject();
		var automatism = new gd.Automatism();

		it('properties and initial values', function() {
			automatism.setName("MyAutomatism");
			expect(automatism.getName()).to.be("MyAutomatism");
			expect(automatism.getTypeName()).to.be("");
		});
		it('update a not existing property', function() {
			expect(automatism.updateProperty("PropertyThatDoesNotExist", "MyValue", project)).to.be(false);
		});
		//TODO

		after(function() {
			automatism.delete();
			project.delete();
		});
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

		after(function() {instr.delete();});
	});

	describe('gd.BaseEvent', function(){
		//TODO
	});

	describe('gd.StandardEvent', function(){
		//TODO
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
		it('comment', function(){
			evt.setComment("My nice comment about my events!");
			expect(evt.getComment()).to.be("My nice comment about my events!");
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
		describe('gd.AutomatismMetadata', function() {
			var autoMetadata = provider.getAutomatismMetadata(gd.JsPlatform.get(), 'NotExistingAutomatism');

			it('have standard methods to get information', function() {
				expect(autoMetadata.getFullName).not.to.be(undefined);
				expect(autoMetadata.getDefaultName).not.to.be(undefined);
				expect(autoMetadata.getDescription).not.to.be(undefined);
				expect(autoMetadata.getGroup).not.to.be(undefined);
				expect(autoMetadata.getIconFilename).not.to.be(undefined);
			});
		});
		//TODO: gd.AutomatismMetadata
	});
});
