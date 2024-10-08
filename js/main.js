document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').replace('#', '');
        const targetElement = document.querySelector(`[id="${targetId}"], [data-section="${targetId}"]`);
        
        if (targetElement) {
            e.preventDefault();
            const header = document.querySelector('header');
            const nav = document.querySelector('nav');
            
            let scrollPosition;
            if (window.innerWidth <= 768) {
                const headerHeight = nav.classList.contains('open') ? header.offsetHeight - nav.offsetHeight : header.offsetHeight;
                scrollPosition = targetElement.offsetTop - headerHeight;
            } else {
                scrollPosition = targetElement.offsetTop - header.offsetHeight;
            }

            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });

            nav.classList.remove('open');
        } else {
            console.log(`Element with id "${targetId}" not found`);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('section');

    menuToggle.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
            nav.classList.add('closing');
            nav.addEventListener('transitionend', () => {
                nav.classList.remove('open', 'closing');
            }, { once: true });
        } else {
            nav.classList.add('open');
        }
    });

    // Close the menu when a nav link is clicked
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('open');
        });
    });

    // Intersection Observer setup
    const observerOptions = {
        root: null, // Observe intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger the callback when 10% of the section is visible
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});