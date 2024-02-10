console.log("Glass of wine 🍷");

const alien = document.getElementById("alien");

const speechBubble = document.getElementById("speech-bubble");
const mouthTalk = document.getElementById("mouth-talk");


// Eye Brows
const eyeBrowLeft = document.getElementById("eyebrow-left");
const eyeBrowRight = document.getElementById("eyebrow-right");

// This code first gets the bounding box of each eyebrow, which is used to calculate the center of each eyebrow.
let eyeBrowShapeLeft = eyeBrowLeft.getBBox();
let cxLeft = eyeBrowShapeLeft.x + eyeBrowShapeLeft.width/2;
let cyLeft = eyeBrowShapeLeft.y + eyeBrowShapeLeft.height/2;
let eyeBrowShapeRight = eyeBrowRight.getBBox();
let cxRight = eyeBrowShapeRight.x + eyeBrowShapeRight.width/2;
let cyRight = eyeBrowShapeRight.y + eyeBrowShapeRight.height/2;

// To look at the learned things in json
let weHaveAMacth = false;


/**
 * Speech Recognition
 */
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
var recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = (event) => {
   const receivedText = event.results[0][0].transcript;
   recognition.stop();
   // Use the text typed by the user or learn something through Learn function
   handleInput(receivedText);
};

const handleInput = (msg) => {
   if (!activeLearning){
      parseMsg(msg);
   }else if (activeLearning && step1){
      parseKeyword(msg);
   }else if (activeLearning && step2){
      parseDefinition(msg);
   }
}

/**
 * Speech Synth
 */
const speakThis = (msg) => {
   const utterance = new SpeechSynthesisUtterance(msg);
   utterance.pitch = .5; //high or low
   utterance.rate = .8; //speed
   // utterance.volume = .5;
   speechSynthesis.speak(utterance);

   mood = 1.2;

   // Mouth animation
   mouthTalk.classList.add("speak");
   mouthTalk.style.opacity = "1";
   let wordCount = msg.split(" ").length; 
   let talkingTime = wordCount * 400;

   setTimeout(function() {
      mouthTalk.classList.remove("speak");
      mouthTalk.style.opacity = "0";

      setTimeout(() => {speechBubble.style.opacity = "0";}, 1500);

      weHaveAMacth = false;
   }, talkingTime);

   console.log("Alien says: " + msg);
}

/**
 * Input field (alternative)
 */
const msgInput = document.getElementById("msg-input");

function patternTest(regex, msg) {
   return regex.test(msg);
}

async function callJSONData(msg) {
   const response = await fetch("assets/data/data.json");
   const jsonData = await response.json();
   // console.log(jsonData);

   if(jsonData.length !== 0) {
      jsonData.forEach((item, index) => {
         let regex = new RegExp(item.question, "gi");

         if(patternTest(regex, msg)) {
            let randomize = Math.floor(Math.random() * item.answer.length);
            // console.log("Match: " + item.answer[randomize]);
            
            speakThis(item.answer[randomize]);
            speechBubble.innerHTML = item.answer[randomize];
            speechBubble.style.opacity = "1";
            weHaveAMacth = true;
         }
      });
   }
}

const callStorage = (msg) => {
   console.log("CALL STORAGE: " + msg);
   for(const [key, value] of Object.entries(localStorage)){
      if(key.substring(0, 4) === "key-"){
         let regex = new RegExp(key.substring(5), "gi");

         if(patternTest(regex, msg)){
            speakThis(value);
            speechBubble.innerHTML = value;
            speechBubble.style.opacity = "1";
            weHaveAMacth = true;
         }
      }
   }
}

// Manually parse the message
const parseMsg = (msg) => {
   msgInput.value = null;
   msg = msg.toLowerCase();
   console.log(msg);

   callJSONData(msg);

   if (!weHaveAMacth){
      callStorage(msg);
   }
}

/**
 * Mood
 */
let mood = 1; // Neutral mood
let isBored = false;
let isHungry = false;
let boredRand = 0;
let hungryRand = 0;

const statusHungry = document.getElementById("hungry");
const foodBrain = document.getElementById("brain");
const statusBored = document.getElementById("bored");
const playGun = document.getElementById("gun");

