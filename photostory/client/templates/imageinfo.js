Template.imageInfo.helpers({
    getTitle: function(imageId) {
        return ImageInfo.findOne({imageId: imageId}).title;
    },
    getStory: function(imageId) {
        return ImageInfo.findOne({imageId: imageId}).story;
    },
    getUsername: function(imageId) {
        return ImageInfo.findOne({imageId: imageId}).username;
    }
});
