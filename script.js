const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Fetch API
const count = 10;
const apiKey = "6e362Q0Gl6zn5T8Ui9iTgd9VSGCAGt4AkjbucKYDwPE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create function to help set attributes on Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for the photos and links
function displayPhotos() {
  // run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create anchor element to link to API
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

// On Load
getPhotos();
