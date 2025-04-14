// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.setAttribute('data-theme', savedTheme);

// Update icon based on current theme
if (savedTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme and icon
    html.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    
    // Save preference
    localStorage.setItem('theme', newTheme);
});

// Course info modal functionality
const infoButtons = document.querySelectorAll('.info-btn');
const closeButtons = document.querySelectorAll('.close-modal');

infoButtons.forEach(button => {
    button.addEventListener('click', () => {
        const courseId = button.dataset.course;
        const modal = document.getElementById(`${courseId}-modal`);
        modal.style.display = 'block';
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.course-modal');
        modal.style.display = 'none';
    });
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('course-modal')) {
        e.target.style.display = 'none';
    }
});

// Tab functionality for programming languages
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;

        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to the clicked button and corresponding pane
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Code execution functionality for Try It Yourself section
const runButton = document.getElementById('run-btn');
const codeInput = document.getElementById('code-input');
const codeOutput = document.getElementById('code-output');
const languageSelect = document.getElementById('language-select');

runButton.addEventListener('click', () => {
    const code = codeInput.value;
    const language = languageSelect.value;

    // Simple execution simulation (for demonstration purposes)
    // In a real application, you would need a backend to execute code securely
    codeOutput.textContent = `Running ${language} code:\n${code}`;
});
