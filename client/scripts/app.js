$(document).ready(function() {

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
          console.log(data);
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
        //url: 'https://api.parse.com/1/classes/chatterbox/',
        url:  'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
        type: 'GET',
        contentType: 'application/json',
        // data: 'data:-createdAt',
        success: function (data) {
          console.log('chatterbox: Message received');
          $('li').remove();
          //limiting to 30 messages instead of full data['results'].length
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
        '&': 'NO!',
        '<': 'NO!',
        '>': 'NO!',
        '"': 'NO!',
        "'": 'NO!',
        '`': 'NO!',
        '@': 'NO!',
        '$': 'NO!',
        '%': 'NO!',
        '(': 'NO!',
        ')': 'NO!',
        '=': 'NO!',
        '+': 'NO!',
        '{': 'NO!',
        '}': 'NO!',
        '[': 'NO!',
        ']': 'NO!',
        '\\': 'NO!'
      };

      var replaceTag = function(tag) {
        return tagsToReplace[tag] || tag;
      };

      var safeTagsReplace = function(str) {
        return str.replace(/[&<>\"\'\`\@\$\%\(\)\=\+\{\}\[\]\\]/g, replaceTag);
      };

      return safeTagsReplace(input);
    }
  };

  //load message
  app.fetch();

  //create an event listener for the 'refresh messages' button
  $('#refreshButton').on('click', function() {
    app.fetch();
  });

  //allow user to send message
  //create a message object with 'window.location.search' as username
  //also pass in text from text box and room name
  $('#sendButton').on('click', function() {
    var message={};
    message.username=window.location.search.slice(10);
    message.text=$('#messageInput').val();
    message.roomname=undefined;
    app.send(message);
    setTimeout(function() {
      app.fetch();
    }, 500);
  });

  console.log(app.escape('<<this is a && test>> @#%&#$&*$%^*'))

});



