/* ========================================
   NetQuiz - Supabase Client
   ======================================== */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase chưa được cấu hình. Thêm VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY vào .env');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
