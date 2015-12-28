Template.image.helpers({
    'isOwn': function (imageId) {
        var owner = ImageInfo.findOne({imageId: imageId}).userId;
        return owner == Meteor.userId();
    }
});

Template.image.events({
    'click .remove-image': function (event) {
        if (confirm("Are you sure you want to delete the image?")) {
            Meteor.call('deleteImage', this._id);
            FlashMessages.sendSuccess("Image removed");
        }

        return false;
    }
});
