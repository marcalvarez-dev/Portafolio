document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when a nav link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    const headerHeight = document.querySelector("header").offsetHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  });

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Skills animation on scroll
  const skillItems = document.querySelectorAll(".skill-item");

  const animateSkills = () => {
    skillItems.forEach((item) => {
      const progressBar = item.querySelector(".progress-bar");
      const percentage = progressBar.style.width;

      progressBar.style.width = "0%";

      setTimeout(() => {
        progressBar.style.transition = "width 1.5s ease-in-out";
        progressBar.style.width = percentage;
      }, 200);
    });
  };

  // Use Intersection Observer to trigger skill animation when in view
  const skillsSection = document.querySelector(".skills");

  if (skillsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(skillsSection);
  }


});



/* ----- SEND WHATSAPP ----- */
function sendWhatsapp() {
  const pnumber = "34695624676"; // <-- tu número, con código de país (34 para España)
  const mensaje = encodeURIComponent("¡Hola,! Estoy interesado en tu trabajo.");
  const url = `https://wa.me/${pnumber}?text=${mensaje}`;

  window.open(url, "_blank");
}

/* ----- DOWNLOAD CV ----- */
function downloadPDF() {
  const link = document.createElement("a");
  link.href = "assets/files/cv_marc.pdf"; // <-- aquí pones la ruta a tu PDF
  link.download = "MarcAlvarezCV.pdf"; // <-- nombre con el que quieres que se descargue
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function sendMail() {
  event.preventDefault();
  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("service_rr84zav", "template_7qai71k", parms)
    .then(() => {
      alert("Email Sent!");
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
    });
}

function openVideoLocal(src) {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("html5Video");
  video.src = src;
  video.load();
  video.play();
  modal.style.display = "flex";
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("html5Video");
  video.pause();
  video.currentTime = 0;
  video.src = "";
  modal.style.display = "none";
}

const translations = {
  es: {
    name: "Marc Álvarez Ruiz",
    heroText: "Desarrollador frontend, en constante crecimiento y con ganas de dar vida a nuevas ideas.",
    portfolioBtn: "Portafolio",
    contactBtn: "Contáctame",
    aboutTitle: "Sobre mi",
    whoTitle: "¿Quién soy?",
    aboutDescription: "Soy desarrollador frontend con una sólida base en HTML, CSS y JavaScript. Con 1 año de experiencia en desarrollo web, he trabajado en proyectos que van desde sitios para pequeñas empresas hasta aplicaciones web complejas. He trabajado con React Native para el desarrollo de aplicaciones móviles y con CMS para la creación y gestión de contenidos. Además de la programación, soy un apasionado de la historia y hablo español, catalán, ruso e inglés, lo que amplía mi perspectiva y mercado.",
    nameLabel: "Nombre",
    nameValue: "Marc Álvarez Ruiz",
    emailLabel: "Email",
    locationLabel: "Ubicación",
    locationValue: "Barcelona, España",
    educationLabel: "Educación",
    educationValue: "Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web",
    downloadCV: 'Descargar CV <i class="fa-regular fa-file"></i>',
    skillsTitle: "Mis habilidades",
    frontendSkills: "Desarrollo Frontend",
    otherSkills: "Otras habilidades",
    responsiveDesign: "Responsive Design",
    projectsTitle: "Mis proyectos",
    todoTitle: "To-do app",
    todoDescription: "Aplicación web desarrollada con React para gestionar tareas, con funcionalidades para añadir, eliminar y reorganizar elementos fácilmente.",
    weatherTitle: "Weather app",
    weatherDescription: "Aplicación web desarrollada con React para consultar el clima actual y el pronóstico a 5 días de cualquier ciudad del mundo.",
    contactTitle: "Contacta conmigo",
    contactHeader: "Contacto",
    phoneLabel: "Teléfono",
    sendMsg: "Envíame un mensaje",
    sendBtn: 'Enviar <i class="fa-solid fa-paper-plane"></i>',
    nameInput: "Nombre",
    emailInput: "Email",
    subjectInput: "Asunto",
    messageInput: "Tu Mensaje",
    navHome: "Inicio",
    navAbout: "Sobre mí",
    navSkills: "Habilidades",
    navProjects: "Portafolio",
    navContact: "Contáctame",
    projectButton: "Ver",
  },
  ru: {
    name: "Марк Альварес Руис",
    heroText: "Frontend-разработчик, постоянно развиваюсь и стремлюсь воплощать идеи в жизнь.",
    portfolioBtn: "Портфолио",
    contactBtn: "Связаться",
    aboutTitle: "Обо мне",
    whoTitle: "Кто я?",
    aboutDescription: "Я — frontend-разработчик с прочной базой в HTML, CSS и JavaScript. Имея год опыта в веб-разработке, я участвовал в проектах — от сайтов для малого бизнеса до сложных веб-приложений. Я работал с React Native для создания мобильных приложений, а также с CMS для управления контентом. Помимо программирования, я увлекаюсь историей и говорю на испанском, каталанском, русском и английском языках, что расширяет мою перспективу и рынок.",
    nameLabel: "Имя",
    nameValue: "Марк Альварес Руис",
    emailLabel: "Электронная почта",
    locationLabel: "Местоположение",
    locationValue: "Барселона, Испания",
    educationLabel: "Образование",
    educationValue: "Высшее профессиональное образование по веб-разработке",
    downloadCV: 'Скачать резюме <i class="fa-regular fa-file"></i>',
    skillsTitle: "Мои навыки",
    frontendSkills: "Frontend разработка",
    otherSkills: "Другие навыки",
    responsiveDesign: "Адаптивный дизайн",
    projectsTitle: "Мои проекты",
    todoTitle: "To-do приложение",
    todoDescription: "Веб-приложение, разработанное на React для управления задачами с возможностью их добавления, удаления и удобной перестановки.",
    weatherTitle: "Приложение погоды",
    weatherDescription: "Веб-приложение, разработанное с помощью React, для проверки текущей погоды и пятидневного прогноза для любого города мира.",
    contactTitle: "Свяжитесь со мной",
    contactHeader: "Контакты",
    phoneLabel: "Телефон",
    sendMsg: "Отправьте сообщение",
    sendBtn: 'Отправить <i class="fa-solid fa-paper-plane"></i>',
    nameInput: "Имя",
    emailInput: "Email",
    subjectInput: "Тема",
    messageInput: "Ваше сообщение",
    navHome: "Главная",
    navAbout: "Обо мне",
    navSkills: "Навыки",
    navProjects: "Портфолио",
    navContact: "Связаться",
    projectButton: "Смотреть",
  },
};

let currentLang = "es";

function updateLanguage() {
  const langBtn = document.querySelector(".lang-btn img");
  langBtn.src = currentLang === "es" ? "img/flags/es.png" : "img/flags/ru.png";
  langBtn.alt = currentLang === "es" ? "Español" : "Русский";

  // Traducir textos
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (key === "downloadCV" || key === "sendBtn") {
      el.innerHTML = translations[currentLang][key];
    } else {
      el.textContent = translations[currentLang][key];
    }
  });

  // Traducir placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", translations[currentLang][key]);
  });
};

// Escuchar clics en las opciones del menú
document.querySelectorAll(".lang-dropdown li").forEach(item => {
  item.addEventListener("click", () => {
    currentLang = item.getAttribute("data-lang");
    updateLanguage();
  });
});

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY === 0) {
    header.classList.add("no-shadow");
  } else {
    header.classList.remove("no-shadow");
  }
});