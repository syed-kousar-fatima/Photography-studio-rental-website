'use strict';

(function initTheme() {
  const stored = localStorage.getItem('fs-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', () => {

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('fs-theme', next);
    });
  }

  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  
  const header = document.getElementById('site-header');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

    const scrollPos = window.scrollY + 120;

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
            current = section.id;
        }

    });

    navLinks.forEach(link => link.classList.remove("active"));

    if (window.location.pathname.includes("about.html") || window.location.pathname === "/") {

        document.querySelector('.nav-link[href="about.html"]')
            ?.classList.add("active");

    }

}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');

  const toggleMobileMenu = () => {
    const isOpen = hamburgerBtn.classList.contains('open');
    if (isOpen) {
      hamburgerBtn.classList.remove('open');
      mobileNav.classList.remove('open');
    } else {
      hamburgerBtn.classList.add('open');
      mobileNav.classList.add('open');
    }
  };

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    
    
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

});

document.addEventListener('DOMContentLoaded', () => {
   
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      threshold: 0.15
    });

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
      revealObserver.observe(el);
    });

    const countCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          let count = 0;
          const speed = 2000 / target;
          
          const updateCount = () => {
            // const increment = target / 100;
            const increment = Math.max(target / 100, 1,3,2);

            if (count < target) {
              count += increment;
              entry.target.innerText = Math.ceil(count);
              setTimeout(updateCount, 20);
            } else {
              entry.target.innerText = target;
            }
          };
          updateCount();
          observer.unobserve(entry.target);
        }
      });
    };

    const countObserver = new IntersectionObserver(countCallback, { threshold: 0.5 });
    document.querySelectorAll('.stat-number').forEach(num => countObserver.observe(num));
  });

  document.addEventListener("DOMContentLoaded", () => {

  const counters = document.querySelectorAll(".stat-number");

  const counterObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const counter = entry.target;

        const target = +counter.getAttribute("data-target");
        const suffix = counter.getAttribute("data-suffix") || "";

        let count = 0;
        const increment = target / 100;
//  const increment = Math.max(target / 100, 1,2,3);

        // Show initial value with suffix
        counter.innerText = "0" + suffix;

        const updateCounter = () => {

          count += increment;

          if (count < target) {
            counter.innerText =
              Math.floor(count).toLocaleString() + suffix;

            requestAnimationFrame(updateCounter);

          } else {
            counter.innerText =
              target.toLocaleString() + suffix;
          }
        };

        updateCounter();

        observer.unobserve(counter);
      }

    });

  }, {
    threshold: 0.5
  });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const rtlToggle = document.getElementById("rtlToggle");
  const rtlText = rtlToggle.querySelector(".rtl-text");
  const html = document.documentElement;

  // Load saved direction
  const savedDir = localStorage.getItem("dir") || "ltr";
  html.setAttribute("dir", savedDir);

  // Set initial button text
  rtlText.textContent = savedDir.toUpperCase();

  rtlToggle.addEventListener("click", () => {
    const currentDir = html.getAttribute("dir");
    const newDir = currentDir === "ltr" ? "rtl" : "ltr";

    html.setAttribute("dir", newDir);
    localStorage.setItem("dir", newDir);

    // Update button text
    rtlText.textContent = newDir.toUpperCase();
  });
});
