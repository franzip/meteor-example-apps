Template.registerHelper('isStaff', function() {
    if (Meteor.user().profile.usertype === 'staff') {
        return true;
    }
})

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});

Template.registerHelper('capFirst', function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
});
