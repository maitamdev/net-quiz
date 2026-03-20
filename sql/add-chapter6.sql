-- =============================================
-- Thêm Chương 6 - Tầng vật lý
-- Chạy trong Supabase > SQL Editor
-- =============================================

-- 1. Thêm chương 6
INSERT INTO chapters (id, name, description) VALUES
(6, 'Tầng vật lý', 'Tín hiệu, môi trường truyền, cáp, modem, hub, repeater')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 2. Câu hỏi chương 6 (30 câu)
INSERT INTO questions (chapter_id, text, topic, correct, explanation, answers) VALUES
(6, 'Tầng vật lý trong mô hình mạng có chức năng chính là gì?', 'Tổng quan', 'B', 'Tầng vật lý chịu trách nhiệm truyền các bit 0 và 1 qua môi trường truyền dẫn.', '[{"letter":"A","text":"Định tuyến gói tin giữa các mạng"},{"letter":"B","text":"Truyền các bit trên môi trường truyền dẫn"},{"letter":"C","text":"Phân giải tên miền"},{"letter":"D","text":"Quản lý cổng ứng dụng"}]'),

(6, 'Đơn vị dữ liệu ở tầng vật lý là gì?', 'Tổng quan', 'C', 'Ở tầng vật lý, dữ liệu được biểu diễn và truyền dưới dạng bit.', '[{"letter":"A","text":"Packet"},{"letter":"B","text":"Frame"},{"letter":"C","text":"Bit"},{"letter":"D","text":"Segment"}]'),

(6, 'Thiết bị nào hoạt động chủ yếu ở tầng vật lý?', 'Thiết bị', 'D', 'Hub là thiết bị tầng vật lý, phát tín hiệu đến tất cả các cổng mà không xử lý địa chỉ.', '[{"letter":"A","text":"Router"},{"letter":"B","text":"Switch"},{"letter":"C","text":"Bridge"},{"letter":"D","text":"Hub"}]'),

(6, 'Modem là thiết bị hoạt động chủ yếu ở tầng nào?', 'Modem', 'A', 'Modem thực hiện biến đổi tín hiệu để truyền trên môi trường vật lý nên chủ yếu thuộc tầng vật lý.', '[{"letter":"A","text":"Tầng vật lý"},{"letter":"B","text":"Tầng mạng"},{"letter":"C","text":"Tầng ứng dụng"},{"letter":"D","text":"Tầng giao vận"}]'),

(6, 'Tên gọi đầy đủ của modem là gì?', 'Modem', 'C', 'Modem là viết tắt của Modulator-Demodulator, tức là điều chế và giải điều chế.', '[{"letter":"A","text":"Modify-Demonstrate"},{"letter":"B","text":"Model-Debug"},{"letter":"C","text":"Modulator-Demodulator"},{"letter":"D","text":"Mode-Decoder"}]'),

(6, 'Nhiệm vụ cơ bản của modem là gì?', 'Modem', 'B', 'Modem dùng để biến đổi tín hiệu số thành tín hiệu phù hợp với đường truyền và ngược lại.', '[{"letter":"A","text":"Định tuyến gói IP"},{"letter":"B","text":"Chuyển đổi giữa tín hiệu số và tín hiệu tương tự"},{"letter":"C","text":"Phân giải địa chỉ MAC"},{"letter":"D","text":"Gửi email"}]'),

(6, 'Môi trường truyền dẫn có dây nào phổ biến trong mạng máy tính?', 'Môi trường truyền', 'A', 'Cáp xoắn đôi là môi trường truyền dẫn có dây rất phổ biến trong mạng LAN.', '[{"letter":"A","text":"Cáp xoắn đôi"},{"letter":"B","text":"Không khí"},{"letter":"C","text":"Chân không"},{"letter":"D","text":"Sóng âm"}]'),

