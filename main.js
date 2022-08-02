
//Все ответы

const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');


//Все опции


const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestion = document.getElementById('number-of-all-questions');

let indexOfQuestion,
    indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer'),
    numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2');
    btnTryAgain = document.getElementById('btn-try-again');



const questions = [
    {
        question: 'Какой из ЯП подходит для Front-end?',
        options: [
            'JavaScript',
            'Python',
            'Java',
            'Kotlin',
        ],
        rightAnwer: 0
    },
    {
        question: 'Какой из Фреймворков Не пренадлежит JS',
        options: [
            'Angular',
            'Spring',
            'Vue',
            'React',
        ],
        rightAnwer: 1
    },
    {
        question: 'Какой ЯП подходит для создания мощных 3D игр?',
        options: [
            'Python',
            'Kotlin',
            'JavaScript',
            'C++',
        ],
        rightAnwer: 3
    },
    {
        question: 'Что из вариантов не используется для мобильной разработки?',
        options: [
            'Java',
            'Kotlin',
            'Python',
            'Swift',
        ],
        rightAnwer: 2
    },
    {
        question: 'Что из вариантов не является ЯП?',
        options: [
            'Java',
            'HTML',
            'Python',
            'Swift',
        ],
        rightAnwer: 1
    },
];

numberOfAllQuestion.innerHTML = questions.length;

const load = () =>{
 question.innerHTML = questions[indexOfQuestion].question;


    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage +1;
    indexOfPage++;
};
let complateAnswer =[];

const randomQuestion = () =>{
    let randomNumber = Math.floor(Math.random()*questions.length);
    let hitDublicate = false;

    if(indexOfPage == questions.length){
        quizOver();
    }else{
        if (complateAnswer.length > 0){
            complateAnswer.forEach(item =>{
                if(item==randomNumber){
                    hitDublicate = true;
                }
            });
            if(hitDublicate){
                randomQuestion();
            }else{
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(complateAnswer.length ==0){
            indexOfQuestion = randomNumber;
            load();
        }
    }
    complateAnswer.push(indexOfQuestion);
};
const checkAnswer = el =>{
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnwer){
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    }else{
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions()

};

for(option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = ()=>{
    optionElements.forEach(item=>{
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnwer){
            item.classList.add('correct');
        };
    });
};

const enableOptions = ()=>{
    optionElements.forEach(item =>{
        item.classList.remove('disabled','correct','wrong');
    });
};
const answerTracker = ()=>{
    questions.forEach(()=>{
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    });
}

const updateAnswerTracker = statur =>{
    answersTracker.children[indexOfPage -1 ].classList.add(`${statur}`);
}

const validate = ()=>{
    if(!optionElements[0].classList.contains('disabled')){
        alert('Ни один вариант не выбран!!!');
    }else{
        randomQuestion();
        enableOptions();
    }
};

const quizOver = () =>{
    if(score >=3){
        document.querySelector('.quiz-over-modal').classList.add('active');
        correctAnswer.innerHTML = score;
        numberOfAllQuestion2.innerHTML = questions.length;
    }else{
        let m = document.querySelector('.h');
        m.innerHTML = 'Результат не очень!!!'
        document.querySelector('.quiz-over-modal').classList.add('active');
        correctAnswer.innerHTML = score;
        numberOfAllQuestion2.innerHTML = questions.length;
        
    }
};

const tryAgain = ()=>{
    window.location.reload();
}

btnNext.addEventListener('click',()=>{
    validate();
})
btnTryAgain.addEventListener('click', tryAgain);


window.addEventListener('load', ()=>{
    randomQuestion();
    answerTracker();
});
