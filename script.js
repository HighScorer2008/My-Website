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
    const apiKey = 'AIzaSyB0kFtzqbuBldEKQHb8GQ34l5lD7KlpV60'; // Replace with your YouTube Data API key

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
                shortDescription = description.slice(0, 100) + '...';
                viewMore = `<span class="view-more" onclick="this.previousSibling.textContent = '${description}'; this.style.display='none';">View More</span>`;
            }

            videoElement.innerHTML = `
                <h3 class="video-title">${title}</h3>
                <p class="description">${shortDescription}${viewMore}</p>
                <div class="play-button" onclick="playVideo('${videoId}')">
                    <button>Play Video</button>
                </div>
            `;

            searchResults.appendChild(videoElement);
        });
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        searchResults.innerHTML = '<p>There was an error fetching the search results. Please try again later.</p>';
    }
}

// Function to play video in a popup
function playVideo(videoId) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.width = "560";
    iframe.height = "315";
    iframe.allowFullscreen = true;
    modal.appendChild(iframe);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Close the modal when the user clicks outside of it
    modal.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
}

// Google Sign-In callback
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId());
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
}

// Google Sign-Out
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
