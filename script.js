// =========================================================
// Nick — shared script
// Used by: index.html, about.html, poems.html, contact.html
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a nav link is clicked (useful on mobile)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Highlight the current page in the nav
  var currentPage = (window.location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("is-active");
    }
  });

  // Contact form — submits to Formspree (see form's action= attribute)
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
        status.classList.remove("success");
        status.textContent = "Form isn't connected yet — add your Formspree form ID to contact.html.";
        return;
      }

      status.classList.remove("success");
      status.textContent = "Sending...";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            status.textContent = "Thanks — your message has been sent.";
            status.classList.add("success");
            form.reset();
          } else {
            status.textContent = "Something went wrong. Please email directly instead.";
          }
        })
        .catch(function () {
          status.textContent = "Something went wrong. Please email directly instead.";
        });
    });
  }
});
