

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



///// Slide Home Section //////
/*document.addEventListener("DOMContentLoaded", () => {
  const goToProjects = document.getElementById("goToProjects");
  const projektySection = document.getElementById("projekty");
  const downArrow = document.querySelector(".dropdown img");

  let isScrolling = false;
  let lastScrollY = window.scrollY;

  function scrollToProjects() {
    if (isScrolling) return;
    isScrolling = true;

    projektySection.scrollIntoView({ behavior: "smooth" });

    // Po krátké době reset flagu, aby šlo znovu spustit
    setTimeout(() => {
      isScrolling = false;
    }, 900); // délka animace ≈ čas scrollIntoView
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

    const threshold = 140; // malý posun pro spuštění

    if (scrollingDown && currentY > threshold) {
      scrollToProjects();
    }
  });

  // Přerušení animace uživatelem - scroll, touch
  window.addEventListener("wheel", () => { isScrolling = false; });
  window.addEventListener("touchstart", () => { isScrolling = false; });
});
*/

///// Slide Home Section /////
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

    const threshold = 140; // Malý posun pro spuštění

    // Spustí se jen pokud jsme na HOME a scrollujeme dolů
    if (scrollingDown && currentY > threshold && currentY < projektySection.offsetTop - 10) {
      scrollToProjects();
    }
  });

  // Přerušení plynulého scrollu uživatelem
  // Pokud uživatel začne scrollovat nebo touchovat, scrollToProjects se nepřekáží
  window.addEventListener("wheel", () => {}); // uživatel může scrollovat kdykoliv
  window.addEventListener("touchstart", () => {}); // uživatel může touchovat kdykoliv
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

/*document.addEventListener("DOMContentLoaded", function () {
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
});*/

//////////////////////////////////////////////////////////////////////
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