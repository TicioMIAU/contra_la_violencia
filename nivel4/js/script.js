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
let level = 4;
let timeLeft = 20;
let timerInterval = null;

const questions = [
  {
    question: "Si alguien publica comentarios ofensivos sobre ti en redes sociales, lo correcto es:",
    answers: [
      { text: "Bloquear a la persona y reportar el contenido", correct: true }, // posición 1
      { text: "Responder con insultos", correct: false },
      { text: "Ignorar la situación", correct: false },
      { text: "Reírte de los comentarios", correct: false }
    ]
  },
  {
    question: "Qué debes hacer si eres testigo de ciberacoso hacia un compañero?",
    answers: [
      { text: "Reírte de la situación", correct: false },
      { text: "Animarlo a reportarlo a un adulto o autoridad escolar", correct: true }, // posición 2
      { text: "Difundir los mensajes para que todos los vean", correct: false },
      { text: "Ignorar lo que pasa", correct: false }
    ]
  },
  {
    question: "Cuál es una medida para prevenir el ciberacoso?",
    answers: [
      { text: "Compartir contraseñas con amigos", correct: false },
      { text: "Participar en cadenas de mensajes ofensivos", correct: false },
      { text: "No aceptar solicitudes de desconocidos y configurar privacidad", correct: true }, // posición 3
      { text: "Publicar todo lo que haces en redes", correct: false }
    ]
  },
  {
    question: "Si recibes mensajes amenazantes en internet, lo adecuado es:",
    answers: [
      { text: "Responder con amenazas", correct: false },
      { text: "Ignorar y esperar que desaparezcan", correct: false },
      { text: "Compartir los mensajes con todos tus amigos", correct: false },
      { text: "Contarle a un adulto de confianza y reportar los mensajes", correct: true } // posición 4
    ]
  },
  {
    question: "Cómo puedes proteger tu privacidad en redes sociales?",
    answers: [
      { text: "Configurar la privacidad y no compartir datos personales", correct: true }, // posición 1
      { text: "Aceptar solicitudes de cualquier persona", correct: false },
      { text: "Publicar tu ubicación en tiempo real", correct: false },
      { text: "Compartir contraseñas con amigos", correct: false }
    ]
  },
  {
    question: "Qué hacer si alguien intenta chantajearte con fotos o videos?",
    answers: [
      { text: "Enviar más fotos para calmarlo", correct: false },
      { text: "No ceder y contar a un adulto o autoridad", correct: true }, // posición 2
      { text: "Ignorar y sufrir en silencio", correct: false },
      { text: "Reírte del chantaje", correct: false }
    ]
  },
  {
    question: "Cuál es un ejemplo de ciberacoso que debes reportar?",
    answers: [
      { text: "Hacer memes graciosos sin dañar a nadie", correct: false },
      { text: "Publicar tus actividades escolares", correct: false },
      { text: "Difusión de rumores, insultos o amenazas en redes", correct: true }, // posición 3
      { text: "Comentar positivamente en fotos de amigos", correct: false }
    ]
  },
  {
    question: "Si un amigo es víctima de cyberbullying, lo adecuado es:",
    answers: [
      { text: "Difundir los mensajes para mostrar la situación", correct: false },
      { text: "Decirle que lo ignore y no haga nada", correct: false },
      { text: "Reírte de la situación", correct: false },
      { text: "Escucharlo, apoyarlo y animarlo a pedir ayuda", correct: true } // posición 4
    ]
  },
  {
    question: "Cómo puedes contribuir a un ambiente seguro en internet?",
    answers: [
      { text: "Respetando a otros y reportando contenido dañino", correct: true }, // posición 1
      { text: "Participando en burlas y rumores en redes", correct: false },
      { text: "Publicando fotos de otras personas sin permiso", correct: false },
      { text: "Ignorando mensajes ofensivos de todos", correct: false }
    ]
  },
  {
    question: "Cuál es lo más importante para prevenir el ciberacoso?",
    answers: [
      { text: "Compartir contraseñas con amigos", correct: false },
      { text: "Educar sobre respeto, privacidad y comunicación segura en línea", correct: true }, // posición 2
      { text: "Publicar todo lo que haces en internet", correct: false },
      { text: "Participar en cadenas de mensajes ofensivos", correct: false }
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
  window.location.href = '../index.html'; // Ajusta la ruta según tu estructura
});

startQuiz();
