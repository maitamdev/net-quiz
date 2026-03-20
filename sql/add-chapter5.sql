-- =============================================
-- Thêm Chương 5 - Tầng liên kết dữ liệu
-- Chạy trong Supabase > SQL Editor
-- =============================================

-- 1. Thêm chương 5
INSERT INTO chapters (id, name, description) VALUES
(5, 'Tầng liên kết dữ liệu', 'MAC, ARP, Switch, Bridge, Frame, CRC, FDM, TDM')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 2. Câu hỏi chương 5 (30 câu)
INSERT INTO questions (chapter_id, text, topic, correct, explanation, answers) VALUES
(5, 'Chức năng chính của tầng liên kết dữ liệu là gì?', 'Tổng quan', 'B', 'Tầng liên kết dữ liệu đảm nhiệm truyền dữ liệu node-to-node trên cùng một liên kết, đóng gói frame và phát hiện lỗi.', '[{"letter":"A","text":"Định tuyến gói tin giữa các mạng"},{"letter":"B","text":"Cung cấp truyền dữ liệu tin cậy giữa hai nút kề nhau"},{"letter":"C","text":"Phân giải tên miền"},{"letter":"D","text":"Gửi email"}]'),

(5, 'Đơn vị dữ liệu của tầng liên kết dữ liệu được gọi là gì?', 'Tổng quan', 'C', 'Ở tầng liên kết dữ liệu, dữ liệu được đóng gói thành frame.', '[{"letter":"A","text":"Packet"},{"letter":"B","text":"Segment"},{"letter":"C","text":"Frame"},{"letter":"D","text":"Bit"}]'),

(5, 'Địa chỉ MAC là gì?', 'MAC', 'B', 'Địa chỉ MAC là địa chỉ vật lý gắn với card mạng, dùng trong mạng cục bộ.', '[{"letter":"A","text":"Địa chỉ logic dùng trên Internet"},{"letter":"B","text":"Địa chỉ vật lý của thiết bị mạng"},{"letter":"C","text":"Tên miền của máy tính"},{"letter":"D","text":"Địa chỉ email"}]'),

(5, 'Địa chỉ MAC thường có độ dài bao nhiêu bit?', 'MAC', 'D', 'Địa chỉ MAC thông dụng có độ dài 48 bit, thường được viết dưới dạng 6 byte hệ 16.', '[{"letter":"A","text":"32 bit"},{"letter":"B","text":"16 bit"},{"letter":"C","text":"64 bit"},{"letter":"D","text":"48 bit"}]'),

(5, 'Giao thức nào dùng để tìm địa chỉ MAC khi đã biết địa chỉ IPv4?', 'ARP', 'A', 'ARP dùng để phân giải từ địa chỉ IP sang địa chỉ MAC trong mạng cục bộ.', '[{"letter":"A","text":"ARP"},{"letter":"B","text":"RARP"},{"letter":"C","text":"ICMP"},{"letter":"D","text":"DNS"}]'),

(5, 'Switch hoạt động chủ yếu ở tầng nào?', 'Switch', 'C', 'Switch chủ yếu hoạt động ở tầng liên kết dữ liệu và chuyển frame dựa trên địa chỉ MAC.', '[{"letter":"A","text":"Tầng mạng"},{"letter":"B","text":"Tầng giao vận"},{"letter":"C","text":"Tầng liên kết dữ liệu"},{"letter":"D","text":"Tầng ứng dụng"}]'),

(5, 'Bridge là thiết bị dùng để làm gì?', 'Bridge', 'A', 'Bridge dùng để nối các đoạn mạng và lọc frame dựa trên địa chỉ MAC.', '[{"letter":"A","text":"Kết nối và lọc lưu lượng giữa các đoạn mạng LAN"},{"letter":"B","text":"Định tuyến giữa các mạng WAN"},{"letter":"C","text":"Cấp phát địa chỉ IP tự động"},{"letter":"D","text":"Mã hóa dữ liệu web"}]'),

