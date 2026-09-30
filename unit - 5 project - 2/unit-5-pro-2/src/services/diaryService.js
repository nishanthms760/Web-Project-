import { request } from './api';

export const diaryService = {
  async getDiaryByDate(date) {
    return await request(`/diary?date=${date}`);
  },

  async getAllDiary() {
    return await request('/diary');
  },

  async saveDiary(date, notes) {
    return await request('/diary', {
      method: 'POST',
      body: JSON.stringify({ date, notes })
    });
  },

  async updateDiary(id, notes) {
    return await request(`/diary/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ notes })
    });
  },

  async deleteDiary(id) {
    return await request(`/diary/${id}`, {
      method: 'DELETE'
    });
  }
};
