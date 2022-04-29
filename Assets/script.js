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
  ul.setAttribute("class", "feedback-list");

  //call a function to create an li and append - loop
  const li1 = document.createElement("li");
  li1.setAttribute("class", "list-item");
  li1.textContent = "Aneurin Bevan";

  const li2 = document.createElement("li");
  li2.setAttribute("class", "list-item");
  li2.textContent = "Margaret Thatcher";

  const li3 = document.createElement("li");
  li3.setAttribute("class", "list-item");
  li3.textContent = "Winston Churchill";

  const li4 = document.createElement("li");
  li4.setAttribute("class", "list-item");
  li4.textContent = "Henry VIII";

  ul.append(li1, li2, li3, li4);

  section.append(h2, ul);

  //append to main element
  mainElement.append(section);
};

//remove banner
const removeBanner = () => {
  bannerSection.remove();
};

//declare the event handler function for start button click
const handleStartButtonClick = () => {
  removeBanner();
  renderQuestion();
};

//remove banner section on click and render first question
startButton.addEventListener("click", handleStartButtonClick);
