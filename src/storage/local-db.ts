import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', '..', '..', 'data');
const BOOKINGS_FILE = join(DATA_DIR, 'bookings.json');

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

function ensureDataDir(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readBookings(): BookingRecord[] {
  ensureDataDir();
  if (!existsSync(BOOKINGS_FILE)) {
    return [];
  }
  try {
    const raw = readFileSync(BOOKINGS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeBookings(bookings: BookingRecord[]): void {
  ensureDataDir();
  writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
}

let nextId = 1;

function getNextId(bookings: BookingRecord[]): number {
  if (bookings.length === 0) return 1;
  return Math.max(...bookings.map(b => b.id)) + 1;
}

export function getAllBookings(): BookingRecord[] {
  const bookings = readBookings();
  return bookings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function createBooking(data: {
  name: string;
  phone: string;
  experience: string;
  booking_date?: string | null;
  message?: string | null;
}): BookingRecord {
  const bookings = readBookings();
  const now = new Date().toISOString();
  const booking: BookingRecord = {
    id: getNextId(bookings),
    name: data.name,
    phone: data.phone,
    experience: data.experience,
    booking_date: data.booking_date || null,
    message: data.message || null,
    status: 'pending',
    created_at: now,
  };
  bookings.push(booking);
  writeBookings(bookings);
  return booking;
}

export function updateBooking(id: number, updates: Partial<Pick<BookingRecord, 'status' | 'remark'>>): BookingRecord | null {
  const bookings = readBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) return null;
  bookings[index] = { ...bookings[index], ...updates };
  writeBookings(bookings);
  return bookings[index];
}

export function getBookingsStatistics() {
  const bookings = readBookings();

  // 状态分布
  const statusDistribution: Record<string, number> = {};
  // 经验分布
  const experienceDistribution: Record<string, number> = {};
  // 月度趋势
  const monthlyTrend: Record<string, number> = {};

  for (const b of bookings) {
    statusDistribution[b.status] = (statusDistribution[b.status] || 0) + 1;
    experienceDistribution[b.experience] = (experienceDistribution[b.experience] || 0) + 1;

    const month = b.created_at.slice(0, 7);
    monthlyTrend[month] = (monthlyTrend[month] || 0) + 1;
  }

  const total = bookings.length;
  const pending = statusDistribution['pending'] || 0;
  const contacted = statusDistribution['contacted'] || 0;
  const confirmed = statusDistribution['confirmed'] || 0;
  const cancelled = statusDistribution['cancelled'] || 0;

  // 今日新增
  const today = new Date().toISOString().slice(0, 10);
  const todayNew = bookings.filter(b => b.created_at.startsWith(today)).length;

  // 本周新增
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekStr = weekAgo.toISOString();
  const weekNew = bookings.filter(b => b.created_at >= weekStr).length;

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

export function deleteBooking(id: number): boolean {
  const bookings = readBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) return false;
  bookings.splice(index, 1);
  writeBookings(bookings);
  return true;
}
