Template.myplans.helpers({
    plans: function () {
        return Subscribers.find({user_id: Meteor.userId()});
    }
});

Template.myplans.events({
    'click .cancel-plan': function (event) {
        if (confirm('Are you sure?')) {
            Subscribers.remove(this._id);
            toastr.success('Subscription Cancelled');
            return false;
        }
        return false;
    }
});
