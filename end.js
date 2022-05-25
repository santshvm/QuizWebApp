saveHighScore = e => {
    // alert("save button working fine");
    // Yeah, it worked!

    e.preventDefault();     
}

// referencing the html element with id="username"

const username = document.getElementById("username");

// get the save score button 

const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("final-score");
const mostRecentScore = localStorage.getItem("mostRecentScore");

// storing the high score as an array in the local storage 

/*get the high score from the local storage. If there is no high score stored in the local storage (for ex: if the user is taking the quiz for the first time) then get an empty array and initialise the empty array with the high score obtained in the current round */

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;   
console.log(highScores);

// console logging to check if we get an array object in the console
// console.log(JSON.parse(localStorage.getItem("highScores", JSON.stringify([]))));    


finalScore.innerText = mostRecentScore;





username.addEventListener("keyup", () => {
    // console.log(username.value);     
    
    // disabling the save score button if there is no username input 

    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    e.preventDefault();
    console.log("save button was clicked");

    // creating a object called score 
    const score = {
        score: mostRecentScore,
        name: username.value
    };

    
    // console.log(score);
    // yo, it worked!

    highScores.push(score);
    
    /*The array of high scores has to sorted in the decreasing order of scores and the  */
    highScores.sort((a, b) => {
        /* if b.score greater than a.score then put b.score before a.score as we are sorting the array in the decreasing order of the socres and this may give us an array but with more than 5 items. Now, we want to restrict the no of items to 5 items  */
        
        return b.score - a.score;

        
    })

    highScores.splice(5); // at index 5, start cutting off every thing after that in the array

    // update the localStorage with the high score 

    localStorage.setItem("highScores", JSON.stringify(highScores));

    // go back home after entering the username and hitting the save button to save the 
    // high score in the local storage  
    window.location.assign("/");
};