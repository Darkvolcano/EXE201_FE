import { useState, useMemo, useCallback } from 'react';
import axiosInstance from '../configs/axios.js';

export const useOrderApi = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get tutor orders from AP
  const getTutorOrders = useCallback(async () => {
    console.log("🚀 Bắt đầu gọi API getTutorOrders..."); // 1. Kiểm tra hàm có được gọi không
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/tutor/order-details`);
      
      console.log("✅ API call THÀNH CÔNG. Dữ liệu thô trả về:", response); // 2. Xem toàn bộ response
      console.log("📦 Dữ liệu trong response.data:", response.data); // 3. Xem chính xác data

      if (response.data && Array.isArray(response.data)) {
        console.log("👍 Dữ liệu là một mảng, tiến hành setOrders.");
        setOrders(response.data);
      } else {
        console.warn("⚠️ Dữ liệu trả về không phải là một mảng!", response.data);
        setOrders([]);
      }
    } catch (err) {
      console.error("❌ LỖI KHI TẢI ĐƠN HÀNG:", err); // 4. Bắt lỗi nếu API thất bại
      const errorMessage = err.response?.data?.message || 'Không thể tải danh sách đơn hàng';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ... các hàm getOrderStats, getUpcomingSessions không đổi ...
  // Memoized function to calculate order statistics
  const getOrderStats = useMemo(() => (ordersList = orders) => {
    if (!ordersList || ordersList.length === 0) {
      return {
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        totalRevenue: 0,
        monthlyRevenue: 0,
        monthlyBookings: 0,
        totalStudents: 0,
        currentMonthOrders: []
      };
    }

    const totalOrders = ordersList.length;
    const pendingOrders = ordersList.filter(o => o.order?.status === 'Pending').length;
    const completedOrders = ordersList.filter(o => o.order?.status === 'Completed').length;
    const totalRevenue = ordersList.reduce((sum, o) => sum + (o.order?.totalAmount || 0), 0);
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentMonthOrders = ordersList.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    });
    
    const monthlyRevenue = currentMonthOrders.reduce((sum, o) => sum + (o.order?.totalAmount || 0), 0);
    const monthlyBookings = currentMonthOrders.length;
    
    const uniqueStudents = [...new Set(ordersList.map(o => o.order?.account?.email).filter(Boolean))];
    
    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue,
      monthlyRevenue,
      monthlyBookings,
      totalStudents: uniqueStudents.length,
      currentMonthOrders
    };
  }, [orders]);

  // Memoized function to get upcoming sessions for the left sidebar
  const getUpcomingSessions = useMemo(() => (ordersList = orders) => {
    if (!ordersList) return [];
    return ordersList
      .filter(order => order.order?.status === 'Pending' && order.order?.account)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(order => ({
        id: order.orderDetailId,
        studentName: order.order.account.fullName,
        date: new Date(order.createdAt).toLocaleDateString('vi-VN'),
        subject: order.courseName,
        email: order.order.account.email,
      }));
  }, [orders]);

  return {
    orders,
    isLoading,
    error,
    getTutorOrders,
    getOrderStats,
    getUpcomingSessions
  };
};