const links = document.querySelectorAll('.link');
const li = document.querySelectorAll('li');
const anchors = document.querySelectorAll('a[href*="#"]');
const filterBox = document.querySelectorAll('.work');

// MENU

// Add Anchors Scroll With Animation
for (let anchor of anchors) {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();
    const blockID = anchor.getAttribute('href')
    document.querySelector('' + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
};

// Add Active Links Style for Main Menu
for (let index = 0; index < links.length; index++) {
  links[index].addEventListener("click", (event) => {
    links.forEach(el => el.classList.remove("a-active"));
    event.currentTarget.classList.add("a-active");
  });
};

//PORTFOLIO

//Add Portfolio Filter 

document.querySelector('.portfolio-list').addEventListener('click', (event) => {

  if (event.target.tagName !== 'LI') return false;
  let filterClass = event.target.dataset['f'];

  filterBox.forEach(elem => {
    elem.classList.remove('hide');
    if (!elem.classList.contains(filterClass) && filterClass !== 'all') {
      elem.classList.add('hide');
    }
  });
});

// Add Active Links Style for Portfolio
for (let index = 0; index < links.length; index++) {
  li[index].addEventListener("click", (event) => {
    li.forEach(el => el.classList.remove("a-active"));
    event.currentTarget.classList.add("a-active");
  });
};

