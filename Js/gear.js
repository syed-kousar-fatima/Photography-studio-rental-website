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


  document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    // -----------------------------
    // Highlight current page
    // -----------------------------
    function setActivePage() {

        let currentPage = window.location.pathname.split("/").pop();

        // Handles "/", "/index.html"
        if (currentPage === "") {
            currentPage = "blog.html";
        }

        navLinks.forEach(link => {
            link.classList.remove("active");

            const href = link.getAttribute("href").replace("./", "");

            if (href === currentPage) {
                link.classList.add("active");
            }
        });
    }

    // -----------------------------
    // Scroll Spy (Home page only)
    // -----------------------------
    function updateScrollSpy() {

        let current = "";

        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {

            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (scrollPos >= top && scrollPos < bottom) {
                current = section.id;
            }

        });

        if (current !== "") {

            navLinks.forEach(link => {

                const href = link.getAttribute("href");

                if (href.startsWith("#")) {
                    link.classList.toggle(
                        "active",
                        href === "#" + current
                    );
                }

            });

        }

    }

    // Initial highlight
    setActivePage();

    // Scroll spy only on Home page
    if (window.location.pathname.endsWith("blog.html") ||
        window.location.pathname === "/" ||
        window.location.pathname === "") {

        window.addEventListener("scroll", updateScrollSpy, {
            passive: true
        });

        updateScrollSpy();
    }

});
});

 document.addEventListener('DOMContentLoaded', () => {

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
      revealObserver.observe(el);
    });

    
    window.addEventListener('scroll', () => {
      const scrollPos = window.pageYOffset;
      const heroImg = document.querySelector('.main-gear-img');
      if (heroImg) {
        heroImg.style.transform = `translateY(${scrollPos * 0.1}px) scale(1.05)`;
      }
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
