const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Fetch API
let count = 5;
const apiKey = "6e362Q0Gl6zn5T8Ui9iTgd9VSGCAGt4AkjbucKYDwPE";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

// Create function to help set attributes on Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for the photos and links
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  // run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create anchor element to link to API site
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create image element for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each image is loaded
    img.addEventListener("load", imageLoaded);
    // Put image inside anchor, then put both inside image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch {
    // error
  }
}

// Check to see if scrolling near bottom of the page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
