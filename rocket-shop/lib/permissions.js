isAdmin = function() {
    var currentUser = Meteor.user();
    return (currentUser && Roles.userIsInRole(currentUser, ['admin'])) ? true : false;
}