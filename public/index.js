var isNavHidden = true; // Inital position
var sideBarWidth = "20%";
var sidebarButton = document.getElementById("sidebar-hide-button");
sidebarButton.addEventListener('click', toggleNav);

function toggleNav() {
  if(isNavHidden) {
    document.getElementById("sidebar").style.width = sideBarWidth;
    document.getElementById("main").style.marginLeft = sideBarWidth;
    document.getElementById("sidebar-hide-button").style.left = sideBarWidth;
    document.getElementById("hide-button-content").innerHTML = "<";
    isNavHidden = false;
  } else {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("sidebar-hide-button").style.left = "0";
    document.getElementById("hide-button-content").innerHTML = ">";
    isNavHidden = true;
  }
}

var addPost = document.getElementById(whatever the button name is);

addPost.addEventListener('click', handleNewPost);

function handleNewPost() {
  console.log('New post button was clicked');
  var srcElement = document.getElementByClassName(whatever the hidden class of new post modal is);
  for(var i = 0; i < srcElement.length; i++) {
    srcElement[i].style.dispaly = 'block';
  }
}

var button = document.getElementsByClassName(close post button);

button[0].addEventListener('click', handlePostCloseButton);

function handlePostCloseButton(event) {
        console.log('close button was clicked');
        srcele = document.getElementsByClassName(whatever hidden class of modal is);
        for(i = 0; i <srcele.length; i++){
                srcele[i].style.display = 'none';
        }
        document.getElementById('twit-text-input').value = "";
        document.getElementById('twit-attribution-input').value = "";
}



button = document.getElementsByClassName(post X button);

button[0].addEventListener('click', handlePostCancelButton);

function handlePostCancelButton(event) {
        console.log('cancel button was clicked');
        srcele = document.getElementsByClassName(whatever hidden class of modal is);
        for(i = 0; i <srcele.length; i++){
                srcele[i].style.display = 'none';
        }
        document.getElementById('twit-text-input').value = "";
        document.getElementById('twit-attribution-input').value = "";
}

