

///// Interaktivní menu (aktivní sekce) /////

const navLinks = document.querySelectorAll('.main-nav a');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});


window.addEventListener('scroll', function () {
    let currentSection = '';

  // Viditelné aktivní sekce
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });

  // Přidání a odebrání třídy active k sekcím
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
    }
  });
});



///// Slide Home Section /////
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
    }, 500);

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

    const scrollThreshold = 400; // hranice, kdy se začne slide vracet

    // Slide pryč při scrollu dolů – ALE jen pokud jsme pod touto hranicí A ještě neslidovali
    if (window.scrollY > scrollThreshold && !hasSlid) {
      slideAwayAndScroll();
    }

    // Slide zpět při scrollu nahoru – když jsme nahoře pod touto hranicí A slide pryč je aktivní
    if (window.scrollY <= scrollThreshold && hasSlid) {
      slideContainer.classList.remove("slide-away");
      hasSlid = false;

      // Zobraz wrapper
      homeWrapper.style.display = "block";

      // Fade-in
      setTimeout(() => {
        homeWrapper.classList.remove("hidden-fade");
      }, 10);
    }
  });
});






///// FORMULÁŘ - validace a odeslání s hláškou /////

/*document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // zabrání přesměrování

    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validace e-mailu
    if (!emailRegex.test(emailValue)) {
      emailError.textContent = "Zadejte platný e-mail ve formátu text@domena.cz";
      return;
    } else {
      emailError.textContent = "";
    }

    // Vyprázdnění formuláře a zobrazení hlášky
    form.reset();
    successMessage.textContent = "Děkuji za Vaši zprávu!";
    successMessage.style.display = "block";

    // Hláška zmizí po 5 sekundách
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 5000);
  });
});*/

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validace e-mailu
    if (!emailRegex.test(emailValue)) {
      e.preventDefault();
      emailError.textContent = "Zadejte platný e-mail ve formátu text@domena.cz";
      return;
    } else {
      emailError.textContent = "";
    }

    // Po odeslání (on submit success)
    form.addEventListener("formsubmit", function () {
      successMessage.textContent = "Děkuji za Vaši zprávu!";
      successMessage.style.display = "block";

      // vyprázdnění formuláře
      form.reset();

      setTimeout(() => {
        successMessage.style.display = "none";
      }, 5000);
    });
  });
});


///// Tlačítko scroll nahoru /////
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




///// PŘEKRYTÍ FOTKY /////
window.addEventListener("scroll", () => {
  const aboutFoto = document.querySelector(".about-foto");
  const section = document.querySelector(".o-mne");

  if (!aboutFoto || !section) return;

  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Kolik sekce je vidět odspodu okna
  const visibleHeight = Math.min(rect.height, Math.max(0, windowHeight - rect.top));
  let visiblePercent = visibleHeight / rect.height;

  if (visiblePercent > 1) visiblePercent = 1;
  if (visiblePercent < 0) visiblePercent = 0;

  const threshold = 0.3;  // 30% viditelnost sekce

  // Přepínáme překryv jen jednou, jakmile viditelnost překročí threshold
  if (visiblePercent >= threshold) {
    // posuň překryv úplně doprava
    aboutFoto.style.setProperty("--translateX", `100%`);

    // Odstraň listener, protože už nechceme, aby se vracel zpět
    window.removeEventListener("scroll", arguments.callee);
  } else {
    // překryv je na začátku (pokud chceš, aby byl znovu překrytý při scrollu nahoru, jinak tento blok můžeš vynechat)
    aboutFoto.style.setProperty("--translateX", `0%`);
  }
});







function toggleInfo(button) {
  const card = button.closest('.projekt-card');
  const infoBlock = card.nextElementSibling; // ⬅️ vezmeme až ten blok POD kartou

  if (!infoBlock.classList.contains('projekt-info')) return;

  const isVisible = infoBlock.classList.contains('show');

  // Skryjeme všechny ostatní otevřené bloky
  document.querySelectorAll('.projekt-info.show').forEach(el => {
    el.classList.remove('show');
    el.previousElementSibling.querySelector('.toggle-info-btn').textContent = 'Více info';
  });

  // Přepneme aktuální
  if (!isVisible) {
    infoBlock.classList.add('show');
    button.textContent = 'Méně info';
  } else {
    infoBlock.classList.remove('show');
    button.textContent = 'Více info';
  }
}