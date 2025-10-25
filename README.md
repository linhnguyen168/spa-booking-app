# 🌸 Hệ Thống Quản Lý Spa

App quản lý đặt lịch spa với PWA support (cài được như app thật!)

## ✨ Tính Năng

- ✅ Đặt lịch hẹn online
- ✅ Quản lý khách hàng  
- ✅ Theo dõi doanh thu
- ✅ Lọc giờ trống tự động
- ✅ PWA - Cài như app thật
- ✅ Hoạt động offline
- ✅ Responsive mobile

---

## 🚀 Deploy Lên Vercel (FREE - 5 Phút)

### **Bước 1: Tạo tài khoản GitHub**
1. Vào https://github.com
2. Click "Sign up" → Tạo tài khoản miễn phí
3. Xác nhận email

### **Bước 2: Upload code lên GitHub**
1. Vào https://github.com/new
2. Đặt tên repo: `spa-booking-app`
3. Chọn "Public"
4. Click "Create repository"
5. Click "uploading an existing file"
6. Kéo thả TẤT CẢ các file vào (từ file 1-9 ở trên)
7. Click "Commit changes"

### **Bước 3: Deploy với Vercel**
1. Vào https://vercel.com
2. Click "Sign up" → Chọn "Continue with GitHub"
3. Click "Import Project"
4. Chọn repo `spa-booking-app` vừa tạo
5. Click "Deploy"
6. Đợi 2-3 phút → XONG!

**Link app của bạn:** `https://spa-booking-app-xyz.vercel.app`

---

## 📱 Cài PWA Trên Điện Thoại

### **Android (Chrome):**
1. Mở link app trên Chrome
2. Xuất hiện popup "Thêm vào màn hình chính"
3. Click "Thêm" → Có icon app!

### **iOS (Safari):**
1. Mở link app trên Safari
2. Click nút Share (mũi tên lên)
3. Chọn "Add to Home Screen"
4. Click "Add" → Có icon app!

---

## 🌐 Connect Domain Riêng (Sau Khi Mua)

### **Mua domain ở đâu?**
- **Tên miền .vn:** PA Việt Nam, Matbao (200-500k/năm)
- **Tên miền .com:** Namecheap, GoDaddy (250-400k/năm)

### **Connect với Vercel:**
1. Vào https://vercel.com/dashboard
2. Chọn project `spa-booking-app`
3. Click tab "Settings" → "Domains"
4. Nhập domain: `spa-abc.vn`
5. Copy DNS records Vercel cho
6. Vào trang quản lý domain → Paste DNS records
7. Đợi 5-30 phút → XONG!

**App giờ có link đẹp:** `https://spa-abc.vn`

---

## 🛠️ Chỉnh Sửa Dữ Liệu

### **Thay đổi dịch vụ:**
Mở file `src/App.jsx`, tìm dòng:
```javascript
const SERVICES = [
  { id: 1, name: 'Facial Cơ Bản', duration: 60, price: 300000 },
  // Thêm dịch vụ mới ở đây
];
```

### **Thay đổi nhân viên:**
```javascript
const STAFF = [
  { id: 1, name: 'Chị Lan', specialty: 'Facial' },
  // Thêm nhân viên mới ở đây
];
```

### **Thay đổi giờ làm việc:**
```javascript
const TIME_SLOTS = [
  '09:00', '10:00', '11:00', // Sửa giờ ở đây
];
```

Sau khi sửa → Push lên GitHub → Vercel tự động deploy lại!

---

## 💾 Quản Lý Dữ Liệu

**Dữ liệu lưu ở đâu?**
- Lưu trong LocalStorage của trình duyệt
- Mỗi thiết bị có dữ liệu riêng

**Export dữ liệu:**
1. Mở app
2. Mở Console (F12)
3. Gõ: `localStorage.getItem('spa-bookings')`
4. Copy text → Lưu file backup

**Import dữ liệu:**
1. Mở Console
2. Gõ: `localStorage.setItem('spa-bookings', 'paste-data-vào-đây')`

---

## 📞 Hỗ Trợ

**Cần sửa gì?**
- Thêm/bớt dịch vụ
- Đổi màu sắc giao diện
- Thêm tính năng mới
- Kết nối với backend/database

→ Quay lại Claude để tôi guide tiếp!

---

## 📋 Cấu Trúc Files

```
spa-booking-app/
├── public/
│   ├── icon-192.png       # Icon app 192x192
│   ├── icon-512.png       # Icon app 512x512
│   ├── manifest.json      # PWA config
│   └── service-worker.js  # Offline support
├── src/
│   ├── App.jsx           # Code chính
│   ├── main.jsx          # Entry point
│   └── index.css         # Styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md (file này)
```

---

## 🎉 Chúc Mừng!

App của bạn giờ đã online và có thể cài như app thật!  
Share link cho nhân viên để cùng sử dụng! 🚀
