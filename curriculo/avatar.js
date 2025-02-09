import * as sdk from './libs/index.js';

let videoElement = document.querySelector("#videoElement")
let srcObject
let isRecording = false;
let flagFail = false;


const agentId = "agt_e0QFzXSp"  
const auth = { type: 'key', clientKey: "Z29vZ2xlLW9hdXRoMnwxMDg2MTA3NjE5NjE0NzA0ODkwNzQ6cGo2eEVtQ3JqNE1jWmU1SmRPTUJH" };

/*
const agentId = "agt_e0QFzXSp"  
const auth = { type: 'key', clientKey: "bGlua2VkaW58VDU3RU00a3hsTjp0RVpSSFBGVno0c1dJVDlfV0d2cmI=" };
*/

const microphone = document.getElementById("microphone");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let  recognition = null;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
}

const callbacks = {

    onSrcObjectReady(value) {
        videoElement.srcObject = value
        srcObject = value
        return srcObject
    },

    onConnectionStateChange(state) {

        if (state == "fail") {
            if (flagFail === false) {
                flagFail = true;       
                
                videoElement.srcObject = undefined;    
                videoElement.src = "./nell.mp4";
                
                const alertMsg = "Seu navegador não possui suporte para interagir com o avatar";                
                alert(alertMsg);
            } 
        }
    },

    onVideoStateChange(state) {
      if (state == "STOP") {
            videoElement.srcObject = undefined;    
            // videoElement.src = agentManager.agent.presenter.idle_video;  
            videoElement.src = "./nell.mp4";   
      }
      else {
          videoElement.srcObject = srcObject
      }
    },


    onError(error, errorData) {  
        console.log("Something went wrong");
        agentManager.connect();
        
        microphoneOff();

        setTimeout(() => {
            let speak = agentManager.speak({
                type: "text",
                input:"Something went wrong"
            });
        },10000);         
    }    
}

let streamOptions = { compatibilityMode: "auto", streamWarmup: true }

async function speak(message) {
    let inputText = message;
    
    microphoneOff();
    
    if (inputText !== "" && inputText.length > 2) {
        let speak = agentManager.speak({
            type: "text",
            input: message
        });
    }
}

function reconnect() {
    let reconnect = agentManager.reconnect()
}

function disconnect() {
    let disconnect = agentManager.disconnect()
}

function timeDisplay() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
}

let agentManager = await sdk.createAgentManager(agentId, { auth, callbacks, streamOptions });    
agentManager.connect()    

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);

    let chatContent = "<p></p>";
    
    chatLi.innerHTML = chatContent;

    if (message === "image"){
        chatLi.querySelector("p").innerHTML = "<div class='thinking-div'><img class='thinking-image' src='./images/typing.gif'></div>";
    } else {
        chatLi.querySelector("p").textContent = message;
    }
    return chatLi;
}

function callResumeChat (last_user_msg) {
    const urlApi = "http://localhost:8000/interactive_resume";

    fetch(urlApi, {
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
        let last_avatar_message = result['response']

        let speak = agentManager.speak({
            type: "text",
            input: last_avatar_message
        });
        
    })
    .catch(error => {
        console.log("Ocorreu um erro na resposta do avatar")
    });
}

// Deixado aqui so pra estudar, apagar quando possivel - Nell Junior - Fev/2025
function callChat (chatbox) {
    const urlApi = "./redirect.php";    
    const outgoing_lst = chatbox.querySelectorAll(".outgoing");
    const last_user_msg = outgoing_lst[outgoing_lst.length-1].innerText;

    try {
        fetch(urlApi, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                saleTransaction: saleTransaction,
                shopProducts: prodLst,
                shoppingCartProducts: shoppingCart  
            }),
        })
        .then(response => response.json())
        .then(result => {
            const incoming_lst = chatbox.querySelectorAll(".chat.incoming");
            const last_bot_message = incoming_lst[incoming_lst.length-1].querySelector('p');
            
            microphoneOff(); 
    
            alert(result["response"]);

    
            let speak = agentManager.speak({
                type: "text",
                input: saleTransaction["seller_message"]
            });
    
        })
        .catch(error => {
            microphoneOff();
            agentManager.connect()        
        });
    
    } catch (error) {
        microphoneOff();
        agentManager.connect()            
    } 

    saleTransaction["products_found_and_quantity"] = [];
}

const handleChat = () => {

    microphoneOff();

    callResumeChat ("Porque voce acha que devemos te contratar?")        
        
}

function microphoneOff() {
    if (SpeechRecognition) {
        recognition.stop();
        isRecording = false;
        microphone.src = "./microphone.png"; 
    }      
} 

if (!SpeechRecognition) {
    alert("Seu navegador não suporta reconhecimento de fala,mas não se preocupe,você ainda pode interagir com a recepcionista virtual por mensagem de texto no chat.");
} else {  
    recognition.lang = 'pt-BR'; 
    recognition.interimResults = false; 
    recognition.continuous = true; 

    microphone.addEventListener("click", () => {
        try {
            if (isRecording) {
              isRecording = false;  
            } else {
              isRecording = true;    
              recognition.start();
              microphone.src = "./microphone.gif";
            }
        } catch {
            microphoneOff();
        }      
    });
    
    recognition.addEventListener("result", (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
    });
    
    recognition.addEventListener("end", () => {
        if (isRecording) {
          recognition.start();
        }
    });
    
    recognition.addEventListener("error", (event) => {
        console.log("Erro no reconhecimento de fala:", event.error);
        microphoneOff()
    });   
}

microphone.addEventListener("click", handleChat);
