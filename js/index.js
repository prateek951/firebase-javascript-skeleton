document.addEventListener("DOMContentLoaded", init);
//set the references
let guides;
// Links that are shown only to authenticated users
let loggedInLinks;
//links that are shown only to unauthenticated users
let loggedOutLinks;
let accountDetails;
let adminItems;
setRefs();

const setGuides = docs => {
  if (docs.length) {
    let output = "";
    docs.forEach(doc => {
      // console.log(doc.data());
      const { title, content } = doc.data();
      const li = `
      <li>
      <div class="collapsible-header grey lighten-4">${title}</div>
        <div class="collapsible-body white">
        <span>${content}</span>
      </div>
      </li>
    `;
      output += li;
    });
    guides.innerHTML = output;
  } else {
    guides.innerHTML = `<h5 class="center-align">Login to view guides</h5>`;
  }
};

//init configuration
function init() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
}
//any setting of references will go here
function setRefs() {
  guides = document.querySelector(".guides");
  loggedInLinks = document.querySelectorAll(".logged-in");
  loggedOutLinks = document.querySelectorAll(".logged-out");
  accountDetails = document.querySelector(".account-details");
  adminItems = document.querySelectorAll(".admin");
}

async function setUserInterface(user) {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => {
        item.style.display = "block";
      });
    }

    //account details
    const userExtras = await db
      .collection("users")
      .doc(user.uid)
      .get();
    //getting the extra information and setup the ui
    // console.log(userExtras.data().mobno);
    let html = `
          <h4>User Information</h4>
          <br>
          <h6>Logged in as ${user.email}</h6>
          <h6>First name :  ${userExtras.data().fname}</h6>
          <h6>Last name : ${userExtras.data().lname}</h6>
          <h6>Short Description: ${userExtras.data().des} </h6>
          <h6>Address : ${userExtras.data().address}</h6>
          <h6>Contact Number : ${userExtras.data().mobno}</h6>
          <h6>Pincode : ${userExtras.data().pincode}</h6>
          <h6>City : ${userExtras.data().city}</h6>
          <h6>State : ${userExtras.data().state}</h6>
          <h6>Country : ${userExtras.data().country}</h6>
          <div class="green-text"> ${user.admin ? 'Admin' : 'Member'}</div>
          `;
    accountDetails.innerHTML = html;
    loggedInLinks.forEach(link => (link.style.display = "block"));
    loggedOutLinks.forEach(link => (link.style.display = "none"));
  } else {
    //hide account details
    accountDetails.innerHTML = "";
    loggedInLinks.forEach(link => (link.style.display = "none"));
    loggedOutLinks.forEach(link => (link.style.display = "block"));
    adminItems.forEach(item => (item.style.display = "none"));
  }
}

//Any binding of events will go here
function bindEvents() {}
