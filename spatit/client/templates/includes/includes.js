Template.sidebar.helpers({
    'categories': function() {
        return Categories.find({}, {
            sort: {
                name: 1
            }
        });
    }
});
