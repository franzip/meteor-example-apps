Router.configure({
    layoutTemplate: 'layout'
});

var onBeforeActions = {
    isStaff: function() {
        if (Meteor.user() && Meteor.user().profile.usertype === 'staff') {
                Router.go('/staff');
        } else {
            this.next();
        }
    }
}

Router.onBeforeAction(onBeforeActions.isStaff, {
    only: ['mytickets']
});

Router.map(function() {
    this.route('mytickets', {
        path: '/',
        template: 'mytickets',
        data: function() {
            templateData = {
                tickets: Tickets.find({
                    customer: Meteor.userId()
                }),
            };
            return templateData;
        }
    });

    this.route('ticket', {
        path: '/ticket/:_id',
        template: 'ticket',
        data: function() {
            var currentTicket = this.params._id;
            return Tickets.findOne({_id: currentTicket});
        }
    });

    this.route('staff', {
        path: '/staff',
        template: 'stafftickets',
        data: function() {
            templateData = {
                tickets: Tickets.find()
            }
            return templateData;
        }
    });

    this.route('departments', {
        path: '/staff/departments',
        template: 'departments',
        data: function() {
            templateData = {
                departments: Departments.find()
            }
            return templateData;
        }
    });

    this.route('add_department', {
        path: '/staff/departments/add',
        template: 'add_department'
    });
});
