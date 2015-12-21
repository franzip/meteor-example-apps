Meteor.methods({
    addProduct: function (image, name, category, description, is_featured) {
        if (image) {
            var fsFile = new FS.File(image);
            ProductsImages.insert(fsFile, function(err, result) {
                if (!err) {
                    var productImage = '/cfs/files/ProductsImages/' + result._id;
                    Products.insert({
                        name: name,
                        category: category,
                        description: description,
                        is_featured: is_featured,
                        image: productImage,
                        createdAt: new Date()
                    });
                }
            });
        } else {
            var productImage = '/img/no-image.png';

            Products.insert({
                name: name,
                category: category,
                description: description,
                is_featured: is_featured,
                image: productImage,
                createdAt: new Date()
            });
        }
    },

    addReview: function(id, rating, body) {

        Products.update({
            _id: id
        }, {
            $push: {
                reviews: {
                    rating: rating,
                    body: body,
                    review_date: new Date()
                }
            }
        });
    }
});
