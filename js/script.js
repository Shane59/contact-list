import users from './data.js';

const displayedContactList = [];
const totalPage = Math.ceil(users.length / 10 );

const userItem = (image, first, last, email, joinedMonth, joinedDate, joinedYear) => {
  return (
    `<li class="contact-item cf">
      <div class="contact-details">
        <img class="avatar" src="${image}">
        <h3>${first} ${last}</h3>
        <span class="email">${email}</span>
      </div>
      <div class="joined-details"><span class="date">${joinedMonth}/${joinedDate}/${joinedYear}</span></div>
    </li>`
  )
}

let pageCount = 1;
const pageDivider = 10;
const addUsersToContactList = (contactList) => {
  for (let i = 0; i < contactList.length; i++) {
    const joinedFullDate = contactList[i].registered.date.split("-");
    const joinedYear = joinedFullDate[0];
    const joinedMonth = joinedFullDate[1];
    const joinedDate = joinedFullDate[2].slice(0, 2);

    if ((i + 1) % pageDivider == 1) {
      displayedContactList.push(`<ul class='contact-list page-${pageCount++}'>`);
    }
    displayedContactList.push(
      userItem(contactList[i].picture.medium,
        contactList[i].name.first, contactList[i].name.last,
        contactList[i].email, joinedMonth, joinedDate, joinedYear)
    );
    if ((i + 1) % pageDivider == 0) {
      displayedContactList.push("</ul>");
    } 
  }
}

const numOfPages = totalPage => {
  const pageElements = [];
  for (let i = 0; i < totalPage; i++) {
    pageElements.push(
      `<li class="page-num-list"><a href="#" class="page-num page-num-${i + 1}">${i + 1}</a></li>`
    )
  }
  return pageElements.join('');
}

let currentPage = 1;
const displayCurrentPage = (pageNum) => {
  currentPage = pageNum;
  for (let i = 0; i < totalPage; i++) {
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

const changePage = (e) => {
  displayCurrentPage(parseInt(e.target.innerHTML));
  addOrRemoveEventListenerToPageNum();
}

const pageNums = document.getElementsByClassName('page-num');

const addOrRemoveEventListenerToPageNum = () => {
  for (let i = 0; i < pageNums.length; i++) {
    if (i + 1 != currentPage) {
      pageNums[i].addEventListener("click", changePage);
      pageNums[i].classList.remove("disabled-link");
    } else {
      pageNums[i].classList.add("disabled-link");
    }
  }
}

addUsersToContactList(users);
document.querySelector(".list").innerHTML += displayedContactList.join('');
document.querySelector(".total-contacts").innerHTML = `Total: ${users.length}`
document.querySelector(".pages").innerHTML = numOfPages(totalPage);
addOrRemoveEventListenerToPageNum();
displayCurrentPage(currentPage);

/**
 * references:
 * https://stackoverflow.com/questions/32151704/addeventlistener-is-not-a-function
 * https://css-tricks.com/multiple-class-id-selectors/
 * https://www.w3schools.com/cssref/css3_pr_pointer-events.php
 * 
 */