Router.configure({
    layoutTemplate: 'form_layout'
});

Router.map(function() {
    this.route('login', {
        path: '/',
        template: 'login'
    });

    this.route('register');

    this.route('dashboard', {
        layoutTemplate: 'dashboard_layout',
        path: '/dashboard',
        template: 'dashboard',
        onBeforeAction: function() {
            if (Meteor.user() === null) {
                Router.go('/');
            }

            this.next();
        }
    });
});
