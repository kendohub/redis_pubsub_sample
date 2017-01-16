import {Socket} from "phoenix"

var socket = new Socket("/socket");
socket.connect();
var channel = socket.channel("room:lobby", {});
channel.join();

$("form").submit(function(e) {
    send_message(e, $("#input-send-message").val())
});

channel.on("receive_message", function(dt) {
    prepend_message(dt.message);
});

function send_message(e, message) {
    e.preventDefault();
    channel.push("send_message", {message: message});
    $("#input-send-message").val("");
}

function prepend_message(message) {
    var div = $("<div></div>", {"class": "received-message"})
        .text(message);
    $("#received-messages").prepend(div);
}

// ****
// @see https://developer.mozilla.org/ja/docs/WebAPI/Using_geolocation
var watchID;
// ****
$("#start").on("click", function(e) {
  watchID = geoStart();
});

$("#stop").on("click", function(e) {
  watchID = geoStop();
});

function geoStart() {
  if (!navigator.geolocation){
    return null;
  }

  return navigator.geolocation.watchPosition(function(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    channel.push("send_message", {message: latitude + "," + longitude});
    //prepend_message(latitude + "," + longitude);
  }, function() {
    prepend_message("error");
  });
};

function geoStop() {
  navigator.geolocation.clearWatch(watchID);
  return null;
}

/*
function geoFindMe(e) {
  if (!navigator.geolocation){
    send_message(e, $("#input-send-message").val());
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    send_message(e, latitude + "," + longitude);
  };

  function error() {
    console.log("Unable to retrieve your location");
  };

  navigator.geolocation.getCurrentPosition(success, error);
};
*/
