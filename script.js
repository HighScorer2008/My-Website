document.addEventListener('DOMContentLoaded', function() {
  const viewCountElement = document.getElementById('view-count');
  let viewCount = parseInt(localStorage.getItem('viewCount')) || 0;
  viewCount++;
  localStorage.setItem('viewCount', viewCount);
  viewCountElement.textContent = viewCount;

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

  // Initialize Google Sign-In
  initGoogleSignIn();
});

// Function to initialize Google Sign-In
function initGoogleSignIn() {
  gapi.load('auth2', function() {
    auth2 = gapi.auth2.init({
      client_id: '91688335727-pjd58hv414s20092ekslgect9hkh811d.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: 'profile email'
    });
    attachSignin(document.getElementById('g_id_signin'));
  });
}

// Function to attach sign-in event handler to the Google Sign-In button
function attachSignin(element) {
  auth2.attachClickHandler(element, {},
    function(googleUser) {
      onSignIn(googleUser);
    }, function(error) {
      console.error('Sign-in error: ' + error);
    });
}

// Function to handle sign-in
function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  document.getElementById('profilePicContainer').innerHTML = `<img src="${profile.getImageUrl()}" alt="Profile Picture">`;
}

// Function to handle sign-out
function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    document.getElementById('profilePicContainer').innerHTML = '';
  });
}

async function searchYouTube() {
  const searchInput = document.getElementById('searchInput').value;
  const searchResults = document.getElementById('searchResults');
  const apiKey = 'AIzaSyB0kFtzqbuBldEKQHb8GQ34l5lD7KlpV60';

  if (searchInput.trim() === '') {
    alert('Please enter search keywords');
    return;
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchInput)}&type=video&key=${apiKey}&maxResults=10`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('API quota exceeded or API key invalid.');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
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
      videoElement.className = 'video-result';
      videoElement.innerHTML = `
        <h3>${title}</h3>
        <button onclick="openVideo('${videoId}', '${title}', '${description}')">Watch Video</button>
      `;
      searchResults.appendChild(videoElement);
    });
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    alert(error.message);
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
  modal.style.display = 'none';
  videoFrame.src = ''; // Resetting the video frame source
}

let isDescriptionExpanded = false;

function toggleDescription() {
    const videoDescription = document.getElementById('videoDescription');
    const readMoreBtn = document.getElementById('readMoreBtn');
    
    if (!isDescriptionExpanded) {
        videoDescription.style.maxHeight = 'none'; // Expand the description
        readMoreBtn.textContent = 'Read Less'; // Change button text
    } else {
        videoDescription.style.maxHeight = '80px'; // Collapse the description
        readMoreBtn.textContent = 'Read More'; // Change button text
    }
    
    isDescriptionExpanded = !isDescriptionExpanded; // Toggle flag
}

function openVideo(videoId, title, description) {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    const readMoreBtn = document.getElementById('readMoreBtn');

    videoTitle.textContent = title;
    videoDescription.textContent = description;
    videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
    modal.style.display = 'block';
    
    // Check if the description is longer than the max height
    if (videoDescription.scrollHeight > videoDescription.clientHeight) {
        readMoreBtn.style.display = 'block'; // Display Read More button
    } else {
        readMoreBtn.style.display = 'none'; // Hide Read More button if not needed
    }
}

