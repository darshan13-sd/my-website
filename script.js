// ===== NAVBAR Mobile Toggle =====
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  const expanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!expanded));
  expanded
    ? mobileMenu.setAttribute("hidden", "")
    : mobileMenu.removeAttribute("hidden");
});

// Close menu when clicking a link
mobileMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("hidden", "");
  }
});

// ===== Active link highlight =====
const links = Array.from(document.querySelectorAll(".links a")).filter((a) =>
  a.getAttribute("href").startsWith("#")
);

function setActive(hash) {
  links.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === hash)
  );
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(`#${entry.target.id}`);
      }
    });
  },
  { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
);

document
  .querySelectorAll("section[id]")
  .forEach((sec) => observer.observe(sec));
// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// ===== Active Navbar Highlight on Scroll =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ===== Fade-in Scroll Animations =====
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2, // when 20% of element is visible
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