// Update Loop
setInterval(() => {
   console.log("Mood: " + mood);
   
   mood /= 1.005;

   // Hunger
   console.log(hungryRand + " : " + isHungry);
   if (hungryRand == 7 && !isHungry) {
      console.log("Alien is hungry");

      if (!isBored) {
         isHungry = true;
         mood = .69;
         statusHungry.style.display = "block";
         mouthTalk.style.opacity = "1";
         eyeBrowLeft.setAttribute('transform', `rotate(15, ${cxLeft}, ${cyLeft})`);
         eyeBrowRight.setAttribute('transform', `rotate(-15, ${cxRight}, ${cyRight})`);
      }
   }else{
      hungryRand = Math.floor(Math.random() * 50);

   }

   // Bored
   console.log(boredRand + " : " + isBored);
   if (boredRand == 17 && !isBored) {
      console.log("Alien is bored");
      
      if (!isHungry) {
         isBored = true;
         mood = .69;
         statusBored.style.display = "block";
         mouthTalk.style.opacity = "1";
         eyeBrowLeft.setAttribute('transform', `rotate(-15, ${cxLeft}, ${cyLeft})`);
         eyeBrowRight.setAttribute('transform', `rotate(15, ${cxRight}, ${cyRight})`);
      }
   }else{
      boredRand = Math.floor(Math.random() * 60);
   }

   if (mood >= 1) {
      eyeBrowLeft.setAttribute('transform', `rotate(0, ${cxLeft}, ${cyLeft})`);
      eyeBrowRight.setAttribute('transform', `rotate(0, ${cxRight}, ${cyRight})`);
   }
}, 500);

/**
 * Actions
 */
// Food btn
let feedSound = new Audio("assets/sound/wet-sloppy-eating.mp3");
const feed = () => {
   isHungry = false;
   mood = 2;
   statusHungry.style.display = "none";
   foodBrain.style.display = "block";
   setTimeout(() => {
      foodBrain.style.display = "none";
   }, 3000);

   feedSound.play();

   let msg = "Human brain, my favorite!";
   setTimeout(() => {
      speakThis(msg);
      speechBubble.innerHTML = msg;
      speechBubble.style.opacity = "1";
   }, 2000);
   
   isBored = false;
   statusBored.style.display = "none";
   mouthTalk.style.opacity = "0";
}

// Play btn
let playSound = new Audio("assets/sound/laser-blaster.mp3");
const play = () => {
   isBored = false;
   mood = 1.5;
   statusBored.style.display = "none";
   playGun.style.display = "block";
   setTimeout(() => {
      playGun.style.display = "none";
   }, 3000);

   playSound.play();

   let msg = "Yes, let's chase some humans!";
   setTimeout(() => {
      speakThis(msg);
      speechBubble.innerHTML = msg;
      speechBubble.style.opacity = "1";
   }, 800);
   
   isHungry = false;
   statusHungry.style.display = "none";
   mouthTalk.style.opacity = "0";
}

// Learn btn
let activeLearning = false;
let step1 = false;
let step2 = false;
let travelKey = '';

const learn = () => {
   console.log("Learning...");
   
   let msg = "Teach me something, human!";
   speakThis(msg);
   speechBubble.innerHTML = msg;
   speechBubble.style.opacity = "1";

   isBored = false;
   isHungry = false;
   mood = 1.5;
   statusBored.style.display = "none";

   setTimeout(() => {
      activeLearning = true;
      recognition.start();
      step1 = true;
   }, 2000);
}

const parseKeyword = (keyword) => {
   console.log("Learning: " + keyword);
   travelKey = keyword;

   let msg = "Tell me or type it. But keep it short, human!";
   speakThis(msg);
   speechBubble.innerHTML = msg;
   speechBubble.style.opacity = "1";
   step1 = false;

   setTimeout(() => {
      recognition.start();
      step2 = true;
   }, 4000);
}

const parseDefinition = (definition) => {
   console.log("Recording: " + definition);
   localStorage.setItem(`key-${travelKey}`, definition);

   let msg = "Very well, human! I'll remember what '" + travelKey + "' is.";
   speakThis(msg);
   speechBubble.innerHTML = msg;
   speechBubble.style.opacity = "1";

   activeLearning = false;
   step1 = false;
}
