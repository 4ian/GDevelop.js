var gd = require('../../Binaries/Output/libGD.js/Release/libGD.js')();
var expect = require('expect.js');

describe('libGD.js - GDJS related tests', function() {
  //gd.initializePlatforms();

  describe('EventsCodeGenerator', function() {
    var project = gd.ProjectHelper.createNewGDJSProject();
    var layout = project.insertNewLayout('Scene', 0);

    var evt = layout
      .getEvents()
      .insertNewEvent(project, 'BuiltinCommonInstructions::Repeat', 0);
    gd.asRepeatEvent(evt).setRepeatExpression('5+4+3+2+1');
    var instr = new gd.Instruction();
    instr.setType('BuiltinCommonInstructions::Once');
    gd
      .asRepeatEvent(evt)
      .getConditions()
      .insert(instr, 0);

    var code = gd.EventsCodeGenerator.generateSceneEventsCompleteCode(
      project,
      layout,
      layout.getEvents(),
      new gd.SetString(),
      true
    );
    expect(code).to.match(/(context.triggerOnce)/);

    instr.delete();
  });
  describe('TextObject', function() {
    var object = new gd.TextObject('MyTextObject');
    it('should expose TextObject specific methods', function() {
      object.setString('Hello');
      object.setFontFilename('Hello.ttf');
      object.setCharacterSize(10);
      object.setBold(true);
      object.setColor(1, 2, 3);

      expect(object.getString()).to.be('Hello');
      expect(object.getFontFilename()).to.be('Hello.ttf');
      expect(object.getCharacterSize()).to.be(10);
      expect(object.isBold()).to.be(true);
      expect(object.getColorR()).to.be(1);
      expect(object.getColorG()).to.be(2);
      expect(object.getColorB()).to.be(3);
    });
  });
  describe('TiledSpriteObject', function() {
    var object = new gd.TiledSpriteObject('MyTiledSpriteObject');
    it('should expose TiledSpriteObject specific methods', function() {
      object.setTexture('MyImageName');
      expect(object.getTexture()).to.be('MyImageName');
    });
  });
  describe('ShapePainterObject', function() {
    var object = new gd.ShapePainterObject('MyShapePainterObject');
    it('should expose ShapePainterObject specific methods', function() {
      object.setCoordinatesAbsolute();
      expect(object.areCoordinatesAbsolute()).to.be(true);
      object.setCoordinatesRelative();
      expect(object.areCoordinatesAbsolute()).to.be(false);
    });
  });
  describe('TextEntryObject', function() {
    it('should expose TextEntryObject', function() {
      var object = new gd.TextEntryObject('MyTextEntryObject');
    });
  });
  describe('AdMobObject', function() {
    var project = gd.ProjectHelper.createNewGDJSProject();
    var object = new gd.AdMobObject('MyAdMobObject');
    it('should expose AdMobObject properties', function() {
      var props = object.getProperties(project);
      expect(props.has('Testing mode')).to.be(true);
      expect(props.get('Testing mode').getValue()).to.be('true');
    });
  });
  describe('JsCodeEvent', function() {
    it('can store its code', function() {
      var event = new gd.JsCodeEvent();
      event.setInlineCode('console.log("Hello world");');
      expect(event.getInlineCode()).to.be('console.log("Hello world");');
    });
    it('can store the objects to pass as parameter', function() {
      var event = new gd.JsCodeEvent();
      event.setParameterObjects('MyObject');
      expect(event.getParameterObjects()).to.be('MyObject');
    });
    it('can be cloned', function() {
      var event = new gd.JsCodeEvent();
      event.setInlineCode('console.log("Hello world 2");');
      event.setParameterObjects('MyObject2');

      var cloneEvent = event.clone();
      expect(cloneEvent.getParameterObjects()).to.be('MyObject2');
      expect(cloneEvent.getInlineCode()).to.be('console.log("Hello world 2");');
    });
  });
});
