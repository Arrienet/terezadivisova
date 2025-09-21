/* ----- INTERAKTIVNÍ MENU (aktivní sekce) ----- */

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



/* ----- RESPONZIVNÍ MENU PRO TELEFONY ----- */
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const icon = menuIcon.querySelector("i"); // najdeme ikonku uvnitř
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");

  // Otevření / zavření menu
  menuIcon.addEventListener("click", () => {
    mainNav.classList.toggle("active");
    menuIcon.classList.toggle("active");

    // Přepnutí tříd místo přepisování HTML
    icon.classList.toggle("fa-bars-staggered");
    icon.classList.toggle("fa-times");
  });

  // Zavření menu při kliknutí na odkaz
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
      menuIcon.classList.remove("active");

      // vrátíme hamburger
      icon.classList.add("fa-bars-staggered");
      icon.classList.remove("fa-times");
    });
  });
});



/* ----- PORTFOLIO H1 NAJETÍ PŘI NAČTENÍ STRÁNKY ----- */
window.addEventListener("load", () => {
  const portfolioHeading = document.querySelector(".portfolio-heading");
  portfolioHeading.classList.add("show");
});



/* ----- FADE IN TEXT PROJEKTY + O MĚ ----- */
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  function animateOnScroll(selector) {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 200);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.forEach(el => {
      el.classList.add("fade-up");
      observer.observe(el);
    });
  }

  // Spuštění pro projekty a about-me
  animateOnScroll(".project-info > *");
  animateOnScroll(".about-text > *");
});



/* ----- SLIDE DOWN ZE SEKCE HOME NA PROJEKTY ----- */
document.addEventListener("DOMContentLoaded", () => {
  const goToProjects = document.getElementById("goToProjects");
  const projektySection = document.getElementById("projekty");
  const downArrow = document.querySelector(".dropdown img");

  let lastScrollY = window.scrollY;

  // Funkce pro jemný scroll dolů na projekty
  function scrollToProjects() {
    projektySection.scrollIntoView({ behavior: "smooth" });
  }

  // Klik na "Portfolio"
  if (goToProjects) goToProjects.addEventListener("click", scrollToProjects);

  // Klik na šipku dolů
  if (downArrow) downArrow.addEventListener("click", scrollToProjects);

  // Scroll listener
  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    const scrollingDown = currentY > lastScrollY;
    lastScrollY = currentY;

    const threshold = 140; // Kdy se spustí

    // Spustí se jen pokud jsme na HOME a scrollujeme dolů
    if (scrollingDown && currentY > threshold && currentY < projektySection.offsetTop - 10) {
      scrollToProjects();
    }
  });

  // Přerušení plynulého scrollu uživatelem
  window.addEventListener("wheel", () => {}); // scroll kdykoliv
  window.addEventListener("touchstart", () => {}); // touch kdykoliv
});



/* ----- ODKRYTÍ FOTOGRAFIE V SEKCI O MĚ ----- */
window.addEventListener("scroll", () => {
  const aboutFoto = document.querySelector(".about-foto");
  const section = document.querySelector(".about-me");

  if (!aboutFoto || !section) return;

  // --- desktop ---
  if (window.innerWidth < 768) return; // breakpoint podle media query

  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const visibleHeight = Math.min(rect.height, Math.max(0, windowHeight - rect.top));
  let visiblePercent = visibleHeight / rect.height;

  visiblePercent = Math.min(Math.max(visiblePercent, 0), 1);

  const threshold = 0.3;

  if (visiblePercent >= threshold) {
    aboutFoto.style.setProperty("--translateX", `100%`);
    window.removeEventListener("scroll", arguments.callee);
  } else {
    aboutFoto.style.setProperty("--translateX", `0%`);
  }
});


/* ----- VALIDACE A NASTAVENÍ KONTAKTNÍHO FORMULÁŘE + HLÁŠKA ----- */
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



/* ----- ODESLÁNÍ EMAILU PŘES KONTAKTNÍ FORMULÁŘ ----- */
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // zabrání klasickému submitu

    const name = encodeURIComponent(document.getElementById("name").value);
    const email = encodeURIComponent(document.getElementById("email").value);
    const phone = encodeURIComponent(document.getElementById("phone").value);
    const message = encodeURIComponent(document.getElementById("message").value);

    const body = `Jméno: ${name}%0AEmail: ${email}%0ATelefon: ${phone}%0A%0A${message}`;
    const mailtoLink = `mailto:divis.tereza@gmail.com?subject=Zpráva z webu&body=${body}`;

    window.location.href = mailtoLink;
});



/* ----- TLAČÍTKO CROLL NA ZAČÁTEK STRÁNKY ----- */
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