(6, 'Môi trường truyền dẫn nào sau đây là không dây?', 'Môi trường truyền', 'C', 'Sóng vô tuyến là môi trường truyền dẫn không dây.', '[{"letter":"A","text":"Cáp quang"},{"letter":"B","text":"Cáp đồng trục"},{"letter":"C","text":"Sóng vô tuyến"},{"letter":"D","text":"Cáp xoắn đôi"}]'),

(6, 'Cáp quang truyền dữ liệu chủ yếu bằng gì?', 'Cáp quang', 'B', 'Cáp quang truyền tín hiệu bằng ánh sáng nên có băng thông cao và chống nhiễu tốt.', '[{"letter":"A","text":"Dòng điện"},{"letter":"B","text":"Ánh sáng"},{"letter":"C","text":"Sóng âm"},{"letter":"D","text":"Từ trường tĩnh"}]'),

(6, 'Ưu điểm nổi bật của cáp quang là gì?', 'Cáp quang', 'B', 'Cáp quang có tốc độ cao, băng thông lớn và ít bị ảnh hưởng bởi nhiễu điện từ.', '[{"letter":"A","text":"Dễ bị nhiễu điện từ"},{"letter":"B","text":"Băng thông cao và truyền xa tốt"},{"letter":"C","text":"Giá luôn rẻ nhất"},{"letter":"D","text":"Chỉ dùng cho mạng rất nhỏ"}]'),

(6, 'Loại cáp nào thường được dùng phổ biến trong mạng LAN hiện nay?', 'Môi trường truyền', 'A', 'Trong mạng LAN hiện nay, cáp xoắn đôi là loại phổ biến nhất.', '[{"letter":"A","text":"Cáp xoắn đôi"},{"letter":"B","text":"Cáp điện thoại analog cũ"},{"letter":"C","text":"Cáp đồng trục dày"},{"letter":"D","text":"Cáp âm thanh"}]'),

(6, 'Tầng vật lý quan tâm trực tiếp đến yếu tố nào?', 'Tổng quan', 'C', 'Tầng vật lý xử lý cách bit được biểu diễn thành tín hiệu và truyền qua môi trường.', '[{"letter":"A","text":"Địa chỉ IP"},{"letter":"B","text":"Cấu trúc khung dữ liệu logic"},{"letter":"C","text":"Biểu diễn tín hiệu và môi trường truyền"},{"letter":"D","text":"Tên miền"}]'),

(6, 'Sự suy giảm cường độ tín hiệu theo khoảng cách được gọi là gì?', 'Tín hiệu', 'B', 'Suy hao là hiện tượng tín hiệu yếu dần khi truyền đi xa.', '[{"letter":"A","text":"Nhiễu"},{"letter":"B","text":"Suy hao"},{"letter":"C","text":"Méo xung"},{"letter":"D","text":"Phản xạ"}]'),

(6, 'Nguyên nhân nào sau đây là một dạng làm sai lệch tín hiệu?', 'Tín hiệu', 'D', 'Ba nguyên nhân cơ bản gây sai lệch tín hiệu là suy hao, nhiễu và méo dạng.', '[{"letter":"A","text":"Suy hao"},{"letter":"B","text":"Nhiễu"},{"letter":"C","text":"Méo dạng"},{"letter":"D","text":"Cả A, B, C"}]'),

(6, 'Nhiễu trong truyền dẫn dữ liệu là gì?', 'Tín hiệu', 'A', 'Nhiễu là tín hiệu ngoài ý muốn chen vào, làm tín hiệu thu bị sai lệch.', '[{"letter":"A","text":"Tín hiệu không mong muốn làm ảnh hưởng đến tín hiệu gốc"},{"letter":"B","text":"Địa chỉ IP bị trùng"},{"letter":"C","text":"Lỗi định tuyến"},{"letter":"D","text":"Sai cổng ứng dụng"}]'),

