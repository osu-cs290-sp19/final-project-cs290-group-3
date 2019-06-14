// Sidenav toggle
var isNavHidden = true; // Inital position
var sideBarWidth = "20%";
var sidebarButton = document.getElementById("sidebar-hide-button");
sidebarButton.addEventListener('click', toggleNav);
toggleNav();

function toggleNav() {
  if(isNavHidden) {
    document.getElementById("sidebar").style.width = sideBarWidth;
    document.getElementById("main").style.marginLeft = sideBarWidth;
    document.getElementById("main").style.width = "78%";    // container width minus sidebar width
    document.getElementById("sidebar-hide-button").style.left = sideBarWidth;
    document.getElementById("hide-button-content").innerText = "<";
    isNavHidden = false;
  } else {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("main").style.width = "98%";    // default container width
    document.getElementById("sidebar-hide-button").style.left = "0";
    document.getElementById("hide-button-content").innerText = ">";
    isNavHidden = true;
  }
}

//nightmode
var nightmode = document.getElementsByClassName('settings-button')[0];
var day = localStorage['day'] || 'true';
setNightMode();
nightmode.addEventListener('click', function(event) {
  if(day === 'true'){
    day = 'false';
    localStorage['day']='false';
  }else{
    day = 'true';
    localStorage['day']='true';
  };
  setNightMode();
});

function setNightMode() {
  var posties = document.getElementsByClassName('post'), i, len;
  var backgc = document.getElementsByTagName('body');
  var replies = document.getElementsByClassName('reply-container');
  var createrep = document.getElementsByClassName('create-reply');
  var inputs = document.querySelectorAll('input[type=text]');
  var buttons = document.getElementsByTagName('button');

  var root = document.documentElement;

  if(day === 'true'){
    root.style.setProperty('--mainBackgroundColor', '#323147');
    root.style.setProperty('--sideBarBackgroundColor', '#13110f');
    root.style.setProperty('--sideBarBorderColor', '#453d34');
    root.style.setProperty('--postBackgroundColor', '#13110f');
    root.style.setProperty('--postBorderColor', '#453d34');
    root.style.setProperty('--textColor', '#9f9791');
    root.style.setProperty('--buttonBackgroundColor', '#323147');
    root.style.setProperty('--buttonBackgroundHoverColor', '#453d34');
  } else {
    root.style.setProperty('--mainBackgroundColor', '');
    root.style.setProperty('--sideBarBackgroundColor', '');
    root.style.setProperty('--sideBarBorderColor', '');
    root.style.setProperty('--postBackgroundColor', '');
    root.style.setProperty('--postBorderColor', '');
    root.style.setProperty('--textColor', '');
    root.style.setProperty('--buttonBackgroundColor', '');
    root.style.setProperty('--buttonBackgroundHoverColor', '');
  }
  for (i = 0, len = inputs.length; i < len; i++) {   //changes the input field color
    if(day === 'true'){
      inputs[i].style.backgroundColor = '#13110f'  //nightmode input
      inputs[i].style.color = '#9f9791';
    } else {
      inputs[i].style.backgroundColor = ''   //day reply
      inputs[i].style.color = '';
    }
  };
  for (i = 0, len = posties.length; i < len; i++) {   //changes the post border color and background color
    if(day === 'true'){
      posties[i].style.border = '2px solid #453d34' //nightmode border color
      posties[i].style.backgroundColor = '#13110f'  //nightmode bg color
    } else {
      posties[i].style.border = '' //day border
      posties[i].style.backgroundColor = ''   //day bg
    }
  };
  for (i = 0, len = backgc.length; i < len; i++) {  //changes the main background color
    if(day === 'true'){
      backgc[i].style.backgroundColor = '#323147'   //night main bg
      backgc[i].style.color = '#9f9791';            //night text
    } else {
      backgc[i].style.backgroundColor = ''   //day main bg
      backgc[i].style.color = '';              //day text
    }
  };
  for (i = 0, len = replies.length; i < len; i++) {   //changes the reply color
    if(day === 'true'){
      replies[i].style.border = '2px solid #453d34' //nightmode border color
      replies[i].style.backgroundColor = '#13110f'  //nightmode reply
    } else {
      replies[i].style.border = ''   //day border
      replies[i].style.backgroundColor = ''   //day reply
    }
  };
  for (i = 0, len = createrep.length; i < len; i++) {   //changes the create reply.
    if(day === 'true'){
      createrep[i].style.backgroundColor = '#13110f'  //nightmode create reply
    } else {
      createrep[i].style.backgroundColor = ''   //day
    }
  };
  if(day === 'true'){
    document.getElementById('sidebar').style.backgroundColor = '#13110f'   //night sidebar
  } else {
    document.getElementById('sidebar').style.backgroundColor = ''}   //day side
  if(day === 'true'){
    document.getElementById('sidebar-hide-button').style.backgroundColor = '#13110f'  //night button
  } else {
    document.getElementById('sidebar-hide-button').style.backgroundColor = ''   //day button
  }
}

