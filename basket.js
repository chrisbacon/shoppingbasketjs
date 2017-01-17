var basket = {
    items: [],
    size: function() {
        return this.items.length;
    },
    add: function(item) {
        this.items.push(item);
    },
    remove: function() {
        return this.items.pop();
    }
}

module.exports = basket;