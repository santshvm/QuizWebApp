const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// console.log(highScores);

/* Now we want to iterate through each highScores and add an li to the unordered list */
highScoresList.innerHTML = highScores.map(score=>{

    /* Now we want to create an li that will have both the username and the score inside of it to the unordered list */


    return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");