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
finalScore.innerText = mostRecentScore;


username.addEventListener("keyup", () => {
    // console.log(username.value);     
    
    // disabling the save score button if there is no username input 

    saveScoreBtn.disabled = !username.value;
})