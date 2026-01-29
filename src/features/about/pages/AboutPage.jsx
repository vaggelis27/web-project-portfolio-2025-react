import { useEffect, useRef } from "react";
import logo from "@/assets/about-logo/logo-brand.jpg";
import "./AboutPage.css";

export function AboutPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width || window.innerWidth;
      canvas.height = height || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class FireAnimation {
      constructor() {
        this.particles = [];
        this.paletteBase = [
          { r: 245, g: 167, b: 66 },
          { r: 232, g: 90, b: 25 },
          { r: 255, g: 62, b: 0 },
          { r: 191, g: 34, b: 34 },
          { r: 80, g: 20, b: 70 },
        ];

        this.palette = [...this.paletteBase];
        this.time = 0;
        this.lastUpdateTime = 0;
        this.frameId = null;

        this.handleMouseMove = (e) => {
          const rect = canvas.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          for (let i = 0; i < 3; i++) {
            const offsetX = (Math.random() - 0.5) * 50;
            const offsetY = (Math.random() - 0.5) * 50;

            this.particles.push({
              x: mouseX + offsetX,
              y: mouseY + offsetY,
              size: 10 + Math.random() * 20,
              opacity: 0.2 + Math.random() * 0.4,
              speedX: (Math.random() - 0.5) * 2,
              speedY: -2 - Math.random() * 2,
              colorIndex: Math.floor(Math.random() * this.palette.length),
              rotation: Math.random() * Math.PI * 2,
              rotationSpeed: (Math.random() - 0.5) * 0.03,
              sway: 0.3 + Math.random() * 0.5,
              swaySpeed: 0.005 + Math.random() * 0.01,
              swayOffset: Math.random() * Math.PI * 2,
              lifespan: 50 + Math.random() * 100,
            });
          }
        };

        this.createParticles();
        this.animate();

        window.addEventListener("mousemove", this.handleMouseMove);
      }

      createParticles() {
        const particleCount = Math.floor((canvas.width * canvas.height) / 3000);

        for (let i = 0; i < particleCount; i++) {
          this.particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 100,
            size: 5 + Math.random() * 25,
            opacity: 0.1 + Math.random() * 0.5,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: -1.5 - Math.random() * 3,
            colorIndex: Math.floor(Math.random() * this.palette.length),
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            sway: 0.3 + Math.random() * 0.5,
            swaySpeed: 0.005 + Math.random() * 0.01,
            swayOffset: Math.random() * Math.PI * 2,
            lifespan: 100 + Math.random() * 200,
          });
        }
      }

      animate(currentTime = 0) {
        this.lastUpdateTime = currentTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.time += 0.01;
        this.updatePalette();
        this.updateParticles();

        if (this.particles.length < 100) {
          this.createParticles();
        }

        this.frameId = requestAnimationFrame(this.animate.bind(this));
      }

      updatePalette() {
        this.palette = this.paletteBase.map((color, index) => {
          const t = this.time + index * 0.5;
          const variation = 20;

          return {
            r: Math.min(255, Math.max(0, color.r + Math.sin(t) * variation)),
            g: Math.min(
              255,
              Math.max(0, color.g + Math.sin(t + 1) * variation),
            ),
            b: Math.min(
              255,
              Math.max(0, color.b + Math.sin(t + 2) * variation),
            ),
          };
        });
      }

      updateParticles() {
        for (let i = 0; i < this.particles.length; i++) {
          const p = this.particles[i];

          p.x +=
            p.speedX +
            Math.sin(this.time * p.swaySpeed + p.swayOffset) * p.sway;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;
          p.lifespan -= 1;

          const lifeFactor = p.lifespan / 300;
          const currentSize = p.size * lifeFactor;
          const currentOpacity = p.opacity * lifeFactor;

          if (p.lifespan > 0) {
            this.drawBrushstroke(
              p.x,
              p.y,
              currentSize,
              p.rotation,
              this.palette[p.colorIndex],
              currentOpacity,
            );
          }

          if (p.lifespan <= 0 || p.y < -100) {
            this.particles[i] = {
              x: Math.random() * canvas.width,
              y: canvas.height + Math.random() * 50,
              size: 5 + Math.random() * 25,
              opacity: 0.1 + Math.random() * 0.5,
              speedX: (Math.random() - 0.5) * 1.5,
              speedY: -1.5 - Math.random() * 3,
              colorIndex: Math.floor(Math.random() * this.palette.length),
              rotation: Math.random() * Math.PI * 2,
              rotationSpeed: (Math.random() - 0.5) * 0.02,
              sway: 0.3 + Math.random() * 0.5,
              swaySpeed: 0.005 + Math.random() * 0.01,
              swayOffset: Math.random() * Math.PI * 2,
              lifespan: 100 + Math.random() * 200,
            };
          }
        }
      }

      drawBrushstroke(x, y, size, rotation, color, opacity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        const gradient = ctx.createLinearGradient(0, -size, 0, size);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        gradient.addColorStop(
          0.5,
          `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`,
        );
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(-size / 3, -size);
        ctx.quadraticCurveTo(size / 2, 0, -size / 3, size);
        ctx.quadraticCurveTo(size / 2, 0, size / 3, -size / 2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${
          opacity * 0.7
        })`;
        ctx.beginPath();
        ctx.ellipse(size / 6, 0, size / 4, size / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      stop() {
        cancelAnimationFrame(this.frameId);
        window.removeEventListener("mousemove", this.handleMouseMove);
      }
    }

    const fireAnimation = new FireAnimation();

    const exploreButton = document.getElementById("explore-button");
    const navItems = Array.from(document.querySelectorAll(".nav-item"));
    const navListeners = new Map();

    const handleExploreHover = () => {
      if (!exploreButton) return;
      const rect = exploreButton.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for (let i = 0; i < 20; i++) {
        const offsetX = (Math.random() - 0.5) * rect.width * 1.5;
        const offsetY = (Math.random() - 0.5) * rect.height * 1.5;

        fireAnimation.particles.push({
          x: centerX + offsetX,
          y: centerY + offsetY,
          size: 10 + Math.random() * 15,
          opacity: 0.2 + Math.random() * 0.4,
          speedX: (Math.random() - 0.5) * 2,
          speedY: -2 - Math.random() * 2,
          colorIndex: Math.floor(Math.random() * fireAnimation.palette.length),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          sway: 0.3 + Math.random() * 0.5,
          swaySpeed: 0.005 + Math.random() * 0.01,
          swayOffset: Math.random() * Math.PI * 2,
          lifespan: 50 + Math.random() * 100,
        });
      }
    };

    const handleExploreClick = () => {
      navItems.forEach((item, index) => {
        item.style.animation = `fadeUp 0.5s ease forwards ${index * 0.1}s`;
        item.style.opacity = "0";
        setTimeout(() => {
          item.style.opacity = "1";
        }, 100);
      });

      if (!exploreButton) return;
      const rect = exploreButton.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 10 + Math.random() * 50;

        fireAnimation.particles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          size: 5 + Math.random() * 25,
          opacity: 0.2 + Math.random() * 0.6,
          speedX: Math.cos(angle) * (1 + Math.random() * 3),
          speedY: Math.sin(angle) * (1 + Math.random() * 3),
          colorIndex: Math.floor(Math.random() * fireAnimation.palette.length),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          sway: 0.3 + Math.random() * 0.5,
          swaySpeed: 0.005 + Math.random() * 0.01,
          swayOffset: Math.random() * Math.PI * 2,
          lifespan: 50 + Math.random() * 100,
        });
      }
    };

    const handleNavHover = (item) => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for (let i = 0; i < 10; i++) {
        const offsetX = (Math.random() - 0.5) * rect.width;
        const offsetY = (Math.random() - 0.5) * rect.height;

        fireAnimation.particles.push({
          x: centerX + offsetX,
          y: centerY + offsetY,
          size: 5 + Math.random() * 10,
          opacity: 0.1 + Math.random() * 0.3,
          speedX: (Math.random() - 0.5) * 1,
          speedY: -1 - Math.random() * 1,
          colorIndex: Math.floor(Math.random() * fireAnimation.palette.length),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          sway: 0.2 + Math.random() * 0.3,
          swaySpeed: 0.005 + Math.random() * 0.01,
          swayOffset: Math.random() * Math.PI * 2,
          lifespan: 30 + Math.random() * 50,
        });
      }
    };

    if (exploreButton) {
      exploreButton.addEventListener("mouseenter", handleExploreHover);
      exploreButton.addEventListener("click", handleExploreClick);
    }

    navItems.forEach((item) => {
      const listener = () => handleNavHover(item);
      item.addEventListener("mouseenter", listener);
      navListeners.set(item, listener);
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      fireAnimation.stop();

      if (exploreButton) {
        exploreButton.removeEventListener("mouseenter", handleExploreHover);
        exploreButton.removeEventListener("click", handleExploreClick);
      }

      navItems.forEach((item) => {
        const listener = navListeners.get(item);
        if (listener) {
          item.removeEventListener("mouseenter", listener);
        }
      });
    };
  }, []);

  return (
    <section id="about" className="py-5   text-light about-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <img src={logo} alt="MySite logo" className="hero-logo mb-4" />
            <h2 className="text-uppercase fw-bold mb-4">About Me</h2>
            <p className="lead">
              I am a passionate photographer who captures portraits, landscapes,
              and night skies. This portfolio showcases a curated selection of
              my favorite shots and client work. Let&apos;s create something
              memorable together.
            </p>
          </div>
        </div>
      </div>
      <div className="canvas-container">
        <canvas id="fire-canvas" ref={canvasRef}></canvas>
      </div>
    </section>
  );
}
