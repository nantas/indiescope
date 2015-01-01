Games = new Mongo.Collection('games');

validatePost = function(post) {
    var errors = {};
    if (!post.title)
    errors.title = "Please fill in a game title";
    if (!post.url)
    errors.url = "Please fill in a URL";
    return errors;
};

Meteor.methods({
    gameInsert: function(gameAttributes) {
        check(Meteor.userId(), String);
        check(gameAttributes, {
            title: String,
            url: String
        });

        var errors = validatePost(gameAttributes);
        if (errors.title || errors.url)
            throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

        var postWithSameLinkOrTitle = Games.findOne({ $or: [ {url: gameAttributes.url},
            {title: gameAttributes.title} ]});
        if (postWithSameLinkOrTitle) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            };
        }
    }
});
