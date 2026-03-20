/* ========================================
   NetQuiz - Results Page
   ======================================== */

import { questions } from './data.js';

export function renderResults(container, params = {}) {
  const correct = parseInt(params.correct) || 10;
  const total = parseInt(params.total) || 15;
  const timeSpent = parseInt(params.time) || 1245;
  const isExam = params.mode === 'exam';
  const percentage = Math.round((correct / total) * 100);
  const incorrect = total - correct;

  const grade = percentage >= 90 ? 'excellent' : percentage >= 70 ? 'good' : percentage >= 50 ? 'average' : 'poor';
  const gradeLabel = percentage >= 90 ? 'Xuất sắc!' : percentage >= 70 ? 'Tốt lắm!' : percentage >= 50 ? 'Cần luyện thêm' : 'Cần cải thiện';
  const message = percentage >= 90
    ? 'Thành tích xuất sắc! Bạn nắm rất vững kiến thức.'
    : percentage >= 70
    ? 'Làm tốt lắm! Hãy tiếp tục ôn để đạt điểm tuyệt đối.'
    : percentage >= 50
    ? 'Bạn đang đi đúng hướng. Tập trung vào các chủ đề bên dưới để cải thiện.'
    : 'Đừng bỏ cuộc! Xem lại giải thích và thử lại nhé.';

  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  // Calculate circumference for score ring
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Sort sample questions for topic performance display
  const topicMap = {};
  questions.slice(0, total).forEach((q, i) => {
    if (!topicMap[q.topic]) topicMap[q.topic] = { correct: 0, total: 0 };
    topicMap[q.topic].total++;
    if (i < correct) topicMap[q.topic].correct++;
  });

  const topics = Object.entries(topicMap).map(([topic, data]) => ({
    topic,
    correct: data.correct,
    total: data.total,
    percentage: Math.round((data.correct / data.total) * 100),
  }));

  container.innerHTML = `
    <div class="results-page container page-enter">
      <!-- Score Hero -->
      <div class="results-hero">
        <div class="results-score-ring">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#6366f1"/>
                <stop offset="100%" stop-color="#06b6d4"/>
              </linearGradient>
            </defs>
            <circle class="ring-bg" cx="100" cy="100" r="${radius}"/>
            <circle class="ring-fill" cx="100" cy="100" r="${radius}"
              stroke-dasharray="${circumference}"
              stroke-dashoffset="${circumference}"
              id="scoreRing"/>
          </svg>
          <div class="results-score-value">
            <div class="results-score-number" id="scoreNumber">0</div>
            <div class="results-score-total">/ ${total}</div>
          </div>
        </div>
        <div class="results-grade ${grade}">${gradeLabel}</div>
        <div class="results-message">${message}</div>
        <div class="results-time">
          ${isExam ? '🕐 ' : ''}Hoàn thành trong ${minutes} phút ${seconds} giây · Độ chính xác ${percentage}%
        </div>
      </div>

      <!-- Stats Row -->
      <div class="results-stats">
        <div class="results-stat-card">
          <div class="results-stat-icon icon-box icon-box-green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="results-stat-number" style="color: var(--green-400)">${correct}</div>
          <div class="results-stat-label">Đúng</div>
        </div>
        <div class="results-stat-card">
          <div class="results-stat-icon icon-box icon-box-pink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
          <div class="results-stat-number" style="color: var(--red-400)">${incorrect}</div>
          <div class="results-stat-label">Sai</div>
        </div>
        <div class="results-stat-card">
          <div class="results-stat-icon" style="background: rgba(99, 102, 241, 0.15); color: var(--indigo-400);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div class="results-stat-number">${percentage}%</div>
          <div class="results-stat-label">Độ chính xác</div>
        </div>
        <div class="results-stat-card">
          <div class="results-stat-icon icon-box icon-box-cyan">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="results-stat-number">${minutes}:${seconds.toString().padStart(2, '0')}</div>
          <div class="results-stat-label">Thời gian</div>
        </div>
      </div>

      <!-- Charts -->
      <div class="results-charts">
        <div class="card results-chart-card">
          <h3>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--indigo-400)" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
            Phân tích Điểm
          </h3>
          <div class="results-chart-container">
            <div class="donut-chart">
              <canvas id="donutChart" width="180" height="180"></canvas>
              <div class="donut-center">
                <div class="donut-center-value" style="color: var(--green-400)">${percentage}%</div>
                <div class="donut-center-label">Điểm</div>
              </div>
            </div>
          </div>
          <div class="chart-legend">
            <div class="chart-legend-item"><div class="chart-legend-color" style="background: var(--green-400)"></div> Đúng (${correct})</div>
            <div class="chart-legend-item"><div class="chart-legend-color" style="background: var(--red-400)"></div> Sai (${incorrect})</div>
          </div>
        </div>

        <div class="card results-chart-card">
          <h3>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-400)" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            Kết quả theo Chủ đề
          </h3>
          <div class="results-chart-container" style="flex-direction: column; justify-content: flex-start; align-items: stretch; padding: 0;">
            <canvas id="barChart" width="300" height="200"></canvas>
          </div>
        </div>
      </div>

      <!-- Topic Breakdown -->
      <div class="results-topics">
        <h3>Chi tiết theo Chủ đề</h3>
        <div class="topic-list">
          ${topics.map(t => `
            <div class="topic-item">
              <div class="topic-name">${t.topic}</div>
              <div class="topic-bar progress-bar progress-bar-sm" style="width: 100px;">
                <div class="progress-bar-fill" style="width: ${t.percentage}%; background: ${t.percentage >= 70 ? 'var(--gradient-success)' : t.percentage >= 50 ? 'var(--gradient-primary)' : 'var(--gradient-danger)'}"></div>
              </div>
              <div class="topic-score" style="color: ${t.percentage >= 70 ? 'var(--green-400)' : t.percentage >= 50 ? 'var(--indigo-400)' : 'var(--red-400)'}">${t.correct}/${t.total}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Answer Review Preview -->
      <div class="results-review">
        <h3>
          Xem lại Câu trả lời
          <span class="badge badge-primary" style="font-weight: 600;">${total} câu</span>
        </h3>
        <div class="review-filters">
          <button class="chip active" data-filter="all">Tất cả</button>
          <button class="chip" data-filter="correct">✓ Đúng</button>
          <button class="chip" data-filter="incorrect">✗ Sai</button>
        </div>
        <div class="review-list" id="reviewList">
          ${questions.slice(0, Math.min(total, 5)).map((q, i) => {
            const isCorrect = i < correct;
            return `
              <div class="review-item" data-type="${isCorrect ? 'correct' : 'incorrect'}">
                <div class="review-item-header">
                  <div class="review-item-q">Câu ${i + 1}</div>
                  <div class="review-item-status badge ${isCorrect ? 'badge-success' : 'badge-danger'}">
                    ${isCorrect ? '✓ Đúng' : '✗ Sai'}
                  </div>
                </div>
                <div class="review-item-question">${q.text}</div>
                <div class="review-answers-grid">
                  ${q.answers.map(a => `
                    <div class="review-answer ${a.letter === q.correct ? 'correct-answer' : ''}${!isCorrect && a.letter !== q.correct && a.letter === q.answers[1].letter ? ' user-wrong' : ''}">
                      <strong>${a.letter}.</strong> ${a.text}
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Actions -->
      <div class="results-actions">
        <a href="#/practice" class="btn btn-primary btn-lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Luyện lại
        </a>
        <a href="#/dashboard" class="btn btn-secondary btn-lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          Xem Bảng điều khiển
        </a>
      </div>
    </div>
  `;

  // Animate score ring
  setTimeout(() => {
    const ring = document.getElementById('scoreRing');
    if (ring) ring.style.strokeDashoffset = offset;

    const numEl = document.getElementById('scoreNumber');
    if (numEl) animateNumber(numEl, 0, correct, 1000);
  }, 300);

  // Draw donut chart
  drawDonutChart('donutChart', correct, incorrect);

  // Draw bar chart
  drawBarChart('barChart', topics);

  // Filter logic
  container.querySelectorAll('.review-filters .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.review-filters .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      container.querySelectorAll('.review-item').forEach(item => {
        if (filter === 'all') {
          item.style.display = '';
        } else {
          item.style.display = item.dataset.type === filter ? '' : 'none';
        }
      });
    });
  });
}

function animateNumber(el, start, end, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + (end - start) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function drawDonutChart(canvasId, correct, incorrect) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const centerX = 90, centerY = 90, radius = 70, lineWidth = 18;
  const total = correct + incorrect;

  // Background
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  // Correct segment
  const correctAngle = (correct / total) * 2 * Math.PI;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + correctAngle);
  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Incorrect segment
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2 + correctAngle, -Math.PI / 2 + 2 * Math.PI);
  ctx.strokeStyle = '#f87171';
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.stroke();
}

function drawBarChart(canvasId, topics) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const padding = { top: 10, right: 10, bottom: 30, left: 10 };
  const barWidth = (w - padding.left - padding.right) / topics.length - 8;
  const maxHeight = h - padding.top - padding.bottom;

  ctx.clearRect(0, 0, w, h);

  topics.forEach((t, i) => {
    const x = padding.left + i * (barWidth + 8) + 4;
    const barH = (t.percentage / 100) * maxHeight;
    const y = h - padding.bottom - barH;

    // Bar gradient
    const gradient = ctx.createLinearGradient(x, y + barH, x, y);
    if (t.percentage >= 70) {
      gradient.addColorStop(0, '#22c55e');
      gradient.addColorStop(1, '#06b6d4');
    } else if (t.percentage >= 50) {
      gradient.addColorStop(0, '#6366f1');
      gradient.addColorStop(1, '#06b6d4');
    } else {
      gradient.addColorStop(0, '#ef4444');
      gradient.addColorStop(1, '#f472b6');
    }

    // Rounded bar
    const r = Math.min(4, barWidth / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + barWidth - r, y);
    ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + r);
    ctx.lineTo(x + barWidth, y + barH);
    ctx.lineTo(x, y + barH);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Label
    ctx.fillStyle = 'rgba(160, 163, 196, 0.8)';
    ctx.font = '9px Inter';
    ctx.textAlign = 'center';
    const label = t.topic.length > 8 ? t.topic.slice(0, 7) + '…' : t.topic;
    ctx.fillText(label, x + barWidth / 2, h - 8);

    // Percentage on top
    ctx.fillStyle = 'rgba(240, 240, 255, 0.9)';
    ctx.font = 'bold 10px Inter';
    ctx.fillText(`${t.percentage}%`, x + barWidth / 2, y - 4);
  });
}
