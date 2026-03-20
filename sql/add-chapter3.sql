-- =============================================
-- Thêm Chương 3 - Tầng giao vận
-- Chạy trong Supabase > SQL Editor
-- =============================================

-- 1. Thêm chương 3
INSERT INTO chapters (id, name, description) VALUES
(3, 'Tầng giao vận', 'TCP, UDP, Port, bắt tay 3 bước, kiểm soát lưu lượng')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 2. Câu hỏi chương 3 (30 câu)
INSERT INTO questions (chapter_id, text, topic, correct, explanation, answers) VALUES
(3, 'Tầng giao vận trong mô hình TCP/IP có chức năng chính là gì?', 'Tổng quan', 'B', 'Tầng giao vận chịu trách nhiệm truyền dữ liệu từ tiến trình này đến tiến trình khác theo kiểu đầu cuối đến đầu cuối.', '[{"letter":"A","text":"Truyền bit trên đường truyền"},{"letter":"B","text":"Truyền dữ liệu đầu cuối đến đầu cuối giữa các tiến trình"},{"letter":"C","text":"Định tuyến giữa các mạng"},{"letter":"D","text":"Phân giải tên miền"}]'),

(3, 'Hai giao thức phổ biến nhất ở tầng giao vận là gì?', 'Tổng quan', 'C', 'TCP và UDP là hai giao thức chính của tầng giao vận.', '[{"letter":"A","text":"IP và ARP"},{"letter":"B","text":"HTTP và FTP"},{"letter":"C","text":"TCP và UDP"},{"letter":"D","text":"DNS và SMTP"}]'),

(3, 'TCP là giao thức có đặc điểm nào?', 'TCP', 'C', 'TCP là giao thức hướng kết nối, có cơ chế kiểm soát lỗi, xác nhận và truyền lại.', '[{"letter":"A","text":"Không hướng kết nối"},{"letter":"B","text":"Không đảm bảo tin cậy"},{"letter":"C","text":"Hướng kết nối và tin cậy"},{"letter":"D","text":"Chỉ dùng cho mạng LAN"}]'),

(3, 'UDP là giao thức có đặc điểm nào?', 'UDP', 'B', 'UDP là giao thức không hướng kết nối, đơn giản và không đảm bảo độ tin cậy như TCP.', '[{"letter":"A","text":"Hướng kết nối"},{"letter":"B","text":"Không hướng kết nối"},{"letter":"C","text":"Luôn đảm bảo dữ liệu đến nơi đầy đủ"},{"letter":"D","text":"Có bắt tay 3 bước"}]'),

(3, 'Ưu điểm lớn nhất của UDP là gì?', 'UDP', 'A', 'Do ít cơ chế kiểm soát hơn TCP nên UDP có tốc độ nhanh và độ trễ thấp.', '[{"letter":"A","text":"Độ trễ thấp, truyền nhanh"},{"letter":"B","text":"Luôn đáng tin cậy hơn TCP"},{"letter":"C","text":"Có kiểm soát tắc nghẽn mạnh hơn"},{"letter":"D","text":"Không cần cổng port"}]'),

(3, 'TCP sử dụng cơ chế nào để thiết lập kết nối?', 'TCP', 'B', 'TCP thiết lập kết nối bằng cơ chế bắt tay 3 bước: SYN, SYN-ACK, ACK.', '[{"letter":"A","text":"Bắt tay 2 bước"},{"letter":"B","text":"Bắt tay 3 bước"},{"letter":"C","text":"Bắt tay 4 bước"},{"letter":"D","text":"Không cần bắt tay"}]'),

(3, 'Trong bắt tay 3 bước của TCP, gói đầu tiên client gửi đi thường mang cờ nào?', 'TCP', 'C', 'Client khởi tạo kết nối bằng cách gửi gói có cờ SYN.', '[{"letter":"A","text":"ACK"},{"letter":"B","text":"FIN"},{"letter":"C","text":"SYN"},{"letter":"D","text":"RST"}]'),

(3, 'Sau khi nhận được gói SYN từ client, server thường phản hồi bằng gì?', 'TCP', 'B', 'Bước thứ hai của bắt tay 3 bước là server gửi SYN-ACK.', '[{"letter":"A","text":"FIN"},{"letter":"B","text":"SYN và ACK"},{"letter":"C","text":"RST"},{"letter":"D","text":"PSH"}]'),

(3, 'Bước cuối cùng trong cơ chế bắt tay 3 bước của TCP là gì?', 'TCP', 'A', 'Client gửi ACK để hoàn tất thiết lập kết nối TCP.', '[{"letter":"A","text":"Client gửi ACK"},{"letter":"B","text":"Server gửi FIN"},{"letter":"C","text":"Client gửi RST"},{"letter":"D","text":"Server gửi dữ liệu ngay lập tức"}]'),

