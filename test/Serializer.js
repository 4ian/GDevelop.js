var gd = require('../../Binaries/Output/libGD.js/Release/libGD.js')();
var expect = require('expect.js');

describe('libGD.js object serialization', function() {
  describe('gd.SerializerElement', function() {
    it('should support operations on its value', function() {
      var element = new gd.SerializerElement();
      element.setString('aaa');
      expect(element.getValue().getString()).to.be('aaa');

      element.setInt(123);
      expect(element.getValue().getInt()).to.be(123);

      element.setDouble(123.456);
      expect(element.getValue().getDouble()).to.be(123.456);
    });
    it('should cast values from a type to another', function() {
      var element = new gd.SerializerElement();
      element.setString('123');
      expect(element.getValue().getString()).to.be('123');
      expect(element.getValue().getInt()).to.be(123);
      expect(element.getValue().getDouble()).to.be(123.0);

      element.setString('true');
      expect(element.getValue().getBool()).to.be(true);
      element.setBool(false);
      expect(element.getValue().getBool()).to.be(false);
    });
    it('should support operations on its children', function() {
      var element = new gd.SerializerElement();

      expect(element.hasChild('Missing')).to.be(false);
      var child1 = element.addChild('Child1');
      expect(element.hasChild('Child1')).to.be(true);
      expect(element.getChild('Child1').ptr).to.be(child1.ptr);

      var child2 = new gd.SerializerElement();
      child2.addChild('subChild').setString('Hello world!');
      element.addChild('Child2');
      element.setChild('Child2', child2);

      expect(
        element
          .getChild('Child2')
          .getChild('subChild')
          .getValue()
          .getString()
      ).to.be('Hello world!');
    });
  });

  describe('gd.Serializer', function() {
    it('should serialize a Text Object', function() {
      var obj = new gd.TextObject('testObject');
      obj.setType('TextObject::Text');
      obj.setName('testObject');
      obj.setString('Text of the object, with 官话 characters');

      var serializedObject = new gd.SerializerElement();
      obj.serializeTo(serializedObject);
      var jsonObject = gd.Serializer.toJSON(serializedObject);
      serializedObject.delete();
      obj.delete();

      expect(jsonObject).to.be(
        '{"bold": false,"italic": false,"name": "testObject","smoothed": true,"type": "TextObject::Text","underlined": false,"variables": [],"behaviors": [],"string": "Text of the object, with 官话 characters","font": "","characterSize": 20,"color": {"b": 255,"g": 255,"r": 255}}'
      );
    });
  });

  describe('gd.Serializer.fromJSON', function() {
    it('should unserialize and reserialize JSON', function() {
      var json =
        '{"a": {"a1": {"name": "","referenceTo": "/a/a1"}},"b": {"b1": "world"},"c": {"c1": 3},"things": {"0": {"name": "layout0","referenceTo": "/layouts/layout"},"1": {"name": "layout1","referenceTo": "/layouts/layout"},"2": {"name": "layout2","referenceTo": "/layouts/layout"},"3": {"name": "layout3","referenceTo": "/layouts/layout"},"4": {"name": "layout4","referenceTo": "/layouts/layout"}}}';

      var element = gd.Serializer.fromJSON(json);
      var outputJson = gd.Serializer.toJSON(element);

      expect(outputJson).to.be(json);
    });
  });

  describe('gd.Serializer.fromJSObject', function() {
    it('should unserialize and reserialize JSON', function() {
      var json =
        '{"a": {"a1": {"name": "","referenceTo": "/a/a1"}},"b": {"b1": "world"},"c": {"c1": 3},"things": {"0": {"name": "layout0","referenceTo": "/layouts/layout"},"1": {"name": "layout1","referenceTo": "/layouts/layout"},"2": {"name": "layout2","referenceTo": "/layouts/layout"},"3": {"name": "layout3","referenceTo": "/layouts/layout"},"4": {"name": "layout4","referenceTo": "/layouts/layout"}}}';
      var object = JSON.parse(json);

      var element = gd.Serializer.fromJSObject(object);
      var outputJson = gd.Serializer.toJSON(element);

      expect(outputJson).to.be(json);
    });
  });
});
