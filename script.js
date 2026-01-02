const text = "Computer Engineering Student | Web & AI Enthusiast";
let i = 0;

function typeEffect() {
  if (i < text.length) {
    document.getElementById("type").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 70);
  }
}
typeEffect();

const glow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.15 });

sections.forEach(sec => observer.observe(sec));

const node = document.querySelector(".node");
const status = document.getElementById("status");
let x = 50, y = 50;

document.addEventListener("keydown", e => {
  status.textContent = "status: active";
  if (e.key === "ArrowUp") y -= 3;
  if (e.key === "ArrowDown") y += 3;
  if (e.key === "ArrowLeft") x -= 3;
  if (e.key === "ArrowRight") x += 3;
  node.style.top = y + "%";
  node.style.left = x + "%";
});
