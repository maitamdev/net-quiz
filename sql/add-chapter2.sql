-- =============================================
-- Đổi tên Chương 1 + Thêm Chương 2
-- Chạy trong Supabase > SQL Editor
-- =============================================

-- 1. Đổi tên chương 1
UPDATE chapters SET name = 'Khái niệm cơ bản', description = 'Mạng máy tính, kiến trúc mạng, thiết bị, phân loại mạng' WHERE id = 1;

-- 2. Thêm chương 2
INSERT INTO chapters (id, name, description) VALUES
(2, 'Tầng ứng dụng', 'HTTP, FTP, SMTP, POP3, DNS, DHCP, Telnet, SSH')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 3. Câu hỏi chương 2 (30 câu)
INSERT INTO questions (chapter_id, text, topic, correct, explanation, answers) VALUES
(2, 'Tầng ứng dụng trong mô hình TCP/IP có chức năng chính là gì?', 'Tổng quan tầng ứng dụng', 'B', 'Tầng ứng dụng là nơi các chương trình như web, email, truyền file sử dụng để giao tiếp qua mạng.', '[{"letter":"A","text":"Truyền bit trên đường truyền"},{"letter":"B","text":"Cung cấp dịch vụ mạng trực tiếp cho người dùng và chương trình ứng dụng"},{"letter":"C","text":"Định tuyến gói tin"},{"letter":"D","text":"Kiểm tra tín hiệu điện"}]'),

(2, 'Giao thức nào thường dùng để truy cập trang web?', 'HTTP', 'B', 'HTTP là giao thức phổ biến dùng để trao đổi dữ liệu giữa trình duyệt và máy chủ web.', '[{"letter":"A","text":"FTP"},{"letter":"B","text":"HTTP"},{"letter":"C","text":"ARP"},{"letter":"D","text":"ICMP"}]'),

(2, 'HTTPS khác HTTP chủ yếu ở điểm nào?', 'HTTP', 'C', 'HTTPS giúp mã hóa dữ liệu truyền giữa client và server, tăng bảo mật.', '[{"letter":"A","text":"HTTPS truyền chậm hơn nên ít dùng"},{"letter":"B","text":"HTTPS không dùng Internet"},{"letter":"C","text":"HTTPS có mã hóa SSL/TLS, HTTP thì không"},{"letter":"D","text":"HTTP chỉ dùng cho điện thoại"}]'),

(2, 'Thông điệp HTTP Request thường gồm mấy phần chính?', 'HTTP', 'B', 'HTTP Request gồm dòng yêu cầu, phần header và phần body.', '[{"letter":"A","text":"2 phần"},{"letter":"B","text":"3 phần"},{"letter":"C","text":"4 phần"},{"letter":"D","text":"5 phần"}]'),

(2, 'Trong HTTP Request, phần body thường chứa gì?', 'HTTP', 'B', 'Body thường chứa dữ liệu biểu mẫu, JSON, XML hoặc tệp được tải lên.', '[{"letter":"A","text":"Địa chỉ IP của router"},{"letter":"B","text":"Dữ liệu client gửi lên server"},{"letter":"C","text":"Mã lỗi vật lý"},{"letter":"D","text":"Địa chỉ MAC của switch"}]'),

(2, 'Thông điệp HTTP Response thường gồm mấy phần chính?', 'HTTP', 'C', 'HTTP Response gồm dòng trạng thái, header và body.', '[{"letter":"A","text":"1 phần"},{"letter":"B","text":"2 phần"},{"letter":"C","text":"3 phần"},{"letter":"D","text":"4 phần"}]'),

(2, 'Mã trạng thái HTTP 200 cho biết điều gì?', 'HTTP', 'B', '200 OK nghĩa là máy chủ đã xử lý yêu cầu thành công.', '[{"letter":"A","text":"Không tìm thấy tài nguyên"},{"letter":"B","text":"Yêu cầu thành công"},{"letter":"C","text":"Lỗi máy chủ"},{"letter":"D","text":"Cần chuyển hướng"}]'),

(2, 'Mã trạng thái HTTP 404 có ý nghĩa gì?', 'HTTP', 'C', '404 Not Found là lỗi phổ biến khi tài nguyên không tồn tại hoặc không tìm thấy.', '[{"letter":"A","text":"Yêu cầu thành công"},{"letter":"B","text":"Không có quyền truy cập"},{"letter":"C","text":"Không tìm thấy tài nguyên"},{"letter":"D","text":"Máy chủ ngừng hoạt động vĩnh viễn"}]'),

