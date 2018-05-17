// set variables API key and URL to connect NASA
var api_key = 'oQIg8NB7obbpiDJAHXa14atG3hKq5NEUYLleumtY';
var main_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${api_key}`

// set localStorage
localStorage.setItem("start", '0');
// initalize the conunt of images to display
var displayCount = 10;
var images;

var DOMstring = {
  previous: document.getElementById('previous'),
  next: document.getElementById('next'),
  images: document.querySelector('.more-images'),
  list: document.querySelector('.image-list')
}

setEventListener();

// get Response of main data in JSON type.
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.onreadystatechange = function() {
	if(xhr.readyState === XMLHttpRequest.DONE) {
    console.log(xhr.response);
    loadMain(xhr.response);
  }
};
xhr.open("GET", main_url, true);
xhr.send();

// load images
function loadMain(res) {
  images = res.photos;
  localStorage.setItem("size", images.length.toString());
  loadBigImage(images[0]);
  loadSmallImages();
}

function loadBigImage(image) {
  document.getElementById('big-image').src=image.img_src;
  document.getElementById('camera').textContent = `Camera : ${image.camera.full_name}`;
  document.getElementById('launch').textContent = `Launched : ${image.rover.launch_date}`;
  document.getElementById('land').textContent = `Landed : ${image.rover.landing_date}`;
  document.getElementById('url').textContent = `url : ${image.img_src}`;
}

function loadSmallImages() {
  let start = parseInt(localStorage.getItem('start'));
  let arraySize = parseInt(localStorage.getItem("size"));
  let end = (start+displayCount >= arraySize) ? arraySize :
                                                start+displayCount ;
  loadBigImage(images[start]);
  for (let i=start; i < end; i++ ){
    let e_li = document.createElement('li');
    e_li.innerHTML = `<img src="${images[i].img_src}" />`
    e_li.addEventListener('click', function() {
      loadBigImage(images[i]);
    })
    DOMstring.list.appendChild(e_li);
  }
  DOMstring.images.style.display = 'block';
  setButtonDisplay(start, arraySize);
}

function setButtonDisplay(start, arraySize) {
  let option = (start >= displayCount) ? 'block' : 'none'
  DOMstring.previous.style.display = option;
  option = (start+displayCount < arraySize) ? 'block' : 'none'
  DOMstring.next.style.display = option;     
}

function setEventListener() {
  DOMstring.previous.addEventListener('click', function() {
    removeAllChildren(DOMstring.list);
    let start = parseInt(localStorage.getItem('start'));
    console.log('before:',localStorage.getItem('start'))
    localStorage.setItem('start', (start-displayCount).toString());
    console.log('after', localStorage.getItem('start'))
    loadSmallImages();
  })

  DOMstring.next.addEventListener('click', function() {
    removeAllChildren(DOMstring.list);
    let start = parseInt(localStorage.getItem('start'));
    console.log('before:',localStorage.getItem('start'))
    localStorage.setItem('start', (start+displayCount).toString());
    console.log('after', localStorage.getItem('start'))
    loadSmallImages();
  })
}

function removeAllChildren(myNode) {
  // let myNode = document.getElementById(id);
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}
