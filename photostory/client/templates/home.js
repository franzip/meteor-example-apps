Meteor.subscribe('images');

Meteor.subscribe('imageinfo');

Template.home.helpers({
    images: function() {
        return Images.find({}, {sort: {uploadedAt: -1}});
    }
})
