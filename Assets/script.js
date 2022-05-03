const startButton = document.getElementById("start-btn");

const bannerSection = document.getElementById("bannersectio");

const mainElement = document.getElementById("main");

const clearbutton = document.createElement("button");

const button2 = document.createElement("button");

var score = 0;

//current question index
let questionindex = 0;

const questions = [
  {
    text: "What is the most commonly dispensed drug in Pharmacy",
    options: ["Paracetamol", "Amlodipine", "Simvastatin", "Betahistine"],
    answer: "Paracetamol",
  },
  {
    text: "How many flu vaccinations do pharmacies in England do each year",
    options: ["500 Thousand", "1 million", "3 million", "4 million"],
    answer: "4 Million",
  },
  {
    text: "Who regulates pharmacies in England",
    options: ["RPS", "GPHC", "PSNC", "APPG"],
    answer: "GPHC",
  },
  {
    text: "Which of these services does pharmacy do in England",
    options: [
      "Referall to Hospitals",
      "Diabetic Foot Check",
      "Blood Pressure Screening",
      "HIV screening",
    ],
    answer: "Blood Pressure Screening",
  },
  {
    text: "What is the most common category of medicine for minor illess treated over the counter",
    options: ["Constipation", "Pain", "Atheletes Foot", "Coughs/Colds"],
    answer: "Pain",
  },
];
var timeEl = document.querySelector(".time");
// Selects element by id
var mainEl = document.getElementById("mainn");
var secondsLeft = 60;
var score = 0;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft;
    // const getCat = function (obj) {};
    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }
  }, 1000);
}

function sendMessage() {
  alert("Time Has Run Out!");
  removeQuestion();
  document.getElementById("feedback-form").remove();
}

const handleFormSubmit = (event) => {
  event.preventDefault();

  //get full name from input
  const fullName = document.getElementById("full-name").value;
  ///validiate
  if (fullName) {
    const feedbackResults = JSON.parse(localStorage.getItem("feedbackResults"));
    //build object with fullname and results
    const result = {
      fullName,
      score,
    };
    //push back to local storage
    storeInLS("allResults", result);

    //clear results in local storage
    localStorage.removeItem("feedbackResults");

    //remove submit form.
    document.getElementById("feedback-form").remove();

    highscores();
  } else {
    alert("Please enter your name");
  }
};

const handleoptionclick = (event) => {
  //getcurrent target
  const currenttarget = event.currentTarget;
  // get target
  const target = event.target;
  console.log(currenttarget);
  console.log(target.tagName);

  if (target.tagName == "LI") {
    //get option user clicked
    const value = target.getAttribute("data-value");
    console.log(value);

    //get the question user clicked
    const question = questions[questionindex].text;
    const answer = questions[questionindex].answer;
    console.log(question);
    if (answer === target.textContent) {
      score += 10;
    } else {
      secondsLeft -= 10;
    }

    //Store answer in local storage
    storeInLS("feedbackResults", answer);
  }

  // go to next question
  removeQuestion();

  if (questionindex < questions.length - 1) {
    questionindex += 1;
    renderQuestion();
  } else {
    //if last question then render results
    // renderResults();
    renderForm();
    //remove previous questions
  }

  const renderResults = () => {
    console.log("render results");
  };
};

//render the highscores page--------------------------------
const highscores = () => {
  console.log("highscores");
  const section = document.createElement("section");
  section.setAttribute("id", "bannersectio");
  section.setAttribute("id", "feedback-form");
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "title");
  h2.textContent = "Your Score is " + score + " out of 40";
  const h3 = document.createElement("h3");
  h3.setAttribute("class", "title");
  const table2 = document.createElement("highscorestable");
  const buttonDiv = document.createElement("div");
  const buttondiv2 = document.createElement("div");
  buttonDiv.setAttribute("class", "form-control");
  buttondiv2.setAttribute("class", "form-control");
  button2.setAttribute("type", "submit");
  button2.setAttribute("class", "btn");
  clearbutton.setAttribute("type", "submit");
  clearbutton.setAttribute("class", "btn");
  clearbutton.textContent = "Play Again";
  button2.textContent = "Clear Scores";

  buttonDiv.append(button2);
  buttondiv2.append(clearbutton);
  section.append(h2, h3, table2, buttonDiv, buttondiv2);

  mainElement.append(section);

  var hst = document.getElementById("highscorestable");

  var retrievedScores = JSON.parse(localStorage.getItem("allResults"));

  localStorage.setItem("score", JSON.stringify(score));

  for (var i = 0; i <= retrievedScores.length; i++) {
    hst.innerHTML +=
      "<tr><td>" +
      retrievedScores[i].fullName +
      "</td><td>" +
      retrievedScores[i].score +
      "</td></tr>";
  }
};

