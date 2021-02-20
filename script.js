
// Gets elements and points them to variables for following functions
var startButton = document.getElementById("start-btn")
var questionContainerEl = document.getElementById("question-container")
// let shuffledQuestions
let currentQuestionIndex
var questionEl = document.getElementById("question")
var answerButtonsEl = document.getElementById("answer-buttons")
var time = 10, dispaly = document.querySelector("#time")
// Event listener that waits for click, and runs startGame function when clicked
var timer = document.getElementById("timer")

startButton.addEventListener("click", startGame)





function startGame() {
    startButton.classList.add("hidden")
    // This will shuffle your question order. Index = 0 is necessary because we need the first element of our array.
    // shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hidden")
    var sec = 10
    var time = setInterval(myTimer, 1000);
    function myTimer() {
        timer.innerHTML = sec + "sec left"
        timer.classList.remove("hidden")
        sec--;
        if (sec == -2) {
            clearInterval(time)
            alert("Out of Time")
            timer.classList.add("hidden")
            startButton.innerText="Restart"
            startButton.classList.remove("hidden")
            questionContainerEl.classList.add("hidden")
        }
    }
    
    setNextQuestion()
}



function setNextQuestion(){
    resetState()
    showQuestion(questions[currentQuestionIndex])
}


function showQuestion(question){
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

function resetState(){
    clearStatusClass(document.body)
    while (answerButtonsEl.firstChild){
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

function selectAnswer(e){
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    checkArray()

}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add("correct")
    }else{
        element.classList.add("wrong")
    }

}

function clearStatusClass(element){
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

function checkArray(){
    currentQuestionIndex++
    if(questions.length > currentQuestionIndex){
        setNextQuestion()
    }else{
        clearInterval(time)
        alert("Quiz Complete")
        startButton.innerText="Restart"
        startButton.classList.remove("hidden")
        questionContainerEl.classList.add("hidden")
    }
}

// Creating an array that has each of our questions and the possible answers for each question.
var questions = [
    {
        question: "Asking Question 1?",
        answers: [
            {text: "Correct", correct: true},
            {text: "Wrong 1", correct: false},
            {text: "Wrong 2", correct: false},
            {text: "Wrong 3", correct: false}
        ]
    },
    {
        question: "Question 2",
        answers: [
            {text: "Correct", correct: true},
            {text: "Wrong 1", correct: false},
            {text: "Wrong 2", correct: false},
            {text: "Wrong 3", correct: false}
        ]
    },
    {
        question: "Question 3",
        answers: [
            {text: "Correct", correct: true},
            {text: "Wrong 1", correct: false},
            {text: "Wrong 2", correct: false},
            {text: "Wrong 3", correct: false}
        ]
    }
]

