/* ========================================
   NetQuiz - Data Module (Supabase)
   ======================================== */

import { supabase } from './supabase.js';

// === Fetch Chapters ===
export async function fetchChapters() {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .order('id');

  if (error) { console.error('Lỗi tải chương:', error); return []; }

  // Count questions per chapter
  const { data: counts } = await supabase
    .from('questions')
    .select('chapter_id');

  const countMap = {};
  (counts || []).forEach(q => {
    countMap[q.chapter_id] = (countMap[q.chapter_id] || 0) + 1;
  });

  return (data || []).map(ch => ({
    ...ch,
    questionCount: countMap[ch.id] || 0,
  }));
}

// === Fetch Questions ===
export async function fetchQuestions(chapterId) {
  let query = supabase.from('questions').select('*');
  if (chapterId) query = query.eq('chapter_id', chapterId);
  const { data, error } = await query.order('id');
  if (error) { console.error('Lỗi tải câu hỏi:', error); return []; }
  return data || [];
}

// === Fetch Random Questions for Exam ===
export async function fetchExamQuestions(limit = 15) {
  const { data, error } = await supabase
    .from('questions')
    .select('*');

  if (error) { console.error('Lỗi tải đề thi:', error); return []; }
  // Shuffle and pick
  const shuffled = (data || []).sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}

// === Save Result ===
export async function saveResult({ score, total, timeSpent, mode, chapterId }) {
  const { error } = await supabase.from('results').insert({
    score,
    total,
    time_spent: timeSpent,
    mode,
    chapter_id: chapterId || null,
  });
  if (error) console.error('Lỗi lưu kết quả:', error);
}

// === Fetch Dashboard Stats ===
export async function fetchDashboardStats() {
  // Get all results
  const { data: results } = await supabase
    .from('results')
    .select('*')
    .order('created_at', { ascending: false });

  const allResults = results || [];
  const totalExams = allResults.length;
  const questionsAnswered = allResults.reduce((s, r) => s + r.total, 0);
  const correctAnswers = allResults.reduce((s, r) => s + r.score, 0);
  const incorrectAnswers = questionsAnswered - correctAnswers;
  const accuracy = questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0;
  const averageScore = totalExams > 0 ? Math.round(allResults.reduce((s, r) => s + (r.score / r.total) * 100, 0) / totalExams) : 0;

  // Recent scores for chart (last 10)
  const recentScores = allResults.slice(0, 10).map(r => Math.round((r.score / r.total) * 100)).reverse();

  // Recent activity
  const recentActivity = allResults.slice(0, 5).map(r => ({
    type: r.mode === 'exam' ? 'exam' : 'practice',
    title: r.mode === 'exam' ? 'Thi thử' : `Luyện tập${r.chapter_id ? ` Ch.${r.chapter_id}` : ''}`,
    score: `${r.score}/${r.total}`,
    time: timeAgo(r.created_at),
    color: (r.score / r.total) >= 0.7 ? 'green' : (r.score / r.total) >= 0.5 ? 'blue' : 'red',
  }));

  return {
    totalExams,
    questionsAnswered,
    correctAnswers,
    incorrectAnswers,
    accuracy,
    averageScore,
    recentScores,
    recentActivity,
    studyStreak: 0,
    streakDays: [],
    badges: [],
    level: 1,
    xp: 0,
    xpToNext: 100,
    bookmarked: 0,
  };
}

// === Bookmarks ===
export async function toggleBookmark(questionId) {
  const { data: existing } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('question_id', questionId)
    .limit(1);

  if (existing && existing.length > 0) {
    await supabase.from('bookmarks').delete().eq('id', existing[0].id);
    return false;
  } else {
    await supabase.from('bookmarks').insert({ question_id: questionId });
    return true;
  }
}

export async function fetchBookmarkedQuestions() {
  const { data } = await supabase
    .from('bookmarks')
    .select('question_id, questions(*)');

  return (data || []).map(b => b.questions).filter(Boolean);
}

// Helper
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Vừa xong';
  if (mins < 60) return `${mins} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}
