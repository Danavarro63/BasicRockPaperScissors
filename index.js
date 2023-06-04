const game = () => {
    let pScore = 0;
    let cScore = 0;

    const startGame = () => {
        //selects all of the html elements
        const playButton = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");
        const matchScreen = document.querySelector(".match");
        //adds a clicking event listener to the playbutton
        playButton.addEventListener("click", () => {
            //adds the fadeout class to the introscreen
            introScreen
                .classList
                .add("fadeOut");
            //adds the fadein class to the introscreen
            matchScreen
                .classList
                .add("fadeIn");
        });
    };
    //screas the playmatch function
    const playMatch = () => {
    
        //gets all of the buttons for the users to click on
        const options = document.querySelectorAll(".options button");
        //get the hand images
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const hands = document.querySelectorAll(".hands img");

        hands.forEach(hand => {
            hand
                .addEventListener("animationend", function () {
                    this.style.animation = "";
                })
        })
        //get the computers options e.g. rock paper scissors randomly generated
        const computerOptions = ["rock", "paper", "scissors"];

        options.forEach(option => {
                option.addEventListener("click", function () {
                    //the computers choice
                    const computerNumber = Math.floor(Math.random() * 3);
                    const computerChoice = computerOptions[computerNumber];
                    //we call compare hands to get a winner
                    setTimeout(() => {
                        compareHands(this.textContent, computerChoice);
                        //update images
                        playerHand.src = `./assets/${this.textContent}.png`;
                        computerHand.src = `./assets/${computerChoice}.png`;
                    },2000)
                    //handshaking animation
                    playerHand.style.animation = "shakePlayer 2s ease";
                    computerHand.style.animation = "shakeComputer 2s ease";
                });
            
        });
    };

    const gameover = () =>{
        const endscreen = document.querySelector(".gameover");
        const matchScreen = document.querySelector(".match");
        const introScreen = document.querySelector(".intro");
        setTimeout(()=>{

            endscreen.classList.add("fadeIn");
        },2000)
        matchScreen.classList.remove("fadeIn");
        
        let winner;
        if(pScore === 10){
            winner = "player";
        }else{
            winner = "computer";
        }
        const gameWinner = document.querySelector(".gameover p");
        gameWinner.textContent = `${winner} won the game`;

        const playagain = document.querySelector(".gameover button")
        playagain.addEventListener("click",() => {
            const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
            pScore=0;
            cScore=0;
            playerScore.textContent = 0;
            computerScore.textContent = 0;
            const winner = document.querySelector(".winner");
            winner.textContent = "Choose an option";
            endscreen.classList.remove("fadeIn");
            //adds the fadein class to the introscreen
            matchScreen
                .classList
                .add("fadeIn");
            
    })
}

    const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
        if(pScore === 10){
            gameover();
            return
        }else if(cScore ===10){
            gameover();
            return;
        }

    }

    const compareHands = (playerChoice, computerChoice) => {
        //Update Text
        const winner = document.querySelector(".winner");
        //Checking for a tie
        if (playerChoice === computerChoice) {
            winner.textContent = "It is a tie";
            return;
        }
        //Check for Rock
        if (playerChoice === "rock") {
            if (computerChoice === "scissors") {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            }
        }
        //Check for Paper
        if (playerChoice === "paper") {
            if (computerChoice === "scissors") {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            }
        }
        //Check for Scissors
        if (playerChoice === "scissors") {
            if (computerChoice === "rock") {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player wins";
                pScore++;
                updateScore();
                return;
            }

        }
    }
    playMatch();
    startGame();
}
game()
