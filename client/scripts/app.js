var app={
  server: 'https://api.parse.com/1/classes/chatterbox/',
  init: function() {

  },
  send: function(message) {
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  fetch: function() {
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox/',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message received');
        for (var i=0; i<data['results'].length; i++) {
          var msg=data['results'][i];
          var post=msg.username+"\n"+msg.createdAt+": "+msg.text;
          post=app.escape(post);
          post='<li>'+post+'</li>';
          $('.messages').append(post);
        }

      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message');
      }
    });

  },

  escape: function(input) {
    var tagsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '',
      "'": '',
      '`': '',
      '@': '',
      '$': '',
      '%': '',
      '(': '',
      ')': '',
      '=': '',
      '+': '',
      '{': '',
      '}': '',
      '[': '',
      ']': '',
      '\\': ''
    };

    var replaceTag = function(tag) {
      return tagsToReplace[tag] || tag;
    };

    var safeTagsReplace = function(str) {
      return str.replace(/[&<>\"\'`@$%()=+{}\[\]\\]/g, replaceTag);
    };

    return safeTagsReplace(input);

  }

};