(2, 'Phương thức HTTP nào thường dùng để lấy dữ liệu từ server?', 'HTTP', 'B', 'GET thường dùng để yêu cầu server gửi dữ liệu về cho client.', '[{"letter":"A","text":"POST"},{"letter":"B","text":"GET"},{"letter":"C","text":"PUT"},{"letter":"D","text":"DELETE"}]'),

(2, 'Phương thức HTTP nào thường dùng để gửi dữ liệu từ client lên server?', 'HTTP', 'C', 'POST thường dùng để gửi dữ liệu biểu mẫu hoặc thông tin lên máy chủ.', '[{"letter":"A","text":"GET"},{"letter":"B","text":"TRACE"},{"letter":"C","text":"POST"},{"letter":"D","text":"HEAD"}]'),

(2, 'FTP là giao thức dùng để làm gì?', 'FTP', 'B', 'FTP là giao thức truyền tệp giữa client và server.', '[{"letter":"A","text":"Phân giải tên miền"},{"letter":"B","text":"Truyền tệp"},{"letter":"C","text":"Gửi thư điện tử"},{"letter":"D","text":"Cấp phát IP"}]'),

(2, 'FTP sử dụng giao thức tầng dưới nào để truyền dữ liệu?', 'FTP', 'C', 'FTP là giao thức hướng kết nối, hoạt động trên TCP.', '[{"letter":"A","text":"UDP"},{"letter":"B","text":"ARP"},{"letter":"C","text":"TCP"},{"letter":"D","text":"ICMP"}]'),

(2, 'Giao thức trung tâm của hệ thống thư điện tử là gì?', 'Email', 'A', 'SMTP chủ yếu dùng để gửi thư điện tử.', '[{"letter":"A","text":"SMTP"},{"letter":"B","text":"HTTP"},{"letter":"C","text":"ARP"},{"letter":"D","text":"DHCP"}]'),

(2, 'Giao thức nào thường dùng để nhận thư điện tử từ mail server về máy người dùng trong dạng câu hỏi cơ bản?', 'Email', 'B', 'Trong các câu hỏi nhập môn, POP3 thường được dùng làm đáp án cho giao thức nhận thư.', '[{"letter":"A","text":"SMTP"},{"letter":"B","text":"POP3"},{"letter":"C","text":"ARP"},{"letter":"D","text":"RIP"}]'),

(2, 'IMAP là giao thức dùng để làm gì?', 'Email', 'B', 'IMAP cho phép đọc và quản lý thư trực tiếp trên máy chủ.', '[{"letter":"A","text":"Gửi thư điện tử"},{"letter":"B","text":"Nhận và quản lý thư điện tử trên máy chủ"},{"letter":"C","text":"Truyền tệp"},{"letter":"D","text":"Cấp phát địa chỉ IP"}]'),

(2, 'DNS là viết tắt của chức năng nào?', 'DNS', 'B', 'DNS dùng để chuyển tên miền thành địa chỉ IP.', '[{"letter":"A","text":"Hệ thống truyền dữ liệu số"},{"letter":"B","text":"Hệ thống phân giải tên miền"},{"letter":"C","text":"Hệ thống nén tệp"},{"letter":"D","text":"Hệ thống định tuyến động"}]'),

(2, 'Chức năng chính của DNS là gì?', 'DNS', 'A', 'DNS giúp người dùng truy cập bằng tên dễ nhớ thay vì phải nhớ địa chỉ IP.', '[{"letter":"A","text":"Chuyển tên miền thành địa chỉ IP"},{"letter":"B","text":"Gửi thư điện tử"},{"letter":"C","text":"Truyền file"},{"letter":"D","text":"Mã hóa đường truyền vật lý"}]'),

(2, 'Có thể thiết lập cấu hình DNS Server bằng mấy cách cơ bản?', 'DNS', 'B', 'Thông thường có cấu hình thủ công hoặc nhận tự động qua DHCP.', '[{"letter":"A","text":"1 cách"},{"letter":"B","text":"2 cách"},{"letter":"C","text":"3 cách"},{"letter":"D","text":"5 cách"}]'),

(2, 'DHCP là giao thức dùng để làm gì?', 'DHCP', 'A', 'DHCP giúp cấp phát IP, gateway, DNS và các thông số mạng tự động.', '[{"letter":"A","text":"Cấp phát địa chỉ IP tự động"},{"letter":"B","text":"Gửi email"},{"letter":"C","text":"Phân giải tên miền"},{"letter":"D","text":"Truyền video trực tuyến"}]'),

(2, 'Telnet là giao thức dùng để làm gì?', 'Telnet/SSH', 'A', 'Telnet cho phép đăng nhập và điều khiển máy từ xa nhưng không mã hóa.', '[{"letter":"A","text":"Đăng nhập điều khiển từ xa"},{"letter":"B","text":"Truyền ảnh"},{"letter":"C","text":"Cấp phát IP"},{"letter":"D","text":"Định tuyến"}]'),

