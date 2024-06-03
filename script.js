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
    const apiKey = 'AIzaSyB0kFtzqbuBldEKQHb8GQ34l5lD7KlpV60'; // Replace with your new YouTube Data API key

    console.log('Search input:', searchInput);

    if (searchInput.trim() === '') {
        alert('Please enter search keywords');
        return;
    }

    try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchInput)}&type=video&key=${apiKey}&maxResults=10`;
        console.log('API Request URL:', url);

        const response = await fetch(url);

        // Check if the response is OK (status 200)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        console.log('API response:', data);

        // Clear previous results
        searchResults.innerHTML = '';

        // Check if there are any results
        if (data.items.length === 0) {
            searchResults.innerHTML = '<p>No results found</p>';
            return;
        }

        // Display results
        data.items.forEach(item => {
            const videoId = item.id.videoId;
            const title = item.snippet.title;
            const description = item.snippet.description;

            const videoElement = document.createElement('div');
            videoElement.classList.add('video-result');

            // Truncate long descriptions
            let shortDescription = description;
            let viewMore = '';
            if (description.length > 100) {
                shortDescription = description.slice(0, 100);
                viewMore = `<span class="read-more" onclick="showMore(this)">...<span class="show-more"> Read more</span></span>`;
            }

            videoElement.innerHTML = `
                <h3>${title}</h3>
                <iframe width="300" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
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

// Your existing JavaScript code

// Function to display the user's profile picture
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var profilePicContainer = document.getElementById('profilePicContainer');
  var profilePic = document.createElement('img');
  profilePic.src = profile.getImageUrl();
  profilePic.alt = 'Profile Picture';
  profilePicContainer.appendChild(profilePic);
}

// Function to open the modal and display the YouTube video
function openModal(videoId) {
  var modal = document.getElementById('videoModal');
  var videoFrame = document.getElementById('videoFrame');
  videoFrame.src = 'https://www.youtube.com/embed/' + videoId;
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  var modal = document.getElementById('videoModal');
  var videoFrame = document.getElementById('videoFrame');
  videoFrame.src = '';
  modal.style.display = 'none';
}

// Event listener to close the modal when clicking outside of it
window.onclick = function(event) {
  var modal = document.getElementById('videoModal');
  if (event.target == modal) {
    closeModal();
  }
}

// Your existing JavaScript code

// Function to display the user's profile picture
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var profilePicContainer = document.getElementById('profilePicContainer');
  var profilePic = document.createElement('img');
  profilePic.src = profile.getImageUrl();
  profilePic.alt = 'Profile Picture';
  profilePicContainer.appendChild(profilePic);
}

// Function to open the modal and display the YouTube video
function openModal(videoId) {
  var modal = document.getElementById('videoModal');
  var videoFrame = document.getElementById('videoFrame');
  videoFrame.src = 'https://www.youtube.com/embed/' + videoId;
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  var modal = document.getElementById('videoModal');
  var videoFrame = document.getElementById('videoFrame');
  videoFrame.src = '';
  modal.style.display = 'none';
}

// Event listener to close the modal when clicking outside of it
window.onclick = function(event) {
  var modal = document.getElementById('videoModal');
  if (event.target == modal) {
    closeModal();
  }
}
