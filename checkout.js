var checkout = {
    subTotal: 0,
    loyalty: false,

    calculateSubTotal: function(basket) {
        var subTotal = 0;
        for (var item of basket.items) {
            subTotal += item.price;
        }
        this.subTotal = subTotal;
    },

    discounts: [
    function(checkout, basket) {
        if (checkout.subTotal>20.00) {
            checkout.subTotal *= 0.9;
        }
    }, 
    function(checkout, basket) {
        if (checkout.loyalty) {
            checkout.subTotal *= 0.95;
        }
    },
    function(checkout, basket) {
        var discount = 0;
        var counts = {};
        for (var item of basket.items) {
            if (counts[item.name]) {
                counts[item.name] += 1
                if(counts[item.name] % 2 == 0) {
                    discount += item.price;
                }
            } else {
                counts[item.name] = 1;
            }
        }
        checkout.subTotal -= discount;
    }],

    getTotal: function(basket) {
        this.calculateSubTotal(basket);
        for (var discount of this.discounts) {
            discount(this, basket);
        }
        return this.subTotal;
    }

}

module.exports = checkout;