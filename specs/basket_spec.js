var basketOriginal = require('../basket');
var assert = require('assert');

describe("Shopping Basket", function() {
    var basket;

    beforeEach(function() {
        basket = Object.create(basketOriginal);
        basket.items = [];
    });

    it("should start off empty", function() {
        assert.equal(0, basket.size());
    });
    it("should be able to be added to", function() {
        basket.add("Fruit");
        assert.equal(1, basket.size());
    });
    it("should be able to have items removed from it", function() {
        basket.add("Fruit");
        var item = basket.remove();
        assert.equal("Fruit", item);
        assert.equal(0, basket.size());
    });
})