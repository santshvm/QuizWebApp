// alert("Test");

// Yeah, it works! 



const question = document.getElementById("question");

// creating an array of 4 different choices 
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");


let currentQuestion = {}; // this is an object
let acceptingAnswers = false; // user can't answer before we have every thing loaded 
let score = 0;
let questionCounter = 0;
let availableQuestions = []; // this is an empty array 
let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

/* each question is an object that will have a question field which has the question and choice fields choice 1 to 4 that will have the answer choices and answer field that stores the correct choice number. To check if an answer is correct, we would just match the choice number with the answer field*/


// few things that is needed for the operation of the game 

// setting the correct marks to 10 
const CORRECT_BONUS = 10;

// let's set the maximum questions that the user can answer in one go to be 3 questions
const MAX_QUESTIONS = 3;


// setting the questionCounter and the score 

startGame = () => {
    questionCounter = 0;
    score  = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // then game is over 
        // now we want to go to the end page 
        return window.location.assign("end.html");

    }
    questionCounter++;
    // update the question counter in the heads up display to display no of questions 
    // attempted out of (/) max questions present 
    questionCounterText.innerHTML = questionCounter + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice"  + number];
    });

    availableQuestions.splice(questionIndex, 1); // getting rid of the displayed questions

    // letting users to answer the questions
    acceptingAnswers = true; // now the user can answer

}

choices.forEach( choice => {
    choice.addEventListener("click", e => {
       // ignore the click if we are not accepting answers anymore 
       if (!acceptingAnswers) return;   

       acceptingAnswers = false; // to create a little bit of delay so that users can't click immediately 
       const selectedChoice = e.target;
       const selectedAnswer = selectedChoice.dataset["number"];

       // create two classes - one will be the incorrect class and one will be the correct class 
       const classToApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        /* if correct answer is clicked then the score should increase by 10 that is the bonus marks awarded for correct answer */ 
        if (classToApply === "correct") { 
            increamentScore(CORRECT_BONUS);
        }
        // console.log(classToApply);
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
       
       
    });
});


// this function will increase the value of score by num 
// it will also update the score in the heads up display
increamentScore = num => {
    score = score + num;
    // update the score in the heads up display 
    scoreText.innerHTML = score;

}

startGame();