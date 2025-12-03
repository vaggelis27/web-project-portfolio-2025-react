import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/brand-logo.svg";

export default function Navbar() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class FireAnimation {
      constructor() {
        this.particles = [];
        this.paletteBase = [
          { r: 255, g: 200, b: 40 },
          { r: 255, g: 140, b: 20 },
          { r: 255, g: 70, b: 0 },
          { r: 230, g: 30, b: 30 },
          { r: 150, g: 25, b: 120 },
        ];

        this.palette = [...this.paletteBase];
        this.time = 0;
        this.lastUpdateTime = 0;

        this.createParticles();
        this.animate();

        canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
      }

      createParticles() {
        const particleCount = Math.floor((canvas.width * canvas.height) / 1800);
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
        const deltaTime = currentTime - this.lastUpdateTime;
        this.lastUpdateTime = currentTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.time += 0.01;

        this.updatePalette();
        this.updateParticles(deltaTime);

        if (this.particles.length < 100) this.createParticles();

        requestAnimationFrame(this.animate.bind(this));
      }

      updatePalette() {
        this.palette = this.paletteBase.map((color, index) => {
          const t = this.time + index * 0.5;
          const variation = 20;
          return {
            r: Math.min(255, Math.max(0, color.r + Math.sin(t) * variation)),
            g: Math.min(
              255,
              Math.max(0, color.g + Math.sin(t + 1) * variation)
            ),
            b: Math.min(
              255,
              Math.max(0, color.b + Math.sin(t + 2) * variation)
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
              currentOpacity
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
          `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
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

      handleMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        for (let i = 0; i < 3; i++) {
          const offsetX = (Math.random() - 0.5) * 50;
          const offsetY = (Math.random() - 0.5) * 50;

          this.particles.push({
            x: mouseX + offsetX,
            y: mouseY + offsetY,
            size: 10 + Math.random() * 35,
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
      }
    }

    const fireAnimation = new FireAnimation();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-md fixed-top shadow-0" id="navbar">
      <div className="container-fluid flex-wrap">
        {/* Mobile brand logo */}
        <Link
          to="/"
          className="navbar-brand d-block d-md-none py-0"
          onClick={() => window.scrollTo(0, 0)}
        >
          <img src={logo} alt="VN Logo" className="navbar-logo" />
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler custom-toggler ms-auto order-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse w-100 order-2 justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {/* HOME LINK */}
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="bi bi-image me-1"></i> Home
              </Link>
            </li>

            {/* Portfolio */}
            <li className="nav-item">
              <a href="#Portfolio" className="nav-link">
                <i className="bi bi-collection me-1"></i> Portfolio
              </a>
            </li>

            {/* Desktop logo */}
            <li className="nav-item d-none d-md-block">
              <Link
                to="/"
                className="nav-link p-0"
                onClick={() => window.scrollTo(0, 0)}
              >
                <img src={logo} alt="VN Logo" className="navbar-logo" />
              </Link>
            </li>

            {/* About */}
            <li className="nav-item">
              <a href="#about" className="nav-link">
                <i className="bi bi-info-circle me-1"></i> About
              </a>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <a href="#contact" className="nav-link">
                <i className="bi bi-envelope me-1"></i> Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="canvas-container">
        <canvas id="fire-canvas" ref={canvasRef}></canvas>
      </div>
    </nav>
  );
}