// Add event listener to all posts and pass clicked element to postEventListener function
var postElements = document.getElementsByClassName("post-and-replies");
for(var i = 0; i < postElements.length; i++) {
  postElements[i].addEventListener('click', postEventListener);
}

function postEventListener(event) {
  if(event.target.classList.contains("view-button")){
    toggleReplies(event);
  } else if(event.target.classList.contains("reply-button")) {
    showCreateReply(event);
  } else if(event.target.classList.contains("cancel-reply-button")) {
    hideCreateReply(event);
  } else if(event.target.classList.contains("create-reply-button")) {
    postReply(event);
  } else if(event.target.classList.contains("like-button")) {
    incPostLikes(event);
  } else if(event.target.classList.contains("thread-button")) {
    threadView(event);
  } else if(event.target.classList.contains("report-button")){
    report(event);
  } else if(event.target.classList.contains("approve-button")){
    keep(event);
  } else if(event.target.classList.contains("delete-button")){
    remove(event);
  }
}

// Toggle Replies
function toggleReplies(event) {
  if(event.target.parentNode.parentNode.parentNode.childNodes[5].classList.contains("hide2")) {
    event.target.parentNode.parentNode.parentNode.childNodes[5].classList.remove("hide2");
    event.target.innerText = "Hide Replies";
  } else {
    event.target.parentNode.parentNode.parentNode.childNodes[5].classList.add("hide2");
    event.target.innerText = "View Replies";
  }
}

// Show Create Reply
function showCreateReply(event) {
  if(event.target.parentNode.parentNode.parentNode.childNodes[3].classList.contains("hide2")) {
    event.target.parentNode.parentNode.parentNode.childNodes[3].classList.remove("hide2");
  }
}

// Hide Create Reply
function hideCreateReply(event) {
  if(!event.target.parentNode.classList.contains("hide2")) {
    event.target.parentNode.classList.add("hide2");
    event.target.parentNode.childNodes[1].childNodes[1].value = "";
  }
}

// Send request to increment like on a post
function incPostLikes(event) {
  var request = new XMLHttpRequest();
  var postId = event.target.parentNode.parentNode.getAttribute('postId');
  var requestURL = '/' + postId + '/addLike';
  request.open('POST', requestURL);
  var previousTarget = event.target;
  request.addEventListener('load', function (event) {
    if (event.target.status !== 200) {
      var message = event.target.response;
      alert("Error incrementing likes in database: " + message);
    } else {
      previousTarget.childNodes[0].innerText = event.target.response;
    }
  });

  request.send();
}

// sends to the thread View
function threadView(event) {
  var postId = event.target.parentNode.parentNode.getAttribute('postId');
  var requestURL = '/thread/' + postId;
  window.location.href = requestURL;
}

// Enable replies and create reply by default on thread view
var splitURL = window.location.href.split("/");
var endOfURL = splitURL[splitURL.length-2];
if(endOfURL === 'thread') {
  var replyContainer = document.getElementsByClassName('reply-container')[0];
  replyContainer.classList.remove("hide2");
  replyContainer.parentNode.childNodes[1].childNodes[9].childNodes[5].innerText = "Hide Replies";
  var createReply = document.getElementsByClassName('create-reply')[0];
  createReply.classList.remove("hide2");
}

// Send reply data to the server
function postReply(event) {
  if (event.target.parentNode.childNodes[1].childNodes[1].value) {
    var request = new XMLHttpRequest();
    var postId = event.target.parentNode.parentNode.childNodes[1].getAttribute('postId');

    var requestURL = '/' + postId + '/addReply';
    request.open('POST', requestURL);
    var replyObj = {
      "text": event.target.parentNode.childNodes[1].childNodes[1].value
    };
    var requestBody = JSON.stringify(replyObj);
    request.setRequestHeader (
      'Content-Type', 'application/json'
    );
    var previousTarget = event.target;
    request.addEventListener('load', function (event) {
      if (event.target.status !== 200) {
        var message = event.target.response;
        alert("Error storing reply in database: " + message);
      } else {
        // Update UI to show that the reply was successfully stored.
        previousTarget.parentNode.childNodes[1].childNodes[1].value = "";
      }
    });

    request.send(requestBody);
  }
}


//report button
function report(event) {
  var request = new XMLHttpRequest();
  var postId = event.target.parentNode.parentNode.getAttribute('postId');
  var requestURL = '/' + postId + '/reported';
  request.open('POST', requestURL);
  var previousTarget = event.target;
  request.addEventListener('load', function (event) {

    if(event.target.status !== 200){
      var message = event.target.response;
      alert("Error reporting post!");
    }
    else {
      alert("Sorry about the offensive posts :(, Moderators will look at the post soon.");
    }
    });
  request.send();
}

