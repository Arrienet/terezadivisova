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



// Slide Home Section
document.addEventListener("DOMContentLoaded", () => {
  const goToProjects = document.getElementById("goToProjects");
  const slideContainer = document.querySelector(".slide-container");
  const homeSection = document.getElementById("home");
  const homeWrapper = document.querySelector(".home-wrapper");
  const projektySection = document.getElementById("projekty");
  const downArrow = document.querySelector(".dropdown img");

  let hasSlid = false;
  let isManualSlide = false;

  function slideAwayAndScroll() {
    isManualSlide = true;
    slideContainer.classList.add("slide-away");
    hasSlid = true;

    // Přidat fade-out třídu
    homeWrapper.classList.add("hidden-fade");

    // Po dokončení fade-out skryj element
    setTimeout(() => {
      homeWrapper.style.display = "none";
    }, 500); // odpovídá CSS transition-duration

    // Přejdi na sekci
    setTimeout(() => {
      projektySection.scrollIntoView({ behavior: "smooth" });
    }, 200);

    // Reset flagu
    setTimeout(() => {
      isManualSlide = false;
    }, 500);
  }

  // Kliknutí na "Portfolio"
  if (goToProjects) {
    goToProjects.addEventListener("click", slideAwayAndScroll);
  }

  // Kliknutí na šipku dolů
  if (downArrow) {
    downArrow.addEventListener("click", slideAwayAndScroll);
  }

  // Scroll listener – návrat zpět
  window.addEventListener("scroll", () => {
    if (isManualSlide) return;

    const homeTop = homeSection.getBoundingClientRect().top;
    const homeHeight = homeSection.offsetHeight;
    const triggerDown = homeHeight * 0.05;

    // Slide pryč při scrollu dolů
    if (homeTop <= -triggerDown && !hasSlid) {
      slideAwayAndScroll();
    }

    // Slide zpět při scrollu nahoru
    if (homeTop > 50 && hasSlid) {
      slideContainer.classList.remove("slide-away");
      hasSlid = false;

      // Nejprve zobraz wrapper
      homeWrapper.style.display = "block";

      // Pak zruš fade-out třídu (fade-in přes CSS)
      setTimeout(() => {
        homeWrapper.classList.remove("hidden-fade");
      }, 10);
    }
  });
});

// Tlačítko scroll nahoru
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