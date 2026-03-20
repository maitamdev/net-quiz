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

  const chapters = await fetchChapters();
  const grid = container.querySelector('#practiceGrid');
  grid.innerHTML = '';

  const chapterMeta = {
    1: { img: '/images/ch1.png', desc: 'Mạng máy tính, kiến trúc, thiết bị, phân loại mạng' },
    2: { img: '/images/ch2.png', desc: 'HTTP, FTP, SMTP, DNS, DHCP, SSH, Telnet' },
    3: { img: '/images/ch3.png', desc: 'TCP, UDP, Port, bắt tay 3 bước, kiểm soát lưu lượng' },
    4: { img: '/images/ch4.png', desc: 'IP, IPv4, IPv6, định tuyến, NAT, ICMP, router' },
    5: { img: '/images/ch5.png', desc: 'MAC, ARP, Switch, Bridge, Frame, CRC' },
    6: { img: '/images/ch6.png', desc: 'Tín hiệu, cáp, modem, hub, repeater, băng thông' },
    7: { img: '/images/review.png', desc: 'Tổng hợp kiến thức tất cả các chương' },
  };

  // Chapter cards
  chapters.forEach(ch => {
    const meta = chapterMeta[ch.id] || { img: '/images/ch1.png', desc: ch.description || '' };
    const card = createCourseCard({
      img: meta.img,
      badge: ch.id <= 6 ? `Chương ${ch.id}` : 'Ôn tập',
      title: ch.name,
      desc: meta.desc,
      stat: `${ch.questionCount} câu hỏi`,
      action: 'Luyện tập',
      onClick: () => { window.location.hash = `/quiz?chapter=${ch.id}`; }
    });
    grid.appendChild(card);
  });

  // Thi Thử
  grid.appendChild(createCourseCard({
    img: '/images/exam.png',
    badge: 'Thi thử',
    title: 'Thi Thử',
    desc: '45 câu ngẫu nhiên từ tất cả chương, giới hạn 45 phút',
    stat: '45 câu • 45 phút',
    action: 'Bắt đầu',
    onClick: () => { window.location.hash = '/exam'; }
  }));

  // Đánh dấu
  grid.appendChild(createCourseCard({
    img: '/images/bookmark.png',
    badge: 'Đánh dấu',
    title: 'Câu hỏi Đánh dấu',
    desc: 'Ôn lại các câu hỏi bạn đã đánh dấu khi luyện tập',
    stat: 'Đã lưu',
    action: 'Xem lại',
    onClick: () => { window.location.hash = '/quiz?mode=bookmarks'; }
  }));
}

function createCourseCard({ img, badge, title, desc, stat, action, onClick }) {
  const card = document.createElement('div');
  card.className = 'course-card';
  card.innerHTML = `
    <div class="course-card-img">
      <img src="${img}" alt="${title}" loading="lazy" />
      <span class="course-card-badge">${badge}</span>
    </div>
    <div class="course-card-body">
      <h3 class="course-card-title">${title}</h3>
      <p class="course-card-desc">${desc}</p>
      <div class="course-card-footer">
        <span class="course-card-stat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"/></svg>
          ${stat}
        </span>
        <span class="course-card-action">${action} →</span>
      </div>
    </div>
  `;
  card.addEventListener('click', onClick);
  return card;
}
