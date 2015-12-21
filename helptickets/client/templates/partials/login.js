Template.login.helpers({
    userEmail: function () {
        return Meteor.user().emails[0].address;
    }
});

Template.login.events({
    'click .register-link': function (event) {
        $('.panel-login').hide();
        $('.panel-register').fadeIn();
    },
    'click .login-link': function (event) {
        $('.panel-register').hide();
        $('.panel-login').fadeIn();
    },
    'submit .register-form': function(event) {
        var email     = event.target.email.value,
            password  = event.target.password.value,
            password2 = event.target.password2.value;

        if (isNotEmpty(email) &&
            isNotEmpty(password) &&
            isEmail(email) &&
            areValidPasswords(password, password2)) {

            Accounts.createUser({
                email: email,
                password: password,
                profile: {
                    usertype: 'customer'
                }
            }, function(err) {
                if (err) {
                    FlashMessages.sendError('There was an error with the registration');
                } else {
                    FlashMessages.sendSuccess("Account created! You are now logged in");
                    Router.go('/');
                }
            });
        }

        return false;
    },

    'submit .login-form': function(event) {
        var email = event.target.email.value,
            password = event.target.password.value;

        Meteor.loginWithPassword(email, password, function(err) {
            if (err) {
                event.target.email.value = email;
                event.target.password.value = password;
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess("You're now logged in");
                Router.go("/");
            };
        });

        event.target.email.value = "";
        event.target.password.value = "";

        return false;
    },

    'submit .logout-form': function(event) {
        Meteor.logout(function(err) {
            if (err) {
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess("You are now logged out.");
                Router.go("/");
            }
        })
    }
});

var trimInput = function(val) {
    return val.replace(/^\s*|\s*$/g, "");
}

var isNotEmpty = function(val) {
    if (val && val !== '') {
        return true;
    }
    FlashMessages.sendError("Please fill in all the fields");
    return false;
}

var isEmail = function(value) {
    var filter = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
    if (filter.test(value)) {
        return true;
    }
    FlashMessages.sendError("Please use a valid email address");
    return false;
}

var isValidPassword = function(password) {
    if (password.length < 6) {
        FlashMessages.sendError("Password must be at least 6 characters");
        return false;
    }
    return true;
}

var areValidPasswords = function(password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }

    if (password !== confirm) {
        FlashMessages.sendError("Passwords do not match");
        return false;
    }
    return true;
}