(5, 'Hub khác switch chủ yếu ở điểm nào?', 'Switch', 'B', 'Hub phát ra mọi cổng còn switch học địa chỉ MAC và chuyển frame chính xác hơn.', '[{"letter":"A","text":"Hub thông minh hơn switch"},{"letter":"B","text":"Hub phát dữ liệu ra mọi cổng, switch chuyển đến cổng đích phù hợp"},{"letter":"C","text":"Hub hoạt động ở tầng mạng"},{"letter":"D","text":"Switch không dùng địa chỉ MAC"}]'),

(5, 'Chức năng đóng gói dữ liệu ở tầng liên kết dữ liệu nghĩa là gì?', 'Tổng quan', 'A', 'Tầng liên kết dữ liệu nhận packet từ tầng mạng và đóng gói thành frame để truyền đi.', '[{"letter":"A","text":"Biến packet thành frame"},{"letter":"B","text":"Biến bit thành ký tự"},{"letter":"C","text":"Biến MAC thành IP"},{"letter":"D","text":"Biến tên miền thành địa chỉ"}]'),

(5, 'Kiểm soát truy nhập môi trường truyền thuộc chức năng của tầng nào?', 'Tổng quan', 'D', 'Tầng liên kết dữ liệu quản lý việc các thiết bị chia sẻ cùng một môi trường truyền.', '[{"letter":"A","text":"Tầng vật lý"},{"letter":"B","text":"Tầng mạng"},{"letter":"C","text":"Tầng giao vận"},{"letter":"D","text":"Tầng liên kết dữ liệu"}]'),

(5, 'Hai kỹ thuật cấp phát tĩnh để chia sẻ kênh truyền là gì?', 'FDM/TDM', 'B', 'FDM chia theo tần số, TDM chia theo thời gian; đây là hai kỹ thuật cấp phát tĩnh cơ bản.', '[{"letter":"A","text":"ARP và RARP"},{"letter":"B","text":"FDM và TDM"},{"letter":"C","text":"CSMA và CDMA"},{"letter":"D","text":"FTP và HTTP"}]'),

(5, 'FDM là kỹ thuật chia sẻ kênh theo yếu tố nào?', 'FDM/TDM', 'C', 'FDM là Frequency Division Multiplexing, tức là ghép kênh phân chia theo tần số.', '[{"letter":"A","text":"Theo địa chỉ MAC"},{"letter":"B","text":"Theo số hiệu port"},{"letter":"C","text":"Theo tần số"},{"letter":"D","text":"Theo số lượng router"}]'),

(5, 'TDM là kỹ thuật chia sẻ kênh theo yếu tố nào?', 'FDM/TDM', 'A', 'TDM là Time Division Multiplexing, tức là ghép kênh phân chia theo thời gian.', '[{"letter":"A","text":"Theo thời gian"},{"letter":"B","text":"Theo điện áp"},{"letter":"C","text":"Theo địa chỉ IP"},{"letter":"D","text":"Theo chiều dài cáp"}]'),

(5, 'ALOHA là phương pháp thuộc nhóm nào?', 'ALOHA', 'A', 'ALOHA là một phương pháp truy nhập ngẫu nhiên, thuộc nhóm cấp phát kênh động.', '[{"letter":"A","text":"Cấp phát kênh động"},{"letter":"B","text":"Định tuyến tĩnh"},{"letter":"C","text":"Mã hóa dữ liệu"},{"letter":"D","text":"Phân giải địa chỉ"}]'),

(5, 'Phương pháp chia sẻ kênh ALOHA ra đời vào năm nào?', 'ALOHA', 'B', 'ALOHA ra đời vào khoảng năm 1970 và là một phương pháp truy nhập môi trường sớm.', '[{"letter":"A","text":"1960"},{"letter":"B","text":"1970"},{"letter":"C","text":"1980"},{"letter":"D","text":"1990"}]'),

