Todos = new Mongo.Collection('todos');

if (Meteor.isClient) {
    Meteor.subscribe('todos');

    Template.main.helpers({
        todos: function() {
            return Todos.find({}, {sort: {createdAt: -1}});
        }
    });

    Template.main.events({
        "submit .new-todo": function(event) {
            event.preventDefault();
            var text = event.target.text.value;

            Meteor.call('addTodo', text);

            event.target.text.value = "";
        },
        "click .toggle-check": function(event) {
            Meteor.call('setChecked', this._id, !this.checked);
        },
        "click .delete-todo": function(event) {
            event.preventDefault();
            if (confirm('Are you Sure?')) {
                Meteor.call('deleteTodo', this._id);
            }
        }
    });

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_ONLY'
    });
}

if (Meteor.isServer) {
    Meteor.publish('todos', function() {
        if (!this.userId) {
            return Todos.find();
        } else {
            return Todos.find({userId: this.userId});
        }
    });
}

Meteor.methods({
    addTodo: function(text) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('Not Authorized');
        }

        Todos.insert({
            text: text,
            createdAt: new Date(),
            userId: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    deleteTodo: function(todoId) {
        var todo = Todos.findOne(todoId);
        if (todo.userId !== Meteor.userId()) {
           throw new Meteor.Error('Not Authorized');
        }
        Todos.remove(todoId);
    },
    setChecked: function(todoId, checked) {
        var todo = Todos.findOne(todoId);
        if (todo.userId !== Meteor.userId()) {
           throw new Meteor.Error('Not Authorized');
        }
        Todos.update(todoId, {$set: {checked: checked }});
    }
});
