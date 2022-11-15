
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
        question: 'Whats a popular CSS framework', 
        choice1: 'Bootstrap',
        choice2: 'jQuerry',
        choice3: 'youtube',
        choice4: 'the art museum',
        answer: 1,
        
    },
    {
        question: 'What selector is used for background color in CSS', 
        choice1: 'Color',
        choice2: 'Background-color',
        choice3: 'Background',
        choice4: 'Background-coulour',
        answer: 2,
        
    },
    {
        question: 'What is the hardest language to learn', 
        choice1: 'HTML',
        choice2: 'CSS',
        choice3: 'Spanish',
        choice4: 'all of them',
        answer: 4,
        
    },
    {
        question: 'Is my quiz great or what', 
        choice1: 'Meh',
        choice2: 'YEAH!!',
        choice3: 'no',
        choice4: 'good enough to pass',
        answer: 4,
        
    }
]
var count = 25;
var interval = setInterval(function(){
  document.getElementById('count').innerHTML=count;
  count--;
  if (count === 0){
    clearInterval(interval);
    document.getElementById('count').innerHTML='Done'
    alert("You're out of time!");
    return window.location.assign('./end.html')
  }
}, 1000);

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

        return window.location.assign('./end.html')
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
        else {
            count-=5;
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
