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
    const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Replace with your YouTube Data API key

    console.log('Search input:', searchInput);

    if (searchInput.trim() === '') {
        alert('Please enter search keywords');
        return;
    }

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchInput)}&type=video&key=${apiKey}&maxResults=10`);
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

            videoElement.innerHTML = `
                <img src="${thumbnail}" alt="${title}">
                <h3>${title}</h3>
                <p class="description">${description}</p>
                <iframe width="300" height="169" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;

            searchResults.appendChild(videoElement);
        });
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        searchResults.innerHTML = '<p>There was an error fetching the search results. Please try again later.</p>';
    }
}
