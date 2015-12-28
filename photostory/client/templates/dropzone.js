Template.dropzone.events({
    'dropped #dropzone': function (event) {
        FS.Utility.eachFile(event, function(file) {
            var imgFile = new FS.File(file);
            Images.insert(imgFile, function(err, res) {
                if (err) {
                    FlashMessages.sendError("There was a problem with the upload");
                } else {
                    Session.set('imageId', res._id);
                    FlashMessages.sendSuccess("File uploaded successfully");
                    Modal.show('addInfo');
                }
            });
      });
    }
});
