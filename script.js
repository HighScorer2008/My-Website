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

    var modal = document.getElementById("videoModal");
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        closeVideoModal();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            closeVideoModal();
        }
    }

    // Add scroll event to exit fullscreen when user scrolls
    window.addEventListener('scroll', function() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });
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
    const readMore = document.getElementById('readMore');

    videoTitle.textContent = title;
    videoDescription.textContent = description;
    videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
    modal.style.display = 'flex';

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

function expandDescription() {
    const videoDescription = document.getElementById('videoDescription');
    const readMore = document.getElementById('readMore');
    videoDescription.classList.toggle('show-more');
    readMore.textContent = videoDescription.classList.contains('show-more') ? 'Read Less' : 'Read More';
}

document.addEventListener('DOMContentLoaded', (event) => {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showKonamiMessage();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function showKonamiMessage() {
        const message = document.createElement('div');
        message.className = 'konami-message';
        message.innerHTML = 'You have discovered the Konami Code!';
        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 5000);
    }
});
