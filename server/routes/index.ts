import { Router } from 'express';
import { createBooking, getAllBookings, updateBooking, deleteBooking, getBookingsStatistics } from '../../src/storage/supabase-db';
import { sendBookingNotification } from '../services/email';

const router = Router();

// API 路由示例
router.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from Express + Vite!',
    timestamp: new Date().toISOString(),
  });
});

router.post('/api/data', (req, res) => {
  const requestData = req.body;
  res.json({
    success: true,
    data: requestData,
    receivedAt: new Date().toISOString(),
  });
});

// 健康检查接口
router.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    env: process.env.COZE_PROJECT_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ==================== 预订管理 API ====================

// 提交预订
router.post('/api/bookings', async (req, res) => {
  try {
    const { name, phone, experience, booking_date, message } = req.body;

    // 参数验证
    if (!name || !phone || !experience) {
      res.status(400).json({ error: '请填写必填字段：姓名、电话、潜水经验' });
      return;
    }

    const booking = await createBooking({ name, phone, experience, booking_date, message });

    // 发送邮件通知（异步，不影响响应）
    sendBookingNotification({ name, phone, experience, booking_date, message }).catch(err => {
      console.error('[Booking] Email notification failed:', err);
    });

    res.json({
      success: true,
      message: '预订成功！我们将尽快与您联系',
      data: booking,
    });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : '预订失败，请稍后重试' });
  }
});

// 获取预订列表（按时间倒序，支持状态过滤）
router.get('/api/bookings', async (req, res) => {
  try {
    let bookings = await getAllBookings();
    const statusFilter = req.query.status as string | undefined;

    if (statusFilter && statusFilter !== 'all') {
      bookings = bookings.filter(b => b.status === statusFilter);
    }

    res.json({
      success: true,
      data: bookings,
      total: bookings.length,
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : '查询失败' });
  }
});

// 更新预订状态（支持备注）
router.patch('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remark } = req.body;

    if (!id || (!status && remark === undefined)) {
      res.status(400).json({ error: '缺少必要参数' });
      return;
    }

    const updates: Record<string, string> = {};
    if (status) updates.status = status;
    if (remark !== undefined) updates.remark = remark;

    const booking = await updateBooking(parseInt(id, 10), updates);

    if (!booking) {
      res.status(404).json({ error: '未找到该预订' });
      return;
    }

    res.json({
      success: true,
      message: '更新成功',
      data: booking,
    });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : '更新失败' });
  }
});

// 预订统计
router.get('/api/bookings/stats', async (req, res) => {
  try {
    const stats = await getBookingsStatistics();
    res.json({ success: true, data: stats });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : '统计失败' });
  }
});

// 删除预订
router.delete('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: '缺少预订ID' });
      return;
    }

    const deleted = await deleteBooking(parseInt(id, 10));

    if (!deleted) {
      res.status(404).json({ error: '未找到该预订' });
      return;
    }

    res.json({
      success: true,
      message: '预订已删除',
    });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : '删除失败' });
  }
});

export default router;
