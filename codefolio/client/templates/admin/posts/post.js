Template.add_post.events({
    'submit .add_post_form': function () {
        var title = event.target.title.value,
            body  = event.target.body.value;

        Posts.insert({
            title: title,
            body: body
        });

        FlashMessages.sendSuccess('Post Added');
        Router.go('/admin/posts');

        return false;
    }
});

Template.edit_post.events({
    'submit .edit_post_form': function (event) {
        var title = event.target.title.value,
            body  = event.target.body.value;

        Posts.update({
            _id: this._id
        }, {
            $set: {
                title: title,
                body: body
            }
        });

        FlashMessages.sendSuccess('Post Added');
        Router.go('/admin/posts');

        return false;
    }
});

Template.list_posts.events({
    'click .delete_post': function (event) {
        if (confirm("Are you sure?")) {
            Posts.remove(this._id);
            FlashMessages.sendSuccess('Post Deleted');
        }
        return false;
    }
});
