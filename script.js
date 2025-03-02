// Array of quiz questions and answers 
const questions = [
  {
    question: "Pick the right property of a CSS display?",
    answer: [
      { text: "Flex", correct: true },
      { text: "Arial-shadow", correct: false },
      { text: "display", correct: false },
      { text: "content-line", correct: false },
      { text: "color", correct: false },
    ]
  },
  {
    question: "What tag is used in breaking lines/sentences in HTML?",
    answer: [
      { text: "em", correct: false },
      { text: "li", correct: false },
      { text: "br", correct: true },
      { text: "a", correct: false },
      { text: "color", correct: false },
    ]
  },
  {
    question: "Pick the right re-usable variable?",
    answer: [
      { text: "selector", correct: false },
      { text: "Array", correct: false },
      { text: "const", correct: false },
      { text: "Const-line", correct: false },
      { text: "let", correct: true },
    ]
  },
  {
    question: "What do you understand by (CSS)?",
    answer: [
      { text: "For styling", correct: true },
      { text: "For structuring", correct: false },
      { text: "For luck", correct: false },
      { text: "For-line", correct: false },
      { text: "Enjoyment", correct: false },
    ]
  },
  {
    question: "What value does the href attribute contain",
    answer: [
      { text: "The URL or path of a resource", correct: true },
      { text: "Alternate text of an image", correct: false },
      { text: "The position of an alement", correct: false },
      { text: "The size of a container", correct: false },
      { text: "The visibility of the element", correct: false },
    ]
  },
  {
    question: "Full meaning of FTP?",
    answer: [
      { text: "File Trophy Protocol", correct: false },
      { text: "Arial-shadow", correct: false },
      { text: "File Teleporting Protocol", correct: false },
      { text: "File-line Transfer Protocol", correct: false },
      { text: "File Transfer Protocol", correct: true },
    ]
  }
];

// Selecting necessary elements from the DOM
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");

// Variables to track the current question index and score
let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

// Function to display the current question and answers
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // Looping through answer choices and create buttons for them
  currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// Function to reset the state before displaying the next question
function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

// Function to handle answer selection
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // Show the correct answer even if the user selects the wrong one
  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

// Function to show the quiz score after the quiz ends
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length} 🥳🎊🎉`;
  nextButton.style.display = "none";
  restartButton.style.display = "block"; // Show the restart button
}

// Function to handle next button click
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Adding event listener to the next button
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
})

startQuiz();


// Function to restart the quiz
function restartQuiz() {
  startQuiz(); // Restart the quiz from the beginning
  restartButton.style.display = "none"; // Hide the restart button
}


// Adding event listener to the Restart button
restartButton.addEventListener("click", restartQuiz);