/* ========================================
   NetQuiz - Exam Mode
   ======================================== */

import { fetchExamQuestions, saveResult, toggleBookmark } from './data.js';

export async function renderExam(container) {
  // Show loading
  container.innerHTML = `<div class="quiz-page" style="justify-content: center; align-items: center;"><div class="loading-spinner"></div></div>`;

  const examQuestions = await fetchExamQuestions(45);
  const totalQ = examQuestions.length;
  const EXAM_TIME = 45 * 60;

  const state = {
    current: 0,
    answers: new Array(totalQ).fill(null),
    flagged: new Set(),
    timeLeft: EXAM_TIME,
    showExplanation: false,
    submitted: false,
  };

  let timerInterval;

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      state.timeLeft--;

      // Update timer display
      const timerEl = document.querySelector('.exam-timer-countdown');
      if (timerEl) {
        timerEl.textContent = formatTime(state.timeLeft);
        if (state.timeLeft <= 300) {
          timerEl.classList.add('warning');
        }
      }

      // Update progress
      const progressFill = document.querySelector('.exam-progress-fill');
      if (progressFill) {
        const answered = state.answers.filter(a => a !== null).length;
        progressFill.style.width = `${(answered / totalQ) * 100}%`;
      }

      const progressText = document.querySelector('.exam-progress-text');
      if (progressText) {
        const answered = state.answers.filter(a => a !== null).length;
        progressText.textContent = `${answered}/${totalQ} đã trả lời`;
      }

      if (state.timeLeft <= 0) {
        clearInterval(timerInterval);
        submitExam();
      }
    }, 1000);
  }

  function submitExam() {
    state.submitted = true;
    clearInterval(timerInterval);

    let correct = 0;
    examQuestions.forEach((q, i) => {
      if (state.answers[i] === q.correct) correct++;
    });

    const timeSpent = EXAM_TIME - state.timeLeft;

    // Save to Supabase
    saveResult({
      score: correct,
      total: totalQ,
      timeSpent,
      mode: 'exam',
      chapterId: null,
    });

    window.location.hash = `/results?correct=${correct}&total=${totalQ}&time=${timeSpent}&mode=exam`;
  }

  function showSubmitModal() {
    const overlay = container.querySelector('.exam-modal-overlay');
    if (overlay) {
      const answered = state.answers.filter(a => a !== null).length;
      const unanswered = totalQ - answered;
      const flaggedCount = state.flagged.size;

      overlay.querySelector('.modal-answered-val').textContent = answered;
      overlay.querySelector('.modal-unanswered-val').textContent = unanswered;
      overlay.querySelector('.modal-flagged-val').textContent = flaggedCount;

      overlay.classList.add('visible');
    }
  }

  function render() {
    document.body.classList.add('exam-mode');
    const q = examQuestions[state.current];

    container.innerHTML = `
      <!-- Exam Timer Bar -->
      <div class="exam-timer-bar">
        <div class="exam-timer-left">
          <div class="exam-timer-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Thời gian còn lại
          </div>
          <div class="exam-timer-countdown${state.timeLeft <= 300 ? ' warning' : ''}">${formatTime(state.timeLeft)}</div>
        </div>
        <div class="exam-progress-section">
          <div class="progress-bar progress-bar-sm">
            <div class="progress-bar-fill exam-progress-fill" style="width: ${(state.answers.filter(a => a !== null).length / totalQ) * 100}%"></div>
          </div>
          <div class="exam-progress-text">${state.answers.filter(a => a !== null).length}/${totalQ} đã trả lời</div>
        </div>
        <button class="btn btn-danger btn-sm exam-submit-btn" id="examSubmitTop">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Nộp bài thi
        </button>
      </div>

      <div class="quiz-page">
        <!-- Left Nav -->
        <aside class="quiz-nav">
          <div class="quiz-nav-header">
            <div class="quiz-nav-title">Thi Thử</div>
            <div class="quiz-nav-subtitle">${totalQ} câu · 45 phút</div>
          </div>
          <div class="quiz-nav-grid" id="examNavGrid">
            ${examQuestions.map((_, i) => `
              <button class="quiz-nav-item${i === state.current ? ' current' : ''}${state.answers[i] !== null ? ' answered' : ''}${state.flagged.has(i) ? ' flagged' : ''}"
                data-index="${i}">
                ${i + 1}
              </button>
            `).join('')}
          </div>
          <div class="quiz-nav-legend">
            <div class="legend-item"><div class="legend-dot current-dot"></div> Hiện tại</div>
            <div class="legend-item"><div class="legend-dot answered-dot"></div> Đã trả lời</div>
            <div class="legend-item"><div class="legend-dot flagged-dot"></div> Đánh dấu</div>
            <div class="legend-item"><div class="legend-dot unanswered-dot"></div> Chưa trả lời</div>
          </div>
        </aside>

        <!-- Right Content -->
        <div class="quiz-main">
          <div class="quiz-question-header">
            <div class="quiz-question-number">
              Câu <strong>${state.current + 1}</strong> / ${totalQ}
              <span style="margin-left: var(--space-3);"><span class="badge badge-cyan">${q.topic}</span></span>
            </div>
            <button class="quiz-flag-btn${state.flagged.has(state.current) ? ' flagged' : ''}" id="flagBtn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${state.flagged.has(state.current) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                <line x1="4" y1="22" x2="4" y2="15"/>
              </svg>
              Đánh dấu
            </button>
          </div>

          <div class="quiz-question-card">
            <div class="quiz-question-text">${q.text}</div>
            <div class="quiz-answers" id="examAnswers">
              ${q.answers.map(a => `
                <button class="quiz-answer${state.answers[state.current] === a.letter ? ' selected' : ''}"
                  data-letter="${a.letter}">
                  <div class="quiz-answer-letter">${a.letter}</div>
                  <div class="quiz-answer-text">${a.text}</div>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="quiz-actions">
            <div class="quiz-actions-left">
              <button class="btn btn-secondary" id="prevBtn" ${state.current === 0 ? 'disabled style="opacity:0.5"' : ''}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                Trước
              </button>
            </div>
            <div class="quiz-actions-right">
              ${state.current === totalQ - 1
                ? `<button class="btn btn-success" id="submitExamBtn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Nộp bài thi
                  </button>`
                : `<button class="btn btn-primary" id="nextBtn">
                    Tiếp
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>`
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Modal -->
      <div class="exam-modal-overlay" id="submitModal">
        <div class="exam-modal">
          <div class="exam-modal-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--amber-400)" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h3>Nộp bài thi?</h3>
          <p>Bạn có chắc muốn nộp bài thi không? Bạn sẽ không thể thay đổi câu trả lời sau khi nộp.</p>
          <div class="exam-modal-stats">
            <div class="exam-modal-stat">
              <div class="exam-modal-stat-value modal-answered-val" style="color: var(--green-400)">0</div>
              <div class="exam-modal-stat-label">Đã làm</div>
            </div>
            <div class="exam-modal-stat">
              <div class="exam-modal-stat-value modal-unanswered-val" style="color: var(--amber-400)">0</div>
              <div class="exam-modal-stat-label">Chưa làm</div>
            </div>
            <div class="exam-modal-stat">
              <div class="exam-modal-stat-value modal-flagged-val" style="color: var(--red-400)">0</div>
              <div class="exam-modal-stat-label">Đánh dấu</div>
            </div>
          </div>
          <div class="exam-modal-actions">
            <button class="btn btn-secondary" id="modalCancel">Tiếp tục Làm bài</button>
            <button class="btn btn-danger" id="modalSubmit">Nộp Ngay</button>
          </div>
        </div>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Answers
    container.querySelectorAll('.quiz-answer').forEach(btn => {
      btn.addEventListener('click', () => {
        state.answers[state.current] = btn.dataset.letter;
        container.querySelectorAll('.quiz-answer').forEach(a => {
          a.classList.toggle('selected', a.dataset.letter === btn.dataset.letter);
        });
        const navItem = container.querySelector(`.quiz-nav-item[data-index="${state.current}"]`);
        if (navItem) navItem.classList.add('answered');

        // Update progress
        const answered = state.answers.filter(a => a !== null).length;
        const pf = container.querySelector('.exam-progress-fill');
        if (pf) pf.style.width = `${(answered / totalQ) * 100}%`;
        const pt = container.querySelector('.exam-progress-text');
        if (pt) pt.textContent = `${answered}/${totalQ} đã trả lời`;
      });
    });

    // Nav
    container.querySelectorAll('.quiz-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        state.current = parseInt(item.dataset.index);
        render();
      });
    });

    // Flag / Bookmark
    container.querySelector('#flagBtn')?.addEventListener('click', () => {
      const q = examQuestions[state.current];
      state.flagged.has(state.current) ? state.flagged.delete(state.current) : state.flagged.add(state.current);
      toggleBookmark(q.id);
      render();
    });

    // Next/Prev
    container.querySelector('#nextBtn')?.addEventListener('click', () => {
      if (state.current < totalQ - 1) { state.current++; render(); }
    });

    container.querySelector('#prevBtn')?.addEventListener('click', () => {
      if (state.current > 0) { state.current--; render(); }
    });

    // Submit buttons
    container.querySelector('#examSubmitTop')?.addEventListener('click', showSubmitModal);
    container.querySelector('#submitExamBtn')?.addEventListener('click', showSubmitModal);

    // Modal
    container.querySelector('#modalCancel')?.addEventListener('click', () => {
      container.querySelector('.exam-modal-overlay')?.classList.remove('visible');
    });

    container.querySelector('#modalSubmit')?.addEventListener('click', submitExam);
  }

  if (totalQ === 0) {
    container.innerHTML = `
      <div class="quiz-page" style="justify-content: center; align-items: center; text-align: center; padding: var(--space-16);">
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <h3>Chưa có câu hỏi thi</h3>
          <p>Câu hỏi sẽ được tải từ backend để tạo đề thi thử.</p>
          <a href="#/practice" class="btn btn-primary" style="margin-top: var(--space-6);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            Quay lại Luyện tập
          </a>
        </div>
      </div>
    `;
    return;
  }

  render();
  startTimer();

  // Cleanup timer on page change
  const observer = new MutationObserver(() => {
    if (!container.querySelector('.exam-timer-bar')) {
      clearInterval(timerInterval);
      document.body.classList.remove('exam-mode');
      observer.disconnect();
    }
  });
  observer.observe(document.getElementById('app'), { childList: true });
}
