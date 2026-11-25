/**
 * MD Roqias Iqbal - Portfolio Interactive Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader Fadeout
  const preload = document.getElementById('preload');
  if (preload) {
    setTimeout(() => {
      preload.style.opacity = '0';
      preload.style.pointerEvents = 'none';
      setTimeout(() => {
        preload.style.display = 'none';
      }, 600);
    }, 400);
  }

  // 2. Real-time Local Clock & Date
  function updateClock() {
    const dateEl = document.querySelector('.time-local .date');
    const clockEl = document.querySelector('.time-local .clock');
    const now = new Date();
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 3. Theme Toggle (Dark / Light)
  const themeToggle = document.querySelector('.toggle-switch-mode');
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-color-scheme', theme);
    try {
      localStorage.setItem('darkMode', theme);
    } catch (e) {}

    if (themeToggle) {
      if (theme === 'dark') {
        themeToggle.classList.add('active');
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
      } else {
        themeToggle.classList.remove('active');
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
      }
    }
  }

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('darkMode') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });

    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      }
    });
  }

  // 4. Mobile Menu Drawer
  const mobileBtn = document.querySelector('.action-open-mobile button');
  const mobileNav = document.querySelector('.nav-mobile-list');
  const overlayPop = document.querySelector('.overlay-pop');
  const btnMenu = document.querySelector('.btn-mobile-menu');

  function openMobile() {
    mobileNav?.classList.add('open');
    overlayPop?.classList.add('open');
    btnMenu?.classList.add('close');
    document.body.classList.add('overflow-hidden');
  }

  function closeMobile() {
    mobileNav?.classList.remove('open');
    overlayPop?.classList.remove('open');
    btnMenu?.classList.remove('close');
    document.body.classList.remove('overflow-hidden');
  }

  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      if (mobileNav?.classList.contains('open')) {
        closeMobile();
      } else {
        openMobile();
      }
    });
  }

  if (overlayPop) {
    overlayPop.addEventListener('click', closeMobile);
  }

  document.querySelectorAll('.nav-mobile-item .item-link').forEach(link => {
    link.addEventListener('click', closeMobile);
  });

  // 5. Back to Top Smooth Scroll
  const goTop = document.querySelector('.go-top');
  if (goTop) {
    goTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Rotating Headline Subtitles ("Roqias", "AI & ML Engineer", ...)
  const words = document.querySelectorAll('.cd-words-wrapper .item-text');
  if (words.length > 1) {
    let activeIdx = 0;
    setInterval(() => {
      words[activeIdx].classList.remove('is-visible');
      words[activeIdx].classList.add('is-hidden');
      activeIdx = (activeIdx + 1) % words.length;
      words[activeIdx].classList.remove('is-hidden');
      words[activeIdx].classList.add('is-visible');
    }, 2800);
  }

  // 7. Interactive Skill Accordions
  const accordionActions = document.querySelectorAll('.accordion-action');
  accordionActions.forEach(action => {
    action.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = action.getAttribute('data-bs-target') || action.getAttribute('href');
      const targetCollapse = document.querySelector(targetId);
      if (!targetCollapse) return;

      const isCurrentlyOpen = targetCollapse.classList.contains('show');

      // Close other accordions inside #accordion-service
      const parent = document.getElementById('accordion-service');
      if (parent) {
        parent.querySelectorAll('.collapse.show').forEach(openCol => {
          if (openCol !== targetCollapse) {
            openCol.classList.remove('show');
            const otherBtn = openCol.closest('.service-accordion_item')?.querySelector('.accordion-action');
            if (otherBtn) {
              otherBtn.classList.add('collapsed');
              otherBtn.setAttribute('aria-expanded', 'false');
            }
          }
        });
      }

      if (isCurrentlyOpen) {
        targetCollapse.classList.remove('show');
        action.classList.add('collapsed');
        action.setAttribute('aria-expanded', 'false');
      } else {
        targetCollapse.classList.add('show');
        action.classList.remove('collapsed');
        action.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 8. Stat Counters Animation (0 -> target)
  const counterElements = document.querySelectorAll('.wg-counter .number');
  counterElements.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-to') || '3', 10);
    const speed = parseInt(counter.getAttribute('data-speed') || '1000', 10);
    const stepTime = Math.max(Math.floor(speed / target), 80);
    let current = 0;
    const timer = setInterval(() => {
      current++;
      counter.textContent = current;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      }
    }, stepTime);
  });

  // 9. Circular Text Graphic
  const circTextEl = document.getElementById('circularText');
  if (circTextEl && (!circTextEl.textContent || circTextEl.textContent.trim() === '')) {
    const text = "AI & ML ENGINEER • FULL-STACK DEVELOPER • ";
    circTextEl.innerHTML = text.split('').map((char, i) => 
      `<span style="transform:rotate(${i * (360 / text.length)}deg);position:absolute;left:50%;transform-origin:0 35px">${char}</span>`
    ).join('');
  }

  // 10. Contact Form Handler (Graceful feedback)
  const contactForm = document.getElementById('contactform');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value || 'Friend';
      const email = document.getElementById('email')?.value || '';
      const message = document.getElementById('message')?.value || '';
      
      // Construct mailto link
      const mailtoUrl = `mailto:mdroquaish1015@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
      window.location.href = mailtoUrl;
    });
  }
});
