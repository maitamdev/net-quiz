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
        <div class="loading-spinner"></div>
      </div>
    </div>
  `;

  // Load chapters from Supabase
  const chapters = await fetchChapters();

  // Build cards
  const grid = container.querySelector('#practiceGrid');
  grid.innerHTML = '';

  const chapterMeta = {
    1: { gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '📖', desc: 'Mạng máy tính, kiến trúc, thiết bị, phân loại mạng' },
    2: { gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', emoji: '🌐', desc: 'HTTP, FTP, SMTP, DNS, DHCP, SSH, Telnet' },
    3: { gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', emoji: '🔄', desc: 'TCP, UDP, Port, bắt tay 3 bước, kiểm soát lưu lượng' },
    4: { gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', emoji: '🛣️', desc: 'IP, IPv4, IPv6, định tuyến, NAT, ICMP, router' },
    5: { gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', emoji: '🔗', desc: 'MAC, ARP, Switch, Bridge, Frame, CRC' },
    6: { gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', emoji: '⚡', desc: 'Tín hiệu, cáp, modem, hub, repeater, băng thông' },
    7: { gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', emoji: '🎯', desc: 'Tổng hợp kiến thức tất cả các chương' },
  };

  // Chapter cards
  chapters.forEach(ch => {
    const meta = chapterMeta[ch.id] || { gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '📝', desc: ch.description || '' };
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <div class="course-card-banner" style="background: ${meta.gradient}">
        <span class="course-card-emoji">${meta.emoji}</span>
        <span class="course-card-badge">${ch.id <= 6 ? 'Chương ' + ch.id : 'Ôn tập'}</span>
      </div>
      <div class="course-card-body">
        <h3 class="course-card-title">${ch.name}</h3>
        <p class="course-card-desc">${meta.desc}</p>
        <div class="course-card-footer">
          <div class="course-card-stats">
            <span class="course-card-stat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"/></svg>
              ${ch.questionCount} câu
            </span>
          </div>
          <span class="course-card-action">Luyện tập →</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => {
      window.location.hash = `/quiz?chapter=${ch.id}`;
    });
    grid.appendChild(card);
  });

  // Special cards: Thi Thử & Đánh dấu
  const specials = [
    {
      gradient: 'linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)',
      emoji: '⏱️',
      badge: 'Thi thử',
      title: 'Thi Thử',
      desc: 'Bài thi mô phỏng với giới hạn thời gian 45 phút',
      stat: '45 phút',
      statIcon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      action: () => { window.location.hash = '/exam'; }
    },
    {
      gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      emoji: '🔖',
      badge: 'Đánh dấu',
      title: 'Câu hỏi Đánh dấu',
      desc: 'Ôn lại các câu hỏi bạn đã đánh dấu khi luyện tập',
      stat: 'Đã lưu',
      statIcon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
      action: () => { window.location.hash = '/quiz?mode=bookmarks'; }
    },
  ];

  specials.forEach(s => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <div class="course-card-banner" style="background: ${s.gradient}">
        <span class="course-card-emoji">${s.emoji}</span>
        <span class="course-card-badge">${s.badge}</span>
      </div>
      <div class="course-card-body">
        <h3 class="course-card-title">${s.title}</h3>
        <p class="course-card-desc">${s.desc}</p>
        <div class="course-card-footer">
          <div class="course-card-stats">
            <span class="course-card-stat">${s.statIcon} ${s.stat}</span>
          </div>
          <span class="course-card-action">Bắt đầu →</span>
        </div>
      </div>
    `;
    card.addEventListener('click', s.action);
    grid.appendChild(card);
  });
}
