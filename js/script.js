import users from './data.js';

const displayContactList = [];
const pages = Math.ceil(users.length / 10 );
let pageCount = 1;

document.querySelector(".total-contacts").innerHTML = `Total: ${users.length}`


const contactInfos = (contactList) => {
  for (let i = 0; i < contactList.length; i++) {
    const joinedFullDate = contactList[i].registered.date.split("-");
    
    const joinedYear = joinedFullDate[0];
    const joinedMonth = joinedFullDate[1];
    const joinedDate = joinedFullDate[2].slice(0, 2);
    if ((i + 1) % 10 == 1) {

      displayContactList.push(`<ul class='contact-list page-${pageCount++}'>`);
      displayContactList.push(
        `<li class="contact-item cf">
          <div class="contact-details">
            <img class="avatar" src="${contactList[i].picture.medium}">
            <h3>${contactList[i].name.first} ${contactList[i].name.last}</h3>
            <span class="email">${contactList[i].email}</span>
          </div>
          <div class="joined-details"><span class="date">${joinedMonth}/${joinedDate}/${joinedYear}</span></div>
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
          <div class="joined-details"><span class="date">${joinedMonth}/${joinedDate}/${joinedYear}</span></div>
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

const displayPges = pages => {
  const temp = [];
  for (let i = 0; i < pages; i++) {
    temp.push(
      `<li class="page-num-list"><a href="#" class="page-num page-num-${i + 1}">${i + 1}</a></li>`
    )
  }
  return temp.join('');
}

const pageNums = document.getElementsByClassName('page-num');

document.querySelector(".pages").innerHTML = displayPges(pages);
let currentPage = 1;


const displayCurrentPage = (pageNum) => {
  currentPage = pageNum;
  for (let i = 0; i < pages; i++) {
    const page = i + 1;
    
    if (i + 1 != currentPage) {
      document.querySelector(`.page-${page}`).classList.add('hide');
      document.querySelector(`.page-${page}`).classList.remove('active');
      document.querySelector(`.page-num-${page}`).classList.remove('active-link');
    } else {
      document.querySelector(`.page-${page}`).classList.add('active');
      document.querySelector(`.page-${page}`).classList.remove('hide');
      document.querySelector(`.page-num-${page}`).classList.add('active-link');
    }
  }
}

displayCurrentPage(currentPage);
const changePage = (e) => {
  displayCurrentPage(parseInt(e.target.innerHTML));
  addEventListenerToPageNum();
}

const addEventListenerToPageNum = () => {
  for (let i = 0; i < pageNums.length; i++) {
    if (i + 1 != currentPage) {
      pageNums[i].addEventListener("click", changePage);
      pageNums[i].classList.remove("disabled-link");
    } else {
      pageNums[i].classList.add("disabled-link");
    }
  }
}

addEventListenerToPageNum();


/**
 * references:
 * https://stackoverflow.com/questions/32151704/addeventlistener-is-not-a-function
 * https://css-tricks.com/multiple-class-id-selectors/
 * https://www.w3schools.com/cssref/css3_pr_pointer-events.php
 * 
 */