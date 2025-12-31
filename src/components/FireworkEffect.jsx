import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

/**
 * FireworkEffect 组件 - 提供全屏烟花秀和 Happy New Year 粒子效果
 */
export const FireworkEffect = forwardRef(({ onStart, onFinish, duration = 9000 }, ref) => {
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useImperativeHandle(ref, () => ({
    start: () => {
      setIsActive(true);
      if (onStart) onStart();
      setTimeout(() => {
        setIsActive(false);
        if (onFinish) onFinish();
      }, duration);
    },
    stop: () => setIsActive(false)
  }));

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Firework particle system
    class Particle {
      constructor(x, y, color, velocity, friction = 0.98, gravity = 0.015) {
        this.x = x;
        this.y = y;
        this.history = []; // Store past positions for longer trails
        for(let i=0; i<8; i++) this.history.push({x, y});
        
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
        this.friction = friction;
        this.gravity = gravity;
      }

      draw(globalFadeAlpha = 1) {
        ctx.save();
        ctx.globalAlpha = this.alpha * globalFadeAlpha;
        
        // Draw long trail using history
        ctx.beginPath();
        ctx.moveTo(this.history[0].x, this.history[0].y);
        for(let i=1; i<this.history.length; i++) {
          ctx.lineTo(this.history[i].x, this.history[i].y);
        }
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
      }

      update() {
        // Update history
        this.history.shift();
        this.history.push({x: this.x, y: this.y});
        
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.005;
      }
    }

    class Firework {
      constructor(targetX, targetY, color) {
        this.x = targetX;
        this.y = canvas.height; // Start from bottom
        this.targetY = targetY;
        this.color = color;
        this.isExploded = false;
        this.particles = [];
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: -(Math.random() * 3 + 7) // Upward speed
        };
        this.history = []; // Trail for the rocket
        for(let i=0; i<15; i++) this.history.push({x: this.x, y: this.y});
      }

      update() {
        if (!this.isExploded) {
          // Update rocket position
          this.history.shift();
          this.history.push({x: this.x, y: this.y});
          
          this.x += this.velocity.x;
          this.y += this.velocity.y;
          this.velocity.y += 0.05; // Slight gravity on rocket

          // Explode if reached target or moving down
          if (this.y <= this.targetY || this.velocity.y >= 0) {
            this.explode();
          }
        } else {
          // Update particles
          this.particles.forEach((p, i) => {
            if (p.alpha <= 0) {
              this.particles.splice(i, 1);
            } else {
              p.update();
            }
          });
        }
      }

      explode() {
        this.isExploded = true;
        const count = 60;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count;
          const power = Math.random() * 2 + 1;
          this.particles.push(new Particle(this.x, this.y, this.color, {
            x: Math.cos(angle) * power,
            y: Math.sin(angle) * power
          }));
        }
      }

      draw(globalFadeAlpha = 1) {
        if (!this.isExploded) {
          // Draw rocket trail
          ctx.save();
          ctx.globalAlpha = globalFadeAlpha;
          ctx.beginPath();
          ctx.moveTo(this.history[0].x, this.history[0].y);
          for(let i=1; i<this.history.length; i++) {
            ctx.lineTo(this.history[i].x, this.history[i].y);
          }
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        } else {
          this.particles.forEach(p => p.draw(globalFadeAlpha));
        }
      }
    }

    // Text Particle for "Happy New Year"
    class TextParticle {
      constructor(x, y, color, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.px = x;
        this.py = y;
        this.color = color;
        this.targetX = targetX;
        this.targetY = targetY;
        
        const angle = Math.random() * Math.PI * 2;
        const force = Math.random() * 3.5 + 2.0; // Slower text explosion
        this.vx = Math.cos(angle) * force;
        this.vy = Math.sin(angle) * force;
        
        this.friction = 0.97;
        this.gravity = 0.02; // Lighter gravity for floating feel
        this.ease = 0.015 + Math.random() * 0.02; // Slower convergence
        this.alpha = 1;
        this.isForming = false;
        this.startTime = Date.now();
        this.formDelay = 1500 + Math.random() * 800; // More time before forming
      }

      draw(globalFadeAlpha = 1) {
        ctx.save();
        ctx.globalAlpha = this.alpha * globalFadeAlpha;
        
        if (!this.isForming) {
          ctx.beginPath();
          ctx.moveTo(this.px, this.py);
          ctx.lineTo(this.x, this.y);
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          // REMOVED shadowBlur for performance
          ctx.fillStyle = this.color;
          const size = 3;
          ctx.fillRect(this.x - size/2, this.y - size/2, size, size);
          
          // Small white core for brilliance without lag
          ctx.fillStyle = 'white';
          ctx.fillRect(this.x - 0.5, this.y - 0.5, 1, 1);
        }
        ctx.restore();
      }

      update() {
        this.px = this.x;
        this.py = this.y;
        const elapsed = Date.now() - this.startTime;

        if (elapsed < this.formDelay) {
          this.vx *= this.friction;
          this.vy *= this.friction;
          this.vy += this.gravity;
          this.x += this.vx;
          this.y += this.vy;
        } else {
          this.isForming = true;
          this.x += (this.targetX - this.x) * this.ease;
          this.y += (this.targetY - this.y) * this.ease;
          this.alpha = 0.8 + Math.sin(Date.now() / 200) * 0.2;
        }
      }
    }

    let fireworks = [];
    let textParticles = [];
    let textReady = false;
    let textTimeout;
    let startTime = Date.now();

    // Create text particles
    const createText = (text) => {
      if (!canvas || !ctx) return;
      
      const fontSize = Math.min(window.innerWidth / 12, 70);
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top'; // Changed to 'top' for precise positioning at the edge
      ctx.fillStyle = 'white';
      
      const textWidth = ctx.measureText(text).width;
      const xPos = canvas.width / 2;
      const yPos = canvas.height * 0.02; // Moved to the very top (2%)
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText(text, xPos, yPos);

      const imageData = ctx.getImageData(
        Math.floor(xPos - textWidth / 2 - 10), 
        Math.floor(yPos - 10), // Corrected for textBaseline = 'top'
        Math.floor(textWidth + 20), 
        Math.floor(fontSize + 30) // Slightly taller to be safe
      );
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const step = 10; 
      for (let y = 0; y < imageData.height; y += step) {
        for (let x = 0; x < imageData.width; x += step) {
          const index = (y * imageData.width + x) * 4;
          if (imageData.data[index + 3] > 128) {
            const targetX = x + (xPos - textWidth / 2 - 10);
            const targetY = y + (yPos - 10); // Corrected for textBaseline = 'top' and yPos-10 sampling
            
            // Mixed Orange and Magenta colors
            const isOrange = Math.random() > 0.5;
            const color = isOrange 
              ? `hsl(${20 + Math.random() * 25}, 100%, 60%)` // Orange
              : `hsl(${300 + Math.random() * 30}, 100%, 65%)`; // Magenta
            
            textParticles.push(new TextParticle(
              xPos, 
              yPos, 
              color, 
              targetX, 
              targetY
            ));
          }
        }
      }
      textReady = true;
    };

    textTimeout = setTimeout(() => createText('Happy New Year 2026'), 2000);

    const animate = () => {
      if (!ctx) return;
      
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      // Handle global fade out in the last 1.5 seconds of the duration
      let globalFadeAlpha = 1;
      if (elapsed > duration - 1500) {
        globalFadeAlpha = Math.max(0, 1 - (elapsed - (duration - 1500)) / 1500);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      // Keep fireworks going until the end
      if (Math.random() < 0.06 && elapsed < duration - 1000) {
        fireworks.push(new Firework(
          Math.random() * canvas.width,
          Math.random() * (canvas.height * 0.4),
          `hsl(${Math.random() * 360}, 100%, 60%)`
        ));
      }

      fireworks.forEach((firework, i) => {
        if (firework.isExploded && firework.particles.length === 0) {
          fireworks.splice(i, 1);
        } else {
          firework.update();
          firework.draw(globalFadeAlpha);
        }
      });

      if (textReady) {
        textParticles.forEach(p => {
          p.update();
          p.draw(globalFadeAlpha);
        });
      }

      if (elapsed < duration) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(textTimeout);
      window.removeEventListener('resize', resize);
    };
  }, [isActive, onFinish, duration]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  );
});

FireworkEffect.displayName = 'FireworkEffect';
