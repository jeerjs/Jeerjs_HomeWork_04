const startButton = document.getElementById("start-btn");

const bannerSection = document.getElementById("bannersectio");

//current question index
let questionindex = 0;

const questions = [
  {
    text: "Question 1",
    options: ["yes", "No", "Maybe"],
  },
  {
    text: "Question 2",
    options: ["yes", "No", "Maybe"],
  },
  {
    text: "Question 3",
    options: ["yes", "No", "Maybe"],
  },
  {
    text: "Question 4",
    options: ["yes", "No", "Maybe"],
  },
  {
    text: "Question 5",
    options: ["yes", "No", "Maybe"],
  },
];

const handleoptionclick = (event) => {
  //getcurrent target
  const currenttarget = event.currentTarget;
  // get target
  const target = event.target;
  console.log(currenttarget);
  console.log(target.tagName);

  if (target.tagName === "LI") {
    //get option user clicked
    const value = target.getAttribute("data-value");
    console.log(value);

    //get the question user clicked
    const question = questions[questionindex].text;
    console.log(question);

    //build the answer object and answer
    const answer = {
      question,
      value,
    };
    //Store answer in local storage
    storeAnswerInLS(answer);
  }

  // go to next question
  removeQuestion();

  if (questionindex < questions.length - 1) {
    questionindex += 1;
    renderQuestion();
  } else {
    //if last question then render results
    renderResults();
    renderform();
    //remove previous questions
  }

  const renderResults = () => {
    console.log("render results");
  };
  const renderForm = () => {
    console.log("render form");
  };
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

const storeAnswerInLS = (answer) => {
  //get feeback results from LS
  const feedbackResults = JSON.parse(localStorage.getItem("feedbackResults"));
  //push answer to array
  feedbackResults.push(answer);
  //set feebackresult in LS
  localStorage.setItem("feedbackResults", JSON.stringify(feedbackResults));
};
const initialiseLocalStorage = () => {
  //get feedback from local strpage
  const feedbackResultsFormLS = JSON.parse(
    localStorage.getItem("feedbackResults")
  );

  if (!feedbackResultsFormLS) {
    //if not exsist create empty array
    localStorage.setItem("feedbackResults", JSON.stringify([]));
  }
};

//declare the event handler function for start button click
const handleStartButtonClick = () => {
  //initialise local storage
  initialiseLocalStorage();
  renderQuestion();
  removeBanner();
};

startButton.addEventListener("click", handleStartButtonClick);
