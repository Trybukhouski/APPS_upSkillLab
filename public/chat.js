$(function () {
  let socket = io.connect("http://localhost:3000");
  let message = $("#message");
  let username = $("#username");
  let send_message = $("#send_message");
  let send_username = $("#send_username");
  let chatroom = $("#chatroom");
  let feedback = $("#feedback");

  //Send Message

  send_message.click(() => {
    socket.emit("new_message", {
      message: message.val(),
      className: alertClass
    });
  });

  // Add random classes
  let min = 1;
  let max = 6;
  let random = Math.floor(Math.random() * (max - min)) + min;

  let alertClass;
  switch (random) {
    case 1:
      alertClass = "secondary";
      break;
    case 2:
      alertClass = "danger";
      break;
    case 3:
      alertClass = "success";
      break;
    case 4:
      alertClass = "warning";
      break;
    case 5:
      alertClass = "info";
      break;
    case 6:
      alertClass = "light";
      break;
  }

  //Chat Section

  socket.on("add_mess", data => {
    feedback.html("");
    message.val("");
    chatroom.append(
      "<div class='alert alert-" +
      data.className +
      "'<b>" +
      data.username +
      "</b>: " +
      data.message +
      "</div>"
    );
  });

  //Change Username Section

  send_username.click(() => {
    socket.emit("change_username", { username: username.val() });
  });

  //Other

  message.bind("keypress", () => {
    socket.emit("typing");
  });

  socket.on("typing", data => {
    feedback.html(
      "<p><i>" + data.username + " writing..." + "</i></p>"
    );
  });
});