(3, 'Khi kết thúc kết nối TCP, cờ nào thường được dùng để yêu cầu đóng kết nối?', 'TCP', 'C', 'FIN được dùng để báo hiệu phía gửi muốn kết thúc kết nối.', '[{"letter":"A","text":"SYN"},{"letter":"B","text":"ACK"},{"letter":"C","text":"FIN"},{"letter":"D","text":"URG"}]'),

(3, 'Nếu nhận được gói FIN/ACK từ phía bên kia, phía còn lại thường làm gì?', 'TCP', 'A', 'Khi nhận FIN hoặc FIN/ACK, phía bên kia cần gửi ACK để xác nhận.', '[{"letter":"A","text":"Gửi ACK xác nhận"},{"letter":"B","text":"Tắt card mạng ngay"},{"letter":"C","text":"Gửi SYN mới"},{"letter":"D","text":"Bỏ qua"}]'),

(3, 'Đơn vị dữ liệu của TCP ở tầng giao vận thường được gọi là gì?', 'TCP', 'B', 'Ở tầng giao vận, dữ liệu TCP thường được gọi là segment.', '[{"letter":"A","text":"Frame"},{"letter":"B","text":"Segment"},{"letter":"C","text":"Packet"},{"letter":"D","text":"Bit"}]'),

(3, 'Đơn vị dữ liệu của UDP ở tầng giao vận thường được gọi là gì?', 'UDP', 'A', 'Dữ liệu của UDP thường được gọi là UDP datagram.', '[{"letter":"A","text":"Datagram"},{"letter":"B","text":"Cell"},{"letter":"C","text":"Frame"},{"letter":"D","text":"Signal"}]'),

(3, 'Port ở tầng giao vận dùng để làm gì?', 'Port', 'B', 'Port giúp phân biệt dữ liệu được gửi đến ứng dụng nào trên máy đích.', '[{"letter":"A","text":"Xác định đường dây truyền vật lý"},{"letter":"B","text":"Xác định tiến trình hoặc ứng dụng nguồn và đích"},{"letter":"C","text":"Mã hóa tín hiệu điện"},{"letter":"D","text":"Thay thế địa chỉ IP"}]'),

(3, 'Số hiệu port có độ dài bao nhiêu bit?', 'Port', 'B', 'Port trong TCP và UDP có độ dài 16 bit.', '[{"letter":"A","text":"8 bit"},{"letter":"B","text":"16 bit"},{"letter":"C","text":"24 bit"},{"letter":"D","text":"32 bit"}]'),

(3, 'Trường checksum trong TCP và UDP có độ dài bao nhiêu bit?', 'TCP/UDP', 'B', 'Checksum của TCP và UDP có độ dài 16 bit để phát hiện lỗi dữ liệu.', '[{"letter":"A","text":"8 bit"},{"letter":"B","text":"16 bit"},{"letter":"C","text":"32 bit"},{"letter":"D","text":"64 bit"}]'),

(3, 'Trong UDP, trường nào cho biết độ dài của toàn bộ segment?', 'UDP', 'B', 'Trường Length trong UDP cho biết chiều dài toàn bộ datagram.', '[{"letter":"A","text":"Checksum"},{"letter":"B","text":"Length"},{"letter":"C","text":"Sequence Number"},{"letter":"D","text":"Window Size"}]'),

(3, 'Kích thước phần header của UDP là bao nhiêu?', 'UDP', 'B', 'UDP header có kích thước cố định là 8 byte.', '[{"letter":"A","text":"4 byte"},{"letter":"B","text":"8 byte"},{"letter":"C","text":"16 byte"},{"letter":"D","text":"20 byte"}]'),

(3, 'TCP có cơ chế nào mà UDP không có?', 'TCP/UDP', 'B', 'TCP có cơ chế thiết lập kết nối, đánh số thứ tự, ACK, truyền lại, còn UDP thì không.', '[{"letter":"A","text":"Địa chỉ IP"},{"letter":"B","text":"Bắt tay thiết lập kết nối và xác nhận nhận dữ liệu"},{"letter":"C","text":"Trường độ dài"},{"letter":"D","text":"Truyền dữ liệu"}]'),

(3, 'UDP có cơ chế kiểm soát lưu lượng hay không?', 'UDP', 'B', 'UDP không có cơ chế kiểm soát lưu lượng như TCP.', '[{"letter":"A","text":"Có đầy đủ như TCP"},{"letter":"B","text":"Không"},{"letter":"C","text":"Chỉ có trong mạng LAN"},{"letter":"D","text":"Chỉ có khi gửi video"}]'),

