/* ========================================
   NetQuiz - Quiz Interface
   ======================================== */

import { fetchQuestions, saveResult, toggleBookmark, fetchBookmarkedQuestions } from './data.js';

export async function renderQuiz(container, params = {}) {
  // Show loading
  container.innerHTML = `<div class="quiz-page" style="justify-content: center; align-items: center;"><div class="loading-spinner"></div></div>`;

  // Fetch questions from Supabase
  let allQuestions = [];
  if (params.mode === 'bookmarks') {
    allQuestions = await fetchBookmarkedQuestions();
  } else if (params.chapter) {
    allQuestions = await fetchQuestions(parseInt(params.chapter));
  } else {
    allQuestions = await fetchQuestions();
  }

  // Shuffle questions for new session, preserve order if resuming
  const storageKey = `nq_quiz_${params.chapter || 'all'}`;
  let savedRaw = null;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) savedRaw = JSON.parse(raw);
  } catch (e) { /* ignore */ }

  let quizQuestions;
  if (savedRaw?.questionIds) {
    // Restore saved question order
    const idMap = {};
    allQuestions.forEach(q => idMap[q.id] = q);
    quizQuestions = savedRaw.questionIds.map(id => idMap[id]).filter(Boolean);
  } else {
    // New session: shuffle
    quizQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
  }

  const totalQ = quizQuestions.length;

  const state = {
    current: savedRaw?.current || 0,
    answers: savedRaw?.answers || new Array(totalQ).fill(null),
    flagged: new Set(savedRaw?.flagged || []),
    showExplanation: false,
    startTime: savedRaw?.startTime || Date.now(),
  };

  function saveState() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        current: state.current,
        answers: state.answers,
        flagged: [...state.flagged],
        startTime: state.startTime,
        questionIds: quizQuestions.map(q => q.id),
      }));
    } catch (e) { /* ignore */ }
  }

  function clearState() {
    localStorage.removeItem(storageKey);
  }

  function render() {
    const q = quizQuestions[state.current];
    container.innerHTML = `
      <div class="quiz-page">
        <!-- Left: Navigation -->
        <aside class="quiz-nav">
          <div class="quiz-nav-header">
            <div class="quiz-nav-title">${getTitle(params)}</div>
            <div class="quiz-nav-subtitle">${totalQ} câu hỏi</div>
          </div>
          <div class="quiz-nav-grid" id="quizNavGrid">
            ${quizQuestions.map((_, i) => `
              <button class="quiz-nav-item${i === state.current ? ' current' : ''}${state.answers[i] !== null ? ' answered' : ''}${state.flagged.has(i) ? ' flagged' : ''}"
                data-index="${i}" id="qnav-${i}">
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

        <!-- Right: Question Content -->
        <div class="quiz-main">
          <div class="quiz-question-header">
            <div class="quiz-question-number">
              Câu <strong>${state.current + 1}</strong> / ${totalQ}
              <span style="margin-left: var(--space-3);">
                <span class="badge badge-primary">${q.topic}</span>
              </span>
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
            <div class="quiz-answers" id="quizAnswers">
              ${q.answers.map(a => {
                let cls = 'quiz-answer';
                const answered = state.answers[state.current] !== null;
                if (answered) {
                  if (a.letter === q.correct) cls += ' correct';
                  else if (a.letter === state.answers[state.current]) cls += ' incorrect';
                  cls += ' locked';
                } else if (state.answers[state.current] === a.letter) {
                  cls += ' selected';
                }
                return `
                  <button class="${cls}"
                    data-letter="${a.letter}" id="answer-${a.letter}"${answered ? ' disabled' : ''}>
                    <div class="quiz-answer-letter">${a.letter}</div>
                    <div class="quiz-answer-text">${a.text}</div>
                  </button>
                `;
              }).join('')}
            </div>

            <div class="quiz-explanation${state.showExplanation ? ' visible' : ''}" id="explanationPanel">
              <div class="quiz-explanation-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                Giải thích
              </div>
              <p>${q.explanation}</p>
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
              <button class="btn btn-ghost" id="showExplainBtn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                Giải thích
              </button>
              ${state.current === totalQ - 1
                ? `<button class="btn btn-success" id="submitQuizBtn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Nộp bài
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
    `;

    attachEvents();
  }

  function attachEvents() {
    // Answer selection
    container.querySelectorAll('.quiz-answer').forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.answers[state.current] !== null) return; // Already answered
        const letter = btn.dataset.letter;
        const q = quizQuestions[state.current];
        state.answers[state.current] = letter;

        // Show correct/incorrect on all answers
        container.querySelectorAll('.quiz-answer').forEach(a => {
          a.classList.remove('selected');
          a.classList.add('locked');
          a.disabled = true;
          if (a.dataset.letter === q.correct) {
            a.classList.add('correct');
          } else if (a.dataset.letter === letter) {
            a.classList.add('incorrect');
          }
        });

        // Auto-show explanation
        state.showExplanation = true;
        const panel = container.querySelector('#explanationPanel');
        if (panel) panel.classList.add('visible');

        // Update nav item
        const navItem = container.querySelector(`#qnav-${state.current}`);
        if (navItem) navItem.classList.add('answered');

        saveState();
      });
    });

    // Nav grid
    container.querySelectorAll('.quiz-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        state.current = parseInt(item.dataset.index);
        state.showExplanation = false;
        saveState();
        render();
      });
    });

    // Flag / Bookmark
    container.querySelector('#flagBtn')?.addEventListener('click', async () => {
      const q = quizQuestions[state.current];
      if (state.flagged.has(state.current)) {
        state.flagged.delete(state.current);
      } else {
        state.flagged.add(state.current);
      }
      // Save to Supabase
      toggleBookmark(q.id);
      saveState();
      render();
    });

    // Next/Prev
    container.querySelector('#nextBtn')?.addEventListener('click', () => {
      if (state.current < totalQ - 1) {
        state.current++;
        state.showExplanation = false;
        saveState();
        render();
      }
    });

    container.querySelector('#prevBtn')?.addEventListener('click', () => {
      if (state.current > 0) {
        state.current--;
        state.showExplanation = false;
        saveState();
        render();
      }
    });

    // Explain
    container.querySelector('#showExplainBtn')?.addEventListener('click', () => {
      state.showExplanation = !state.showExplanation;
      render();
    });

    // Submit
    container.querySelector('#submitQuizBtn')?.addEventListener('click', () => {
      // Calculate score
      let correct = 0;
      quizQuestions.forEach((q, i) => {
        if (state.answers[i] === q.correct) correct++;
      });

      // Save result to Supabase
      const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
      saveResult({
        score: correct,
        total: totalQ,
        timeSpent: elapsed,
        mode: 'practice',
        chapterId: params.chapter ? parseInt(params.chapter) : null,
      });

      clearState();

      window.location.hash = `/results?correct=${correct}&total=${totalQ}&time=${elapsed}`;
    });
  }

  if (totalQ === 0) {
    container.innerHTML = `
      <div class="quiz-page" style="justify-content: center; align-items: center; text-align: center; padding: var(--space-16);">
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="1.5">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          <h3>Chưa có câu hỏi</h3>
          <p>Câu hỏi sẽ xuất hiện sau khi kết nối với backend.</p>
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
}

function getTitle(params) {
  if (params.mode === 'review') return 'Câu hỏi Sai';
  if (params.mode === 'bookmarks') return 'Câu hỏi Đánh dấu';
  if (params.chapter) return `Chương ${params.chapter}`;
  return 'Luyện tập';
}
