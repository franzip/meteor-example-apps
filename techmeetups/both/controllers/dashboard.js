DashboardController = AppController.extend({
    waitOn: function() {
        return this.subscribe('mymeetups');
    }
});

DashboardController.helpers({
    'mymeetups': function() {
        return Meetups.find({user: Meteor.userId()});
    }
});

DashboardController.events({
    'submit .update-meetup-form': function(event) {
        var title      = event.target.title.value,
            email      = event.target.email.value,
            topics     = event.target.topics.value,
            type       = event.target.type.value,
            address    = event.target.address.value,
            city       = event.target.city.value,
            state      = event.target.state.value,
            zipcode    = event.target.zipcode.value,
            meetupdate = event.target.meetupdate.value,
            id         = event.target.id.value;

        var params = {
            title: title,
            email: email,
            topics: topics,
            type: type,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            meetupdate: meetupdate,
            updatedAt: new Date()
        }

        Meteor.call('updateMeetup', id, params);

        toastr.success('Meetup Edited');

        Router.go('/dashboard');

        return false;
    },
    'click .remove-meetup': function(event) {
        if (confirm("Are you sure?")) {
            Meteor.call("removeMeetup", event.currentTarget.id);
            toastr.success("Meetup Removed");
            return false;
        }
        return false;
    }
});