(3, 'Nếu tốc độ dữ liệu ở trạm thu chậm hơn tốc độ dữ liệu ở trạm phát thì điều gì dễ xảy ra?', 'Kiểm soát lưu lượng', 'B', 'Khi bên nhận xử lý chậm hơn bên gửi, dữ liệu có thể làm tràn bộ đệm.', '[{"letter":"A","text":"Địa chỉ IP bị đổi"},{"letter":"B","text":"Bộ đệm phía nhận bị tràn"},{"letter":"C","text":"Port tự đóng"},{"letter":"D","text":"Mạng tự tăng tốc"}]'),

(3, 'Kiểm soát lưu lượng ở tầng giao vận nhằm mục đích gì?', 'Kiểm soát lưu lượng', 'B', 'Kiểm soát lưu lượng giúp tốc độ gửi phù hợp với khả năng nhận của phía đích.', '[{"letter":"A","text":"Tăng điện áp trên đường truyền"},{"letter":"B","text":"Tránh cho bên nhận bị quá tải"},{"letter":"C","text":"Thay đổi địa chỉ MAC"},{"letter":"D","text":"Giảm số lượng router"}]'),

(3, 'TCP dùng số thứ tự Sequence Number để làm gì?', 'TCP', 'A', 'Sequence Number giúp dữ liệu được nhận đúng thứ tự và phát hiện phần bị mất.', '[{"letter":"A","text":"Đánh số dữ liệu để sắp xếp đúng thứ tự"},{"letter":"B","text":"Đổi IP động"},{"letter":"C","text":"Định tuyến sang mạng khác"},{"letter":"D","text":"Tăng tốc phần cứng"}]'),

(3, 'ACK trong TCP có ý nghĩa gì?', 'TCP', 'B', 'ACK là cơ chế xác nhận dữ liệu hoặc gói tin đã được nhận.', '[{"letter":"A","text":"Yêu cầu kết nối"},{"letter":"B","text":"Xác nhận đã nhận dữ liệu"},{"letter":"C","text":"Báo lỗi địa chỉ"},{"letter":"D","text":"Kết thúc phiên vật lý"}]'),

(3, 'Dịch vụ nào phù hợp hơn với TCP?', 'TCP/UDP', 'A', 'Truyền file cần độ tin cậy cao nên thường dùng TCP.', '[{"letter":"A","text":"Truyền file"},{"letter":"B","text":"Truyền âm thanh thời gian thực đơn giản"},{"letter":"C","text":"Truyền video trực tiếp rất nhạy độ trễ"},{"letter":"D","text":"Gửi gói quảng bá đơn giản"}]'),

(3, 'Dịch vụ nào thường phù hợp hơn với UDP?', 'TCP/UDP', 'C', 'Ứng dụng thời gian thực ưu tiên tốc độ và độ trễ thấp nên thường dùng UDP.', '[{"letter":"A","text":"FTP"},{"letter":"B","text":"Email SMTP"},{"letter":"C","text":"Truyền thoại hoặc video thời gian thực"},{"letter":"D","text":"Tải trang web có yêu cầu độ tin cậy cao"}]'),

(3, 'Thời gian thiết lập kết nối của UDP là bao nhiêu?', 'UDP', 'D', 'UDP không cần thiết lập kết nối trước khi truyền nên thời gian thiết lập coi như bằng 0.', '[{"letter":"A","text":"1 bước"},{"letter":"B","text":"2 bước"},{"letter":"C","text":"3 bước"},{"letter":"D","text":"Bằng 0"}]'),

(3, 'TCP header tối thiểu thường có kích thước bao nhiêu?', 'TCP', 'C', 'Phần header TCP tối thiểu là 20 byte, có thể lớn hơn nếu có tùy chọn.', '[{"letter":"A","text":"8 byte"},{"letter":"B","text":"12 byte"},{"letter":"C","text":"20 byte"},{"letter":"D","text":"40 byte"}]'),

(3, 'Chức năng ghép kênh và tách kênh ở tầng giao vận được thực hiện chủ yếu dựa vào gì?', 'Port', 'B', 'Port giúp ghép nhiều ứng dụng dùng chung mạng và tách dữ liệu đến đúng ứng dụng.', '[{"letter":"A","text":"Địa chỉ MAC"},{"letter":"B","text":"Số hiệu port"},{"letter":"C","text":"Tên miền"},{"letter":"D","text":"Loại cáp mạng"}]'),

(3, 'Kết luận nào sau đây đúng nhất về TCP và UDP?', 'TCP/UDP', 'C', 'TCP và UDP phục vụ các mục đích khác nhau: TCP thiên về độ tin cậy, UDP thiên về tốc độ và độ trễ thấp.', '[{"letter":"A","text":"TCP nhanh hơn UDP trong mọi trường hợp"},{"letter":"B","text":"UDP luôn tốt hơn TCP"},{"letter":"C","text":"TCP ưu tiên độ tin cậy, UDP ưu tiên tốc độ và đơn giản"},{"letter":"D","text":"TCP và UDP hoàn toàn giống nhau"}]');
