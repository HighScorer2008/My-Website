document.querySelector('.menu-icon').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

document.getElementById("openTab").addEventListener("click", function() {
    window.open(window.location.href, '_blank');
});
// JavaScript for Interactive Cards
document.querySelectorAll('section').forEach(section => {
    section.addEventListener('mouseover', () => {
        section.style.transform = 'scale(1.05)';
    });
    section.addEventListener('mouseout', () => {
        section.style.transform = 'scale(1)';
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

document.getElementById('modeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});


