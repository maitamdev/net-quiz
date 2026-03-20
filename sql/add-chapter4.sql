-- =============================================
-- Thêm Chương 4 - Tầng mạng
-- Chạy trong Supabase > SQL Editor
-- =============================================

-- 1. Thêm chương 4
INSERT INTO chapters (id, name, description) VALUES
(4, 'Tầng mạng', 'IP, IPv4, IPv6, định tuyến, NAT, ICMP, router')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 2. Câu hỏi chương 4 (30 câu)
INSERT INTO questions (chapter_id, text, topic, correct, explanation, answers) VALUES
(4, 'Chức năng quan trọng nhất của tầng mạng là gì?', 'Tổng quan', 'B', 'Tầng mạng chịu trách nhiệm tìm đường đi và chuyển gói tin từ nguồn đến đích qua các mạng trung gian.', '[{"letter":"A","text":"Đóng gói dữ liệu thành frame"},{"letter":"B","text":"Định tuyến và chuyển tiếp gói tin"},{"letter":"C","text":"Phân giải tên miền"},{"letter":"D","text":"Kiểm soát truy nhập đường truyền"}]'),

(4, 'Giao thức IP hoạt động ở tầng nào trong mô hình TCP/IP?', 'IP', 'A', 'IP là giao thức cốt lõi của tầng mạng.', '[{"letter":"A","text":"Tầng mạng"},{"letter":"B","text":"Tầng giao vận"},{"letter":"C","text":"Tầng ứng dụng"},{"letter":"D","text":"Tầng vật lý"}]'),

(4, 'Đơn vị dữ liệu ở tầng mạng thường được gọi là gì?', 'Tổng quan', 'C', 'Ở tầng mạng, dữ liệu thường được gọi là gói tin, hay packet.', '[{"letter":"A","text":"Segment"},{"letter":"B","text":"Frame"},{"letter":"C","text":"Packet"},{"letter":"D","text":"Bit"}]'),

(4, 'Định tuyến là gì?', 'Định tuyến', 'D', 'Định tuyến là việc chọn đường đi phù hợp để gói tin đến được đích.', '[{"letter":"A","text":"Quá trình đổi địa chỉ MAC thành IP"},{"letter":"B","text":"Quá trình mã hóa dữ liệu"},{"letter":"C","text":"Quá trình cấp phát địa chỉ IP động"},{"letter":"D","text":"Quá trình lựa chọn đường đi cho gói tin từ nguồn đến đích"}]'),

(4, 'Thiết bị nào hoạt động chủ yếu ở tầng mạng?', 'Router', 'A', 'Router là thiết bị tầng mạng, dùng để định tuyến và chuyển tiếp gói tin giữa các mạng.', '[{"letter":"A","text":"Router"},{"letter":"B","text":"Hub"},{"letter":"C","text":"Repeater"},{"letter":"D","text":"Card mạng"}]'),

(4, 'Địa chỉ IPv4 có độ dài bao nhiêu bit?', 'IPv4', 'C', 'Địa chỉ IPv4 có độ dài 32 bit.', '[{"letter":"A","text":"64 bit"},{"letter":"B","text":"48 bit"},{"letter":"C","text":"32 bit"},{"letter":"D","text":"128 bit"}]'),

(4, 'Địa chỉ IPv6 có độ dài bao nhiêu bit?', 'IPv6', 'A', 'Địa chỉ IPv6 dài 128 bit, lớn hơn nhiều so với IPv4.', '[{"letter":"A","text":"128 bit"},{"letter":"B","text":"64 bit"},{"letter":"C","text":"32 bit"},{"letter":"D","text":"256 bit"}]'),

(4, 'Phiên bản IP nào được tạo ra chủ yếu để giải quyết tình trạng thiếu địa chỉ?', 'IPv6', 'D', 'IPv6 ra đời để mở rộng không gian địa chỉ và khắc phục sự hạn chế địa chỉ của IPv4.', '[{"letter":"A","text":"ICMP"},{"letter":"B","text":"ARP"},{"letter":"C","text":"IPv4"},{"letter":"D","text":"IPv6"}]'),

