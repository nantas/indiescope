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
        return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut ligula dui. Maecenas in sapien cursus, condimentum nulla vitae, pellentesque metus. Sed accumsan tellus et molestie volutpat. Maecenas feugiat, mi.";
    },
    desc: function() {
        return "Bounty tack Gold Road cutlass topsail parley parrel hardtack flogging topmast. Wench gally haul wind main sheet barkadeer lateen sail brigantine killick league lass. Aft Nelsons folly to go on account belaying pin brigantine topsail hands lad marooned doubloon. ";
    }
});

Template.gameEntry.helpers({
    linkUrl: function() {
        return '/game/' + this.permalink;
    }
});
