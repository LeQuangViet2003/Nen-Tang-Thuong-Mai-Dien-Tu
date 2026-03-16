# Nền tảng Thương mại điện tử phiên bản thu gọn

Dự án mẫu Fullstack E-Commerce tích hợp cơ sở dữ liệu SQLite, được cấu hình để cho phép nhà tuyển dụng chạy thử ngay lập tức trên trình duyệt mà không cần cài đặt gì thêm.

## 🚀 Chạy Demo Trực Tiếp

### Lựa chọn 1: Chạy trực tiếp trên trình duyệt bằng GitHub Codespaces
Bạn có thể khởi chạy nguyên một cỗ máy ảo chứa đầy đủ công cụ và chạy luôn dự án (cả Frontend và Backend) hoàn toàn tự động chỉ với 1 cú click:

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/LeQuangViet2003/Nen-Tang-Thuong-Mai-Dien-Tu)

*Lưu ý: Sau khi bấm, kho lưu trữ sẽ mất khoảng 1-2 phút để tự động tải thư viện (npm install), sinh cấu trúc bảng (prisma pull) và chèn dữ liệu. Khi chạy xong, Terminal sẽ hiển thị đường link của cả 2 cổng 5000 (Backend) và 5173 (Frontend).*

### Lựa chọn 2: Triển khai lên mạng (Render.com)
Dự án đã được thiết kế sẵn theo cấu trúc **Unified Build** (gộp chung Frontend và Backend thành một ứng dụng Express tĩnh) để bạn có thể copy lên Render.com, chọn thư mục gốc và:
- **Build command:** `npm run setup && npm run build`
- **Start command:** `npm run seed && npm start`

Toàn bộ ứng dụng sẽ chạy trơn tru miễn phí với giao diện web React.

## 🛠 Công nghệ sử dụng
- **Trang chủ & Giao diện:** React (Vite), Tailwind CSS
- **Máy chủ & Xử lý:** Node.js, Express.js
- **Cơ sở dữ liệu:** SQLite (Cấu hình tự động seed)
- **Truy xuất dữ liệu:** Prisma ORM
