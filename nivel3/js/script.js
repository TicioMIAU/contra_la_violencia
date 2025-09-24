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
let level = 3;
let timeLeft = 20;
let timerInterval = null;

const questions = [
  {
    question: "Si alguien te insulta constantemente, lo adecuado es:",
    answers: [
      { text: "Hablar con un adulto de confianza sobre la situación", correct: true }, // posición 1
      { text: "Responder con insultos", correct: false },
      { text: "Ignorarlo y sufrir en silencio", correct: false },
      { text: "Reírte de la situación", correct: false }
    ]
  },
  {
    question: "Qué hacer si notas que un compañero está siendo manipulado emocionalmente?",
    answers: [
      { text: "Difundir rumores sobre la situación", correct: false },
      { text: "Animarlo a hablar con un adulto o profesional", correct: true }, // posición 2
      { text: "Ignorar lo que sucede", correct: false },
      { text: "Reírte del problema", correct: false }
    ]
  },
  {
    question: "Cuál es una forma de prevenir la violencia psicológica en la escuela?",
    answers: [
      { text: "Criticar públicamente a los demás", correct: false },
      { text: "Amenazar a compañeros para controlarlos", correct: false },
      { text: "Fomentar el respeto, la empatía y la comunicación positiva", correct: true }, // posición 3
      { text: "Ignorar los conflictos", correct: false }
    ]
  },
  {
    question: "Si alguien difunde rumores dañinos sobre ti, lo correcto es:",
    answers: [
      { text: "Vengarte difundiendo rumores", correct: false },
      { text: "Reírte y minimizar la situación", correct: false },
      { text: "Ignorar y aceptar todo", correct: false },
      { text: "Hablar con un adulto de confianza y registrar la situación", correct: true } // posición 4
    ]
  },
  {
    question: "Cómo puedes ayudar a un amigo que sufre acoso psicológico?",
    answers: [
      { text: "Escucharlo, apoyarlo y animarlo a pedir ayuda", correct: true }, // posición 1
      { text: "Decirle que lo ignore y no diga nada", correct: false },
      { text: "Reírte de sus problemas", correct: false },
      { text: "Criticarlo por reaccionar", correct: false }
    ]
  },
  {
    question: "Cuál es una señal de violencia psicológica que no debes ignorar?",
    answers: [
      { text: "Hacer bromas inofensivas", correct: false },
      { text: "Amenazas, burlas o humillaciones constantes", correct: true }, // posición 2
      { text: "No saludar a un compañero por un día", correct: false },
      { text: "Ignorar tareas escolares", correct: false }
    ]
  },
  {
    question: "Si alguien intenta controlarte mediante amenazas o chantaje emocional, lo adecuado es:",
    answers: [
      { text: "Ceder a sus demandas", correct: false },
      { text: "Reírte de sus amenazas", correct: false },
      { text: "Buscar apoyo de un adulto o profesional de confianza", correct: true }, // posición 3
      { text: "Ignorar la situación por completo", correct: false }
    ]
  },
  {
    question: "Qué hacer para promover un ambiente libre de violencia psicológica?",
    answers: [
      { text: "Hacer burlas y chismes sobre otros", correct: false },
      { text: "Ignorar los conflictos entre amigos", correct: false },
      { text: "Exigir obediencia usando miedo", correct: false },
      { text: "Fomentar el respeto, la escucha y la empatía entre compañeros", correct: true } // posición 4
    ]
  },
  {
    question: "Si eres testigo de intimidación psicológica en tu escuela, lo correcto es:",
    answers: [
      { text: "Informar a un adulto o autoridad escolar de confianza", correct: true }, // posición 1
      { text: "Unirte al agresor", correct: false },
      { text: "Reírte de la víctima", correct: false },
      { text: "Ignorar lo que pasa", correct: false }
    ]
  },
  {
    question: "Cuál es lo más importante para prevenir la violencia psicológica entre adolescentes?",
    answers: [
      { text: "Aislar a los agresores sin orientación", correct: false },
      { text: "Educar sobre respeto, empatía y comunicación sana", correct: true }, // posición 2
      { text: "Ignorar los conflictos pequeños", correct: false },
      { text: "Castigar físicamente para enseñar disciplina", correct: false }
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
  window.location.href = '../index.html'; // Ajusta la ruta si es necesario
});

startQuiz();
