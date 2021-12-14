//global variables and arrays
var time = questions.length * 15;
var currentQuestionIndex = 0; 

//grabs elements from html
var startButton = document.querySelector("#start-button");
var questionsEl = document.querySelector("#questions-section");
var timerEl = document.querySelector("#time");
var qChoices = document.querySelector("#choices-list");
var startScreen =  document.querySelector(".start-section");
var titleEl = document.querySelector("#question-title");
var endSection = document.querySelector("#end-section");
var scoresList = document.querySelector(".hslist");
var initials = document.querySelector("#initials");
var score = document.querySelector("#score");
var msg = document.querySelector(".rightWrong");
var submitButton = document.querySelector("#submit-button");
var tableElInit = document.querySelectorAll(".initSet");
var tableElScore = document.querySelectorAll(".scoreSet");
var buttons = document.querySelectorAll(".button");


var b1 = document.createElement('button');
var b2 = document.createElement('button');
var b3 = document.createElement('button');
var b4 = document.createElement('button');

//listens to start button to hide start screen and show questions
function startQuiz(event){
    event.preventDefault();
    startScreen.setAttribute("class", "hidden");
    questionsEl.setAttribute("class", "visible");
    getCurrentQuestion();
    startTimer();
}

//hides questions and shows end screen
function endQuiz() {
    startScreen.setAttribute("class", "hidden");
    questionsEl.setAttribute("class", "hidden");
    endSection.setAttribute("class", "visible");
    
    score.textContent = time;
}

//go back buttpn
function goBack(){
window.history.back();
}

//evaluates buttons value to corract answers in array
function eval(event){
    event.preventDefault();

    if(event.target.textContent === questions[currentQuestionIndex].answer){
          msg.textContent = "Correct"; 
          currentQuestionIndex++;
          if (currentQuestionIndex < questions.length){
             getCurrentQuestion();
          } else {
                endQuiz()
          }
         
    } else {
        
        time = time - 15;
        msg.textContent = "Incorrect"; 
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length){
            getCurrentQuestion();
        } else {
             endQuiz()
        }
    }
 }

function getCurrentQuestion(){

 var currentQuestion = questions[currentQuestionIndex];
 console.log('curretnQuestion-->',currentQuestion)
 titleEl.textContent = currentQuestion.question;


   b1.setAttribute('content', '1');
   b1.setAttribute('class', 'button');  
   b1.textContent = currentQuestion.choices[0];
    b1.addEventListener("click", eval);
   qChoices.appendChild(b1);

  
   b2.setAttribute('content', '2');
   b2.setAttribute('class', 'button');  
   b2.textContent = currentQuestion.choices[1];
   b2.addEventListener("click", eval);
   qChoices.appendChild(b2);
   

   b3.setAttribute('content', '3');
   b3.setAttribute('class', 'button');  
   b3.textContent = currentQuestion.choices[2];
   b3.addEventListener("click", eval);
   qChoices.appendChild(b3);
   

   b4.setAttribute('content', '4');
   b4.setAttribute('class', 'button');  
   b4.textContent = currentQuestion.choices[3];
   b4.addEventListener("click", eval);
   qChoices.appendChild(b4);

}


      
    //retrieves time every second
function startTimer() {
    // Sets timer
      var timer = setInterval(function() {
      time--;
      timerEl.textContent = time;



     if (time <= 0) {
      time = 0;
      timerEl.textContent = 0;
      clearInterval(timer);
      endQuiz();
      }
    }, 1000);
// if (endSection)
// {  
//     timerEl.textContent = JSON.stringify(score);
//   }

}
 
  //listens to submit button and stores in local storage
function submitInit(event){
    event.preventDefault();
    console.log("hello above");

   // 

    //gets letters they put in
    var answerArray = [];
    localStorage.setItem("initials", initials.value);
    var newNew2 =  localStorage.getItem("initials");


    localStorage.setItem("score", parseInt(time));
    var newNew1 = localStorage.getItem("score");

    console.log(newNew2);
    console.log(newNew1);

    if(newNew2 !== "" && newNew2.length  < 7){

       answerArray.push(newNew2);
       answerArray.push(newNew1);
       
       console.log(answerArray);
       
       location.href= "hs.html";
  
       tableElInit.textContent = newNew2;
       tableElScore.textContent = newNew1;
    }


    else {
       alert("Please enter valid number of initials (1-3)");
    }
    
    // appendChild(inits);
    // tableElScore.appendChild(setScore1);
}


//clears local storage of scores
function clearScores(){
    localStorage.clear();
}


//event listeners
if(submitButton){
submitButton.addEventListener("click", submitInit);
}

if(startButton){
startButton.addEventListener("click", startQuiz);
}