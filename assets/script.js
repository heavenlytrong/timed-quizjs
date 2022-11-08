
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const scoreText= document.querySelector('#score')




let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    
    {
        question: 'What tag is primarily used for text in HTML? ', 
        choice1: '<P></P>',
        choice2: '<div></div>',
        choice3: '<a></a>',
        choice4: '<span></span>',
        answer: 1,
        
    },
    {
        question: 'what is emilys favorite food??', 
        choice1: 'cheese',
        choice2: 'chee',
        choice3: 'cese',
        choice4: 'chese',
        answer: 1,
        
    },
    {
        question: 'what is emilys favorite food???', 
        choice1: 'cheese',
        choice2: 'chee',
        choice3: 'cese',
        choice4: 'chese',
        answer: 3,
        
    },
    {
        question: 'what is emilys favorite food????', 
        choice1: 'cheese',
        choice2: 'chee',
        choice3: 'cese',
        choice4: 'chese',
        answer: 4,
        
    },
    {
        question: 'what is emilys favorite food????', 
        choice1: 'cheese',
        choice2: 'chee',
        choice3: 'cese',
        choice4: 'chese',
        answer: 4,
        
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('./assets/end.html')
    }

    questionCounter++

    
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset ['number']
        choice.innerText = currentQuestion ['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener( 'click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()