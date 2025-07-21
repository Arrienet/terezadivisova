// Aktivace odkazu v menu a smooth scroll
const navLinks = document.querySelectorAll('.main-nav a');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // zabrání klasickému skoku (a URL změně)

    // Získat cílový element ze href
    const targetId = this.getAttribute('href').substring(1); // odstraní #
    const targetSection = document.getElementById(targetId);

    // Přejít na sekci smooth způsobem
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    }

    // Přepnout aktivní třídu
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});





/* Tlačítko scroll nahoru */
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});