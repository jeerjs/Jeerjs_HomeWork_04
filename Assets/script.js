const startButton = document.getElementById("start-btn");

const bannerSection = document.getElementById("bannersectio");

//function to render question to page
const renderQuestion = () => {};

//remove banner
const removeBanner = () => {
  console.log(removeBanner);
  bannerSection.remove();
};

//call render of question
renderQuestion();

//declare the event handler function for start button click
const handleStartButtonClick = () => {
  removeBanner();
};

//remove banner section on click and render first question
startButton.addEventListener("click", handleStartButtonClick);
