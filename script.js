function updateDateTime() {
    const dateTimeElement = document.getElementById("datetime");
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateTimeString = now.toLocaleDateString('en-US', options);
    dateTimeElement.textContent = dateTimeString;
}

// Update date and time every second
setInterval(updateDateTime, 1000);

updateDateTime(); // Initial update

function searchYouTube() {
    const searchInput = document.getElementById("searchInput").value;
    const searchResults = document.getElementById("searchResults");

    // Your YouTube Data API key
    const apiKey = 'AIzaSyB0kFtzqbuBldEKQHb8GQ34l5lD7KlpV60'; // Replace with your actual API key

    // Clear previous search results
    searchResults.innerHTML = '';

    // Create a new script element to load the YouTube API
    const script = document.createElement('script');

    // Set the maxResults parameter to 72 to get 72 results
    script.src = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${searchInput}&maxResults=72&callback=handleResponse`;

    document.body.appendChild(script);
}

// This is the callback function that will handle the response from the YouTube API
function handleResponse(data) {
    const searchResults = document.getElementById("searchResults");
    const videos = data.items;

    searchResults.classList.add('grid-container'); // Add grid layout to search results

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        const videoDescription = video.snippet.description;

        // Create a div to hold each video result
        const videoResult = document.createElement("div");
        videoResult.className = "video-result";

        // Create an iframe to embed the video
        const videoFrame = document.createElement("iframe");
        videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
        videoFrame.title = videoTitle;
        videoFrame.allowFullscreen = true;

        // Create elements for video title and description
        const titleElement = document.createElement("h2");
        titleElement.textContent = videoTitle;

        const descriptionElement = document.createElement("div");
        descriptionElement.className = "description";
        descriptionElement.textContent = videoDescription;

        const readMoreButton = document.createElement("span");
        readMoreButton.className = "read-more";
        readMoreButton.textContent = "Read More";
        readMoreButton.onclick = function() {
            descriptionElement.classList.toggle("show-more");
            readMoreButton.textContent = descriptionElement.classList.contains("show-more") ? "Read Less" : "Read More";
        };

        // Append elements to the video result div
        videoResult.appendChild(videoFrame);
        videoResult.appendChild(titleElement);
        videoResult.appendChild(descriptionElement);
        videoResult.appendChild(readMoreButton);

        // Append the video result to the searchResults div
        searchResults.appendChild(videoResult);
    });
}

function openNewTab() {
        window.open(window.location.href, '_blank');
    }
