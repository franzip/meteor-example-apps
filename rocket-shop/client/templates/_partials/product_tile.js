Template.productTile.events({
    "click .add-to-cart" : function(event){
        event.preventDefault();
        addToCart(this.sku, function(err, res){
            if(err) {
                console.log(err);
            } else {
                Router.go("cartShow");
            }
        });
    }
});