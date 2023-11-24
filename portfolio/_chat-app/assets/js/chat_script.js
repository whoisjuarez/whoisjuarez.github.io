const myMessages = document.querySelector("#messages");

let lastMsgId = 0;

let audio = new Audio("assets/sounds/horn-toy-clown.mp3");

/**
 * Load ALL messages
 */
function loadMessages() {
  fetch("views/chat_views.php?loadAll")
    .then((result) => result.json())
    .then((data) => {
      console.log(data);

      myMessages.innerHTML = "";

      data.forEach((element) => {
        let who = (element.uid !== window.myUserId) ? 'they' : 'me';
        let msgBox = `
                <span class="msg ${who}" data-id="${element.id}">
                  ${element.message}
                  <i>${element.uname}</i>
                </span>
            `;
        myMessages.innerHTML += msgBox;
      });

      lastMsgId = data[data.length - 1].id;

      // Scroll to the bottom
      window.scrollTo(0, document.body.scrollHeight);
    });
}
loadMessages();

/**
 * Sending A message
 */
const chatForm = document.querySelector("#msg-box");
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let chatFormData = new FormData(chatForm);

  fetch("views/chat_views.php?post", {
    body: chatFormData,
    method: "POST",
  }).then((res) => {
    refreshMessages();
  });

  chatForm.reset();
});

/**
 * Refreshing the messages
 */
function refreshMessages() {
  let refreshFormData = new FormData();
  refreshFormData.set("lastMsgId", lastMsgId);

  fetch("views/chat_views.php?refreshMessages", {
    body: refreshFormData,
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data.length !== 0) {
        data.forEach((element) => {
          let who = (element.uid !== window.myUserId) ? 'they' : 'me';
          
          if(who === 'they'){
            audio.play();
          }

          let msgBox = `
              <span class="msg ${who}" data-id="${element.id}">
              ${element.message}
                <i>${element.uname}</i>
              </span>
                
            `;
          myMessages.innerHTML += msgBox;
        });
        lastMsgId = data[data.length - 1].id;

        // Scroll to the bottom
         window.scrollTo(0, document.body.scrollHeight);
      }
    });
}

setInterval(refreshMessages, 500);
