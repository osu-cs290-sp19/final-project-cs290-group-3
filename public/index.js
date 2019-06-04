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
    document.getElementById("hide-button-content").innerHTML = "<";
    isNavHidden = false;
  } else {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("main").style.width = "98%";    // default container width
    document.getElementById("sidebar-hide-button").style.left = "0";
    document.getElementById("hide-button-content").innerHTML = ">";
    isNavHidden = true;
  }
}

/*var addPost = document.getElementById('new-post-button');

addPost.addEventListener('click', handleNewPost);

function handleNewPost() {
  console.log('New post button was clicked');
  var srcElement = document.getElementByClassName(hide);
  for(var i = 0; i < srcElement.length; i++) {
    srcElement[i].style.dispaly = 'block';
  }
}

var button = document.getElementsByClassName('close-button');

button[0].addEventListener('click', handlePostCloseButton);

function handlePostCloseButton(event) {
        console.log('close button was clicked');
        srcele = document.getElementsByClassName(hide);
        for(i = 0; i <srcele.length; i++){
                srcele[i].style.display = 'none';
        }
        document.getElementById(input for photo ID).value = "";
        document.getElementById('post-text').value = "";
}



button = document.getElementsByClassName('cancel-button');

button[0].addEventListener('click', handlePostCancelButton);

function handlePostCancelButton(event) {
        console.log('cancel button was clicked');
        srcele = document.getElementsByClassName(hide);
        for(i = 0; i <srcele.length; i++){
                srcele[i].style.display = 'none';
        }
        document.getElementById(input for photo ID).value = "";
        document.getElementById('post-text').value = "";
}*/
