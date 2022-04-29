const startButton = document.getElementById("start-btn");

const bannerSection = document.getElementById("bannersectio");

//function to render question to page
const renderQuestion = () => {
  //target main to move question to main area
  const mainElement = document.getElementById("main");
  //create section
  const section = document.createElement("section");
  section.setAttribute("class", "content-section question-container");
  //create h2
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "content-section-title");
  //this is a dynamic question
  h2.textContent = "Who founded the NHS?";
  //create ul and append 4 li
  const ul = document.createElement("ul");
  //Create div and append button
  const div = document.createElement("div");
};

//remove banner
const removeBanner = () => {
  console.log(removeBanner);
  bannerSection.remove();
};

//declare the event handler function for start button click
const handleStartButtonClick = () => {
  removeBanner();
};

//remove banner section on click and render first question
startButton.addEventListener("click", handleStartButtonClick);
