javascript
document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Glassmorphism Effect on Scroll
    const header = document.querySelector('.glass-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(2, 6, 23, 0.85)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(2, 6, 23, 0.6)';
            header.style.boxShadow = 'none';
        }
    });

    // 2. Mock Countdown Timer for Hero Section
    const countdownEl = document.getElementById('hero-countdown');
    if (countdownEl) {
        // Mock starting time: 1 hour, 25 minutes, 30 seconds
        let totalSeconds = 1 * 3600 + 25 * 60 + 30;

        // Function to translate western numbers to eastern arabic numbers
        const toArabicDigits = (numStr) => {
            const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
            return numStr.replace(/[0-9]/g, function(w) {
                return arabicNumbers[+w];
            });
        };

        setInterval(() => {
            if (totalSeconds <= 0) {
                // Reset for demo purposes
                totalSeconds = 3600 * 2;
            }
            totalSeconds--;

            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            countdownEl.textContent = toArabicDigits(timeStr);
        }, 1000);
    }

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.feature-card, .prayer-glass-board, .download-card');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            
            if (boxTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial setup for reveal animation
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // trigger once on load
});