(6, 'Băng thông của đường truyền thường thể hiện điều gì?', 'Băng thông', 'B', 'Băng thông thể hiện khả năng tải dữ liệu của đường truyền trong một đơn vị thời gian.', '[{"letter":"A","text":"Dung lượng ổ cứng"},{"letter":"B","text":"Khả năng truyền dữ liệu của kênh truyền"},{"letter":"C","text":"Số lượng router"},{"letter":"D","text":"Số địa chỉ MAC"}]'),

(6, 'Đơn vị thường dùng để đo tốc độ truyền dữ liệu ở tầng vật lý là gì?', 'Băng thông', 'A', 'Tốc độ truyền dữ liệu vật lý thường được đo bằng bps, kbps, Mbps hoặc Gbps.', '[{"letter":"A","text":"bit trên giây"},{"letter":"B","text":"byte trên mét"},{"letter":"C","text":"frame trên giây"},{"letter":"D","text":"packet trên giờ"}]'),

(6, 'Tín hiệu số có đặc điểm nào?', 'Tín hiệu', 'B', 'Tín hiệu số thường có các mức rời rạc, ví dụ hai mức biểu diễn 0 và 1.', '[{"letter":"A","text":"Biến đổi liên tục theo thời gian"},{"letter":"B","text":"Chỉ biểu diễn bằng các mức rời rạc"},{"letter":"C","text":"Không thể dùng trong mạng máy tính"},{"letter":"D","text":"Luôn là ánh sáng"}]'),

(6, 'Tín hiệu tương tự có đặc điểm nào?', 'Tín hiệu', 'B', 'Tín hiệu tương tự thay đổi liên tục, khác với tín hiệu số dạng rời rạc.', '[{"letter":"A","text":"Chỉ có hai mức 0 và 1"},{"letter":"B","text":"Biến thiên liên tục theo thời gian"},{"letter":"C","text":"Không thể truyền qua dây dẫn"},{"letter":"D","text":"Chỉ xuất hiện trong IPv6"}]'),

(6, 'Quá trình biến đổi dữ liệu số thành tín hiệu phù hợp với đường truyền được gọi là gì?', 'Điều chế', 'C', 'Điều chế là quá trình biến đổi tín hiệu để phù hợp với môi trường truyền dẫn.', '[{"letter":"A","text":"Định tuyến"},{"letter":"B","text":"Mã hóa địa chỉ"},{"letter":"C","text":"Điều chế"},{"letter":"D","text":"Phân mảnh"}]'),

(6, 'Sóng viba là gì?', 'Sóng vô tuyến', 'A', 'Sóng viba là sóng điện từ tần số cao, dùng trong liên lạc vô tuyến, vệ tinh, radar.', '[{"letter":"A","text":"Một loại sóng điện từ tần số cao dùng trong truyền thông vô tuyến"},{"letter":"B","text":"Một loại dây cáp đồng"},{"letter":"C","text":"Một giao thức mạng"},{"letter":"D","text":"Một dạng địa chỉ IP"}]'),

(6, 'Ưu điểm của truyền dẫn không dây là gì?', 'Không dây', 'C', 'Truyền không dây linh hoạt, tiện triển khai, nhất là khi khó kéo cáp.', '[{"letter":"A","text":"Luôn ổn định hơn cáp quang"},{"letter":"B","text":"Không bị ảnh hưởng bởi môi trường"},{"letter":"C","text":"Dễ triển khai và linh hoạt di chuyển"},{"letter":"D","text":"Không bao giờ bị nhiễu"}]'),

(6, 'Nhược điểm thường gặp của môi trường truyền không dây là gì?', 'Không dây', 'B', 'Môi trường không dây thường dễ bị ảnh hưởng bởi vật cản, nhiễu và khoảng cách.', '[{"letter":"A","text":"Không truyền được dữ liệu"},{"letter":"B","text":"Dễ bị nhiễu và suy giảm tín hiệu hơn"},{"letter":"C","text":"Không cần thiết bị thu phát"},{"letter":"D","text":"Không dùng sóng điện từ"}]'),

