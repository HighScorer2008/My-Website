document.addEventListener('DOMContentLoaded', function() {
  // View Counter
  const viewCountElement = document.getElementById('view-count');
  let viewCount = parseInt(localStorage.getItem('viewCount')) || 0;
  viewCount++;
  localStorage.setItem('viewCount', viewCount);
  viewCountElement.textContent = viewCount;

  // Clock
  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const datetimeElement = document.getElementById('datetime');
    datetimeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
  setInterval(updateClock, 1000);
  updateClock();
});

function openTab(tabName) {
  // Function to open a tab (implementation needed)
}

function openNewTab() {
  // Function to open a new tab (implementation needed)
}

async function searchYouTube() {
  const searchInput = document.getElementById('searchInput').value;
  const searchResults = document.getElementById('searchResults');
  const apiKey = 'YOUR_API_KEY'; // Replace with your YouTube Data API key

  if (searchInput.trim() === '') {
    alert('Please enter search keywords');
    return;
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchInput)}&type=video&key=${apiKey}&maxResults=10`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    searchResults.innerHTML = '';

    if (data.items.length === 0) {
      searchResults.innerHTML = '<p>No results found</p>';
      return;
    }

    data.items.forEach(item => {
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      const description = item.snippet.description;

      const videoElement = document.createElement('div');
      videoElement.classList.add('video-result');

      let shortDescription = description;
      let viewMore = '';
      if (description.length > 100) {
        shortDescription = description.slice(0, 100);
        viewMore = `<span class="read-more" onclick="showMore(this)">...<span class="show-more"> Read more</span></span>`;
      }

      videoElement.innerHTML = `
        <h3>${title}</h3>
        <button onclick="openVideo('${videoId}', '${title}', '${description}')">Play Video</button>
        <div class="description">${shortDescription}${viewMore}</div>
      `;
      searchResults.appendChild(videoElement);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to fetch data. Please try again later.');
  }
}

function showMore(element) {
  const showMoreSpan = element.querySelector('.show-more');
  const description = element.parentElement;
  if (showMoreSpan.textContent.trim() === 'Read more') {
    description.classList.add('expanded');
    showMoreSpan.textContent = ' Show less';
  } else {
    description.classList.remove('expanded');
    showMoreSpan.textContent = ' Read more';
  }
}

function openVideo(videoId, title, description) {
  const modal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  const videoTitle = document.getElementById('videoTitle');
  const videoDescription = document.getElementById('videoDescription');
  videoTitle.textContent = title;
  videoDescription.textContent = description;
  videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
  modal.style.display = 'block';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  videoFrame.src = '';
  modal.style.display = 'none';
}

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  const profilePicContainer = document.getElementById('profilePicContainer');
  profilePicContainer.innerHTML = `<img src="${profile.getImageUrl()}" alt="Profile Picture">`;
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    console.log('User signed out.');
    const profilePicContainer = document.getElementById('profilePicContainer');
    profilePicContainer.innerHTML = '';
  });
}
/* styles.css */
body {
  font-family: Arial, sans-serif;
}

#datetime-container {
  margin-bottom: 20px;
}

.tabs {
  margin-bottom: 20px;
}

button {
  margin-right: 10px;
  padding: 10px;
}

h1 {
  margin-bottom: 20px;
}

.search-container {
  margin-bottom: 20px;
}

#view-counter {
  margin-bottom: 20px;
}

.motivational-quote {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.signin-container {
  margin-bottom: 20px;
}

.productive-links {
  margin-bottom: 20px;
}

#searchResults .video-result {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.description {
  margin-top: 10px;
}

.read-more {
  cursor: pointer;
  color: blue;
}

.read-more .show-more {
  font-weight: bold;
}

.description.expanded {
  white-space: normal;
}

footer {
  margin-top: 20px;
  padding: 10px;
  background-color: #f1f1f1;
  text-align: center;
}
