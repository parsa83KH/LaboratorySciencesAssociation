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
        // Reduce particle count on mobile devices
        const isMobile = width < 768;
        const divisor = isMobile ? 28000 : 14000; // Half particles on mobile
        const particleCount = Math.floor((width * height) / divisor);
        const maxDistance = isMobile ? 150 : 220; // Shorter connection lines on mobile
        const mouseRadius = 150;

        let scrollSpeedBoost = 1.0;

        const mouse = { x: -1000, y: -1000 };
        
        const isDarkMode = theme === 'dark';
        const backgroundColor = isDarkMode ? 'hsl(222, 47%, 11%)' : 'hsl(0, 0%, 100%)';
        const particleColor = isDarkMode ? 'rgba(98, 140, 242,' : 'rgba(55, 105, 224,';

        class Particle {
            x: number;
            y: number;
            z: number;
            vx: number;
            vy: number;
            vz: number;
            baseVx: number;
            baseVy: number;
            baseSize: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.z = Math.random() * width;
                this.baseVx = (Math.random() - 0.5) * 0.3;
                this.baseVy = (Math.random() - 0.5) * 0.3;
                this.vx = this.baseVx;
                this.vy = this.baseVy;
                this.vz = (Math.random() - 0.5) * 0.1;
                this.baseSize = 1.5;
            }

            update(boost: number) {
                const dxMouse = this.x - mouse.x;
                const dyMouse = this.y - mouse.y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distMouse < mouseRadius) {
                    const force = (mouseRadius - distMouse) / mouseRadius;
                    this.vx += (dxMouse / distMouse) * force * 1.5;
                    this.vy += (dyMouse / distMouse) * force * 1.5;
                }

                this.x += this.vx * boost;
                this.y += this.vy * boost;
                this.z += this.vz;

                if (this.x > width + 50 || this.x < -50) {
                    this.vx *= -1;
                    this.baseVx *= -1;
                }
                if (this.y > height + 50 || this.y < -50) {
                    this.vy *= -1;
                    this.baseVy *= -1;
                }
                
                if (this.z > width) this.z = 0;
                if (this.z < 0) this.z = width;

                this.vx += (this.baseVx - this.vx) * 0.02;
                this.vy += (this.baseVy - this.vy) * 0.02;
            }

            draw() {
                if (!ctx) return;
                const perspective = this.z / width;
                const scale = 1 + perspective;
                const opacity = 0.4 + perspective * 0.5;

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.baseSize * scale, 0, Math.PI * 2);
                ctx.fillStyle = `${particleColor}${opacity})`;
                ctx.fill();
            }
        }

        function init() {
            particles = [];
            const isMobile = width < 768;
            const divisor = isMobile ? 28000 : 14000;
            const count = Math.floor((width * height) / divisor);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function connect() {
            if (!ctx) return;
            const isMobile = width < 768;
            const distanceThreshold = isMobile ? 150 : 220;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < distanceThreshold) {
                        const opacity = 1 - (distance / distanceThreshold);
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

