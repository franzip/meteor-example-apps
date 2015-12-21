Meteor.publish('products', function () {
    return Products.find();
});

Meteor.publish('categories', function () {
    return Categories.find();
});
