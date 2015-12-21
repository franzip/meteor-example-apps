Template.login.events({
    'submit .form-signin': function (event) {
        event.preventDefault();
        console.log(event);
        var email = event.target.email.value,
            pass  = event.target.password.value;

        Meteor.loginWithPassword(email, pass, function(err) {
            if (err) {
                event.target.email.value = email;
                event.target.password.value  = pass;
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess("You are now logged in");
                Router.go('dashboard');
            }
        });
    }
});
