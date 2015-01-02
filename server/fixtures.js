if (Games.find().count() === 0) {
    var now = new Date().getTime();

    var nantasId = Meteor.users.insert({
        username: "nantas",
        emails: [ {address: "nantas@gmail.com"} ],
        profile: { name: 'Nan Wang' }
    });
    var nantas = Meteor.users.findOne(nantasId);

    for (var i = 0; i < 20; i++) {
        var gTitle = "Test Game #" + i;
        Games.insert({
            title: 'Test Game #' + i,
            author: nantas.profile.name,
            userId: nantas._id,
            url: 'http://google.com/?q=test-' + i,
            permalink: makeUrl(gTitle),
            headline: "This is a very cool game!",
            submitted: new Date(now - i * 3600 * 1000),
            commentsCount: 0,
            upvoters: [],
            votes: 0
        });
    }
}
