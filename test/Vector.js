var gd = require('../../Binaries/Output/libGD.js/Release/libGD.js')();
var expect = require('expect.js');

describe('libGD.js - gd.Vector* tests', function(){

	describe('gd.VectorString', function(){
		var vector = new gd.VectorString;
		it("should allow to add strings", function() {
			expect(vector.size()).to.be(0);
			vector.push_back("Hello world");
			expect(vector.size()).to.be(1);
			expect(vector.get(0)).to.be("Hello world");
		});
		it("can be cleared", function() {
			vector.clear();
			expect(vector.size()).to.be(0);
		});
		it("should allow to add lots of strings", function() {
			expect(vector.size()).to.be(0);
			for(var i = 0;i<250;++i) {
				vector.push_back("Hello world #" + i);
			}
			expect(vector.size()).to.be(250);
			expect(vector.get(34)).to.be("Hello world #34");
		});
		it("can change a string at a specified index", function() {
			var vector2 = new gd.VectorString;
			vector2.push_back("foo");
			vector2.push_back("bar");
			expect(vector2.size()).to.be(2);
			expect(vector2.get(1)).to.be("bar");

			expect(vector.set(56, "Modified hello world"));
			expect(vector.get(34)).to.be("Hello world #34");
			expect(vector2.set(1, "baz"));
			expect(vector.get(56)).to.be("Modified hello world");
			expect(vector2.get(1)).to.be("baz");
			expect(vector2.get(0)).to.be("foo");
			expect(vector.size()).to.be(250);
		});
		it("should allow to add UTF8 strings", function() {
			vector.clear();
			expect(vector.size()).to.be(0);
			vector.push_back("Bonjour à tous");
			vector.push_back("官话");
			expect(vector.size()).to.be(2);
			expect(vector.get(0)).to.be("Bonjour à tous");
			expect(vector.get(1)).to.be("官话");
		});
	});
});