function handleclearbutton() {
  window.location.assign("https://jeerjs.github.io/Jeerjs_HomeWork_04/");
}

function Handlereset() {
  localStorage.clear();
  console.log("I am working");
}

//function to render the form
const renderForm = () => {
  console.log("render form");
  const section = document.createElement("section");
  section.setAttribute("class", "feedback-form-section");
  section.setAttribute("id", "feedback-form");

  const h2 = document.createElement("h2");
  h2.setAttribute("class", "title");
  h2.textContent = "Submit your feedback";

  const form = document.createElement("form");

  const inputDiv = document.createElement("div");
  inputDiv.setAttribute("class", "form-control");

  const input = document.createElement("input");
  input.setAttribute("id", "full-name");
  input.setAttribute("class", "form-input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Enter full name");

  inputDiv.append(input);

  const buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "form-control");

  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.setAttribute("class", "btn");
  button.textContent = "Submit";

  buttonDiv.append(button);

  form.append(inputDiv, buttonDiv);

  section.append(h2, form);

  mainElement.append(section);
  // add event listener for form submission
  form.addEventListener("submit", handleFormSubmit);
};

//function to render question to page
const renderQuestion = () => {
  //get current question
  const currentQuestion = questions[questionindex];
  //target main to move question to main area
  const mainElement = document.getElementById("main");
  //create section
  const section = document.createElement("section");
  section.setAttribute("class", "content-section question-container");
  section.setAttribute("id", "question-container");
  //create h2
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "content-section-title");
  //this is a dynamic question
  h2.textContent = currentQuestion.text;
  //create ul and append 4 li
  const ul = document.createElement("ul");
  ul.setAttribute("class", "feedback-list");

  //call a function to create an li and append - loop
  const li1 = document.createElement("li");
  li1.setAttribute("class", "list-item");
  li1.setAttribute("data-value", currentQuestion.options[0]);
  li1.textContent = currentQuestion.options[0];

  const li2 = document.createElement("li");
  li2.setAttribute("class", "list-item");
  li2.setAttribute("data-value", currentQuestion.options[1]);
  li2.textContent = currentQuestion.options[1];

  const li3 = document.createElement("li");
  li3.setAttribute("class", "list-item");
  li3.setAttribute("data-value", currentQuestion.options[2]);
  li3.textContent = currentQuestion.options[2];

  const li4 = document.createElement("li");
  li4.setAttribute("class", "list-item");
  li4.setAttribute("data-value", currentQuestion.options[3]);
  li4.textContent = currentQuestion.options[3];

  ul.append(li1, li2, li3, li4);

  section.append(h2, ul);

  //append to main element
  mainElement.append(section);

  //add event listner on click of an answer li in section
  section.addEventListener("click", handleoptionclick);
};

//remove previous question
const removeQuestion = () => {
  document.getElementById("question-container").remove();
};

//remove banner
const removeBanner = () => {
  bannerSection.remove();
};

const storeInLS = (key, value) => {
  //get feeback results from LS
  const arrayFromLS = JSON.parse(localStorage.getItem(key));
  //push answer to array
  arrayFromLS.push(value);
  //set feebackresult in LS
  localStorage.setItem(key, JSON.stringify(arrayFromLS));
};
const initialiseLocalStorage = () => {
  //get feedback from local strpage
  const feedbackResultsFormLS = JSON.parse(
    localStorage.getItem("feedbackResults")
  );

  const allResultsFromLS = JSON.parse(localStorage.getItem("allResults"));

  if (!feedbackResultsFormLS) {
    //if not exsist create empty array
    localStorage.setItem("feedbackResults", JSON.stringify([]));
  }

  if (!allResultsFromLS) {
    //if not exsist create empty array
    localStorage.setItem("allResults", JSON.stringify([]));
  }
};

//declare the event handler function for start button click
const handleStartButtonClick = () => {
  //initialise local storage
  initialiseLocalStorage();
  renderQuestion();
  removeBanner();
  setTime();
};

//

startButton.addEventListener("click", handleStartButtonClick);
clearbutton.addEventListener("click", handleclearbutton);
button2.addEventListener("click", Handlereset);
