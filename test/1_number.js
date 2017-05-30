// Generated by LiveScript 1.5.0
(function(){
  var expect, big;
  expect = require('expect');
  big = require('big.js');
  describe('Basic', function(run){
    it('test-big', function(){
      var s;
      s = function(it){
        return big(it).toString();
      };
      expect(s(5)).toBe("5");
      expect(s("5")).toBe("5");
      expect(s("7601.11229246")).toBe("7601.11229246");
      expect(s("-7601.11229246")).toBe("-7601.11229246");
      return expect(s("802672.276608465139479303")).toBe("802672.276608465139479303");
    });
  });
}).call(this);
