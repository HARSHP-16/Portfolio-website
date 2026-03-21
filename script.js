// Typing Effect
const typeTarget = document.getElementById("type");
const phrases = [
  "Computer Engineering Student",
  "Web Developer",
  "AI Enthusiast",
  "Problem Solver"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typeTarget.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typeTarget.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }

  setTimeout(type, typingSpeed);
}

// Cursor Glow Smooth Tracking
const glow = document.querySelector(".cursor-glow");
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  // Smooth easing
  glowX += (mouseX - glowX) * 0.1;
  glowY += (mouseY - glowY) * 0.1;

  glow.style.transform = `translate(calc(${glowX}px - 50%), calc(${glowY}px - 50%))`;
  requestAnimationFrame(animateGlow);
}

// Scroll Animations (Intersection Observer)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Once visible, we can stop observing if we want a one-time animation
      // observer.unobserve(entry.target); 
    }
  });
}, observerOptions);

// Magnetic Effect for Buttons
const magnetElements = document.querySelectorAll(".btn, .contact-card");

magnetElements.forEach(el => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = `translate(0, 0)`;
  });
});

// Timeline Progress Animation
const timeline = document.querySelector(".timeline");
const timelineProgress = document.querySelector(".timeline-progress");

function updateTimelineProgress() {
  if (!timeline) return;

  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const timelineHeight = timeline.offsetHeight;

  // Calculate how much of the timeline is visible
  let progress = (windowHeight - rect.top) / (timelineHeight + windowHeight / 2);
  
  // Clamp progress between 0 and 1
  progress = Math.max(0, Math.min(1, progress));
  
  if (timelineProgress) {
    timelineProgress.style.height = `${progress * 100}%`;
  }
}

// Initialize everything
window.addEventListener("DOMContentLoaded", () => {
  type();
  animateGlow();
  
  // Observe all fade-up elements
  document.querySelectorAll(".fade-up, .section, .timeline-item").forEach(el => {
    observer.observe(el);
  });

  // Initial timeline check
  updateTimelineProgress();
});

window.addEventListener("scroll", () => {
  updateTimelineProgress();
});
