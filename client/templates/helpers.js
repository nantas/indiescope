Errors = new Mongo.Collection(null);

throwError = function(message) {
    Errors.insert({message: message});
};


Template.header.helpers({
    activeRouteClass: function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();//get rid of spacebars hash
        var active = _.any(args, function(name) {
            return Router.current() && Router.current().route.getName() === name;
        });
        return active && 'active';
    }
});

Template.gamePage.helpers({
    remark: function() {
        if (this.remark) return this.remark;
        else return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut ligula dui. Maecenas in sapien cursus, condimentum nulla vitae, pellentesque metus. Sed accumsan tellus et molestie volutpat. Maecenas feugiat, mi.";
    },
    desc: function() {
        if (this.desc) return this.desc;
        else return "Bounty tack Gold Road cutlass topsail parley parrel hardtack flogging topmast. Wench gally haul wind main sheet barkadeer lateen sail brigantine killick league lass. Aft Nelsons folly to go on account belaying pin brigantine topsail hands lad marooned doubloon. ";
    },
    editUrl: function() {
        return '/game/' + this.permalink + '/edit';
    },
    screenshotUrls: function() {
        return _.compact(this.screenshots);
    },
    iconUrl: function() {
        if (this.iconUrl) {
            return this.iconUrl;
        } else {
            return "http://placehold.it/80";
        }
    }    
});

Template.gameEntry.helpers({
    linkUrl: function() {
        return '/game/' + this.permalink;
    },
    iconUrl: function() {
        if (this.iconUrl) {
            return this.iconUrl;
        } else {
            return "http://placehold.it/80";
        }
    }
});

Template.errors.helpers({
    errors: function() {
        return Errors.find();
    }
});
