// set variables API key and URL to connect NASA
var api_key = 'oQIg8NB7obbpiDJAHXa14atG3hKq5NEUYLleumtY';
var main_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${api_key}`

// set localStorage
localStorage.setItem("start", '0');

var displayCount = 10;

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
  let images = res.photos;
  localStorage.setItem("size", images.length.toString());
  loadBigImage(images[0]);
  loadSmallImages(images, 0);
}

function loadBigImage(image) {
  document.getElementById('big-image').src=image.img_src;
  document.getElementById('camera').textContent = `Camera : ${image.camera.full_name}`;
  document.getElementById('launch').textContent = `Launched : ${image.rover.launch_date}`;
  document.getElementById('land').textContent = `Landed : ${image.rover.landing_date}`;
  document.getElementById('url').textContent = `url : ${image.img_src}`;
}

function loadSmallImages(images, start) {
  let arraySize = parseInt(localStorage.getItem("size"));
  let end = (start+displayCount >= arraySize) ? arraySize :
                                                start+displayCount ;
  if (end < arraySize) {
    localStorage.setItem("start", end.toString());
  }

  let DOMimages = document.querySelector('.image-list');
  for (let i=start; i < end; i++ ){
    let DOMli = document.createElement('li');
    DOMli.innerHTML = `<img src="${images[i].img_src}" />`
    DOMimages.appendChild(DOMli);
  }
  document.querySelector('.more-images').style.display = 'block';
}