(6, 'Repeater là thiết bị dùng để làm gì?', 'Thiết bị', 'A', 'Repeater giúp tín hiệu đi xa hơn bằng cách khuếch đại hoặc tái tạo lại tín hiệu.', '[{"letter":"A","text":"Khuếch đại hoặc tái tạo tín hiệu để truyền xa hơn"},{"letter":"B","text":"Định tuyến giữa hai mạng"},{"letter":"C","text":"Cấp phát địa chỉ IP"},{"letter":"D","text":"Mã hóa trang web"}]'),

(6, 'Một nhiệm vụ của tầng vật lý là quy định gì?', 'Tổng quan', 'A', 'Tầng vật lý quy định cách bit được biểu diễn thành tín hiệu điện, quang hoặc vô tuyến.', '[{"letter":"A","text":"Cách ánh xạ bit thành tín hiệu"},{"letter":"B","text":"Cách chọn đường đi cho gói tin"},{"letter":"C","text":"Cách gán port cho ứng dụng"},{"letter":"D","text":"Cách gửi email"}]'),

(6, 'Phát biểu nào đúng về hub?', 'Thiết bị', 'B', 'Hub không xử lý frame thông minh như switch mà chỉ phát tín hiệu đến các cổng.', '[{"letter":"A","text":"Hub đọc địa chỉ MAC rồi chọn đúng cổng đích"},{"letter":"B","text":"Hub hoạt động như thiết bị tầng vật lý và phát tín hiệu ra nhiều cổng"},{"letter":"C","text":"Hub là thiết bị định tuyến"},{"letter":"D","text":"Hub chỉ dùng cho IPv6"}]'),

(6, 'Tầng vật lý trong mô hình OSI nằm ở vị trí nào?', 'Tổng quan', 'A', 'Tầng vật lý là tầng thấp nhất trong mô hình OSI.', '[{"letter":"A","text":"Tầng dưới cùng"},{"letter":"B","text":"Tầng trên cùng"},{"letter":"C","text":"Nằm giữa tầng mạng và tầng giao vận"},{"letter":"D","text":"Nằm trên tầng ứng dụng"}]'),

(6, 'Yếu tố nào ảnh hưởng trực tiếp đến chất lượng truyền dẫn ở tầng vật lý?', 'Tín hiệu', 'D', 'Chất lượng tín hiệu phụ thuộc vào khoảng cách, nhiễu và đặc tính môi trường truyền.', '[{"letter":"A","text":"Chiều dài đường truyền"},{"letter":"B","text":"Nhiễu điện từ"},{"letter":"C","text":"Chất lượng môi trường truyền"},{"letter":"D","text":"Cả A, B, C"}]'),

(6, 'Nếu xét riêng theo mô hình phân tầng, tầng vật lý không trực tiếp xử lý nội dung nào sau đây?', 'Tổng quan', 'A', 'Địa chỉ IP thuộc tầng mạng, không phải chức năng trực tiếp của tầng vật lý.', '[{"letter":"A","text":"Địa chỉ IP"},{"letter":"B","text":"Mức điện áp tín hiệu"},{"letter":"C","text":"Dạng sóng truyền"},{"letter":"D","text":"Đầu nối và môi trường truyền"}]'),

(6, 'Kết luận nào sau đây đúng nhất về tầng vật lý?', 'Tổng quan', 'B', 'Tầng vật lý gắn với bit, tín hiệu, đầu nối, cáp, sóng và các đặc tính truyền dẫn.', '[{"letter":"A","text":"Tầng vật lý phụ trách địa chỉ MAC và frame"},{"letter":"B","text":"Tầng vật lý phụ trách truyền bit, tín hiệu, môi trường truyền và các đặc tính phần cứng"},{"letter":"C","text":"Tầng vật lý dùng để gửi thư điện tử"},{"letter":"D","text":"Tầng vật lý là tầng định tuyến"}]');
