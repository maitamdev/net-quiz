/* ========================================
   NetQuiz - Practice Mode Selection
   ======================================== */

import { fetchChapters } from './data.js';

export async function renderPractice(container) {
  container.innerHTML = `
    <div class="practice-page container">
      <div class="practice-header">
        <h1>Chọn <span class="hero-gradient-text">Chế độ Luyện tập</span></h1>
        <p>Chọn cách bạn muốn học Mạng Máy Tính hôm nay</p>
      </div>

      <div class="practice-grid" id="practiceGrid">
        <!-- Chapters will be rendered here -->
      </div>

      <!-- Chapter list -->
      <div id="chapterListSection" style="display: none;">
        <button class="back-btn" id="backToModes">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          Quay lại
        </button>
        <div class="practice-header" style="margin-bottom: var(--space-8);">
          <h1>Chọn <span class="hero-gradient-text">Chương</span></h1>
          <p>Chọn chương bạn muốn luyện tập</p>
        </div>
        <div class="chapter-list" id="chapterList"></div>
      </div>
    </div>
  `;

  // Load chapters from Supabase
  const chapters = await fetchChapters();

  // Build grid items
  const grid = container.querySelector('#practiceGrid');
  const cards = [
    ...chapters.map(ch => ({
      id: `card-ch-${ch.id}`,
      icon: ch.id <= 6 ? getChapterIcon(ch.id) : '📝',
      color: getChapterColor(ch.id),
      title: ch.name,
      subtitle: `${ch.questionCount} câu hỏi`,
      action: () => { window.location.hash = `/quiz?chapter=${ch.id}`; }
    })),
    {
      id: 'card-exam',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      color: 'cyan',
      title: 'Thi Thử',
      subtitle: '45 phút • Tất cả chương',
      action: () => { window.location.hash = '/exam'; }
    },
    {
      id: 'card-bookmarks',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
      color: 'pink',
      title: 'Đánh dấu',
      subtitle: 'Câu hỏi đã lưu',
      action: () => { window.location.hash = '/quiz?mode=bookmarks'; }
    },
  ];

  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = `practice-tile tile-${card.color}`;
    el.id = card.id;
    el.innerHTML = `
      <div class="tile-icon">${card.icon}</div>
      <div class="tile-title">${card.title}</div>
      <div class="tile-subtitle">${card.subtitle}</div>
    `;
    el.addEventListener('click', card.action);
    grid.appendChild(el);
  });

  // Back button
  container.querySelector('#backToModes')?.addEventListener('click', () => {
    container.querySelector('#chapterListSection').style.display = 'none';
    container.querySelector('#practiceGrid').style.display = 'grid';
    container.querySelector('.practice-header').style.display = 'block';
  });
}

function getChapterIcon(id) {
  const icons = {
    1: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    2: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    3: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    4: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    5: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    6: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    7: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  };
  return icons[id] || `<span style="font-size:24px;font-weight:700">${id}</span>`;
}

function getChapterColor(id) {
  const colors = ['indigo', 'cyan', 'purple', 'green', 'orange', 'pink', 'emerald'];
  return colors[(id - 1) % colors.length];
}
