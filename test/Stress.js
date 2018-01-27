var expect = require('expect.js');

describe('libGD.js - stress tests', function() {
  it('should support being required a lot', function() {
    process.setMaxListeners(40); //Avoid Node.js warning.
    for (var i = 0; i < 20; ++i) {
      var gd = require('../../Binaries/Output/libGD.js/Release/libGD.js')();
      var layout = new gd.Layout();
      layout.setName('Test #' + i);
      expect(layout.getName()).to.be('Test #' + i);
      layout.delete();
    }
  });
  it('should support creates a lot of objects', function() {
    var gd = require('../../Binaries/Output/libGD.js/Release/libGD.js')();
    for (var i = 0; i < 100; ++i) {
      var layout = new gd.Layout();
      layout.setName('Test #' + i);
      expect(layout.getName()).to.be('Test #' + i);
      layout.delete();
    }
  });
});
