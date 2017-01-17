var assert = require('assert');
var checkoutOriginal = require('../checkout');
var basketOriginal = require('../basket');

describe('checkout', function() {
    var checkout;
    var basket;

    beforeEach(function(){
        checkout = Object.create(checkoutOriginal);
        basket = Object.create(basketOriginal);
        basket.items = [];
    })
    it('should be able to calculate the initial subTotal price', function() {
        basket.add({
            name: "Apple",
            price: 0.30
        });
        basket.add({
            name: "Pear",
            price: 0.50
        });

        checkout.calculateSubTotal(basket);

        assert.equal(0.80, checkout.subTotal);
    });
    it('should take 10% off if the price is over £20', function() {
        basket.add({
            name: "Apple",
            price: 10.00
        });
        basket.add({
            name: "Pear",
            price: 15.00
        });

        assert.equal(22.50, checkout.getTotal(basket));
    });
    it('should handle loyalty cards and discount 5%', function() {
        checkout.loyalty = true;
        basket.add({
            name: "Apple",
            price: 0.30
        });
        basket.add({
            name: "Pear",
            price: 0.50
        });

        assert.equal(0.76, checkout.getTotal(basket));
    });
    it('should be able to account for BoGoF', function() {
        basket.add({
            name: "Apple",
            price: 0.30
        });
        basket.add({
            name: "Apple",
            price: 0.30
        });

        assert.equal(0.30, checkout.getTotal(basket));
    })
})