var splitURL = window.location.href.split("/");
var endOfURL = splitURL[splitURL.length-2];
if(endOfURL === 'admin') {
  var button = document.getElementsByClassName("report-button");
  var approve = document.getElementsByClassName("approve-button");
  var delet = document.getElementsByClassName("delete-button");
  console.log(button.length);
  for(var i = 0; i < button.length; i++){
    button[i].classList.add("hide2");
    approve[i].classList.remove("hide2");
    delet[i].classList.remove("hide2");
    button[i].parentNode.parentNode.childNodes[5].style.paddingRight = "110px";
  }
}

function keep(event){
  var request = new XMLHttpRequest();
  var postId = event.target.parentNode.parentNode.getAttribute('postId');
  var requestURL = '/' + postId + '/approve';
  request.open('POST', requestURL);
  var previousTarget = event.target;
  request.addEventListener('load', function (event) {

    if(event.target.status !== 200){
      var message = event.target.response;
      alert("Error accepting post!");
    }
    else {
      previousTarget.parentNode.parentNode.style.display = "none";
    }
    });
  request.send();
}

function remove(event){
  var request = new XMLHttpRequest();
  var postId = event.target.parentNode.parentNode.getAttribute('postId');
  var requestURL = '/' + postId + '/delete';
  request.open('POST', requestURL);
  var previousTarget = event.target;
  request.addEventListener('load', function (event) {

    if(event.target.status !== 200){
      var message = event.target.response;
      alert("Error deleting post!");
    }
    else {
      previousTarget.parentNode.parentNode.style.display = "none";
    }
    });
  request.send();
}

var newPostButton = document.getElementsByClassName('new-post-button');
newPostButton[0].addEventListener('click', handleNewPostButton);

function handleNewPostButton(event) {
  console.log('New Twit was clicked');
  var srcElement = document.getElementsByClassName('hide');
  for(var i = 0; i < srcElement.length; i++) {
    srcElement[i].style.display = 'block';
  }
}

var closeButton = document.getElementsByClassName('close-button');
closeButton[0].addEventListener('click', handleCloseButton);

function handleCloseButton(event) {
  console.log('close button was clicked');
  srcElement = document.getElementsByClassName('hide');
  for(i = 0; i < srcElement.length; i++) {
    srcElement[i].style.display = 'none';
  }
  document.getElementById('post-text').value = "";
  document.getElementById('picture-text').value = "";
  document.getElementById('topic-text').value = "";
}

var cancelButton = document.getElementsByClassName('cancel-button');
cancelButton[0].addEventListener('click', handleCancelButton);

function handleCancelButton(event){
  console.log('cancel button was clicked');
  srcElement = document.getElementsByClassName('hide');
  for(i = 0; i < srcElement.length; i++){
    srcElement[i].style.display = 'none';
  }
  document.getElementById('post-text').value = "";
  document.getElementById('picture-text').value = "";
  document.getElementById('topic-text').value = "";
}

var acceptButton = document.getElementsByClassName('accept-button');
acceptButton[0].addEventListener('click', handleAcceptButton)

function handleAcceptButton(event) {
  console.log('accept was clicked');
  if (document.getElementById("topic-text").value && document.getElementById("picture-text").value && document.getElementById("post-text").value) {
    request = new XMLHttpRequest();
    var pagetitle = document.getElementById("topic-text").value;

    requestURL = '/' + pagetitle + '/addPost';
    request.open('POST', requestURL);
    var postObj = {
      "img": document.getElementById("picture-text").value,
      "txt": document.getElementById("post-text").value
    };
    requestBody = JSON.stringify(postObj);
    request.setRequestHeader (
      'Content-Type', 'application/json'
    );
    previousTarget = event.target;
    request.addEventListener('load', function (event) {
      if (event.target.status !== 200) {
        message = event.target.response;
        alert("Error storing in database: " + message);
      }
    });
    request.send(requestBody);
  } else {
    alert("Must enter something in all 3 boxes");
    return;
  }
  srcElement = document.getElementsByClassName('hide');
  for(i = 0; i <srcElement.length; i++) {
    srcElement[i].style.display = 'none';
  }
  document.getElementById('post-text').value = "";
  document.getElementById('picture-text').value = "";
  document.getElementById('topic-text').value = "";
}

//search bar
var searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', function(event) {
  var searchbar = searchInput.value.toLowerCase();
  var input = document.getElementsByClassName('post-and-replies');
  console.log("Searchbar Value:", searchbar);
  for(var i = 0; i < postElements.length; i++){
    //console.log(input[i].innerText);
    if(!input[i].innerText.toLowerCase().includes(searchbar))
      input[i].style.display = "none";
    else {
      input[i].style.display = "";
    }
  }
});

//database search
var search = document.getElementById('search-button');
search.addEventListener('click', function(event) {
  var searchTerm = searchInput.value;
  var requestURL = '/search/' + searchTerm;
  window.location.href = requestURL;
});
