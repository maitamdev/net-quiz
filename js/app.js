/* ========================================
   NetQuiz - Main App Entry Point
   ======================================== */

import { Router } from './router.js';
import { renderLanding } from './landing.js';
import { renderPractice } from './practice.js';
import { renderQuiz } from './quiz.js';
import { renderExam } from './exam.js';
import { renderResults } from './results.js';
import { renderDashboard } from './dashboard.js';

// Initialize app
const app = document.getElementById('app');
const router = new Router(app);

// Register routes
router
  .addRoute('/', renderLanding)
  .addRoute('/practice', renderPractice)
  .addRoute('/quiz', renderQuiz)
  .addRoute('/exam', renderExam)
  .addRoute('/results', renderResults)
  .addRoute('/dashboard', renderDashboard);

// === Navbar scroll effect ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// === Mobile hamburger menu ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navLinks?.classList.remove('open');
  });
});

// === Keyboard navigation ===
document.addEventListener('keydown', (e) => {
  // ESC closes mobile menu
  if (e.key === 'Escape') {
    hamburger?.classList.remove('active');
    navLinks?.classList.remove('open');

    // Close exam modal
    document.querySelector('.exam-modal-overlay')?.classList.remove('visible');
  }
});

console.log('%c🌐 NetQuiz', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cChinh phục Mạng Máy Tính thông minh', 'font-size: 12px; color: #a0a3c4;');
