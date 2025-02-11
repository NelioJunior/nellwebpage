import * as sdk from './libs/index.js';

let videoElement = document.querySelector("#videoElement")
let srcObject
let isRecording = false;
let flagFail = false;

const agentId = "agt_e0QFzXSp"  
const auth = { type: 'key', clientKey: "Z29vZ2xlLW9hdXRoMnwxMDg2MTA3NjE5NjE0NzA0ODkwNzQ6cGo2eEVtQ3JqNE1jWmU1SmRPTUJH" };

const microphone = document.getElementById("microphone");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let  recognition = null;
let spokenText = "";

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

function callResumeChat (last_user_msg) {
    const urlApi = "https://nelltek.ddns.me/resume/";  

    spokenText = "";

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
        let speak = agentManager.speak({
            type: "text",
            input: "Ocorreu um erro na A P I de resposta do avatar"
        });

    })
    .finally(() => {
       microphoneOff() 
    });    
}

const handleChat = () => {
    microphoneOff();       
}

function microphoneOff() {
    if (SpeechRecognition) {
        recognition.stop();
        isRecording = false;

        microphone.src = "./microphone.png";
        microphone.style.marginRight = "0px"
        microphone.style.width = "180px";

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
              microphone.style.width = "120px"; 
              microphone.style.marginRight = "20px"  
              microphone.src = "./green_cloud.gif";

              setTimeout(() => {
                   if (spokenText) {
                       callResumeChat(spokenText);                           
                   }  
              },500);         

            } else {
              isRecording = true;    
              recognition.start();
               
              microphone.style.width = "120px"; 
              microphone.style.marginRight = "20px"  
              microphone.src = "./microphone.gif";

            }
        } catch {
            microphoneOff();
        }          
    });
    
    recognition.addEventListener("result", (event) => {
        spokenText = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');
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
