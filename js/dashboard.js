/* ========================================
   NetQuiz - Dashboard Page
   ======================================== */

import { fetchDashboardStats } from './data.js';

export async function renderDashboard(container) {
  container.innerHTML = `<div style="display:flex;justify-content:center;align-items:center;min-height:60vh;"><div class="loading-spinner"></div></div>`;
  const s = await fetchDashboardStats();

  container.innerHTML = `
    <div class="dashboard-page container">
      <!-- Header -->
      <div class="dashboard-header">
        <div class="dashboard-welcome">
          <div class="dashboard-avatar">NQ</div>
          <div class="dashboard-hello">
            <h1>Chào mừng trở lại! 👋</h1>
            <p>Bắt đầu luyện tập để theo dõi tiến độ của bạn tại đây.</p>
          </div>
        </div>
        <div class="dashboard-date">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          ${new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <!-- Study Streak -->
      <div class="streak-bar card">
        <div class="streak-fire">
          <div class="streak-fire-icon">🔥</div>
          <div>
            <div class="streak-fire-count">${s.studyStreak}</div>
            <div class="streak-fire-label">Chuỗi ngày</div>
          </div>
        </div>
        <div class="streak-days">
          ${s.streakDays.length > 0 ? s.streakDays.map(d => `
            <div class="streak-day">
              <div class="streak-day-label">${d.label}</div>
              <div class="streak-day-dot${d.completed ? ' completed' : ''}${d.today ? ' today' : ''}">
                ${d.completed ? '✓' : d.today ? '!' : ''}
              </div>
            </div>
          `).join('') : '<span style="color: var(--text-tertiary); font-size: var(--text-sm);">Bắt đầu học để xây dựng chuỗi ngày</span>'}
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="dashboard-stats">
        <div class="card dash-stat-card">
          <div class="icon-box icon-box-indigo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <div class="stat-info">
            <div class="dash-stat-label">Câu hỏi đã làm</div>
            <div class="dash-stat-value">${s.questionsAnswered.toLocaleString()}</div>
            <div class="dash-stat-change" style="color: var(--text-tertiary)">--</div>
          </div>
        </div>
        <div class="card dash-stat-card">
          <div class="icon-box icon-box-green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="stat-info">
            <div class="dash-stat-label">Trả lời đúng</div>
            <div class="dash-stat-value" style="color: var(--green-400)">${s.correctAnswers}</div>
            <div class="dash-stat-change" style="color: var(--text-tertiary)">--</div>
          </div>
        </div>
        <div class="card dash-stat-card">
          <div class="icon-box icon-box-cyan">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div class="stat-info">
            <div class="dash-stat-label">Điểm trung bình</div>
            <div class="dash-stat-value">${s.averageScore}%</div>
            <div class="dash-stat-change" style="color: var(--text-tertiary)">--</div>
          </div>
        </div>
        <div class="card dash-stat-card">
          <div class="icon-box icon-box-purple">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="stat-info">
            <div class="dash-stat-label">Số đề thi</div>
            <div class="dash-stat-value">${s.totalExams}</div>
            <div class="dash-stat-change" style="color: var(--text-tertiary)">--</div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="dashboard-charts">
        <div class="card dash-chart-card">
          <div class="dash-chart-header">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--indigo-400)" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Xu hướng Điểm
            </h3>
            <div class="chip active">10 đề gần nhất</div>
          </div>
          <div class="dash-chart-body">
            <canvas id="trendChart"></canvas>
          </div>
        </div>

        <div class="card dash-chart-card">
          <div class="dash-chart-header">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-400)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/></svg>
              Độ chính xác
            </h3>
          </div>
          <div class="dash-chart-body">
            <div class="accuracy-ring-wrap">
              <div class="accuracy-ring">
                <canvas id="accuracyRing" width="150" height="150"></canvas>
                <div class="accuracy-center">
                  <div class="accuracy-value">${s.accuracy}%</div>
                  <div class="accuracy-label">Tổng thể</div>
                </div>
              </div>
              <div class="chart-legend">
                <div class="chart-legend-item"><div class="chart-legend-color" style="background: var(--green-400)"></div> Đúng (${s.correctAnswers})</div>
                <div class="chart-legend-item"><div class="chart-legend-color" style="background: var(--red-400)"></div> Sai (${s.incorrectAnswers})</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Row -->
      <div class="dashboard-bottom">
        <!-- Recent Activity -->
        <div class="card dash-activity-card">
          <div class="dash-section-header">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--indigo-400)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Hoạt động Gần đây
            </h3>
            <a href="#/practice" class="btn btn-ghost btn-sm">Xem tất cả</a>
          </div>
          <div class="activity-list">
            ${s.recentActivity.length > 0 ? s.recentActivity.map(a => `
              <div class="activity-item">
                <div class="activity-icon" style="background: rgba(${getColorRgb(a.color)}, 0.15); color: var(--${a.color}-400);">
                  ${getActivityIcon(a.type)}
                </div>
                <div class="activity-info">
                  <div class="activity-title">${a.title}</div>
                  <div class="activity-meta">${a.time}</div>
                </div>
                <div class="activity-score" style="color: var(--${a.color}-400)">${a.score}</div>
              </div>
            `).join('') : `
              <div class="empty-state" style="padding: var(--space-8);">
                <p>Chưa có hoạt động. Bắt đầu luyện tập ngay!</p>
              </div>
            `}
          </div>
        </div>

        <!-- Achievements -->
        <div class="card dash-achievements-card">
          <div class="dash-section-header">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--amber-400)" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
              Thành tích
            </h3>
            <span class="badge badge-warning">${s.badges.length > 0 ? `${s.badges.filter(b => b.unlocked).length}/${s.badges.length}` : '0'}</span>
          </div>

          <div class="badges-grid">
            ${s.badges.length > 0 ? s.badges.map(b => `
              <div class="badge-card${b.unlocked ? '' : ' locked'}">
                <div class="badge-icon">${b.icon}</div>
                <div class="badge-name">${b.name}</div>
              </div>
            `).join('') : `
              <div style="grid-column: 1/-1; text-align: center; padding: var(--space-6); color: var(--text-tertiary); font-size: var(--text-sm);">
                Hoàn thành các bài thi để mở khóa huy hiệu
              </div>
            `}
          </div>

          <!-- Level Progress -->
          <div class="level-bar">
            <div class="level-bar-header">
              <div class="level-badge">
                <span class="level-badge-icon">⭐</span>
                Level ${s.level}
              </div>
              <div class="level-xp">${s.xp.toLocaleString()} / ${s.xpToNext.toLocaleString()} Điểm KN</div>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width: ${(s.xp / s.xpToNext) * 100}%; background: var(--gradient-warm)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Draw trend chart
  drawTrendChart('trendChart', s.recentScores);

  // Draw accuracy ring
  drawAccuracyRing('accuracyRing', s.correctAnswers, s.incorrectAnswers);
}

function drawTrendChart(canvasId, scores) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width || 500;
  canvas.height = rect.height || 220;

  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;

  if (!scores || scores.length === 0) {
    ctx.fillStyle = 'rgba(160, 163, 196, 0.4)';
    ctx.font = '13px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Chưa có dữ liệu — hoàn thành các đề thi để xem xu hướng', w / 2, h / 2);
    return;
  }

  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;

  ctx.clearRect(0, 0, w, h);

  const minScore = Math.min(...scores) - 10;
  const maxScore = 100;

  // Grid lines
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (i * chartH) / 4;
    const val = Math.round(maxScore - (i * (maxScore - minScore)) / 4);

    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(w - padding.right, y);
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = 'rgba(160, 163, 196, 0.6)';
    ctx.font = '11px Inter';
    ctx.textAlign = 'right';
    ctx.fillText(`${val}%`, padding.left - 8, y + 4);
  }

  // Points
  const points = scores.map((score, i) => ({
    x: padding.left + (i * chartW) / (scores.length - 1),
    y: padding.top + ((maxScore - score) / (maxScore - minScore)) * chartH,
  }));

  // Gradient fill under line
  const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
  gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
  gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, h - padding.bottom);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, h - padding.bottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Line
  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else {
      const prev = points[i - 1];
      const cpx1 = prev.x + (p.x - prev.x) / 3;
      const cpx2 = p.x - (p.x - prev.x) / 3;
      ctx.bezierCurveTo(cpx1, prev.y, cpx2, p.y, p.x, p.y);
    }
  });

  const lineGrad = ctx.createLinearGradient(padding.left, 0, w - padding.right, 0);
  lineGrad.addColorStop(0, '#6366f1');
  lineGrad.addColorStop(1, '#06b6d4');
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Dots
  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = i === points.length - 1 ? '#06b6d4' : '#6366f1';
    ctx.fill();
    ctx.strokeStyle = '#0a0b14';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label on x-axis
    ctx.fillStyle = 'rgba(160, 163, 196, 0.5)';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`#${i + 1}`, p.x, h - 8);
  });
}

function drawAccuracyRing(canvasId, correct, incorrect) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const centerX = 75, centerY = 75, radius = 58, lineWidth = 14;
  const total = correct + incorrect;

  if (total === 0) {
    // Draw empty ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    return;
  }

  // Background
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  // Correct
  const correctAngle = (correct / total) * 2 * Math.PI;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + correctAngle);
  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Incorrect
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2 + correctAngle + 0.05, -Math.PI / 2 + 2 * Math.PI);
  ctx.strokeStyle = '#f87171';
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.stroke();
}

function getColorRgb(color) {
  const map = {
    green: '34, 197, 94',
    blue: '59, 130, 246',
    purple: '168, 85, 247',
    cyan: '6, 182, 212',
    indigo: '99, 102, 241',
    pink: '244, 114, 182',
    red: '239, 68, 68',
  };
  return map[color] || '99, 102, 241';
}

function getActivityIcon(type) {
  const icons = {
    exam: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    practice: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
    review: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
  };
  return icons[type] || icons.practice;
}
