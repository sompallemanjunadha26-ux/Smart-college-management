import { Role, User, Student, Faculty, Mentor, HOD, BusRoute, Hostel, Book, Placement, Internship, Event, Notification, Activity, Assignment } from './types';

const API_BASE = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

export const apiService = {
  // Auth
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Invalid credentials');
    const data = await res.json();
    localStorage.setItem('token', data.token);
    return data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  // Students
  async getStudents(): Promise<Student[]> {
    const res = await fetch(`${API_BASE}/students`, { headers: getHeaders() });
    return res.json();
  },

  async addStudent(student: Partial<Student> & { name: string; email: string; password?: string }): Promise<any> {
    const res = await fetch(`${API_BASE}/students`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(student),
    });
    return res.json();
  },

  // Library
  async getBooks(): Promise<Book[]> {
    const res = await fetch(`${API_BASE}/library`, { headers: getHeaders() });
    return res.json();
  },

  async addBook(book: Partial<Book>): Promise<any> {
    const res = await fetch(`${API_BASE}/library`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(book),
    });
    return res.json();
  },

  // Analytics
  async getOverview(): Promise<any> {
    const res = await fetch(`${API_BASE}/analytics/overview`, { headers: getHeaders() });
    return res.json();
  },
};
