Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    // Posts route
    this.route('posts', {
        path: '/',
        template: 'posts'
    });

    // About Route
    this.route('about');

    this.route('profile');
});
