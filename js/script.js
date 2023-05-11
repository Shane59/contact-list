import users from './data.js';

const displayContactList = [];
const pages = Math.ceil(users.length / 10 );
let pageCount = 1;

console.log(users.length);
document.querySelector(".total-contacts").innerHTML = `Total: ${users.length}`


const contactInfos = (contactList) => {
  for (let i = 0; i < contactList.length; i++) {
    if ((i + 1) % 10 == 1) {
      displayContactList.push(`<ul class='contact-list page-${pageCount++}'>`);
      displayContactList.push(
        `<li class="contact-item cf">
          <div class="contact-details">
            <img class="avatar" src="${contactList[i].picture.medium}">
            <h3>${contactList[i].name.first} ${contactList[i].name.last}</h3>
            <span class="email">${contactList[i].email}</span>
          </div>
          <div class="joined-details"><span class="date">${contactList[i].registered.date}</span></div>
        </li>`
      )
    } else {
      displayContactList.push(
        `<li class="contact-item cf">
          <div class="contact-details">
            <img class="avatar" src="${contactList[i].picture.medium}">
            <h3>${contactList[i].name.first} ${contactList[i].name.last}</h3>
            <span class="email">${contactList[i].email}</span>
          </div>
          <div class="joined-details"><span class="date">${contactList[i].registered.date}</span></div>
        </li>`
      )
    }
    if ((i + 1) % 10 == 0) {
      displayContactList.push("</ul>");
    } 
  }
}

console.log(displayContactList);

contactInfos(users);
document.querySelector(".list").innerHTML += displayContactList.join('');

// document.querySelector(".page-1").classList.add("active");

const changePage = (e) => {
  console.log(e.target.innerHTML);
  displayCurrentPage(parseInt(e.target.innerHTML));
}

const displayPges = pages => {
  const temp = [];
  for (let i = 0; i < pages; i++) {
    temp.push(
      `<li class="page-num">${i + 1}</li>`
    )
  }
  return temp.join('');
}

const pageNums = document.getElementsByClassName('page-num');

const addEventListenerToPageNum = () => {
  console.log('hi');
  for (let i = 0; i < pageNums.length; i++) {
    
    pageNums[i].addEventListener("click", changePage);
  }
}

document.querySelector(".pages").innerHTML = displayPges(pages);
addEventListenerToPageNum();
let currentPage = 1;
console.log(pages);


const displayCurrentPage = (pageNum) => {
  console.log(`page num is ${pageNum}`);
  
  currentPage = pageNum;
  for (let i = 0; i < pages; i++) {
    const page = i + 1;
    console.log(document.querySelector(`.page-${page}`));
    
    if (i + 1 != currentPage) {
      document.querySelector(`.page-${page}`).classList.add('hide');
      document.querySelector(`.page-${page}`).classList.remove('active');
    } else {
      document.querySelector(`.page-${page}`).classList.add('active');
      document.querySelector(`.page-${page}`).classList.remove('hide');
    }
  }
}

displayCurrentPage(currentPage);


/**
 * references:
 * https://stackoverflow.com/questions/32151704/addeventlistener-is-not-a-function
 */