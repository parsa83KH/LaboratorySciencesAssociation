import { useRef, useEffect } from 'react';

interface SectionParticleBackgroundProps {
    theme: 'light' | 'dark';
}

const SectionParticleBackground: React.FC<SectionParticleBackgroundProps> = ({ theme }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Get container dimensions
        const container = canvas.parentElement;
        if (!container) return;

        const updateCanvasSize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        updateCanvasSize();

        let width = canvas.width;
        let height = canvas.height;

        let particles: Particle[] = [];
        const particleCount = Math.floor((width * height) / 14000);
        const maxDistance = 220;
        const mouseRadius = 150;

        let scrollSpeedBoost = 1.0;

        const mouse = { x: -1000, y: -1000 };
        
        const isDarkMode = theme === 'dark';
        const backgroundColor = isDarkMode ? 'hsl(222, 47%, 11%)' : 'hsl(0, 0%, 100%)';
        const particleColor = isDarkMode ? 'rgba(98, 140, 242,' : 'rgba(55, 105, 224,';

        class Particle {
            x: number;
            y: number;
            radius: number;
            vx: number;
            vy: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.radius = Math.random() * 2 + 1;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
            }

            update(speedBoost: number) {
                this.x += this.vx * speedBoost;
                this.y += this.vy * speedBoost;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouseRadius - distance) / mouseRadius;
                    this.vx -= Math.cos(angle) * force * 0.01;
                    this.vy -= Math.sin(angle) * force * 0.01;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${particleColor}0.6)`;
                ctx.fill();
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function connect() {
            if (!ctx) return;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = 1 - (distance / maxDistance);
                        ctx.strokeStyle = `${particleColor}${opacity * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        let animationFrameId: number;
        function animate() {
            if (!ctx) return;
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);
            
            particles.forEach(p => {
                p.update(scrollSpeedBoost);
                p.draw();
            });
            connect();

            if (scrollSpeedBoost > 1.0) {
                scrollSpeedBoost -= 0.03;
            } else {
                scrollSpeedBoost = 1.0;
            }

            animationFrameId = requestAnimationFrame(animate);
        }
        
        const handleResize = () => {
            updateCanvasSize();
            width = canvas.width;
            height = canvas.height;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseOut = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const handleScroll = () => {
            scrollSpeedBoost = Math.min(scrollSpeedBoost + 0.8, 4.0);
        }

        window.addEventListener('resize', handleResize);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseout', handleMouseOut);
        container.addEventListener('wheel', handleScroll, { passive: true });

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseout', handleMouseOut);
            container.removeEventListener('wheel', handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default SectionParticleBackground;