(4, 'Giao thức IP có đặc điểm cơ bản nào?', 'IP', 'B', 'IP là giao thức không liên kết, chỉ cố gắng chuyển gói tin đi mà không đảm bảo tuyệt đối.', '[{"letter":"A","text":"Là giao thức hướng kết nối"},{"letter":"B","text":"Là giao thức không liên kết"},{"letter":"C","text":"Luôn đảm bảo gói đến đúng thứ tự"},{"letter":"D","text":"Có cơ chế bắt tay 3 bước"}]'),

(4, 'Dịch vụ không liên kết ở tầng mạng còn được gọi là gì?', 'Datagram', 'A', 'Dịch vụ không liên kết ở tầng mạng thường được gọi là dịch vụ datagram.', '[{"letter":"A","text":"Datagram"},{"letter":"B","text":"Circuit switching"},{"letter":"C","text":"Polling"},{"letter":"D","text":"Multiplexing"}]'),

(4, 'Dịch vụ hướng kết nối ở tầng mạng thường gắn với khái niệm nào?', 'Virtual Circuit', 'A', 'Dịch vụ hướng kết nối ở tầng mạng thường được mô tả bằng mô hình mạch ảo, hay virtual circuit.', '[{"letter":"A","text":"Virtual circuit"},{"letter":"B","text":"Checksum"},{"letter":"C","text":"Broadcast domain"},{"letter":"D","text":"MAC flooding"}]'),

(4, 'Trong dịch vụ hướng kết nối ở tầng mạng, điều gì thường xảy ra trước khi truyền dữ liệu?', 'Virtual Circuit', 'B', 'Dịch vụ hướng kết nối yêu cầu thiết lập đường đi logic trước khi truyền dữ liệu.', '[{"letter":"A","text":"Chỉ cần gửi ngay dữ liệu"},{"letter":"B","text":"Thiết lập đường đi logic trước"},{"letter":"C","text":"Phải đổi địa chỉ MAC"},{"letter":"D","text":"Phải đổi tên miền"}]'),

(4, 'Trong dịch vụ không liên kết, các gói tin được xử lý như thế nào?', 'Datagram', 'C', 'Trong dịch vụ datagram, mỗi gói tin có thể đi theo các đường khác nhau.', '[{"letter":"A","text":"Phải đi trên cùng một tuyến đường cố định"},{"letter":"B","text":"Không cần router xử lý"},{"letter":"C","text":"Mỗi gói có thể được định tuyến độc lập"},{"letter":"D","text":"Không có địa chỉ đích"}]'),

(4, 'NAT là cơ chế dùng để làm gì?', 'NAT', 'A', 'NAT là Network Address Translation, dùng để chuyển đổi địa chỉ IP.', '[{"letter":"A","text":"Chuyển đổi địa chỉ mạng"},{"letter":"B","text":"Kiểm tra lỗi bit"},{"letter":"C","text":"Mã hóa email"},{"letter":"D","text":"Chia kênh truyền"}]'),

(4, 'Một lợi ích phổ biến của NAT là gì?', 'NAT', 'B', 'NAT cho phép nhiều thiết bị trong mạng riêng truy cập Internet thông qua một địa chỉ IP công cộng.', '[{"letter":"A","text":"Làm tăng tốc độ CPU"},{"letter":"B","text":"Giúp nhiều máy nội bộ dùng chung một địa chỉ IP công cộng"},{"letter":"C","text":"Thay thế hoàn toàn DNS"},{"letter":"D","text":"Thay thế card mạng"}]'),

