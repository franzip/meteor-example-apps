Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('questions', {
        path: '/',
        template: 'questions'
    });
});
