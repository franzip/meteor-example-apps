Meteor.startup(function() {
    if (Meteor.users.find().count() === 0) {
        Accounts.createUser({
            username: 'admin',
            email: 'admin@example.com',
            password: 'password'
        });
    }
});
