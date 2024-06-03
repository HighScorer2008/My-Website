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
            const thumbnail = item.snippet.thumbnails.default.url;

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
                <img src="${thumbnail}" alt="${title}">
                <p class="description">${shortDescription}${viewMore}</p>
                <button onclick="openModal('${videoId}')">Play Video</button>
            `;

            searchResults.appendChild(videoElement);
        });
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        searchResults.innerHTML = '<p>There was an error fetching the search results. Please try again later.</p>';
    }
}

// Google Sign-In
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    document.querySelector('.signout-button').style.display = 'block';
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        document.querySelector('.signout-button').style.display = 'none';
    });
}

// Modal functions
function openModal(videoId) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-button" onclick="closeModal(this)">×</button>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function closeModal(button) {
    const modal = button.parentElement.parentElement;
    modal.style.display = 'none';
    document.body.removeChild(modal);
}
