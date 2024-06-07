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
});

function openTab(tabName) {
  if (tabName === 'Home') {
    window.location.reload(); // Reload the current page
  }
}

function openNewTab(url) {
  window.open(url, '_blank');
}

async function searchYouTube() {
  const searchInput = document.getElementById('searchInput').value;
  const searchResults = document.getElementById('searchResults');
  const apiKey = 'AIzaSyB0wNgUCd9rV46I2Ai6INs59XhxEhVFdTI'; // Replace with your actual API key

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
      const thumbnailUrl = item.snippet.thumbnails.default.url;

      const videoElement = document.createElement('div');
      videoElement.className = 'video-result';
      videoElement.innerHTML = `
        <img src="${thumbnailUrl}" alt="${title}">
        <h3>${title}</h3>
        <button class="watch-video-button" onclick="checkVideoAvailability('${videoId}', '${title}', '${description}')">Watch Video</button>
      `;
      searchResults.appendChild(videoElement);
    });
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    alert(error.message);
  }
}

function checkVideoAvailability(videoId, title, description) {
  const isVideoAvailable = Math.random() > 0.5; // Replace with actual condition
  if (!isVideoAvailable) {
    showErrorModal();
  } else {
    openVideo(videoId, title, description);
  }
}

// Replace the openVideo function with the updated one

function openVideo(videoId, title, description) {
  const modal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  const videoTitle = document.getElementById('videoTitle');
  const videoDescription = document.getElementById('videoDescription');
  const readMore = document.getElementById('readMore');

  videoTitle.textContent = title;
  videoDescription.textContent = description;
  videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
  modal.style.display = 'block';

  if (videoDescription.scrollHeight > videoDescription.clientHeight) {
    readMore.style.display = 'inline';
  } else {
    readMore.style.display = 'none';
  }
}


function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  modal.style.display = 'none';
  videoFrame.src = '';
}

function showErrorModal() {
  const modal = document.getElementById('errorModal');
  modal.style.display = 'block';
}

function closeErrorModal() {
  const modal = document.getElementById('errorModal');
  modal.style.display = 'none';
}

function expandDescription() {
  const videoDescription = document.getElementById('videoDescription');
  const readMore = document.getElementById('readMore');
  videoDescription.classList.toggle('show-more');
  readMore.textContent = videoDescription.classList.contains('show-more') ? 'Read Less' : 'Read More';
}
