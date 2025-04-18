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
  /*const skillItems = document.querySelectorAll(".skill-item");

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
  };*/

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

  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY === 0) {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "none";
    }
  });
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
