const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let avaliableQuestions = [];

let questions = [{
            question: "Which of the following is NOT a logical operator?",
            choice1: "||",
            choice2: "&&",
            choice3: "#",
            choice4: "!",
            answer: 3
        },
        {
            question: "The Null type has exactly how many values?",
            choice1: "4",
            choice2: "2",
            choice3: "1",
            choice4: "0",
            answer: 3
        },
        {
            question: "Which of the following is the correct way to define a variable??",
            choice1: "let myLuckyNumber = 37;",
            choice2: "let myluckyNumber = 37;",
            choice3: "let MyLuckyNumber = 37;",
            choice4: "let myuckyumber = 37;",
            answer: 1
        },
        {
            question: "What letter is at the index of 3 in the following string? \n let animal = 'Dumbo Octopus';",
            choice1: "u",
            choice2: "m",
            choice3: "D",
            choice4: "b",
            answer: 4
        },
        {
            question: "Which of the following will only return a value of True or False",
            choice1: "Number",
            choice2: "Boolean",
            choice3: "String",
            choice4: "None of the above",
            answer: 2
        },
    ]
    // constants
const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 5;
const INCORRECT_BONUS = -10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    avaliableQuestions = [...questions];

    getNewQuestion();
};

getNewQuestion = () => {
    if (avaliableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // GO TO THE High Score PAGE
        return window.location.assign(`/highScore.html`);
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter} /${MAX_QUESTIONS}` // HUD INFO 

    const questionIndex = Math.floor(Math.random() * avaliableQuestions.length);
    currentQuestion = avaliableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion['choice' + number];
    });

    avaliableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

};
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        } else {
            incrementScore(INCORRECT_BONUS)
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}


startGame();