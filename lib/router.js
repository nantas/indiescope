Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

Router.route('/', {
    name: 'gameList',
    waitOn: function() {
        return Meteor.subscribe('games');
    }
    // data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/game/:link', {
    name: 'gamePage',
    waitOn: function() {
        return Meteor.subscribe('singleGame', this.params.link);
    },
    data: function() {
        return Games.findOne({permalink: this.params.link });
    }

});

Router.route('/game/:link/edit', {
    name: 'gameEdit',
    waitOn: function() {
        return Meteor.subscribe('singleGame', this.params.link);
    },
    data: function() {
        return Games.findOne({permalink: this.params.link });
    }
});

Router.route('/submit', { name: 'gameSubmit'});

var requireLogin= function () {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

makeUrl = function(str) {
    return str.replace(/[^a-z0-9]/gi, '-').replace(/\-+/gi, '-').toLowerCase();
};

getLinkFromId = function(id) {
    return Games.findOne({_id: id}).permalink;
};

// Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'gameSubmit'});
