Template.mytickets.helpers({
    userEmail: function () {
        return Meteor.user().emails[0].address;
    }
});

Template.mytickets.events({
    'submit .open-ticket-form': function (event) {
        var name       = event.target.name.value;
            email      = event.target.email.value;
            subject    = event.target.subject.value;
            department = event.target.department.value;
            priority   = event.target.priority.value;
            message    = event.target.message.value;
            status     = 'new';

        Tickets.insert({
            name: name,
            email: email,
            subject: subject,
            department: department,
            priority: priority,
            status: status,
            message: message,
            customer: Meteor.userId(),
            createdAt: new Date()
        });

        $('#openTicketModal').modal('hide');

        Router.go('/');
        FlashMessages.sendSuccess("Ticket Submitted");

        return false;
    },

    'click .close-ticket': function (event) {
        if (confirm("Are you sure?")) {
            Tickets.remove(this._id);
            FlashMessages.sendSuccess("Ticket closed");
            return false;
        }
    }
});
