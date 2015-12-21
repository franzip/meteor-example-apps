Meteor.startup(function() {
    if (Meteor.users.find().count() === 0) {
        var users = [
            {
                name: "Superuser",
                email: "admin@example.com",
                roles: ['admin']
            }
        ];

        _.each(users, function(user) {
            var id;

            id = Accounts.createUser({
                email: user.email,
                password: "password",
                profile: {
                    name: user.name
                }
            });

            if (user.roles.length > 0) {
                Roles.addUsersToRoles(id, user.roles);
            }
        });
    }
});

Accounts.onCreateUser(function(options, user) {

    Subscribers.insert({
        user_id: user._id,
        user_email: user.emails[0].address,
        plan_id: getDefaultPlan()._id,
        plan_name: getDefaultPlan().plan_name,
        plan_label: getDefaultPlan().plan_label,
        plan_days: getDefaultPlan().days,
        plan_description: getDefaultPlan().description,
        plan_price: getDefaultPlan().price,
        join_date: new Date()
    });

    if (options.profile) {
        user.profile = options.profile;
    }

    return user;
});

function getDefaultPlan() {
    return Plans.findOne({
        is_default: '1'
    });
}
