const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const particles = [];
const colors = ["#ff0040", "#ffb300", "#00ffff", "#00ff00", "#ff00ff"];

// 🌟 Create background stars
const stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.8,
    radius: Math.random() * 1.5,
    alpha: Math.random() * 0.8 + 0.2,
    fadeSpeed: Math.random() * 0.02 + 0.005 // for twinkling
  });
}

function drawStars() {
  stars.forEach(star => {
    // make stars twinkle
    star.alpha += star.fadeSpeed;
    if (star.alpha <= 0.2 || star.alpha >= 1) star.fadeSpeed *= -1;

    ctx.save();
    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
  });
}

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

addEventListener("click", (e) => {
  createFirework(e.x, e.y);
});

function createFirework(x, y) {
  for (let i = 0; i < 60; i++) {
    particles.push(new Particle(x, y));
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 3 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speed = Math.random() * 6 + 2;
    this.angle = Math.random() * Math.PI * 2;
    this.alpha = 1;
    this.gravity = 0.05;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= 0.015;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 30, 0.25)"; // soft dark blue background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawStars(); // 🌟 draw twinkling stars

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) particles.splice(i, 1);
  });
}

animate();

// 🖱️ Mouse-follow trails
window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(e.x, e.y));
  }
});

// 💥 Auto-launch fireworks every 1.2 seconds
setInterval(() => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.6; // upper half of screen
  for (let i = 0; i < 70; i++) {
    particles.push(new Particle(x, y));
  }
}, 1200);

