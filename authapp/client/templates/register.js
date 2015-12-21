Template.register.events({
    'submit .form-signup': function (event) {
        event.preventDefault();

        var email = trimInput(event.target.email.value),
            pass  = trimInput(event.target.password.value),
            passc = trimInput(event.target.password2.value),
            first = trimInput(event.target.first_name.value),
            last  = trimInput(event.target.last_name.value);

        if (isNotEmpty(email) &&
            isNotEmpty(pass) &&
            isNotEmpty(first) &&
            isEmail(email) &&
            areValidPasswords(pass, passc)) {
            Accounts.createUser({
                email: email,
                password: pass,
                profile: {
                    first_name: first,
                    last_name: last
                }
            }, function(err) {
                if (err) {
                    FlashMessages.sendError("There was an error creating the account.");
                } else {
                    FlashMessages.sendSuccess("Account created! You are now logged in!");
                    Router.go('/dashboard');
                }
            });
        }
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