(4, 'Địa chỉ IP dùng để xác định điều gì?', 'IP', 'A', 'Địa chỉ IP là địa chỉ logic dùng để xác định thiết bị trong liên mạng.', '[{"letter":"A","text":"Địa chỉ logic của thiết bị trên mạng"},{"letter":"B","text":"Địa chỉ vật lý của card mạng"},{"letter":"C","text":"Tên miền của máy"},{"letter":"D","text":"Vị trí ổ cứng"}]'),

(4, 'Giao thức ICMP thường được dùng để làm gì?', 'ICMP', 'B', 'ICMP thường được dùng để thông báo lỗi và hỗ trợ kiểm tra mạng, ví dụ ping.', '[{"letter":"A","text":"Truyền file"},{"letter":"B","text":"Báo lỗi và hỗ trợ chẩn đoán mạng"},{"letter":"C","text":"Gửi thư điện tử"},{"letter":"D","text":"Cấp phát IP tự động"}]'),

(4, 'Lệnh ping thường dựa vào giao thức nào?', 'ICMP', 'C', 'Ping dùng thông điệp ICMP Echo Request và Echo Reply.', '[{"letter":"A","text":"TCP"},{"letter":"B","text":"UDP"},{"letter":"C","text":"ICMP"},{"letter":"D","text":"ARP"}]'),

(4, 'Khi một router nhận gói tin, việc đầu tiên quan trọng nhất để quyết định chuyển tiếp là gì?', 'Định tuyến', 'A', 'Router chủ yếu dựa vào địa chỉ IP đích để quyết định chuyển tiếp gói tin.', '[{"letter":"A","text":"Xem địa chỉ đích IP"},{"letter":"B","text":"Xem tên miền nguồn"},{"letter":"C","text":"Xem số hiệu port"},{"letter":"D","text":"Xem địa chỉ MAC nguồn ở máy gửi đầu tiên"}]'),

(4, 'Bảng định tuyến trong router dùng để làm gì?', 'Định tuyến', 'B', 'Bảng định tuyến chứa thông tin về các mạng đích và đường đi tương ứng.', '[{"letter":"A","text":"Lưu danh sách người dùng"},{"letter":"B","text":"Lưu các tuyến đường để chuyển gói tin"},{"letter":"C","text":"Lưu mật khẩu Wi-Fi"},{"letter":"D","text":"Lưu địa chỉ MAC của switch"}]'),

(4, 'Tắc nghẽn mạng xảy ra khi nào?', 'Tắc nghẽn', 'A', 'Tắc nghẽn mạng xảy ra khi lượng gói tin quá lớn so với tài nguyên mạng.', '[{"letter":"A","text":"Khi số lượng dữ liệu vào mạng vượt quá khả năng xử lý hoặc truyền tải"},{"letter":"B","text":"Khi chỉ có một máy tính trong mạng"},{"letter":"C","text":"Khi địa chỉ MAC bị trùng"},{"letter":"D","text":"Khi cáp mạng quá ngắn"}]'),

(4, 'Nguyên nhân nào sau đây có thể gây tắc nghẽn mạng?', 'Tắc nghẽn', 'D', 'Tắc nghẽn có thể do quá tải lưu lượng, băng thông thấp hoặc bộ đệm không đủ.', '[{"letter":"A","text":"Quá nhiều gói tin cùng đi vào mạng"},{"letter":"B","text":"Băng thông hạn chế"},{"letter":"C","text":"Bộ đệm thiết bị mạng có giới hạn"},{"letter":"D","text":"Cả A, B, C"}]'),

(4, 'Mạng tùy biến di động là gì?', 'Mạng di động', 'B', 'Mạng tùy biến di động là mạng mà các nút có thể tự kết nối và định tuyến cho nhau.', '[{"letter":"A","text":"Mạng chỉ dùng cáp quang"},{"letter":"B","text":"Mạng không dây tự tổ chức, không cần hạ tầng cố định"},{"letter":"C","text":"Mạng chỉ có một router"},{"letter":"D","text":"Mạng chỉ hoạt động trong phòng máy"}]'),

