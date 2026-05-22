module.exports = async function handler(req, res) {
  const url = new URL(req.url || '/', 'http://localhost');
  const method = req.method || 'GET';
  const pathname = url.pathname;

  // 解析请求体
  let body = {};
  if (['POST', 'PATCH', 'PUT'].includes(method)) {
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks).toString();
      if (raw) body = JSON.parse(raw);
    } catch { body = {}; }
  }

  res.setHeader('Content-Type', 'application/json');

  const SUPABASE_URL = process.env.SUPABASE_URL || '';
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || '';
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_KEY' });
  }

  const API = `${SUPABASE_URL}/rest/v1`;
  const HEADERS = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
  };

  async function sbQuery(table, opts = {}) {
    let query = `${API}/${table}?select=${opts.select || '*'}`;
    if (opts.order) query += `&order=${opts.order}${opts.ascending === false ? '.desc' : ''}`;
    if (opts.eq) for (const [c, v] of opts.eq) query += `&${c}=eq.${encodeURIComponent(v)}`;
    if (opts.limit) query += `&limit=${opts.limit}`;
    const r = await fetch(query, { headers: HEADERS });
    if (!r.ok) throw new Error(`Supabase query failed: ${r.status}`);
    const data = await r.json();
    return data;
  }

  try {
    // 健康检查
    if (pathname === '/api/health' && method === 'GET') {
      return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
    }

    // 获取预订列表
    if (pathname === '/api/bookings' && method === 'GET') {
      const statusFilter = req.query.status;
      const eqOpts = [];
      if (statusFilter && statusFilter !== 'all') eqOpts.push(['status', statusFilter]);
      const data = await sbQuery('dive_bookings', { order: 'created_at', ascending: false, eq: eqOpts });
      return res.status(200).json({ success: true, data: data || [], total: (data || []).length });
    }

    // 统计
    if (pathname === '/api/bookings/stats' && method === 'GET') {
      const bookings = await sbQuery('dive_bookings');
      const sd = {}, ed = {}, mt = {};
      for (const b of bookings) {
        sd[b.status] = (sd[b.status] || 0) + 1;
        ed[b.experience] = (ed[b.experience] || 0) + 1;
        const m = b.created_at?.slice(0, 7);
        if (m) mt[m] = (mt[m] || 0) + 1;
      }
      const today = new Date().toISOString().slice(0, 10);
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
      return res.status(200).json({
        success: true,
        data: {
          total: bookings.length,
          pending: sd['pending'] || 0,
          contacted: sd['contacted'] || 0,
          confirmed: sd['confirmed'] || 0,
          cancelled: sd['cancelled'] || 0,
          todayNew: bookings.filter(b => b.created_at?.startsWith(today)).length,
          weekNew: bookings.filter(b => b.created_at >= weekAgo).length,
          statusDistribution: sd,
          experienceDistribution: ed,
          monthlyTrend: Object.entries(mt).sort(([a], [b]) => a.localeCompare(b)).map(([m, c]) => ({ month: m, count: c })),
        },
      });
    }

    // 提交
    if (pathname === '/api/bookings' && method === 'POST') {
      const { name, phone, experience, booking_date, message } = body;
      if (!name || !phone || !experience) {
        return res.status(400).json({ error: '请填写必填字段' });
      }
      const r = await fetch(`${API}/dive_bookings`, {
        method: 'POST',
        headers: { ...HEADERS, Prefer: 'return=representation' },
        body: JSON.stringify({ name, phone, experience, booking_date: booking_date || null, message: message || '' }),
      });
      if (!r.ok) {
        const err = await r.json().catch(() => ({}));
        return res.status(500).json({ error: err.message || 'Supabase 写入失败' });
      }
      const data = await r.json();
      return res.status(200).json({ success: true, message: '预订成功！我们将尽快与您联系', data });
    }

    // 更新状态
    if (pathname.startsWith('/api/bookings/') && method === 'PATCH') {
      const id = pathname.split('/').pop();
      if (!id || isNaN(Number(id))) return res.status(400).json({ error: '无效的ID' });
      const { status, remark } = body;
      const updates = {};
      if (status) updates.status = status;
      if (remark !== undefined) updates.remark = remark;
      const r = await fetch(`${API}/dive_bookings?id=eq.${id}`, {
        method: 'PATCH',
        headers: { ...HEADERS, Prefer: 'return=representation' },
        body: JSON.stringify(updates),
      });
      if (!r.ok) return res.status(404).json({ error: '未找到该预订' });
      const d = await r.json();
      return res.status(200).json({ success: true, message: '更新成功', data: d[0] });
    }

    // 删除
    if (pathname.startsWith('/api/bookings/') && method === 'DELETE') {
      const id = pathname.split('/').pop();
      if (!id || isNaN(Number(id))) return res.status(400).json({ error: '无效的ID' });
      const r = await fetch(`${API}/dive_bookings?id=eq.${id}`, { method: 'DELETE', headers: HEADERS });
      if (!r.ok) return res.status(404).json({ error: '未找到该预订' });
      return res.status(200).json({ success: true, message: '预订已删除' });
    }

    return res.status(404).json({ error: 'Not found' });

  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: err.message || '服务器内部错误' });
  }
}
