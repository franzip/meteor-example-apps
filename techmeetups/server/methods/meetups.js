Meteor.methods({
  'addMeetup': function (params) {
    Meetups.insert(params);
  },
  'updateMeetup': function(id, params) {
    Meetups.update({
        _id: id
    }, { $set: params });
  },
  'removeMeetup': function(id) {
    Meetups.remove(id);
  }
});

