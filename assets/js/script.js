const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const inputInitHeight = chatInput.scrollHeight;
var ngrok_link = ""

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    if (message === "image"){
        chatLi.querySelector("p").innerHTML = "<div class='thinking-div'><img src='./typing.gif' class='thinking-image'></div>";    
    } else {
        chatLi.querySelector("p").textContent = message;        
    }

    return chatLi; // return chat <li> element
}

function callAPI(chatbox) {
    const outgoing_lst = chatbox.querySelectorAll(".outgoing");
    const last_user_msg = outgoing_lst[outgoing_lst.length-1].innerText;
    const url = ngrok_link.trim()+"/question";
    
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            question: last_user_msg,
        }),
    })
    .then(response => response.json())
    .then(result => {
        incoming_lst = chatbox.querySelectorAll(".chat.incoming");
        last_bot_message = incoming_lst[incoming_lst.length-1].querySelector('p');
        last_bot_message.innerText = result['answer']
    })
    .catch(error => {
         alert("A API de comunicação com a I.A. neste momento esta em manutenção.\nTente novamente em alguns minutos, ou melhor, agende pelo nosso whatsapp com nossa equipe, para simulações customizadas para sua empresa.\nTemos certeza você irá se impressionar!");
    });

}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("image", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        callAPI(chatbox);    
    }, 600);
}

  
chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => {document.body.classList.toggle("show-chatbot")});

getNgrokLink = () => {  
   const url = 'https://nelltek.ddns.net/nellSite/getngroklink.php';

  fetch(url, {
	  method: 'GET',
	  mode: 'cors', 
  })
  .then(response => {
		if (!response.ok) {
		  throw new Error(`Erro de rede: ${response.status}`);
		}
		return response.text(); 
  })
  .then(data => {
		ngrok_link = data; 
  })
  .catch(error => {
	console.error('Erro durante a solicitação:', error);
  });

};

setTimeout( () =>  { 
   getNgrokLink() 
}, 1000)
