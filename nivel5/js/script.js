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
    question: "Si un jefe te grita o humilla en tu trabajo, lo correcto es:",
    answers: [
      { text: "Informar a un adulto de confianza o a la autoridad laboral", correct: true }, // posición 1
      { text: "Responder gritándole también", correct: false },
      { text: "Ignorar la situación y aceptar todo", correct: false },
      { text: "Renunciar sin hacer nada más", correct: false }
    ]
  },
  {
    question: "Qué debes hacer si eres testigo de maltrato a un compañero adolescente en el trabajo?",
    answers: [
      { text: "Unirte al maltrato", correct: false },
      { text: "Animarlo a denunciar la situación a recursos humanos o autoridad", correct: true }, // posición 2
      { text: "Reírte de lo que pasa", correct: false },
      { text: "Ignorar lo que sucede", correct: false }
    ]
  },
  {
    question: "Cuál es una forma de prevenir la violencia laboral en adolescentes?",
    answers: [
      { text: "Callar siempre ante cualquier abuso", correct: false },
      { text: "Aceptar trabajos que no cumplen las normas", correct: false },
      { text: "Conocer tus derechos laborales y comunicarte con respeto", correct: true }, // posición 3
      { text: "Reírte de compañeros que sufren maltrato", correct: false }
    ]
  },
  {
    question: "Si un compañero recibe amenazas o intimidación en el trabajo, lo adecuado es:",
    answers: [
      { text: "Ignorar lo que pasa", correct: false },
      { text: "Reírte de la situación", correct: false },
      { text: "Unirte al agresor para protegerte", correct: false },
      { text: "Contarle a un superior o autoridad laboral", correct: true } // posición 4
    ]
  },
  {
    question: "Cómo puedes protegerte de acoso laboral siendo adolescente?",
    answers: [
      { text: "Documentando situaciones y hablando con un adulto de confianza", correct: true }, // posición 1
      { text: "Aceptando todo para no perder el trabajo", correct: false },
      { text: "Gritando al jefe en cada discusión", correct: false },
      { text: "Ignorando lo que sucede", correct: false }
    ]
  },
  {
    question: "Qué hacer si un jefe exige trabajo extra sin pagar o presiona con amenazas?",
    answers: [
      { text: "Aceptar y no decir nada", correct: false },
      { text: "Informar a recursos humanos o autoridad laboral", correct: true }, // posición 2
      { text: "Hacer huelga sin aviso", correct: false },
      { text: "Ignorar el problema", correct: false }
    ]
  },
  {
    question: "Cuál es un signo de violencia laboral que no debes ignorar?",
    answers: [
      { text: "Recibir instrucciones normales de trabajo", correct: false },
      { text: "Ignorar problemas con compañeros", correct: false },
      { text: "Gritos, humillaciones o amenazas constantes", correct: true }, // posición 3
      { text: "Tareas habituales y supervisión normal", correct: false }
    ]
  },
  {
    question: "Si un compañero sufre discriminación por su edad o género en el trabajo, lo correcto es:",
    answers: [
      { text: "Reportarlo a la autoridad laboral o adulto de confianza", correct: true }, // posición 4
      { text: "Reírte de la situación", correct: false },
      { text: "Ignorarlo para no meterte", correct: false },
      { text: "Participar de la discriminación", correct: false }
    ]
  },
  {
    question: "Cómo puedes contribuir a un ambiente laboral seguro siendo adolescente?",
    answers: [
      { text: "Fomentando respeto, comunicación clara y apoyo entre compañeros", correct: true }, // posición 1
      { text: "Burlándote de otros para divertirte", correct: false },
      { text: "Ignorando conflictos y problemas de acoso", correct: false },
      { text: "Obedeciendo amenazas sin decir nada", correct: false }
    ]
  },
  {
    question: "Cuál es lo más importante para prevenir violencia laboral entre adolescentes?",
    answers: [
      { text: "Educar sobre derechos laborales, respeto y denuncia de abusos", correct: true }, // posición 2
      { text: "Callar y aceptar cualquier abuso", correct: false },
      { text: "Ignorar conflictos pequeños", correct: false },
      { text: "Responder con agresión física", correct: false }
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
