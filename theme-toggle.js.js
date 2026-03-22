/*
Theme Toggle Utility
Handles light/dark mode switching with localStorage persistence
*/

class ThemeToggle {
    constructor() {
        this.html = document.documentElement;
        this.themeToggle = document.getElementById('theme-toggle');
        this.init();
    }
    
    init() {
        this.loadTheme();
        this.bindEvents();
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setTheme('dark-mode');
        } else {
            this.setTheme('light-mode');
        }
    }
    
    setTheme(theme) {
        this.html.classList.remove('light-mode', 'dark-mode');
        this.html.classList.add(theme);
        
        // Update toggle button text and icon
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            const span = this.themeToggle.querySelector('span');
            
            if (theme === 'dark-mode') {
                icon.className = 'fas fa-moon';
                span.textContent = 'Dark
