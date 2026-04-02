/* ========================================
   NetQuiz - Authentication Module
   ======================================== */

import { supabase } from './supabase.js';

export async function signInAnonymous() {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.error('Lỗi đăng nhập ẩn danh:', error);
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Lỗi đăng xuất:', error);
  window.location.reload();
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Lắng nghe sự kiện Auth change
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
    // Tùy nhu cầu, hiện tại app được reload khi thao tác nên không cần làm gì phức tạp
  }
});
