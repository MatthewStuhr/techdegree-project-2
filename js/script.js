/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
//Create your global variables
const studentListItems = document.querySelectorAll('li.student-item');
const pageNumberLimit = 10;
const studentName = document.querySelectorAll('h3');
const headDiv = document.querySelector('div.page-header.cf');
const studentListUl = document.querySelector('ul.student-list');

function createElement(elementName, attribute, value) {
  const element = document.createElement(elementName);
  element[attribute] = value;
  return element;
}
//function which hides the remainder of the students from the list
function hideAllStudents() {
  for (let i = 0; i < studentListItems.length; i += 1) {
    studentListItems[i].style.display = 'none';
  }
}
// this function displays according to the list length on the page, and the page number
function showPage(list, page) {
  const startIndex = (page * pageNumberLimit) - pageNumberLimit;
  const endIndex = page * pageNumberLimit;

  hideAllStudents();

    for(let i = startIndex; i < endIndex; i += 1) {
      if (list[i]) {
        list[i].style.display = 'block';
    }
  }
}
//Handles no results returned
  const h2 = document.createElement('h2');
  studentListUl.appendChild(h2);
  h2.textContent = 'No results were found';
  h2.style.display = 'none';

//The search bar function
function searchBar() {
  const parentDiv = document.querySelector('div.page-header');
  const div = createElement('div', 'className', 'student-search');
  parentDiv.appendChild(div);
  const input = createElement('input', 'placeholder', 'Search for students...');
  div.appendChild(input);
  const button = createElement('button', 'textContent', 'Search');
  div.appendChild(button);
//Adds functionality to the search bar function and handles no results returned
  button.addEventListener('click', (e) => {
    h2.style.display = 'none';
    hideAllStudents();

    let searchResults = [];

    for (let i = 0; i < studentListItems.length; i += 1) {
        if(studentName[i].textContent.toUpperCase().includes
           (input.value.toUpperCase()))
      {studentName[i].style.display = 'block';
       searchResults.push(studentListItems[i]);
      }
    }
        if (searchResults.length === 0) {
          h2.style.display = 'block';
    }
//Paginate search results
    showPage(searchResults, 1);
    const otherDiv = document.querySelector('div.pagination');
    appendPageLinks(searchResults);
    otherDiv.remove();
  });
}

// this function appends the links to the DOM and adds functionality
function appendPageLinks(list) {
  const numberOfPages = (list.length / pageNumberLimit);
  const parentDiv = document.querySelector('div.page');
  const div  = createElement('div', 'className', 'pagination');
  parentDiv.appendChild(div);
  const ul = createElement('ul', 'className', 'pagination');
  div.appendChild(ul);

  for (let i = 0; i < numberOfPages; i += 1) {
    const li = document.createElement('li');
      ul.appendChild(li);
    const a = document.createElement('a');
      li.appendChild(a);
      a.textContent = i + 1;
      a.href = "#";
      if (a.textContent === '1') {
        a.className = 'active';
    }
  }
    ul.addEventListener('click', (e) => {
      const a = ul.querySelectorAll('a');
        for (let i = 0; i < a.length; i += 1) {
          a[i].className = '';
        }
      const activeLink = e.target;
        activeLink.className = "active";
        showPage(list, parseInt(activeLink.textContent));
    });
  }

appendPageLinks(studentListItems);
showPage(studentListItems, 1);
searchBar();
