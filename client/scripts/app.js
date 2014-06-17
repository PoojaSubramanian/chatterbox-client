$(document).ready(function() {
  var roomName;
  var friends={};
  var app={
    server: 'https://api.parse.com/1/classes/chatterbox/',
    init: function() {
      //Load page and refresh
      app.fetch(roomName);
      setInterval(function() {
        console.log('test');
        app.fetch(roomName);
      }, 1000);


    },

    render: function(data){
      $('.post').remove();
      //limiting to 30 messages instead of full data['results'].length
      for (var i=0; i<data.results.length; i++) {
        var msg=data.results[i];
        //concat all parts of the chat message and put in our format ('username'-['roomname']-'date-time'-'message')
        var post=msg.username+' ['+msg.roomname+'] '+moment(msg.createdAt).format('lll')+': '+msg.text;
        if (msg.username===undefined) {
          var nameClass='anonymous';
        } else {
          var nameClass=msg.username.split(" ").join();
        }
        var el = $('<div class="post '+nameClass+'">');
        el.text(post);
        $('.messages').append(el);
      }
    },

    send: function(message) {
      $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          console.error('chatterbox: Failed to send message');
        }
      });
    },
    fetch: function(room) {
      if (room===undefined) {
        var dataFilter={
          order: '-createdAt'
        };
      } else {
        var dataFilter={
          order: '-createdAt',
          where: '{"roomname": "'+room+'"}'
        };
      }

      $.ajax({
        url:  'https://api.parse.com/1/classes/chatterbox',
        type: 'GET',
        data: dataFilter,
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message received');
          app.render(data);
          app.highlightFriends();
        },
        error: function (data) {
          console.error('chatterbox: Failed to get message');
        }
      });
    },
    highlightFriends: function() {
      for (var friend in friends) {
        $('.'+friend).css('font-weight','bold');
      }
    }

  };

  app.init();

  /*
  //load initial messages
  app.fetch();

  //create an event listener for the 'refresh messages' button
  $('#refreshButton').on('click', function() {
    app.fetch(roomName);
    setTimeout(function() {
      highlightFriends();
    }, 200);
  });

  //allow user to send message
  //create a message object with 'window.location.search' as username
  //also pass in text from text box and room name
  $('#sendButton').on('click', function() {
    var message={};
    message.username=window.location.search.slice(10);
    message.text=$('#messageInput').val();
    message.roomname=roomName;
    app.send(message);
    setTimeout(function() {
      app.fetch(roomName);
    }, 200);
    setTimeout(function() {
      highlightFriends();
    }, 400);
  });

  //switches to roomname selected by user
  $('#roomButton').on('click', function() {
    roomName=$('#roomInput').val();
    app.fetch(roomName);
    setTimeout(function() {
      highlightFriends();
    }, 200);  });

  //adds friend to friend list
  $('.messages').on('click', 'div', function() {
    if(confirm('Add '+this.classList[1]+' to your friend list?') && !(this.id in friends)) {
      friends[this.classList[1]]=1;
    }
    highlightFriends();
  });

  //bolds all friend posts
  var highlightFriends=function() {
    for (var friend in friends) {
      $('.'+friend).css('font-weight','bold');
    }
  };
  */

});



