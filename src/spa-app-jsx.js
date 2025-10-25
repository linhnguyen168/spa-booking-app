import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Package, DollarSign, Plus, X, Edit2 } from 'lucide-react';

const SERVICES = [
  { id: 1, name: 'Facial Cơ Bản', duration: 60, price: 300000 },
  { id: 2, name: 'Massage Body', duration: 90, price: 450000 },
  { id: 3, name: 'Điều Trị Mụn', duration: 120, price: 600000 },
  { id: 4, name: 'Triệt Lông', duration: 60, price: 400000 },
  { id: 5, name: 'Chăm Sóc Da Chuyên Sâu', duration: 120, price: 800000 },
];

const STAFF = [
  { id: 1, name: 'Chị Lan', specialty: 'Facial' },
  { id: 2, name: 'Chị Hương', specialty: 'Massage' },
  { id: 3, name: 'Chị Mai', specialty: 'Điều trị' },
];

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

function App() {
  const [activeTab, setActiveTab] = useState('booking');
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    service: '',
    staff: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedBookings = localStorage.getItem('spa-bookings');
    const savedCustomers = localStorage.getItem('spa-customers');
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    if (savedCustomers) setCustomers(JSON.parse(savedCustomers));
  };

  const saveData = (newBookings, newCustomers) => {
    localStorage.setItem('spa-bookings', JSON.stringify(newBookings || bookings));
    localStorage.setItem('spa-customers', JSON.stringify(newCustomers || customers));
  };

  const handleSubmitBooking = () => {
    if (!formData.customerName || !formData.phone || !formData.service || !formData.staff || !formData.date || !formData.time) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const service = SERVICES.find(s => s.id === parseInt(formData.service));
    const staff = STAFF.find(s => s.id === parseInt(formData.staff));
    
    const newBooking = {
      id: editingBooking ? editingBooking.id : Date.now(),
      ...formData,
      serviceName: service.name,
      servicePrice: service.price,
      staffName: staff.name,
      status: 'confirmed',
      createdAt: editingBooking ? editingBooking.createdAt : new Date().toISOString()
    };

    let updatedBookings;
    if (editingBooking) {
      updatedBookings = bookings.map(b => b.id === editingBooking.id ? newBooking : b);
    } else {
      updatedBookings = [...bookings, newBooking];
    }

    const existingCustomer = customers.find(c => c.phone === formData.phone);
    let updatedCustomers = customers;
    
    if (!existingCustomer) {
      updatedCustomers = [...customers, {
        name: formData.customerName,
        phone: formData.phone,
        firstVisit: new Date().toISOString(),
        totalVisits: 1
      }];
    } else {
      updatedCustomers = customers.map(c => 
        c.phone === formData.phone 
          ? { ...c, totalVisits: c.totalVisits + 1 }
          : c
      );
    }

    setBookings(updatedBookings);
    setCustomers(updatedCustomers);
    saveData(updatedBookings, updatedCustomers);
    
    setShowBookingForm(false);
    setEditingBooking(null);
    setFormData({
      customerName: '',
      phone: '',
      service: '',
      staff: '',
      date: '',
      time: '',
      notes: ''
    });
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa lịch hẹn này?')) {
      const updatedBookings = bookings.filter(b => b.id !== id);
      setBookings(updatedBookings);
      saveData(updatedBookings, customers);
    }
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
    setFormData({
      customerName: booking.customerName,
      phone: booking.phone,
      service: SERVICES.find(s => s.name === booking.serviceName)?.id.toString() || '',
      staff: STAFF.find(s => s.name === booking.staffName)?.id.toString() || '',
      date: booking.date,
      time: booking.time,
      notes: booking.notes || ''
    });
    setShowBookingForm(true);
  };

  const isTimeSlotBooked = (date, time, staffId) => {
    return bookings.some(b => 
      b.date === date && 
      b.time === time && 
      b.staff === staffId &&
      b.id !== editingBooking?.id
    );
  };

  const getTodayBookings = () => {
    const today = new Date().toISOString().split('T')[0];
    return bookings.filter(b => b.date === today);
  };

  const getUpcomingBookings = () => {
    const today = new Date().toISOString().split('T')[0];
    return bookings
      .filter(b => b.date >= today)
      .sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
  };

  const getTotalRevenue = () => {
    return bookings.reduce((sum, b) => sum + b.servicePrice, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            🌸 Quản Lý Spa
          </h1>
          <p className="text-gray-600 mt-2">Hệ thống đặt lịch & chăm sóc khách hàng</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Hôm nay</p>
                <p className="text-2xl font-bold text-pink-600">{getTodayBookings().length}</p>
              </div>
              <Calendar className="text-pink-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tổng lịch hẹn</p>
                <p className="text-2xl font-bold text-purple-600">{bookings.length}</p>
              </div>
              <Clock className="text-purple-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Khách hàng</p>
                <p className="text-2xl font-bold text-blue-600">{customers.length}</p>
              </div>
              <Users className="text-blue-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Doanh thu</p>
                <p className="text-xl font-bold text-green-600">
                  {getTotalRevenue().toLocaleString()}đ
                </p>
              </div>
              <DollarSign className="text-green-500" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('booking')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'booking'
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              📅 Lịch Hẹn
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'customers'
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              👥 Khách Hàng
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'services'
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              💆 Dịch Vụ
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'booking' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Danh Sách Lịch Hẹn</h2>
                  <button
                    onClick={() => {
                      setShowBookingForm(true);
                      setEditingBooking(null);
                      setFormData({
                        customerName: '',
                        phone: '',
                        service: '',
                        staff: '',
                        date: '',
                        time: '',
                        notes: ''
                      });
                    }}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition-shadow"
                  >
                    <Plus size={20} />
                    Đặt Lịch Mới
                  </button>
                </div>

                {showBookingForm && (
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-pink-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        {editingBooking ? '✏️ Chỉnh Sửa Lịch Hẹn' : '➕ Tạo Lịch Hẹn Mới'}
                      </h3>
                      <button
                        onClick={() => {
                          setShowBookingForm(false);
                          setEditingBooking(null);
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tên Khách Hàng *
                        </label>
                        <input
                          type="text"
                          value={formData.customerName}
                          onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Nhập tên khách hàng"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số Điện Thoại *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="0901234567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dịch Vụ *
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({...formData, service: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        >
                          <option value="">Chọn dịch vụ</option>
                          {SERVICES.map(service => (
                            <option key={service.id} value={service.id}>
                              {service.name} - {service.price.toLocaleString()}đ ({service.duration} phút)
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nhân Viên *
                        </label>
                        <select
                          value={formData.staff}
                          onChange={(e) => setFormData({...formData, staff: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        >
                          <option value="">Chọn nhân viên</option>
                          {STAFF.map(staff => (
                            <option key={staff.id} value={staff.id}>
                              {staff.name} - {staff.specialty}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ngày *
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Giờ *
                        </label>
                        <select
                          value={formData.time}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        >
                          <option value="">Chọn giờ</option>
                          {TIME_SLOTS.map(time => {
                            const isBooked = formData.date && formData.staff && 
                              isTimeSlotBooked(formData.date, time, formData.staff);
                            return (
                              <option 
                                key={time} 
                                value={time}
                                disabled={isBooked}
                              >
                                {time} {isBooked ? '(Đã đặt)' : ''}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ghi Chú
                        </label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Ghi chú thêm về khách hàng hoặc yêu cầu đặc biệt..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <button
                          onClick={handleSubmitBooking}
                          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
                        >
                          {editingBooking ? '💾 Lưu Thay Đổi' : '✅ Xác Nhận Đặt Lịch'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {getUpcomingBookings().length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Chưa có lịch hẹn nào. Tạo lịch hẹn mới để bắt đầu!</p>
                    </div>
                  ) : (
                    getUpcomingBookings().map(booking => (
                      <div
                        key={booking.id}
                        className="bg-white border-2 border-pink-100 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">👤</span>
                              <div>
                                <h3 className="font-bold text-lg text-gray-800">
                                  {booking.customerName}
                                </h3>
                                <p className="text-sm text-gray-600">📱 {booking.phone}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-3">
                              <div className="flex items-center gap-2 text-sm">
                                <Package className="text-pink-500" size={16} />
                                <span>{booking.serviceName}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="text-purple-500" size={16} />
                                <span>{booking.staffName}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="text-blue-500" size={16} />
                                <span>{new Date(booking.date).toLocaleDateString('vi-VN')}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="text-green-500" size={16} />
                                <span>{booking.time}</span>
                              </div>
                            </div>
                            {booking.notes && (
                              <div className="mt-3 p-2 bg-yellow-50 rounded text-sm text-gray-700">
                                📝 {booking.notes}
                              </div>
                            )}
                            <div className="mt-3 text-lg font-bold text-green-600">
                              💰 {booking.servicePrice.toLocaleString()}đ
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditBooking(booking)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Chỉnh sửa"
                            >
                              <Edit2 size={20} />
                            </button>
                            <button
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Xóa"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Danh Sách Khách Hàng</h2>
                <div className="space-y-4">
                  {customers.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Users size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Chưa có khách hàng nào</p>
                    </div>
                  ) : (
                    customers.map((customer, index) => (
                      <div
                        key={index}
                        className="bg-white border-2 border-purple-100 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                            {customer.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-800">{customer.name}</h3>
                            <p className="text-sm text-gray-600">📱 {customer.phone}</p>
                            <div className="flex gap-4 mt-2 text-sm text-gray-600">
                              <span>🎯 {customer.totalVisits} lần đặt lịch</span>
                              <span>📅 Khách từ {new Date(customer.firstVisit).toLocaleDateString('vi-VN')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Dịch Vụ & Giá</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES.map(service => (
                    <div
                      key={service.id}
                      className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-xl text-gray-800">{service.name}</h3>
                        <span className="text-2xl">💆‍♀️</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">⏱️ Thời gian:</span>
                          <span className="font-medium">{service.duration} phút</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">💰 Giá:</span>
                          <span className="font-bold text-green-600 text-lg">
                            {service.price.toLocaleString()}đ
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-white border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-4">👥 Đội Ngũ Nhân Viên</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {STAFF.map(staff => (
                      <div key={staff.id} className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2">
                          {staff.name.split(' ')[1].charAt(0)}
                        </div>
                        <h4 className="font-bold text-gray-800">{staff.name}</h4>
                        <p className="text-sm text-gray-600">{staff.specialty}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
