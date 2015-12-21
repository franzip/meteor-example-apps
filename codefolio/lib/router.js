Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('home', {
        path: '/',
        template: 'home',
        data: function() {
            var currentProject = this.params._id;
            return Projects.findOne({_id: currentProject});
        }
    });

    this.route('about');
    this.route('work', {
        path: '/work',
        template: 'work',
        data: function() {
            var templateData = {
                projects: Projects.find()
            };
            return templateData;
        }
    });
    this.route('contact');

    this.route('blog', {
        path: '/blog',
        template: 'blog',
        data: function() {
            var templateData = {
                posts: Posts.find()
            };
            return templateData;
        }
    });

    this.route('blog_post', {
        path: '/blog/post/:_id',
        template: 'blog_post',
        data: function() {
            var currentPost = this.params._id;
            return Posts.findOne({_id: currentPost});
        }
    })

    this.route('list_posts', {
        path: '/admin/posts',
        template: 'list_posts',
        data: function() {
            var templateData = {
                posts: Posts.find()
            };
            return templateData;
        },
        onBeforeAction: function() {
            if (!Meteor.userId() || Meteor.userId() === null) {
                Router.go('/');
            }
            this.next();
        }
    });

    this.route('add_post', {
        path: '/admin/posts/add',
        template: 'add_post',
        onBeforeAction: function() {
            if (!Meteor.userId() || Meteor.userId() === null) {
                Router.go('/');
            }
            this.next();
        }
    });

    this.route('edit_post', {
        path: '/admin/posts/:_id/edit',
        template: 'edit_post',
        data: function() {
            var currentPost = this.params._id;
            return Posts.findOne({_id: currentPost});
        },
        onBeforeAction: function() {
            if (!Meteor.userId() || Meteor.userId() === null) {
                Router.go('/');
            }
            this.next();
        }
    });

    this.route('list_projects', {
        path: '/admin/projects',
        template: 'list_projects',
        data: function() {
            var templateData = {
                projects: Projects.find()
            };
            return templateData;
        },
        onBeforeAction: function() {
            if (!Meteor.userId() || Meteor.userId() === null) {
                Router.go('/');
            }
            this.next();
        }
    });

    this.route('add_project', {
        path: '/admin/projects/add',
        template: 'add_project',
        onBeforeAction: function() {
            if (!Meteor.userId() || Meteor.userId() === null) {
                Router.go('/');
            }
            this.next();
        }
    });

    this.route('edit_project', {
        path: '/admin/projects/:_id/edit',
        template: 'edit_project',
        data: function() {
            var currentProject = this.params._id;
            return Projects.findOne({_id: currentProject});
        },
        onBeforeAction: function() {
            if (!Meteor.userId() || Meteor.userId() === null) {
                Router.go('/');
            }
            this.next();
        }
    });

    this.route('project', {
        path: '/project/:_id',
        template: 'project',
        data: function() {
            var currentProject = this.params._id;
            return Projects.findOne({_id: currentProject});
        }
    })

    this.route('login', {
        path: '/admin',
        template: 'login'
    });
});
