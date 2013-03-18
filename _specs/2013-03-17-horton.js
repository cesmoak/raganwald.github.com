// Generated by CoffeeScript 1.6.1
(function() {
  var FlockingBird, Mayzie, OneRight, TwoRight, any;

  any = require('underscore').any;

  FlockingBird = (function() {

    function FlockingBird(greater, lesser) {
      this.greater = greater != null ? greater : [];
      this.lesser = lesser != null ? lesser : [];
    }

    FlockingBird.prototype.standsAgainst = function(rival) {
      var case1, case2, courtingBird;
      courtingBird = this;
      case1 = any(this.greater, function(gb) {
        return rival.standsAgaint(gb);
      });
      case2 = any(rival.lesser, function(lb) {
        return lb.standsAgainst(courtingBird);
      });
      return (!case1) && (!case2);
    };

    FlockingBird.prototype.confused = function() {
      var case1a, case1b, case2,
        _this = this;
      case1a = any(this.lesser, function(lb) {
        return lb.confused();
      });
      case1b = any(this.greater, function(gb) {
        return gb.confused();
      });
      case2 = any(this.lesser, function(lb) {
        return any(_this.greater, function(gb) {
          return lb.standsAgainst(gb);
        });
      });
      return !!(case1a || case1b || case2);
    };

    return FlockingBird;

  })();

  describe("Lazy Mayzie", function() {
    var Mayzie;
    Mayzie = new FlockingBird();
    return it("should not be confused", function() {
      return expect(Mayzie.confused()).toEqual(false);
    });
  });

  Mayzie = new FlockingBird();

  OneRight = new FlockingBird([], [Mayzie]);

  describe("a flock with two birds", function() {
    it("should not contain confused birds", function() {
      expect(Mayzie.confused()).toEqual(false);
      return expect(OneRight.confused()).toEqual(false);
    });
    return it("should have a linear pecking order", function() {
      expect(OneRight.standsAgainst(Mayzie)).toEqual(true);
      return expect(Mayzie.standsAgainst(OneRight)).toEqual(false);
    });
  });

  TwoRight = new FlockingBird([], [OneRight]);

  describe("a flock with three birds", function() {
    it("should not contain confused birds", function() {
      expect(Mayzie.confused()).toEqual(false);
      expect(OneRight.confused()).toEqual(false);
      return expect(TwoRight.confused()).toEqual(false);
    });
    return it("should have a linear pecking order", function() {
      expect(Mayzie.standsAgainst(OneRight)).toEqual(false);
      expect(Mayzie.standsAgainst(TwoRight)).toEqual(false);
      expect(OneRight.standsAgainst(Mayzie)).toEqual(true);
      expect(OneRight.standsAgainst(TwoRight)).toEqual(false);
      expect(TwoRight.standsAgainst(Mayzie)).toEqual(true);
      return expect(TwoRight.standsAgainst(TwoRight)).toEqual(true);
    });
  });

  FlockingBird.prototype.isOfEqualRankTo = function(otherBird) {
    var case1, case2, case3;
    case1 = this.standsAgainst(otherBird);
    case2 = otherBird.standsAgainst(this);
    case3 = !this.confused() && !otherBird.confused();
    return case1 && case2 && case3;
  };

  describe("equality", function() {
    it("should be true for Mayzie vs Mayzie", function() {
      return expect(Mayzie.isOfEqualRankTo(Mayzie)).toEqual(true);
    });
    it("should be true for OneRight vs OneRight", function() {
      return expect(OneRight.isOfEqualRankTo(OneRight)).toEqual(true);
    });
    return it("should be false for Mayzie vs OneRight", function() {
      expect(Mayzie.isOfEqualRankTo(OneRight)).toEqual(false);
      return expect(OneRight.isOfEqualRankTo(Mayzie)).toEqual(false);
    });
  });

  FlockingBird.prototype.outranks = function(otherBird) {
    var case1, case2;
    case1 = this.standsAgainst(otherBird);
    case2 = !this.isOfEqualRankTo(otherBird);
    return case1 && case2;
  };

  describe("outranking", function() {
    it("should work for Mayzie vs. Mayzie", function() {
      return expect(Mayzie.outranks(Mayzie)).toEqual(false);
    });
    it("should work for Mayzie vs. OneRight", function() {
      expect(Mayzie.outranks(OneRight)).toEqual(false);
      return expect(OneRight.outranks(Mayzie)).toEqual(true);
    });
    return it("should work for Mayzie vs. TwoRight", function() {
      expect(Mayzie.outranks(TwoRight)).toEqual(false);
      return expect(TwoRight.outranks(Mayzie)).toEqual(true);
    });
  });

}).call(this);