import { supabase } from '../../server/supabase';

interface BookingRecord {
  id: number;
  name: string;
  phone: string;
  experience: string;
  booking_date: string | null;
  message: string | null;
  status: string;
  created_at: string;
  remark?: string;
}

export async function getAllBookings(): Promise<BookingRecord[]> {
  const { data, error } = await supabase
    .from('dive_bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data as BookingRecord[]) || [];
}

export async function createBooking(data: {
  name: string;
  phone: string;
  experience: string;
  booking_date?: string | null;
  message?: string | null;
}): Promise<BookingRecord> {
  const { data: result, error } = await supabase
    .from('dive_bookings')
    .insert({
      name: data.name,
      phone: data.phone,
      experience: data.experience,
      booking_date: data.booking_date || null,
      message: data.message || '',
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return result as BookingRecord;
}

export async function updateBooking(
  id: number,
  updates: Partial<Pick<BookingRecord, 'status' | 'remark'>>
): Promise<BookingRecord | null> {
  const { data, error } = await supabase
    .from('dive_bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return null;
  return data as BookingRecord;
}

export async function deleteBooking(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('dive_bookings')
    .delete()
    .eq('id', id);

  return !error;
}

export async function getBookingsStatistics() {
  const { data: bookings, error } = await supabase
    .from('dive_bookings')
    .select('*');

  if (error) throw new Error(error.message);

  const list = (bookings as BookingRecord[]) || [];

  const statusDistribution: Record<string, number> = {};
  const experienceDistribution: Record<string, number> = {};
  const monthlyTrend: Record<string, number> = {};

  for (const b of list) {
    statusDistribution[b.status] = (statusDistribution[b.status] || 0) + 1;
    experienceDistribution[b.experience] = (experienceDistribution[b.experience] || 0) + 1;
    const month = b.created_at.slice(0, 7);
    monthlyTrend[month] = (monthlyTrend[month] || 0) + 1;
  }

  const total = list.length;
  const pending = statusDistribution['pending'] || 0;
  const contacted = statusDistribution['contacted'] || 0;
  const confirmed = statusDistribution['confirmed'] || 0;
  const cancelled = statusDistribution['cancelled'] || 0;

  const today = new Date().toISOString().slice(0, 10);
  const todayNew = list.filter(b => b.created_at.startsWith(today)).length;

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekStr = weekAgo.toISOString();
  const weekNew = list.filter(b => b.created_at >= weekStr).length;

  return {
    total,
    pending,
    contacted,
    confirmed,
    cancelled,
    todayNew,
    weekNew,
    statusDistribution,
    experienceDistribution,
    monthlyTrend: Object.entries(monthlyTrend)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({ month, count })),
  };
}