(4, 'Trong IPv4, địa chỉ nào sau đây là một ví dụ hợp lệ?', 'IPv4', 'A', 'Mỗi octet của IPv4 phải nằm trong khoảng từ 0 đến 255 và có đủ 4 phần.', '[{"letter":"A","text":"192.168.1.10"},{"letter":"B","text":"300.1.1.1"},{"letter":"C","text":"192.168.1.256"},{"letter":"D","text":"10.10.10"}]'),

(4, 'Đặc điểm đúng của địa chỉ IPv6 là gì?', 'IPv6', 'C', 'IPv6 thường được biểu diễn bằng các nhóm số hệ 16, cách nhau bởi dấu hai chấm.', '[{"letter":"A","text":"Biểu diễn bằng 4 số thập phân cách nhau bởi dấu chấm"},{"letter":"B","text":"Chỉ dài hơn IPv4 một chút"},{"letter":"C","text":"Thường được viết dưới dạng các nhóm số hệ thập lục phân"},{"letter":"D","text":"Không dùng trong Internet"}]'),

(4, 'Chức năng chuyển tiếp gói tin ở tầng mạng nghĩa là gì?', 'Chuyển tiếp', 'B', 'Chuyển tiếp là hành động thực tế của router khi gửi gói tin ra đúng cổng ra.', '[{"letter":"A","text":"Thêm tiêu đề HTTP vào gói"},{"letter":"B","text":"Đưa gói tin từ một cổng vào sang cổng ra phù hợp"},{"letter":"C","text":"Đổi dữ liệu nhị phân thành tín hiệu analog"},{"letter":"D","text":"Lưu trữ gói tin vĩnh viễn"}]'),

(4, 'Tầng mạng quan tâm chủ yếu đến kiểu giao tiếp nào?', 'Tổng quan', 'D', 'Tầng mạng chịu trách nhiệm đưa dữ liệu từ host nguồn tới host đích qua nhiều mạng.', '[{"letter":"A","text":"Process to process"},{"letter":"B","text":"Application to application"},{"letter":"C","text":"Node to node trong cùng liên kết"},{"letter":"D","text":"Host to host qua liên mạng"}]'),

(4, 'Phát biểu nào đúng nhất về router?', 'Router', 'C', 'Router là thiết bị liên mạng, dùng để nối các mạng lại và định tuyến gói tin.', '[{"letter":"A","text":"Router hoạt động chủ yếu ở tầng vật lý"},{"letter":"B","text":"Router chỉ dùng trong mạng LAN nhỏ"},{"letter":"C","text":"Router kết nối các mạng và quyết định đường đi của gói tin"},{"letter":"D","text":"Router thay thế DNS"}]'),

(4, 'Nếu không có tầng mạng, điều gì sẽ bị ảnh hưởng lớn nhất?', 'Tổng quan', 'A', 'Tầng mạng là tầng giúp liên lạc qua nhiều mạng khác nhau, nên thiếu nó sẽ không thể định tuyến liên mạng hiệu quả.', '[{"letter":"A","text":"Việc truyền dữ liệu giữa các mạng khác nhau"},{"letter":"B","text":"Màu hiển thị màn hình"},{"letter":"C","text":"Kích thước file văn bản"},{"letter":"D","text":"Tên người dùng đăng nhập"}]'),

(4, 'Kết luận nào sau đây đúng nhất về tầng mạng?', 'Tổng quan', 'C', 'Tầng mạng gắn với địa chỉ IP, router, định tuyến và chuyển tiếp gói tin giữa các mạng.', '[{"letter":"A","text":"Tầng mạng chỉ dùng để cấp phát địa chỉ MAC"},{"letter":"B","text":"Tầng mạng chỉ dành cho web"},{"letter":"C","text":"Tầng mạng đảm nhiệm địa chỉ logic, định tuyến và chuyển tiếp gói tin"},{"letter":"D","text":"Tầng mạng không liên quan đến router"}]');
