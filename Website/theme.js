const themeToggleButton = document.getElementById('theme-toggle-button');
const body = document.body;
const tradingViewWidgets = document.querySelectorAll('.tradingview-widget-container__widget');

// Function to apply the theme
const applyTheme = (theme) => {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        themeToggleButton.textContent = '切换浅色主题'; // Change button text for dark theme
        updateTradingViewWidgets('dark');
    } else {
        body.classList.remove('dark-theme');
        themeToggleButton.textContent = '切换深色主题'; // Change button text for light theme
        updateTradingViewWidgets('light');
    }
    localStorage.setItem('theme', theme);
};

// Function to update TradingView widgets theme
const updateTradingViewWidgets = (theme) => {
    // Find all TradingView script tags
    const scripts = document.querySelectorAll('script[src*="tradingview.com"]');
    scripts.forEach(script => {
        // Only reload scripts that have a 'colorTheme' parameter in their config
        try {
            const configString = script.innerHTML.trim();
            if (configString.startsWith('{') && configString.endsWith('}')) {
                const config = JSON.parse(configString);
                if (config.hasOwnProperty('colorTheme')) {
                    // Update the theme in the config
                    config.colorTheme = theme;

                    // Create a new script element with the updated config
                    const newScript = document.createElement('script');
                    newScript.type = 'text/javascript';
                    newScript.src = script.src;
                    newScript.async = script.async;
                    newScript.innerHTML = JSON.stringify(config);

                    // Replace the old script with the new one
                    script.parentNode.replaceChild(newScript, script);
                }
            }
        } catch (e) {
            console.error('Error parsing or updating TradingView widget config:', e);
        }
    });
};


// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
applyTheme(savedTheme);

// Add event listener to the toggle button
themeToggleButton.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
});