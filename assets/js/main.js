document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize skill progress bars
    initSkillBars();
    
    // Initialize form handling
    initContactForm();
    
    // Initialize active navigation
    initActiveNavigation();
});

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate progress bars when skills section is visible
                if (entry.target.classList.contains('skill-items')) {
                    animateProgressBars();
                }
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.section, .skill-item, .project-card, .about-content').forEach(el => {
        observer.observe(el);
    });
}

function initSkillBars() {
    const skills = document.querySelectorAll('.progress');
    skills.forEach(skill => {
        const width = skill.parentElement.previousElementSibling.lastElementChild.textContent;
        skill.style.setProperty('--progress-width', width);
    });
}

function animateProgressBars() {
    document.querySelectorAll('.progress').forEach(bar => {
        bar.classList.add('animate');
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.submit-btn');
        
        try {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            showNotification('Message sent successfully!', 'success');
            form.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .notification.success {
        background-color: #10B981;
    }

    .notification.error {
        background-color: #EF4444;
    }
`;
document.head.appendChild(style);
