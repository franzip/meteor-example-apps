Template.add_department.events({
    'submit .add-department-form': function (event) {
        var name = event.target.name.value,
            head = event.target.head.value;

        Departments.insert({
            name: name,
            head: head,
            createdAt: new Date()
        });

        FlashMessages.sendSuccess('Department Added');

        Router.go('/staff/departments');

        return false;
    }
});

