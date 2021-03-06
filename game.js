// alert("Test");

// Yeah, it works!!



const question = document.getElementById("question");

// creating an array of 4 different choices 
const choices = Array.from(document.getElementsByClassName("choice-text"));

// referencing the element with id="progress-text" 
const progressText = document.getElementById("progress-text");

// referencing the eleement with id="score"
const scoreText = document.getElementById("score");

// referencing element with id="progress-bar-full"
const progressBarFull = document.getElementById("progress-bar-full");


const loader = document.getElementById("loader");
const game = document.getElementById("game");



let currentQuestion = {}; // this is an object
let acceptingAnswers = false; // user can't answer before we have every thing loaded 
let score = 0;
let questionCounter = 0;
let availableQuestions = []; // this is an empty array 


/* Now we will use the Fetch API to fetch questions from the JSON file */

let questions = [];
fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple")
    .then( res => {
        console.log(res);
        return res.json();
    }).then(loadedQuestions=> {
        console.log(loadedQuestions);
        questions = loadedQuestions.results.map( loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };

            const answerChoices = [... loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);       

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            })

            return formattedQuestion;
        });
        // questions = loadedQuestions;
        
        startGame();

    })
    .catch(err => {
        console.error(err);
    }); 



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
    game.classList.remove("hidden");
    loader.classList.add("hidden");
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // then game is over 
        // now we want to go to the end page 
        // after the game ends, we would need to store the score 
        // so that the player can see it at the end in the end page

        // use local storage to store the value of score 
        localStorage.setItem("mostRecentScore", score);
        
        return window.location.assign("end.html");

    }
    // increament the questions that is already attempted
    questionCounter++;

    // update the question counter in the heads up display to display no of questions 
    // attempted out of (/) max questions present 
    
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;

    // after increamenting the question, we need to update the progress-bar
    // to update the progress bar, we would modify the width of the progress-bar
    // the width will be updated in terms of percentage 
    // percentage increase in the width = ((questionCounter)/(MAX_QUESTIONS)) * 100
    // but the value has to be in %. so we will do some string interpolation 


    progressBarFull.style.width = (questionCounter/MAX_QUESTIONS) * 100 + "%";


    /* trying to get a random index value between 0 and length of the array - 1 (inclusive) so that we can use this value (or random index) to generate a random question from the hardcoded question array*/
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    
    // got our random question
    currentQuestion = availableQuestions[questionIndex];

    // rendering the random question that we generated
    question.innerHTML = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice"  + number];
    });

    availableQuestions.splice(questionIndex, 1); // getting rid of the already displayed questions 

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

