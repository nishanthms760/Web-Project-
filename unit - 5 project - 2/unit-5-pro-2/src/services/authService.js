import { request } from './api';

export const authService = {
  async login(email, password) {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data.token) {
      localStorage.setItem('studyflow_token', data.token);
      localStorage.setItem('studyflow_user', JSON.stringify(data.user));
    }
    return data;
  },

  async register(name, email, password) {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    if (data.token) {
      localStorage.setItem('studyflow_token', data.token);
      localStorage.setItem('studyflow_user', JSON.stringify(data.user));
    }
    return data;
  },

  async getMe() {
    return await request('/auth/me');
  },

  async updateProfile(profileData) {
    const data = await request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
    if (data.user) {
      localStorage.setItem('studyflow_user', JSON.stringify(data.user));
    }
    return data;
  },

  logout() {
    localStorage.removeItem('studyflow_token');
    localStorage.removeItem('studyflow_user');
  }
};
