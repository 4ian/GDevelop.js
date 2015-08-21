var gd = require('../../Binaries/Output/libGD.js/Release/libGD.js')();
var expect = require('expect.js');

describe('libGD.js - GDJS related tests', function(){
	//gd.initializePlatforms();

	describe('EventsCodeGenerator', function(){

		var project = gd.ProjectHelper.createNewGDJSProject();
		var layout = project.insertNewLayout("Scene", 0);

		var evt = layout.getEvents().insertNewEvent(project, "BuiltinCommonInstructions::Repeat", 0);
		gd.asRepeatEvent(evt).setRepeatExpression("5+4+3+2+1");
		var instr = new gd.Instruction();
		instr.setType("BuiltinCommonInstructions::Once");
		gd.asRepeatEvent(evt).getConditions().insert(instr, 0);

		var code = gd.EventsCodeGenerator.generateSceneEventsCompleteCode(project, layout, layout.getEvents(), new gd.SetString(), true);
		expect(code).to.match(/(context.triggerOnce)/);

		instr.delete();
	});
	describe('TextObject', function(){
		var object = new gd.TextObject("MyTextObject");
		it("should expose TextObject specific methods", function() {
			object.setString("Hello");
			object.setFontFilename("Hello.ttf");
			object.setCharacterSize(10);
			object.setBold(true);
			object.setColor(1,2,3);

			expect(object.getString()).to.be("Hello");
			expect(object.getFontFilename()).to.be("Hello.ttf");
			expect(object.getCharacterSize()).to.be(10);
			expect(object.isBold()).to.be(true);
			expect(object.getColorR()).to.be(1);
			expect(object.getColorG()).to.be(2);
			expect(object.getColorB()).to.be(3);
		});
	});
});

