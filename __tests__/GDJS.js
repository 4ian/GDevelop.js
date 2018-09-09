const initGDevelopJS = require('../../Binaries/Output/libGD.js/Release/libGD.js');

describe('libGD.js - GDJS related tests', function() {
  let gd = null;
  beforeAll(() => (gd = initGDevelopJS()));

  describe('EventsCodeGenerator', function() {
    it("can generate code for a layout", function() {
      var project = gd.ProjectHelper.createNewGDJSProject();
      var layout = project.insertNewLayout('Scene', 0);

      var evt = layout
        .getEvents()
        .insertNewEvent(project, 'BuiltinCommonInstructions::Repeat', 0);
      gd.asRepeatEvent(evt).setRepeatExpression('5+4+3+2+1');
      var instr = new gd.Instruction();
      instr.setType('BuiltinCommonInstructions::Once');
      gd.asRepeatEvent(evt)
        .getConditions()
        .insert(instr, 0);

      var code = gd.EventsCodeGenerator.generateSceneEventsCompleteCode(
        project,
        layout,
        layout.getEvents(),
        new gd.SetString(),
        true
      );
      expect(code).toMatch(/(context.triggerOnce)/);

      instr.delete();
    })
  });
  describe('TextObject', function() {
    it('should expose TextObject specific methods', function() {
      var object = new gd.TextObject('MyTextObject');
      object.setString('Hello');
      object.setFontFilename('Hello.ttf');
      object.setCharacterSize(10);
      object.setBold(true);
      object.setColor(1, 2, 3);

      expect(object.getString()).toBe('Hello');
      expect(object.getFontFilename()).toBe('Hello.ttf');
      expect(object.getCharacterSize()).toBe(10);
      expect(object.isBold()).toBe(true);
      expect(object.getColorR()).toBe(1);
      expect(object.getColorG()).toBe(2);
      expect(object.getColorB()).toBe(3);
    });
  });
  describe('TiledSpriteObject', function() {
    it('should expose TiledSpriteObject specific methods', function() {
      var object = new gd.TiledSpriteObject('MyTiledSpriteObject');
      object.setTexture('MyImageName');
      expect(object.getTexture()).toBe('MyImageName');
    });
  });
  describe('ShapePainterObject', function() {
    it('should expose ShapePainterObject specific methods', function() {
      var object = new gd.ShapePainterObject('MyShapePainterObject');
      object.setCoordinatesAbsolute();
      expect(object.areCoordinatesAbsolute()).toBe(true);
      object.setCoordinatesRelative();
      expect(object.areCoordinatesAbsolute()).toBe(false);
    });
  });
  describe('TextEntryObject', function() {
    it('should expose TextEntryObject', function() {
      var object = new gd.TextEntryObject('MyTextEntryObject');
    });
  });
  describe('AdMobObject', function() {
    it('should expose AdMobObject properties', function() {
      var project = gd.ProjectHelper.createNewGDJSProject();
      var object = new gd.AdMobObject('MyAdMobObject');
      var props = object.getProperties(project);
      expect(props.has('Testing mode')).toBe(true);
      expect(props.get('Testing mode').getValue()).toBe('true');
    });
  });
  describe('JsCodeEvent', function() {
    it('can store its code', function() {
      var event = new gd.JsCodeEvent();
      event.setInlineCode('console.log("Hello world");');
      expect(event.getInlineCode()).toBe('console.log("Hello world");');
    });
    it('can store the objects to pass as parameter', function() {
      var event = new gd.JsCodeEvent();
      event.setParameterObjects('MyObject');
      expect(event.getParameterObjects()).toBe('MyObject');
    });
    it('can be cloned', function() {
      var event = new gd.JsCodeEvent();
      event.setInlineCode('console.log("Hello world 2");');
      event.setParameterObjects('MyObject2');

      var cloneEvent = event.clone();
      expect(cloneEvent.getParameterObjects()).toBe('MyObject2');
      expect(cloneEvent.getInlineCode()).toBe('console.log("Hello world 2");');
    });
  });
});
