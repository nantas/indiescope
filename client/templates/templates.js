Template.gameList.helpers({
    // postsWithRank: function() {
    //     return this.posts.map(function(post, index, cursor) {
    //         post._rank = index;
    //         return post;
    //     });
    // }
    games: function () {
        return Games.find({}, {sort: {submitted: -1}});
    }
});
