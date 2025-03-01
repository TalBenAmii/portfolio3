document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
    initThemeToggle();
});

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        // Get the current theme before toggling
        const isDarkTheme = document.body.classList.contains('dark-theme');
        
        // Remove both classes first
        document.body.classList.remove('light-theme', 'dark-theme');
        
        // Add the opposite theme
        const newTheme = isDarkTheme ? 'light' : 'dark';
        document.body.classList.add(`${newTheme}-theme`);
        
        // Save theme preference
        localStorage.setItem('theme', newTheme);
    });
}

function loadSavedTheme() {
    // First, check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // If there's a saved preference, use it
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(`${savedTheme}-theme`);
    } else {
        // If no saved preference, check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(prefersDark ? 'dark-theme' : 'light-theme');
        // Save this preference
        localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
}

// Listen for system theme changes only if user hasn't set a preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(e.matches ? 'dark-theme' : 'light-theme');
        localStorage.setItem('theme', e.matches ? 'dark' : 'light');
    }
});
