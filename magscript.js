document.addEventListener('DOMContentLoaded', function() {
    // Get the current page filename
    var currentPage = window.location.pathname.split('/').pop();

    // Get all navigation links
    var navLinks = document.querySelectorAll('nav a');

    // Loop through each navigation link
    navLinks.forEach(function(link) {
        // If the link's href matches the current page, mark it as active
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Full-screen button functionality
    var fullScreenBtn = document.getElementById("fullScreenBtn");
    var pdfViewer = document.getElementById("pdf-viewer");
    
    fullScreenBtn.addEventListener("click", function() {
        if (pdfViewer.requestFullscreen) {
            pdfViewer.requestFullscreen();
        } else if (pdfViewer.mozRequestFullScreen) { /* Firefox */
            pdfViewer.mozRequestFullScreen();
        } else if (pdfViewer.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            pdfViewer.webkitRequestFullscreen();
        } else if (pdfViewer.msRequestFullscreen) { /* IE/Edge */
            pdfViewer.msRequestFullscreen();
        }
    });
});

document.querySelectorAll('.open-in-new-tab-button').forEach(function(button) {
    button.addEventListener('click', function() {
        var pdfSrc = this.parentElement.querySelector('embed').src;
        window.open(pdfSrc, '_blank');
    });
});

document.getElementById("openTab").addEventListener("click", function() {
    var currentUrl = window.location.href;
    window.open(currentUrl, '_blank');
});

// JavaScript for toggling full screen
document.querySelectorAll('.fullscreen-button').forEach(function(button) {
    button.addEventListener('click', function() {
        var pdfContainer = this.parentElement;
        toggleFullScreen(pdfContainer);
    });
});

function toggleFullScreen(element) {
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// JavaScript for toggling full screen
document.querySelectorAll('.fullscreen-button').forEach(function(button) {
    button.addEventListener('click', function() {
        var pdfContainer = this.parentElement;
        toggleFullScreen(pdfContainer);
        
        // Change subheading font color to white
        var subheading = pdfContainer.querySelector('.subheading');
        subheading.classList.toggle('white-text');
    });
});

// JavaScript for toggling dark mode
document.getElementById("modeToggle").addEventListener("click", function() {
    toggleDarkMode();
});

function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
    var modeToggle = document.getElementById("modeToggle");
    if (body.classList.contains("dark-mode")) {
        modeToggle.textContent = "Light Mode";
    } else {
        modeToggle.textContent = "Dark Mode";
    }
}
// JavaScript for toggling dark mode
document.getElementById("modeToggle").addEventListener("click", function() {
    toggleDarkMode();
    updateTheme();
});

function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
    var modeToggle = document.getElementById("modeToggle");
    if (body.classList.contains("dark-mode")) {
        modeToggle.textContent = "Light Mode";
        modeToggle.classList.remove("light-mode");
        modeToggle.classList.add("dark-mode-button");
    } else {
        modeToggle.textContent = "Dark Mode";
        modeToggle.classList.remove("dark-mode-button");
        modeToggle.classList.add("light-mode");
    }
}

function updateTheme() {
    var sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        section.classList.toggle("dark-mode");
    });
    var header = document.querySelector('header');
    header.classList.toggle("dark-mode");
    var footer = document.querySelector('footer');
    footer.classList.toggle("dark-mode");
}

// JavaScript for toggling dark mode
document.getElementById("modeToggle").addEventListener("click", function() {
    toggleDarkMode();
    updateTheme();
});

function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
    var modeToggle = document.getElementById("modeToggle");
    if (body.classList.contains("dark-mode")) {
        modeToggle.textContent = "Light Mode";
        modeToggle.classList.remove("light-mode");
        modeToggle.classList.add("dark-mode-button");
    } else {
        modeToggle.textContent = "Dark Mode";
        modeToggle.classList.remove("dark-mode-button");
        modeToggle.classList.add("light-mode");
    }
}

function updateTheme() {
    var sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        section.classList.toggle("dark-mode");
    });
    var header = document.querySelector('header');
    header.classList.toggle("dark-mode");
    var footer = document.querySelector('footer');
    footer.classList.toggle("dark-mode");
    var navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function(link) {
        link.classList.toggle("dark-mode");
    });
}

