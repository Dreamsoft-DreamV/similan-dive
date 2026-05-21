// 数据导入脚本（表需先用 SQL Editor 创建）
// 用法: node scripts/setup-db.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://pdnnqwjvmufdqkgqffzn.supabase.co';
const key = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function setup() {
  const bookingsPath = path.join(__dirname, '..', '..', 'data', 'bookings.json');
  const bookings = JSON.parse(fs.readFileSync(bookingsPath, 'utf-8'));

  // 使用 upsert 避免重复键冲突
  const { error } = await supabase.from('dive_bookings').upsert(
    bookings.map(b => ({
      id: b.id,
      name: b.name,
      phone: b.phone,
      experience: b.experience,
      booking_date: b.booking_date || null,
      message: b.message || '',
      status: b.status,
      remark: b.remark || '',
      created_at: b.created_at,
    })),
    { onConflict: 'id', ignoreDuplicates: false }
  );

  if (error) {
    console.error('导入失败:', error.message);
    return;
  }

  console.log(`导入完成，共 ${bookings.length} 条记录`);
}

setup().catch(console.error);
