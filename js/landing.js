/* ========================================
   NetQuiz - Landing Page
   ======================================== */

export function renderLanding(container) {
  container.innerHTML = `
    <div class="landing-page">
      <div class="network-bg">
        <canvas id="networkCanvas"></canvas>
      </div>

      <!-- Hero -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="hero-badge-dot"></span>
            Nền tảng Luyện thi Mạng Máy Tính
          </div>
          <h1>
            Chinh Phục<br/>
            Mạng Máy Tính<br/>
            <span class="hero-gradient-text">Thông Minh</span>
          </h1>
          <p>Nâng cao kiến thức mạng máy tính với các bài trắc nghiệm thông minh, thi thử và giải thích bằng AI. Theo dõi tiến độ và chinh phục kỳ thi của bạn.</p>
          <div class="hero-buttons">
            <a href="#/practice" class="btn btn-primary btn-lg hero-btn-glow" id="cta-start">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Bắt đầu Luyện tập
            </a>
            <a href="#/exam" class="btn btn-secondary btn-lg" id="cta-exam">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Thi Thử
            </a>
          </div>

          <div class="hero-features">
            <div class="hero-feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              <span>500+ Câu hỏi Luyện tập</span>
            </div>
            <div class="hero-feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              <span>8 Chương Kiến thức</span>
            </div>
            <div class="hero-feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span>Giải thích bằng AI</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section container">
        <div class="stats-header">
          <h2>Thống kê <span class="hero-gradient-text">Nền tảng</span></h2>
          <p>Cùng hàng ngàn sinh viên chinh phục Mạng Máy Tính</p>
        </div>
        <div class="stats-grid">
          <div class="card">
            <div class="stat-icon icon-box icon-box-indigo icon-box-lg" style="margin: 0 auto var(--space-4);">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <div class="stat-value">--</div>
            <div class="stat-label">Tổng Câu hỏi</div>
          </div>
          <div class="card">
            <div class="stat-icon icon-box icon-box-cyan icon-box-lg" style="margin: 0 auto var(--space-4);">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div class="stat-value">--</div>
            <div class="stat-label">Đề Thi thử</div>
          </div>
          <div class="card">
            <div class="stat-icon icon-box icon-box-purple icon-box-lg" style="margin: 0 auto var(--space-4);">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="stat-value">--</div>
            <div class="stat-label">Sinh viên Hoạt động</div>
          </div>
          <div class="card">
            <div class="stat-icon icon-box icon-box-green icon-box-lg" style="margin: 0 auto var(--space-4);">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <div class="stat-value">--%</div>
            <div class="stat-label">Tỉ lệ Đạt TB</div>
          </div>
        </div>
      </section>

      <!-- Why Choose Us -->
      <section class="why-section container">
        <div class="stats-header">
          <h2>Tại sao chọn <span class="hero-gradient-text">NetQuiz</span>?</h2>
          <p>Tất cả những gì bạn cần để chinh phục Mạng Máy Tính</p>
        </div>
        <div class="why-grid">
          <div class="card why-card">
            <div class="icon-box icon-box-indigo icon-box-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h3>Học Thích ứng</h3>
            <p>AI nhận diện điểm yếu của bạn và gợi ý các câu hỏi phù hợp để cải thiện hiệu quả.</p>
          </div>
          <div class="card why-card">
            <div class="icon-box icon-box-cyan icon-box-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h3>Nội dung Có cấu trúc</h3>
            <p>Câu hỏi được sắp xếp theo chương, theo giáo trình Mạng Máy Tính chuẩn để học có hệ thống.</p>
          </div>
          <div class="card why-card">
            <div class="icon-box icon-box-purple icon-box-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <h3>Thống kê Chi tiết</h3>
            <p>Theo dõi tiến độ với biểu đồ đẹp mắt, nhận diện xu hướng và giám sát sự tiến bộ theo thời gian.</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section container">
        <div class="cta-card">
          <h2>Sẵn sàng <span class="hero-gradient-text">Nâng cấp</span>?</h2>
          <p>Bắt đầu luyện tập ngay và xây dựng nền tảng vững chắc về Mạng Máy Tính.</p>
          <div class="hero-buttons">
            <a href="#/practice" class="btn btn-primary btn-lg hero-btn-glow">Bắt đầu Miễn phí</a>
            <a href="#/dashboard" class="btn btn-secondary btn-lg">Xem Bảng điều khiển</a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer container">
        <p>© 2026 NetQuiz — Xây dựng cho sinh viên muốn <a href="#/">chinh phục kỳ thi mạng</a>.</p>
      </footer>
    </div>
  `;

  // Initialize network background animation
  initNetworkCanvas();
}

function initNetworkCanvas() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId;
  const nodes = [];
  const numNodes = 60;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  // Create nodes
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw nodes
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Cleanup on page change
  const observer = new MutationObserver(() => {
    if (!document.getElementById('networkCanvas')) {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    }
  });
  observer.observe(document.getElementById('app'), { childList: true });
}

function initCounters(container) {
  const counters = container.querySelectorAll('.counter');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(current).toLocaleString();
            }
          }, 20);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => observer.observe(c));
}
