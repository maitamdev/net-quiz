-- =============================================
-- NetQuiz - Supabase Database Schema
-- Chạy SQL này trong Supabase Dashboard > SQL Editor
-- =============================================

-- 1. Bảng Chương
CREATE TABLE chapters (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT ''
);

-- 2. Bảng Câu hỏi
CREATE TABLE questions (
  id BIGSERIAL PRIMARY KEY,
  chapter_id BIGINT REFERENCES chapters(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  topic TEXT NOT NULL DEFAULT '',
  correct TEXT NOT NULL CHECK (correct IN ('A', 'B', 'C', 'D')),
  explanation TEXT DEFAULT '',
  answers JSONB NOT NULL DEFAULT '[]'
);

-- 3. Bảng Kết quả thi
CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  score INT NOT NULL,
  total INT NOT NULL,
  time_spent INT DEFAULT 0,
  mode TEXT DEFAULT 'practice',
  chapter_id BIGINT REFERENCES chapters(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Bảng Đánh dấu
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id BIGINT REFERENCES questions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Row Level Security
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read chapters" ON chapters FOR SELECT USING (true);
CREATE POLICY "Public read questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Public read results" ON results FOR SELECT USING (true);
CREATE POLICY "Public insert results" ON results FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read bookmarks" ON bookmarks FOR SELECT USING (true);
CREATE POLICY "Public insert bookmarks" ON bookmarks FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete bookmarks" ON bookmarks FOR DELETE USING (true);

-- 6. Indexes
CREATE INDEX idx_questions_chapter ON questions(chapter_id);
CREATE INDEX idx_results_created ON results(created_at DESC);
CREATE INDEX idx_bookmarks_question ON bookmarks(question_id);

-- =============================================
-- DỮ LIỆU CHƯƠNG
-- =============================================
INSERT INTO chapters (id, name, description) VALUES
(1, 'Khái niệm cơ bản và tầng ứng dụng', 'Mạng máy tính, kiến trúc mạng, giao thức tầng ứng dụng');

-- =============================================
-- CHƯƠNG 1 - 30 CÂU HỎI
-- =============================================
INSERT INTO questions (chapter_id, text, topic, correct, explanation, answers) VALUES
(1, 'Là một dịch vụ hướng kết nối sử dụng giao thức tầng dưới là TCP để truyền file trong mô hình TCP/IP là giao thức nào?', 'Giao thức tầng ứng dụng', 'B', 'FTP là giao thức truyền tệp hoạt động ở tầng ứng dụng và sử dụng TCP để truyền dữ liệu.', '[{"letter":"A","text":"HTTP"},{"letter":"B","text":"FTP"},{"letter":"C","text":"ARP"},{"letter":"D","text":"DNS"}]'),

(1, 'Thông điệp HTTP Request gồm mấy phần?', 'HTTP', 'B', 'HTTP Request thường gồm 3 phần: dòng yêu cầu, phần tiêu đề header và phần thân body.', '[{"letter":"A","text":"2 phần"},{"letter":"B","text":"3 phần"},{"letter":"C","text":"4 phần"},{"letter":"D","text":"5 phần"}]'),

(1, 'Trong HTTP Request, phần body thường chứa nội dung gì?', 'HTTP', 'B', 'Body chứa dữ liệu gửi lên server như form, JSON, XML hoặc tệp đính kèm.', '[{"letter":"A","text":"Địa chỉ MAC của máy gửi"},{"letter":"B","text":"Dữ liệu mà client gửi lên server"},{"letter":"C","text":"Tên miền của website"},{"letter":"D","text":"Mã lỗi của server"}]'),

(1, 'Thông điệp HTTP Response gồm mấy phần?', 'HTTP', 'B', 'HTTP Response gồm 3 phần chính: dòng trạng thái, header và body.', '[{"letter":"A","text":"2 phần"},{"letter":"B","text":"3 phần"},{"letter":"C","text":"4 phần"},{"letter":"D","text":"1 phần"}]'),

(1, 'HTTP khác HTTPS chủ yếu ở điểm nào?', 'HTTP', 'C', 'HTTPS là HTTP kết hợp với SSL/TLS để mã hóa dữ liệu, tăng tính bảo mật.', '[{"letter":"A","text":"HTTPS chậm hơn nên ít dùng"},{"letter":"B","text":"HTTP dùng cáp quang còn HTTPS dùng cáp đồng"},{"letter":"C","text":"HTTPS có mã hóa bằng SSL/TLS, HTTP thì không"},{"letter":"D","text":"HTTP chỉ dùng trong mạng LAN"}]'),

(1, 'Có thể thiết lập cấu hình DNS Server bằng bao nhiêu cách cơ bản?', 'DNS', 'B', 'Thông thường có 2 cách cơ bản: cấu hình tĩnh thủ công hoặc nhận tự động qua DHCP.', '[{"letter":"A","text":"1 cách"},{"letter":"B","text":"2 cách"},{"letter":"C","text":"3 cách"},{"letter":"D","text":"4 cách"}]'),

(1, 'Giao thức trung tâm của hệ thống thư điện tử là giao thức nào?', 'Email', 'B', 'SMTP là giao thức chính dùng để gửi thư điện tử giữa các máy chủ thư và từ client lên server.', '[{"letter":"A","text":"FTP"},{"letter":"B","text":"SMTP"},{"letter":"C","text":"ARP"},{"letter":"D","text":"ICMP"}]'),

(1, 'Giao thức ở tầng ứng dụng dùng để lấy thư điện tử từ mail server về thông qua kết nối TCP/IP là gì?', 'Email', 'C', 'Trong dạng câu hỏi cơ bản, đáp án thường là POP3. IMAP cũng là giao thức nhận thư nhưng nâng cao hơn.', '[{"letter":"A","text":"SMTP"},{"letter":"B","text":"DNS"},{"letter":"C","text":"POP3"},{"letter":"D","text":"ARP"}]'),

(1, 'Trong mô hình kiến trúc mạng máy tính nào sẽ có một máy luôn hoạt động 24/7 để nhận và xử lý yêu cầu từ máy khác?', 'Kiến trúc mạng', 'B', 'Trong mô hình Client-Server, máy chủ phục vụ liên tục cho các máy khách.', '[{"letter":"A","text":"Peer to Peer"},{"letter":"B","text":"Client Server"},{"letter":"C","text":"Bus"},{"letter":"D","text":"Ring"}]'),

(1, 'Ưu điểm lớn nhất của kiến trúc ngang hàng Peer to Peer là gì?', 'Kiến trúc mạng', 'B', 'Mạng ngang hàng dễ triển khai, chi phí thấp vì không cần máy chủ trung tâm.', '[{"letter":"A","text":"Quản lý tập trung rất tốt"},{"letter":"B","text":"Không cần máy chủ trung tâm, chi phí thấp"},{"letter":"C","text":"Bảo mật tuyệt đối"},{"letter":"D","text":"Tốc độ luôn cao nhất"}]'),

(1, 'Mạng máy tính là gì?', 'Khái niệm cơ bản', 'A', 'Mạng máy tính là hệ thống các thiết bị được kết nối để trao đổi thông tin và dùng chung tài nguyên.', '[{"letter":"A","text":"Tập hợp các máy tính kết nối với nhau để trao đổi dữ liệu và chia sẻ tài nguyên"},{"letter":"B","text":"Một máy tính dùng nhiều hệ điều hành"},{"letter":"C","text":"Một phần mềm quản lý dữ liệu"},{"letter":"D","text":"Một hệ thống chỉ có máy in"}]'),

(1, 'Mục đích chính của mạng máy tính là gì?', 'Khái niệm cơ bản', 'B', 'Mạng máy tính giúp các thiết bị trao đổi dữ liệu và dùng chung tài nguyên như máy in, file, Internet.', '[{"letter":"A","text":"Tăng kích thước bộ nhớ RAM"},{"letter":"B","text":"Chia sẻ tài nguyên và trao đổi thông tin"},{"letter":"C","text":"Giảm giá thành máy tính"},{"letter":"D","text":"Thay thế hoàn toàn phần mềm"}]'),

(1, 'Thiết bị nào sau đây thường được dùng để kết nối nhiều máy trong cùng một mạng LAN hiện đại?', 'Thiết bị mạng', 'B', 'Switch là thiết bị phổ biến để kết nối các máy trong mạng LAN.', '[{"letter":"A","text":"Hub"},{"letter":"B","text":"Switch"},{"letter":"C","text":"Modem quay số"},{"letter":"D","text":"Repeater"}]'),

(1, 'Thiết bị nào dùng để định tuyến gói tin giữa các mạng khác nhau?', 'Thiết bị mạng', 'C', 'Router hoạt động ở tầng mạng, dùng để chuyển gói tin giữa các mạng khác nhau.', '[{"letter":"A","text":"Hub"},{"letter":"B","text":"Switch"},{"letter":"C","text":"Router"},{"letter":"D","text":"NIC"}]'),

(1, 'Card mạng NIC có chức năng chính là gì?', 'Thiết bị mạng', 'B', 'NIC là bộ phận cho phép máy tính giao tiếp với mạng.', '[{"letter":"A","text":"Lưu trữ dữ liệu"},{"letter":"B","text":"Kết nối máy tính với mạng"},{"letter":"C","text":"Tăng tốc CPU"},{"letter":"D","text":"Điều khiển màn hình"}]'),

(1, 'Mạng LAN là mạng có phạm vi như thế nào?', 'Phân loại mạng', 'A', 'LAN là mạng cục bộ, phạm vi nhỏ.', '[{"letter":"A","text":"Phạm vi nhỏ như phòng, tòa nhà, trường học"},{"letter":"B","text":"Toàn cầu"},{"letter":"C","text":"Liên lục địa"},{"letter":"D","text":"Chỉ trong vệ tinh"}]'),

(1, 'Mạng WAN là mạng có đặc điểm nào?', 'Phân loại mạng', 'C', 'WAN là mạng diện rộng, kết nối trên phạm vi lớn.', '[{"letter":"A","text":"Phạm vi rất nhỏ"},{"letter":"B","text":"Chỉ dùng trong một phòng"},{"letter":"C","text":"Phạm vi rộng, có thể giữa nhiều tỉnh hoặc quốc gia"},{"letter":"D","text":"Không cần thiết bị mạng"}]'),

(1, 'Internet là gì?', 'Khái niệm cơ bản', 'B', 'Internet là hệ thống liên kết các mạng máy tính trên toàn thế giới.', '[{"letter":"A","text":"Một phần mềm duyệt web"},{"letter":"B","text":"Một mạng toàn cầu kết nối nhiều mạng máy tính với nhau"},{"letter":"C","text":"Một loại dây mạng"},{"letter":"D","text":"Một máy chủ lớn"}]'),

(1, 'Topologi hình sao Star có đặc điểm nào?', 'Topology mạng', 'B', 'Trong topo hình sao, các nút kết nối đến một thiết bị trung tâm như switch.', '[{"letter":"A","text":"Mọi máy nối thành vòng tròn"},{"letter":"B","text":"Mỗi máy nối vào một thiết bị trung tâm"},{"letter":"C","text":"Không có dây dẫn"},{"letter":"D","text":"Mọi máy nối trực tiếp với nhau"}]'),

(1, 'Ưu điểm nổi bật của topo hình sao là gì?', 'Topology mạng', 'A', 'Hình sao dễ lắp đặt, dễ quản lý và khi một nhánh hỏng thường không ảnh hưởng toàn mạng.', '[{"letter":"A","text":"Dễ quản lý và dễ phát hiện lỗi"},{"letter":"B","text":"Không cần thiết bị trung tâm"},{"letter":"C","text":"Chi phí luôn thấp nhất"},{"letter":"D","text":"Không bao giờ bị đứt mạng"}]'),

(1, 'Trong mô hình TCP/IP, giao thức TCP thuộc tầng nào?', 'Mô hình TCP/IP', 'B', 'TCP là giao thức thuộc tầng giao vận.', '[{"letter":"A","text":"Tầng ứng dụng"},{"letter":"B","text":"Tầng giao vận"},{"letter":"C","text":"Tầng mạng"},{"letter":"D","text":"Tầng vật lý"}]'),

(1, 'Trong mô hình TCP/IP, giao thức IP thuộc tầng nào?', 'Mô hình TCP/IP', 'C', 'IP là giao thức cốt lõi của tầng mạng.', '[{"letter":"A","text":"Tầng ứng dụng"},{"letter":"B","text":"Tầng giao vận"},{"letter":"C","text":"Tầng mạng"},{"letter":"D","text":"Tầng liên kết dữ liệu"}]'),

(1, 'HTTP là giao thức thuộc tầng nào?', 'Giao thức tầng ứng dụng', 'C', 'HTTP là giao thức tầng ứng dụng dùng để truyền tải nội dung web.', '[{"letter":"A","text":"Tầng vật lý"},{"letter":"B","text":"Tầng liên kết dữ liệu"},{"letter":"C","text":"Tầng ứng dụng"},{"letter":"D","text":"Tầng mạng"}]'),

(1, 'Địa chỉ IP dùng để xác định điều gì?', 'Địa chỉ mạng', 'A', 'IP là địa chỉ logic giúp định danh thiết bị trên mạng.', '[{"letter":"A","text":"Địa chỉ logic của thiết bị trên mạng"},{"letter":"B","text":"Tên người dùng"},{"letter":"C","text":"Mã sản phẩm máy tính"},{"letter":"D","text":"Tốc độ mạng"}]'),

(1, 'Địa chỉ MAC là gì?', 'Địa chỉ mạng', 'B', 'MAC là địa chỉ phần cứng của card mạng.', '[{"letter":"A","text":"Địa chỉ logic trên Internet"},{"letter":"B","text":"Địa chỉ vật lý của thiết bị mạng"},{"letter":"C","text":"Tên miền máy chủ"},{"letter":"D","text":"Địa chỉ email"}]'),

(1, 'Giao thức dùng để phân giải tên miền sang địa chỉ IP là gì?', 'DNS', 'A', 'DNS giúp chuyển tên miền như google.com thành địa chỉ IP.', '[{"letter":"A","text":"DNS"},{"letter":"B","text":"FTP"},{"letter":"C","text":"SMTP"},{"letter":"D","text":"ARP"}]'),

(1, 'Khi người dùng mở trình duyệt truy cập trang web, giao thức thường dùng là gì?', 'HTTP', 'A', 'HTTP là giao thức phổ biến để trình duyệt trao đổi dữ liệu với máy chủ web.', '[{"letter":"A","text":"HTTP"},{"letter":"B","text":"ARP"},{"letter":"C","text":"RIP"},{"letter":"D","text":"ICMP"}]'),

(1, 'Trong quá trình truyền dữ liệu theo mô hình phân tầng, dữ liệu đi từ tầng trên xuống tầng dưới gọi là gì?', 'Mô hình phân tầng', 'A', 'Khi đi xuống các tầng, dữ liệu được thêm thông tin điều khiển vào từng lớp, gọi là đóng gói.', '[{"letter":"A","text":"Đóng gói"},{"letter":"B","text":"Giải mã"},{"letter":"C","text":"Định tuyến"},{"letter":"D","text":"Phát quảng bá"}]'),

(1, 'Khi dữ liệu đến bên nhận và được xử lý ngược từ tầng dưới lên tầng trên, quá trình đó gọi là gì?', 'Mô hình phân tầng', 'B', 'Bên nhận sẽ loại bỏ các thông tin điều khiển theo từng tầng, gọi là tháo gói.', '[{"letter":"A","text":"Mã hóa"},{"letter":"B","text":"Tháo gói"},{"letter":"C","text":"Cấp phát"},{"letter":"D","text":"Phân mảnh"}]'),

(1, 'Một số tiêu chí cơ bản để đánh giá hiệu năng mạng là gì?', 'Khái niệm cơ bản', 'A', 'Hiệu năng mạng thường được đánh giá qua độ trễ, băng thông và thông lượng.', '[{"letter":"A","text":"Độ trễ, băng thông, thông lượng"},{"letter":"B","text":"Màu dây mạng, kích thước máy tính, nhãn thiết bị"},{"letter":"C","text":"Tên máy, mật khẩu, hình nền"},{"letter":"D","text":"Hãng sản xuất bàn phím"}]');
