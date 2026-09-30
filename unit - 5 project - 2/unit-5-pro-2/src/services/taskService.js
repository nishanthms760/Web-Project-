import { request } from './api';

export const taskService = {
  async getTasks(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/tasks?${query}` : '/tasks';
    return await request(endpoint);
  },

  async getTask(id) {
    return await request(`/tasks/${id}`);
  },

  async createTask(taskData) {
    return await request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData)
    });
  },

  async updateTask(id, taskData) {
    return await request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData)
    });
  },

  async completeTask(id) {
    return await request(`/tasks/${id}/complete`, {
      method: 'PATCH'
    });
  },

  async deleteTask(id) {
    return await request(`/tasks/${id}`, {
      method: 'DELETE'
    });
  }
};
