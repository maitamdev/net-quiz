-- =============================================
-- NetQuiz - Nâng cấp Bảo mật Authentication
-- Chạy đoạn mã này trong Supabase > SQL Editor
-- =============================================

-- 1. Bổ sung cột user_id vào bảng kết quả và đánh dấu
-- Chú ý: Vì chúng ta chưa có dữ liệu cũ chia theo user, ta sẽ tạm thời xóa data rác 
-- trong results và bookmarks đi (nếu có) để set constrain NOT NULL, hoặc set tùy chọn.
ALTER TABLE results ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid();
ALTER TABLE bookmarks ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid();

-- 2. Xóa bỏ các chính sách ảo tường (Public) cũ cho 2 bảng này
DROP POLICY IF EXISTS "Public read results" ON results;
DROP POLICY IF EXISTS "Public insert results" ON results;
DROP POLICY IF EXISTS "Public read bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Public insert bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Public delete bookmarks" ON bookmarks;

-- 3. Tạo chính sách bảo mật MỚI (Row Level Security) 
-- Chỉ cho phép user thao tác trên DỮ LIỆU CỦA CHÍNH MÌNH (auth.uid() = user_id)

-- Chính sách bảng RESULTS
CREATE POLICY "Users có thể xem điểm của bản thân" 
ON results FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users có thể lưu điểm của bản thân" 
ON results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Chính sách bảng BOOKMARKS
CREATE POLICY "Users có thể xem bookmark của bản thân" 
ON bookmarks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users có thể lưu bookmark" 
ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users có thể xóa bookmark của bản thân" 
ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Cập nhật INDEX cải thiện tốc độ Dashboard
CREATE INDEX IF NOT EXISTS idx_results_user ON results(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);
