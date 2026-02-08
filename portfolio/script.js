// Premium Portfolio Scripts
document.addEventListener('DOMContentLoaded', function() {
    // ========== NAVIGATION ==========
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // ========== THEME TOGGLE ==========
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
    
    // ========== ANIMATED COUNTERS ==========
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const animateCounter = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounter(), 1);
            } else {
                counter.innerText = target;
            }
        });
    };
    
    // Start counters when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statSection = document.querySelector('.hero-stats');
    if (statSection) observer.observe(statSection);
    
    // ========== SKILL BARS ANIMATION ==========
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const percent = bar.parentElement.nextElementSibling.innerText;
            bar.style.width = percent;
        });
    };
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const skillsSection = document.querySelector('.skills-grid');
    if (skillsSection) skillsObserver.observe(skillsSection);
    
    // ========== FORM SUBMISSION ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Simulate submission
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // In production, replace with actual fetch request
            setTimeout(() => {
                // Success message
                const successMsg = document.createElement('div');
                successMsg.className = 'alert alert-success glass';
                successMsg.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <span>Message sent successfully! I'll get back to you within 24 hours.</span>
                `;
                
                contactForm.parentElement.insertBefore(successMsg, contactForm);
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => successMsg.remove(), 5000);
                
                // Optional: Trigger WhatsApp notification
                // const whatsappMsg = `Hi! I just submitted the contact form on your website. Please check your email.`;
                // window.open(`https://wa.me/YOUR_NUMBER?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
                
            }, 1500);
        });
    }
    
    // ========== TYPING EFFECT ==========
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.getAttribute('data-text');
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    element.innerHTML = '';
                    typeWriter();
                    typingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        typingObserver.observe(element);
    });
    
    // ========== PARALLAX EFFECT ==========
    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        document.querySelectorAll('.float-circle').forEach((circle, index) => {
            const speed = 0.5 + (index * 0.2);
            circle.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });
    
    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== PAGE LOAD ANIMATION ==========
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Remove loading animation if exists
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 500);
        }
    });
});

// Add loading animation
const loaderHTML = `
<div class="page-loader">
    <div class="loader-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-center"></div>
    </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', loaderHTML);

// Add loader CSS
const loaderCSS = `
.page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
}

.loader-spinner {
    position: relative;
    width: 80px;
    height: 80px;
}

.spinner-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid transparent;
    animation: spin 1s linear infinite;
}

.spinner-ring:nth-child(1) {
    border-top-color: var(--primary);
    animation-delay: 0s;
}

.spinner-ring:nth-child(2) {
    border-right-color: var(--secondary);
    animation-delay: 0.1s;
}

.spinner-ring:nth-child(3) {
    border-bottom-color: var(--accent);
    animation-delay: 0.2s;
}

.spinner-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    background: var(--gradient-primary);
    border-radius: 50%;
}
`;

const style = document.createElement('style');
style.textContent = loaderCSS;
document.head.appendChild(style);
