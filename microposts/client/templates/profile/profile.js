Template.profile.events({
    "submit .edit-profile": function(event) {
        event.preventDefault();
        var file = $('#profileImage').get(0).files[0];

        if (file) {
            var fsFile = new FS.File(file);

            ProfileImages.insert(fsFile, function(err, res) {
                if (err) {
                    throw new Meteor.Error(err);
                } else {

                    var imageLoc = '/cfs/files/ProfileImages/' + res._id;

                    UserImages.insert({
                        userId: Meteor.userId(),
                        username: Meteor.user.username,
                        image: imageLoc
                    });

                    Router.go('/');
                }
            });
        }
    }
});