(5, 'Ưu điểm nổi bật của switch so với hub là gì?', 'Switch', 'B', 'Switch học MAC và chuyển frame chọn lọc, giúp mạng hiệu quả hơn hub.', '[{"letter":"A","text":"Không cần nguồn điện"},{"letter":"B","text":"Chuyển frame theo địa chỉ MAC nên giảm va chạm tốt hơn"},{"letter":"C","text":"Hoạt động ở tầng ứng dụng"},{"letter":"D","text":"Luôn thay thế router"}]'),

(5, 'Khi một switch chưa biết địa chỉ MAC đích, nó thường làm gì?', 'Switch', 'C', 'Khi chưa biết MAC đích, switch thường flood frame ra các cổng còn lại.', '[{"letter":"A","text":"Hủy frame ngay"},{"letter":"B","text":"Gửi sang router"},{"letter":"C","text":"Phát frame ra nhiều cổng trừ cổng nhận"},{"letter":"D","text":"Đổi địa chỉ IP của frame"}]'),

(5, 'Bảng MAC của switch dùng để làm gì?', 'Switch', 'B', 'Switch dùng bảng MAC để biết địa chỉ nào nằm ở cổng nào nhằm chuyển frame đúng nơi.', '[{"letter":"A","text":"Lưu địa chỉ IP công cộng"},{"letter":"B","text":"Lưu các cặp địa chỉ MAC và cổng tương ứng"},{"letter":"C","text":"Lưu mật khẩu đăng nhập"},{"letter":"D","text":"Lưu tên miền website"}]'),

(5, 'Chức năng phát hiện lỗi ở tầng liên kết dữ liệu thường dùng để làm gì?', 'Phát hiện lỗi', 'A', 'Tầng liên kết dữ liệu thường có cơ chế phát hiện lỗi để kiểm tra frame nhận được có bị hỏng không.', '[{"letter":"A","text":"Phát hiện frame bị sai do lỗi truyền dẫn"},{"letter":"B","text":"Đổi tên máy tính"},{"letter":"C","text":"Cấp phát cổng port"},{"letter":"D","text":"Nén video"}]'),

(5, 'CRC là cơ chế thường dùng ở tầng liên kết dữ liệu để làm gì?', 'CRC', 'B', 'CRC là kỹ thuật kiểm tra dư vòng, được dùng phổ biến để phát hiện lỗi.', '[{"letter":"A","text":"Định tuyến đường đi"},{"letter":"B","text":"Phát hiện lỗi trong frame"},{"letter":"C","text":"Cấp phát IP"},{"letter":"D","text":"Mã hóa tên miền"}]'),

(5, 'Tầng liên kết dữ liệu quan tâm chủ yếu đến kiểu giao tiếp nào?', 'Tổng quan', 'A', 'Tầng liên kết dữ liệu truyền dữ liệu giữa các nút liền kề trực tiếp.', '[{"letter":"A","text":"Giữa hai nút kề nhau trên cùng liên kết"},{"letter":"B","text":"Giữa hai ứng dụng trên Internet"},{"letter":"C","text":"Giữa hai mạng toàn cầu"},{"letter":"D","text":"Giữa người dùng và trình duyệt"}]'),

(5, 'Phát biểu nào đúng về địa chỉ MAC và địa chỉ IP?', 'MAC', 'C', 'MAC dùng trong mạng cục bộ ở tầng liên kết, còn IP là địa chỉ logic ở tầng mạng.', '[{"letter":"A","text":"MAC là địa chỉ logic, IP là địa chỉ vật lý"},{"letter":"B","text":"MAC và IP hoàn toàn giống nhau"},{"letter":"C","text":"MAC là địa chỉ vật lý, IP là địa chỉ logic"},{"letter":"D","text":"Chỉ cần MAC, không cần IP"}]'),

(5, 'Thiết bị cơ bản nhất hoạt động ở tầng liên kết dữ liệu trong mạng LAN hiện đại là gì?', 'Switch', 'A', 'Trong mạng LAN hiện đại, switch là thiết bị tiêu biểu và phổ biến nhất ở tầng liên kết dữ liệu.', '[{"letter":"A","text":"Switch"},{"letter":"B","text":"Router"},{"letter":"C","text":"Modem"},{"letter":"D","text":"Hub"}]'),

