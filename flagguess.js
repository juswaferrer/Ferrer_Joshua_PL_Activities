const apiLink = 'https://restcountries.com/v3.1/all';
let flags = [];
let currentQuestion = 0;

async function fetchData() {
  try {
    if (!navigator.onLine) {
      throw new Error('No internet connection detected.');
    }

    const response = await fetch(apiLink);
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API.');
    }

    const data = await response.json();
    flags = data.map(item => ({
      image: item.flags.png,
      countryName: item.name.common
    }));
    shuffle(flags);

    loadQuestion();
    checkInternet();

  } catch (error) {
    const errorElement = document.getElementById('result');
    errorElement.textContent = 'Failed to load. Please check your internet connection and Refresh.';
    disableButtons();
  }
}

function loadQuestion() {
  const flagImage = document.getElementById('flag-image');
  flagImage.src = flags[currentQuestion].image;
  document.getElementById('result').textContent = '';
}

function checkAnswer() {
  const userAnswer = document.getElementById('country-input').value.trim();
  const correctAnswer = flags[currentQuestion].countryName;
  const resultDisplay = document.getElementById('result');

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    resultDisplay.textContent = userAnswer+' is Correct!, Please Click "Next"';
    resultDisplay.style.color = 'green';
  } else {
    resultDisplay.textContent = `Incorrect! The correct answer is ${correctAnswer}.\nClick "Next" for another try.`;
    resultDisplay.style.color = 'red';
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= flags.length) {
    currentQuestion = 0;
  }
  document.getElementById('country-input').value = '';
  loadQuestion();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function disableButtons() {
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('next-btn').disabled = true;
}

function enableButtons() {
  document.getElementById('submitBtn').disabled = false;
  document.getElementById('next-btn').disabled = false;
}

function checkInternet() {
  if (navigator.onLine) {
    enableButtons();
  } else {
    disableButtons();
  }
}

document.getElementById('result').textContent = 'Loading Flag images...';
fetchData();

document.getElementById('submitBtn').addEventListener('click', checkAnswer);
document.getElementById('next-btn').addEventListener('click', nextQuestion);