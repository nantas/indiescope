Template.gameEdit.events ({
    'submit form': function(e) {
        e.preventDefault();

        var currentPostId = this._id;

        var gameAttributes = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            headline: $(e.target).find('[name=headline]').val(),
            desc: $(e.target).find('[name=desc]').val(),
            remark: $(e.target).find('[name=remark]').val(),
            iconUrl: $(e.target).find('[name=iconUrl]').val(),
            screenshots: (function() {
                var resultArray = [];
                for (var i = 0; i < 5; ++i) {
                    resultArray.push($(e.target).find('[name=screenshot'+(i + 1).toString() + ']').val());
                }
                return resultArray;
            })()
        };

        if (this.userId !== Meteor.userId() && Meteor.user().emails[0].address !== "nantas@qq.com") {
            throwError("You don't have permission to edit this post!");
            return;
        }

        var errors = validatePost(gameAttributes);
        if (errors.title || errors.url) {
            return Session.set('postEditErrors', errors);
        }

        Meteor.call("gameUpdate", currentPostId, gameAttributes, function(error, result) {
            if (error) {
                throwError(error.reason);
            } else {
                Router.go("gamePage", { link: getLinkFromId(currentPostId) });
            }
        });

        // Posts.update(currentPostId, {$set: postProperties}, function(error) {
        //     if (error) {
        //         alert(error.reason);
        //     } else {
        //         Router.go('postPage', { _id: currentPostId });
        //     }
        // });
    },

    'click .delete': function(e) {
        e.preventDefault();

        if (this.userId !== Meteor.userId() && Meteor.user().emails[0].address !== "nantas@qq.com") {
            alert("You don't have permission to delete this post!");
            return;
        }

        if (confirm("Delete this post?")) {
            var currentPostId = this._id;
            Meteor.call("gameDelete", currentPostId, function(error, result) {
                if (error) {
                    alert(error.reason);
                } else {
                    Router.go('gameList');
                }
            });
        }
    }
});

Template.gameEdit.created = function () {
    Session.set('postEditErrors', {});
};

Template.gameEdit.helpers({
    errorMessage: function(field) {
        return Session.get('postEditErrors')[field];
    },
    errorClass: function(field) {
        return Session.get('postEditErrors')[field] ? 'has-error' : '';
    },
    screenshotUrl: function(index) {
        if (this.screenshots) {
            if (this.screenshots[index])
                return this.screenshots[index];
            else {return "";}
        }
    }
});
