var expect = require('expect.js');

describe('libGD.js - stress tests', function(){
	it("should support being required a lot", function() {
		var preUsage = process.memoryUsage();
		process.setMaxListeners(120); //Avoid Node.js warning.
		for (var i = 0;i < 100;++i) {
			console.log(i);
			var gd = require('../../Binaries/Output/libGD.js/Release/libGD.js')();
			var layout = new gd.Layout();
			layout.setName("Test #" + i);
			expect(layout.getName()).to.be("Test #" + i);
			layout.delete();
			
			var postUsage = process.memoryUsage();
			console.log((postUsage.heapTotal - preUsage.heapTotal) / (1024 * 1024));
			console.log((postUsage.rss - preUsage.rss) / (1024 * 1024));
		}
	});
	it("should support creates a lot of objects", function() {
		var preUsage = process.memoryUsage();
		var gd = require('../../Binaries/Output/libGD.js/Release/libGD.js')();
		for (var i = 0;i < 100;++i) {
			console.log(i);
			var layout = new gd.Layout();
			layout.setName("Test #" + i);
			expect(layout.getName()).to.be("Test #" + i);
			layout.delete();
			
			var postUsage = process.memoryUsage();
			console.log((postUsage.heapTotal - preUsage.heapTotal) / (1024 * 1024));
			console.log((postUsage.rss - preUsage.rss) / (1024 * 1024));
		}
	});
});

