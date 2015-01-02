Meteor.publish('games', function () {
    return Games.find();
});

Meteor.publish('singleGame', function(link) {
    check(link, String);
    return Games.find({permalink: link});
});
