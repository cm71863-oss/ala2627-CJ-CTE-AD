(function () {
  "use strict";

  var root = document.documentElement;
  var glow = document.querySelector(".cursor-glow");
  var clock = document.querySelector("#clock");
  var themeToggle = document.querySelector(".theme-toggle");

  function updateClock() {
    var now = new Date();
    clock.textContent = now.toLocaleTimeString("en-US", {
      timeZone: "America/Phoenix",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  }

  updateClock();
  window.setInterval(updateClock, 30000);

  window.addEventListener("pointermove", function (event) {
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
  });

  themeToggle.addEventListener("click", function () {
    var isLight = root.getAttribute("data-theme") === "light";
    if (isLight) root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "light");
  });

  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }

  document.querySelectorAll(".filter-button").forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      document.querySelectorAll(".project-card").forEach(function (card) {
        card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
      });
    });
  });
}());
