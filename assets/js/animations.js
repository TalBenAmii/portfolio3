document.addEventListener('DOMContentLoaded', () => {
    initTypewriterEffect();
    initScrollReveal();
    initHoverEffects();
});

function initTypewriterEffect() {
    const typewriterText = document.querySelector('.typewriter');
    if (!typewriterText) return;

    const text = typewriterText.textContent;
    typewriterText.textContent = '';
    
    let charIndex = 0;
    const typingDelay = 100;

    function type() {
        if (charIndex < text.length) {
            typewriterText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            // Reset cursor blinking after typing
            typewriterText.style.borderRight = '3px solid var(--primary-color)';
        }
    }

    // Start typing with initial delay
    setTimeout(type, 1000);
}

function initScrollReveal() {
    // Add data-scroll attribute to elements we want to animate
    const elements = document.querySelectorAll('.section, .skill-item, .project-card');
    elements.forEach(el => {
        if (!el.hasAttribute('data-scroll')) {
            el.setAttribute('data-scroll', '');
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-scroll]').forEach(el => observer.observe(el));
}

function initHoverEffects() {
    // Project cards hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const { left, top } = card.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Skill items hover effect
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const progressBar = item.querySelector('.progress');
            if (progressBar && !progressBar.classList.contains('animate')) {
                progressBar.classList.add('animate');
            }
        });
    });

    // Tech items hover effect
    document.querySelectorAll('.tech-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
}

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Account for fixed header
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scroll = window.pageYOffset;
        hero.style.transform = `translateY(${scroll * 0.5}px)`;
    }
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add CSS for scroll progress
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: var(--primary-color);
        z-index: 1001;
        transition: width 0.2s ease;
    }
`;
document.head.appendChild(style);
