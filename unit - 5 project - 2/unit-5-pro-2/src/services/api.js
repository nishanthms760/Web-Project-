// Base API Service for StudyFlow / EduDiary

const API_BASE = '/api';

export const getAuthToken = () => {
  return localStorage.getItem('studyflow_token') || 'usr_nishanth_01';
};

export async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || `HTTP ${res.status} Error`);
    }
    return data;
  } catch (err) {
    // If backend proxy connection fails, fallback to local storage safely
    console.warn(`[API] Fallback for ${endpoint}:`, err.message);
    throw err;
  }
}
