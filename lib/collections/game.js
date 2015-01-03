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
      url: String,
      headline: String
    });

    var link = makeUrl(gameAttributes.title);

    var errors = validatePost(gameAttributes);
    if (errors.title || errors.url)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

    var gameWithSameLinkOrTitle = Games.findOne({
      $or: [{
        url: gameAttributes.url
      }, {
        permalink: link
      }]
    });
    if (gameWithSameLinkOrTitle) {
      return {
        gameExists: true,
        _id: gameWithSameLinkOrTitle._id
      };
    }

    var user = Meteor.user();
    var game = _.extend(gameAttributes, {
      userId: user._id,
      author: user.username,
      permalink: link,
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });
    var gameId = Games.insert(game);
    return {
      _id: gameId
    };
  },
  gameUpdate: function(currentPostId, gameAttributes) {
    check(currentPostId, String);
    check(Meteor.userId(), String);
    check(gameAttributes, {
      title: String,
      url: String,
      headline: String,
      desc: String,
      remark: String,
      iconUrl: String,
      screenshots: Array
    });

    var link = makeUrl(gameAttributes.title);

    var errors = validatePost(gameAttributes);
    if (errors.title || errors.url)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

      var gameWithSameLinkOrTitle = Games.findOne({
          $or: [{
              url: gameAttributes.url
          }, {
              permalink: link
          }],
          _id: {$ne: currentPostId}
      });
      if (gameWithSameLinkOrTitle) {
          throw new Meteor.Error('duplicated title or url', "You can't have two games with the same URL or permalink");
      }

    var postToSet = _.extend(gameAttributes, {
      submitted: new Date()
    });
    Games.update(currentPostId, {
      $set: postToSet
    }, function(error) {
      if (error) {
        throw error;
      } else {
        return "success";
      }
    });
  },
  gameDelete: function(currentPostId) {
    check(currentPostId, String);
    check(Meteor.userId(), String);
    Games.remove(currentPostId, function(error) {
      if (error) {
        throw error;
      } else {
        return "success";
      }
    });
  }
});
