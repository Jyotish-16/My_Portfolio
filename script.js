/* ============================================
   Jyotish Rakoti — Portfolio JavaScript
   Typing effect, scroll reveal, navbar, etc.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Typing Animation ---------- */
  const typedEl = document.getElementById('typed-text');
  const titles = [
    'Computer Science Engineering Student',
    'Full Stack Developer',
    'AI / ML Enthusiast',
    'Problem Solver'
  ];
  let titleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = titles[titleIdx];
    typedEl.textContent = current.substring(0, charIdx);

    if (!deleting) {
      charIdx++;
      if (charIdx > current.length) {
        setTimeout(() => { deleting = true; type(); }, 1800);
        return;
      }
    } else {
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
      }
    }
    setTimeout(type, deleting ? 40 : 80);
  }
  type();

  /* ---------- Navbar Scroll Effect ---------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function onScroll() {
    // Navbar background
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active section highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });

    // Scroll-to-top visibility
    document.getElementById('scroll-top')
      .classList.toggle('visible', window.scrollY > 400);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile Menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksEl.classList.toggle('open');
  });

  // Close menu on link click
  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksEl.classList.remove('open');
    });
  });

  /* ---------- Scroll Reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));

  /* ---------- Scroll-to-Top ---------- */
  document.getElementById('scroll-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Resume Modal ---------- */
  const resumeModal = document.getElementById('resume-modal');
  const resumeCloseBtn = document.getElementById('resume-modal-close');

  function closeResumeModal() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  resumeCloseBtn.addEventListener('click', closeResumeModal);

  // Close on overlay click (outside the modal card)
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResumeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      closeResumeModal();
    }
  });

});
