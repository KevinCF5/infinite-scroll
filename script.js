// Fetch API
const count = 10;
const apiKey = "6e362Q0Gl6zn5T8Ui9iTgd9VSGCAGt4AkjbucKYDwPE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch {
    // error
  }
}

// On Load
getPhotos();
