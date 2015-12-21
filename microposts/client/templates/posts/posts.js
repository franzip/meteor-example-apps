Template.posts.helpers({
    posts: function() {
        return Posts.find({userId: Meteor.userId()}, { sort: {createdAt: -1}});
    }
});

Template.posts.events({
    'click .post-submit': function(event) {
        $('.post-close').trigger('click');
    }
})
