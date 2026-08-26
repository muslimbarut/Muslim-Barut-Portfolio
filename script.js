// ============================================
// BOOT SEQUENCE
// ============================================
(function boot() {
  const bootLines = document.getElementById('bootLines');
  const bootScreen = document.getElementById('bootScreen');

  const lines = [
    { text: '$ initializing portfolio_env...', cls: 'dim' },
    { text: '$ loading modules: html, css, js', cls: 'dim' },
    { text: '$ mounting profile...', cls: '' },
    { text: '[ OK ] connection established', cls: 'ok' },
    { text: '$ welcome, visitor_', cls: '' },
  ];

  let i = 0;
  function nextLine() {
    if (i >= lines.length) {
      setTimeout(() => bootScreen.classList.add('hidden'), 350);
      return;
    }
    const div = document.createElement('div');
    div.textContent = lines[i].text;
    if (lines[i].cls) div.classList.add(lines[i].cls);
    div.style.animationDelay = '0s';
    bootLines.appendChild(div);
    i++;
    setTimeout(nextLine, 220);
  }

  // Respect reduced motion: skip boot animation delay mostly
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    bootScreen.classList.add('hidden');
  } else {
    nextLine();
  }
})();

// ============================================
// HERO TYPED COMMAND
// ============================================
(function typeHeroCommand() {
  const el = document.getElementById('heroCmd');
  const cmd = './run_intro.sh';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    el.textContent = cmd;
    return;
  }

  let idx = 0;
  function type() {
    if (idx <= cmd.length) {
      el.textContent = cmd.slice(0, idx);
      idx++;
      setTimeout(type, 55);
    }
  }
  setTimeout(type, 1200); // start after boot screen fades
})();

// ============================================
// HERO NAME TYPING
// ============================================
(function typeHeroName() {
  const el = document.getElementById("heroName");

  if (!el) return;

  const name = "Muslim Barut";
  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduced) {
    el.textContent = name;
    return;
  }

  let index = 0;

  function typeName() {
    if (index < name.length) {
      el.textContent = name.slice(0, index + 1);
      index++;

      setTimeout(typeName, 100);
    }
  }

  // Tangura inyuma gato ya boot screen
  setTimeout(typeName, 1200);
})();

// ============================================
// HERO BIO TYPING LOOP
// ============================================
(function typeHeroBio() {
  const el = document.getElementById("heroBio");

  const lines = [
    "Passionate IT student from Burundi.",
    "Focused on Python, Linux & Web Development.",
    "Building practical software with Git."
  ];

  let line = 0;
  let char = 0;
  let deleting = false;

  function animate() {
    const text = lines[line];

    if (!deleting) {
      el.textContent = text.slice(0, char + 1);
      char++;

      if (char === text.length) {
        deleting = true;
        setTimeout(animate, 1200);
        return;
      }
      setTimeout(animate, 35);
    } else {
      el.textContent = text.slice(0, char - 1);
      char--;

      if (char === 0) {
        deleting = false;
        line = (line + 1) % lines.length;
        setTimeout(animate, 250);
        return;
      }
      setTimeout(animate, 18);
    }
  }

  setTimeout(animate, 1700);
})();

// ============================================
// NAVIGATION (Location y'ukuri ku bice byose)
// ============================================
(function nav() {
  const navButtons = document.querySelectorAll('.topbar-nav button, .mobile-nav button');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  // Kanda ku buto zo mu menu (About, Skills, Projects, etc.)
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target');
      const target = document.getElementById(targetId);

      closeMobileNav();

      if (target) {
        // Kubara neza intera ukuyeho uburebure bwa Topbar gusa (nta giharuro kije ku mutwe)
        const topbar = document.querySelector('.topbar');
        const topbarHeight = topbar ? topbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - topbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Toggle ya Mobile Menu
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Funga menu niba ukandagije hanze yayo
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMobileNav();
    }
  });

  // CTA Buttons (View projects, Get in touch, etc.)
  document.querySelectorAll('a[data-target]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = a.getAttribute('data-target');
      const target = document.getElementById(targetId);
      
      if (target) {
        const topbar = document.querySelector('.topbar');
        const topbarHeight = topbar ? topbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - topbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
})();


// ============================================
// SCROLL REVEAL
// ============================================
(function scrollReveal() {
  const reveals = document.querySelectorAll('.reveal-body');
  const skillBars = document.querySelectorAll('.skill-bar span');

  // capture inline widths into CSS var so the reveal transition can animate them
  skillBars.forEach(bar => {
  const w = bar.style.width;
  bar.dataset.width = w;
  bar.style.width = "0";
});

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);entry.target.querySelectorAll(".skill-bar span").forEach(bar => {
  bar.style.width = bar.dataset.width;
});
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();

// ============================================
// CONTACT FORM (front-end only demo handling)
// ============================================
(function contactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const label = document.getElementById('submitLabel');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    label.textContent = 'sending...';
    status.textContent = '';

    setTimeout(() => {
      label.textContent = 'send message';
      status.textContent = '[ OK ] message queued — I\u2019ll get back to you soon.';
      form.reset();
    }, 900);
  });
})();

// ============================================
// ACTIVE NAV HIGHLIGHT ON SCROLL (optional polish)
// ============================================
(function activeSection() {
  const sections = document.querySelectorAll('main .section[id]');
  const navButtons = document.querySelectorAll('.topbar-nav button');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const btn = document.querySelector(`.topbar-nav button[data-target="${id}"]`);
      if (!btn) return;
      if (entry.isIntersecting) {
        navButtons.forEach(b => b.style.color = '');
        btn.style.color = 'var(--accent)';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

// CONTACT POPUP
const openBtn = document.getElementById("openForm");
const closeBtn = document.getElementById("closeForm");
const modal = document.getElementById("contactModal");

openBtn.addEventListener("click", () => {
  modal.classList.add("open");

  setTimeout(() => {
    document.getElementById("cf-name").focus();
  }, 100);
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("open");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("open");
  }
});