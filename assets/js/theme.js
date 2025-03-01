document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    loadSavedTheme();
});

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Save theme preference
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        
        // Update toggle icon
        updateThemeIcon(isDarkTheme);
    });
}

function loadSavedTheme() {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // Check if user prefers dark theme in their system settings
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply dark theme if saved as dark or if user prefers dark and has no saved preference
    const shouldApplyDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    if (shouldApplyDark) {
        document.body.classList.add('dark-theme');
        updateThemeIcon(true);
    }
    
    // Add transition after theme is initially set
    setTimeout(() => {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }, 100);
}

function updateThemeIcon(isDark) {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const icon = toggle.querySelector('i');
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
    const savedTheme = localStorage.getItem('theme');
    
    // Only auto-switch if user hasn't manually set a theme
    if (!savedTheme) {
        if (e.matches) {
            document.body.classList.add('dark-theme');
            updateThemeIcon(true);
        } else {
            document.body.classList.remove('dark-theme');
            updateThemeIcon(false);
        }
    }
});

// Add theme transition styles
const style = document.createElement('style');
style.textContent = `
    /* Theme transition styles */
    .theme-transition,
    .theme-transition *,
    .theme-transition *:before,
    .theme-transition *:after {
        transition: all 0.3s ease !important;
        transition-delay: 0 !important;
    }
`;
document.head.appendChild(style);

// Add class before theme switch and remove after
function handleThemeTransition() {
    document.documentElement.classList.add('theme-transition');
    setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
    }, 300);
}

// Update theme toggle to handle transitions
document.getElementById('theme-toggle')?.addEventListener('click', handleThemeTransition);
