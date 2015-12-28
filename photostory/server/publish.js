Meteor.publish('images', function () {
    return Images.find();
});

Meteor.publish('imageinfo', function () {
    return ImageInfo.find();
});
