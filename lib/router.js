Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
});

Router.route('/', {
    name: 'gameList',
    waitOn: function() {
        return Meteor.subscribe('games');
    }
    // data: function() { return Posts.findOne(this.params._id); }
});
