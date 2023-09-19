// DOM elements
const startBtn = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const submitForm = document.getElementById('submit-form');
const initialsInput = document.getElementById('initials');
const finalScore = document.getElementById('final-score');
const timerElement = document.getElementById('timer');
const startScreen = document.getElementById('start-screen');

// Event listener for start button click
startBtn.addEventListener('click', startQuiz);

// Array of quiz questions
const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "a) Hyper Transfer Markup Language",
      "b) Hyper Text Makeup Language",
      "c) Hyper Text Markup Language",
      "d) Hyper Transfer Makeup Language"
    ],
    answer: "c) Hyper Text Markup Language"
  },
  {
    question: "Which programming language is known for its use in web development and is often used for creating dynamic web applications?",
    options: ["a) Java", "b) Python", "c) PHP", "d) C++"],
    answer: "c) PHP"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "a) Cascading Style Sheet",
      "b) Computer Style Sheet",
      "c) Creative Style Sheet",
      "d) Cascading Sheet Style"
    ],
    answer: "a) Cascading Style Sheet"
  },
  {
    question: "In Python, which of the following is used to define a function?",
    options: ["a) func", "b) function", "c) def", "d) define"],
    answer: "c) def"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 600; // 10 minutes in seconds
let timerInterval;

// Function to start the quiz
function startQuiz() {
  hideElement(startScreen);
  showElement(quizScreen);

  startTimer();

  displayQuestion();
}

// Function to hide an element
function hideElement(element) {
  element.classList.add('hidden');
}

// Function to show an element
function showElement(element) {
  element.classList.remove('hidden');
}

// Function to start the timer
function startTimer() {
  timerElement.textContent = formatTime(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0 || currentQuestionIndex >= quizQuestions.length) {
      clearInterval(timerInterval);
      endQuiz();
    }

    timerElement.textContent = formatTime(timeLeft);
  }, 1000);
}

// Function to format the remaining time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  const questionElement = document.createElement('h3');
  questionElement.textContent = currentQuestion.question;
  quizScreen.appendChild(questionElement);

  // Add the timer element to the question page
  quizScreen.appendChild(timerElement);

  currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement('button');
    optionButton.textContent = option;
    optionButton.addEventListener('click', () => {
      if (option === currentQuestion.answer) {
        score++;
      } else {
        timeLeft -= 60; // Deduct 1 minute (60 seconds) for incorrect answers
      }

      currentQuestionIndex++;
      clearQuizScreen();

      if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    });

    quizScreen.appendChild(optionButton);
  });
}

// Function to clear the quiz screen
function clearQuizScreen() {
  quizScreen.innerHTML = '';
}

// Function to end the quiz
function endQuiz() {
  hideElement(quizScreen);
  showElement(endScreen);
  finalScore.textContent = score;
}

// Add event listener for form submission
submitForm.addEventListener('submit', submitFormHandler);

// Function to handle form submission
function submitFormHandler(event) {
  event.preventDefault();
  const initials = initialsInput.value.trim();

  // Handle the form submission, e.g., saving high score
  // You can use the 'score' variable to save the score
}

// Start the quiz
hideElement(quizScreen);
hideElement(endScreen);
showElement(startScreen);
startBtn.addEventListener('click', startQuiz);