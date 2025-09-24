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
    question: "Si ves que un compañero está siendo golpeado, ¿qué deberías hacer?",
    answers: [
      { text: "Avisar a un profesor o adulto responsable", correct: true }, // posición 1
      { text: "Ignorar la situación", correct: false },
      { text: "Reírte del incidente", correct: false },
      { text: "Unirte a la pelea", correct: false }
    ]
  },
  {
    question: "Para evitar peleas físicas en la escuela, lo mejor es:",
    answers: [
      { text: "Amenazar al otro", correct: false },
      { text: "Resolver los conflictos hablando y escuchando", correct: true }, // posición 2
      { text: "Golpear primero para defenderte", correct: false },
      { text: "Ignorar a los demás", correct: false }
    ]
  },
  {
    question: "Si un amigo te propone pelear con alguien, lo correcto es:",
    answers: [
      { text: "Grabarlo y subirlo a redes", correct: false },
      { text: "Aceptar para no perder su amistad", correct: false },
      { text: "Decirle que no y buscar ayuda de un adulto", correct: true }, // posición 3
      { text: "Invitar a más personas a pelear", correct: false }
    ]
  },
  {
    question: "Cómo puedes proteger a un compañero que sufre violencia física?",
    answers: [
      { text: "Aislarlo de otros amigos", correct: false },
      { text: "Animándolo a vengarse", correct: false },
      { text: "Publicando lo que pasa en redes", correct: false },
      { text: "Alertando a autoridades escolares o familiares", correct: true } // posición 4
    ]
  },
  {
    question: "Qué es una forma de prevenir la violencia física en la escuela?",
    answers: [
      { text: "Golpear primero si te insultan", correct: false },
      { text: "Gritar a otros cuando estés molesto", correct: false },
      { text: "Practicar la empatía y el respeto hacia los demás", correct: true }, // posición 3
      { text: "Evitar hablar con compañeros que te caen mal", correct: false }
    ]
  },
  {
    question: "Si notas tensión entre compañeros, lo adecuado es:",
    answers: [
      { text: "Difundir rumores sobre ellos", correct: false },
      { text: "Intentar mediar y calmar la situación", correct: true }, // posición 2
      { text: "No hacer nada y esperar que se calme", correct: false },
      { text: "Unirse a la pelea", correct: false }
    ]
  },
  {
    question: "Qué acción ayuda a reducir la violencia física en la escuela?",
    answers: [
      { text: "Fomentar actividades de convivencia y trabajo en equipo", correct: true }, // posición 1
      { text: "Exigir respeto usando amenazas", correct: false },
      { text: "Reírse de peleas entre otros", correct: false },
      { text: "Evitar hablar con compañeros conflictivos", correct: false }
    ]
  },
  {
    question: "Si un compañero intenta lastimarte, lo correcto es:",
    answers: [
      { text: "Golpear primero para defenderte", correct: false },
      { text: "Alejarse y pedir ayuda a un adulto", correct: true }, // posición 2
      { text: "Ignorar y esperar que se vaya", correct: false },
      { text: "Grabarlo y subirlo a redes sociales", correct: false }
    ]
  },
  {
    question: "Cómo puedes contribuir a un ambiente libre de violencia física?",
    answers: [
      { text: "Avergonzando a quienes pelean", correct: false },
      { text: "Forzando a otros a obedecer", correct: false },
      { text: "Respetando límites y promoviendo la comunicación", correct: true }, // posición 3
      { text: "Gritando cuando alguien hace algo mal", correct: false }
    ]
  },
  {
    question: "Qué es lo más importante para prevenir la violencia física entre adolescentes?",
    answers: [
      { text: "Usar la fuerza para que no vuelvan a pelear", correct: false },
      { text: "Aislar a los adolescentes conflictivos", correct: false },
      { text: "Hacer castigos físicos para enseñar disciplina", correct: false },
      { text: "Educar sobre el respeto, la empatía y el autocontrol", correct: true } // posición 4
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