(5, 'Nếu biết địa chỉ IPv4 của máy đích trong cùng mạng LAN, để tìm MAC đích thường cần dùng giao thức nào?', 'ARP', 'C', 'ARP phân giải địa chỉ IPv4 sang MAC trong mạng cục bộ.', '[{"letter":"A","text":"DNS"},{"letter":"B","text":"ICMP"},{"letter":"C","text":"ARP"},{"letter":"D","text":"SMTP"}]'),

(5, 'RARP từng được dùng với mục đích gì?', 'ARP', 'A', 'RARP là Reverse ARP, dùng ngược lại với ARP, dù ngày nay ít được dùng.', '[{"letter":"A","text":"Tìm địa chỉ IP khi biết địa chỉ MAC"},{"letter":"B","text":"Tìm cổng port khi biết IP"},{"letter":"C","text":"Tìm tên miền khi biết MAC"},{"letter":"D","text":"Tìm router khi biết email"}]'),

(5, 'Một frame Ethernet thường chứa thông tin nào sau đây?', 'Ethernet', 'A', 'Frame Ethernet thường có địa chỉ MAC nguồn, MAC đích và trường dữ liệu.', '[{"letter":"A","text":"MAC nguồn và MAC đích"},{"letter":"B","text":"Chỉ có tên miền"},{"letter":"C","text":"Chỉ có số hiệu port"},{"letter":"D","text":"Chỉ có địa chỉ email"}]'),

(5, 'Khi nói tầng liên kết dữ liệu điều khiển truy nhập môi trường truyền, điều đó có nghĩa là gì?', 'Tổng quan', 'A', 'Nếu nhiều thiết bị cùng chia sẻ môi trường truyền, cần cơ chế để tránh hoặc xử lý xung đột.', '[{"letter":"A","text":"Quản lý cách nhiều thiết bị cùng sử dụng chung đường truyền"},{"letter":"B","text":"Tăng tốc CPU cho máy tính"},{"letter":"C","text":"Đổi địa chỉ IP thành tên miền"},{"letter":"D","text":"Nén các file văn bản"}]'),

(5, 'Trong mạng Ethernet chuyển mạch hiện đại, thiết bị nào giúp giảm va chạm dữ liệu rõ rệt?', 'Switch', 'B', 'Switch tách các miền va chạm tốt hơn nhiều so với hub.', '[{"letter":"A","text":"Hub"},{"letter":"B","text":"Switch"},{"letter":"C","text":"Repeater thụ động"},{"letter":"D","text":"Cáp đồng trục cũ"}]'),

(5, 'Tầng liên kết dữ liệu nằm giữa tầng nào và tầng nào trong mô hình OSI?', 'Tổng quan', 'A', 'Tầng liên kết dữ liệu nằm trên tầng vật lý và dưới tầng mạng.', '[{"letter":"A","text":"Giữa tầng vật lý và tầng mạng"},{"letter":"B","text":"Giữa tầng giao vận và tầng ứng dụng"},{"letter":"C","text":"Giữa tầng phiên và tầng trình bày"},{"letter":"D","text":"Giữa tầng mạng và tầng giao vận"}]'),

(5, 'Kết luận nào sau đây đúng nhất về tầng liên kết dữ liệu?', 'Tổng quan', 'C', 'Tầng liên kết dữ liệu gắn với frame, MAC, switch, bridge, phát hiện lỗi và truyền node-to-node.', '[{"letter":"A","text":"Chỉ dùng để định tuyến Internet"},{"letter":"B","text":"Chỉ dùng để gửi email"},{"letter":"C","text":"Phụ trách truyền dữ liệu giữa các nút liền kề, dùng frame và địa chỉ MAC"},{"letter":"D","text":"Không liên quan đến switch"}]');
