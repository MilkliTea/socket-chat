const socket = io.connect("http://localhost:5000");

const sender = document.getElementById("sender");
const message = document.getElementById("message");
const output = document.getElementById("output");
const submitBtn = document.getElementById("submitBtn");
const feedback = document.getElementById("feedback");

submitBtn.addEventListener("click", () => {
  if (sender.value === "") {
    alert("isim giriniz");
  } else if (message.value === "") {
    alert("mesaj yaziniz");
  } else {
    socket.emit("chat", {
      message: message.value,
      sender: sender.value,
    });
  }
});
socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.sender + ": </strong>" + data.message + "</p>";
  message.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("typing", sender.value);
});

socket.on("typing", (data) => {
  feedback.innerHTML = "<p>" + data + " yazıyor... </p>";
});
