Template.gameSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var game = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      headline: $(e.target).find('[name=headline]').val()
    };

    var errors = validatePost(game);
    if (errors.title || errors.url)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('gameInsert', game, function(error, result) {
      if (error)
        return throwError(error.reason);

      if (result.gameExists)
        return throwError('This link has already been posted');

      Router.go('gameList');
    });
  }
});

Template.gameSubmit.created = function() {
  Session.set('postSubmitErrors', {});
};

Template.gameSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});
