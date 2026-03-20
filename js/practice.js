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
        <!-- Luyện theo Chương -->
        <div class="card practice-card" data-mode="chapter" id="card-chapter">
          <div class="practice-card-icon icon-indigo">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              <line x1="8" y1="7" x2="16" y2="7"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </div>
          <h3>Luyện theo Chương</h3>
          <p>Học có hệ thống qua từng chương với các câu hỏi tập trung vào chủ đề cụ thể.</p>
          <div class="practice-card-footer">
            <span class="practice-card-meta" id="chapterCount">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              Đang tải...
            </span>
            <div class="practice-card-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
        </div>

        <!-- Thi Thử -->
        <div class="card practice-card" data-mode="exam" id="card-exam">
          <div class="practice-card-icon icon-cyan">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h3>Thi Thử</h3>
          <p>Mô phỏng bài thi thực tế với áp lực thời gian. Kiểm tra kiến thức tất cả các chương.</p>
          <div class="practice-card-footer">
            <span class="practice-card-meta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              45 phút
            </span>
            <div class="practice-card-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
        </div>

        <!-- Câu hỏi Sai -->
        <div class="card practice-card" data-mode="review" id="card-review">
          <div class="practice-card-icon icon-purple">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h3>Câu hỏi Sai</h3>
          <p>Xem lại và làm lại các câu hỏi bạn đã trả lời sai. Biến điểm yếu thành điểm mạnh.</p>
          <div class="practice-card-footer">
            <span class="practice-card-meta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              Sắp có
            </span>
            <div class="practice-card-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
        </div>

        <!-- Câu hỏi Đánh dấu -->
        <div class="card practice-card" data-mode="bookmarks" id="card-bookmarks">
          <div class="practice-card-icon icon-pink">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h3>Câu hỏi Đánh dấu</h3>
          <p>Truy cập các câu hỏi đã lưu để ôn tập tập trung. Hoàn hảo cho việc chuẩn bị thi.</p>
          <div class="practice-card-footer">
            <span class="practice-card-meta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              Sắp có
            </span>
            <div class="practice-card-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
        </div>
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

  // Update chapter count
  const countEl = container.querySelector('#chapterCount');
  if (countEl) {
    countEl.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
      ${chapters.length || 'Không có'} chương
    `;
  }

  // Render chapter list
  const chapterListEl = container.querySelector('#chapterList');
  if (chapters.length === 0) {
    chapterListEl.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="1.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
        <h3>Chưa có chương nào</h3>
        <p>Các chương sẽ xuất hiện sau khi thêm dữ liệu.</p>
      </div>
    `;
  } else {
    chapters.forEach((ch) => {
      const item = document.createElement('div');
      item.className = 'chapter-item';
      item.innerHTML = `
        <div class="chapter-info">
          <div class="chapter-number">${ch.id}</div>
          <div>
            <div class="chapter-name">${ch.name}</div>
            <div class="chapter-count">${ch.questionCount} câu hỏi</div>
          </div>
        </div>
        <div class="chapter-progress">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      `;
      item.addEventListener('click', () => {
        window.location.hash = `/quiz?chapter=${ch.id}`;
      });
      chapterListEl.appendChild(item);
    });
  }

  // Card clicks
  container.querySelector('#card-chapter').addEventListener('click', () => {
    container.querySelector('#practiceGrid').style.display = 'none';
    container.querySelector('.practice-header').style.display = 'none';
    const section = container.querySelector('#chapterListSection');
    section.style.display = 'block';
    section.classList.add('page-enter');
  });

  container.querySelector('#card-exam').addEventListener('click', () => {
    window.location.hash = '/exam';
  });

  container.querySelector('#card-review').addEventListener('click', () => {
    window.location.hash = '/quiz?mode=review';
  });

  container.querySelector('#card-bookmarks').addEventListener('click', () => {
    window.location.hash = '/quiz?mode=bookmarks';
  });

  container.querySelector('#backToModes').addEventListener('click', () => {
    container.querySelector('#chapterListSection').style.display = 'none';
    container.querySelector('#practiceGrid').style.display = 'grid';
    container.querySelector('.practice-header').style.display = 'block';
  });
}
