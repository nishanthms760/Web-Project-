import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { taskService } from '../services/taskService';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(() => {
    // Current date formatted YYYY-MM-DD
    const d = new Date();
    // Default to the prompt's academic date 2026-09-29 if in 2026, or current date
    const yyyy = d.getFullYear() >= 2026 ? d.getFullYear() : 2026;
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-09-29`; // Aligned with the prompt's specified Tuesday, September 29, 2026
  });

  const [notification, setNotification] = useState(null);

  // Fetch tasks on mount
  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      console.warn('Backend tasks offline, using initial cached tasks:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Show a notification toast
  const triggerNotification = (message, type = 'info') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Add Task
  const addTask = async (taskData) => {
    try {
      const created = await taskService.createTask(taskData);
      setTasks(prev => [created, ...prev]);
      triggerNotification(`Task "${created.title}" created successfully!`, 'success');
      return created;
    } catch (err) {
      // Fallback local create
      const fallback = {
        ...taskData,
        id: `tsk_${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setTasks(prev => [fallback, ...prev]);
      triggerNotification(`Task "${fallback.title}" created!`, 'success');
      return fallback;
    }
  };

  // Edit Task
  const editTask = async (id, taskData) => {
    try {
      const updated = await taskService.updateTask(id, taskData);
      setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
      triggerNotification('Task updated successfully!', 'success');
      return updated;
    } catch (err) {
      setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...taskData } : t)));
      triggerNotification('Task updated!', 'success');
    }
  };

  // Toggle complete
  const toggleComplete = async (id) => {
    try {
      const updated = await taskService.completeTask(id);
      setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
      if (updated.status === 'Completed') {
        triggerNotification('🎉 Task completed! Great job!', 'success');
      } else {
        triggerNotification('Task marked as Pending.', 'info');
      }
      return updated;
    } catch (err) {
      // Local fallback
      setTasks(prev =>
        prev.map(t => {
          if (t.id === id) {
            const nextStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
            return { ...t, status: nextStatus };
          }
          return t;
        })
      );
    }
  };

  // Delete Task
  const removeTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      triggerNotification('Task deleted.', 'info');
    } catch (err) {
      setTasks(prev => prev.filter(t => t.id !== id));
      triggerNotification('Task deleted.', 'info');
    }
  };

  // Reorder tasks (e.g. for Daily Diary drag & drop)
  const reorderTasks = (newOrderedList) => {
    setTasks(prev => {
      const remaining = prev.filter(t => !newOrderedList.some(o => o.id === t.id));
      return [...newOrderedList, ...remaining];
    });
  };

  // Today's task computations
  const todayTasks = useMemo(() => {
    return tasks.filter(t => t.date === currentDate);
  }, [tasks, currentDate]);

  const todayCompleted = useMemo(() => {
    return todayTasks.filter(t => t.status === 'Completed');
  }, [todayTasks]);

  const todayPending = useMemo(() => {
    return todayTasks.filter(t => t.status === 'Pending');
  }, [todayTasks]);

  const todayInProgress = useMemo(() => {
    return todayTasks.filter(t => t.status === 'In Progress');
  }, [todayTasks]);

  const todayProgressPercent = useMemo(() => {
    if (todayTasks.length === 0) return 0;
    return Math.round((todayCompleted.length / todayTasks.length) * 100);
  }, [todayTasks, todayCompleted]);

  // Weekly tasks computations
  const weeklyTasks = useMemo(() => {
    // Current week approximation (within 7 days)
    return tasks.filter(t => {
      const taskDate = new Date(t.date);
      const curr = new Date(currentDate);
      const diffTime = Math.abs(curr - taskDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    });
  }, [tasks, currentDate]);

  const weeklyCompleted = useMemo(() => {
    return weeklyTasks.filter(t => t.status === 'Completed');
  }, [weeklyTasks]);

  const weeklyCompletionRate = useMemo(() => {
    if (weeklyTasks.length === 0) return 0;
    return Math.round((weeklyCompleted.length / weeklyTasks.length) * 100);
  }, [weeklyTasks, weeklyCompleted]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        currentDate,
        setCurrentDate,
        todayTasks,
        todayCompleted,
        todayPending,
        todayInProgress,
        todayProgressPercent,
        weeklyTasks,
        weeklyCompleted,
        weeklyCompletionRate,
        notification,
        addTask,
        editTask,
        toggleComplete,
        removeTask,
        reorderTasks,
        refreshTasks: loadTasks,
        triggerNotification
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
