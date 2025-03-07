document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('background-animation');
    const ctx = canvas.getContext('2d');

    // Particle storage
    let particles = [];
    let connections = [];

    // Set canvas size to match window
    function resizeCanvas() {
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // If this is not the initial setup, adjust particle positions
        if (particles.length > 0) {
            const widthRatio = canvas.width / oldWidth;
            const heightRatio = canvas.height / oldHeight;

            // Adjust particle positions based on new dimensions
            particles.forEach(particle => {
                particle.x *= widthRatio;
                particle.y *= heightRatio;
                particle.baseX *= widthRatio;
                particle.baseY *= heightRatio;
            });
        }
    }

    // Call resize initially
    resizeCanvas();

    // Debounce function to limit resize events
    function debounce(func, wait) {
        let timeout;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // Add debounced resize event listener
    window.addEventListener('resize', debounce(function () {
        resizeCanvas();

        // Recreate connections after resize
        createConnections();
    }, 250));

    // Mouse position
    let mouse = {
        x: null,
        y: null,
        radius: 100
    };

    // Track mouse position
    window.addEventListener('mousemove', function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Reset mouse position when mouse leaves window
    window.addEventListener('mouseout', function () {
        mouse.x = null;
        mouse.y = null;
    });

    // Draw grid pattern
    function drawGrid() {
        const gridSize = 40;
        const gridOpacity = 0.05;

        ctx.strokeStyle = `rgba(255, 255, 255, ${gridOpacity})`;
        ctx.lineWidth = 0.3;

        // Draw vertical lines
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    // Draw scan lines - keeping this but with very subtle effect
    function drawScanLines() {
        const scanLineHeight = 1;
        const scanLineSpacing = 6;
        const scanLineOpacity = 0.02;

        ctx.fillStyle = `rgba(255, 255, 255, ${scanLineOpacity})`;

        for (let y = 0; y < canvas.height; y += scanLineSpacing) {
            ctx.fillRect(0, y, canvas.width, scanLineHeight);
        }
    }

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            // Random position
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            // Store original position for mouse interaction
            this.baseX = this.x;
            this.baseY = this.y;

            // Random size (small)
            this.size = Math.random() * 2 + 0.5;

            // Random velocity (slow)
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;

            // Random opacity
            this.alpha = Math.random() * 0.5 + 0.1;

            // Random color (white to gray)
            this.color = `rgba(255, 255, 255, ${this.alpha})`;

            // Density for mouse interaction
            this.density = (Math.random() * 30) + 1;
        }

        update() {
            // Move particle
            this.x += this.vx;
            this.y += this.vy;

            // Reset if out of bounds
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                // Keep the same velocity direction but reset position
                this.x = this.x < 0 ? canvas.width : (this.x > canvas.width ? 0 : this.x);
                this.y = this.y < 0 ? canvas.height : (this.y > canvas.height ? 0 : this.y);

                // Update base position
                this.baseX = this.x;
                this.baseY = this.y;
            }

            // Mouse interaction
            if (mouse.x != null && mouse.y != null) {
                // Calculate distance between mouse and particle
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // If mouse is close enough, push particle away
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;

                    const directionX = forceDirectionX * force * this.density * -0.6;
                    const directionY = forceDirectionY * force * this.density * -0.6;

                    this.x += directionX;
                    this.y += directionY;
                } else {
                    // Gradually return to original position
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX;
                        this.x -= dx / 20;
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY;
                        this.y -= dy / 20;
                    }
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Connection class to draw lines between particles
    class Connection {
        constructor(particleA, particleB) {
            this.particleA = particleA;
            this.particleB = particleB;
        }

        update() {
            // Calculate distance between particles
            const dx = this.particleA.x - this.particleB.x;
            const dy = this.particleA.y - this.particleB.y;
            this.distance = Math.sqrt(dx * dx + dy * dy);
        }

        draw() {
            // Only draw if particles are close enough
            const maxDistance = 100;
            if (this.distance < maxDistance) {
                // Opacity based on distance
                const alpha = (1 - this.distance / maxDistance) * 0.2;
                ctx.beginPath();
                ctx.moveTo(this.particleA.x, this.particleA.y);
                ctx.lineTo(this.particleB.x, this.particleB.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    // Create particles
    function createParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor(window.innerWidth * window.innerHeight / 15000), 100);

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Create connections
    function createConnections() {
        connections = [];
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                connections.push(new Connection(particles[i], particles[j]));
            }
        }
    }

    // Initialize particles and connections
    createParticles();
    createConnections();

    // Animation loop
    function animate() {
        // Clear canvas with semi-transparent black for trail effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        drawGrid();

        // Draw scan lines (more subtle now)
        drawScanLines();

        // Update and draw connections
        connections.forEach(connection => {
            connection.update();
            connection.draw();
        });

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Request next frame
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
}); 