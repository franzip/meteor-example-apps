Template.productsShow.events({
   'click #add-to-cart': function(event) {
       event.preventDefault();
       addToCart(this.sku, function(err, res) {
           Router.go('/cart');
       })
   }
});