Meteor.publish('meetups', function () {
    return Meetups.find();
});

Meteor.publish('mymeetups', function () {
    return Meetups.find({user: this.userId});
});
