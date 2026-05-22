import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { pathname } = new URL(req.url || '/', 'http://localhost');
  const method = req.method || 'GET';

  res.setHeader('Content-Type', 'application/json');

  try {
    // 健康检查
    if (pathname === '/api/health' && method === 'GET') {
      return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
    }

    // 获取预订列表
    if (pathname === '/api/bookings' && method === 'GET') {
      const statusFilter = req.query.status as string | undefined;
      let query = supabase.from('dive_bookings').select('*').order('created_at', { ascending: false });
      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return res.status(200).json({ success: true, data: data || [], total: (data || []).length });
    }

    // 预订统计
    if (pathname === '/api/bookings/stats' && method === 'GET') {
      const { data: list, error } = await supabase.from('dive_bookings').select('*');
      if (error) throw new Error(error.message);

      const bookings = list || [];
      const statusDist: Record<string, number> = {};
      const expDist: Record<string, number> = {};
      const monthlyTrend: Record<string, number> = {};

      for (const b of bookings) {
        statusDist[b.status] = (statusDist[b.status] || 0) + 1;
        expDist[b.experience] = (expDist[b.experience] || 0) + 1;
        const month = b.created_at?.slice(0, 7);
        if (month) monthlyTrend[month] = (monthlyTrend[month] || 0) + 1;
      }

      const today = new Date().toISOString().slice(0, 10);
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();

      return res.status(200).json({
        success: true,
        data: {
          total: bookings.length,
          pending: statusDist['pending'] || 0,
          contacted: statusDist['contacted'] || 0,
          confirmed: statusDist['confirmed'] || 0,
          cancelled: statusDist['cancelled'] || 0,
          todayNew: bookings.filter((b: any) => b.created_at?.startsWith(today)).length,
          weekNew: bookings.filter((b: any) => b.created_at >= weekAgo).length,
          statusDistribution: statusDist,
          experienceDistribution: expDist,
          monthlyTrend: Object.entries(monthlyTrend)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([month, count]) => ({ month, count })),
        },
      });
    }

    // 提交预订
    if (pathname === '/api/bookings' && method === 'POST') {
      const { name, phone, experience, booking_date, message } = req.body || {};
      if (!name || !phone || !experience) {
        return res.status(400).json({ error: '请填写必填字段：姓名、电话、潜水经验' });
      }
      const { data, error } = await supabase.from('dive_bookings').insert({
        name, phone, experience,
        booking_date: booking_date || null,
        message: message || '',
      }).select().single();
      if (error) throw new Error(error.message);
      return res.status(200).json({ success: true, message: '预订成功！我们将尽快与您联系', data });
    }

    // 更新预订
    if (pathname.startsWith('/api/bookings/') && method === 'PATCH') {
      const id = pathname.split('/').pop();
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: '无效的预订ID' });
      }
      const { status, remark } = req.body || {};
      const updates: Record<string, string> = {};
      if (status) updates.status = status;
      if (remark !== undefined) updates.remark = remark;

      const { data, error } = await supabase.from('dive_bookings').update(updates).eq('id', id).select().single();
      if (error || !data) return res.status(404).json({ error: '未找到该预订' });
      return res.status(200).json({ success: true, message: '更新成功', data });
    }

    // 删除预订
    if (pathname.startsWith('/api/bookings/') && method === 'DELETE') {
      const id = pathname.split('/').pop();
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: '无效的预订ID' });
      }
      const { error } = await supabase.from('dive_bookings').delete().eq('id', id);
      if (error) return res.status(404).json({ error: '未找到该预订' });
      return res.status(200).json({ success: true, message: '预订已删除' });
    }

    // hello
    if (pathname === '/api/hello' && method === 'GET') {
      return res.status(200).json({ message: 'Hello from Vercel!', timestamp: new Date().toISOString() });
    }

    return res.status(404).json({ error: 'Not found' });

  } catch (err: any) {
    console.error('API Error:', err);
    return res.status(500).json({ error: err.message || '服务器内部错误' });
  }
}
