Template.add_product.events({
    'submit': function (event) {
        event.preventDefault();

        var name        = event.target.name.value,
            category    = event.target.category.value,
            description = event.target.description.value,
            is_featured = event.target.is_featured.value,
            image       = $('#productImage').get(0).files[0];

        Meteor.call('addProduct', image, name, category, description, is_featured);

        event.target.name.value = '',
        event.target.category.value = '',
        event.target.description.value = '',
        event.target.is_featured.value = '';

        FlashMessages.sendSuccess("Product Added");
        Router.go('/');

        return false;
    }
});
