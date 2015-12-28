Meteor.methods({
    addImageInfo: function(imageId, title, story) {
        if (!Meteor.userId()) {
            throw new Meteor.error('Not authorized');
        }

        ImageInfo.insert({
            title: title,
            story: story,
            imageId: imageId,
            imageUrl: '/cfs/files/Images/' + imageId,
            userId: Meteor.userId(),
            username: Meteor.user().profile.name,
            createdAt: new Date()
        });
    },

    deleteImage: function (imageId) {
        if (!Meteor.userId()) {
            throw new Meteor.error('Not authorized');
        }

        Images.remove(imageId);
        var imageInfoId = ImageInfo.findOne({imageId: imageId});
        ImageInfo.remove(imageInfoId);
    }
});
