
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
let level = 2;
let timeLeft = 20;
let timerInterval = null;

const questions = [
  {
    question: "Si alguien intenta tocarte sin tu consentimiento, lo correcto es:",
    answers: [
      { text: "Decir NO y alejarte", correct: true }, // posición 1
      { text: "Aceptar para no pelear", correct: false },
      { text: "Ignorarlo", correct: false },
      { text: "Reírte de la situación", correct: false }
    ]
  },
  {
    question: "Qué debes hacer si conoces a alguien que sufre abuso sexual?",
    answers: [
      { text: "Ignorar lo que pasa", correct: false },
      { text: "Contarle a un adulto de confianza", correct: true }, // posición 2
      { text: "Difundir rumores sobre la víctima", correct: false },
      { text: "Intentar resolverlo solo", correct: false }
    ]
  },
  {
    question: "Cuál es una forma de prevenir la violencia sexual en adolescentes?",
    answers: [
      { text: "Callar si alguien te molesta", correct: false },
      { text: "Aceptar comportamientos incómodos", correct: false },
      { text: "Aprender sobre límites y respeto", correct: true }, // posición 3
      { text: "Forzar situaciones para defenderte", correct: false }
    ]
  },
  {
    question: "Si un compañero hace comentarios sexuales no deseados, lo adecuado es:",
    answers: [
      { text: "Reírte para no causar problemas", correct: false },
      { text: "Responder con violencia física", correct: false },
      { text: "Ignorarlo siempre", correct: false },
      { text: "Decirle que pare y contarlo a un adulto", correct: true } // posición 4
    ]
  },
  {
    question: "Para evitar situaciones de riesgo sexual, lo recomendable es:",
    answers: [
      { text: "Mantener comunicación clara sobre tus límites", correct: true }, // posición 1
      { text: "Aceptar todo para no perder amistades", correct: false },
      { text: "Confiar en cualquiera sin cuidado", correct: false },
      { text: "Evitar hablar de tus sentimientos", correct: false }
    ]
  },
  {
    question: "Si alguien intenta presionarte para algo sexual, lo correcto es:",
    answers: [
      { text: "Aceptar para no pelear", correct: false },
      { text: "Rechazar, alejarte y buscar ayuda", correct: true }, // posición 2
      { text: "Mantener silencio por miedo", correct: false },
      { text: "Ignorar y esperar que se vaya", correct: false }
    ]
  },
  {
    question: "Cuál es una señal de violencia sexual que debes reportar?",
    answers: [
      { text: "Críticas sobre tus tareas escolares", correct: false },
      { text: "Bromas sobre tus deportes favoritos", correct: false },
      { text: "Toques no deseados o comentarios sexuales", correct: true }, // posición 3
      { text: "Comentarios sobre comida o ropa", correct: false }
    ]
  },
  {
    question: "Si un amigo te confiesa que ha sido víctima de abuso sexual, lo adecuado es:",
    answers: [
      { text: "Animarle a contar a un adulto de confianza", correct: true }, // posición 1
      { text: "Decirle que lo olvide", correct: false },
      { text: "Reírte de la situación", correct: false },
      { text: "Mantenerlo en secreto sin ayuda", correct: false }
    ]
  },
  {
    question: "Qué hacer para fomentar un ambiente seguro y libre de violencia sexual?",
    answers: [
      { text: "Hacer bromas sexuales sobre otros", correct: false },
      { text: "Ignorar comportamientos incómodos", correct: false },
      { text: "Respetar límites y hablar sobre consentimiento", correct: true }, // posición 3
      { text: "Evitar discutir normas de respeto", correct: false }
    ]
  },
  {
    question: "Cuál es lo más importante para prevenir violencia sexual en adolescentes?",
    answers: [
      { text: "Aceptar todo para no causar conflictos", correct: false },
      { text: "Educar sobre respeto, consentimiento y límites", correct: true }, // posición 2
      { text: "Ignorar situaciones incómodas", correct: false },
      { text: "Gritar o castigar sin razón", correct: false }
    ]
  }
];


function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
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
  window.location.href = '../index.html'; // Ajusta según la ubicación del menú
});

startQuiz();