(2, 'Giao thức nào an toàn hơn Telnet khi truy cập từ xa?', 'Telnet/SSH', 'C', 'SSH là giao thức truy cập từ xa có mã hóa, an toàn hơn Telnet.', '[{"letter":"A","text":"FTP"},{"letter":"B","text":"SMTP"},{"letter":"C","text":"SSH"},{"letter":"D","text":"ARP"}]'),

(2, 'Mô hình client-server ở tầng ứng dụng là gì?', 'Client-Server', 'B', 'Client gửi yêu cầu, server tiếp nhận và trả lời.', '[{"letter":"A","text":"Mọi máy đều không phân vai"},{"letter":"B","text":"Một bên yêu cầu dịch vụ, một bên cung cấp dịch vụ"},{"letter":"C","text":"Chỉ có router làm việc"},{"letter":"D","text":"Không có kết nối mạng"}]'),

(2, 'Trình duyệt web là ví dụ của thành phần nào trong mô hình client-server?', 'Client-Server', 'A', 'Trình duyệt gửi yêu cầu đến web server nên nó là client.', '[{"letter":"A","text":"Client"},{"letter":"B","text":"Server"},{"letter":"C","text":"Router"},{"letter":"D","text":"Gateway"}]'),

(2, 'Máy chủ web là ví dụ của thành phần nào trong mô hình client-server?', 'Client-Server', 'B', 'Máy chủ web cung cấp nội dung và dịch vụ cho trình duyệt.', '[{"letter":"A","text":"Client"},{"letter":"B","text":"Server"},{"letter":"C","text":"Hub"},{"letter":"D","text":"Repeater"}]'),

(2, 'URL dùng để làm gì?', 'Web', 'A', 'URL là địa chỉ dùng để xác định vị trí tài nguyên trên web.', '[{"letter":"A","text":"Xác định địa chỉ tài nguyên trên web"},{"letter":"B","text":"Lưu mật khẩu người dùng"},{"letter":"C","text":"Tăng tốc độ Internet"},{"letter":"D","text":"Đổi địa chỉ MAC"}]'),

(2, 'Tên miền là gì?', 'DNS', 'A', 'Tên miền giúp người dùng nhớ và truy cập dịch vụ mạng dễ hơn.', '[{"letter":"A","text":"Tên dễ nhớ đại diện cho địa chỉ IP"},{"letter":"B","text":"Tên của card mạng"},{"letter":"C","text":"Tên người quản trị mạng"},{"letter":"D","text":"Mã số của router"}]'),

(2, 'Cookie trong web thường dùng để làm gì?', 'Web', 'A', 'Cookie thường dùng để lưu trạng thái đăng nhập hoặc tùy chọn người dùng.', '[{"letter":"A","text":"Lưu một số thông tin phiên làm việc của người dùng"},{"letter":"B","text":"Tăng điện áp đường truyền"},{"letter":"C","text":"Thay đổi địa chỉ IP của router"},{"letter":"D","text":"Nén file ảnh vật lý"}]'),

(2, 'Web tĩnh là gì?', 'Web', 'A', 'Web tĩnh thường chứa nội dung cố định, server gửi lại gần như nguyên nội dung đã lưu.', '[{"letter":"A","text":"Trang web có nội dung cố định, ít thay đổi"},{"letter":"B","text":"Trang web không có máy chủ"},{"letter":"C","text":"Trang web không dùng Internet"},{"letter":"D","text":"Trang web chỉ chạy bằng UDP"}]'),

(2, 'Web động là gì?', 'Web', 'A', 'Web động tạo nội dung tùy theo người dùng, dữ liệu hoặc yêu cầu gửi đến.', '[{"letter":"A","text":"Trang web tự thay đổi nội dung theo yêu cầu hoặc dữ liệu"},{"letter":"B","text":"Trang web không có người dùng"},{"letter":"C","text":"Trang web không cần server"},{"letter":"D","text":"Trang web chỉ chứa hình ảnh"}]'),

(2, 'Khi gõ tên miền vào trình duyệt, bước nào thường xảy ra trước để truy cập website?', 'DNS', 'A', 'Trước khi truy cập web server, tên miền thường được DNS phân giải thành địa chỉ IP.', '[{"letter":"A","text":"DNS phân giải tên miền thành địa chỉ IP"},{"letter":"B","text":"Máy tính tự động đổi địa chỉ MAC"},{"letter":"C","text":"Switch tạo trang web"},{"letter":"D","text":"Hub cấp phát tên miền"}]');
