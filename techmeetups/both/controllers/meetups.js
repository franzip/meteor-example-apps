MeetupsController = AppController.extend({
    waitOn: function() {
        return this.subscribe('meetups');
    },
    data: {
        meetups: Meetups.find({})
    },
    onAfterAction: function () {
        Meta.setTitle('Meetups');
    }
});

MeetupsController.events({
    'submit .add-meetup-form': function(event) {
        var title      = event.target.title.value,
            email      = event.target.email.value,
            topics     = event.target.topics.value,
            type       = event.target.type.value,
            address    = event.target.address.value,
            city       = event.target.city.value,
            state      = event.target.state.value,
            zipcode    = event.target.zipcode.value,
            meetupdate = event.target.meetupdate.value;

        var params = {
            title: title,
            email: email,
            topics: topics,
            type: type,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            user: Meteor.userId(),
            username: Meteor.user().username,
            meetupdate: meetupdate,
            createdAt: new Date()
        }

        Meteor.call('addMeetup', params);

        toastr.success('Meetup Added');

        Router.go('/meetups');

        return false;
    }
});
