// Kod wykonywany od razu aby uniknąć błysku jasnego motywu podczas ładowania
(function() {
    const savedTheme = localStorage.getItem('theme');
    // Jeżeli domyślnie jest jasny, zmieniamy tylko jeśli zapisany to dark.
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

document.addEventListener("DOMContentLoaded", function () {
    // Funkcja ładująca HTML i wstrzykująca go do danego elementu
    function loadComponent(id, file, callback) {
        const element = document.getElementById(id);
        if (element) {
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok for ' + file);
                    }
                    return response.text();
                })
                .then(html => {
                    element.innerHTML = html;
                    if (callback) callback();
                })
                .catch(err => {
                    console.error('Błąd ładowania komponentu:', err);
                    element.innerHTML = `<p style="color:red;text-align:center;padding:1rem;">Błąd ładowania komponentu (${file}). Uruchom stronę przez serwer (np. Live Server w VSCode).</p>`;
                });
        }
    }

    // Ładujemy nagłówek i z callbackiem przypisujemy logikę zmiany motywu oraz menu mobilnego
    loadComponent("header-placeholder", "header.html", function() {
        const themeToggleBtn = document.getElementById('theme-toggle');
        
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', function() {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                
                if (currentTheme === 'dark') {
                    // Włącz Motyw Jasny
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                } else {
                    // Włącz Motyw Ciemny
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                }
            });
        }

        // Logika menu mobilnego
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
            });
        }
    });

    // Ładujemy stopkę
    loadComponent("footer-placeholder", "footer.html");
});
