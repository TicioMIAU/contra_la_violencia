const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const feedbackDisplay = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const menuButton = document.getElementById('menu-button');
const timerDisplay = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let level = 1;
let timeLeft = 20; // segundos
let timerInterval = null;

const questions = [
  {
    question: "Si alguien controla tu dinero o te obliga a gastar de cierta manera, lo correcto es:",
    answers: [
      { text: "Hablar con un adulto de confianza o autoridad para buscar ayuda", correct: true }, // posición 1
      { text: "Aceptar todo sin decir nada", correct: false },
      { text: "Devolverle dinero de forma agresiva", correct: false },
      { text: "Ignorar la situación y gastar como quieran", correct: false }
    ]
  },
  {
    question: "Qué hacer si notas que un compañero adolescente es víctima de violencia económica?",
    answers: [
      { text: "Reírte de su situación", correct: false },
      { text: "Animarlo a pedir apoyo a un adulto o profesional", correct: true }, // posición 2
      { text: "Ignorar lo que pasa", correct: false },
      { text: "Tomar su dinero para ayudarte", correct: false }
    ]
  },
  {
    question: "Cuál es una forma de prevenir la violencia económica entre adolescentes?",
    answers: [
      { text: "Prestar dinero sin reglas", correct: false },
      { text: "Aceptar que otros controlen tu dinero", correct: false },
      { text: "Saber manejar tu dinero y hablar de tus derechos financieros", correct: true }, // posición 3
      { text: "Gastar sin planificación ni permiso", correct: false }
    ]
  },
  {
    question: "Si alguien te exige trabajo o dinero a cambio de algo que no quieres dar, lo adecuado es:",
    answers: [
      { text: "Decir que sí para evitar problemas", correct: false },
      { text: "Reírte de la situación", correct: false },
      { text: "Ignorar la situación", correct: false },
      { text: "Contarle a un adulto de confianza y buscar ayuda", correct: true } // posición 4
    ]
  },
  {
    question: "Cómo puedes protegerte de violencia económica siendo adolescente?",
    answers: [
      { text: "Aprendiendo a manejar tu dinero y poniendo límites claros", correct: true }, // posición 1
      { text: "Dejar que otros decidan por ti todo tu dinero", correct: false },
      { text: "Gastar todo en cosas que no necesitas", correct: false },
      { text: "Evitar ahorrar o planificar gastos", correct: false }
    ]
  },
  {
    question: "Qué hacer si un familiar o amigo te presiona para que le des dinero constantemente?",
    answers: [
      { text: "Ignorarlo y seguir dando dinero", correct: false },
      { text: "Pedir apoyo a un adulto o autoridad para manejar la situación", correct: true }, // posición 2
      { text: "Amenazarlo para que deje de pedir dinero", correct: false },
      { text: "Reírte de la situación", correct: false }
    ]
  },
  {
    question: "Cuál es un signo de violencia económica que no debes ignorar?",
    answers: [
      { text: "Amenazas o presión constante para entregar dinero o recursos", correct: true }, // posición 3
      { text: "Pedir prestado una vez y devolverlo", correct: false },
      { text: "Acordar gastos compartidos de manera justa", correct: false },
      { text: "Recibir dinero como regalo voluntario", correct: false }
    ]
  },
  {
    question: "Si un amigo es víctima de control económico, lo correcto es:",
    answers: [
      { text: "Reírte de su situación", correct: false },
      { text: "Decirle que acepte todo", correct: false },
      { text: "Animarlo a hablar con un adulto de confianza", correct: false },
      { text: "Escucharlo y apoyarlo a pedir ayuda", correct: true } // posición 4
    ]
  },
  {
    question: "Cómo contribuir a prevenir violencia económica en adolescentes?",
    answers: [
      { text: "Educando sobre derechos financieros y límites personales", correct: true }, // posición 1
      { text: "Obligando a otros a dar dinero", correct: false },
      { text: "Ignorando situaciones de abuso económico", correct: false },
      { text: "Tomando dinero de otros sin permiso", correct: false }
    ]
  },
  {
    question: "Cuál es lo más importante para prevenir la violencia económica?",
    answers: [
      { text: "Aprender a gestionar tu dinero y conocer tus derechos", correct: false },
      { text: "Educar sobre respeto económico y comunicación sana", correct: true }, // posición 2
      { text: "Aceptar todo lo que otros impongan", correct: false },
      { text: "Reírte de las personas que pierden dinero", correct: false }
    ]
  }
];


function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  level = 1;
  timeLeft = 20;
  updateScoreDisplay();
  updateLevelDisplay();
  updateTimerDisplay();
  nextButton.classList.add('hidden');
  feedbackDisplay.classList.add('hidden');
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetAnswerButtons();
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer-btn');
    button.dataset.correct = answer.correct;
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetAnswerButtons() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  feedbackDisplay.classList.add('hidden');
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === 'true';

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    if (button === selectedButton && !isCorrect) {
      button.classList.add('incorrect');
    }
  });

  if (isCorrect) {
    score += 10;
    feedbackDisplay.textContent = "¡Correcto!";
  } else {
    feedbackDisplay.textContent = "Incorrecto.";
  }

  feedbackDisplay.classList.remove('hidden');
  updateScoreDisplay();

  nextButton.classList.remove('hidden');
  stopTimer();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    feedbackDisplay.classList.add('hidden');
    nextButton.classList.add('hidden');
    startTimer();
  } else {
    questionText.textContent = `¡Juego Terminado! Puntuación final: ${score}`;
    answerButtons.innerHTML = '';
    feedbackDisplay.classList.add('hidden');
    nextButton.classList.add('hidden');
    timerDisplay.textContent = '0';
  }
}

function updateScoreDisplay() {
  scoreDisplay.textContent = score;
}

function updateLevelDisplay() {
  levelDisplay.textContent = level;
}

function updateTimerDisplay() {
  timerDisplay.textContent = timeLeft;
}

function startTimer() {
  timeLeft = 20;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      feedbackDisplay.textContent = "¡Se acabó el tiempo!";
      feedbackDisplay.classList.remove('hidden');
      disableAnswers();
      nextButton.classList.remove('hidden');
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function disableAnswers() {
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
  });
}

nextButton.addEventListener('click', nextQuestion);

menuButton.addEventListener('click', () => {
  window.location.href = '../index.html'; // Ajusta la ruta según la ubicación de tu menú
});

startQuiz();
