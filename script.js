document.addEventListener('DOMContentLoaded', () => {
    // Load external libraries if not already loaded (GSAP is linked in the HTML)
    // GSAP is expected to be loaded via CDN in index.html

    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const loadDuration = 4500; // Total time for the loading experience

    function startLoadingSequence() {
        // Initialize techy loading effects
        initTechyLoading();

        // Start GSAP progress bar animation separate from the CSS one
        gsap.to(".loading-progress-bar", {
            width: "100%", 
            duration: loadDuration / 1000, 
            ease: "linear"
        });
        
        // Set a timeout to hide the loading screen and show main content
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            mainContent.classList.add('loaded');
            
            // Start main animations after loading is complete
            setTimeout(() => {
                initMainAnimations();
            }, 300); // Small delay to ensure content is visible
        }, loadDuration); 
    }

    function initTechyLoading() {
        const matrixRain = document.getElementById('matrixRain');
        const binaryRain = document.getElementById('binaryRain');
        const terminalContent = document.getElementById('terminalContent');
        const statusText = document.getElementById('statusText');
        
        // Create Matrix Rain Effect
        function createMatrixRain() {
            const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            const numColumns = Math.floor(window.innerWidth / 30); // Dynamic columns

            for (let i = 0; i < numColumns; i++) {
                const column = document.createElement('div');
                column.className = 'matrix-column';
                column.style.left = (i * (100 / numColumns)) + '%'; // Spread evenly
                column.style.animationDuration = (Math.random() * 3 + 2) + 's';
                column.style.animationDelay = Math.random() * 2 + 's';
                
                let columnText = '';
                for (let j = 0; j < 20; j++) {
                    columnText += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
                }
                column.innerHTML = columnText;
                
                matrixRain.appendChild(column);
            }
        }
        createMatrixRain();
        
        // Create Binary Rain Effect
        function createBinaryRain() {
            const numStreams = Math.floor(window.innerWidth / 20); // Dynamic streams

            for (let i = 0; i < numStreams; i++) {
                const stream = document.createElement('div');
                stream.className = 'binary-stream';
                stream.style.left = Math.random() * 100 + '%';
                stream.style.animationDuration = (Math.random() * 4 + 3) + 's';
                stream.style.animationDelay = Math.random() * 3 + 's';
                
                let binaryText = '';
                for (let j = 0; j < 30; j++) {
                    binaryText += Math.random() > 0.5 ? '1' : '0';
                    if (j % 8 === 7) binaryText += '<br>';
                }
                stream.innerHTML = binaryText;
                
                binaryRain.appendChild(stream);
            }
        }
        createBinaryRain();
        
        // Simulate Terminal Boot Sequence
        function simulateTerminalBoot() {
            const bootSequence = [
                { text: '<span class="terminal-prompt">root@hackhub:~$</span> sudo systemctl start hackathon.service', delay: 500 },
                { text: '[INFO] Loading hackathon modules...', delay: 1000 },
                { text: '[OK] Authentication system initialized', delay: 1500 },
                { text: '[OK] Database connections established', delay: 2000 },
                { text: '[INFO] Scanning for participants...', delay: 2500 },
                { text: '[OK] Found 500+ registered hackers', delay: 3000 },
                { text: '[INFO] Loading prize pool: ₹55,000/-', delay: 3500 },
                { text: '[OK] All systems operational', delay: 4000 },
                { text: '[INFO] Preparing innovation environment...', delay: 4200 },
                { text: '<span class="terminal-prompt">root@hackhub:~$</span> launch_hackathon --mode=epic', delay: 4400 },
                { text: '[SUCCESS] HACK HUB READY TO LAUNCH!', delay: 4500 }
            ];

            const statusMessages = [
                'INITIALIZING SYSTEM...',
                'LOADING MODULES...',
                'CONNECTING TO SERVERS...',
                'SCANNING PARTICIPANTS...',
                'PREPARING ENVIRONMENT...',
                'SYSTEM READY!'
            ];

            let currentLine = 0;
            let currentStatus = 0;

            function addTerminalLine() {
                if (currentLine < bootSequence.length) {
                    const lineData = bootSequence[currentLine];
                    const line = document.createElement('div');
                    line.className = 'terminal-line';
                    line.innerHTML = lineData.text;
                    line.style.animationDelay = '0s'; // Reset delay as we control timing via setTimeout
                    terminalContent.appendChild(line);

                    // Scroll to the bottom of the terminal
                    terminalContent.scrollTop = terminalContent.scrollHeight;
                    
                    // Update status text
                    if (currentStatus < statusMessages.length - 1 && currentLine > 0 && currentLine % 2 === 0) {
                         statusText.textContent = statusMessages[Math.min(currentStatus, statusMessages.length - 1)];
                         currentStatus++;
                    }
                    
                    currentLine++;
                    
                    // Set timeout for the next line based on the difference in delays
                    if (currentLine < bootSequence.length) {
                        const nextDelay = bootSequence[currentLine].delay;
                        const currentDelay = lineData.delay;
                        setTimeout(addTerminalLine, nextDelay - currentDelay);
                    } else {
                        // Add cursor at the end
                        const cursor = document.createElement('span');
                        cursor.className = 'terminal-cursor';
                        terminalContent.appendChild(cursor);
                        statusText.textContent = statusMessages[statusMessages.length - 1];
                    }
                }
            }

            // Start the boot sequence, accounting for initial delay
            setTimeout(addTerminalLine, bootSequence[0].delay);
        }
        simulateTerminalBoot();
    }

    // GSAP Animations - moved to separate function
    function initMainAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Fixed hero animations with proper initial states and timing
        gsap.timeline()
            .to(".hero h1", { 
                duration: 1.2, 
                y: 0, 
                opacity: 1, 
                ease: "power3.out", 
                delay: 0.5 
            })
            .to(".hero-subtitle", { 
                duration: 0.8, 
                y: 0, 
                opacity: 1, 
                ease: "power3.out" 
            }, "-=0.8")
            .to(".hero-organizer", { 
                duration: 0.8, 
                y: 0, 
                opacity: 1, 
                ease: "power3.out" 
            }, "-=0.6")
            .to(".hero-tagline", { 
                duration: 0.8, 
                y: 0, 
                opacity: 1, 
                ease: "power3.out" 
            }, "-=0.6")
            .to(".hero-detail", { 
                duration: 0.6, 
                scale: 1, 
                opacity: 1, 
                stagger: 0.1, 
                ease: "power3.out" 
            }, "-=0.4")
            .to(".cta-buttons .btn", { 
                duration: 0.6, 
                y: 0, 
                opacity: 1, 
                stagger: 0.1, 
                ease: "power3.out" 
            }, "-=0.2");

        // Scroll-triggered animations for .fade-in, .slide-in-left, etc.
        gsap.utils.toArray(".fade-in, .sponsors-tier").forEach((element) => {
            gsap.fromTo(element, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        gsap.utils.toArray(".slide-in-left").forEach((element) => {
            gsap.fromTo(element,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        gsap.utils.toArray(".slide-in-right").forEach((element) => {
            gsap.fromTo(element,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Used for Hero Details, Prize Cards, and Sponsor Logos
        gsap.utils.toArray(".scale-in").forEach((element) => {
            gsap.fromTo(element,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Navbar scroll effect
        ScrollTrigger.create({
            start: "top -80",
            end: 99999,
            toggleClass: {className: "scrolled", targets: "nav"}
        });

        // FAQ functionality
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const answer = button.nextElementSibling;
                const isActive = answer.classList.contains('active');
                
                // Close all answers
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('active');
                });
                
                document.querySelectorAll('.faq-question span').forEach(span => {
                    span.textContent = '+';
                });
                
                // Toggle current answer
                if (!isActive) {
                    answer.classList.add('active');
                    button.querySelector('span').textContent = '-';
                }
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Parallax effect for hero background
        gsap.to(".hero-bg", {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Card hover animations (Theme & Prize)
        document.querySelectorAll('.theme-card, .prize-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { duration: 0.3, y: -10, ease: "power2.out" });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { duration: 0.3, y: 0, ease: "power2.out" });
            });
        });

        // Typewriter Animation Function
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    // Add blinking cursor after typing is complete
                    element.innerHTML += '<span class="typewriter-cursor">&nbsp;</span>';
                }
            }
            type();
        }

        // Trigger typewriter animation on scroll
        ScrollTrigger.create({
            trigger: ".typewriter-container",
            start: "top 80%",
            onEnter: () => {
                const typewriterElement = document.getElementById('typewriter-text');
                typeWriter(typewriterElement, "🏆 Total Prizes worth ₹ 55,000/-", 80);
            },
            once: true // Only run the animation once
        });
    }
    
    // Start the initial loading sequence
    startLoadingSequence();
});